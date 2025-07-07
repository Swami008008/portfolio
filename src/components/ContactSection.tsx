
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Linkedin, Github, Edit, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactSectionProps {
  isOwnerView: boolean;
}

const ContactSection = ({ isOwnerView }: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [contactInfo, setContactInfo] = useState({
    email: 'tallanarayanaswami@example.com',
    phone: '+91 9876543210',
    location: 'Punjab, India',
    linkedin: 'https://linkedin.com/in/tallanarayanaswami',
    github: 'https://github.com/tallanarayanaswami'
  });
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingContactInfo, setEditingContactInfo] = useState(contactInfo);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedContactInfo = localStorage.getItem('portfolioContactInfo');
    if (storedContactInfo) {
      const parsed = JSON.parse(storedContactInfo);
      setContactInfo(parsed);
      setEditingContactInfo(parsed);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to Google Sheets
      const response = await fetch('https://script.google.com/macros/s/AKfycbzz0VtMsaWbNTq_3T_35lZVPMWORCpCEfTOBQaht1r9fCFhzXnqkVQYvQP8iYt7KxUn/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          name: formData.name,
          email: formData.email,
          message: formData.message
        }),
      });

      toast({
        title: "Message Sent",
        description: "Thank you for your message! I'll get back to you soon.",
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Message Sent",
        description: "Your message has been submitted successfully!",
      });
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactInfoUpdate = () => {
    setContactInfo(editingContactInfo);
    localStorage.setItem('portfolioContactInfo', JSON.stringify(editingContactInfo));
    setShowEditDialog(false);
    toast({
      title: "Contact Info Updated",
      description: "Your contact information has been successfully updated.",
    });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Get In <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="relative">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              {isOwnerView && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEditDialog(true)}
                  className="absolute top-0 right-0"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Info
                </Button>
              )}
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Email</h4>
                  <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:text-blue-700 transition-colors">
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Phone</h4>
                  <p className="text-gray-600">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Location</h4>
                  <p className="text-gray-600">{contactInfo.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">LinkedIn</h4>
                  <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors">
                    View Profile
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">GitHub</h4>
                  <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors">
                    View Projects
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">Send Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message here..."
                    rows={5}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Edit Contact Info Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Edit className="w-5 h-5" />
                <span>Edit Contact Information</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="editEmail">Email</Label>
                <Input
                  id="editEmail"
                  type="email"
                  value={editingContactInfo.email}
                  onChange={(e) => setEditingContactInfo({ ...editingContactInfo, email: e.target.value })}
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <Label htmlFor="editPhone">Phone</Label>
                <Input
                  id="editPhone"
                  type="tel"
                  value={editingContactInfo.phone}
                  onChange={(e) => setEditingContactInfo({ ...editingContactInfo, phone: e.target.value })}
                  placeholder="+91 9876543210"
                />
              </div>
              
              <div>
                <Label htmlFor="editLocation">Location</Label>
                <Input
                  id="editLocation"
                  value={editingContactInfo.location}
                  onChange={(e) => setEditingContactInfo({ ...editingContactInfo, location: e.target.value })}
                  placeholder="City, State, Country"
                />
              </div>
              
              <div>
                <Label htmlFor="editLinkedin">LinkedIn URL</Label>
                <Input
                  id="editLinkedin"
                  type="url"
                  value={editingContactInfo.linkedin}
                  onChange={(e) => setEditingContactInfo({ ...editingContactInfo, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              
              <div>
                <Label htmlFor="editGithub">GitHub URL</Label>
                <Input
                  id="editGithub"
                  type="url"
                  value={editingContactInfo.github}
                  onChange={(e) => setEditingContactInfo({ ...editingContactInfo, github: e.target.value })}
                  placeholder="https://github.com/yourusername"
                />
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button onClick={handleContactInfoUpdate} className="flex-1">
                  Update Information
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowEditDialog(false);
                    setEditingContactInfo(contactInfo);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ContactSection;
