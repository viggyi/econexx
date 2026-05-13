"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";


import * as url from "@/utils/Url";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, subscribeNews } from "@/store/action/blogActions";
import { resetSubscribeState } from "@/store/slices/blogSlice";


import { Bookmark, Calendar, Clock, Eye, Flame, Mail, Send, Users, Tag,} from "lucide-react";

import Button from "@/components/ui/Button";
import Pagination from "@/components/Pagination";
import AnimatedSection from "@/components/AnimatedSection";

import {highlightLastWords} from "@/utils/helper"

export default function MediaCoverage() {
  const dispatch = useDispatch();

  const {
    blogs,
    pagination,
    banner,
    subscribeLoading,
    subscribeSuccess,
    subscribeError, } = useSelector((state) => state.blog);
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState("");
  const perPage = 6;

  console.log("pageItems",blogs);
  

  const handleSubscribe = () => {
  if (!email) return;
  dispatch(subscribeNews(email));
};

  // ✅ API CALL (UPDATED)
  useEffect(() => {
    dispatch(fetchBlogs({ page: currentPage, per_page: perPage }));
  }, [dispatch, currentPage]);


  useEffect(() => {
  if (subscribeSuccess) {
    toast.success("Subscribed successfully!");
    setEmail("");
    dispatch(resetSubscribeState());
  }

  if (subscribeError) {
    toast.error(subscribeError);
    dispatch(resetSubscribeState());
  }
}, [subscribeSuccess, subscribeError]);

  // ✅ Pagination (API first, fallback safe)
  const totalPages = pagination?.last_page || Math.ceil((blogs?.length || 0) / perPage);

  // ✅ Safe data fallback
  const sourceData = Array.isArray(blogs) ? blogs : [];

  // ❌ DO NOT slice (API already paginated)
  const pageItems = sourceData;

  // ================= HERO =================
  function renderHero() {
    const hero = banner || {};
    return (
      <section className="heroSection hero-glow gridBgDark noise bg-primary-900 py-10 px-6 lg:px-16 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full border float"
          style={{ borderColor: "rgba(122,61,154,.1)" }} />
        <div className="absolute top-40 right-32 w-56 h-56 rounded-full border"
          style={{ borderColor: "rgba(182,138,204,.06)" }} />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border"
          style={{ borderColor: "rgba(122,61,154,.07)" }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

            <AnimatedSection delay={0.2} y={40}>
              <div>
                <div className="flex items-center gap-2 mb-6">

                  <span className="inline-block font-semibold uppercase tracking-widest text-[.62rem] px-3 py-0.5 rounded-full text-primary-300"
                    style={{
                      background: "rgba(122,61,154,.18)",
                      border: "1px solid rgba(182,138,204,.22)",
                    }}>
                    Market Intelligence
                  </span>

                  <span className="inline-block font-semibold uppercase tracking-widest text-[.62rem] px-3 py-0.5 rounded-full text-secondary-400"
                    style={{
                      background: "rgba(196,114,34,.12)",
                      border: "1px solid rgba(249,162,79,.22)",
                    }}>
                    Weekly Updated
                  </span>

                </div>

                <h1 className="heroTitle font-bold leading-[1.05] mb-6 text-primary-50">
                  {highlightLastWords(hero?.title, "gradBrand", 2) || (
                    <>
                      Insights for Smarter{" "}
                      <span className="gradBrand">
                        Investment Decisions
                      </span>
                    </>
                  )}
                </h1>

                <p className="text-primary-400 text-lg leading-relaxed max-w-lg mb-10">
                  {hero?.subtitle ||
                    "Deep analysis on unlisted equities, pre-IPO opportunities, and fixed income markets — written by practitioners, not journalists."}
                </p>
              </div>
            </AnimatedSection>

            {/* STATS */}
            <AnimatedSection delay={0.35} y={40}>
              <div className="grid grid-cols-2 gap-4 pb-2">

                {(hero?.items?.length
                  ? hero.items
                  : [
                    { number: "80+", title: "Articles Published" },
                    { number: "14K+", title: "Monthly Readers" },
                    { number: "Weekly", title: "Market Roundup" },
                    { number: "8 min", title: "Avg. Read Time" },
                  ]
                ).map((stat, i) => (
                  <div key={i}
                    className="p-5 rounded-[.875rem]"
                    style={{
                      background: "rgba(255,255,255,.05)",
                      border: "1px solid rgba(182,138,204,.1)",
                    }}>
                    <div className="text-3xl font-bold text-secondary-400 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-primary-500 text-xs uppercase tracking-wider">
                      {stat.title}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>
    );
  }

  // ================= ARTICLES =================
  function renderArticles() {
    return (
      <section className="px-6 lg:px-16 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-5">

                {(pageItems.length ? pageItems : []).map((article, i) => {
                  const image = article.featured_image ? `${article.featured_image}` : "/images/blog1.jpg";

                  const date = article.published_at ? new Date(article.published_at).toDateString() : "Recent";

                  return (
                    <AnimatedSection key={i} delay={0.15 + i * 0.1} y={40}>
                      <a
                        href={article.slug ? `/news-and-insights/${article.slug}` : "#"}
                        className="no-underline block bg-white border border-primary-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(122,61,154,.1)]"
                      >

                        {/* SAME UI — untouched */}

                        <div className="grid grid-cols-1 lg:grid-cols-12">
                          <div className="lg:col-span-5 relative min-h-40">
                            <img src={image} alt={article.title} className="h-full w-full" />
                          </div>

                          <div className="lg:col-span-7 p-4">
                            <div className="flex items-center gap-2 mb-3">

                              <span className="inline-block bg-primary-50 border border-primary-100 text-primary-500 font-semibold uppercase tracking-[.1em] text-[.6rem] px-2.5 py-0.5 rounded-full">
                                Blog
                              </span>

                              <span className="w-1 h-1 rounded-full bg-primary-200"></span>

                              <span className="flex items-center gap-1 text-primary-400 text-xs">
                                <Clock size={12} /> 5 min
                              </span>

                              <span className="w-1 h-1 rounded-full bg-primary-200"></span>

                              <span className="flex items-center gap-1 text-primary-400 text-xs">
                                <Calendar size={12} /> {date}
                              </span>
                            </div>

                            <h3 className="font-bold text-primary-900 mb-2 text-xl line-clamp-2">
                              {article.title || "Untitled"}
                            </h3>

                            <p className="text-sm leading-relaxed mb-4 line-clamp-2">
                              {article.excerpt || "Content preview..."}
                            </p>

                            <div className="flex justify-between text-xs">

                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 p-1 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-700 text-xs">
                                  A
                                </div>
                                <span className="text-primary-500 text-xs">
                                  Admin
                                </span>
                              </div>

                              <div className="flex gap-3">
                                <span className="flex items-center gap-1">
                                  <Eye size={12} />
                                  {article.view_count || 0}
                                </span>

                                <span className="flex items-center gap-1">
                                  <Bookmark size={12} />
                                  {article.like_count || 0}
                                </span>
                              </div>

                            </div>
                          </div>
                        </div>
                      </a>
                    </AnimatedSection>
                  );
                })}

              </div>

              {/* PAGINATION */}
              <Pagination
                currentPage={pagination?.current_page || currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>

            {renderRightSidebar()}
          </div>
        </div>
      </section>
    );
  }


  function renderRightSidebar() {
    return (
      <>
        <div className="lg:col-span-1 space-y-6">

          {/* 🔥 TRENDING */}
          <AnimatedSection>
            <div className="bg-white border border-primary-100 rounded-2xl p-6">
              <h3 className="font-serif font-bold text-primary-900 mb-4 flex items-center gap-2 text-lg">
                <Flame size={16} className="text-secondary-500" />
                Trending This Week
              </h3>
              <div className="overflow-y-auto overflow-x-hidden max-h-[70vh]">
                {(blogs?.length ? blogs : []).map((item, i) => (
                  <a
                    key={i}
                    href={item.slug ? `/news-and-insights/${item.slug}` : "#"}
                    className="no-underline flex items-start gap-4 p-3 -mx-3 rounded-lg transition-colors hover:bg-primary-50 border-b border-primary-50 last:border-none"
                  >
                    <span className="font-serif font-bold text-3xl text-primary-100 leading-none mt-0.5 min-w-[2rem]">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <div className="text-sm font-semibold text-primary-800 leading-snug mb-1">
                        {item.title || "Untitled"}
                      </div>

                      <div className="text-xs text-primary-400 flex items-center gap-1.5">
                        <Eye size={12} />
                        {item.view_count || 0} reads
                      </div>
                    </div>
                  </a>
                ))}
              </div>

            </div>
          </AnimatedSection>

          {/* 📩 NEWSLETTER (UNCHANGED DESIGN) */}
          <AnimatedSection>
            <div
              className="relative rounded-2xl overflow-hidden p-6"
              style={{
                background: "linear-gradient(135deg,#0D0812,#220F34)",
                border: "1px solid rgba(182,138,204,.12)",
              }}
            >

              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle,rgba(122,61,154,.25),transparent 70%)",
                }}
              />

              <div className="relative z-10">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: "rgba(249,162,79,.15)",
                    border: "1px solid rgba(249,162,79,.2)",
                  }}
                >
                  <Mail size={18} className="text-secondary-400" />
                </div>

                <h3 className="font-serif font-bold text-primary-100 mb-2 text-lg">
                  Market Intelligence, Weekly
                </h3>

                <p className="text-primary-400 text-sm leading-relaxed mb-5">
                  Pre-IPO movers, bond yields, and one deep-dive — every Friday
                  morning.
                </p>

                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 text-sm font-sans outline-none mb-3"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(182,138,204,.2)",
                    color: "#E6D9F0",
                  }}
                />

                <Button
                  size="lg"
                  variant="secondary"
                  onClick={handleSubscribe}
                  disabled={subscribeLoading}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  {subscribeLoading ? "Subscribing..." : "Subscribe Free"}
                </Button>

                {subscribeSuccess && (
                  <p className="text-green-400 text-xs mt-2 text-center">
                    ✅ Subscribed successfully!
                  </p>
                )}

                {subscribeError && (
                  <p className="text-red-400 text-xs mt-2 text-center">
                    {subscribeError}
                  </p>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* 🏷 TOPICS (UNCHANGED DESIGN) */}
          {/* <AnimatedSection>
            <div className="bg-white border border-primary-100 rounded-2xl p-6">

              <h3 className="font-serif font-bold text-primary-900 mb-4 flex items-center gap-2 text-lg">
                <Tag size={16} className="text-primary-500" />
                Browse Topics
              </h3>

              <div className="flex flex-wrap gap-2">
                {[
                  "Market Analysis",
                  "Pre-IPO",
                  "Bonds",
                  "Economy",
                  "Fintech",
                  "Edtech",
                  "Clean Energy",
                  "SEBI & Regulation",
                  "Deep Dives",
                ].map((topic, i) => (
                  <a
                    key={i}
                    href="#"
                    className="no-underline bg-primary-50 border border-primary-100 text-primary-600 text-xs font-medium px-3 py-1.5 rounded-full transition-all hover:border-primary-300 hover:bg-primary-100"
                  >
                    {topic}
                  </a>
                ))}
              </div>

            </div>
          </AnimatedSection> */}

        </div>
      </>
    );
  }

  // ================= RETURN =================
  return (
    <div className="w-full text-gray-800">
      {renderHero()}
      {renderArticles()}
    </div>
  );
}