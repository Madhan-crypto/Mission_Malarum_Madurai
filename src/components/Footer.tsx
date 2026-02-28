import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: 'Home', path: '/' },
      { label: 'Report Issue', path: '/report' },
      { label: 'View Reports', path: '/reports' },
      { label: 'Dashboard', path: '/dashboard' },
    ],
    resources: [
      { label: 'Educational Resources', path: '/resources' },
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/contact' },
      { label: 'FAQ', path: '/about#faq' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'Accessibility', path: '/accessibility' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className="w-full bg-card-background-dark/50 border-t border-foreground/10">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Leaf className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="font-heading text-2xl font-bold text-foreground">
                Clean Madurai
              </span>
            </div>
            <p className="font-paragraph text-base text-foreground/70 mb-6 leading-relaxed max-w-md">
              Empowering citizens and authorities with AI-powered technology to create a cleaner, 
              healthier, and more sustainable Madurai.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="font-paragraph text-sm text-foreground/70">
                  Madurai Municipal Corporation<br />
                  Madurai, Tamil Nadu 625001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-paragraph text-sm text-foreground/70">
                  +91 452 2345678
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-paragraph text-sm text-foreground/70">
                  support@cleanmadurai.in
                </span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="pt-8 border-t border-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-card-background-dark/70 border border-foreground/10 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/50 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="font-paragraph text-sm text-foreground/60">
              © {currentYear} Clean Madurai. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
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
