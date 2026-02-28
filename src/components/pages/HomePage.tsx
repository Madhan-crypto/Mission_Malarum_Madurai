// HPI 1.7-G
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  Camera, 
  MapPin, 
  TrendingUp, 
  Award, 
  Brain, 
  Leaf, 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Smartphone,
  CheckCircle2,
  BarChart3
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

// --- Canonical Data Sources ---
const FEATURES_DATA = [
  {
    icon: Camera,
    title: 'Report Violations',
    description: 'Capture and submit waste violations instantly with your camera. AI-powered classification helps identify waste types automatically.',
    color: 'text-accent-neon-green'
  },
  {
    icon: Brain,
    title: 'AI Classification',
    description: 'Advanced machine learning identifies waste types in real-time, providing instant educational feedback on proper disposal methods.',
    color: 'text-accent-neon-blue'
  },
  {
    icon: MapPin,
    title: 'Location Tracking',
    description: 'Automatic GPS capture ensures precise violation locations, helping authorities respond faster and more efficiently.',
    color: 'text-primary'
  },
  {
    icon: TrendingUp,
    title: 'Analytics Dashboard',
    description: 'Municipal authorities access real-time heatmaps, trends, and optimized collection routes for efficient resource allocation.',
    color: 'text-secondary'
  },
  {
    icon: Award,
    title: 'Gamification',
    description: 'Earn points and badges for your contributions. Track your impact and compete on the community leaderboard.',
    color: 'text-yellow-400'
  },
  {
    icon: Leaf,
    title: 'Educational Resources',
    description: 'Learn about waste segregation, recycling, and environmental impact through personalized educational content.',
    color: 'text-green-400'
  },
];

const HOW_IT_WORKS_DATA = [
  {
    step: '01',
    title: 'Capture',
    description: 'Take a photo of the waste violation using your smartphone camera or upload an existing image.',
    icon: Camera
  },
  {
    step: '02',
    title: 'Classify',
    description: 'Our AI instantly analyzes the image, identifies waste type, and provides educational information.',
    icon: Brain
  },
  {
    step: '03',
    title: 'Track',
    description: 'Monitor your report status in real-time as authorities review and resolve the issue.',
    icon: Activity
  },
];

const STATS_DATA = [
  { label: 'Active Reports', value: '1,248' },
  { label: 'Waste Cleared', value: '856 tons' },
  { label: 'AI Accuracy', value: '98.5%' },
  { label: 'Active Citizens', value: '15k+' },
];

// --- Components ---

