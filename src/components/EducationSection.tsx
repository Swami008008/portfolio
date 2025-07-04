
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Calendar, MapPin, Award, Upload, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EducationSectionProps {
  isOwnerView: boolean;
}

const EducationSection = ({ isOwnerView }: EducationSectionProps) => {
  const { toast } = useToast();

  const education = [
    {
      degree: "B.Tech - Electronics & Communication Engineering",
      institution: "Lovely Professional University",
      duration: "2023 - Present",
      location: "Punjab, India",
      grade: "CGPA: 8.3",
      description: "Minor in VLSI Design",
      color: "from-blue-500 to-indigo-600"
    },
    {
      degree: "Diploma - Electronics & Communication Engineering",
      institution: "A.A.N.M & V.V.R.S.R Polytechnic",
      duration: "2020 - 2023",
      location: "Andhra Pradesh, India",
      grade: "97.15%",
      description: "Specialized in Digital Electronics",
      color: "from-green-500 to-green-600"
    },
    {
      degree: "High School Education",
      institution: "PRKR Gowthami High School",
      duration: "2014 - 2020",
      location: "Andhra Pradesh, India",
      grade: "100%",
      description: "Mathematics, Physics, Chemistry",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const handleUploadCertificate = (index: number) => {
    toast({
      title: "Upload Certificate",
      description: `Uploading certificate for ${education[index].degree}...`,
    });
  };

  const handleEditEducation = (index: number) => {
    toast({
      title: "Edit Education",
      description: `Editing education ${index + 1} functionality will be implemented.`,
    });
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

        <div className="space-y-6">
          {education.map((edu, index) => (
            <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className={`h-2 bg-gradient-to-r ${edu.color}`}></div>
              
              <CardContent className="p-6 bg-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${edu.color} flex items-center justify-center mr-4`}>
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{edu.degree}</h3>
                        <p className="text-lg font-semibold text-gray-600">{edu.institution}</p>
                      </div>
                    </div>
                    
                    <div className="ml-16 space-y-3">
                      <div className="flex flex-wrap items-center gap-4 text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{edu.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{edu.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="w-4 h-4 mr-2" />
                          <Badge variant="secondary" className={`bg-gradient-to-r ${edu.color} text-white`}>
                            {edu.grade}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 font-medium">{edu.description}</p>
                    </div>
                  </div>
                  
                  {isOwnerView && (
                    <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUploadCertificate(index)}
                      >
                        <Upload className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditEducation(index)}
                      >
                        <Edit className="w-4 h-4" />
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
