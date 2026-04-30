import { lazy, Suspense, useCallback } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import SectionBubbles from "@/components/SectionBubbles";
import { ScrollReveal } from "@/components/ScrollReveal";
import StickyBottomBanner from "@/components/StickyBottomBanner";
import LimitedOfferBanner from "@/components/LimitedOfferBanner";
import Review from "@/components/Review";
import Footer from "@/components/Footer";

const PhotoGallery = lazy(() => import("@/components/PhotoGallery"));
const DesignLancerAbout = lazy(() => import("@/components/DesignLancerAbout"));
const Skills = lazy(() => import("@/components/Skills"));
const Whatwedo = lazy(() => import("@/components/Whatwedo"));
const Visitors = lazy(() => import("@/components/Visitors"));
const Features = lazy(() => import("@/components/Features"));
const Attendees = lazy(() => import("@/components/Attendees"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const CountdownTimer = lazy(() => import("@/components/CountdownTimer"));

// ✅ Bubbles only on desktop — one place, not everywhere
const DesktopBubbles = ({ count }: { count: number }) => (
    <div className="hidden md:block">
        <SectionBubbles count={count} />
    </div>
);

function HomeContent() {
    // ✅ One stable callback for all three LimitedOfferBanner instances
    const scrollToEnrollment = useCallback(() => {
        document
            .getElementById("enrollment-form")
            ?.scrollIntoView({ behavior: "smooth" });
    }, []);

    // ✅ Kept separate since it targets a different section
    const scrollToAttendees = useCallback(() => {
        document
            .getElementById("attendees")
            ?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navigation />

            {/* Hero — bubbles here matter most visually, keep them */}
            <div className="relative" id="hero">
                <SectionBubbles count={5} />
                <Hero />
            </div>

            <LimitedOfferBanner onCtaClick={scrollToEnrollment} />

            <ScrollReveal variant="fade-up" duration={800} delay={100}>
                {/* ✅ No bubbles on most sections — saves ~50 animated nodes */}
                <div className="relative" id="statistics">
                    <Statistics />
                </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" duration={800} delay={200}>
                <div className="relative" id="gallery">
                    <DesktopBubbles count={4} />
                    <Suspense fallback={<div className="h-64" />}>
                        <PhotoGallery />
                    </Suspense>
                </div>
            </ScrollReveal>

            {/* ✅ Fixed: unique id "review" (was duplicating "about") */}
            <ScrollReveal variant="fade-up" duration={800} delay={200}>
                <div className="relative" id="review">
                    {/* ✅ Fixed: Review is eagerly imported — no Suspense needed */}
                    <Review />
                </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" duration={800} delay={200}>
                <div className="relative" id="about">
                    <Suspense fallback={<div className="h-96" />}>
                        <DesignLancerAbout />
                    </Suspense>
                </div>
            </ScrollReveal>

            <ScrollReveal variant="slide-left" duration={900} delay={150}>
                <div className="relative" id="benefit">
                    <DesktopBubbles count={4} />
                    <Suspense fallback={<div className="h-96" />}>
                        <Skills />
                    </Suspense>
                </div>
            </ScrollReveal>

            <LimitedOfferBanner onCtaClick={scrollToEnrollment} />

            <ScrollReveal variant="slide-right" duration={800} delay={100}>
                <div className="relative" id="courses">
                    <Suspense fallback={<div className="h-96" />}>
                        <Whatwedo />
                    </Suspense>
                </div>
            </ScrollReveal>

            <ScrollReveal variant="slide-right" duration={800} delay={100}>
                <div className="relative" id="visitors">
                    <Suspense fallback={<div className="h-96" />}>
                        <Visitors />
                    </Suspense>
                </div>
            </ScrollReveal>

            <ScrollReveal variant="slide-left" duration={800} delay={100}>
                <div className="relative" id="features">
                    <DesktopBubbles count={3} />
                    <Suspense fallback={<div className="h-80" />}>
                        <Features />
                    </Suspense>
                </div>
            </ScrollReveal>

            <LimitedOfferBanner onCtaClick={scrollToEnrollment} />

            <ScrollReveal variant="fade-up" duration={800} delay={200}>
                <div className="relative" id="attendees">
                    <Suspense fallback={<div className="h-96" />}>
                        <Attendees />
                    </Suspense>
                </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" duration={800} delay={200}>
                <div className="relative" id="testimonials">
                    <Suspense fallback={<div className="h-96" />}>
                        <Testimonials />
                    </Suspense>
                </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" duration={800} delay={200}>
                <div className="relative" id="timer">
                    <Suspense fallback={<div className="h-96" />}>
                        <CountdownTimer onRegisterClick={scrollToAttendees} />
                    </Suspense>
                </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-in" duration={600} delay={100}>
                <Footer />
            </ScrollReveal>

            {/* ✅ Replaced <br><br><br> with proper bottom padding */}
            <div className="pb-24" />
            <StickyBottomBanner />
        </div>
    );
}

export default function Home() {
    return <HomeContent />;
}
