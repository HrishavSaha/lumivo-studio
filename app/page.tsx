import { HomeHero } from "@/components/home/hero";
import { StrategySplit } from "@/components/home/strategy-split";
import { ServiceCards } from "@/components/home/service-cards";

export default function Home() {
  return (
    <>
      <HomeHero />
      <StrategySplit />
      <ServiceCards />
    </>
  );
}
