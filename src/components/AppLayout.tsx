import React from 'react';
import Navigation from '@/components/heparbion/Navigation';
import HeroSection from '@/components/heparbion/HeroSection';
import TrustBar from '@/components/heparbion/TrustBar';
import PainPointsGrid from '@/components/heparbion/PainPointsGrid';
import SolutionSection from '@/components/heparbion/SolutionSection';
import MegadoseSection from '@/components/heparbion/MegadoseSection';
import ComparisonSection from '@/components/heparbion/ComparisonSection';
import BenefitsSection from '@/components/heparbion/BenefitsSection';
import QuizSection from '@/components/heparbion/QuizSection';
import ClinicSection from '@/components/heparbion/ClinicSection';
import TestimonialsSection from '@/components/heparbion/TestimonialsSection';
import FAQSection from '@/components/heparbion/FAQSection';
import PricingSection from '@/components/heparbion/PricingSection';
import SoundCloudPlayer from '@/components/heparbion/SoundCloudPlayer';
import Footer from '@/components/heparbion/Footer';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream-100 overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <TrustBar />
        <PainPointsGrid />
        <SolutionSection />
        <MegadoseSection />
        <ComparisonSection />
        <BenefitsSection />
        <QuizSection />
        <ClinicSection />
        <TestimonialsSection />
        <FAQSection />
        <PricingSection />
      </main>
      <Footer />
      <SoundCloudPlayer />
    </div>
  );
};

export default AppLayout;
