"use client";
import React, { useEffect, useMemo } from "react";
import { SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import AnimatedSection from "@/components/AnimatedSection";
import SectionTitle from "@/components/SectionTitle";
import ReusableSlider from "@/components/ReusableSlider";
import { fetchTestimonials } from "@/store/slices/testimonialSlice";


const Testimonials = () => {
  const dispatch = useDispatch();
  const [swiperInstance, setSwiperInstance] = React.useState(null);
  const { list, loading } = useSelector((state) => state.testimonials);

  useEffect(() => {
    if (!list?.length && !loading) {
      dispatch(fetchTestimonials());
    }
  }, [dispatch, list?.length, loading]);

  const testimonials = useMemo(() => {
    if (!Array.isArray(list) || list.length === 0) {
      return [];
    }

    return [...list]
      .sort((a, b) => Number(b?.is_featured) - Number(a?.is_featured))
      .map((item) => ({
        id: item.id,
        quote: item.testimonial,
        author: item.name,
        designation: item.designation,
      }));
  }, [list]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          align="center"
          eyebrow="Testimonials"
          title="Trusted by Growth-Focused Investors"
          description="Trusted by 1,50,000+ customers"
        />
        <AnimatedSection delay={0.2}>
          <div className="relative max-w-4xl mx-auto">
            {testimonials.length > 0 ? (
              <>
                <ReusableSlider
                  slidesPerView={1}
                  spaceBetween={30}
                  loop={true}
                  autoplay={true}
                  delay={5000}
                  navigation={false}
                  breakpoints={{
                    640: { slidesPerView: 1 },
                    1024: { slidesPerView: 1 },
                  }}
                  onSwiper={setSwiperInstance}
                  className="testimonial-slider"
                >
                  {testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                      <div className="text-center px-8 py-12">
                        <div className="flex justify-center mb-6">
                          <Quote className="w-12 h-12 text-secondary-500" />
                        </div>
                        <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-8 font-medium">
                          "{testimonial.quote}"
                        </p>
                        <div className="border-t border-gray-200 pt-6 inline-block">
                          <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                            {testimonial.author}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {testimonial.designation}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </ReusableSlider>

                <button
                  className="absolute -left-16 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-secondary-500 hover:bg-secondary-600 flex items-center justify-center transition-colors z-10"
                  onClick={() => swiperInstance?.slidePrev()}
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                <button
                  className="absolute -right-16 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-secondary-500 hover:bg-secondary-600 flex items-center justify-center transition-colors z-10"
                  onClick={() => swiperInstance?.slideNext()}
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </>
            ) : (
              <div className="text-center px-8 py-12 border border-gray-200 rounded-2xl">
                <p className="text-base md:text-lg text-gray-600">
                  Testimonials not available.
                </p>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Testimonials;
