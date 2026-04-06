import { useRoute, Link } from "wouter";
import { newsItems, NewsItem } from "@/data/news";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Tag, Share2, ChevronRight } from "lucide-react";
import NotFound from "@/pages/not-found";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

import { Gallery } from "@/components/Gallery";
import { newsSeoDetails } from "@/data/seo-enhancements";

// Related Post Card Component
function RelatedPostCard({ post, delay }: { post: NewsItem; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/vesti/${post.id}`}>
        <article className="group h-full bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-primary/30 hover:bg-white/10 transition-all duration-300 cursor-pointer">
          {/* Image */}
          {post.image && (
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c29] via-transparent to-transparent opacity-60" />
            </div>
          )}

          {/* Content */}
          <div className="p-5">
            {/* Category Badge */}
            <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
              {post.category}
            </span>

            {/* Title */}
            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {post.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-white/60 line-clamp-2 mb-4">
              {post.desc}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5 gap-2">
              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {post.tags?.slice(0, 2).map(tag => (
                  <span key={tag} className="text-xs text-white/40 font-mono">
                    {tag}
                  </span>
                ))}
                {post.tags && post.tags.length > 2 && (
                  <span className="text-xs text-white/30">+{post.tags.length - 2}</span>
                )}
              </div>
              
              {/* CTA */}
              <span className="text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 shrink-0">
                Pročitaj <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

export default function NewsPost() {
  const [match, params] = useRoute("/vesti/:slug");
  const { toast } = useToast();
  
  if (!match || !params) return <NotFound />;
  
  const slug = params.slug;
  const post = newsItems.find(item => item.slug === slug);
  
  // Fallback: try to find by ID if slug is a number (for backward compatibility)
  const postById = !post && !isNaN(Number(slug)) 
    ? newsItems.find(item => item.id === Number(slug)) 
    : null;
  
  const finalPost = post || postById;
  const newsSeo = finalPost ? newsSeoDetails[finalPost.id] : undefined;

  if (!finalPost) return <NotFound />;

  // Find related posts (same category, excluding current post)
  const relatedPosts = newsItems
    .filter(item => item.id !== finalPost.id && item.category === finalPost.category)
    .slice(0, 3);

  // If not enough related posts by category, add recent posts
  if (relatedPosts.length < 3) {
    const recentPosts = newsItems
      .filter(item => item.id !== finalPost.id && !relatedPosts.find(rp => rp.id === item.id))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...recentPosts);
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: finalPost.title,
          text: finalPost.desc,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link kopiran!",
        description: "Link vesti je kopiran u privremenu memoriju.",
      });
    }
  };

  return (
    <div className="bg-[#0a0c29] min-h-screen text-white selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="pt-32 md:pt-40 pb-16 md:pb-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <Link href="/vesti">
            <Button variant="ghost" className="mb-8 text-white/50 hover:text-white hover:bg-white/5 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Nazad na arhivnu stranicu
            </Button>
          </Link>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="flex items-center text-white/50 text-sm bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <Tag className="w-3 h-3 mr-2" />
                {finalPost.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-8 leading-tight">
              {finalPost.title}
            </h1>

            {finalPost.image && (
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
                <img 
                  src={finalPost.image} 
                  alt={finalPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c29] via-transparent to-transparent opacity-50" />
              </div>
            )}

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="lead text-xl text-white/80 font-light mb-8 border-l-4 border-primary pl-6">
                {finalPost.desc}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Industrijsko hlađenje kroz aktuelne projekte i iskustva
              </h2>
              <p className="text-white/70 mb-8">
                Kroz ovu vest donosimo praktične uvide iz oblasti industrijskog hlađenja, sa fokusom na tehnološka rešenja, izvođenje i rezultate na terenu.
              </p>
              
              <div className="space-y-6 text-white/70">
                {finalPost.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {newsSeo?.relatedLinks?.length ? (
              <section className="mt-14 border-t border-white/10 pt-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Povezane usluge i rešenja</h2>
                <p className="text-white/70 mb-6">
                  Ako vas zanima ova tema, pogledajte i povezane stranice sa tehničkim detaljima.
                </p>
                <div className="flex flex-wrap gap-3">
                  {newsSeo.relatedLinks.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            {newsSeo?.faqs?.length ? (
              <section className="mt-14 border-t border-white/10 pt-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Često postavljana pitanja</h2>
                <div className="space-y-6">
                  {newsSeo.faqs.map((item) => (
                    <article key={item.question} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{item.question}</h3>
                      <p className="text-white/70 leading-relaxed">{item.answer}</p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Gallery Section - Only for Masinski Fakultet post (id: 1) */}
            {finalPost.id === 1 && (
              <div className="mt-12">
                <Gallery 
                  title="Galerija" 
                  images={[
                    "/assets/blog/masinski-fakultet/gallery-1.webp",
                    "/assets/blog/masinski-fakultet/gallery-2.webp",
                    "/assets/blog/masinski-fakultet/gallery-3.webp",
                    "/assets/blog/masinski-fakultet/gallery-4.webp",
                    "/assets/blog/masinski-fakultet/gallery-5.webp",
                  ]} 
                  embedded={true}
                  transparent={true}
                />
              </div>
            )}

            {/* Gallery Section - Only for Zitostok post (id: 2) */}
            {finalPost.id === 2 && (
              <div className="mt-12">
                <Gallery 
                  title="Galerija" 
                  images={[
                    "/assets/blog/zitostok/gallery-1.webp",
                    "/assets/blog/zitostok/gallery-2.webp",
                    "/assets/blog/zitostok/gallery-3.webp",
                    "/assets/blog/zitostok/gallery-4.webp",
                    "/assets/blog/zitostok/gallery-5.webp",
                    "/assets/blog/zitostok/gallery-6.webp",
                    "/assets/blog/zitostok/gallery-7.webp",
                    "/assets/blog/zitostok/gallery-8.webp",
                    "/assets/blog/zitostok/gallery-9.webp",
                  ]} 
                  embedded={true}
                  transparent={true}
                />
              </div>
            )}

            {/* Gallery Section - Only for Delta Agrar Zajecar post (id: 3) */}
            {finalPost.id === 3 && (
              <div className="mt-12">
                <Gallery 
                  title="Galerija" 
                  images={[
                    "/assets/blog/delta-agrar-zajecar/gallery-1.webp",
                    "/assets/blog/delta-agrar-zajecar/gallery-2.webp",
                    "/assets/blog/delta-agrar-zajecar/gallery-3.webp",
                  ]} 
                  embedded={true}
                  transparent={true}
                />
              </div>
            )}

            {/* Gallery Section - Only for Archiv RGZ post (id: 4) */}
            {finalPost.id === 4 && (
              <div className="mt-12">
                <Gallery 
                  title="Galerija" 
                  images={[
                    "/assets/blog/archiv-rgz/gallery-1.webp",
                    "/assets/blog/archiv-rgz/gallery-2.webp",
                    "/assets/blog/archiv-rgz/gallery-3.webp",
                  ]} 
                  embedded={true}
                  transparent={true}
                />
              </div>
            )}

            {/* Gallery Section - Only for MAF RODA Sajam post (id: 5) */}
            {finalPost.id === 5 && (
              <div className="mt-12">
                <Gallery 
                  title="Galerija" 
                  images={[
                    "/assets/blog/maf-roda-sajam/gallery-1.webp",
                    "/assets/blog/maf-roda-sajam/gallery-2.webp",
                  ]} 
                  embedded={true}
                  transparent={true}
                />
              </div>
            )}

            {/* Gallery Section - Only for RALU Logistika post (id: 6) */}
            {finalPost.id === 6 && (
              <div className="mt-12">
                <Gallery 
                  title="Galerija" 
                  images={[
                    "/assets/blog/ralu-logistika/gallery-1.webp",
                    "/assets/blog/ralu-logistika/gallery-2.webp",
                    "/assets/blog/ralu-logistika/gallery-3.webp",
                  ]} 
                  embedded={true}
                  transparent={true}
                />
              </div>
            )}

            {/* Gallery Section - Only for Danfoss Summit post (id: 7) */}
            {finalPost.id === 7 && (
              <div className="mt-12">
                <Gallery 
                  title="Galerija" 
                  images={[
                    "/assets/blog/danfoss-summit/gallery-1.webp",
                    "/assets/blog/danfoss-summit/gallery-2.webp",
                    "/assets/blog/danfoss-summit/gallery-3.webp",
                  ]} 
                  embedded={true}
                  transparent={true}
                />
              </div>
            )}

            {/* Gallery Section - Only for Sirogojno Company post (id: 8) */}
            {finalPost.id === 8 && (
              <div className="mt-12">
                <Gallery 
                  title="Galerija" 
                  images={[
                    "/assets/blog/sirogojno-company/gallery-1.webp",
                    "/assets/blog/sirogojno-company/gallery-2.webp",
                    "/assets/blog/sirogojno-company/gallery-3.webp",
                  ]} 
                  embedded={true}
                  transparent={true}
                />
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-3">
              {finalPost.tags?.map(tag => (
                <span key={tag} className="text-sm text-primary/70 hover:text-primary cursor-pointer transition-colors">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mt-8 flex justify-end">
               <Button 
                variant="outline" 
                size="sm" 
                className="border-white/10 hover:bg-white/5 text-white/70"
                onClick={handleShare}
              >
                  <Share2 className="w-4 h-4 mr-2" /> Podeli vest
               </Button>
            </div>

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <section className="mt-16 md:mt-20 border-t border-white/10 pt-12">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
                    Slične Objave
                  </h2>
                  <Link href="/vesti">
                    <Button variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/10 gap-2">
                      Pogledaj sve <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost, index) => (
                    <RelatedPostCard 
                      key={relatedPost.id} 
                      post={relatedPost} 
                      delay={index * 0.1} 
                    />
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
