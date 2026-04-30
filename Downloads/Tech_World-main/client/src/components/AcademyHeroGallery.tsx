import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveMedia } from "@/components/ResponsiveMedia";
import { AcademyLabel } from "./AcademyLabel";

interface FloatingImage {
    src: string;
    alt: string;
    label: string;
    position: "top-right" | "top-left" | "bottom-left" | "bottom-right";
    size: { width: string; height: string };
    duration: number;
}

interface CarouselImage {
    src: string;
    label: string;
}

interface AcademyHeroGalleryProps {
    animationsEnabled: boolean;
    floatingImages: FloatingImage[];
    carouselImages: CarouselImage[];
    carouselIndex: number;
}

export function AcademyHeroGallery({
    animationsEnabled,
    floatingImages,
    carouselImages,
    carouselIndex,
}: AcademyHeroGalleryProps) {
    const getPositionClasses = (position: string) => {
        const positions: Record<string, string> = {
            "top-right": "top-2 right-2",
            "top-left": "top-14 left-2",
            "bottom-left": "bottom-4 left-2",
            "bottom-right": "bottom-6 right-2",
        };
        return positions[position] || "";
    };

    // ✅ Fixed: safe fallback if parent passes out-of-range index
    const slide = carouselImages[carouselIndex] ?? carouselImages[0];

    return (
        <motion.div
            // ✅ Fixed: initial=false skips framer pipeline entirely when animations off
            initial={animationsEnabled ? { opacity: 0, x: 50 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={
                animationsEnabled
                    ? { duration: 0.8, delay: 0.3, ease: "easeOut" }
                    : { duration: 0 }
            }
            className="relative h-full min-h-96 lg:min-h-screen flex items-center justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg aspect-square">
                {/* ✅ Fixed: outer glow desktop-only + ease:"linear" for smooth constant rotation */}
                {animationsEnabled && (
                    <motion.div
                        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/30 to-cyan-600/30 blur-xl hidden md:block"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                )}

                {/* Floating images — desktop only, lazy loaded */}
                {animationsEnabled && (
                    <div className="hidden md:block">
                        {floatingImages.map((img, idx) => (
                            <motion.div
                                key={idx}
                                className={`absolute ${getPositionClasses(img.position)} ${img.size.width} ${img.size.height} rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20`}
                                animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                                transition={{
                                    duration: img.duration,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}>
                                <ResponsiveMedia
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-full object-cover"
                                    // ✅ Fixed: decorative floating images are lazy, low priority
                                    loading="lazy"
                                    fetchpriority="low"
                                    decoding="async"
                                />
                                <AcademyLabel text={img.label} />
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Center carousel */}
                {/* ✅ Fixed: added mode="wait" so exit and enter don't overlap */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={carouselIndex}
                        className="absolute inset-0 flex items-center justify-center"
                        initial={
                            animationsEnabled
                                ? { scale: 0.8, opacity: 0 }
                                : false
                        }
                        animate={{ scale: 1, opacity: 1 }}
                        exit={
                            animationsEnabled
                                ? { scale: 0.8, opacity: 0 }
                                : undefined
                        }
                        transition={
                            animationsEnabled
                                ? { duration: 0.6, ease: "easeInOut" }
                                : { duration: 0 }
                        }>
                        <motion.div
                            className="w-40 sm:w-52 md:w-56 h-52 sm:h-64 md:h-72 rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30 relative"
                            // ✅ Fixed: added repeat:Infinity so the pulse actually loops
                            animate={
                                animationsEnabled ? { scale: [1, 1.05, 1] } : {}
                            }
                            transition={
                                animationsEnabled
                                    ? {
                                          duration: 3.8,
                                          ease: "easeInOut",
                                          repeat: Infinity,
                                          repeatType: "mirror",
                                      }
                                    : {}
                            }>
                            <ResponsiveMedia
                                src={slide.src}
                                alt={slide.label}
                                className="w-full h-full object-cover"
                                // ✅ Fixed: only the first carousel image is high priority
                                loading={carouselIndex === 0 ? "eager" : "lazy"}
                                fetchpriority={
                                    carouselIndex === 0 ? "high" : "low"
                                }
                                decoding="async"
                            />
                            <AcademyLabel text={slide.label} />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
