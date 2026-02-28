import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BaseCrudService } from '@/integrations';
import { Inquiries } from '@/entities';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    subject: '',
    messageContent: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const inquiryData: Partial<Inquiries> = {
      _id: crypto.randomUUID(),
      senderName: formData.senderName,
      senderEmail: formData.senderEmail,
      subject: formData.subject,
      messageContent: formData.messageContent,
      submissionTime: new Date().toISOString(),
    };

    await BaseCrudService.create<Inquiries>('inquiries', inquiryData);

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        senderName: '',
        senderEmail: '',
        subject: '',
        messageContent: '',
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: 'Madurai Municipal Corporation\nMadurai, Tamil Nadu 625001',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 452 2345678\nMon-Fri: 9:00 AM - 6:00 PM',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'support@cleanmadurai.in\ninfo@cleanmadurai.in',
    },
  ];

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
              Get in Touch
            </h1>
            <p className="font-paragraph text-lg text-foreground/70">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Send us a Message
                </h2>

                {isSubmitted ? (
                  <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8 text-center">
                    <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="font-paragraph text-base text-foreground/70">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="senderName" className="font-heading text-sm font-medium text-foreground mb-2 block">
                          Your Name *
                        </Label>
                        <Input
                          id="senderName"
                          name="senderName"
                          type="text"
                          value={formData.senderName}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="bg-background/50 border-foreground/20 rounded-xl"
                        />
                      </div>

                      <div>
                        <Label htmlFor="senderEmail" className="font-heading text-sm font-medium text-foreground mb-2 block">
                          Email Address *
                        </Label>
                        <Input
                          id="senderEmail"
                          name="senderEmail"
                          type="email"
                          value={formData.senderEmail}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="bg-background/50 border-foreground/20 rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="font-heading text-sm font-medium text-foreground mb-2 block">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="How can we help you?"
                        className="bg-background/50 border-foreground/20 rounded-xl"
                      />
                    </div>

                    <div>
                      <Label htmlFor="messageContent" className="font-heading text-sm font-medium text-foreground mb-2 block">
                        Message *
                      </Label>
                      <Textarea
                        id="messageContent"
                        name="messageContent"
                        value={formData.messageContent}
                        onChange={handleChange}
                        required
                        placeholder="Tell us more about your inquiry..."
                        className="bg-background/50 border-foreground/20 rounded-xl min-h-40"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold rounded-xl py-6"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                        {info.title}
                      </h3>
                      <p className="font-paragraph text-sm text-foreground/70 whitespace-pre-line leading-relaxed">
                        {info.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Additional Info */}
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl border border-primary/30 p-6">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                  Quick Response
                </h3>
                <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
                  We typically respond to inquiries within 24-48 hours during business days. 
                  For urgent matters, please call our support line.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
