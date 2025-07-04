
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Linkedin, Github, MessageCircle } from 'lucide-react';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "tallanarayanaswami7@gmail.com",
      href: "mailto:tallanarayanaswami7@gmail.com",
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

  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Connect <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">With Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-6">
            Let's discuss opportunities and collaborate on innovative projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactInfo.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index} className="border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors`}>
                      <IconComponent className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{item.label}</h3>
                      <a 
                        href={item.href}
                        className={`text-sm ${item.color} hover:underline break-all`}
                        target={item.label === 'LinkedIn' || item.label === 'GitHub' ? '_blank' : undefined}
                        rel={item.label === 'LinkedIn' || item.label === 'GitHub' ? 'noopener noreferrer' : undefined}
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 mr-2 text-blue-600" />
                Let's Collaborate
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-8">
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                I'm always excited to work on innovative VLSI projects and collaborate with like-minded professionals. 
                Whether you have a project idea or want to discuss opportunities, feel free to reach out!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => window.open('mailto:tallanarayanaswami7@gmail.com')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button 
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  onClick={() => window.open('https://linkedin.com/in/tallanarayanaswami', '_blank')}
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  Connect on LinkedIn
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
