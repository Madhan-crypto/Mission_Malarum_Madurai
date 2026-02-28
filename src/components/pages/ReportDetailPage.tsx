import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, AlertCircle, ArrowLeft, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { BaseCrudService } from '@/integrations';
import { CleanlinessReports } from '@/entities';
import { Image } from '@/components/ui/image';

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<CleanlinessReports | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, [id]);

  const loadReport = async () => {
    if (!id) return;
    
    setIsLoading(true);
    const data = await BaseCrudService.getById<CleanlinessReports>('cleanlinessreports', id);
    setReport(data);
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

  const getSeverityColor = (score?: number) => {
    if (!score) return 'text-foreground/60';
    if (score >= 8) return 'text-destructive';
    if (score >= 5) return 'text-yellow-500';
    return 'text-primary';
  };

  const getSeverityLabel = (score?: number) => {
    if (!score) return 'Unknown';
    if (score >= 8) return 'High';
    if (score >= 5) return 'Medium';
    return 'Low';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[100rem] mx-auto">
          <Link to="/reports">
            <Button
              variant="ghost"
              className="mb-8 font-heading font-medium hover:bg-card-background-dark/70 rounded-xl"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Reports
            </Button>
          </Link>

          <div className="min-h-[600px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <LoadingSpinner />
              </div>
            ) : !report ? (
              <div className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-12 text-center">
                <AlertCircle className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  Report Not Found
                </h3>
                <p className="font-paragraph text-base text-foreground/60 mb-6">
                  The report you're looking for doesn't exist or has been removed.
                </p>
                <Link to="/reports">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold rounded-xl">
                    View All Reports
                  </Button>
                </Link>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Image */}
                  <div className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 overflow-hidden">
                    <div className="relative h-96 md:h-[600px]">
                      <Image
                        src={report.violationImage || ''}
                        alt={report.violationType || 'Violation'}
                        className="w-full h-full object-cover"
                        width={800}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  {report.description && (
                    <div className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-8">
                      <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                        Description
                      </h3>
                      <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                        {report.description}
                      </p>
                    </div>
                  )}

                  {/* Location Map Placeholder */}
                  <div className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-8">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                      Location
                    </h3>
                    <div className="bg-background/50 rounded-2xl p-8 text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                      <p className="font-paragraph text-sm text-foreground/70 mb-2">
                        Latitude: {report.latitude?.toFixed(6)}
                      </p>
                      <p className="font-paragraph text-sm text-foreground/70">
                        Longitude: {report.longitude?.toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Status Card */}
                  <div className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-6">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-4">
                      Report Status
                    </h3>
                    <Badge className={`${getStatusColor(report.status)} border rounded-xl px-4 py-2 text-base w-full justify-center`}>
                      {report.status}
                    </Badge>
                  </div>

                  {/* Details Card */}
                  <div className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-6 space-y-6">
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Report Details
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <p className="font-heading text-xs font-medium text-foreground/60 mb-1">
                          Violation Type
                        </p>
                        <p className="font-paragraph text-base text-foreground font-semibold">
                          {report.violationType}
                        </p>
                      </div>

                      <div>
                        <p className="font-heading text-xs font-medium text-foreground/60 mb-1">
                          Waste Classification
                        </p>
                        <Badge variant="outline" className="border-primary/30 text-primary rounded-xl">
                          {report.wasteClassification}
                        </Badge>
                      </div>

                      <div>
                        <p className="font-heading text-xs font-medium text-foreground/60 mb-2">
                          Severity Score
                        </p>
                        <div className="flex items-center space-x-3">
                          <AlertCircle className={`w-6 h-6 ${getSeverityColor(report.severityScore)}`} />
                          <div>
                            <p className={`font-heading text-2xl font-bold ${getSeverityColor(report.severityScore)}`}>
                              {report.severityScore}/10
                            </p>
                            <p className={`font-paragraph text-xs ${getSeverityColor(report.severityScore)}`}>
                              {getSeverityLabel(report.severityScore)} Priority
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-foreground/10">
                        <div className="flex items-center space-x-2 text-foreground/70 mb-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="font-paragraph text-sm">
                            {report.reportDateTime ? new Date(report.reportDateTime).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) : 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-foreground/70">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="font-paragraph text-sm">
                            {report.reportDateTime ? new Date(report.reportDateTime).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Card */}
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl border border-primary/30 p-6">
                    <h3 className="font-heading text-base font-bold text-foreground mb-2">
                      Report an Issue?
                    </h3>
                    <p className="font-paragraph text-sm text-foreground/70 mb-4">
                      Help keep Madurai clean by reporting violations in your area.
                    </p>
                    <Link to="/report">
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold rounded-xl">
                        Submit Report
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
