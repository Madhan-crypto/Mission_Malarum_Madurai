import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, AlertCircle, Filter, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '@/integrations';
import { CleanlinessReports } from '@/entities';
import { Image } from '@/components/ui/image';

export default function ReportsPage() {
  const [reports, setReports] = useState<CleanlinessReports[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const LIMIT = 12;

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async (skipValue = 0) => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<CleanlinessReports>(
      'cleanlinessreports',
      [],
      { limit: LIMIT, skip: skipValue }
    );
    
    if (skipValue === 0) {
      setReports(result.items);
    } else {
      setReports(prev => [...prev, ...result.items]);
    }
    
    setHasNext(result.hasNext);
    setSkip(result.nextSkip || 0);
    setIsLoading(false);
  };

  const loadMore = () => {
    loadReports(skip);
  };

  const filteredReports = reports.filter(report => {
    const statusMatch = filterStatus === 'all' || report.status === filterStatus;
    const typeMatch = filterType === 'all' || report.violationType === filterType;
    return statusMatch && typeMatch;
  });

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

  const getSeverityColor = (score?: number) => {
    if (!score) return 'text-foreground/60';
    if (score >= 8) return 'text-destructive';
    if (score >= 5) return 'text-yellow-500';
    return 'text-primary';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[100rem] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4">
              Community Reports
            </h1>
            <p className="font-paragraph text-lg text-foreground/70">
              View all cleanliness reports submitted by citizens across Madurai
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-6 mb-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Filter className="w-5 h-5 text-primary" />
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Filters
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-heading text-sm font-medium text-foreground/70 mb-2 block">
                  Status
                </label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="bg-background/50 border-foreground/20 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Submitted">Submitted</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="font-heading text-sm font-medium text-foreground/70 mb-2 block">
                  Violation Type
                </label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="bg-background/50 border-foreground/20 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Garbage Pile">Garbage Pile</SelectItem>
                    <SelectItem value="Illegal Dumping">Illegal Dumping</SelectItem>
                    <SelectItem value="Overflowing Bin">Overflowing Bin</SelectItem>
                    <SelectItem value="Blocked Drain">Blocked Drain</SelectItem>
                    <SelectItem value="Littering">Littering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Reports Grid */}
          <div className="min-h-[600px]">
            {isLoading && reports.length === 0 ? null : filteredReports.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredReports.map((report, index) => (
                    <motion.div
                      key={report._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                    >
                      <Link to={`/reports/${report._id}`}>
                        <div className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 overflow-hidden hover:border-primary/50 transition-all duration-300 group">
                          {/* Image */}
                          <div className="relative h-56 overflow-hidden">
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

                          {/* Content */}
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="font-heading text-lg font-bold text-foreground">
                                {report.violationType}
                              </h3>
                              <div className="flex items-center space-x-1">
                                <AlertCircle className={`w-4 h-4 ${getSeverityColor(report.severityScore)}`} />
                                <span className={`font-heading text-sm font-semibold ${getSeverityColor(report.severityScore)}`}>
                                  {report.severityScore}/10
                                </span>
                              </div>
                            </div>

                            {report.description && (
                              <p className="font-paragraph text-sm text-foreground/70 mb-4 line-clamp-2">
                                {report.description}
                              </p>
                            )}

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

                            {report.wasteClassification && (
                              <div className="mt-4 pt-4 border-t border-foreground/10">
                                <Badge variant="outline" className="border-primary/30 text-primary rounded-xl">
                                  {report.wasteClassification}
                                </Badge>
                              </div>
                            )}

                            <div className="mt-4 flex items-center text-primary group-hover:translate-x-2 transition-transform duration-300">
                              <span className="font-heading text-sm font-semibold">View Details</span>
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {hasNext && (
                  <div className="flex justify-center">
                    <Button
                      onClick={loadMore}
                      variant="outline"
                      className="border-2 border-primary/50 text-primary hover:bg-primary/10 font-heading font-semibold rounded-xl px-8"
                    >
                      Load More Reports
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-12 text-center">
                <AlertCircle className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  No Reports Found
                </h3>
                <p className="font-paragraph text-base text-foreground/60">
                  {filterStatus !== 'all' || filterType !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Be the first to report a cleanliness issue'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
