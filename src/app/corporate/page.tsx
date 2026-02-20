import { Metadata } from 'next';
import {
  CorporateHero,
  CorporateMission,
  CorporateServices,
  CorporateLeadership,
  CorporateContact,
  CorporateFooter,
} from '@/components/sections/corporate';

export const metadata: Metadata = {
  title: 'ManyBoost — User Acquisition Technology',
  description: 'We deliver high-quality users to mobile apps and games through proprietary acquisition products and integrated distribution.',
};

export default function CorporatePage() {
  return (
    <main className="min-h-screen bg-white">
      <CorporateHero />
      <CorporateMission />
      <CorporateServices />
      <CorporateLeadership />
      <CorporateContact />
      <CorporateFooter />
    </main>
  );
}
