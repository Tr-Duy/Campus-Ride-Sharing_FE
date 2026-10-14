import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import PopularRoutesSection from '../components/sections/PopularRoutesSection';
import StepGuideSection from '../components/sections/StepGuideSection';
import FeatureHighlightSection from '../components/sections/FeatureHighlightSection';
import CtaBannerSection from '../components/sections/CtaBannerSection';

export default function HomePage() {
  return <>
    <HeroSection />
    <ServicesSection />
    <FeatureHighlightSection />
    <StepGuideSection />
    <PopularRoutesSection />
    <CtaBannerSection />
  </>;
}
