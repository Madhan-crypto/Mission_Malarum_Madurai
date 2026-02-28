import { motion } from 'framer-motion';
import { Target, Users, Leaf, TrendingUp, Award, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const mission = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To create a cleaner, healthier Madurai through technology-driven citizen engagement and efficient municipal response systems.',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Aligned with UN Sustainable Development Goals, particularly SDG 11 (Sustainable Cities) and SDG 12 (Responsible Consumption).',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Empowering every citizen to become an active participant in urban cleanliness and environmental protection.',
    },
  ];

  const impact = [
    { label: 'Reports Submitted', value: '10,000+' },
    { label: 'Issues Resolved', value: '7,500+' },
    { label: 'Active Citizens', value: '5,000+' },
    { label: 'Waste Diverted', value: '250 Tons' },
  ];

  const features = [
    {
      icon: TrendingUp,
      title: 'AI-Powered Classification',
      description: 'Advanced machine learning algorithms automatically identify waste types and provide educational insights in real-time.',
    },
    {
      icon: Globe,
      title: 'Real-Time Tracking',
      description: 'GPS-enabled reporting ensures precise location capture and efficient routing for municipal collection teams.',
    },
    {
      icon: Award,
      title: 'Gamification',
      description: 'Earn points, unlock badges, and compete on leaderboards to motivate continued participation and engagement.',
    },
  ];

  const sdgs = [
    {
      number: '11',
      title: 'Sustainable Cities and Communities',
      description: 'Making cities inclusive, safe, resilient and sustainable',
    },
    {
      number: '12',
      title: 'Responsible Consumption and Production',
      description: 'Ensure sustainable consumption and production patterns',
    },
    {
      number: '13',
      title: 'Climate Action',
      description: 'Take urgent action to combat climate change and its impacts',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[100rem] mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
              About Clean Madurai
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 leading-relaxed max-w-4xl">
              Clean Madurai is an innovative AI-powered platform that bridges the gap between citizens 
              and municipal authorities, creating a transparent, efficient ecosystem for urban cleanliness 
              management. By leveraging cutting-edge technology and community engagement, we're transforming 
              how Madurai addresses waste management challenges.
            </p>
          </motion.div>

          {/* Mission Cards */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {mission.map((item, index) => (
                <div
                  key={index}
                  className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-8 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </section>

          {/* Impact Stats */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl border border-primary/30 p-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
                Our Impact
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {impact.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="font-heading text-4xl md:text-5xl font-bold text-primary mb-2">
                      {stat.value}
                    </p>
                    <p className="font-paragraph text-sm text-foreground/70">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Key Features */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Technology That Makes a Difference
              </h2>
              <p className="font-paragraph text-lg text-foreground/70 max-w-3xl">
                Our platform combines artificial intelligence, geospatial technology, and behavioral 
                science to create a comprehensive solution for urban waste management.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-8"
                >
                  <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* SDG Alignment */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                UN Sustainable Development Goals
              </h2>
              <p className="font-paragraph text-lg text-foreground/70 max-w-3xl">
                Clean Madurai directly contributes to achieving the United Nations Sustainable 
                Development Goals, creating measurable impact on environmental sustainability.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sdgs.map((sdg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-8 hover:border-secondary/50 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="font-heading text-2xl font-bold text-secondary">
                        {sdg.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                        {sdg.title}
                      </h3>
                      <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
                        {sdg.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-12"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
                How It Works
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="font-heading text-xl font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Citizens Report Issues
                    </h3>
                    <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                      Users capture photos of waste violations using their smartphones. GPS automatically 
                      records the precise location, ensuring accurate reporting.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="font-heading text-xl font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      AI Analyzes and Classifies
                    </h3>
                    <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                      Our machine learning model instantly identifies waste types (plastic, organic, metal, etc.) 
                      and provides educational feedback on proper disposal methods.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="font-heading text-xl font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Municipal Authorities Respond
                    </h3>
                    <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                      Reports are routed to the municipal dashboard with severity scoring and optimized 
                      collection routes, enabling efficient resource allocation and faster response times.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="font-heading text-xl font-bold text-primary">4</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Track Progress and Earn Rewards
                    </h3>
                    <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                      Citizens receive real-time status updates and earn points for their contributions. 
                      Gamification elements encourage continued engagement and community participation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
