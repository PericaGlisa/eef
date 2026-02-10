import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function ProjectAgrounija() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <Link href="/references">
            <a className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Nazad na reference
            </a>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">AGROUNIJA</h1>
            
            <div className="prose prose-lg prose-invert max-w-none text-white/80 space-y-6">
              <p>
                Tokom 2017. godine započeta je izgradnja prve faze hladnjače za potrebe skladištenja jabuke u ULO/DCA atmosferi. Hladnjača Agrounija se nalazi u Krčedinu i posluje kao deo MK Farming porodice. Kapacitet rashladnih komora u prvoj fazi je 3500 tona.
              </p>
              
              <p>
                2018. godine je realizovano proširenje kapaciteta hladnjače u vidu druge faze, čiji kapacitet je 4000 tona.
              </p>
              
              <p>
                Kvalitet rashladnih mašina je visok i na savremenom nivou, sa kompjuterskim vođenjem i regulacijom koja omogućava niska vršna opterećenja. Osnova za hlađenje u celom sistemu primarnog kruga je rashladno sredstvo amonijak (NH3) sa indirektnom ekspanzijom, koji preko izmenjivača ima u sekundarnom krugu rashladno sredstvo Glycol, koji se distribuira potrošačima u svim komorama na svim režimima. Sistem hlađenja, zajedno sa izolacijom, LED rasvetom i rekuperacijom otpadne toplote za podno grejanje čini ovu hladnjaču posebnom i obezbeđuje uštedu energije do 30% u poređenju sa dotadašnjim hladnjačama istog kapaciteta i namene.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
