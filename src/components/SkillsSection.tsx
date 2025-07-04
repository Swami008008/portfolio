
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SkillsSectionProps {
  isOwnerView: boolean;
}

const SkillsSection = ({ isOwnerView }: SkillsSectionProps) => {
  const [isPublic, setIsPublic] = useState(true);
  const { toast } = useToast();

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Verilog HDL", "C", "C++", "Python", "Ladder Logic"],
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Tools/Platforms", 
      skills: ["Cadence Virtuoso", "NCsim", "Xilinx Vivado", "ModelSim", "LogixPro", "VS Code", "Arduino IDE", "Proteus", "Keil uVision"],
      color: "from-indigo-500 to-indigo-600"
    },
    {
      title: "Technical Skills",
      skills: ["Digital Circuit Design", "RTL Coding", "CMOS Design", "Digital Electronics"],
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Soft Skills",
      skills: ["Problem-Solving", "Teamwork", "Attention to Detail", "Communication", "Time Management", "Continuous Learning"],
      color: "from-green-500 to-green-600"
    }
  ];

  const handleAddSkill = (categoryIndex: number) => {
    const newSkill = prompt("Add a new skill:");
    if (newSkill) {
      toast({
        title: "Skill added",
        description: `"${newSkill}" has been added to your skills.`,
      });
    }
  };

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Technical <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            A comprehensive toolkit for VLSI design and digital electronics development
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              {isOwnerView && (
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAddSkill(categoryIndex)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsPublic(!isPublic)}
                  >
                    {isPublic ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                </div>
              )}

              <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color} mr-3`}></div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex}
                      variant="secondary"
                      className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200 cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skills Progress Visualization */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Proficiency Overview</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { skill: "Verilog HDL", level: 90 },
              { skill: "Cadence Virtuoso", level: 85 },
              { skill: "Digital Circuit Design", level: 88 },
              { skill: "FPGA Development", level: 82 }
            ].map((item, index) => (
              <Card key={index} className="border-0 shadow-md bg-white">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold text-gray-800 mb-4">{item.skill}</h4>
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        strokeDasharray={`${item.level}, 100`}
                        className="transition-all duration-1000 ease-out"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-800">{item.level}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
