import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Camera, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMember } from '@/integrations';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { member, isAuthenticated, isLoading, actions } = useMember();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/reports', label: 'Reports' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/resources', label: 'Resources' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-foreground/10">
      <div className="max-w-[120rem] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold text-foreground">
              Clean Madurai
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-heading text-sm font-medium transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/report">
              <Button 
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Camera className="mr-2 h-4 w-4" />
                Report Issue
              </Button>
            </Link>

            {isLoading ? (
              <div className="w-10 h-10 rounded-full bg-card-background-dark/70 animate-pulse" />
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-heading font-medium rounded-xl hover:bg-card-background-dark/70"
                  >
                    <User className="mr-2 h-4 w-4" />
                    {member?.profile?.nickname || 'Profile'}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={actions.logout}
                  className="font-heading font-medium rounded-xl hover:bg-card-background-dark/70"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={actions.login}
                className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-heading font-semibold rounded-xl"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-card-background-dark/95 backdrop-blur-xl border-t border-foreground/10"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-heading text-base font-medium py-2 transition-colors duration-300 ${
                    isActive(link.path)
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 space-y-3 border-t border-foreground/10">
                <Link to="/report" onClick={() => setMobileMenuOpen(false)}>
                  <Button 
                    size="sm"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold rounded-xl"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Report Issue
                  </Button>
                </Link>

                {isLoading ? (
                  <div className="w-full h-10 rounded-xl bg-card-background-dark/70 animate-pulse" />
                ) : isAuthenticated ? (
                  <>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-2 border-foreground/20 text-foreground hover:bg-card-background-dark/70 font-heading font-medium rounded-xl"
                      >
                        <User className="mr-2 h-4 w-4" />
                        {member?.profile?.nickname || 'Profile'}
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        actions.logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full border-2 border-foreground/20 text-foreground hover:bg-card-background-dark/70 font-heading font-medium rounded-xl"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      actions.login();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-heading font-semibold rounded-xl"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Leaf({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}
