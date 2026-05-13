"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomePageData } from "@/store/action/homeActions";


import HeroSection from "@/components/Home/HeroSection";
import Homeinfo from "@/components/Home/Homeinfo";
import ServiceInfo from "@/components/Home/ServiceInfo";
import Expertise from "@/components/Home/Expertise";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import HowItWorks from "@/components/Home/HowItWorks";
import Testimonials from "@/components/Home/Testimonials";
import FAQ from "@/components/ui/Faq";
import CTASection from "@/components/Home/CTASection";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  const dispatch = useDispatch();
  const { homeData, status, error } = useSelector((state) => state.home);

  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHomePageData());
    }
  }, [dispatch, status]);

  if (status === "idle" || status === "loading") {
    return <PageLoader />;
  }

  if (status === "failed") {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load home page. {error ? `(${error})` : ""}
      </div>
    );
  }

  return (
    <main className="">
      <HeroSection banner={homeData?.banner} />
      <Homeinfo items={homeData?.items} />
      <ServiceInfo />
      <Expertise data={homeData?.our_expertise} />
      <WhyChooseUs data={homeData?.why_choose_us} />
      <HowItWorks data={homeData?.how_it_works} />
      <Testimonials />
      <CTASection />
      <FAQ
        title={homeData?.faq?.title || "Frequently Asked"}
        highlightedTitle="Questions"
        subtitle={homeData?.faq?.subtitle || "Everything you need to know before investing with Econexx Wealth."}
        data={homeData?.faq?.items || []}
      />
    </main>
  );
}
