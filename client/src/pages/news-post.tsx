import { useRoute, Link } from "wouter";
import { newsItems } from "@/data/news";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Tag, Share2 } from "lucide-react";
import NotFound from "@/pages/not-found";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

import { Gallery } from "@/components/Gallery";

export default function NewsPost() {
  const [match, params] = useRoute("/news/:id");
  const { toast } = useToast();
  
  if (!match || !params) return <NotFound />;
  
  const id = parseInt(params.id);
  const post = newsItems.find(item => item.id === id);

  if (!post) return <NotFound />;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.desc,
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
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 text-white/50 hover:text-white hover:bg-white/5 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Nazad na arhivnu stranicu
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="flex items-center text-white/50 text-sm bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <Tag className="w-3 h-3 mr-2" />
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-8 leading-tight">
              {post.title}
            </h1>

            {post.image && (
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c29] via-transparent to-transparent opacity-50" />
              </div>
            )}

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="lead text-xl text-white/80 font-light mb-8 border-l-4 border-primary pl-6">
                {post.desc}
              </p>
              
              <div className="space-y-6 text-white/70">
                {post.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Gallery Section - Only for Masinski Fakultet post (id: 1) */}
            {post.id === 1 && (
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
            {post.id === 2 && (
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
            {post.id === 3 && (
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
            {post.id === 4 && (
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
            {post.id === 5 && (
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
            {post.id === 6 && (
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
            {post.id === 7 && (
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
            {post.id === 8 && (
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
              {post.tags?.map(tag => (
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
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}