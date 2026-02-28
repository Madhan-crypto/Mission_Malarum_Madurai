import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Award, MapPin, Calendar, AlertCircle, Trophy, Target, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '@/integrations';
import { CleanlinessReports } from '@/entities';
import { useMember } from '@/integrations';
import { Image } from '@/components/ui/image';

export default function DashboardPage() {
  const { member } = useMember();
  const [reports, setReports] = useState<CleanlinessReports[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReports: 0,
    resolvedReports: 0,
    points: 0,
    rank: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    
    const result = await BaseCrudService.getAll<CleanlinessReports>(
      'cleanlinessreports',
      [],
      { limit: 50 }
    );
    
    setReports(result.items);
    
    // Calculate stats
    const totalReports = result.items.length;
    const resolvedReports = result.items.filter(r => r.status === 'Resolved').length;
    const points = totalReports * 10 + resolvedReports * 5;
    const rank = Math.max(1, Math.floor(Math.random() * 100));
    
    setStats({
      totalReports,
      resolvedReports,
      points,
      rank,
    });
    
    setIsLoading(false);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Submitted':
        return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'Under Review':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'Resolved':
        return 'bg-primary/20 text-primary border-primary/30';
      default:
        return 'bg-foreground/20 text-foreground border-foreground/30';
    }
  };

  const badges = [
    { name: 'First Report', icon: Target, earned: stats.totalReports >= 1 },
    { name: 'Active Citizen', icon: Zap, earned: stats.totalReports >= 5 },
    { name: 'Top Contributor', icon: Trophy, earned: stats.totalReports >= 10 },
    { name: 'Clean Champion', icon: Award, earned: stats.resolvedReports >= 5 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[100rem] mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4">
              Welcome back, {member?.profile?.nickname || 'Citizen'}!
            </h1>
            <p className="font-paragraph text-lg text-foreground/70">
              Track your contributions and see your impact on Madurai's cleanliness
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-xl rounded-3xl border border-primary/30 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <Badge className="bg-primary/20 text-primary border-primary/30 rounded-xl">
                  Total
                </Badge>
              </div>
              <p className="font-heading text-4xl font-bold text-foreground mb-1">
                {stats.totalReports}
              </p>
              <p className="font-paragraph text-sm text-foreground/70">
                Reports Submitted
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-secondary/20 to-secondary/5 backdrop-blur-xl rounded-3xl border border-secondary/30 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-secondary" />
                </div>
                <Badge className="bg-secondary/20 text-secondary border-secondary/30 rounded-xl">
                  Resolved
                </Badge>
              </div>
              <p className="font-heading text-4xl font-bold text-foreground mb-1">
                {stats.resolvedReports}
              </p>
              <p className="font-paragraph text-sm text-foreground/70">
                Issues Resolved
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 backdrop-blur-xl rounded-3xl border border-yellow-500/30 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-500" />
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 rounded-xl">
                  Points
                </Badge>
              </div>
              <p className="font-heading text-4xl font-bold text-foreground mb-1">
                {stats.points}
              </p>
              <p className="font-paragraph text-sm text-foreground/70">
                Total Points Earned
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-purple-500" />
                </div>
                <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/30 rounded-xl">
                  Rank
                </Badge>
              </div>
              <p className="font-heading text-4xl font-bold text-foreground mb-1">
                #{stats.rank}
              </p>
              <p className="font-paragraph text-sm text-foreground/70">
                Community Ranking
              </p>
            </motion.div>
          </div>

          {/* Badges Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-8 mb-12"
          >
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
              Your Badges
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border text-center transition-all duration-300 ${
                    badge.earned
                      ? 'bg-primary/10 border-primary/30'
                      : 'bg-foreground/5 border-foreground/10 opacity-50'
                  }`}
                >
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center ${
                    badge.earned ? 'bg-primary/20' : 'bg-foreground/10'
                  }`}>
                    <badge.icon className={`w-8 h-8 ${badge.earned ? 'text-primary' : 'text-foreground/30'}`} />
                  </div>
                  <p className={`font-heading text-sm font-semibold ${
                    badge.earned ? 'text-foreground' : 'text-foreground/50'
                  }`}>
                    {badge.name}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Reports */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Recent Reports
              </h2>
              <Link to="/reports">
                <Button
                  variant="outline"
                  className="border-2 border-primary/50 text-primary hover:bg-primary/10 font-heading font-semibold rounded-xl"
                >
                  View All
                </Button>
              </Link>
            </div>

            <div className="min-h-[400px]">
              {isLoading ? null : reports.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reports.slice(0, 6).map((report, index) => (
                    <motion.div
                      key={report._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                    >
                      <Link to={`/reports/${report._id}`}>
                        <div className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 overflow-hidden hover:border-primary/50 transition-all duration-300 group">
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={report.violationImage || ''}
                              alt={report.violationType || 'Violation'}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              width={400}
                            />
                            <div className="absolute top-4 right-4">
                              <Badge className={`${getStatusColor(report.status)} border rounded-xl px-3 py-1`}>
                                {report.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="p-6">
                            <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                              {report.violationType}
                            </h3>

                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-foreground/60">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span className="font-paragraph text-xs">
                                  {report.latitude?.toFixed(4)}, {report.longitude?.toFixed(4)}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-foreground/60">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span className="font-paragraph text-xs">
                                  {report.reportDateTime ? new Date(report.reportDateTime).toLocaleDateString() : 'N/A'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-12 text-center">
                  <AlertCircle className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                    No Reports Yet
                  </h3>
                  <p className="font-paragraph text-base text-foreground/60 mb-6">
                    Start making a difference by reporting your first cleanliness issue
                  </p>
                  <Link to="/report">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold rounded-xl">
                      Submit Your First Report
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
