
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail, Upload, Edit, Sparkles } from 'lucide-react';
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
    <section id="home" className="relative pt-24 pb-20 px-4 min-h-screen flex items-center">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Content */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-8">
            <div className="relative">
              {isOwnerView && (
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute -top-16 right-0 glass-effect hover:bg-white/90 border-white/30"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Content
                </Button>
              )}
              
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/30 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Welcome to my portfolio</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-gray-900 mb-2">Hello, I'm</span>
                  <span className="gradient-text animate-pulse">
                    Talla Narayana Swami
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-600 font-medium leading-relaxed max-w-2xl">
                  VLSI Enthusiast | Verilog | SystemVerilog | FPGA | Digital Electronics
                </p>
                
                <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
                  Passionate about designing the future of semiconductor technology through innovative VLSI solutions and digital circuit design.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mt-10">
                <Button 
                  onClick={handleResumeView}
                  className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-8 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  View Resume
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={scrollToContact}
                  className="group glass-effect hover:bg-white/90 border-2 border-blue-200/50 text-blue-700 hover:text-blue-800 px-8 py-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Mail className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Contact Me
                </Button>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative group">
              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
              <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 animate-ping"></div>
              
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <div className="w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl bg-gradient-to-br from-blue-100 via-white to-indigo-100 card-hover animate-glow">
                  <img 
                    src={profileImage} 
                    alt="Talla Narayana Swami"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {isOwnerView && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
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

                {/* Floating skill badges */}
                <div className="absolute -top-4 -right-8 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-full shadow-lg animate-float">
                  VLSI Expert
                </div>
                <div className="absolute -bottom-6 -left-8 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-semibold rounded-full shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                  FPGA Developer
                </div>
                <div className="absolute top-1/2 -right-16 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-semibold rounded-full shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                  SystemVerilog
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
