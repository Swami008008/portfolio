
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Linkedin, Github, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactSectionProps {
  isOwnerView: boolean;
}

const ContactSection = ({ isOwnerView }: ContactSectionProps) => {
  const { toast } = useToast();
  const [contactEmail, setContactEmail] = useState("tallanarayanaswami7@gmail.com");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Load contact email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem('portfolioContactEmail');
    if (storedEmail) {
      setContactEmail(storedEmail);
    }
  }, []);

  const handleEmailEdit = () => {
    const newEmail = prompt("Enter your contact email:", contactEmail);
    if (newEmail && newEmail.includes('@')) {
      setContactEmail(newEmail);
      localStorage.setItem('portfolioContactEmail', newEmail);
      toast({
        title: "Contact Email Updated",
        description: "Your contact email has been updated.",
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: contactEmail,
      href: `mailto:${contactEmail}`,
      color: "text-red-600"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8008415980",
      href: "tel:+918008415980",
      color: "text-green-600"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Punjab, India",
      href: "#",
      color: "text-blue-600"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/tallanarayanaswami",
      href: "https://linkedin.com/in/tallanarayanaswami",
      color: "text-blue-700"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/tallanarayanaswami",
      href: "https://github.com/tallanarayanaswami",
      color: "text-gray-800"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}
    `);
    
    window.open(`mailto:${contactEmail}?subject=${subject}&body=${body}`);
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent via email.",
    });
    
    // Clear form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Contact <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Get In Touch</h3>
            {contactInfo.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="flex items-center space-x-4">
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
                  {isOwnerView && item.label === 'Email' && (
                    <Button variant="outline" size="sm" onClick={handleEmailEdit}>
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
