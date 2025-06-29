"use client";

import AppLogo from "@/components/layout/AppLogo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    ArrowRight,
    BarChart3,
    BookOpen,
    Brain,
    CheckCircle,
    ChevronDown,
    Clock,
    Globe,
    Smartphone,
    Sparkles,
    Star,
    Target,
    TrendingUp,
    Users,
    Zap
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
}

function AnimatedCounter({ end, duration = 2000, suffix = "" }: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            setCount((prev) => {
                const next = prev + increment;
                if (next >= end) {
                    clearInterval(timer);
                    return end;
                }
                return next;
            });
        }, 16);

        return () => clearInterval(timer);
    }, [isVisible, end, duration]);

    return <span ref={ref}>{Math.floor(count)}{suffix}</span>;
}

interface ParallaxSectionProps {
    children: React.ReactNode;
    className?: string;
    offset?: number;
}

function ParallaxSection({ children, className = "", offset = 0.5 }: ParallaxSectionProps) {
    const [scrollY, setScrollY] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const parallax = (window.innerHeight - rect.top) * offset;
                setScrollY(parallax);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [offset]);

    return (
        <div ref={ref} className={className}>
            <div style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
                {children}
            </div>
        </div>
    );
}

export default function LandingPage() {
    const [progress, setProgress] = useState(0);
    const [email, setEmail] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(89), 1000);
        return () => clearTimeout(timer);
    }, []);

    const scrollToNextSection = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle email signup
        console.log("Email signup:", email);
    };

    return (
        <div className="bg-background min-h-screen overflow-x-hidden text-foreground">
            {/* Navigation Header */}
            <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
                }`}>
                <div className="flex justify-between items-center mx-auto px-4 py-4 container">
                    <AppLogo />
                    <nav className="hidden md:flex items-center gap-6">
                        <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
                        <a href="#testimonials" className="hover:text-blue-600 transition-colors">Reviews</a>
                        <Button variant="outline" size="sm">Sign In</Button>
                        <Button size="sm">Get Started</Button>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative flex flex-col justify-center items-center px-4 min-h-screen overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="top-20 left-10 absolute bg-blue-500 blur-xl rounded-full w-72 h-72 animate-pulse mix-blend-multiply filter"></div>
                    <div className="right-10 bottom-20 absolute bg-green-500 blur-xl rounded-full w-72 h-72 animate-pulse animation-delay-2000 mix-blend-multiply filter"></div>
                    <div className="top-1/2 left-1/2 absolute bg-orange-500 blur-xl rounded-full w-72 h-72 animate-pulse animation-delay-4000 mix-blend-multiply filter"></div>
                </div>

                <div className="z-10 relative mx-auto max-w-4xl text-center">
                    <Badge className="bg-blue-100 mb-6 border-blue-200 text-blue-800 text-sm">
                        <Sparkles className="mr-1 w-4 h-4" />
                        AI-Powered Learning Revolution
                    </Badge>

                    <h1 className="bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 mb-6 font-bold text-transparent text-4xl md:text-6xl lg:text-7xl">
                        Anzii
                    </h1>

                    <p className="mx-auto mb-8 max-w-2xl text-muted-foreground text-xl md:text-2xl">
                        Harness the power of AI and spaced repetition to transform your learning.
                        Study smarter, remember longer, achieve more.
                    </p>

                    <div className="flex sm:flex-row flex-col justify-center gap-4 mb-12">
                        <Button size="lg" className="group relative px-8 py-4 overflow-hidden text-lg">
                            <span className="z-10 relative flex items-center">
                                Start Learning Smarter
                                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 transform" />
                        </Button>
                        <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                            Watch Demo
                        </Button>
                    </div>

                    {/* Social Proof */}
                    <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground text-sm">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span><AnimatedCounter end={50000} />+ learners</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Brain className="w-4 h-4" />
                            <span><AnimatedCounter end={2} />M+ cards generated</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>4.9/5 rating</span>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <button
                    onClick={scrollToNextSection}
                    className="bottom-8 absolute hover:scale-110 transition-transform animate-bounce"
                >
                    <ChevronDown className="w-8 h-8 text-muted-foreground" />
                </button>
            </section>

            {/* Problem/Solution Section */}
            <ParallaxSection className="px-4 py-20">
                <div className="mx-auto max-w-6xl container">
                    <div className="items-center gap-12 grid lg:grid-cols-2">
                        <div>
                            <Badge className="bg-red-100 mb-4 border-red-200 text-red-800">
                                The Problem
                            </Badge>
                            <h2 className="mb-6 font-bold text-3xl md:text-4xl">
                                Traditional Learning Is <span className="text-red-600">Broken</span>
                            </h2>
                            <div className="space-y-4 text-muted-foreground text-lg">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 bg-red-500 mt-3 rounded-full w-2 h-2" />
                                    <p>You spend hours studying but forget everything within days</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 bg-red-500 mt-3 rounded-full w-2 h-2" />
                                    <p>Creating effective study materials is time-consuming and difficult</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 bg-red-500 mt-3 rounded-full w-2 h-2" />
                                    <p>One-size-fits-all approaches ignore your unique learning patterns</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Badge className="bg-green-100 mb-4 border-green-200 text-green-800">
                                Our Solution
                            </Badge>
                            <h2 className="mb-6 font-bold text-3xl md:text-4xl">
                                AI-Powered <span className="text-green-600">Spaced Repetition</span>
                            </h2>
                            <div className="space-y-4 text-muted-foreground text-lg">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="flex-shrink-0 mt-1 w-6 h-6 text-green-500" />
                                    <p>AI generates optimized flashcards from any content instantly</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="flex-shrink-0 mt-1 w-6 h-6 text-green-500" />
                                    <p>Smart scheduling ensures you review at the perfect moment</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="flex-shrink-0 mt-1 w-6 h-6 text-green-500" />
                                    <p>Adapts to your learning speed and retention patterns</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ParallaxSection>

            {/* How It Works Section */}
            <section id="how-it-works" className="bg-muted/30 px-4 py-20">
                <div className="mx-auto max-w-6xl container">
                    <div className="mb-16 text-center">
                        <Badge className="bg-blue-100 mb-4 border-blue-200 text-blue-800">
                            How It Works
                        </Badge>
                        <h2 className="mb-6 font-bold text-3xl md:text-4xl">
                            Four Steps to <span className="text-blue-600">Learning Mastery</span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
                            From content to mastery in minutes, not months
                        </p>
                    </div>

                    <Tabs defaultValue="input" className="mx-auto w-full max-w-4xl">
                        <TabsList className="grid grid-cols-4 w-full">
                            <TabsTrigger value="input">1. Input</TabsTrigger>
                            <TabsTrigger value="generate">2. Generate</TabsTrigger>
                            <TabsTrigger value="schedule">3. Schedule</TabsTrigger>
                            <TabsTrigger value="master">4. Master</TabsTrigger>
                        </TabsList>

                        <TabsContent value="input" className="mt-8">
                            <Card className="p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex justify-center items-center bg-blue-100 rounded-lg w-12 h-12">
                                        <BookOpen className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">Upload Your Content</CardTitle>
                                        <p className="text-muted-foreground">Paste text, upload PDFs, or import from any source</p>
                                    </div>
                                </div>
                                <div className="bg-muted/50 p-6 rounded-lg">
                                    <p className="font-mono text-sm">
                                        "Photosynthesis is the process by which plants convert light energy into chemical energy..."
                                    </p>
                                </div>
                            </Card>
                        </TabsContent>

                        <TabsContent value="generate" className="mt-8">
                            <Card className="p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex justify-center items-center bg-green-100 rounded-lg w-12 h-12">
                                        <Sparkles className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">AI Creates Flashcards</CardTitle>
                                        <p className="text-muted-foreground">Advanced AI generates optimized questions and answers</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <Alert>
                                        <AlertDescription>
                                            <strong>Q:</strong> What is the primary function of chlorophyll in photosynthesis?
                                        </AlertDescription>
                                    </Alert>
                                    <Alert>
                                        <AlertDescription>
                                            <strong>A:</strong> Chlorophyll absorbs light energy and converts it into chemical energy.
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            </Card>
                        </TabsContent>

                        <TabsContent value="schedule" className="mt-8">
                            <Card className="p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex justify-center items-center bg-orange-100 rounded-lg w-12 h-12">
                                        <Clock className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">Smart Scheduling</CardTitle>
                                        <p className="text-muted-foreground">Algorithm determines optimal review timing</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg">
                                        <span>Easy cards</span>
                                        <Badge>7 days</Badge>
                                    </div>
                                    <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg">
                                        <span>Medium cards</span>
                                        <Badge>3 days</Badge>
                                    </div>
                                    <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg">
                                        <span>Hard cards</span>
                                        <Badge>1 day</Badge>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>

                        <TabsContent value="master" className="mt-8">
                            <Card className="p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex justify-center items-center bg-purple-100 rounded-lg w-12 h-12">
                                        <Target className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">Track Progress</CardTitle>
                                        <p className="text-muted-foreground">Monitor retention and optimize your learning</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span>Retention Rate</span>
                                            <span className="font-bold text-green-600">89%</span>
                                        </div>
                                        <Progress value={progress} className="h-3" />
                                    </div>
                                    <div className="gap-4 grid grid-cols-3 text-center">
                                        <div>
                                            <div className="font-bold text-blue-600 text-2xl">127</div>
                                            <div className="text-muted-foreground text-sm">Cards Mastered</div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-green-600 text-2xl">23</div>
                                            <div className="text-muted-foreground text-sm">Days Streak</div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-orange-600 text-2xl">45m</div>
                                            <div className="text-muted-foreground text-sm">Time Saved</div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* Features Showcase */}
            <section id="features" className="px-4 py-20">
                <div className="mx-auto max-w-6xl container">
                    <div className="mb-16 text-center">
                        <Badge className="bg-green-100 mb-4 border-green-200 text-green-800">
                            Features
                        </Badge>
                        <h2 className="mb-6 font-bold text-3xl md:text-4xl">
                            Everything You Need to <span className="text-green-600">Learn Faster</span>
                        </h2>
                    </div>

                    <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
                        <Card className="group hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
                            <CardHeader>
                                <div className="flex justify-center items-center bg-blue-100 mb-4 rounded-lg w-12 h-12">
                                    <Brain className="w-6 h-6 text-blue-600" />
                                </div>
                                <CardTitle className="flex items-center gap-2">
                                    <Badge variant="secondary">AI Powered</Badge>
                                </CardTitle>
                                <CardTitle>Smart Content Generation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">AI creates personalized flashcards from any material in seconds</p>
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
                            <CardHeader>
                                <div className="flex justify-center items-center bg-green-100 mb-4 rounded-lg w-12 h-12">
                                    <TrendingUp className="w-6 h-6 text-green-600" />
                                </div>
                                <CardTitle>Adaptive Scheduling</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Smart algorithm adapts to your learning speed and retention</p>
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
                            <CardHeader>
                                <div className="flex justify-center items-center bg-orange-100 mb-4 rounded-lg w-12 h-12">
                                    <BarChart3 className="w-6 h-6 text-orange-600" />
                                </div>
                                <CardTitle>Progress Analytics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Detailed insights into your learning progress and retention</p>
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
                            <CardHeader>
                                <div className="flex justify-center items-center bg-purple-100 mb-4 rounded-lg w-12 h-12">
                                    <Globe className="w-6 h-6 text-purple-600" />
                                </div>
                                <CardTitle>Multi-Format Support</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Text, images, audio, video - learn from any content type</p>
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
                            <CardHeader>
                                <div className="flex justify-center items-center bg-red-100 mb-4 rounded-lg w-12 h-12">
                                    <Smartphone className="w-6 h-6 text-red-600" />
                                </div>
                                <CardTitle>Cross-Platform Sync</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Access your decks anywhere - web, mobile, desktop</p>
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
                            <CardHeader>
                                <div className="flex justify-center items-center bg-yellow-100 mb-4 rounded-lg w-12 h-12">
                                    <Zap className="w-6 h-6 text-yellow-600" />
                                </div>
                                <CardTitle>Lightning Fast</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Optimized for speed - no waiting, just learning</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <ParallaxSection className="bg-muted/30 px-4 py-20">
                <div className="mx-auto max-w-4xl text-center container">
                    <Badge className="bg-orange-100 mb-4 border-orange-200 text-orange-800">
                        Proven Results
                    </Badge>
                    <h2 className="mb-16 font-bold text-3xl md:text-4xl">
                        Transform Your Learning <span className="text-orange-600">Today</span>
                    </h2>

                    <div className="gap-8 grid md:grid-cols-3">
                        <Alert className="bg-green-50 p-8 border-green-200">
                            <TrendingUp className="mx-auto mb-4 w-8 h-8 text-green-600" />
                            <AlertDescription className="text-center">
                                <div className="mb-2 font-bold text-green-600 text-4xl">
                                    <AnimatedCounter end={89} suffix="%" />
                                </div>
                                <div className="mb-2 font-semibold text-lg">Better Retention</div>
                                <div className="text-muted-foreground text-sm">
                                    Compared to traditional study methods
                                </div>
                            </AlertDescription>
                        </Alert>

                        <Alert className="bg-blue-50 p-8 border-blue-200">
                            <Clock className="mx-auto mb-4 w-8 h-8 text-blue-600" />
                            <AlertDescription className="text-center">
                                <div className="mb-2 font-bold text-blue-600 text-4xl">
                                    3x
                                </div>
                                <div className="mb-2 font-semibold text-lg">Faster Learning</div>
                                <div className="text-muted-foreground text-sm">
                                    Study more efficiently with AI assistance
                                </div>
                            </AlertDescription>
                        </Alert>

                        <Alert className="bg-purple-50 p-8 border-purple-200">
                            <Target className="mx-auto mb-4 w-8 h-8 text-purple-600" />
                            <AlertDescription className="text-center">
                                <div className="mb-2 font-bold text-purple-600 text-4xl">
                                    <AnimatedCounter end={95} suffix="%" />
                                </div>
                                <div className="mb-2 font-semibold text-lg">User Satisfaction</div>
                                <div className="text-muted-foreground text-sm">
                                    Love it or your money back
                                </div>
                            </AlertDescription>
                        </Alert>
                    </div>
                </div>
            </ParallaxSection>

            {/* Testimonials */}
            <section id="testimonials" className="px-4 py-20">
                <div className="mx-auto max-w-6xl container">
                    <div className="mb-16 text-center">
                        <Badge className="bg-purple-100 mb-4 border-purple-200 text-purple-800">
                            Testimonials
                        </Badge>
                        <h2 className="mb-6 font-bold text-3xl md:text-4xl">
                            Loved by <span className="text-purple-600">Students & Professionals</span>
                        </h2>
                    </div>

                    <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
                        <Card className="p-6">
                            <CardContent className="space-y-4">
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="fill-current w-4 h-4" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground">
                                    "Anzii helped me ace my medical school exams. The AI-generated flashcards were spot-on!"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="flex justify-center items-center bg-blue-100 rounded-full w-10 h-10">
                                        <span className="font-bold text-blue-600 text-sm">SM</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Sarah M.</p>
                                        <p className="text-muted-foreground text-sm">Medical Student</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="p-6">
                            <CardContent className="space-y-4">
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="fill-current w-4 h-4" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground">
                                    "I learned Spanish 3x faster than with traditional methods. The spaced repetition actually works!"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="flex justify-center items-center bg-green-100 rounded-full w-10 h-10">
                                        <span className="font-bold text-green-600 text-sm">JD</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold">James D.</p>
                                        <p className="text-muted-foreground text-sm">Software Engineer</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="p-6">
                            <CardContent className="space-y-4">
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="fill-current w-4 h-4" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground">
                                    "Game-changer for professional development. I can finally keep up with industry trends."
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="flex justify-center items-center bg-orange-100 rounded-full w-10 h-10">
                                        <span className="font-bold text-orange-600 text-sm">AL</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Alex L.</p>
                                        <p className="text-muted-foreground text-sm">Marketing Director</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 px-4 py-20 text-white">
                <div className="mx-auto max-w-4xl text-center container">
                    <h2 className="mb-6 font-bold text-3xl md:text-4xl">
                        Ready to Transform Your Learning?
                    </h2>
                    <p className="opacity-90 mb-8 text-xl">
                        Join thousands of learners who've already discovered the power of AI-enhanced spaced repetition
                    </p>

                    <form onSubmit={handleEmailSubmit} className="flex gap-4 mx-auto mb-8 max-w-md">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70"
                            required
                        />
                        <Button type="submit" variant="secondary" className="px-8">
                            Get Started
                        </Button>
                    </form>

                    <div className="flex flex-wrap justify-center gap-4 opacity-80 text-sm">
                        <Badge variant="secondary" className="bg-white/10 border-white/20 text-white">
                            <CheckCircle className="mr-1 w-4 h-4" />
                            Free 14-day trial
                        </Badge>
                        <Badge variant="secondary" className="bg-white/10 border-white/20 text-white">
                            <CheckCircle className="mr-1 w-4 h-4" />
                            No credit card required
                        </Badge>
                        <Badge variant="secondary" className="bg-white/10 border-white/20 text-white">
                            <CheckCircle className="mr-1 w-4 h-4" />
                            Cancel anytime
                        </Badge>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-background px-4 py-12 border-t">
                <div className="mx-auto max-w-6xl container">
                    <div className="flex md:flex-row flex-col justify-between items-center gap-8">
                        <div className="flex items-center gap-2">
                            <Brain className="w-6 h-6 text-blue-600" />
                            <span className="font-bold text-xl">Anzii</span>
                        </div>
                        <nav className="flex flex-wrap justify-center gap-8 text-muted-foreground text-sm">
                            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                            <a href="#" className="hover:text-foreground transition-colors">Support</a>
                            <a href="#" className="hover:text-foreground transition-colors">Blog</a>
                        </nav>
                        <p className="text-muted-foreground text-sm">
                            © 2024 Anzii. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
} 