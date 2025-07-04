
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, ExternalLink, Upload, Calendar, Github, Link, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProjectsSectionProps {
  isOwnerView: boolean;
}

const ProjectsSection = ({ isOwnerView }: ProjectsSectionProps) => {
  const { toast } = useToast();

  const [embeddedProjects, setEmbeddedProjects] = useState([
    {
      id: 1,
      name: "Air Quality Monitoring Bot",
      date: "2024",
      techStack: ["ESP8266", "DHT11", "MQ135", "Arduino IDE"],
      description: "IoT-based air quality monitoring system that tracks environmental parameters including temperature, humidity, and air quality index. Features real-time data transmission and web dashboard for monitoring.",
      githubLink: "https://github.com/tallanarayanaswami/air-quality-monitor",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Soldier Health Monitor",
      date: "2024", 
      techStack: ["Arduino", "GPS", "GSM", "IoT sensors"],
      description: "Real-time health monitoring system for military personnel with GPS tracking, vital signs monitoring, and emergency alert capabilities. Designed for harsh environmental conditions.",
      githubLink: "https://github.com/tallanarayanaswami/soldier-health-monitor",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Vehicle Theft & Tracking System",
      date: "2023",
      techStack: ["ESP8266", "GPS", "RFID", "Arduino IDE"],
      description: "Advanced vehicle security system with RFID-based access control, GPS tracking, and SMS alerts. Features anti-theft mechanisms and real-time location tracking.",
      githubLink: "https://github.com/tallanarayanaswami/vehicle-tracking",
      image: "/placeholder.svg"
    }
  ]);

  const [vlsiProjects, setVlsiProjects] = useState([
    {
      id: 4,
      name: "Electronic Voting Machine",
      date: "Coming Soon",
      techStack: ["Verilog", "FPGA", "Digital Logic"],
      description: "Secure digital voting system implementation with encrypted ballot storage and tamper-proof design using FPGA technology.",
      githubLink: "",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "4-Bit Flash Analog to Digital Converter",
      date: "Coming Soon", 
      techStack: ["CMOS", "Analog Design", "Cadence"],
      description: "High-speed 4-bit flash ADC design optimized for low power consumption and high accuracy using advanced CMOS technology.",
      githubLink: "",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      name: "4-bit Look Up Table",
      date: "Coming Soon",
      techStack: ["Verilog", "RTL Design", "FPGA"],
      description: "Efficient 4-bit LUT implementation for FPGA applications with optimized timing and resource utilization.",
      githubLink: "",
      image: "/placeholder.svg"
    }
  ]);

  const handleAddProject = (category: string) => {
    const name = prompt("Enter project name:");
    if (!name?.trim()) return;

    const description = prompt("Enter project description:");
    if (!description?.trim()) return;

    const techStackInput = prompt("Enter tech stack (comma separated):");
    const techStack = techStackInput?.split(',').map(tech => tech.trim()).filter(tech => tech) || [];

    const newProject = {
      id: Date.now(),
      name: name.trim(),
      date: new Date().getFullYear().toString(),
      techStack,
      description: description.trim(),
      githubLink: "",
      image: "/placeholder.svg"
    };

    if (category === 'Embedded') {
      setEmbeddedProjects([...embeddedProjects, newProject]);
    } else {
      setVlsiProjects([...vlsiProjects, newProject]);
    }

    toast({
      title: "Project Added",
      description: `${name} has been added to ${category} projects.`,
    });
  };

  const handleEditProject = (projectId: number, category: string) => {
    const projects = category === 'embedded' ? embeddedProjects : vlsiProjects;
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const name = prompt("Edit project name:", project.name);
    if (!name?.trim()) return;

    const description = prompt("Edit project description:", project.description);
    if (!description?.trim()) return;

    const updatedProject = {
      ...project,
      name: name.trim(),
      description: description.trim()
    };

    if (category === 'embedded') {
      setEmbeddedProjects(embeddedProjects.map(p => p.id === projectId ? updatedProject : p));
    } else {
      setVlsiProjects(vlsiProjects.map(p => p.id === projectId ? updatedProject : p));
    }

    toast({
      title: "Project Updated",
      description: "Project details have been updated.",
    });
  };

  const handleDeleteProject = (projectId: number, category: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    if (category === 'embedded') {
      setEmbeddedProjects(embeddedProjects.filter(p => p.id !== projectId));
    } else {
      setVlsiProjects(vlsiProjects.filter(p => p.id !== projectId));
    }

    toast({
      title: "Project Deleted",
      description: "Project has been deleted.",
    });
  };

  const handleImageUpload = (projectId: number, category: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        
        if (category === 'embedded') {
          setEmbeddedProjects(embeddedProjects.map(p => 
            p.id === projectId ? { ...p, image: imageUrl } : p
          ));
        } else {
          setVlsiProjects(vlsiProjects.map(p => 
            p.id === projectId ? { ...p, image: imageUrl } : p
          ));
        }
        
        toast({
          title: "Image Uploaded",
          description: "Project image has been updated.",
        });
      }
    };
    input.click();
  };

  const handleEditGithubLink = (projectId: number, category: string) => {
    const projects = category === 'embedded' ? embeddedProjects : vlsiProjects;
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const newLink = prompt("Enter GitHub link:", project.githubLink);
    if (newLink !== null) {
      if (category === 'embedded') {
        setEmbeddedProjects(embeddedProjects.map(p => 
          p.id === projectId ? { ...p, githubLink: newLink.trim() } : p
        ));
      } else {
        setVlsiProjects(vlsiProjects.map(p => 
          p.id === projectId ? { ...p, githubLink: newLink.trim() } : p
        ));
      }
      
      toast({
        title: "GitHub Link Updated",
        description: "GitHub link has been updated.",
      });
    }
  };

  const ProjectCard = ({ project, category }: { project: any, category: string }) => (
    <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white overflow-hidden rounded-2xl transform hover:scale-105">
      {isOwnerView && (
        <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm" onClick={() => handleEditProject(project.id, category)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleImageUpload(project.id, category)} className="bg-white/90 backdrop-blur-sm">
            <Upload className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleEditGithubLink(project.id, category)} className="bg-white/90 backdrop-blur-sm">
            <Link className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleDeleteProject(project.id, category)} className="bg-white/90 backdrop-blur-sm text-red-600">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
        <img 
          src={project.image} 
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">
            {project.name}
          </CardTitle>
          <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            <Calendar className="w-4 h-4 mr-1" />
            {project.date}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-600 leading-relaxed text-sm">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech: string, index: number) => (
            <Badge key={index} variant="secondary" className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100 transition-colors">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          {project.githubLink ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 group/btn hover:bg-gray-900 hover:text-white transition-all"
              onClick={() => window.open(project.githubLink, '_blank')}
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          ) : (
            isOwnerView && (
              <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditGithubLink(project.id, category)}>
                Add GitHub Link
              </Button>
            )
          )}
          <Button variant="default" size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="projects" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Featured <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            Showcasing innovative solutions in embedded systems and VLSI design
          </p>
        </div>

        <Tabs defaultValue="embedded" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 rounded-xl h-14">
            <TabsTrigger value="embedded" className="rounded-lg font-semibold text-lg py-3">
              Embedded Projects
            </TabsTrigger>
            <TabsTrigger value="vlsi" className="rounded-lg font-semibold text-lg py-3">
              VLSI Projects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="embedded" className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Embedded Systems</h3>
              {isOwnerView && (
                <Button onClick={() => handleAddProject('Embedded')} className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {embeddedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} category="embedded" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vlsi" className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">VLSI Design</h3>
              {isOwnerView && (
                <Button onClick={() => handleAddProject('VLSI')} className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vlsiProjects.map((project) => (
                <ProjectCard key={project.id} project={project} category="vlsi" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProjectsSection;
