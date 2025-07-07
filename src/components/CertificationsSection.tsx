
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Upload, Edit, Plus, ExternalLink, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CertificationsSectionProps {
  isOwnerView: boolean;
}

const CertificationsSection = ({ isOwnerView }: CertificationsSectionProps) => {
  const { toast } = useToast();

  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: "Digital IC Design v3.0",
      issuer: "Cadence",
      year: "2024",
      category: "VLSI Design",
      color: "from-blue-500 to-blue-600",
      certificateUrl: ""
    },
    {
      id: 2,
      name: "Verilog Applications",
      issuer: "Cadence",
      year: "2024",
      category: "HDL Programming",
      color: "from-indigo-500 to-indigo-600",
      certificateUrl: ""
    },
    {
      id: 3,
      name: "Semiconductor 101",
      issuer: "Cadence",
      year: "2024",
      category: "Fundamentals",
      color: "from-purple-500 to-purple-600",
      certificateUrl: ""
    },
    {
      id: 4,
      name: "VLSI for Beginners",
      issuer: "NIELIT",
      year: "2024",
      category: "VLSI Design",
      color: "from-green-500 to-green-600",
      certificateUrl: ""
    },
    {
      id: 5,
      name: "Python for Beginners",
      issuer: "SimpliLearn",
      year: "2023",
      category: "Programming",
      color: "from-yellow-500 to-orange-500",
      certificateUrl: ""
    },
    {
      id: 6,
      name: "AVR Programming",
      issuer: "Microchip",
      year: "2023",
      category: "Embedded Systems",
      color: "from-red-500 to-red-600",
      certificateUrl: ""
    },
    {
      id: 7,
      name: "CCNAv7",
      issuer: "Cisco",
      year: "2023",
      category: "Networking",
      color: "from-cyan-500 to-blue-500",
      certificateUrl: ""
    }
  ]);

  // Load certifications from localStorage on mount
  useEffect(() => {
    const storedCertifications = localStorage.getItem('portfolioCertifications');
    if (storedCertifications) {
      setCertifications(JSON.parse(storedCertifications));
    }
  }, []);

  // Save certifications to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('portfolioCertifications', JSON.stringify(certifications));
  }, [certifications]);

  const handleUploadCertificate = (index: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const fileUrl = event.target?.result as string;
          const updatedCertifications = [...certifications];
          updatedCertifications[index].certificateUrl = fileUrl;
          setCertifications(updatedCertifications);
          toast({
            title: "Certificate Uploaded",
            description: `Certificate for ${certifications[index].name} has been uploaded.`,
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleViewCertificate = (cert: any) => {
    if (cert.certificateUrl) {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>${cert.name} Certificate</title></head>
            <body style="margin:0; display:flex; justify-content:center; align-items:center; min-height:100vh; background:#f0f0f0;">
              <img src="${cert.certificateUrl}" style="max-width:100%; max-height:100%; object-fit:contain;" alt="Certificate" />
            </body>
          </html>
        `);
        newWindow.document.close();
      }
    } else {
      toast({
        title: "Certificate Not Available",
        description: "No certificate has been uploaded for this certification.",
        variant: "destructive"
      });
    }
  };

  const handleEditCertification = (index: number) => {
    const cert = certifications[index];
    const newName = prompt("Edit certification name:", cert.name);
    if (!newName) return;
    
    const newIssuer = prompt("Edit issuer:", cert.issuer);
    if (!newIssuer) return;
    
    const newYear = prompt("Edit year:", cert.year);
    if (!newYear) return;
    
    const newCategory = prompt("Edit category:", cert.category);
    if (!newCategory) return;

    const updatedCertifications = [...certifications];
    updatedCertifications[index] = {
      ...cert,
      name: newName,
      issuer: newIssuer,
      year: newYear,
      category: newCategory
    };
    setCertifications(updatedCertifications);
    
    toast({
      title: "Certification Updated",
      description: "Certification details have been updated.",
    });
  };

  const handleAddCertification = () => {
    const name = prompt("Enter certification name:");
    if (!name) return;
    
    const issuer = prompt("Enter issuer:");
    if (!issuer) return;
    
    const year = prompt("Enter year:");
    if (!year) return;
    
    const category = prompt("Enter category:");
    if (!category) return;

    const colors = [
      "from-blue-500 to-blue-600",
      "from-green-500 to-green-600", 
      "from-purple-500 to-purple-600",
      "from-red-500 to-red-600",
      "from-yellow-500 to-orange-500",
      "from-indigo-500 to-indigo-600"
    ];

    const newCertification = {
      id: Date.now(),
      name,
      issuer,
      year,
      category,
      color: colors[Math.floor(Math.random() * colors.length)],
      certificateUrl: ""
    };

    setCertifications([...certifications, newCertification]);
    
    toast({
      title: "Certification Added",
      description: "New certification has been added successfully.",
    });
  };

  const handleDeleteCertification = (index: number) => {
    if (confirm("Are you sure you want to delete this certification?")) {
      const updatedCertifications = certifications.filter((_, i) => i !== index);
      setCertifications(updatedCertifications);
      toast({
        title: "Certification Deleted",
        description: "Certification has been deleted.",
      });
    }
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
            <Card key={cert.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group bg-white">
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteCertification(index)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
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
                    onClick={() => handleViewCertificate(cert)}
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
