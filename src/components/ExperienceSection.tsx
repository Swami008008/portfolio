
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Edit, Plus, Calendar, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExperienceSectionProps {
  isOwnerView: boolean;
}

const ExperienceSection = ({ isOwnerView }: ExperienceSectionProps) => {
  const [openItems, setOpenItems] = useState<number[]>([0]);
  const { toast } = useToast();

  const experiences = [
    {
      title: "VISI Internship",
      company: "SURE Trust",
      duration: "Ongoing",
      location: "Remote",
      type: "Internship",
      description: "Currently exploring advanced VLSI concepts including CMOS design, Verilog and SystemVerilog programming, UVM (Universal Verification Methodology), DFT (Design for Test), Physical Design, and Analog Design. Gaining hands-on experience with industry-standard tools and methodologies in semiconductor design.",
      technologies: ["CMOS", "Verilog", "SystemVerilog", "UVM", "DFT", "Physical Design", "Analog Design"],
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "PLC Internship",
      company: "Lovely Professional University",
      duration: "July 2024",
      location: "Punjab, India",
      type: "Academic Internship",
      description: "Designed and implemented ladder logic for industrial control systems using LogixPro software. Worked on automation projects and learned industrial control protocols and safety standards.",
      technologies: ["LogixPro", "Ladder Logic", "Industrial Control", "Automation"],
      color: "from-green-500 to-green-600"
    },
    {
      title: "Embedded Systems Internship",
      company: "Microlinks",
      duration: "2024",
      location: "Remote",
      type: "Technical Internship",
      description: "Worked extensively with microcontrollers and embedded C programming under expert guidance. Developed embedded applications and gained practical experience in hardware-software integration.",
      technologies: ["Microcontrollers", "Embedded C", "Hardware Integration", "IoT"],
      color: "from-purple-500 to-purple-600"
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleAddExperience = () => {
    toast({
      title: "Add Experience",
      description: "Adding new experience functionality will be implemented.",
    });
  };

  const handleEditExperience = (index: number) => {
    toast({
      title: "Edit Experience",
      description: `Editing experience ${index + 1} functionality will be implemented.`,
    });
  };

  return (
    <section id="experience" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Professional <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            Practical experience in VLSI design, embedded systems, and industrial automation through internships and hands-on projects.
          </p>
        </div>

        <div className="space-y-6">
          {isOwnerView && (
            <div className="flex justify-end mb-6">
              <Button onClick={handleAddExperience} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </div>
          )}

          {experiences.map((exp, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <Collapsible open={openItems.includes(index)} onOpenChange={() => toggleItem(index)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className={`cursor-pointer bg-gradient-to-r ${exp.color} text-white hover:opacity-90 transition-opacity`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold mb-2">{exp.title}</CardTitle>
                        <div className="flex flex-wrap items-center gap-4 text-white/90">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span className="text-sm">{exp.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{exp.location}</span>
                          </div>
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                            {exp.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isOwnerView && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditExperience(index);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                        <ChevronDown className={`w-5 h-5 transition-transform ${openItems.includes(index) ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <CardContent className="p-6 bg-gray-50">
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-800 text-lg mb-2">{exp.company}</h4>
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-3">Technologies & Skills</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <Badge 
                            key={techIndex} 
                            variant="secondary"
                            className="bg-white text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
