import { useState } from "react";
import { Calendar, Clock, MapPin, MessageSquare, Users, Zap, Shield, ArrowRight, CheckCircle2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import tssLogo from "@/assets/tss-logo.png";
import eventBanner from "@/assets/event-banner.jfif";
import PageLoader from "@/components/PageLoader";

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
  { icon: Calendar, label: "When", value: "March 25th, 2026" },
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
    
    try {
      // Use relative URL for production, localhost:3001 for development
    
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
    }
  };

  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
        <div className="container mx-auto flex items-center justify-between py-3 sm:py-4 px-4 sm:px-6">
          <img src={tssLogo} alt="The Scale Summit" className="h-10 sm:h-12 lg:h-14" />
          <Button variant="gold" size="sm" className="text-xs sm:text-sm shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all duration-300 px-3 sm:px-4" onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}>
            Register Now
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[90svh] flex items-center gradient-navy overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <img src={eventBanner} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-primary/60 to-primary" />
        {/* Decorative Elements */}
        <div className="absolute top-20 left-2 sm:left-10 w-56 sm:w-72 h-56 sm:h-72 bg-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-2 sm:right-10 w-72 sm:w-96 h-72 sm:h-96 bg-gold/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[800px] h-[520px] sm:h-[800px] bg-gold/3 rounded-full blur-3xl" />
        
        <div className="container mx-auto relative z-10 px-3 sm:px-4 pt-20 sm:pt-24 pb-12 sm:pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 sm:px-5 py-1.5 sm:py-2 mb-6 sm:mb-10 animate-fade-up shadow-lg shadow-gold/10">
              <span className="h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full bg-gold animate-pulse shadow-gold" />
              <span className="text-xs sm:text-sm font-body font-medium text-gold-light">Free Virtual Networking Event</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-primary-foreground leading-tight mb-6 sm:mb-8 text-shadow-hero animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Real Connections.{" "}
              <span className="gradient-gold-text">Real Opportunities.</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-primary-foreground/80 font-body max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.25s" }}>
              30 minutes. Decision-makers from across the country. No small talk, no spammy pitches- just business owners having real conversations that lead to real growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center opacity-0 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <Button variant="gold" size="lg" className="text-base sm:text-lg px-6 sm:px-10 py-5 sm:py-7 shadow-2xl shadow-gold/30 hover:shadow-gold/50 transition-all duration-300 w-full sm:w-auto" onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}>
                Reserve Your Spot <ArrowRight className="ml-2 sm:ml-3 h-5 sm:h-6 w-5 sm:w-6" />
              </Button>
            </div>
            <div className="mt-10 sm:mt-16 grid grid-cols-2 gap-3 sm:gap-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.55s" }}>
              {details.map((d) => (
                <div key={d.label} className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-5 text-center hover:bg-white/10 transition-all duration-300">
                  <d.icon className="h-4 sm:h-6 w-4 sm:h-6 text-gold mx-auto mb-2 sm:mb-3" />
                  <p className="text-[10px] xs:text-xs text-primary-foreground/60 font-body uppercase tracking-wider">{d.label}</p>
                  <p className="text-xs sm:text-base font-semibold text-primary-foreground font-body mt-0.5 sm:mt-1">{d.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 sm:py-20 md:py-28 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 sm:h-32 bg-gradient-to-b from-navy-deep/5 to-transparent" />
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-accent mb-2 sm:mb-3 font-body">What to Expect</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
              Built for <span className="gradient-gold-text">Doers</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group relative bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-sm hover:shadow-2xl hover:shadow-gold/10 hover:border-gold/30 transition-all duration-500 opacity-0 animate-fade-up hover:-translate-y-2"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="h-12 sm:h-14 md:h-16 w-12 sm:w-14 md:w-16 rounded-xl sm:rounded-2xl bg-primary flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-gold/20">
                  <f.icon className="h-6 sm:h-7 md:h-8 w-6 sm:w-7 md:w-8 text-gold" />
                </div>
                <h3 className="text-lg sm:text-xl font-display font-bold text-foreground mb-2 sm:mb-3">{f.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground font-body leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 sm:py-20 md:py-24 gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-gold/5" />
        <div className="absolute top-0 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gold/10 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gold/10 rounded-full blur-2xl sm:blur-3xl" />
        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          <div className="max-w-2xl md:max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6 sm:mb-8">
              This Isn't Your Typical Networking Event
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/75 font-body leading-relaxed mb-6 sm:mb-10">
              Whether you're looking for partnerships, clients, or just smart conversations, this session is designed to create meaningful connections without wasting your time.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-primary-foreground/60 font-body leading-relaxed">
              There's no catch- just an open space and real conversations with people who are building, growing, and doing the work. Spots are limited to keep it focused and productive.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-20 sm:h-32 bg-gradient-to-b from-navy-deep/5 to-transparent" />
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-5xl lg:max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
              {/* Photo */}
              <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-br from-gold/30 to-primary/30 blur-2xl sm:blur-3xl" />
                  <img
                    src="/darrin.png"
                    alt="Darrin Guttman, Founder & CEO of The Scale Summit"
                    className="relative rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md object-cover aspect-[3/4] sm:aspect-[4/5] border-2 border-gold/30"
                  />
                  <div className="absolute -bottom-4 sm:-bottom-5 -right-3 sm:-right-5 bg-primary rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-xl border border-navy-mid">
                    <p className="text-lg sm:text-xl text-gold font-display font-bold">23+</p>
                    <p className="text-[10px] sm:text-xs text-primary-foreground/70 font-body">Years Helping SMBs</p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="order-1 lg:order-2">
                <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-accent mb-2 sm:mb-3 font-body">Meet the Founder</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-2">
                  Darrin Guttman
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gold font-display font-semibold mb-5 sm:mb-8">Founder & CEO, The Scale Summit</p>

                <div className="space-y-4 sm:space-y-6 text-muted-foreground font-body leading-relaxed text-sm sm:text-base md:text-lg">
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
                  <p className="italic">
                    "We're here to help you build something that lasts."
                  </p>
                </div>

                <div className="mt-6 sm:mt-8 md:mt-10 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-muted/50 border border-border shadow-lg">
                  <Quote className="h-6 sm:h-7 md:h-8 w-6 sm:w-7 md:w-8 text-gold mb-3 sm:mb-4" />
                  <p className="text-foreground font-body italic text-sm sm:text-lg md:text-xl leading-relaxed">
                    "If you're growing your business without deep pockets, but with big ambition- you're in the right place."
                  </p>
                </div>
              </div>
            </div>

            {/* Propel Sales Solutions */}
           
          </div>
        </div>
      </section>

      {/* Registration */}
      <section id="register" className="py-16 sm:py-20 md:py-28 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent" />
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-lg sm:max-w-xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-accent mb-2 sm:mb-3 font-body">Limited Spots</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground">
                Lock In Your <span className="gradient-gold-text">Spot</span>
              </h2>
            </div>

            {submitted ? (
              <div className="text-center py-10 sm:py-16 opacity-0 animate-fade-up" style={{ animationDelay: "0s" }}>
                <CheckCircle2 className="h-14 sm:h-16 md:h-20 w-14 sm:w-16 md:h-20 text-gold mx-auto mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2 sm:mb-3">You're In!</h3>
                <p className="text-sm sm:text-base text-muted-foreground font-body">We'll send you the Zoom link before the event. See you on March 25th!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border shadow-2xl shadow-gold/5 p-6 sm:p-8 md:p-10 space-y-5 sm:space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 sm:mb-2 font-body">Full Name *</label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    className="w-full rounded-lg border border-input bg-background px-3 sm:px-4 py-2.5 sm:py-3.5 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-sm sm:text-base"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 sm:mb-2 font-body">Email Address *</label>
                  <input
                    type="email"
                    required
                    maxLength={255}
                    className="w-full rounded-lg border border-input bg-background px-3 sm:px-4 py-2.5 sm:py-3.5 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-sm sm:text-base"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 sm:mb-2 font-body">Business / Company</label>
                  <input
                    type="text"
                    maxLength={150}
                    className="w-full rounded-lg border border-input bg-background px-3 sm:px-4 py-2.5 sm:py-3.5 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-sm sm:text-base"
                    placeholder="Your business name"
                    value={formData.business}
                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 sm:mb-2 font-body">What are you looking for?</label>
                  <select
                    className="w-full rounded-lg border border-input bg-background px-3 sm:px-4 py-2.5 sm:py-3.5 text-foreground font-body focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-sm sm:text-base"
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
                <Button type="submit" variant="gold" size="lg" className="w-full text-sm sm:text-base py-4 sm:py-6 shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all duration-300">
                  Register Now - It's Free <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                </Button>
                <p className="text-xs sm:text-sm text-center text-muted-foreground font-body">
                  No spam. We'll only send you event details.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 sm:py-12 border-t border-gray-200 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <img src={tssLogo} alt="The Scale Summit" className="h-8 sm:h-10 md:h-12 mx-auto mb-4 sm:mb-6" />
          <p className="text-xs sm:text-sm text-gray-500 font-body">
            © 2026 The Scale Summit. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Index;
