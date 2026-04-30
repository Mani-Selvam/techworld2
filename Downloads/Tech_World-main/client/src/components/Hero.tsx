import sindhuraImage from "@assets/hero-sindhu.webp";
import profileAvatars from "@assets/Group 58_1758098717538.png";
import redCircle from "@assets/hero-circle.webp";
import { ResponsiveMedia } from "./ResponsiveMedia";
import { useMemo } from "react";
import SectionBubbles from "./SectionBubbles";
import OrbitIcons from "./OrbitIcons";
import { MessageCircle, Sparkles, Star, Users } from "lucide-react";
import { useAnimationDefer } from "@/hooks/useAnimationDefer";

// Detect mobile once, outside component (no re-render cost)
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
const isTablet =
    typeof window !== "undefined" &&
    window.innerWidth >= 768 &&
    window.innerWidth < 1024;

export default function Hero() {
    // No animations on mobile — saves CPU/GPU significantly
    const animationsEnabled = useAnimationDefer(isMobile ? 0 : 1500);

    const handleBookDemo = () => {
        const whatsappNumber = "+919345791995";
        const whatsappMessage = `Hi Sindhu 👋  I'm really interested in learning about Blockchain and Crypto! 💻✨ I'd love to know more about your upcoming session and how I can join your Free workshop, Internship, or Master Courses. 🚀`;
        const url = `https://wa.me/${whatsappNumber.replace(/\s/g, "")}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(url, "_blank");
    };

    // Inline keyframes only injected once
    const keyframes = useMemo(
        () => `
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        @keyframes pulseText {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        @keyframes gradientMove {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
    `,
        [],
    );

    // ─── Shared sub-components ──────────────────────────────────────────────

    const SindhuCircle = ({
        size,
        translateX,
        imageSize,
        inset,
    }: {
        size: string;
        translateX: string;
        imageSize: { w: number; h: number };
        inset: string;
    }) => (
        <div className={`relative ${size} ${translateX} opacity-100 scale-100`}>
            <ResponsiveMedia
                src={redCircle}
                sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 450px"
                alt=""
                width={imageSize.w}
                height={imageSize.h}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
            />
            <div
                className={`absolute ${inset} rounded-full overflow-hidden opacity-100`}>
                <ResponsiveMedia
                    src={sindhuraImage}
                    sizes="(max-width: 640px) 176px, (max-width: 768px) 200px, 400px"
                    alt="Sindhu - Web3 Expert"
                    width={imageSize.w}
                    height={imageSize.h}
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                    data-testid="img-sindhu-hero"
                />
            </div>
            <div className="absolute -top-2 -right-2 text-yellow-400">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            {/* OrbitIcons only on non-mobile */}
            {!isMobile && <OrbitIcons />}
        </div>
    );

    const QuoteCard = ({ onClick }: { onClick?: () => void }) => (
        <div className="rounded-2xl p-4 md:p-6 bg-gradient-to-br from-purple-900/40 to-black/60 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <p className="text-white text-xs md:text-sm leading-relaxed mb-4 text-center md:text-left">
                Building the future, one block at a time — that's the spirit of
                Web3_Sindhu.
            </p>
            <button
                onClick={onClick}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2
                    rounded-full font-semibold hover:from-blue-600 hover:to-blue-700
                    transition-colors duration-200 shadow-lg w-full flex items-center justify-center gap-2"
                data-testid="button-book-demo-hero">
                <MessageCircle className="w-4 h-4" />
                Techara
            </button>
        </div>
    );

    const AvatarsCard = ({ testIdSuffix = "" }: { testIdSuffix?: string }) => (
        <div>
            <div className="flex items-center gap-2 mb-3">
                {/* Avatars image — lazy is fine here */}
                <ResponsiveMedia
                    src={profileAvatars}
                    alt="Profile Avatars"
                    className="h-10 md:h-12 w-auto object-contain"
                    loading="lazy"
                    data-testid={`img-profile-avatars${testIdSuffix}`}
                />
            </div>
            <h3 className="text-white font-semibold text-sm md:text-base mb-2">
                Sindhu turns technology into inspiration
            </h3>
            <a
                href="https://www.instagram.com/web3_sindhu?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors underline text-xs md:text-sm flex items-center gap-1"
                data-testid={`button-see-story${testIdSuffix}`}>
                <Users className="w-3 h-3" />
                See Story
            </a>
        </div>
    );

    const ReviewsBadge = () => (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full px-6 py-3 shadow-xl">
            <div className="text-center">
                <div className="text-white font-bold text-lg flex items-center justify-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                    500+
                </div>
                <div className="text-white text-xs">Positive Reviews</div>
            </div>
        </div>
    );

    // ─── Render layout based on device ─────────────────────────────────────
    // We render ONLY the matching layout instead of all three hidden with CSS.
    // This alone cuts DOM size by ~66% on mobile/tablet.

    const renderLayout = () => {
        if (isMobile) {
            return (
                <div className="px-3 pb-10">
                    <div className="flex justify-center mt-6 mb-6">
                        <SindhuCircle
                            size="w-56 h-56"
                            translateX="-translate-x-8"
                            imageSize={{ w: 256, h: 256 }}
                            inset="top-10 left-10 right-10 bottom-10 translate-x-8"
                        />
                    </div>

                    <div className="mb-5 mx-1">
                        <QuoteCard onClick={handleBookDemo} />
                    </div>

                    <div className="text-center mb-5">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <ResponsiveMedia
                                src={profileAvatars}
                                alt="Profile Avatars"
                                className="h-10 w-auto object-contain"
                                loading="lazy"
                                data-testid="img-profile-avatars-mobile"
                            />
                        </div>
                        <h3 className="text-white font-semibold text-base mb-2">
                            Sindhu turns technology into inspiration
                        </h3>
                        <a
                            href="https://www.instagram.com/web3_sindhu?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 transition-colors underline text-sm flex items-center justify-center gap-1"
                            data-testid="button-see-story">
                            <Users className="w-3 h-3" />
                            See Story
                        </a>
                    </div>

                    <div className="flex justify-center">
                        <ReviewsBadge />
                    </div>
                </div>
            );
        }

        if (isTablet) {
            return (
                <div className="px-4 pb-10">
                    <div className="flex justify-center mt-8 mb-8">
                        <SindhuCircle
                            size="w-72 h-72"
                            translateX="-translate-x-10"
                            imageSize={{ w: 320, h: 320 }}
                            inset="top-12 left-12 right-12 bottom-12 translate-x-10"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-5 mb-6">
                        <div className="rounded-2xl p-5 bg-gradient-to-br from-purple-900/40 to-black/60 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                            <QuoteCard onClick={handleBookDemo} />
                        </div>
                        <div className="rounded-2xl p-5 bg-gradient-to-br from-purple-900/40 to-black/60 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                            <AvatarsCard testIdSuffix="-tablet" />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <ReviewsBadge />
                    </div>
                </div>
            );
        }

        // Desktop
        return (
            <div className="relative">
                <div className="flex items-center justify-center min-h-[450px] relative">
                    {/* Center circle */}
                    <div className="relative">
                        <div className="w-[430px] h-[420px] rounded-full relative mx-auto -translate-x-20 -translate-y-10">
                            <ResponsiveMedia
                                src={redCircle}
                                sizes="450px"
                                alt="Hero background circle"
                                width={450}
                                height={450}
                                className="w-full h-full object-cover"
                                loading="eager"
                                decoding="async"
                            />
                            <div className="absolute top-[60px] left-[60px] right-[60px] bottom-[60px] rounded-full overflow-hidden translate-x-20 opacity-100">
                                <ResponsiveMedia
                                    src={sindhuraImage}
                                    sizes="400px"
                                    loading="eager"
                                    fetchpriority="high"
                                    decoding="async"
                                    width={400}
                                    height={400}
                                    alt="Sindhu - Web3 Expert"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    data-testid="img-sindhu-hero"
                                />
                            </div>
                            {animationsEnabled && <OrbitIcons />}
                        </div>

                        <div className="absolute -top-4 -right-60 text-yellow-400 hidden md:block">
                            <Sparkles className="w-8 h-8 mb-2" />
                            <Star className="w-6 h-6 ml-8" />
                        </div>
                    </div>

                    {/* Quote card — right */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-20 w-80">
                        <QuoteCard />
                    </div>

                    {/* Avatars — bottom left */}
                    <div className="absolute bottom-0 left-16">
                        <div className="flex items-center gap-3 mb-4">
                            <ResponsiveMedia
                                src={profileAvatars}
                                alt="Profile Avatars"
                                className="h-12 w-auto object-contain"
                                loading="lazy"
                                data-testid="img-profile-avatars"
                            />
                        </div>
                        <div className="max-w-xs mb-8">
                            <h3 className="text-white font-semibold text-base mb-2">
                                Sindhu turns technology into inspiration
                            </h3>
                            <a
                                href="https://www.instagram.com/web3_sindhu?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-400 hover:text-purple-300 transition-colors underline text-sm flex items-center gap-1"
                                data-testid="button-see-story">
                                <Users className="w-3 h-3" />
                                See Story
                            </a>
                        </div>
                    </div>

                    {/* Reviews badge — bottom right */}
                    <div className="absolute bottom-10 right-56">
                        <ReviewsBadge />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="relative min-h-screen pt-12 sm:pt-16 md:pt-20 overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        "linear-gradient(135deg, #000000 0%, #1a0033 50%, #000000 100%)",
                }}
            />

            {/* Bubbles only on desktop */}
            {animationsEnabled && !isMobile && !isTablet && (
                <SectionBubbles count={5} className="z-[1]" />
            )}

            {/* Inject keyframes only when animations are on */}
            {animationsEnabled && <style>{keyframes}</style>}

            <div className="relative z-10 w-full">
                {/* Title */}
                <div className="text-center pt-7 sm:pt-4 pb-4 sm:pb-8 px-2 sm:px-4">
                    <h1
                        className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight max-w-4xl lg:max-w-5xl mx-auto"
                        data-testid="text-main-title"
                        style={{
                            animation: animationsEnabled
                                ? "float 3s ease-in-out infinite"
                                : "none",
                        }}>
                        <span
                            style={{
                                display: "inline-block",
                                animation: animationsEnabled
                                    ? "pulseText 2s ease-in-out infinite"
                                    : "none",
                            }}>
                            Empowering India's Web3 Future
                        </span>
                        <br />
                        <span
                            className="inline-block text-sm sm:text-base md:text-lg lg:text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600"
                            style={{
                                animation: animationsEnabled
                                    ? "gradientMove 4s ease infinite"
                                    : "none",
                                backgroundSize: "200% 200%",
                            }}>
                            Er. SH — Blockchain &amp; Fintech Innovator,
                            Educator, Visionary
                        </span>
                    </h1>
                </div>

                {/* Conditional layout — only one rendered */}
                {renderLayout()}
            </div>
        </section>
    );
}
