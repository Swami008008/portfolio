
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AboutSectionProps {
  isOwnerView: boolean;
}

const AboutSection = ({ isOwnerView }: AboutSectionProps) => {
  const [quote, setQuote] = useState("The future of technology lies in the intricate dance of electrons through silicon pathways.");
  const [aboutText, setAboutText] = useState(`I am a B.Tech student with a minor in VLSI at Lovely Professional University, Punjab, deeply passionate about VLSI and Digital IC Design. My expertise lies in RTL design, CMOS logic, and FPGA-based implementations, with practical exposure to FinFET, 45nm, and 90nm technologies. I specialize in optimizing circuit performance using tools like Cadence Virtuoso.

Currently, I am sharpening my practical knowledge through an ongoing VISI internship at SURE Trust, where I am actively involved in advanced VLSI projects, gaining real-world insights into semiconductor design and industry workflows.

I continuously engage in Cadence-certified training and work hands-on with tools like Cadence Virtuoso, Xilinx Vivado, and ModelSim. I thrive on solving complex digital circuit challenges and exploring innovations in semiconductor design.`);
  
  const [coreExpertise, setCoreExpertise] = useState([
    "Digital IC & RTL Design – Logic design, FSM-based circuits, and sequential circuits",
    "FinFET-Based Circuit Optimization – Improving power efficiency and performance", 
    "EDA Tools Mastery – Cadence Virtuoso, Xilinx Vivado, ModelSim",
    "Continuous Learning & Hands-on Development"
  ]);

  const { toast } = useToast();

  const handleEditQuote = () => {
    const newQuote = prompt("Edit your inspirational quote:", quote);
    if (newQuote && newQuote.trim()) {
      setQuote(newQuote.trim());
      toast({
        title: "Quote updated",
        description: "Your inspirational quote has been updated.",
      });
    }
  };

  const handleEditAbout = () => {
    const newAbout = prompt("Edit your about text:", aboutText);
    if (newAbout && newAbout.trim()) {
      setAboutText(newAbout.trim());
      toast({
        title: "About updated",
        description: "Your about section has been updated.",
      });
    }
  };

  const handleAddExpertise = () => {
    const newExpertise = prompt("Add new expertise:");
    if (newExpertise && newExpertise.trim()) {
      setCoreExpertise([...coreExpertise, newExpertise.trim()]);
      toast({
        title: "Expertise added",
        description: "New expertise has been added.",
      });
    }
  };

  const handleEditExpertise = (index: number) => {
    const newExpertise = prompt("Edit expertise:", coreExpertise[index]);
    if (newExpertise && newExpertise.trim()) {
      const updated = [...coreExpertise];
      updated[index] = newExpertise.trim();
      setCoreExpertise(updated);
      toast({
        title: "Expertise updated",
        description: "Your expertise has been updated.",
      });
    }
  };

  const handleDeleteExpertise = (index: number) => {
    if (confirm("Are you sure you want to delete this expertise?")) {
      const updated = coreExpertise.filter((_, i) => i !== index);
      setCoreExpertise(updated);
      toast({
        title: "Expertise deleted",
        description: "Your expertise has been deleted.",
      });
    }
  };

  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            About <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-12">
          {/* Main About Content */}
          <Card className="relative border-0 shadow-lg bg-white">
            {isOwnerView && (
              <div className="absolute top-4 right-4">
                <Button variant="outline" size="sm" onClick={handleEditAbout}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            )}
            
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify">
                {aboutText.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quote Section */}
          <Card className="relative border-0 bg-white shadow-lg">
            {isOwnerView && (
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute top-4 right-4"
                onClick={handleEditQuote}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Quote
              </Button>
            )}
            
            <CardContent className="p-8">
              <blockquote className="text-2xl italic text-blue-600 font-medium text-center mb-8">
                "{quote}"
              </blockquote>
            </CardContent>
          </Card>

          {/* Core Expertise */}
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800">Core Expertise</h3>
                {isOwnerView && (
                  <Button onClick={handleAddExpertise} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Expertise
                  </Button>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {coreExpertise.map((item, index) => (
                  <div key={index} className="relative group flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors duration-300">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed flex-1">
                      {item}
                    </p>
                    {isOwnerView && (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditExpertise(index)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteExpertise(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
