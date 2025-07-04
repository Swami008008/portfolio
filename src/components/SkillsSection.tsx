
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
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      title: "Tools/Platforms", 
      skills: ["Cadence Virtuoso", "NCsim", "Xilinx Vivado", "ModelSim", "LogixPro", "VS Code", "Arduino IDE", "Proteus", "Keil uVision"],
      color: "from-indigo-500 to-indigo-600",
      bgColor: "from-indigo-50 to-indigo-100"
    },
    {
      title: "Technical Skills",
      skills: ["Digital Circuit Design", "RTL Coding", "CMOS Design", "Digital Electronics"],
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100"
    },
    {
      title: "Soft Skills",
      skills: ["Problem-Solving", "Teamwork", "Attention to Detail", "Communication", "Time Management", "Continuous Learning"],
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
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
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white overflow-hidden group">
              {isOwnerView && (
                <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
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
                </div>
              )}

              <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
              
              <CardHeader className="pb-4 bg-gradient-to-r ${category.bgColor}">
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${category.color} mr-3`}></div>
                  <span className={`bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.title}
                  </span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex}
                      variant="secondary"
                      className={`px-4 py-2 text-sm font-medium bg-gradient-to-r ${category.bgColor} text-gray-700 hover:scale-105 transition-transform duration-200 cursor-default border border-gray-200`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
