
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Upload, ExternalLink, Trophy, Eye, EyeOff, Github } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AchievementsSectionProps {
  isOwnerView: boolean;
}

const AchievementsSection = ({ isOwnerView }: AchievementsSectionProps) => {
  const [publicView, setPublicView] = useState(true);
  const { toast } = useToast();

  const achievements = [
    {
      title: "Verilog-HDL GitHub Challenge",
      type: "Open Source Initiative",
      status: "Ongoing",
      date: "2024",
      description: "Started a comprehensive GitHub repository featuring Verilog HDL projects and tutorials, contributing to the open-source hardware design community.",
      category: "Development",
      links: {
        github: "https://github.com/tallanarayanaswami/verilog-hdl-challenge",
        demo: ""
      },
      impact: "Educational resource for VLSI students and professionals",
      isPublic: true
    },
    {
      title: "2nd Prize - LPU Hack-IoT",
      type: "Hackathon Competition",
      status: "Achieved",
      date: "2024",
      description: "Secured second position in IoT hackathon at Lovely Professional University for innovative embedded systems solution combining hardware and software integration.",
      category: "Competition",
      links: {
        certificate: "",
        project: ""
      },
      impact: "Recognition for innovative IoT solution design",
      isPublic: true
    },
    {
      title: "Job Offer - SoCtronics",
      type: "Professional Recognition",
      status: "Received",
      date: "2024",
      description: "Received formal job offer from SoCtronics HR team, recognizing technical competency and professional potential in VLSI and embedded systems domain.",
      category: "Career",
      links: {
        offer_letter: ""
      },
      impact: "Industry validation of technical skills and expertise",
      isPublic: true
    }
  ];

  const handleAddAchievement = () => {
    toast({
      title: "Add Achievement",
      description: "Adding new achievement...",
    });
  };

  const handleUploadProof = (title: string) => {
    toast({
      title: "Upload Proof",
      description: `Uploading proof for ${title}...`,
    });
  };

  const handleToggleVisibility = (index: number) => {
    toast({
      title: "Visibility Updated",
      description: "Achievement visibility has been updated.",
    });
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Development': Github,
      'Competition': Trophy,
      'Career': Trophy
    };
    return icons[category as keyof typeof icons] || Trophy;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Development': 'from-green-500 to-green-600',
      'Competition': 'from-blue-500 to-blue-600',
      'Career': 'from-purple-500 to-purple-600'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <section id="achievements" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Notable <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            Recognition and milestones in my technical journey
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Awards & Recognition</h3>
            <div className="flex gap-3">
              {isOwnerView && (
                <>
                  <Button onClick={handleAddAchievement}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Achievement
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setPublicView(!publicView)}
                  >
                    {publicView ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                    {publicView ? 'Public View' : 'Private View'}
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = getCategoryIcon(achievement.category);
              
              return (
                <Card key={index} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden relative">
                  {isOwnerView && (
                    <div className="absolute top-4 right-4 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUploadProof(achievement.title)}
                      >
                        <Upload className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleToggleVisibility(index)}
                      >
                        {achievement.isPublic ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      </Button>
                    </div>
                  )}

                  <div className={`h-2 bg-gradient-to-r ${getCategoryColor(achievement.category)}`}></div>

                  <CardHeader className="pb-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getCategoryColor(achievement.category)} flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-800 leading-tight mb-2">
                          {achievement.title}
                        </CardTitle>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                            {achievement.type}
                          </Badge>
                          <span className="text-sm text-gray-500">{achievement.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge 
                        className={`${
                          achievement.status === 'Ongoing' ? 'bg-blue-600' :
                          achievement.status === 'Achieved' ? 'bg-green-600' : 'bg-purple-600'
                        } text-white`}
                      >
                        {achievement.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {achievement.category}
                      </Badge>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {achievement.description}
                    </p>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-800 font-medium">
                        <strong>Impact:</strong> {achievement.impact}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-2">
                      {achievement.links.github && (
                        <Button variant="outline" size="sm" className="flex-1">
                          <Github className="w-3 h-3 mr-2" />
                          GitHub
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="flex-1">
                        <ExternalLink className="w-3 h-3 mr-2" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Achievement Statistics */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-md bg-gradient-to-br from-blue-500 to-blue-600 text-white text-center">
              <CardContent className="p-6">
                <Trophy className="w-8 h-8 mx-auto mb-4 opacity-80" />
                <div className="text-3xl font-bold mb-2">3</div>
                <div className="opacity-90">Total Achievements</div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md bg-gradient-to-br from-green-500 to-green-600 text-white text-center">
              <CardContent className="p-6">
                <Github className="w-8 h-8 mx-auto mb-4 opacity-80" />
                <div className="text-3xl font-bold mb-2">1</div>
                <div className="opacity-90">Open Source Projects</div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md bg-gradient-to-br from-purple-500 to-purple-600 text-white text-center">
              <CardContent className="p-6">
                <Trophy className="w-8 h-8 mx-auto mb-4 opacity-80" />
                <div className="text-3xl font-bold mb-2">1</div>
                <div className="opacity-90">Competition Awards</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
