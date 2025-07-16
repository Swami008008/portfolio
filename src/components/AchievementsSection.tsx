
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Github, Upload, Edit, Plus, ExternalLink, Eye, EyeOff, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AchievementsSectionProps {
  isOwnerView: boolean;
}

const AchievementsSection = ({ isOwnerView }: AchievementsSectionProps) => {
  const [publicAchievements, setPublicAchievements] = useState<boolean[]>([true, true, true]);
  const { toast } = useToast();

  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "Verilog-HDL GitHub Challenge",
      description: "Started an innovative GitHub challenge focused on Verilog HDL programming to help the community learn and practice digital design concepts.",
      type: "Open Source",
      year: "2024",
      color: "from-blue-500 to-indigo-600",
      iconName: "Github",
      hasProof: true,
      proofUrl: "https://github.com/t-swami/verilog-challenge"
    },
    {
      id: 2,
      title: "2nd Prize - LPU Hack-IoT",
      description: "Secured second place in the IoT hackathon at Lovely Professional University for developing an innovative air quality monitoring system.",
      type: "Competition",
      year: "2024",
      color: "from-green-500 to-green-600",
      iconName: "Trophy",
      hasProof: true,
      proofUrl: ""
    },
    {
      id: 3,
      title: "Offer Letter - SoCtronics (HR)",
      description: "Received a job offer from SoCtronics for HR position, demonstrating versatility in both technical and management domains.",
      type: "Career",
      year: "2024",
      color: "from-purple-500 to-purple-600",
      iconName: "Trophy",
      hasProof: true,
      proofUrl: ""
    }
  ]);

  // Icon mapping function
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Github,
      Trophy
    };
    return iconMap[iconName] || Trophy;
  };

  // Load achievements from localStorage on mount
  useEffect(() => {
    const storedAchievements = localStorage.getItem('portfolioAchievements');
    const storedVisibility = localStorage.getItem('portfolioAchievementsVisibility');
    if (storedAchievements) {
      setAchievements(JSON.parse(storedAchievements));
    }
    if (storedVisibility) {
      setPublicAchievements(JSON.parse(storedVisibility));
    }
  }, []);

  // Save achievements to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('portfolioAchievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('portfolioAchievementsVisibility', JSON.stringify(publicAchievements));
  }, [publicAchievements]);

  const handleUploadProof = (index: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const fileUrl = event.target?.result as string;
          const updatedAchievements = [...achievements];
          updatedAchievements[index].proofUrl = fileUrl;
          setAchievements(updatedAchievements);
          toast({
            title: "Proof Uploaded",
            description: `Proof for ${achievements[index].title} has been uploaded.`,
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleViewProof = (achievement: any) => {
    if (achievement.proofUrl) {
      if (achievement.proofUrl.startsWith('http')) {
        window.open(achievement.proofUrl, '_blank');
      } else {
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write(`
            <html>
              <head><title>${achievement.title} Proof</title></head>
              <body style="margin:0; display:flex; justify-content:center; align-items:center; min-height:100vh; background:#f0f0f0;">
                <img src="${achievement.proofUrl}" style="max-width:100%; max-height:100%; object-fit:contain;" alt="Achievement Proof" />
              </body>
            </html>
          `);
          newWindow.document.close();
        }
      }
    } else {
      toast({
        title: "Proof Not Available",
        description: "No proof has been uploaded for this achievement.",
        variant: "destructive"
      });
    }
  };

  const handleEditAchievement = (index: number) => {
    const achievement = achievements[index];
    const newTitle = prompt("Edit achievement title:", achievement.title);
    if (!newTitle) return;
    
    const newDescription = prompt("Edit description:", achievement.description);
    if (!newDescription) return;
    
    const newType = prompt("Edit type:", achievement.type);
    if (!newType) return;
    
    const newYear = prompt("Edit year:", achievement.year);
    if (!newYear) return;

    const updatedAchievements = [...achievements];
    updatedAchievements[index] = {
      ...achievement,
      title: newTitle,
      description: newDescription,
      type: newType,
      year: newYear
    };
    setAchievements(updatedAchievements);
    
    toast({
      title: "Achievement Updated",
      description: "Achievement details have been updated.",
    });
  };

  const handleAddAchievement = () => {
    const title = prompt("Enter achievement title:");
    if (!title) return;
    
    const description = prompt("Enter description:");
    if (!description) return;
    
    const type = prompt("Enter type (e.g., Competition, Open Source, Career):");
    if (!type) return;
    
    const year = prompt("Enter year:");
    if (!year) return;

    const colors = [
      "from-blue-500 to-indigo-600",
      "from-green-500 to-green-600", 
      "from-purple-500 to-purple-600",
      "from-red-500 to-red-600",
      "from-yellow-500 to-orange-500"
    ];

    const newAchievement = {
      id: Date.now(),
      title,
      description,
      type,
      year,
      color: colors[Math.floor(Math.random() * colors.length)],
      iconName: "Trophy",
      hasProof: false,
      proofUrl: ""
    };

    setAchievements([...achievements, newAchievement]);
    setPublicAchievements([...publicAchievements, true]);
    
    toast({
      title: "Achievement Added",
      description: "New achievement has been added successfully.",
    });
  };

  const handleDeleteAchievement = (index: number) => {
    if (confirm("Are you sure you want to delete this achievement?")) {
      const updatedAchievements = achievements.filter((_, i) => i !== index);
      const updatedVisibility = publicAchievements.filter((_, i) => i !== index);
      setAchievements(updatedAchievements);
      setPublicAchievements(updatedVisibility);
      toast({
        title: "Achievement Deleted",
        description: "Achievement has been deleted.",
      });
    }
  };

  const togglePublicView = (index: number) => {
    setPublicAchievements(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
    
    toast({
      title: "Visibility Updated",
      description: `Achievement visibility ${publicAchievements[index] ? 'hidden' : 'made public'}.`,
    });
  };

  return (
    <section id="achievements" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Notable <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        {isOwnerView && (
          <div className="flex justify-end mb-8">
            <Button onClick={handleAddAchievement} className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Achievement
            </Button>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const IconComponent = getIconComponent(achievement.iconName);
            if (!isOwnerView && !publicAchievements[index]) return null;
            
            return (
              <Card key={achievement.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group bg-white">
                <div className={`h-2 bg-gradient-to-r ${achievement.color}`}></div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    {isOwnerView && (
                      <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleUploadProof(index)}
                        >
                          <Upload className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditAchievement(index)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => togglePublicView(index)}
                        >
                          {publicAchievements[index] ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteAchievement(index)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg leading-tight mb-2">{achievement.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{achievement.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className={`bg-gradient-to-r ${achievement.color} text-white`}>
                        {achievement.year}
                      </Badge>
                      <Badge variant="outline" className="text-gray-600">
                        {achievement.type}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 hover:bg-gray-50"
                        onClick={() => handleViewProof(achievement)}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Proof
                      </Button>
                      {achievement.iconName === "Github" && achievement.proofUrl && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 hover:bg-gray-50"
                          onClick={() => window.open(achievement.proofUrl, '_blank')}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
