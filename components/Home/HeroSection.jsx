"use client";
import React from "react";
import { SwiperSlide } from "swiper/react";
import ReusableSlider from "@/components/ReusableSlider";
import Button from "@/components/ui/Button";
import { Calendar, Layers } from "lucide-react";

const HeroSection = ({ banner }) => {

  const banners = Array.isArray(banner) ? banner 
    : Array.isArray(banner?.banner) ? banner.banner
      : [];

  const renderTitle = (text) => {
    const safeText = text || "";
    const words = safeText.split(" ").filter(Boolean);

    if (words.length === 0) return null;

    return words.map((word, index, array) => {
      const isSecondLast = index === array.length - 2;
      const isLast = index === array.length - 1;

      if (isSecondLast) {
        return (
          <span key={`${word}-${index}`} className="text-secondary-300">
            {word}
            {!isLast ? " " : ""}
          </span>
        );
      }

      return (
        <React.Fragment key={index}>
          {word}
          {!isLast ? " " : ""}
        </React.Fragment>
      );
    });
  };

  const getYoutubeEmbedUrl = (url = "") => {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname.includes("youtube.com")) {
        const videoId = parsedUrl.searchParams.get("v");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
      }
      if (parsedUrl.hostname.includes("youtu.be")) {
        const videoId = parsedUrl.pathname.replace("/", "");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
      }
      return url;
    } catch {
      return url;
    }
  };

  const renderBannerMedia = (item) => {
    const mediaUrl = item?.media_url || item?.media_urls?.[0];
    const mediaType = item?.type;

    if (!mediaUrl) {
      return (
        <img
          src="/images/banner-img.png"
          className="w-full h-full object-cover"
          alt="Homepage banner"
        />
      );
    }

    if (mediaType === "video") {
      return (
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
        >
          <source src={mediaUrl} type="video/mp4" />
        </video>
      );
    }

    if (mediaType === "youtube") {
      return (
        <iframe
          src={getYoutubeEmbedUrl(mediaUrl)}
          className="w-full h-full"
          title={item?.title || "Homepage banner video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    return (
      <img
        src={mediaUrl}
        className="w-full h-full object-cover"
        alt={item?.title || "Homepage banner"}
      />
    );
  };

  return (
    <section
      className={`pt-0 pb-0 overflow-hidden bg-primary-800 bg-cover bg-center no-repeat relative ${
        banners.length ? "" : "bg-[url('/images/bg-banner.png')]"
      }`}
    >
      {banners.length > 0 ? (
        <ReusableSlider
          slidesPerView={1}
          spaceBetween={0}
          loop={banners.length > 1}
          autoplay={banners.length > 1}
          //autoplay={false}
          delay={5000}
          navigation={false}
          pagination={true}
          className="hero-media-slider"
        >
          {banners.map((item) => (
            <SwiperSlide key={item.id}>
              {item?.type === "youtube" ? (
                <div className="w-full h-[360px] sm:h-[430px] lg:h-[560px] px-6 sm:px-10 overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-6 items-center h-full">
                    <div className="pb-10 lg:pb-0">
                      <span className="inline-flex editorial-title font items-center gap-2 px-3 py-2 rounded-full bg-secondary-50 text-secondary-900 text-xs font-semibold tracking-wider mb-6 tracking-tighter">
                        <span className="relative flex h-[10px] w-[10px]">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-[10px] w-[10px] bg-secondary-500" />
                        </span>
                        India's #1 Institutional Access for Retail
                      </span>

                      <h1 className="editorial-title text-3xl md:text-5xl lg:text-5xl text-white leading-[1.1] mb-6 font-bold">
                        {renderTitle(item?.title)}
                      </h1>

                      {item?.description ? (
                        <p className="text-sm md:text-xl text-gray-300 leading-relaxed mb-10 max-w-lg">
                          {item.description}
                        </p>
                      ) : null}

                      <div className="flex flex-wrap gap-4">
                        <Button size="lg" variant="secondary">
                          <Layers className="w-4 h-4 mr-2" /> Explore Our Services
                        </Button>
                        <Button variant="ghost" href="#HowItWorks">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Consultation
                        </Button>
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl">
                      <div className="w-full aspect-[16/10]">{renderBannerMedia(item)}</div>
                    </div>
                  </div>
                </div>
              ) : (
                // Keep "video" and "image" as current full-background slides with overlay text.
                <div className="relative w-full h-[360px] sm:h-[430px] lg:h-[560px] overflow-hidden">
                  {/* Background media */}
                  <div className="absolute inset-0">{renderBannerMedia(item)}</div>

                  {/* Gradients for readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

                  {/* Overlay content */}
                  <div className="relative z-10 h-full flex items-end">
                    <div className="w-full px-6 sm:px-10 pb-10 absolute top-1/2 left-0 -translate-y-1/2">
                      <div className="max-w-7xl mx-auto">
                        <div className="max-w-xl">
                          <h1 className="editorial-title text-3xl md:text-5xl lg:text-5xl text-white leading-[1.1] mb-6 font-bold">
                            {renderTitle(item?.title)}
                          </h1>
                          {item?.description ? (
                            <p className="text-sm md:text-xl text-gray-200/95 leading-relaxed mb-8">
                              {item.description}
                            </p>
                          ) : null}

                          <div className="flex flex-wrap gap-4">
                            <Button size="lg" variant="secondary">
                              <Layers className="w-4 h-4 mr-2" /> Explore Our Services
                            </Button>
                            <Button variant="ghost" href="#HowItWorks">
                              <Calendar className="w-4 h-4 mr-2" />
                              Schedule Consultation
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </ReusableSlider>
      ) : (
        <div className="w-full h-[360px] sm:h-[430px] lg:h-[560px]">
          <img
            src="/images/banner-img.png"
            className="w-full h-full object-cover"
            alt="Homepage banner"
          />
        </div>
      )}
    </section>
  );
};

export default HeroSection;
