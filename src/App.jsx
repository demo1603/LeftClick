import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, MousePointer2, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Component: Diagnostic Shuffler ---
function DiagnosticShuffler() {
  const [cards, setCards] = useState([
    { id: 1, title: 'Acquisition Cost', metric: '-42%', desc: 'Drastic reduction in CAC' },
    { id: 2, title: 'Pipeline ROI', metric: '6.4x', desc: 'Average mult. on outbound spend' },
    { id: 3, title: 'LTV : CAC Ratio', metric: 'Top 5%', desc: 'Elite industry benchmarking' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const last = newCards.pop();
        newCards.unshift(last);
        return newCards;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[280px] flex justify-center mt-8">
      {cards.map((card, i) => {
        const isTop = i === 0;
        const isMiddle = i === 1;
        const isBottom = i === 2;
        
        let yOffset = 0;
        let scale = 1;
        let zIndex = 30;
        let opacity = 1;
        
        if (isMiddle) { yOffset = 24; scale = 0.95; zIndex = 20; opacity = 0.8; }
        if (isBottom) { yOffset = 48; scale = 0.90; zIndex = 10; opacity = 0.5; }

        return (
          <div 
            key={card.id}
            className="absolute w-[85%] bg-off-white border border-black/10 rounded-[2rem] p-6 shadow-xl transition-all duration-700 flex flex-col justify-between"
            style={{ 
              transform: `translateY(${yOffset}px) scale(${scale})`,
              zIndex,
              opacity,
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
              height: '180px'
            }}
          >
            <div className="flex justify-between items-start">
              <span className="font-bold text-sm uppercase opacity-60 tracking-wider font-heading">{card.title}</span>
              <span className="font-data text-xs px-2 py-1 bg-signal-red/10 text-signal-red rounded">{card.id}/3</span>
            </div>
            <div>
              <div className="text-4xl font-drama text-signal-red mb-1">{card.metric}</div>
              <div className="text-sm font-data opacity-70">{card.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- Component: Telemetry Typewriter ---
function TelemetryTypewriter() {
  const [text, setText] = useState('');
  const fullText = `> INITIALIZING OUTBOUND ENGINE\n> ANALYZING PROSPECT DATA\n> INJECTING AI PERSONALIZATION\n> GENERATING VARIANT A: 96% MATCH\n> SENDING AT SCALE... \n> RESPONSE DETECTED.\n> MEETING BOOKED.`;
  
  useEffect(() => {
    let i = 0;
    setText('');
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        setTimeout(() => { i = 0; }, 4000); // Reset after 4 seconds
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-black rounded-[2rem] p-6 text-paper border border-white/10 shadow-xl h-[280px] mt-8 flex flex-col">
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
        <div className="w-2 h-2 rounded-full bg-signal-red animate-pulse"></div>
        <span className="font-data text-xs uppercase opacity-60">Live Telemetry Feed</span>
      </div>
      <div className="font-data text-sm leading-relaxed opacity-90 whitespace-pre-line flex-1 overflow-hidden">
        {text}
        <span className="inline-block w-2 h-4 bg-signal-red ml-1 align-middle animate-pulse"></span>
      </div>
    </div>
  );
}

// --- Component: Cursor Protocol Scheduler ---
function CursorProtocolScheduler() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      tl.set('.anim-cursor', { x: 20, y: 150, opacity: 0 })
        .set('.anim-cell-wed', { backgroundColor: 'transparent' })
        .set('.anim-btn', { scale: 1, backgroundColor: '#E63B2E' }); // Signal Red

      // Enter
      tl.to('.anim-cursor', { opacity: 1, duration: 0.3 })
      // Move to cell
        .to('.anim-cursor', { x: 125, y: 70, duration: 0.8, ease: 'power2.inOut' })
      // Click simulation
        .to('.anim-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
      // Highlight cell
        .to('.anim-cell-wed', { backgroundColor: '#E63B2E', color: 'white', duration: 0.2 }, '-=0.1')
      // Move to button
        .to('.anim-cursor', { x: 200, y: 160, duration: 0.6, ease: 'power2.inOut', delay: 0.5 })
      // Click button
        .to('.anim-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
      // Button press effect
        .to('.anim-btn', { scale: 0.95, backgroundColor: '#c72e22', duration: 0.1, yoyo: true, repeat: 1 }, '-=0.1')
      // Fade out
        .to('.anim-cursor', { opacity: 0, duration: 0.3, delay: 0.5 });
        
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div ref={containerRef} className="relative w-full bg-off-white border border-black/10 rounded-[2rem] p-6 shadow-xl h-[280px] mt-8 flex flex-col justify-between overflow-hidden">
      <div>
        <div className="font-bold text-sm uppercase opacity-60 tracking-wider font-heading mb-4">Portfolio Sync</div>
        <div className="grid grid-cols-7 gap-1 md:gap-2 mb-6 text-center">
          {days.map((d, i) => (
            <div key={i} className="font-data text-xs opacity-50 mb-1">{d}</div>
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <div 
              key={i} 
              className={`h-8 rounded-md border border-black/5 flex items-center justify-center font-data text-xs ${i === 10 ? 'anim-cell-wed' : 'bg-black/5'}`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center bg-paper py-3 px-4 rounded-xl border border-black/5">
        <div className="font-bold text-xs uppercase opacity-70">Approve Sequence</div>
        <div className="anim-btn bg-signal-red text-white text-[10px] font-bold px-3 py-1.5 rounded uppercase">Save</div>
      </div>

      <MousePointer2 
        className="anim-cursor absolute z-50 text-black fill-black" 
        size={24} 
      />
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="py-24 px-6 md:px-12 lg:px-24 bg-paper">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-16 max-w-2xl">
          Interactive Functional Artifacts
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-2">Super Low CAC.</h3>
            <p className="opacity-70 font-data text-sm">Precision targeting drops acquisition costs mathematically.</p>
            <DiagnosticShuffler />
          </div>

          {/* Card 2 */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-2">AI Personalization.</h3>
            <p className="opacity-70 font-data text-sm">Scale high-volume outreach without losing the human touch.</p>
            <TelemetryTypewriter />
          </div>

          {/* Card 3 */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-2">Trusted Vendor.</h3>
            <p className="opacity-70 font-data text-sm">Executing reliable protocols for multi-billion dollar portfolios.</p>
            <CursorProtocolScheduler />
          </div>
        </div>
      </div>
    </section>
  );
}

function Navbar() {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: { className: 'glass-nav-active', targets: navRef.current },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Brand logo - Fixed Top Left with blend mode negation */}
      <div className="fixed top-8 left-6 md:left-12 z-[100] mix-blend-difference text-white font-bold text-2xl md:text-3xl tracking-tight leading-none uppercase pointer-events-auto">
        LeftClick
      </div>

      {/* Desktop Navbar pill */}
      <nav 
        ref={navRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[90] px-8 py-4 rounded-full transition-all duration-300 hidden lg:flex items-center gap-12 whitespace-nowrap text-off-white border border-transparent"
      >
        <div className="flex items-center gap-8 text-sm font-medium opacity-80">
          <a href="#features" className="hover:-translate-y-px transition-transform">Methods</a>
          <a href="#philosophy" className="hover:-translate-y-px transition-transform">Philosophy</a>
          <a href="#protocol" className="hover:-translate-y-px transition-transform">Protocol</a>
        </div>
        <button className="bg-signal-red text-white px-6 py-2.5 rounded-full text-sm font-bold magnetic-btn flex items-center gap-2">
          Book a Growth Mapping Call <ArrowUpRight size={16} />
        </button>
      </nav>

      {/* Mobile Burger Info */}
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-6 right-6 z-[90] p-4 rounded-full bg-paper/10 backdrop-blur-md border border-white/10 text-white mix-blend-difference hover:scale-105 transition-transform"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay Menu */}
      <div 
        className={`fixed inset-0 z-[110] transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {/* Blurred Backdrop */}
        <div 
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Drawer from left */}
        <div 
          className={`absolute top-0 left-0 w-[85vw] sm:w-[60vw] md:w-[50vw] h-[100dvh] bg-paper shadow-2xl transition-transform duration-500 flex flex-col pt-32 px-8 overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 p-2 text-black hover:opacity-50 transition-opacity"
          >
            <X size={32} />
          </button>
          
          <div className="flex flex-col gap-10 text-black text-[3rem] sm:text-[4rem] font-drama uppercase tracking-tighter mt-4">
            <a href="#features" onClick={() => setIsOpen(false)} className="hover:text-signal-red hover:translate-x-4 transition-all w-max">Methods</a>
            <a href="#philosophy" onClick={() => setIsOpen(false)} className="hover:text-signal-red hover:translate-x-4 transition-all w-max">Philosophy</a>
            <a href="#protocol" onClick={() => setIsOpen(false)} className="hover:text-signal-red hover:translate-x-4 transition-all w-max">Protocol</a>
          </div>

          <button className="mt-auto mb-12 bg-signal-red text-white px-6 py-5 flex-shrink-0 rounded-full text-lg lg:text-xl font-bold flex justify-center items-center gap-2 w-full active:scale-95 transition-transform select-none">
            Book Call <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(textRefs.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      });
      
      // Parallax image
      gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 lg:px-24">
      {/* Background with Brutalist imagery (Unsplash: concrete/industrial) */}
      <div 
        className="hero-bg absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center z-0"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop")' }}
      ></div>
      {/* Heavy primary-to-black gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/80 to-paper/20 mix-blend-multiply"></div>
      
      {/* Content: pushed to bottom-left third */}
      <div className="relative z-20 max-w-4xl text-off-white">
        <h1 className="flex flex-col gap-2 mb-8">
          <span ref={addToRefs} className="text-4xl md:text-6xl font-bold uppercase tracking-tight">
            Scale the
          </span>
          <span ref={addToRefs} className="text-7xl md:text-[9rem] lg:text-[11rem] leading-[0.85] font-drama italic text-signal-red">
            System.
          </span>
        </h1>
        <p ref={addToRefs} className="text-lg md:text-xl opacity-80 max-w-lg mb-10 font-data">
          We help high-growth B2B companies scale revenue using AI-personalized outbound methods with super low CAC.
        </p>
        <div ref={addToRefs}>
          <button className="bg-signal-red hover:bg-red-600 text-white px-8 py-4 rounded-full text-lg font-bold magnetic-btn flex items-center gap-3">
            Book a Growth Mapping Call <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax bg
      gsap.to('.phil-bg', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Text reveal
      gsap.from('.phil-word', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.phil-text-container',
          start: 'top 75%'
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={containerRef} className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-black text-paper overflow-hidden">
      <div 
        className="phil-bg absolute inset-0 w-full h-[120%] -top-[10%] opacity-20 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=2670&auto=format&fit=crop")' }}
      ></div>
      
      <div className="relative z-10 max-w-5xl mx-auto phil-text-container">
        <p className="text-xl md:text-3xl opacity-70 mb-12 font-data uppercase tracking-widest leading-relaxed">
          <span className="phil-word inline-block mr-2">Most</span>
          <span className="phil-word inline-block mr-2">B2B</span>
          <span className="phil-word inline-block mr-2">growth</span>
          <span className="phil-word inline-block mr-2">agencies</span>
          <span className="phil-word inline-block mr-2">focus</span>
          <span className="phil-word inline-block mr-2">on:</span><br/>
          <span className="phil-word inline-block text-white opacity-100">spamming</span>
          <span className="phil-word inline-block text-white opacity-100 ml-2">generic</span>
          <span className="phil-word inline-block text-white opacity-100 ml-2">templates.</span>
        </p>
        
        <p className="text-4xl md:text-7xl lg:text-[6rem] leading-[1.1] font-bold uppercase tracking-tight">
          <span className="phil-word inline-block mr-4">We</span>
          <span className="phil-word inline-block mr-4">focus</span>
          <span className="phil-word inline-block mr-4">on:</span><br/>
          <span className="phil-word inline-block font-drama italic text-signal-red capitalize mt-2">Precision Targeting.</span>
        </p>
      </div>
    </section>
  );
}

function Protocol() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${cards.length * 100}%`,
        pin: true,
        scrub: true,
        animation: gsap.timeline()
          .to(cards[0], { scale: 0.9, filter: "blur(20px)", opacity: 0.5, duration: 1 }, 0)
          .to(cards[1], { yPercent: -100, duration: 1 }, 0)
          
          .to(cards[1], { scale: 0.9, filter: "blur(20px)", opacity: 0.5, duration: 1 }, 1)
          .to(cards[2], { yPercent: -100, duration: 1 }, 1)
      });
      
      // Card 1 Animation: Rotating geometric motif
      gsap.to('.proto-anim-1', { rotation: 360, duration: 20, repeat: -1, ease: 'none' });
      
      // Card 2 Animation: Scanning laser
      gsap.to('.proto-anim-2', { y: 200, duration: 2, repeat: -1, yoyo: true, ease: 'power1.inOut' });
      
      // Card 3 Animation: Pulsing EKG
      gsap.to('.proto-anim-3', { strokeDashoffset: 0, duration: 2, repeat: -1, ease: 'power2.inOut' });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Data Acquisition",
      desc: "Identifying high-intent prospects through multi-layered signal scraping.",
      anim: (
        <svg viewBox="0 0 100 100" className="w-full h-full proto-anim-1 opacity-20">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="4" />
        </svg>
      )
    },
    {
      num: "02",
      title: "AI Matrix",
      desc: "Dynamically weaving personal relevance into every outbound touchpoint.",
      anim: (
        <div className="relative w-full h-full border border-current opacity-20 overflow-hidden text-current p-4 relative">
          <div className="grid grid-cols-5 gap-4 w-full h-full">
            {Array.from({length: 25}).map((_, i) => <div key={i} className="bg-current rounded-full w-2 h-2"></div>)}
          </div>
          <div className="proto-anim-2 absolute top-0 left-0 w-full h-[2px] bg-signal-red shadow-[0_0_10px_#E63B2E]"></div>
        </div>
      )
    },
    {
      num: "03",
      title: "Revenue Scaling",
      desc: "Optimizing conversion velocity to predictably multiply your pipeline.",
      anim: (
        <svg viewBox="0 0 200 100" className="w-full h-full opacity-40">
          <path 
            className="proto-anim-3 text-signal-red" 
            d="M0,50 L50,50 L60,20 L75,80 L85,50 L200,50" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinejoin="round"
            strokeDasharray="300"
            strokeDashoffset="300"
          />
        </svg>
      )
    }
  ];

  return (
    <section id="protocol" ref={containerRef} className="h-screen w-full relative overflow-hidden bg-black text-paper">
      {steps.map((step, i) => (
        <div 
          key={i} 
          className={`protocol-card absolute inset-0 w-full h-full flex flex-col justify-center items-center px-6 ${i === 0 ? 'bg-off-white text-black' : i === 1 ? 'bg-paper text-black' : 'bg-black text-paper border-t border-white/10'}`}
          style={{ top: i === 0 ? '0' : '100%' }}
        >
          <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <div className="font-data text-xl md:text-3xl text-signal-red mb-6 border-b border-current pb-4 inline-block">/// STEP {step.num}</div>
              <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-6">{step.title}</h2>
              <p className="text-xl md:text-2xl opacity-70 max-w-lg font-data">{step.desc}</p>
            </div>
            <div className="w-64 h-64 md:w-96 md:h-96 flex-shrink-0 relative">
              {step.anim}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function GetStarted() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-signal-red text-white">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-5xl md:text-7xl lg:text-[6rem] leading-none font-bold uppercase tracking-tight mb-8">
          Ready to Scale?
        </h2>
        <p className="text-xl md:text-2xl font-data opacity-90 mb-12 max-w-2xl">
          Transform your outbound engine and drastically reduce CAC with our AI-personalized protocols.
        </p>
        <button className="bg-black hover:bg-gray-900 text-white px-10 py-5 rounded-full text-xl font-bold magnetic-btn flex items-center gap-3 shadow-2xl">
          Book a Growth Mapping Call <ArrowUpRight size={24} />
        </button>
        <p className="mt-6 font-data text-sm opacity-70">+20 mins consult with our lead strategists.</p>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-off-white text-black font-heading selection:bg-signal-red selection:text-white pb-24">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <GetStarted />
      </main>
      
      <footer className="mt-24 pt-16 md:pt-32 pb-16 md:pb-24 px-6 md:px-12 lg:px-24 bg-off-white text-black border-t border-black/10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto w-full">
          
          <div className="flex flex-col xl:flex-row justify-between xl:items-end mb-24 md:mb-32 gap-16 xl:gap-8">
            {/* Left Box */}
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex flex-col md:flex-row items-start lg:items-center gap-2 md:gap-4 md:-ml-8 xl:-ml-12 mb-4">
                <span className="font-bold uppercase tracking-widest text-xs md:text-sm lg:rotate-[-90deg] hidden md:block">SCALE</span>
                <h2 className="text-6xl sm:text-[5.5rem] md:text-[7.5rem] lg:text-[8rem] xl:text-[8.5rem] font-bold leading-[0.85] tracking-tighter text-signal-red -ml-1 md:-ml-2 break-all sm:break-normal">
                  OUTBOUND
                </h2>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 md:ml-4 lg:ml-2">
                 <span className="font-bold uppercase tracking-widest text-xs md:text-sm hidden md:block">TAG</span>
                 <a href="#" className="font-bold uppercase tracking-tighter text-base sm:text-lg md:text-2xl lg:text-3xl hover:-translate-y-1 transition-transform flex items-center gap-2">
                   <span className="text-signal-red font-normal">(</span> BOOK A MAPPING CALL <span className="text-signal-red font-normal">)</span>
                 </a>
              </div>
            </div>

            {/* Right Box */}
            <div className="flex flex-col items-start xl:items-end xl:pl-8 flex-1 min-w-0 mt-4 xl:mt-0 xl:text-right">
              <h2 className="text-6xl sm:text-[5.5rem] md:text-[7.5rem] lg:text-[8rem] xl:text-[8.5rem] font-bold leading-[0.85] tracking-tighter text-black w-full break-all sm:break-normal">
                LEFTCLICK
              </h2>
              <h2 className="text-6xl sm:text-[5.5rem] md:text-[7.5rem] lg:text-[8rem] xl:text-[8.5rem] font-bold leading-[0.85] tracking-tighter text-signal-red mb-6 w-full break-all sm:break-normal">
                REVENUE
              </h2>
              <div className="flex flex-col md:flex-row items-start xl:justify-end xl:w-full gap-2 md:gap-4">
                 <a href="#" className="font-bold uppercase tracking-tighter text-base sm:text-lg md:text-2xl lg:text-3xl hover:-translate-y-1 transition-transform flex items-center gap-2">
                   <span className="text-signal-red font-normal">(</span> VIEW CASE STUDIES <span className="text-signal-red font-normal">)</span>
                 </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 font-data text-xs md:text-sm font-bold tracking-wider leading-loose border-t border-black/10 pt-16">
            <div className="flex flex-col space-y-3 md:space-y-4">
              <div className="text-signal-red mb-2 md:mb-4 uppercase text-xs md:text-sm flex gap-2 font-bold font-heading tracking-widest">
                <span className="font-normal">(</span> QUICK LINKS <span className="font-normal">)</span>
              </div>
              <a href="#" className="hover:text-signal-red transition-colors w-fit">ABOUT LEFTCLICK</a>
              <a href="#" className="hover:text-signal-red transition-colors w-fit">SERVICES</a>
              <a href="#" className="hover:text-signal-red transition-colors w-fit">CASE STUDIES</a>
              <a href="#" className="hover:text-signal-red transition-colors w-fit">ROI CALCULATOR</a>
              <a href="#" className="hover:text-signal-red transition-colors w-fit">INSIGHTS</a>
            </div>

            <div className="flex flex-col space-y-3 md:space-y-4">
              <div className="text-signal-red mb-2 md:mb-4 uppercase text-xs md:text-sm flex gap-2 font-bold font-heading tracking-widest">
                <span className="font-normal">(</span> CONNECT <span className="font-normal">)</span>
              </div>
              <a href="#" className="hover:text-signal-red transition-colors w-fit">CAREERS</a>
              <a href="#" className="hover:text-signal-red transition-colors w-fit">CONTACT US</a>
              <a href="#" className="hover:text-signal-red transition-colors w-fit">PARTNERSHIPS</a>
              <a href="#" className="hover:text-signal-red transition-colors w-fit">BOOK A CALL</a>
            </div>

            <div className="flex flex-col space-y-3 md:space-y-4">
              <div className="text-signal-red mb-2 md:mb-4 uppercase text-xs md:text-sm flex gap-2 font-bold font-heading tracking-widest">
                <span className="font-normal">(</span> SOCIALS <span className="font-normal">)</span>
              </div>
              <a href="#" className="hover:text-signal-red transition-colors w-fit">LINKEDIN</a>
              <a href="#" className="hover:text-signal-red transition-colors w-fit">X / TWITTER</a>
              <a href="#" className="hover:text-signal-red transition-colors w-fit">YOUTUBE</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

export default App;
