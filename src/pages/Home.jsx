import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';

import TrendingSlider from '../components/TrendingSlider';
import PublishersSection from '../components/PublishersSection';
import StatisticsSection from '../components/StatisticsSection';
import PricingPlansSection from '../components/PricingPlansSection';
import FeaturesShowcaseSection from '../components/FeaturesShowcaseSection';
import FinalCtaSection from '../components/FinalCtaSection';
import SubscriptionPromptModal from '../components/SubscriptionPromptModal';
import TestimonialsSection from '../components/TestimonialsSection';
import SalesPromotionSection from '../components/SalesPromotionSection';

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // cleanup
  }, []);

  return (
    <div>
      <Helmet>
        <title>NewsPress | Home</title>
      </Helmet>

      <TrendingSlider />
      <PublishersSection />
      <StatisticsSection />
      <TestimonialsSection />
      <SalesPromotionSection />
      <PricingPlansSection />
      <FeaturesShowcaseSection />
      <FinalCtaSection />

      {/* Modal */}
      <SubscriptionPromptModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Home;
