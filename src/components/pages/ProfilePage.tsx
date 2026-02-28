import { motion } from 'framer-motion';
import { User, Mail, Calendar, Award, LogOut } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useMember } from '@/integrations';
import { Image } from '@/components/ui/image';

export default function ProfilePage() {
  const { member, actions } = useMember();

  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-12">
              My Profile
            </h1>

            {/* Profile Card */}
            <div className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-8 mb-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {member?.profile?.photo?.url ? (
                    <Image src={member.profile.photo.url} alt={member.profile.nickname || 'Profile'} className="w-32 h-32 rounded-3xl object-cover border-2 border-primary/30" />
                  ) : (
                    <div className="w-32 h-32 bg-primary/10 rounded-3xl flex items-center justify-center border-2 border-primary/30">
                      <User className="w-16 h-16 text-primary" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
                    {member?.profile?.nickname || member?.contact?.firstName || 'User'}
                  </h2>
                  {member?.profile?.title && (
                    <p className="font-paragraph text-base text-foreground/70 mb-4">
                      {member.profile.title}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center space-x-2 text-foreground/70">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="font-paragraph text-sm">
                        {member?.loginEmail || 'No email'}
                      </span>
                    </div>
                    {member?._createdDate && (
                      <div className="flex items-center space-x-2 text-foreground/70">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="font-paragraph text-sm">
                          Joined {formatDate(member._createdDate)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-8 mb-8">
              <h3 className="font-heading text-xl font-bold text-foreground mb-6">
                Account Details
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-heading text-xs font-medium text-foreground/60 mb-1">
                      First Name
                    </p>
                    <p className="font-paragraph text-base text-foreground">
                      {member?.contact?.firstName || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="font-heading text-xs font-medium text-foreground/60 mb-1">
                      Last Name
                    </p>
                    <p className="font-paragraph text-base text-foreground">
                      {member?.contact?.lastName || 'Not provided'}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="font-heading text-xs font-medium text-foreground/60 mb-1">
                    Email Address
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="font-paragraph text-base text-foreground">
                      {member?.loginEmail || 'Not provided'}
                    </p>
                    {member?.loginEmailVerified && (
                      <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-lg">
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                {member?.contact?.phones && member.contact.phones.length > 0 && (
                  <div>
                    <p className="font-heading text-xs font-medium text-foreground/60 mb-1">
                      Phone Number
                    </p>
                    <p className="font-paragraph text-base text-foreground">
                      {member.contact.phones[0]}
                    </p>
                  </div>
                )}

                <div>
                  <p className="font-heading text-xs font-medium text-foreground/60 mb-1">
                    Account Status
                  </p>
                  <p className="font-paragraph text-base text-foreground">
                    {member?.status || 'Active'}
                  </p>
                </div>

                {member?.lastLoginDate && (
                  <div>
                    <p className="font-heading text-xs font-medium text-foreground/60 mb-1">
                      Last Login
                    </p>
                    <p className="font-paragraph text-base text-foreground">
                      {formatDate(member.lastLoginDate)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl border border-primary/30 p-8 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <Award className="w-6 h-6 text-primary" />
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Your Contribution
                </h3>
              </div>
              <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                Thank you for being part of the Clean Madurai community! Your reports and 
                engagement help make our city cleaner and more sustainable. Visit your dashboard 
                to see detailed statistics and track your impact.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={actions.logout}
                variant="outline"
                className="border-2 border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground font-heading font-semibold rounded-xl px-8"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
