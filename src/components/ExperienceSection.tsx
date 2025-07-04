
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, Edit, ChevronDown, MapPin, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExperienceSectionProps {
  isOwnerView: boolean;
}

const ExperienceSection = ({ isOwnerView }: ExperienceSectionProps) => {
  const { toast } = useToast();

  const experiences = [
    {
      title: "VISI Internship",
      company: "SURE Trust",
      location: "Remote",
      duration: "Ongoing",
      status: "Current",
      description: "Exploring advanced VLSI concepts including CMOS design, Verilog HDL, SystemVerilog, UVM (Universal Verification Methodology), Design for Test (DFT), Physical Design, and Analog Design. Gaining hands-on experience with industry-standard EDA tools and methodologies.",
      technologies: ["CMOS Design", "Verilog HDL", "SystemVerilog", "UVM", "DFT", "Physical Design", "Analog Design", "EDA Tools"],
      highlights: [
        "Advanced VLSI project implementations",
        "Industry-standard design methodologies", 
        "Real-world semiconductor design experience",
        "Comprehensive verification techniques"
      ]
    },
    {
      title: "PLC Internship",
      company: "Lovely Professional University",
      location: "Punjab, India",
      duration: "July 2024",
      status: "Completed",
      description: "Designed and implemented ladder logic programs for industrial control systems using LogixPro software. Focused on automation solutions and industrial process control.",
      technologies: ["Ladder Logic", "LogixPro", "Industrial Automation", "PLC Programming"],
      highlights: [
        "Industrial control system design",
        "Automation process optimization",
        "Logic circuit implementation",
        "Real-time system programming"
      ]
    },
    {
      title: "Embedded Systems Internship", 
      company: "Microlinks",
      location: "Hyderabad, India",
      duration: "2023",
      status: "Completed",
      description: "Worked extensively with microcontrollers and embedded C programming under expert guidance. Developed practical skills in embedded system design and implementation.",
      technologies: ["Embedded C", "Microcontrollers", "Hardware Programming", "System Integration"],
      highlights: [
        "Microcontroller programming expertise",
        "Embedded system architecture",
        "Hardware-software integration",
        "Real-time embedded applications"
      ]
    }
  ];

  const handleAddExperience = () => {
    toast({
      title: "Add Experience",
      description: "Adding new work experience...",
    });
  };

  return (
    <section id="experience" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Professional <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            Building expertise through hands-on internships and practical projects
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Work Experience & Internships</h3>
            {isOwnerView && (
              <Button onClick={handleAddExperience}>
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            )}
          </div>

          {experiences.map((experience, index) => (
            <Collapsible key={index}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
                {isOwnerView && (
                  <div className="absolute top-4 right-4 z-10">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                )}

                <CollapsibleTrigger className="w-full">
                  <CardHeader className="text-left hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl font-bold text-gray-800">
                            {experience.title}
                          </CardTitle>
                          <Badge 
                            variant={experience.status === 'Current' ? 'default' : 'secondary'}
                            className={experience.status === 'Current' ? 'bg-green-600' : ''}
                          >
                            {experience.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center text-blue-600 font-semibold">
                            <MapPin className="w-4 h-4 mr-2" />
                            {experience.company}
                          </div>
                          
                          <div className="flex items-center text-gray-500">
                            <Calendar className="w-4 h-4 mr-2" />
                            {experience.duration} • {experience.location}
                          </div>
                        </div>
                      </div>

                      <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200" />
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0 pb-6">
                    <div className="space-y-6">
                      <p className="text-gray-700 leading-relaxed">
                        {experience.description}
                      </p>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Key Highlights:</h4>
                        <ul className="space-y-2">
                          {experience.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Technologies & Tools:</h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-blue-50 text-blue-700">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
