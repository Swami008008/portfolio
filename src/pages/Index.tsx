
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection';
import EducationSection from '../components/EducationSection';
import CertificationsSection from '../components/CertificationsSection';
import AchievementsSection from '../components/AchievementsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  const [isOwnerView, setIsOwnerView] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 -left-32 w-64 h-64 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navigation isOwnerView={isOwnerView} setIsOwnerView={setIsOwnerView} />
      
      <main className="relative z-10">
        <HeroSection isOwnerView={isOwnerView} />
        <AboutSection isOwnerView={isOwnerView} />
        <SkillsSection isOwnerView={isOwnerView} />
        <ProjectsSection isOwnerView={isOwnerView} />
        <ExperienceSection isOwnerView={isOwnerView} />
        <EducationSection isOwnerView={isOwnerView} />
        <CertificationsSection isOwnerView={isOwnerView} />
        <AchievementsSection isOwnerView={isOwnerView} />
        <ContactSection isOwnerView={isOwnerView} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
