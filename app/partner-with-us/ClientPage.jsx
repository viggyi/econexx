"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  ArrowRight,
  FileText,
  Handshake,
  IndianRupee,
  TrendingUp,
  ShieldCheck,
  Zap,
  LayoutDashboard,
  Bell,
  FilePlus,
  UserCheck,
  Calculator,
  Info,
  User,
  Phone,
  Mail,
  Briefcase,
  Layers,
  Users,
  MessageCircle,
  Send,
  Lock,
  Clock,
  Rocket,
  BarChart2,
  CheckCircle,
  Wallet,
} from "lucide-react";

import AnimatedSection from "@/components/AnimatedSection";
import SectionTitle from "@/components/SectionTitle";
import Button from "@/components/ui/Button";
import Testimonials from "@/components/Home/Testimonials";
import FAQ from "@/components/ui/Faq";

import { useDispatch, useSelector } from "react-redux";
import { fetchPartnerPage, applyPartner, } from "@/store/action/partnerActions";
import { resetApplyState } from "@/store/slices/partnerSlice";

import { highlightLastWords } from "@/utils/helper";
import {isLoggedIn} from "@/utils/auth";


export default function PartnerPage() {

  const dispatch = useDispatch();
  const { pageData, loading, applying, applySuccess, applyError, applyErrors } =
    useSelector((state) => state.partner);

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    current_profession: "",
    program: "",
    estimated_client_base: "",
    message: "",
  });

  const loggedIn = isLoggedIn();

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchPartnerPage());
  }, [dispatch]);

  const getError = (field) => {
    return applyErrors?.[field]?.[0] || null;
  };

  const handleSubmit = () => {

    // if (!loggedIn) {
    //   toast.error("Please login first")
    //   return;
    // }
    dispatch(applyPartner(formData));
  };


  useEffect(() => {
    if (applyError) {
      toast.error(applyError);
    }
  }, [applyError]);

  useEffect(() => {
    if (applySuccess) {
      toast.success("Application submitted successfully");
      setFormData({
        full_name: "",
        phone: "",
        email: "",
        current_profession: "",
        program: "",
        estimated_client_base: "",
        message: "",
      });
      dispatch(resetApplyState());
    }
  }, [applySuccess, dispatch]);


  const earningCards = [
    {
      invest: "₹10L",
      earn: "₹15,000",
      label: "One client · One deal"
    },
    {
      invest: "₹50L",
      earn: "₹75,000",
      label: "One client · One deal",
      highlight: true
    },
    {
      invest: "₹1Cr",
      earn: "₹1.5L",
      label: "One client · One deal"
    }
  ];

  function renderHero() {

    const banner = pageData?.banner;

    const title = banner?.title || "Grow Together with EconexxWealth";
    const subtitle = banner?.subtitle;
    const stats = banner?.items;

    return (
      <section className="heroSection hero-glow gridBgDark noise bg-primary-900 py-10 px-6 lg:px-16 overflow-hidden">
        <div
          className="absolute top-20 right-0 w-96 h-96 rounded-full border float"
          style={{ borderColor: "rgba(122,61,154,.1)" }}
        />
        <div
          className="absolute top-40 right-32 w-56 h-56 rounded-full border"
          style={{ borderColor: "rgba(182,138,204,.06)" }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border"
          style={{ borderColor: "rgba(122,61,154,.07)" }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

            {/* LEFT */}
            <AnimatedSection delay={0.2} y={40}>
              <div>

                <div className="flex items-center gap-2 mb-6">
                  <span className="inline-block font-semibold uppercase tracking-widest text-[.62rem] px-3 py-0.5 rounded-full text-primary-300" style={{
                    background: 'rgba(122, 61, 154, 0.18)',
                    border: '1px solid rgba(182, 138, 204, 0.22)'
                  }}>
                    Partnership
                  </span>
                  <span className="inline-block font-semibold uppercase tracking-widest text-[.62rem] px-3 py-0.5 rounded-full text-secondary-400" style={{
                    background: "rgba(196, 114, 34, 0.12)",
                    border: "1px solid rgba(249, 162, 79, 0.22)",
                  }}>
                    Now Open
                  </span>
                </div>

                <h1 className="heroTitle font-bold leading-[1.05] mb-6 text-primary-50">
                  {highlightLastWords(title, "gradBrand", 1) || (
                    <>Grow Together with {" "}
                      <span className="gradBrand">
                        EconexxWealth
                      </span>
                    </>
                  )}
                </h1>

                <p className="text-primary-400 text-lg leading-relaxed max-w-lg mb-6">
                  {subtitle || "Partner with us and unlock exclusive tools, insights, and opportunities designed for serious wealth builders."}
                </p>

                <AnimatedSection delay={0.3} y={30}>
                  <div className="fu3 flex gap-4 flex-wrap">

                    <Button
                      variant="secondary"
                      size="lg"
                      className="flex items-center gap-2"
                      href="https://admin.econexxwealth.com/partners"
                      // onClick={() =>
                      //   document
                      //     .getElementById("apply")
                      //     ?.scrollIntoView({ behavior: "smooth" })
                      // }
                    >
                      <Handshake size={16} />
                      Become a Partner
                    </Button>

                    <Button
                      variant="ghost"
                      size="lg"
                      className="flex items-center gap-2"
                      onClick={() =>
                        document
                          .getElementById("earn")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      <IndianRupee size={16} />
                      See How You Earn
                    </Button>

                  </div>
                </AnimatedSection>

              </div>
            </AnimatedSection>

            {/* RIGHT STATS */}
            <AnimatedSection delay={0.35} y={40}>
              <div className="grid grid-cols-2 gap-4 pb-2">
                {stats?.map((stat, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-[.875rem]"
                    style={{
                      background: "rgba(255,255,255,.05)",
                      border: "1px solid rgba(182,138,204,.1)",
                    }}
                  >
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

  function renderBenefits() {

    const section = pageData?.everything_you_need;

    if (!section || !section?.items || section?.items?.length === 0) {
      return null;
    }

    const ICON_MAP = {
      shild: ShieldCheck,
      rocket: Rocket,
      clock: Clock,
      chart: BarChart2,
      file: FileText,
      bell: Bell,
    };

    return (
      <section className="px-6 lg:px-16 py-24 bg-primary-50">
        <div className="max-w-7xl mx-auto">

          {/* Section Heading */}
          <AnimatedSection>
            <SectionTitle
              align="center"
              eyebrow="What You Get"
              title={section?.title}
              description={section?.subtitle}
            />
          </AnimatedSection>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {section.items.map((card, i) => {
              const Icon = ICON_MAP[card.icon] || ShieldCheck;
              const isSecondary = card.style === "secondary";

              return (
                <AnimatedSection key={i} delay={0.1 + i * 0.1} y={40}>
                  <div
                    className={`bg-white rounded-2xl p-8 transition-all hover:-translate-y-1
                  ${isSecondary
                        ? "border border-secondary-100 hover:border-secondary-200 hover:shadow-[0_12px_32px_rgba(196,114,34,.08)]"
                        : "border border-primary-100 hover:border-primary-200 hover:shadow-[0_12px_32px_rgba(122,61,154,.08)]"
                      }`}
                  >
                    <div className="flex items-start gap-4">

                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border
                      ${isSecondary
                            ? "bg-secondary-50 border-secondary-100"
                            : "bg-primary-50 border-primary-100"
                          }`}
                      >
                        <Icon
                          size={20}
                          className={
                            isSecondary
                              ? "text-secondary-600"
                              : "text-primary-500"
                          }
                        />
                      </div>

                      {/* Content */}
                      <div>
                        {card.label && (
                          <div className="text-[.6rem] font-semibold uppercase tracking-widest text-secondary-500 mb-1.5">
                            {card.label}
                          </div>
                        )}

                        <h3 className="font-bold text-primary-900 mb-2 text-xl">
                          {card.title}
                        </h3>

                        <p className="text-sm leading-relaxed">
                          {card.description}
                        </p>
                      </div>

                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  function renderProcess() {

    const section = pageData?.steps;

    if (!section || !section?.items || section?.items.length === 0) {
      return null;
    }

    const ICONS = [User, FileText, CheckCircle, Wallet];

    return (
      <section className="px-6 lg:px-16 py-24" style={{ background: "#0D0812" }}>
        <div className="max-w-5xl mx-auto">

          <AnimatedSection>
            <SectionTitle
              theme="dark"
              align="center"
              eyebrow="Process"
              title={section?.title}
              description={section?.subtitle}
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20">
            {section.items.map((step, i) => {
              const Icon = ICONS[i] || User;
              const isLast = i === section.items.length - 1;

              return (
                <AnimatedSection key={i} delay={0.1 + i * 0.1} y={40}>
                  <div className="flex gap-6 items-start">
                    <div className="flex flex-col items-center">
                      <div className="step-dot">
                        {step.order}
                      </div>

                      {!isLast && (
                        <div className="step-line mt-2"></div>
                      )}
                    </div>
                    <div className={!isLast ? "pb-10" : ""}>
                      <h3 className="text-2xl font-bold text-primary-100 mb-2 flex items-center gap-2">
                        <Icon size={16} className="text-secondary-400" />
                        {step.title}
                      </h3>

                      <p className="text-primary-500 leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </div>

                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  function renderSecurePlatform() {
    return (
      <section className="py-8 bg-primary-500 text-white text-center">
        <p className="font-medium text-sm">
          1000+ Partners • Secure Platform • India’s #1 Pre-IPO Marketplace
        </p>
      </section>
    )
  }

  function renderPartnerEarnings() {

    return (
      <section id="earn" className="px-6 lg:px-16 py-24 bg-primary-50">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <SectionTitle
              align="center"
              eyebrow="Earnings"
              title="See How Much You Can Earn"
              description="Flat 1.5% commission on every deal your referral closes. No hidden deductions — credited directly to your bank every month."
            />
          </AnimatedSection>
          <AnimatedSection delay={0.1} y={40}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {earningCards.map((card, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-7 text-center transition-all hover:-translate-y-1
                ${card.highlight
                      ? "border-2 relative hover:shadow-[0_20px_50px_rgba(122,61,154,.12)]"
                      : "border border-primary-100 hover:border-primary-200 hover:shadow-[0_12px_32px_rgba(122,61,154,.08)]"
                    } bg-white`}
                  style={
                    card.highlight
                      ? {
                        borderColor: "#F9A24F",
                        boxShadow: "0 8px 30px rgba(249,162,79,.1)"
                      }
                      : {}
                  }
                >

                  {card.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span
                        className="inline-block font-semibold uppercase tracking-widest text-[.6rem] px-3 py-1 rounded-full"
                        style={{
                          background: "linear-gradient(135deg,#F9A24F,#C47222)",
                          color: "#fff"
                        }}
                      >
                        Most Common
                      </span>
                    </div>
                  )}

                  <div className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-4">
                    Your Referral Invests
                  </div>
                  <div className="text-4xl font-bold text-primary-800 mb-1">{card.invest}</div>
                  <div className="text-primary-300 text-sm mb-6">{card.label}</div>
                  <div className="h-px bg-primary-50 mb-6"></div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-2">
                    You Earn
                  </div>
                  <div className="text-4xl font-bold text-secondary-500 mb-1">{card.earn}</div>
                  <div className="text-primary-400 text-xs">@ 1.5% commission</div>
                </div>

              ))}

            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2} y={40}>
            <div className="bg-white border border-primary-100 rounded-2xl p-7 flex flex-col md:flex-row items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-secondary-50 border border-secondary-100 flex items-center justify-center flex-shrink-0">
                <Calculator size={20} className="text-secondary-600" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="font-bold text-primary-900 text-xl mb-1">
                  Refer multiple clients and it compounds fast
                </div>

                <div className="text-primary-500 text-sm">
                  5 clients × ₹50L average =
                  <span className="font-bold text-secondary-600">
                    {" "}₹3.75L earned
                  </span>{" "}
                  in a single month. Payouts are direct bank transfer, every
                  month without a minimum threshold.
                </div>

              </div>

              <Button
                variant="primary"
                className="flex-shrink-0 px-7 py-3.5 text-sm flex items-center gap-2 whitespace-nowrap"
                onClick={() =>
                  document
                    .getElementById("apply")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Handshake size={16} />
                Start Earning
              </Button>

            </div>

          </AnimatedSection>


          {/* Disclaimer */}

          <AnimatedSection delay={0.3}>

            <p className="text-center text-primary-400 text-xs mt-5 flex items-center justify-center gap-1.5">

              <Info size={12} />

              Commission calculated on gross transaction value.
              GST applicable as per current rates.

            </p>

          </AnimatedSection>

        </div>

      </section>
    );
  }

  function renderPartnerApply() {
    return (
      <section id="apply" className="px-6 lg:px-16 py-24" style={{ background: "#0D0812" }}>
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <SectionTitle
              theme="dark"
              align="center"
              eyebrow="Apply Now"
              title="Start Your Partner Journey"
              description="Fill in the details below. Our team will reach out within 24 hours to guide you through the rest."
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1} y={40}>
            <div className="glass-card noise rounded-2xl p-8 lg:p-10">
              <div className="relative z-10">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs text-primary-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <User size={12} /> Full Name
                    </label>
                    <input
                      value={formData.full_name}
                      onChange={(e) =>
                        handleChange("full_name", e.target.value)
                      }
                      className="inp-dark"
                    />
                    {getError("full_name") && (
                      <p className="text-red-500 text-xs">
                        {getError("full_name")}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs text-primary-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Phone size={12} /> Phone
                    </label>
                    <input
                      value={formData.phone}
                      onChange={(e) =>
                        handleChange("phone", e.target.value)
                      }
                      className="inp-dark"
                    />
                    {getError("phone") && (
                      <p className="text-red-500 text-xs">
                        {getError("phone")}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs text-primary-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Mail size={12} /> Email
                    </label>
                    <input
                      value={formData.email}
                      onChange={(e) =>
                        handleChange("email", e.target.value)
                      }
                      className="inp-dark"
                    />
                    {getError("email") && (
                      <p className="text-red-500 text-xs">
                        {getError("email")}
                      </p>
                    )}
                  </div>

                  {/* Profession */}
                  <div>
                    <label className="block text-xs text-primary-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Briefcase size={12} /> Current Profession
                    </label>
                    <input
                      value={formData.current_profession}
                      onChange={(e) =>
                        handleChange("current_profession", e.target.value)
                      }
                      className="inp-dark"
                    />
                  </div>

                  {/* Program */}
                  <div className="">
                    <label className="block text-xs text-primary-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Layers size={12} /> Partnership Program
                    </label>
                    <select
                      value={formData.program}
                      onChange={(e) =>
                        handleChange("program", e.target.value)
                      }
                      className="inp-dark"
                    >
                      <option value="">Select a program…</option>
                      <option>Referral Partner</option>
                      <option>Wealth Distributor</option>
                      <option>Institutional Alliance</option>
                    </select>
                  </div>

                  {/* Client Base */}
                  <div className="">
                    <label className="block text-xs text-primary-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Users size={12} /> Estimated Client Base
                    </label>
                    <select
                      value={formData.estimated_client_base}
                      onChange={(e) =>
                        handleChange(
                          "estimated_client_base",
                          e.target.value
                        )
                      }
                      className="inp-dark"
                    >
                      <option value="">Select range…</option>
                      <option>Less than 25 clients</option>
                      <option>25 – 100 clients</option>
                      <option>100 – 500 clients</option>
                      <option>500+ clients</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-7">
                  <label className="block text-xs text-primary-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <MessageCircle size={12} /> Tell Us About Yourself
                  </label>

                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      handleChange("message", e.target.value)
                    }
                    className="inp-dark resize-none"
                  ></textarea>
                </div>

                {/* Submit */}
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={applying}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  {applying ? "Submitting..." : "Submit Application"}
                </Button>

                {/* Footer */}
                <div className="flex items-center justify-center gap-6 mt-5 text-xs text-primary-600">
                  <span className="flex items-center gap-1.5">
                    <Lock size={12} /> Confidential
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} /> 24hr response
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={12} /> No commitment
                  </span>
                </div>

              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>
    );
  }

  return (
    <main>
      <div className="w-full text-gray-800">
        {renderHero()}
        {renderBenefits()}
        {renderProcess()}
        <Testimonials />
        {renderSecurePlatform()}
        {renderPartnerEarnings()}
        {renderPartnerApply()}
        <FAQ
          title="Frequently Asked"
          highlightedTitle="Questions"
          subtitle="Everything you need to know before investing with Econexx Wealth."
          data={pageData?.faq?.items}
        />

        {/* <ContactSection /> */}
      </div>
    </main>
  );
}
