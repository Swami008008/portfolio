
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail, Upload, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HeroSectionProps {
  isOwnerView: boolean;
}

const HeroSection = ({ isOwnerView }: HeroSectionProps) => {
  const [profileImage, setProfileImage] = useState('/placeholder.svg');
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
        toast({
          title: "Profile photo updated",
          description: "Your profile picture has been successfully updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeView = () => {
    // Placeholder for resume PDF view
    toast({
      title: "Resume",
      description: "Resume viewing functionality will be implemented with PDF upload.",
    });
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-20 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="relative">
              {isOwnerView && (
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute -top-12 right-0 opacity-70 hover:opacity-100"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Content
                </Button>
              )}
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Talla Narayana Swami
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 font-medium leading-relaxed">
                VLSI Enthusiast | Verilog | SystemVerilog | FPGA | Digital Electronics
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={handleResumeView}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  View Resume
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={scrollToContact}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-6 text-lg rounded-xl transition-all duration-300"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Me
                </Button>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative group">
              <div className="w-80 h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-gradient-to-br from-blue-100 to-indigo-100">
                <img 
                  src={profileImage} 
                  alt="Talla Narayana Swami"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {isOwnerView && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-sm font-medium">Upload Photo</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}

              {/* Floating elements for visual appeal */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