const Marquee = () => {
  return (
    <div className="w-full bg-primary/10 border-y border-primary/20 overflow-clip py-4 relative z-20">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mx-4">
            <span className="text-primary font-heading font-bold text-lg tracking-widest">AI-POWERED CLEANLINESS</span>
            <span className="text-foreground/30">•</span>
            <span className="text-secondary font-heading font-bold text-lg tracking-widest">REAL-TIME ANALYTICS</span>
            <span className="text-foreground/30">•</span>
            <span className="text-accent-neon-green font-heading font-bold text-lg tracking-widest">SMART CITY INITIATIVE</span>
            <span className="text-foreground/30">•</span>
            <span className="text-accent-neon-blue font-heading font-bold text-lg tracking-widest">COMMUNITY DRIVEN</span>
            <span className="text-foreground/30">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const FeatureCard = ({ feature, index }: { feature: typeof FEATURES_DATA[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-8 rounded-3xl bg-card-background-dark/40 border border-white/5 backdrop-blur-sm hover:bg-card-background-dark/60 transition-all duration-500 overflow-clip"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-2xl bg-background/50 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${feature.color}`}>
          <feature.icon className="w-7 h-7" />
        </div>
        
        <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {feature.title}
        </h3>
        
        <p className="font-paragraph text-foreground/60 leading-relaxed">
          {feature.description}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
};

const StickyProcessStep = ({ item, index, total }: { item: typeof HOW_IT_WORKS_DATA[0], index: number, total: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

  return (
    <div ref={ref} className="flex flex-col md:flex-row gap-8 md:gap-20 py-24 relative">
      {/* Timeline Line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block">
        <motion.div 
          className="w-full bg-primary origin-top"
          initial={{ height: "0%" }}
          whileInView={{ height: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>

      {/* Content Side */}
      <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'}`}>
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-6xl font-heading font-bold text-white/5 mb-4">
            {item.step}
          </span>
          <h3 className={`text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 ${isInView ? 'text-primary' : ''} transition-colors duration-500`}>
            {item.title}
          </h3>
          <p className="text-lg text-foreground/70 font-paragraph leading-relaxed max-w-md ml-auto mr-auto md:mx-0">
            {item.description}
          </p>
        </motion.div>
      </div>

      {/* Icon/Visual Side */}
      <div className={`flex-1 flex justify-center items-center ${index % 2 === 0 ? 'md:order-2 md:pl-12' : 'md:pr-12'}`}>
        <div className="relative">
          <div className={`absolute inset-0 bg-primary/20 blur-3xl rounded-full transition-opacity duration-700 ${isInView ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-card-background-dark border-2 flex items-center justify-center z-10 transition-all duration-500 ${isInView ? 'border-primary scale-110' : 'border-white/10 scale-100'}`}>
            <item.icon className={`w-10 h-10 md:w-12 md:h-12 ${isInView ? 'text-primary' : 'text-foreground/40'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-clip selection:bg-primary/30 selection:text-primary-foreground">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[100vh] flex items-center pt-20 overflow-clip">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y, opacity }} className="w-full h-full relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background z-10" />
            <Image 
              src="https://static.wixstatic.com/media/c5258a_d3c963073c394b4fae39b0b03e6a3b1a~mv2.png?originWidth=1152&originHeight=576" 
              alt="Madurai Smart City Visualization" 
              className="w-full h-full object-cover opacity-40"
            />
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-10" />
          </motion.div>
        </div>

        <div className="relative z-20 w-full max-w-[120rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary font-heading font-semibold tracking-widest text-sm uppercase">
                Next Gen Urban Management
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 tracking-tight"
            >
              Clean Madurai <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-neon-green to-secondary">
                AI-Powered Future
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-paragraph text-lg md:text-xl text-foreground/70 max-w-2xl mb-10 leading-relaxed"
            >
              Empowering citizens with intelligent technology. Report violations instantly, 
              track resolution in real-time, and contribute to a sustainable, data-driven ecosystem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/report">
                <Button size="lg" className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold text-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300">
                  <Camera className="mr-2 h-5 w-5" />
                  Report Issue
                </Button>
              </Link>
              <Link to="/reports">
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-foreground font-heading font-semibold text-lg backdrop-blur-sm transition-all duration-300">
                  <Activity className="mr-2 h-5 w-5" />
                  Live Dashboard
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Hero Visual / 3D Abstract */}
          <div className="lg:col-span-5 relative hidden lg:block h-[600px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute inset-0"
            >
              {/* Abstract UI Elements representing AI scanning */}
              <div className="relative w-full h-full">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary/20 animate-[spin_10s_linear_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-secondary/20 animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl" />
                
                {/* Floating Cards */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-20 right-10 bg-card-background-dark/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl w-48"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-foreground/60">SYSTEM ACTIVE</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[85%]" />
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-32 left-0 bg-card-background-dark/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl w-56"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono text-foreground/60">WASTE DETECTED</span>
                    <span className="text-xs font-bold text-primary">98% MATCH</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-8 bg-white/5 rounded-md" />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* --- STATS SECTION --- */}
      <section className="w-full py-20 bg-card-background-dark border-b border-white/5">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS_DATA.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-sm md:text-base font-mono text-primary uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROBLEM STATEMENT --- */}
      <section className="w-full py-32 relative overflow-clip">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent opacity-50" />
        
        <div className="relative z-10 max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-8">
                <ShieldCheck className="w-4 h-4 text-red-400" />
                <span className="text-red-400 text-sm font-bold tracking-wide uppercase">Critical Urban Challenge</span>
              </div>
              
              <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
                The Invisible Cost of <br />
                <span className="text-foreground/40">Urban Waste</span>
              </h2>
              
              <div className="space-y-6 text-lg text-foreground/70 font-paragraph">
                <p>
                  Madurai generates thousands of tons of waste daily. Traditional reporting methods are slow, 
                  opaque, and disconnected, leading to environmental degradation and health hazards.
                </p>
                <p>
                  We are bridging the gap between citizens and authorities. By leveraging Computer Vision and 
                  Geospatial Analytics, we transform every smartphone into a powerful tool for urban renewal.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-bold text-xl mb-2">Legacy Systems</h4>
                  <p className="text-sm text-foreground/50">Manual reporting, 48h+ response time, no feedback loop.</p>
                </div>
                <div>
                  <h4 className="text-primary font-bold text-xl mb-2">Our Solution</h4>
                  <p className="text-sm text-foreground/50">Instant AI analysis, real-time tracking, optimized routing.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] rounded-3xl overflow-clip border border-white/10 group"
            >
              <Image 
                src="https://static.wixstatic.com/media/c5258a_b0ed9ecfa07f4e9d8270955173e8ca52~mv2.png?originWidth=1152&originHeight=576" 
                alt="Urban Waste Challenge" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              
              {/* Overlay Data Points */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-card-background-dark/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-mono text-foreground/60">DETECTED ANOMALIES</span>
                    <Activity className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Illegal Dumping</span>
                      <span className="text-red-400">High Severity</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full">
                      <div className="w-[80%] h-full bg-red-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (Sticky Scroll) --- */}
      <section className="w-full py-32 bg-card-background-dark relative">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">System Workflow</h2>
            <p className="text-foreground/60 text-xl max-w-2xl mx-auto">
              From detection to resolution in three intelligent steps.
            </p>
          </motion.div>

          <div className="relative">
            {HOW_IT_WORKS_DATA.map((item, index) => (
              <StickyProcessStep key={index} item={item} index={index} total={HOW_IT_WORKS_DATA.length} />
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="w-full py-32 bg-background relative overflow-clip">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4">
                Intelligence Suite
              </h2>
              <p className="text-foreground/60 text-lg max-w-xl">
                A comprehensive toolkit designed for modern urban governance and citizen engagement.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link to="/features">
                <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/10 group text-lg">
                  Explore all capabilities <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {FEATURES_DATA.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="w-full py-32 relative overflow-clip">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-card-background-dark" />
        
        <div className="relative z-10 max-w-[100rem] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-card-background-dark/50 backdrop-blur-xl"
          >
            {/* Background Gradient Mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-50" />
            
            <div className="relative z-10 px-8 py-24 md:p-32 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
              >
                <Smartphone className="w-4 h-4 text-primary" />
                <span className="text-foreground/80 text-sm font-medium">Available on iOS and Android</span>
              </motion.div>

              <h2 className="font-heading text-4xl md:text-7xl font-bold text-foreground mb-8 max-w-4xl mx-auto leading-tight">
                Ready to Transform <br />
                <span className="text-primary">Your City?</span>
              </h2>
              
              <p className="font-paragraph text-xl text-foreground/70 mb-12 max-w-2xl mx-auto">
                Join thousands of citizens and municipal workers in the movement towards a cleaner, smarter Madurai.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/report">
                  <Button size="lg" className="h-16 px-10 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-bold text-lg shadow-lg hover:shadow-primary/25 transition-all duration-300 w-full sm:w-auto">
                    <Camera className="mr-2 h-6 w-6" />
                    Start Reporting
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl border-white/10 bg-transparent hover:bg-white/5 text-foreground font-heading font-bold text-lg w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}