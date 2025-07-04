
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Calendar, MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EducationSectionProps {
  isOwnerView: boolean;
}

const EducationSection = ({ isOwnerView }: EducationSectionProps) => {
  const { toast } = useToast();

  const [education, setEducation] = useState([
    {
      id: 1,
      degree: "B.Tech - Electronics & Communication Engineering",
      institution: "Lovely Professional University",
      duration: "2023 - Present",
      location: "Punjab, India",
      grade: "CGPA: 8.3",
      description: "Minor in VLSI Design",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      degree: "Diploma - Electronics & Communication Engineering",
      institution: "A.A.N.M & V.V.R.S.R Polytechnic",
      duration: "2020 - 2023",
      location: "Andhra Pradesh, India",
      grade: "97.15%",
      description: "Specialized in Digital Electronics",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      degree: "High School Education",
      institution: "PRKR Gowthami High School",
      duration: "2014 - 2020",
      location: "Andhra Pradesh, India",
      grade: "100%",
      description: "Mathematics, Physics, Chemistry",
      color: "from-purple-500 to-purple-600"
    }
  ]);

  const handleAddEducation = () => {
    const degree = prompt("Enter degree/qualification:");
    if (!degree?.trim()) return;

    const institution = prompt("Enter institution name:");
    if (!institution?.trim()) return;

    const duration = prompt("Enter duration (e.g., 2020-2023):");
    if (!duration?.trim()) return;

    const location = prompt("Enter location:");
    if (!location?.trim()) return;

    const grade = prompt("Enter grade/percentage:");
    if (!grade?.trim()) return;

    const description = prompt("Enter description (optional):") || "";

    const colors = [
      "from-red-500 to-red-600",
      "from-orange-500 to-orange-600",
      "from-yellow-500 to-yellow-600",
      "from-teal-500 to-teal-600",
      "from-pink-500 to-pink-600"
    ];

    const newEducation = {
      id: Date.now(),
      degree: degree.trim(),
      institution: institution.trim(),
      duration: duration.trim(),
      location: location.trim(),
      grade: grade.trim(),
      description: description.trim(),
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    setEducation([newEducation, ...education]);
    toast({
      title: "Education Added",
      description: "New education entry has been added.",
    });
  };

  const handleEditEducation = (id: number) => {
    const edu = education.find(e => e.id === id);
    if (!edu) return;

    const degree = prompt("Edit degree/qualification:", edu.degree);
    if (!degree?.trim()) return;

    const institution = prompt("Edit institution name:", edu.institution);
    if (!institution?.trim()) return;

    const duration = prompt("Edit duration:", edu.duration);
    if (!duration?.trim()) return;

    const location = prompt("Edit location:", edu.location);
    if (!location?.trim()) return;

    const grade = prompt("Edit grade/percentage:", edu.grade);
    if (!grade?.trim()) return;

    const description = prompt("Edit description:", edu.description) || "";

    const updatedEducation = {
      ...edu,
      degree: degree.trim(),
      institution: institution.trim(),
      duration: duration.trim(),
      location: location.trim(),
      grade: grade.trim(),
      description: description.trim()
    };

    setEducation(education.map(e => e.id === id ? updatedEducation : e));
    toast({
      title: "Education Updated",
      description: "Education entry has been updated.",
    });
  };

  const handleDeleteEducation = (id: number) => {
    if (confirm("Are you sure you want to delete this education entry?")) {
      setEducation(education.filter(e => e.id !== id));
      toast({
        title: "Education Deleted",
        description: "Education entry has been deleted.",
      });
    }
  };

  return (
    <section id="education" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Educational <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Journey</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        {isOwnerView && (
          <div className="flex justify-end mb-8">
            <Button onClick={handleAddEducation} className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>
        )}

        <div className="space-y-4">
          {education.map((edu) => (
            <Card key={edu.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group bg-white">
              <div className={`h-1 bg-gradient-to-r ${edu.color}`}></div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${edu.color} flex items-center justify-center mr-4 flex-shrink-0`}>
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{edu.degree}</h3>
                      <p className="text-md font-semibold text-gray-600 mb-2">{edu.institution}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{edu.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{edu.location}</span>
                        </div>
                        <Badge variant="secondary" className={`bg-gradient-to-r ${edu.color} text-white text-xs`}>
                          {edu.grade}
                        </Badge>
                      </div>
                      
                      {edu.description && (
                        <p className="text-gray-700 text-sm mt-2">{edu.description}</p>
                      )}
                    </div>
                  </div>
                  
                  {isOwnerView && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-4 flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditEducation(edu.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteEducation(edu.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
