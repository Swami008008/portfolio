
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Upload, ExternalLink, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CertificationsSectionProps {
  isOwnerView: boolean;
}

const CertificationsSection = ({ isOwnerView }: CertificationsSectionProps) => {
  const { toast } = useToast();

  const certifications = [
    {
      title: "Digital IC Design v3.0",
      provider: "Cadence",
      year: "2024",
      category: "VLSI Design",
      verified: true,
      description: "Comprehensive certification covering advanced digital IC design methodologies and industry best practices."
    },
    {
      title: "Verilog Applications",
      provider: "Cadence", 
      year: "2024",
      category: "HDL Programming",
      verified: true,
      description: "Professional certification in Verilog HDL programming and practical applications in digital design."
    },
    {
      title: "Semiconductor 101",
      provider: "Cadence",
      year: "2024",
      category: "Fundamentals",
      verified: true,
      description: "Foundation course covering semiconductor physics and device fundamentals."
    },
    {
      title: "VLSI for Beginners",
      provider: "NIELIT",
      year: "2024",
      category: "VLSI Design",
      verified: true,
      description: "Introductory certification in VLSI design concepts and methodologies."
    },
    {
      title: "Python for Beginners",
      provider: "SimpliLearn",
      year: "2023",
      category: "Programming",
      verified: true,
      description: "Programming fundamentals and practical applications in Python development."
    },
    {
      title: "AVR Programming",
      provider: "Microchip",
      year: "2023",
      category: "Embedded Systems",
      verified: true,
      description: "Microcontroller programming and embedded system development with AVR architecture."
    },
    {
      title: "CCNAv7",
      provider: "Cisco",
      year: "2023",
      category: "Networking",
      verified: true,
      description: "Network fundamentals and Cisco networking technologies certification."
    }
  ];

  const handleAddCertification = () => {
    toast({
      title: "Add Certification",
      description: "Adding new certification...",
    });
  };

  const handleUploadCertificate = (title: string) => {
    toast({
      title: "Upload Certificate",
      description: `Uploading certificate for ${title}...`,
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'VLSI Design': 'from-blue-500 to-blue-600',
      'HDL Programming': 'from-indigo-500 to-indigo-600',
      'Fundamentals': 'from-purple-500 to-purple-600',
      'Programming': 'from-green-500 to-green-600',
      'Embedded Systems': 'from-orange-500 to-orange-600',
      'Networking': 'from-red-500 to-red-600'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <section id="certifications" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Professional <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            Validated expertise through industry-recognized certifications
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Certified Skills & Knowledge</h3>
            {isOwnerView && (
              <Button onClick={handleAddCertification}>
                <Plus className="w-4 h-4 mr-2" />
                Add Certification
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden relative">
                {isOwnerView && (
                  <div className="absolute top-4 right-4 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="sm">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleUploadCertificate(cert.title)}
                    >
                      <Upload className="w-3 h-3" />
                    </Button>
                  </div>
                )}

                <div className={`h-2 bg-gradient-to-r ${getCategoryColor(cert.category)}`}></div>

                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getCategoryColor(cert.category)} flex items-center justify-center`}>
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg leading-tight">
                          {cert.title}
                        </h3>
                        <p className="text-blue-600 font-semibold">
                          {cert.provider}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      {cert.category}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">{cert.year}</span>
                      {cert.verified && (
                        <Badge className="bg-green-600 text-white text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {cert.description}
                  </p>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      View
                    </Button>
                    {isOwnerView && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Upload className="w-3 h-3 mr-2" />
                        Upload
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Certification Statistics */}
          <div className="mt-16 grid md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md bg-white text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">7</div>
                <div className="text-gray-600">Total Certifications</div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md bg-white text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">4</div>
                <div className="text-gray-600">VLSI Focused</div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md bg-white text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-indigo-600 mb-2">3</div>
                <div className="text-gray-600">Cadence Certified</div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md bg-white text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-gray-600">Verified</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
