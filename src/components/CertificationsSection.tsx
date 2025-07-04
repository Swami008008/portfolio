
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Upload, Edit, Plus, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CertificationsSectionProps {
  isOwnerView: boolean;
}

const CertificationsSection = ({ isOwnerView }: CertificationsSectionProps) => {
  const { toast } = useToast();

  const certifications = [
    {
      name: "Digital IC Design v3.0",
      issuer: "Cadence",
      year: "2024",
      category: "VLSI Design",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Verilog Applications",
      issuer: "Cadence",
      year: "2024",
      category: "HDL Programming",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      name: "Semiconductor 101",
      issuer: "Cadence",
      year: "2024",
      category: "Fundamentals",
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "VLSI for Beginners",
      issuer: "NIELIT",
      year: "2024",
      category: "VLSI Design",
      color: "from-green-500 to-green-600"
    },
    {
      name: "Python for Beginners",
      issuer: "SimpliLearn",
      year: "2023",
      category: "Programming",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "AVR Programming",
      issuer: "Microchip",
      year: "2023",
      category: "Embedded Systems",
      color: "from-red-500 to-red-600"
    },
    {
      name: "CCNAv7",
      issuer: "Cisco",
      year: "2023",
      category: "Networking",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  const handleUploadCertificate = (index: number) => {
    toast({
      title: "Upload Certificate",
      description: `Uploading certificate for ${certifications[index].name}...`,
    });
  };

  const handleEditCertification = (index: number) => {
    toast({
      title: "Edit Certification",
      description: `Editing ${certifications[index].name}...`,
    });
  };

  const handleAddCertification = () => {
    toast({
      title: "Add Certification",
      description: "Adding new certification functionality will be implemented.",
    });
  };

  return (
    <section id="certifications" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        {isOwnerView && (
          <div className="flex justify-end mb-8">
            <Button onClick={handleAddCertification} className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Certification
            </Button>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group bg-white">
              <div className={`h-2 bg-gradient-to-r ${cert.color}`}></div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${cert.color} flex items-center justify-center flex-shrink-0`}>
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  
                  {isOwnerView && (
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUploadCertificate(index)}
                      >
                        <Upload className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditCertification(index)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-800 text-lg leading-tight">{cert.name}</h3>
                  <p className="text-gray-600 font-semibold">{cert.issuer}</p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className={`bg-gradient-to-r ${cert.color} text-white`}>
                      {cert.year}
                    </Badge>
                    <Badge variant="outline" className="text-gray-600">
                      {cert.category}
                    </Badge>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4 hover:bg-gray-50"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
