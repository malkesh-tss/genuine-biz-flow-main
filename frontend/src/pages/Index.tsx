import { useState } from "react";
import { Calendar, Clock, MapPin, MessageSquare, Users, Zap, Shield, ArrowRight, CheckCircle2, Quote, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import tssLogo from "@/assets/tss-logo.png";
import eventBanner from "@/assets/event-banner.jfif";
import PageLoader from "@/components/PageLoader";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const features = [
  {
    icon: Zap,
    title: "Fast-Paced Format",
    description: "We get right to the point. No fluff, no filler- just meaningful introductions and real conversations.",
  },
  {
    icon: Users,
    title: "High-Quality Connections",
    description: "Business owners, not browsers. Every attendee is a decision-maker ready to connect and collaborate.",
  },
  {
    icon: Shield,
    title: "Zero Cost",
    description: "Completely free. Just show up ready to connect with like-minded professionals.",
  },
];

const details = [
  { icon: Calendar, label: "When", value: "April 29th, 2026" },
  { icon: Clock, label: "Time", value: "12:00 PM PDT / 3:00 PM EST" },
  { icon: MapPin, label: "Where", value: "Online via Zoom" },
  { icon: MessageSquare, label: "Duration", value: "30 minutes" },
];

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    looking: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const apiUrl = 'https://api-tssd.vercel.app/api/services'
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        toast({ title: "You're registered! 🎉", description: "Check your email for the Zoom meeting details." });
      } else {
        toast({ title: "Registration failed", description: data.message || "Please try again.", variant: "destructive" });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({ title: "Registration failed", description: "Please try again later.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-background overflow-x-hidden">
        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
          <div className="container mx-auto flex items-center justify-between py-2.5 sm:py-3 md:py-4 px-4 sm:px-6 lg:px-8">
            <img src={tssLogo} alt="The Scale Summit" className="h-8 sm:h-10 md:h-12 lg:h-14 object-contain" />
            <Button 
              variant="gold" 
              size="sm" 
              className="text-xs sm:text-sm md:text-base shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all duration-300 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5" 
              onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
            >
              Register Now
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen sm:min-h-[90vh] md:min-h-screen flex items-center gradient-navy overflow-hidden pt-16 sm:pt-20 md:pt-24">
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-20">
            <img src={eventBanner} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-primary/60 to-primary" />
          
          {/* Decorative Elements - Responsive Sizing */}
          <div className="absolute top-10 sm:top-16 md:top-20 left-2 sm:left-6 md:left-10 w-40 sm:w-56 md:w-64 lg:w-72 h-40 sm:h-56 md:h-64 lg:h-72 bg-gold/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
          <div className="absolute bottom-10 sm:bottom-16 md:bottom-20 right-2 sm:right-6 md:right-10 w-48 sm:w-64 md:w-72 lg:w-96 h-48 sm:h-64 md:h-72 lg:h-96 bg-gold/5 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 md:w-[520px] lg:w-[800px] h-64 sm:h-96 md:h-[520px] lg:h-[800px] bg-gold/3 rounded-full blur-2xl sm:blur-3xl" />
          
          <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
            <div className="max-w-4xl lg:max-w-5xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 mb-6 sm:mb-8 md:mb-10 animate-fade-up shadow-lg shadow-gold/10">
                <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-gold animate-pulse shadow-gold" />
                <span className="text-xs sm:text-sm md:text-base font-body font-medium text-gold-light">Free Virtual Networking Event</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-primary-foreground leading-tight mb-4 sm:mb-6 md:mb-8 text-shadow-hero animate-fade-up" style={{ animationDelay: "0.1s" }}>
                Real Connections.{" "}
                <span className="gradient-gold-text block sm:inline">Real Opportunities.</span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/80 font-body max-w-2xl sm:max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 opacity-0 animate-fade-up leading-relaxed" style={{ animationDelay: "0.25s" }}>
                30 minutes. Decision-makers from across the country. No small talk, no spammy pitches— just business owners having real conversations that lead to real growth.
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center opacity-0 animate-fade-up mb-10 sm:mb-14 md:mb-16" style={{ animationDelay: "0.4s" }}>
                <Button 
                  variant="gold" 
                  size="lg" 
                  className="text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 shadow-2xl shadow-gold/30 hover:shadow-gold/50 transition-all duration-300 w-full sm:w-auto" 
                  onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Reserve Your Spot <ArrowRight className="ml-2 sm:ml-3 h-5 sm:h-6 w-5 sm:w-6" />
                </Button>
              </div>

              {/* Event Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 opacity-0 animate-fade-up max-w-5xl mx-auto" style={{ animationDelay: "0.55s" }}>
                {details.map((d) => (
                  <div key={d.label} className="glass-card rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 text-center hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                    <d.icon className="h-5 sm:h-6 md:h-8 w-5 sm:w-6 md:w-8 text-gold mx-auto mb-2 sm:mb-3 md:mb-4" />
                    <p className="text-[11px] xs:text-xs sm:text-sm md:text-base text-primary-foreground/60 font-body uppercase tracking-widest mb-1 sm:mb-2">{d.label}</p>
                    <p className="text-xs sm:text-sm md:text-lg font-semibold text-primary-foreground font-body">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect Section */}
        <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-16 sm:h-24 md:h-32 bg-gradient-to-b from-navy-deep/5 to-transparent" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-14 md:mb-20">
              <p className="text-xs sm:text-sm md:text-base font-semibold tracking-widest uppercase text-accent mb-2 sm:mb-4 font-body">What to Expect</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-foreground">
                Built for <span className="gradient-gold-text">Doers</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className="group relative bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-border shadow-sm hover:shadow-2xl hover:shadow-gold/10 hover:border-gold/30 transition-all duration-500 opacity-0 animate-fade-up hover:-translate-y-2"
                  style={{ animationDelay: `${0.1 * i}s` }}
                >
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="h-12 sm:h-14 md:h-16 w-12 sm:w-14 md:w-16 rounded-lg sm:rounded-xl md:rounded-2xl bg-primary flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-gold/20 relative z-10">
                    <f.icon className="h-6 sm:h-7 md:h-8 w-6 sm:w-7 md:w-8 text-gold" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-foreground mb-2 sm:mb-3 md:mb-4 relative z-10">{f.title}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-body leading-relaxed relative z-10">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 sm:py-16 md:py-24 lg:py-32 gradient-navy relative overflow-hidden">
          <div className="absolute inset-0 bg-gold/5" />
          <div className="absolute top-0 left-1/4 w-40 sm:w-56 md:w-80 lg:w-96 h-40 sm:h-56 md:h-80 lg:h-96 bg-gold/10 rounded-full blur-2xl sm:blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-40 sm:w-56 md:w-80 lg:w-96 h-40 sm:h-56 md:h-80 lg:h-96 bg-gold/10 rounded-full blur-2xl sm:blur-3xl" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl md:max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-primary-foreground mb-6 sm:mb-8 md:mb-10">
                This Isn't Your Typical Networking Event
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/75 font-body leading-relaxed mb-6 sm:mb-8 md:mb-10">
                Whether you're looking for partnerships, clients, or just smart conversations, this session is designed to create meaningful connections without wasting your time.
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-primary-foreground/60 font-body leading-relaxed">
                There's no catch— just an open space and real conversations with people who are building, growing, and doing the work. Spots are limited to keep it focused and productive.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-background overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-16 sm:h-24 md:h-32 bg-gradient-to-b from-navy-deep/5 to-transparent" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl lg:max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
                {/* Photo */}
                <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
                  <div className="relative w-full max-w-sm">
                    <div className="absolute -inset-3 sm:-inset-5 md:-inset-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gold/30 to-primary/30 blur-2xl sm:blur-3xl" />
                    <img
                      src="/darrin.png"
                      alt="Darrin Guttman, Founder & CEO of The Scale Summit"
                      className="relative rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl w-full object-cover aspect-[3/4] sm:aspect-[4/5] border-2 border-gold/30"
                    />
                    <div className="absolute -bottom-3 sm:-bottom-4 md:-bottom-5 -right-2 sm:-right-3 md:-right-5 bg-primary rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 shadow-xl border border-navy-mid">
                      <p className="text-lg sm:text-xl md:text-2xl text-gold font-display font-bold">23+</p>
                      <p className="text-xs sm:text-sm md:text-base text-primary-foreground/70 font-body">Years Helping SMBs</p>
                    </div>
                  </div>
                </div>

                {/* Bio Content */}
                <div className="order-1 lg:order-2">
                  <p className="text-xs sm:text-sm md:text-base font-semibold tracking-widest uppercase text-accent mb-3 sm:mb-4 font-body">Meet the Founder</p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-2 sm:mb-3">
                    Darrin Guttman
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gold font-display font-semibold mb-5 sm:mb-7 md:mb-8">Founder & CEO, The Scale Summit</p>

                  <div className="space-y-3 sm:space-y-4 md:space-y-5 text-muted-foreground font-body leading-relaxed text-sm sm:text-base md:text-lg">
                    <p>
                      After more than twenty years helping established companies scale, I realized the most overlooked group in business is early-stage founders bootstrapping growth alone.
                    </p>
                    <p>
                      No one was addressing their real needs or guiding them through what it takes to build a client acquisition plan that turns confusion into confidence.
                    </p>
                    <p>
                      That's why I started The Scale Summit.
                    </p>
                    <p>
                      To change the small business world. To give business owners a place built 100% for them. A place to learn, engage, and gain clarity, direction, and confidence for growth.
                    </p>
                    <p>
                      We're not here to play small.
                    </p>
                    <p className="italic text-primary-foreground/70">
                      "We're here to help you build something that lasts."
                    </p>
                  </div>

                  <div className="mt-6 sm:mt-8 md:mt-10 p-4 sm:p-5 md:p-8 rounded-lg sm:rounded-xl md:rounded-2xl bg-muted/50 border border-border shadow-lg">
                    <Quote className="h-6 sm:h-7 md:h-8 w-6 sm:w-7 md:w-8 text-gold mb-3 sm:mb-4" />
                    <p className="text-foreground font-body italic text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                      "If you're growing your business without deep pockets, but with big ambition— you're in the right place."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section id="register" className="py-12 sm:py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg sm:max-w-2xl mx-auto">
              <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                <p className="text-xs sm:text-sm md:text-base font-semibold tracking-widest uppercase text-accent mb-2 sm:mb-4 font-body">Limited Spots</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
                  Lock In Your <span className="gradient-gold-text block sm:inline">Spot</span>
                </h2>
              </div>

              {submitted ? (
                <div className="text-center py-12 sm:py-16 md:py-20 opacity-0 animate-fade-up" style={{ animationDelay: "0s" }}>
                  <CheckCircle2 className="h-16 sm:h-20 md:h-24 w-16 sm:w-20 md:w-24 text-gold mx-auto mb-4 sm:mb-6 md:mb-8" />
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-foreground mb-2 sm:mb-3 md:mb-4">You're In!</h3>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-body mb-4 sm:mb-6 md:mb-8">Thank you for registering for the event.</p>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-body">We'll send you the Zoom link before the event. See you on April 29th!</p>
                  
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card rounded-xl sm:rounded-2xl md:rounded-3xl border border-border shadow-2xl shadow-gold/5 p-5 sm:p-6 md:p-8 lg:p-10 space-y-4 sm:space-y-5 md:space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
                  
                  {/* Full Name Field */}
                  <div>
                    <label className="block text-xs sm:text-sm md:text-base font-medium text-foreground mb-1.5 sm:mb-2 md:mb-3 font-body">Full Name *</label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      className="w-full rounded-lg sm:rounded-xl border border-input bg-background px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3.5 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-sm sm:text-base md:text-lg"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-xs sm:text-sm md:text-base font-medium text-foreground mb-1.5 sm:mb-2 md:mb-3 font-body">Email Address *</label>
                    <input
                      type="email"
                      required
                      maxLength={255}
                      className="w-full rounded-lg sm:rounded-xl border border-input bg-background px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3.5 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-sm sm:text-base md:text-lg"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  {/* Business Field */}
                  <div>
                    <label className="block text-xs sm:text-sm md:text-base font-medium text-foreground mb-1.5 sm:mb-2 md:mb-3 font-body">Business / Company</label>
                    <input
                      type="text"
                      maxLength={150}
                      className="w-full rounded-lg sm:rounded-xl border border-input bg-background px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3.5 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-sm sm:text-base md:text-lg"
                      placeholder="Your business name"
                      value={formData.business}
                      onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                    />
                  </div>

                  {/* Looking For Field */}
                  <div>
                    <label className="block text-xs sm:text-sm md:text-base font-medium text-foreground mb-1.5 sm:mb-2 md:mb-3 font-body">What are you looking for?</label>
                    <select
                      className="w-full rounded-lg sm:rounded-xl border border-input bg-background px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3.5 text-foreground font-body focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-sm sm:text-base md:text-lg appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        paddingRight: '2.5rem'
                      }}
                      value={formData.looking}
                      onChange={(e) => setFormData({ ...formData, looking: e.target.value })}
                    >
                      <option value="">Select one...</option>
                      <option value="partnerships">Partnerships</option>
                      <option value="clients">New Clients</option>
                      <option value="networking">General Networking</option>
                      <option value="mentorship">Mentorship</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    variant="gold" 
                    size="lg" 
                    disabled={loading} 
                    className="w-full text-sm sm:text-base md:text-lg py-3 sm:py-4 md:py-5 lg:py-6 shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all duration-300 mt-2 md:mt-4"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 sm:h-5 w-4 sm:w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Registering...
                      </>
                    ) : (
                      <>Register Now - It's Free <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" /></>
                    )}
                  </Button>

                  <p className="text-xs sm:text-sm md:text-base text-center text-muted-foreground font-body">
                    No spam. We'll only send you event details.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 sm:py-8 md:py-10 lg:py-12 bg-card border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="flex flex-col items-center gap-4 sm:gap-6"
            >
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6">
                <a
                  href="https://www.linkedin.com/in/darrin-guttman-propel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm md:text-base"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  <span className="font-body">LinkedIn</span>
                </a>
                <span className="text-muted-foreground/40 hidden sm:inline">|</span>
                <a
                  href="mailto:max@thescalesummit.com?subject=Inquiry"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm md:text-base"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  <span className="font-body">Contact Us</span>
                </a>
              </motion.div>

              <motion.p variants={fadeUp} className="text-muted-foreground/60 font-body text-xs sm:text-sm text-center">
                © {new Date().getFullYear()} The Scale Summit. All rights reserved.
              </motion.p>
            </motion.div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;