
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Github, Upload, Edit, Plus, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AchievementsSectionProps {
  isOwnerView: boolean;
}

const AchievementsSection = ({ isOwnerView }: AchievementsSectionProps) => {
  const [publicAchievements, setPublicAchievements] = useState<boolean[]>([true, true, true]);
  const { toast } = useToast();

  const [achievements, setAchievements] = useState([
    {
      title: "Verilog-HDL GitHub Challenge",
      description: "Started an innovative GitHub challenge focused on Verilog HDL programming to help the community learn and practice digital design concepts.",
      type: "Open Source",
      year: "2024",
      color: "from-blue-500 to-indigo-600",
      icon: Github,
      hasProof: true,
      proofUrl: "https://github.com/t-swami/verilog-challenge"
    },
    {
      title: "2nd Prize - LPU Hack-IoT",
      description: "Secured second place in the IoT hackathon at Lovely Professional University for developing an innovative air quality monitoring system.",
      type: "Competition",
      year: "2024",
      color: "from-green-500 to-green-600",
      icon: Trophy,
      hasProof: true,
      proofUrl: ""
    },
    {
      title: "Offer Letter - SoCtronics (HR)",
      description: "Received a job offer from SoCtronics for HR position, demonstrating versatility in both technical and management domains.",
      type: "Career",
      year: "2024",
      color: "from-purple-500 to-purple-600",
      icon: Trophy,
      hasProof: true,
      proofUrl: ""
    }
  ]);

  const handleUploadProof = (index: number) => {
    const proofUrl = prompt("Enter proof URL or upload file:");
    if (proofUrl) {
      const updatedAchievements = [...achievements];
      updatedAchievements[index].proofUrl = proofUrl;
      setAchievements(updatedAchievements);
      toast({
        title: "Proof Uploaded",
        description: `Proof for ${achievements[index].title} has been uploaded.`,
      });
    }
  };

  const handleViewProof = (achievement: any) => {
    if (achievement.proofUrl) {
      window.open(achievement.proofUrl, '_blank');
    } else {
      toast({
        title: "Proof Not Available",
        description: "No proof has been uploaded for this achievement.",
        variant: "destructive"
      });
    }
  };

  const handleEditAchievement = (index: number) => {
    toast({
      title: "Edit Achievement",
      description: `Editing ${achievements[index].title}...`,
    });
  };

  const handleAddAchievement = () => {
    toast({
      title: "Add Achievement",
      description: "Adding new achievement functionality will be implemented.",
    });
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
            const IconComponent = achievement.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group bg-white">
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
                      {achievement.icon === Github && (
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
