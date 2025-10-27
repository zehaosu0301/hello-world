import HomeClient from '@/components/home/HomeClient';
import { metadataConfig } from '@/lib/metadata';

export const dynamicParams = true;
export const revalidate = 60;
export const metadata = metadataConfig.home;

export default function HomePage() {
  return <HomeClient />;
}
