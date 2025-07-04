
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Upload, GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EducationSectionProps {
  isOwnerView: boolean;
}

const EducationSection = ({ isOwnerView }: EducationSectionProps) => {
  const { toast } = useToast();

  const education = [
    {
      degree: "B.Tech - Electronics and Communication Engineering",
      specialization: "Minor in VLSI",
      institution: "Lovely Professional University",
      location: "Punjab, India",
      duration: "2023 - Present",
      grade: "CGPA: 8.3",
      status: "Current",
      description: "Pursuing Bachelor's degree with specialized focus on VLSI design and digital electronics. Engaged in advanced coursework covering semiconductor physics, digital design, and modern VLSI technologies.",
      subjects: ["VLSI Design", "Digital Electronics", "Semiconductor Physics", "Signal Processing", "Embedded Systems", "Communication Systems"]
    },
    {
      degree: "Diploma - Electronics and Communication Engineering", 
      institution: "A.A.N.M & V.V.R.S.R Polytechnic",
      location: "Andhra Pradesh, India",
      duration: "2020 - 2023",
      grade: "97.15%",
      status: "Completed",
      description: "Completed diploma with exceptional academic performance, building strong foundation in electronics and communication engineering fundamentals.",
      subjects: ["Electronic Devices", "Digital Electronics", "Microprocessors", "Communication Engineering", "Control Systems", "PCB Design"]
    },
    {
      degree: "High School Education",
      institution: "PRKR Gowthami High School", 
      location: "Andhra Pradesh, India",
      duration: "2014 - 2020",
      grade: "100%",
      status: "Completed",
      description: "Achieved perfect academic record with strong foundation in mathematics and sciences, demonstrating early excellence in analytical thinking.",
      subjects: ["Mathematics", "Physics", "Chemistry", "Computer Science"]
    }
  ];

  const handleAddEducation = () => {
    toast({
      title: "Add Education",
      description: "Adding new educational qualification...",
    });
  };

  const handleUploadCertificate = (institution: string) => {
    toast({
      title: "Upload Certificate",
      description: `Uploading certificate/marksheet for ${institution}...`,
    });
  };

  return (
    <section id="education" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Educational <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Journey</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            Academic excellence and continuous learning in electronics and VLSI
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Academic Qualifications</h3>
            {isOwnerView && (
              <Button onClick={handleAddEducation}>
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            )}
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-indigo-600 hidden md:block"></div>

            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full border-4 border-white shadow-lg hidden md:block"></div>

                  <Card className="md:ml-16 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
                    {isOwnerView && (
                      <div className="absolute top-4 right-4 flex gap-2 z-10">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleUploadCertificate(edu.institution)}
                        >
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                    )}

                    <div className={`h-2 bg-gradient-to-r ${
                      edu.status === 'Current' ? 'from-green-500 to-emerald-500' : 'from-blue-500 to-indigo-500'
                    }`}></div>

                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <GraduationCap className="w-6 h-6 text-blue-600" />
                            <Badge 
                              variant={edu.status === 'Current' ? 'default' : 'secondary'}
                              className={edu.status === 'Current' ? 'bg-green-600' : 'bg-blue-600'}
                            >
                              {edu.status}
                            </Badge>
                          </div>
                          
                          <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                            {edu.degree}
                          </CardTitle>
                          
                          {edu.specialization && (
                            <p className="text-blue-600 font-semibold mb-3">
                              {edu.specialization}
                            </p>
                          )}
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-4 h-4 mr-2" />
                              {edu.institution}, {edu.location}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-gray-500">
                                <Calendar className="w-4 h-4 mr-2" />
                                {edu.duration}
                              </div>
                              
                              <div className="flex items-center text-green-600 font-semibold">
                                <Award className="w-4 h-4 mr-2" />
                                {edu.grade}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        {edu.description}
                      </p>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Key Subjects:</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.subjects.map((subject, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-gray-100 text-gray-700">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
