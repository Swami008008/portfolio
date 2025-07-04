
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
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';

const Index = () => {
  const [isOwnerView, setIsOwnerView] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navigation isOwnerView={isOwnerView} setIsOwnerView={setIsOwnerView} />
      
      <main className="relative">
        <HeroSection isOwnerView={isOwnerView} />
        <AboutSection isOwnerView={isOwnerView} />
        <SkillsSection isOwnerView={isOwnerView} />
        <ProjectsSection isOwnerView={isOwnerView} />
        <ExperienceSection isOwnerView={isOwnerView} />
        <EducationSection isOwnerView={isOwnerView} />
        <CertificationsSection isOwnerView={isOwnerView} />
        <AchievementsSection isOwnerView={isOwnerView} />
        <ContactSection />
        <BlogSection isOwnerView={isOwnerView} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
