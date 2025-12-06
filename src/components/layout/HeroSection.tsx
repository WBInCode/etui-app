import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Palette, Gem } from 'lucide-react';
import { Magnetic } from '@/components/ui/Magnetic';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 800], [0, 150]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[55vh] flex items-start justify-center overflow-hidden bg-background selection:bg-primary/30 pt-12 pb-24">
      {/* Abstract Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Floating Orbs / Gradients */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3], 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2], 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" 
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Magnetic Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 relative"
          >
            <Magnetic>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground pb-4">
                Zaprojektuj <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
                  Swoje Etui
                </span>
              </h1>
            </Magnetic>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            Poznaj nową generację personalizacji. Stwórz produkty idealnie dopasowane do Twojego stylu dzięki naszemu konfiguratorowi 3D.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center"
          >
            <Link to="/configure">
              <motion.button
                className="group relative px-8 py-4 text-lg font-semibold rounded-2xl overflow-hidden border border-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Solid dark background with subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-200 to-white" />
                
                {/* Shine effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full"
                  animate={{ translateX: ['-100%', '200%'] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut" 
                  }}
                />
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-white/30 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                
                {/* Button content */}
                <span className="relative z-10 flex items-center gap-3 text-black font-semibold">
                  <Palette className="w-5 h-5" />
                  Rozpocznij projektowanie
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Floating Cards / Bento Grid Preview (Abstract) */}
        <motion.div 
          style={{ y: y1, opacity }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto perspective-1000"
        >
          {/* Card 1 */}
          <motion.div 
            whileHover={{ y: -10, scale: 1.02 }}
            className="p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-md shadow-xl"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <Gem className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Materiały premium</h3>
            <p className="text-sm text-muted-foreground">Wybierz spośród wysokiej jakości skóry, zamszu i ekologicznych materiałów.</p>
          </motion.div>

          {/* Card 2 (Featured) */}
          <motion.div 
            whileHover={{ y: -10, scale: 1.02 }}
            className="md:-mt-8 p-6 rounded-2xl bg-gradient-to-b from-card/80 to-card/30 border border-primary/20 backdrop-blur-md shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="h-40 rounded-lg bg-muted/50 mb-4 overflow-hidden relative">
               {/* Abstract shape representing product */}
               <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary rounded-full blur-2xl opacity-50" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Wizualizacja 3D</h3>
            <p className="text-sm text-muted-foreground">Renderowanie w czasie rzeczywistym z realistycznym oświetleniem i teksturami.</p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            whileHover={{ y: -10, scale: 1.02 }}
            className="p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-md shadow-xl"
          >
            <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500">
              <ArrowRight className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Szybka dostawa</h3>
            <p className="text-sm text-muted-foreground">Wysyłka na cały świat ze śledzeniem i bezpiecznym pakowaniem.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
