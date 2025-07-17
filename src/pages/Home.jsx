import { Helmet } from 'react-helmet-async';
import TrendingSlider from '../components/TrendingSlider';
import PublishersSection from '../components/PublishersSection';
import StatisticsSection from '../components/StatisticsSection';
import PricingPlansSection from '../components/PricingPlansSection';
import FeaturesShowcaseSection from '../components/FeaturesShowcaseSection';
import FinalCtaSection from '../components/FinalCtaSection';




const Home = () => {

  return (
    <div>
      <Helmet>
        <title>NewsPress | Home</title>
      </Helmet>
      <TrendingSlider></TrendingSlider>
      <PublishersSection></PublishersSection>
      <StatisticsSection></StatisticsSection>
      <PricingPlansSection></PricingPlansSection>
      <FeaturesShowcaseSection></FeaturesShowcaseSection>
      <FinalCtaSection></FinalCtaSection>
    </div>
  );
};

export default Home;
