
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SkillsSectionProps {
  isOwnerView: boolean;
}

const SkillsSection = ({ isOwnerView }: SkillsSectionProps) => {
  const { toast } = useToast();

  const [skillCategories, setSkillCategories] = useState([
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
  ]);

  const handleAddSkill = (categoryIndex: number) => {
    const newSkill = prompt("Add a new skill:");
    if (newSkill && newSkill.trim()) {
      const updatedCategories = [...skillCategories];
      updatedCategories[categoryIndex].skills.push(newSkill.trim());
      setSkillCategories(updatedCategories);
      toast({
        title: "Skill added",
        description: `"${newSkill}" has been added to your skills.`,
      });
    }
  };

  const handleEditSkill = (categoryIndex: number, skillIndex: number) => {
    const currentSkill = skillCategories[categoryIndex].skills[skillIndex];
    const newSkill = prompt("Edit skill:", currentSkill);
    if (newSkill && newSkill.trim()) {
      const updatedCategories = [...skillCategories];
      updatedCategories[categoryIndex].skills[skillIndex] = newSkill.trim();
      setSkillCategories(updatedCategories);
      toast({
        title: "Skill updated",
        description: "Your skill has been updated.",
      });
    }
  };

  const handleDeleteSkill = (categoryIndex: number, skillIndex: number) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      const updatedCategories = [...skillCategories];
      updatedCategories[categoryIndex].skills.splice(skillIndex, 1);
      setSkillCategories(updatedCategories);
      toast({
        title: "Skill deleted",
        description: "Your skill has been deleted.",
      });
    }
  };

  const handleAddCategory = () => {
    const categoryName = prompt("Enter category name:");
    if (categoryName && categoryName.trim()) {
      const colors = [
        { color: "from-orange-500 to-orange-600", bgColor: "from-orange-50 to-orange-100" },
        { color: "from-pink-500 to-pink-600", bgColor: "from-pink-50 to-pink-100" },
        { color: "from-teal-500 to-teal-600", bgColor: "from-teal-50 to-teal-100" },
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      setSkillCategories([...skillCategories, {
        title: categoryName.trim(),
        skills: [],
        ...randomColor
      }]);
      toast({
        title: "Category added",
        description: "New skill category has been added.",
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

        {isOwnerView && (
          <div className="flex justify-end mb-8">
            <Button onClick={handleAddCategory} className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
        )}

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
                </div>
              )}

              <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
              
              <CardHeader className={`pb-4 bg-gradient-to-r ${category.bgColor}`}>
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
                    <div key={skillIndex} className="relative group/skill">
                      <Badge 
                        variant="secondary"
                        className={`px-4 py-2 text-sm font-medium bg-gradient-to-r ${category.bgColor} text-gray-700 hover:scale-105 transition-transform duration-200 cursor-default border border-gray-200`}
                      >
                        {skill}
                      </Badge>
                      {isOwnerView && (
                        <div className="absolute -top-2 -right-2 opacity-0 group-hover/skill:opacity-100 transition-opacity flex gap-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleEditSkill(categoryIndex, skillIndex)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleDeleteSkill(categoryIndex, skillIndex)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
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
