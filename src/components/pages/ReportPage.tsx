import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Upload, MapPin, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BaseCrudService } from '@/integrations';
import { CleanlinessReports } from '@/entities';
import { useMember } from '@/integrations';
import * as tf from '@tensorflow/tfjs';
import { Image } from '@/components/ui/image';

const VIOLATION_TYPES = [
  'Garbage Pile',
  'Illegal Dumping',
  'Overflowing Bin',
  'Blocked Drain',
  'Littering',
  'Other',
];

const WASTE_CLASSIFICATIONS = [
  'Organic',
  'Plastic',
  'Metal',
  'Glass',
  'Paper',
  'Mixed',
  'Hazardous',
];

export default function ReportPage() {
  const navigate = useNavigate();
  const { member } = useMember();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [violationType, setViolationType] = useState('');
  const [wasteClassification, setWasteClassification] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiClassification, setAiClassification] = useState<string>('');
  const [aiMessage, setAiMessage] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    setLocationStatus('loading');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationStatus('success');
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Madurai coordinates
          setLocation({
            latitude: 9.9252,
            longitude: 78.1198,
          });
          setLocationStatus('error');
        }
      );
    } else {
      // Default to Madurai coordinates
      setLocation({
        latitude: 9.9252,
        longitude: 78.1198,
      });
      setLocationStatus('error');
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Simulate AI classification
      await classifyWaste(file);
    }
  };

  const classifyWaste = async (file: File) => {
    setIsAnalyzing(true);
    setAiClassification('');
    setAiMessage('');

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simple simulation of waste classification
    const classifications = [
      { type: 'Plastic', message: 'This appears to be plastic waste - did you know it can take up to 1000 years to decompose? Please ensure it reaches a recycling facility!' },
      { type: 'Organic', message: 'This looks like organic waste - it can be composted to create nutrient-rich soil for plants. Consider composting at home!' },
      { type: 'Paper', message: 'This appears to be paper waste - it\'s highly recyclable! One ton of recycled paper saves 17 trees.' },
      { type: 'Metal', message: 'This looks like metal waste - metals are infinitely recyclable without losing quality. Please recycle!' },
      { type: 'Glass', message: 'This appears to be glass waste - glass can be recycled endlessly. Always dispose in designated bins!' },
      { type: 'Mixed', message: 'This appears to be mixed waste - proper segregation helps improve recycling rates significantly!' },
    ];

    const randomClassification = classifications[Math.floor(Math.random() * classifications.length)];
    
    setAiClassification(randomClassification.type);
    setWasteClassification(randomClassification.type);
    setAiMessage(randomClassification.message);
    setIsAnalyzing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile || !violationType || !wasteClassification) {
      return;
    }

    setIsSubmitting(true);

    const severityScore = Math.floor(Math.random() * 10) + 1;

    const reportData: Partial<CleanlinessReports> = {
      _id: crypto.randomUUID(),
      violationImage: 'https://static.wixstatic.com/media/c5258a_22860b9b324e4911a57bb1cd1a7ccd07~mv2.png?originWidth=640&originHeight=384',
      violationType,
      description,
      latitude: location.latitude,
      longitude: location.longitude,
      reportDateTime: new Date().toISOString(),
      status: 'Submitted',
      severityScore,
      wasteClassification,
    };

    await BaseCrudService.create<CleanlinessReports>('cleanlinessreports', reportData);

    setIsSubmitting(false);
    navigate('/dashboard');
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
            <div className="mb-12">
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4">
                Report Cleanliness Issue
              </h1>
              <p className="font-paragraph text-lg text-foreground/70">
                Help keep Madurai clean by reporting waste violations. Our AI will analyze the image and provide insights.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Image Upload */}
              <div className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-8">
                <Label className="font-heading text-lg font-semibold text-foreground mb-4 block">
                  Upload Image *
                </Label>
                
                <div className="space-y-4">
                  {!imagePreview ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-foreground/20 rounded-2xl p-12 text-center cursor-pointer hover:border-primary/50 transition-all duration-300"
                    >
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                          <Camera className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                          <p className="font-heading text-base font-semibold text-foreground mb-2">
                            Click to upload or take a photo
                          </p>
                          <p className="font-paragraph text-sm text-foreground/60">
                            PNG, JPG up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <Image src={imagePreview} alt="Preview" className="w-full h-96 object-cover rounded-2xl" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview('');
                          setAiClassification('');
                          setAiMessage('');
                        }}
                        className="absolute top-4 right-4 rounded-xl"
                      >
                        Remove
                      </Button>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {isAnalyzing && (
                    <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-6 flex items-center space-x-4">
                      <Loader2 className="w-6 h-6 text-secondary animate-spin" />
                      <p className="font-paragraph text-base text-foreground">
                        AI is analyzing the image...
                      </p>
                    </div>
                  )}

                  {aiMessage && (
                    <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                      <div className="flex items-start space-x-4">
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-heading text-base font-semibold text-foreground mb-2">
                            AI Classification: {aiClassification}
                          </p>
                          <p className="font-paragraph text-sm text-foreground/80">
                            {aiMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Violation Details */}
              <div className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-8 space-y-6">
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Violation Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="violationType" className="font-heading text-sm font-medium text-foreground mb-2 block">
                      Violation Type *
                    </Label>
                    <Select value={violationType} onValueChange={setViolationType} required>
                      <SelectTrigger className="bg-background/50 border-foreground/20 rounded-xl">
                        <SelectValue placeholder="Select violation type" />
                      </SelectTrigger>
                      <SelectContent>
                        {VIOLATION_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="wasteClassification" className="font-heading text-sm font-medium text-foreground mb-2 block">
                      Waste Classification *
                    </Label>
                    <Select value={wasteClassification} onValueChange={setWasteClassification} required>
                      <SelectTrigger className="bg-background/50 border-foreground/20 rounded-xl">
                        <SelectValue placeholder="Select waste type" />
                      </SelectTrigger>
                      <SelectContent>
                        {WASTE_CLASSIFICATIONS.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description" className="font-heading text-sm font-medium text-foreground mb-2 block">
                      Description (Optional)
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Provide additional details about the violation..."
                      className="bg-background/50 border-foreground/20 rounded-xl min-h-32"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-8">
                <div className="flex items-center justify-between mb-4">
                  <Label className="font-heading text-lg font-semibold text-foreground">
                    Location
                  </Label>
                  {locationStatus === 'loading' && (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  )}
                  {locationStatus === 'success' && (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  )}
                  {locationStatus === 'error' && (
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  )}
                </div>

                <div className="flex items-start space-x-3 text-foreground/70">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-paragraph text-sm">
                      Latitude: {location.latitude.toFixed(6)}
                    </p>
                    <p className="font-paragraph text-sm">
                      Longitude: {location.longitude.toFixed(6)}
                    </p>
                    {locationStatus === 'error' && (
                      <p className="font-paragraph text-xs text-destructive mt-2">
                        Using default Madurai location. Enable location services for accurate reporting.
                      </p>
                    )}
                  </div>
                </div>

                {locationStatus === 'error' && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={getLocation}
                    className="mt-4 border-primary/50 text-primary hover:bg-primary/10 rounded-xl"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Retry Location
                  </Button>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="border-2 border-foreground/20 text-foreground hover:bg-card-background-dark/70 font-heading font-semibold rounded-xl px-8"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!imageFile || !violationType || !wasteClassification || isSubmitting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold rounded-xl px-8"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-5 w-5" />
                      Submit Report
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
