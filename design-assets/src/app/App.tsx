import { HeaderV2 } from './components/HeaderV2';
import { HeroSectionV2 } from './components/HeroSectionV2';
import { FeaturesSectionV2 } from './components/FeaturesSectionV2';
import { ServicesSectionV2 } from './components/ServicesSectionV2';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CTASectionV2 } from './components/CTASectionV2';
import { FooterV2 } from './components/FooterV2';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderV2 />
      <main>
        <HeroSectionV2 />
        <FeaturesSectionV2 />
        <ServicesSectionV2 />
        <TestimonialsSection />
        <CTASectionV2 />
      </main>
      <FooterV2 />
    </div>
  );
}