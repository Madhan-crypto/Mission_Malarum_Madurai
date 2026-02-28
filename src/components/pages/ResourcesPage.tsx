import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '@/integrations';
import { EducationalResources } from '@/entities';
import { Image } from '@/components/ui/image';

export default function ResourcesPage() {
  const [resources, setResources] = useState<EducationalResources[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterWasteType, setFilterWasteType] = useState<string>('all');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const LIMIT = 12;

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async (skipValue = 0) => {
    setIsLoading(true);
    
    const result = await BaseCrudService.getAll<EducationalResources>(
      'educationalresources',
      [],
      { limit: LIMIT, skip: skipValue }
    );
    
    if (skipValue === 0) {
      setResources(result.items);
    } else {
      setResources(prev => [...prev, ...result.items]);
    }
    
    setHasNext(result.hasNext);
    setSkip(result.nextSkip || 0);
    setIsLoading(false);
  };

  const loadMore = () => {
    loadResources(skip);
  };

  const filteredResources = resources.filter(resource => {
    const categoryMatch = filterCategory === 'all' || resource.category === filterCategory;
    const wasteTypeMatch = filterWasteType === 'all' || resource.wasteType === filterWasteType;
    return categoryMatch && wasteTypeMatch;
  });

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'Guide':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'Tips':
        return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'Facts':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      default:
        return 'bg-foreground/20 text-foreground border-foreground/30';
    }
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
              Educational Resources
            </h1>
            <p className="font-paragraph text-lg text-foreground/70">
              Learn about waste segregation, recycling, and sustainable practices
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
                  Category
                </label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="bg-background/50 border-foreground/20 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Guide">Guide</SelectItem>
                    <SelectItem value="Tips">Tips</SelectItem>
                    <SelectItem value="Facts">Facts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="font-heading text-sm font-medium text-foreground/70 mb-2 block">
                  Waste Type
                </label>
                <Select value={filterWasteType} onValueChange={setFilterWasteType}>
                  <SelectTrigger className="bg-background/50 border-foreground/20 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Organic">Organic</SelectItem>
                    <SelectItem value="Plastic">Plastic</SelectItem>
                    <SelectItem value="Paper">Paper</SelectItem>
                    <SelectItem value="Metal">Metal</SelectItem>
                    <SelectItem value="Glass">Glass</SelectItem>
                    <SelectItem value="E-Waste">E-Waste</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Resources Grid */}
          <div className="min-h-[600px]">
            {isLoading && resources.length === 0 ? null : filteredResources.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredResources.map((resource, index) => (
                    <motion.div
                      key={resource._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 overflow-hidden hover:border-primary/50 transition-all duration-300 group"
                    >
                      {/* Image */}
                      {resource.mainImage && (
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={resource.mainImage}
                            alt={resource.title || 'Resource'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            width={400}
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          {resource.category && (
                            <Badge className={`${getCategoryColor(resource.category)} border rounded-xl px-3 py-1`}>
                              {resource.category}
                            </Badge>
                          )}
                          {resource.wasteType && (
                            <Badge variant="outline" className="border-primary/30 text-primary rounded-xl">
                              {resource.wasteType}
                            </Badge>
                          )}
                        </div>

                        <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                          {resource.title}
                        </h3>

                        {resource.content && (
                          <p className="font-paragraph text-sm text-foreground/70 mb-4 line-clamp-3">
                            {resource.content}
                          </p>
                        )}

                        {resource.externalLink && (
                          <a
                            href={resource.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-primary hover:text-primary/80 font-heading text-sm font-semibold transition-colors"
                          >
                            Learn More
                            <ExternalLink className="w-4 h-4 ml-1" />
                          </a>
                        )}
                      </div>
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
                      Load More Resources
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-card-background-dark/70 backdrop-blur-xl rounded-3xl border border-foreground/10 p-12 text-center">
                <BookOpen className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  No Resources Found
                </h3>
                <p className="font-paragraph text-base text-foreground/60">
                  {filterCategory !== 'all' || filterWasteType !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Educational resources will be added soon'}
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
