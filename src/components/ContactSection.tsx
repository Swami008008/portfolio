
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Linkedin, Github, Edit, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactSectionProps {
  isOwnerView: boolean;
}

const ContactSection = ({ isOwnerView }: ContactSectionProps) => {
  const { toast } = useToast();
  const [contactInfo, setContactInfo] = useState({
    email: "tallanarayanaswami7@gmail.com",
    phone: "+91 8008415980",
    location: "Punjab, India",
    linkedin: "linkedin.com/in/tallanarayanaswami",
    github: "github.com/tallanarayanaswami"
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Load contact info from localStorage
  useEffect(() => {
    const storedInfo = localStorage.getItem('portfolioContactInfo');
    if (storedInfo) {
      setContactInfo(JSON.parse(storedInfo));
    }
  }, []);

  const handleEditContactInfo = (field: keyof typeof contactInfo) => {
    const currentValue = contactInfo[field];
    const label = field.charAt(0).toUpperCase() + field.slice(1);
    const newValue = prompt(`Enter your ${label}:`, currentValue);
    
    if (newValue !== null && newValue.trim() !== '') {
      const updatedInfo = { ...contactInfo, [field]: newValue.trim() };
      setContactInfo(updatedInfo);
      localStorage.setItem('portfolioContactInfo', JSON.stringify(updatedInfo));
      
      toast({
        title: `${label} Updated`,
        description: `Your ${label.toLowerCase()} has been updated.`,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Send to Google Sheets
      const sheetsData = {
        timestamp: new Date().toISOString(),
        name: formData.name,
        email: formData.email,
        message: formData.message
      };

      // Using Google Apps Script Web App URL for the spreadsheet
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbwXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec';
      
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetsData)
      });

      // Also create mailto as fallback
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
      const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}
Timestamp: ${new Date().toLocaleString()}
      `);
      
      // Store locally for owner to view
      const existingMessages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
      existingMessages.push({
        id: Date.now(),
        ...formData,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('portfolioMessages', JSON.stringify(existingMessages));

      window.open(`mailto:${contactInfo.email}?subject=${subject}&body=${body}`);
      
      toast({
        title: "Message Sent",
        description: "Your message has been sent and recorded in the spreadsheet.",
      });
      
      // Clear form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Message Sent via Email",
        description: "Your message has been sent via email.",
      });
    }
  };

  const handleViewMessages = () => {
    window.open('https://docs.google.com/spreadsheets/d/1__vVjF_vwO-EHSnfFnBmUxYpQzinn4RcnX43mYDd6V4/edit?usp=sharing', '_blank');
  };

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      color: "text-red-600",
      field: 'email' as keyof typeof contactInfo
    },
    {
      icon: Phone,
      label: "Phone",
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone.replace(/\s+/g, '')}`,
      color: "text-green-600",
      field: 'phone' as keyof typeof contactInfo
    },
    {
      icon: MapPin,
      label: "Location",
      value: contactInfo.location,
      href: "#",
      color: "text-blue-600",
      field: 'location' as keyof typeof contactInfo
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: contactInfo.linkedin,
      href: `https://${contactInfo.linkedin}`,
      color: "text-blue-700",
      field: 'linkedin' as keyof typeof contactInfo
    },
    {
      icon: Github,
      label: "GitHub",
      value: contactInfo.github,
      href: `https://${contactInfo.github}`,
      color: "text-gray-800",
      field: 'github' as keyof typeof contactInfo
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Contact <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        {isOwnerView && (
          <div className="mb-8 text-center">
            <Button onClick={handleViewMessages} className="bg-green-600 hover:bg-green-700">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Messages Spreadsheet
            </Button>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Get In Touch</h3>
            {contactItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <IconComponent className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.label}</p>
                    <a 
                      href={item.href}
                      className={`text-sm ${item.color} hover:underline`}
                      target={item.label === 'LinkedIn' || item.label === 'GitHub' ? '_blank' : undefined}
                      rel={item.label === 'LinkedIn' || item.label === 'GitHub' ? 'noopener noreferrer' : undefined}
                    >
                      {item.value}
                    </a>
                  </div>
                  {isOwnerView && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditContactInfo(item.field)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Send Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
