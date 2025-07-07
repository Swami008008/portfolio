
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail, Upload, Edit, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HeroSectionProps {
  isOwnerView: boolean;
}

const HeroSection = ({ isOwnerView }: HeroSectionProps) => {
  const [profileImage, setProfileImage] = useState('/placeholder.svg');
  const [hasResume, setHasResume] = useState(false);
  const { toast } = useToast();

  // Check for resume on component mount
  useEffect(() => {
    const storedResume = localStorage.getItem('portfolioResume');
    setHasResume(!!storedResume);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
        localStorage.setItem('portfolioProfileImage', result);
        toast({
          title: "Profile photo updated",
          description: "Your profile picture has been successfully updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const storedImage = localStorage.getItem('portfolioProfileImage');
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        localStorage.setItem('portfolioResume', result);
        localStorage.setItem('portfolioResumeFileName', file.name);
        setHasResume(true);
        toast({
          title: "Resume uploaded",
          description: "Your resume has been uploaded successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeView = () => {
    window.open('/resume', '_blank');
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const techDetails = [
    { name: "Verilog", color: "from-blue-500 to-blue-600" },
    { name: "SystemVerilog", color: "from-purple-500 to-purple-600" },
    { name: "Digital Electronics", color: "from-green-500 to-green-600" },
    { name: "CMOS", color: "from-indigo-500 to-indigo-600" },
    { name: "FPGA", color: "from-pink-500 to-pink-600" }
  ];

  return (
    <section id="home" className="relative pt-24 pb-20 px-4 min-h-screen flex items-center">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-12">
          {/* Welcome Message */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/30 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 mr-3 text-blue-600" />
              <span className="text-lg font-medium text-blue-800">Welcome to my portfolio</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="block text-gray-900 mb-4">Hello, I'm</span>
              <span className="gradient-text animate-pulse">
                Talla Narayana Swami
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 font-medium leading-relaxed max-w-3xl mx-auto">
              VLSI Enthusiast | Verilog | SystemVerilog | FPGA | Digital Electronics
            </p>
          </div>

          {/* Profile Image with Tech Details */}
          <div className="relative flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
              <div className="absolute -inset-12 rounded-full bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 animate-ping"></div>
              
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

                {/* Floating tech badges */}
                {techDetails.map((tech, index) => {
                  const positions = [
                    { top: '-top-6', right: '-right-12' },
                    { bottom: '-bottom-8', left: '-left-16' },
                    { top: 'top-1/4', right: '-right-20' },
                    { bottom: 'bottom-1/4', left: '-left-20' },
                    { top: 'top-3/4', right: '-right-16' }
                  ];
                  const pos = positions[index % positions.length];
                  
                  return (
                    <div 
                      key={tech.name}
                      className={`absolute ${pos.top || ''} ${pos.bottom || ''} ${pos.left || ''} ${pos.right || ''} px-4 py-2 bg-gradient-to-r ${tech.color} text-white text-sm font-semibold rounded-full shadow-lg animate-float`}
                      style={{ animationDelay: `${index * 0.5}s` }}
                    >
                      {tech.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <div className="relative">
              <Button 
                onClick={handleResumeView}
                className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-8 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                View Resume
              </Button>
              
              {isOwnerView && (
                <label className="absolute -top-12 left-1/2 transform -translate-x-1/2 cursor-pointer">
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass-effect hover:bg-white/90 border-white/30"
                    asChild
                  >
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Resume
                    </span>
                  </Button>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
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

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
