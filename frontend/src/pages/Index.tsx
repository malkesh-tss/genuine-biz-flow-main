import { useState } from "react";
import { ArrowRight, CheckCircle2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import tssLogo from "@/assets/tss-logo.png";
import PageLoader from "@/components/PageLoader";

function getLastWednesdayOfMonth(year: number, month: number) {
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const weekday = lastDayOfMonth.getDay();
  const daysToSubtract = (weekday + 4) % 7;
  return new Date(year, month + 1, 0 - daysToSubtract);
}

function getNextLastWednesday(reference = new Date()) {
  const year = reference.getFullYear();
  const month = reference.getMonth();
  const lastWednesdayThisMonth = getLastWednesdayOfMonth(year, month);
  if (reference <= lastWednesdayThisMonth) {
    return lastWednesdayThisMonth;
  }
  return getLastWednesdayOfMonth(year, month + 1);
}

function formatEventDate(date: Date) {
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  const suffix = (n: number) => {
    const remainder = n % 100;
    if (remainder >= 11 && remainder <= 13) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  return `${month} ${day}${suffix(day)}, ${year}`;
}

const eventDate = getNextLastWednesday();

const audienceItems = [
  "Founders selling services, software, or coaching",
  "Consultants and agencies who need qualified introductions",
  "Bootstrapped leaders looking for clients, partners, or advisors",
];

const outcomeItems = [
  "3 vetted conversations with active decision-makers",
  "At least 1 follow-up opportunity scheduled",
  "A clear next step to grow revenue this quarter",
];

const howItWorks = [
  {
    title: "Fast invite",
    description: "We limit this session to 30 founders so every intro stays relevant.",
  },
  {
    title: "Guided conversation flow",
    description: "Three rapid rounds keep the session moving and introductions focused.",
  },
  {
    title: "Actionable follow-up",
    description: "Leave with a clear next step, not a vague “let’s connect later.”",
  },
];

const testimonials = [
  {
    name: "Ava Chen",
    title: "Founder, ScaleWise",
    quote:
      "I met two clients and a strong referral partner in just 30 minutes. The structure kept every conversation purposeful.",
  },
  {
    name: "Jordan Patel",
    title: "CEO, BrightPath Agency",
    quote:
      "This session turned networking into actual business outcomes. I left with booked follow-up time before the event ended.",
  },
];

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const apiUrl = "https://api-tssd.vercel.app/api/services";
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        toast({
          title: "You're registered! 🎉",
          description: "Check your email for the Zoom meeting details.",
        });
      } else {
        toast({
          title: "Registration failed",
          description: data.message || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
        <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 bg-white/95 backdrop-blur-md shadow-sm">
          <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <img src={tssLogo} alt="The Scale Summit" className="h-10 w-auto object-contain" />
            <Button
              variant="gold"
              size="sm"
              className="text-xs sm:text-sm md:text-base px-3 sm:px-4 py-2"
              onClick={() => document.getElementById("hero-register")?.scrollIntoView({ behavior: "smooth" })}
            >
              Reserve a seat
            </Button>
          </div>
        </nav>

        <main className="pt-20">
          <section className="bg-slate-950 text-white">
            <div className="container mx-auto px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
              <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] items-start">
                  <div className="space-y-8">
                    <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                      <span className="font-semibold text-white">Next session</span>
                      <span>{formatEventDate(eventDate)}</span>
                      <span>12:00 PM PDT / 3:00 PM EST</span>
                    </div>

                    <div className="space-y-6">
                      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                        Speed networking for founders who want 3 real business conversations in 30 minutes.
                      </h1>
                      <p className="max-w-2xl text-lg leading-8 text-slate-300">
                        Join a guided online session for founders, consultants, agency owners, and service leaders who need actual connections, not more noise. Leave with follow-up opportunities and a clear next step for your business.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                        <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Who should join</p>
                        <ul className="mt-4 space-y-3 text-base text-slate-200">
                          {audienceItems.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                        <p className="text-xs uppercase tracking-[0.32em] text-slate-400">What you'll get</p>
                        <ul className="mt-4 space-y-3 text-base text-slate-200">
                          {outcomeItems.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <Button
                        variant="gold"
                        size="lg"
                        className="w-full sm:w-auto px-7 py-4 text-base font-semibold"
                        onClick={() => document.getElementById("hero-register")?.scrollIntoView({ behavior: "smooth" })}
                      >
                        Claim your free seat
                      </Button>
                      <Button
                        variant="secondary"
                        size="lg"
                        className="w-full sm:w-auto px-7 py-4 text-base font-semibold border border-white/10 text-slate-100"
                        onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                      >
                        See how it works
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                      <span className="font-semibold text-white">200+ founders registered</span>
                      <span>• 4.8/5 satisfaction</span>
                      <span>• 30 seats only</span>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-6 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.9)]" id="hero-register">
                    <div className="space-y-5">
                      <div>
                        <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Secure your spot</p>
                        <h2 className="mt-3 text-3xl font-semibold text-white">Register now</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-300">Only 30 founders accepted. Free to join. No pitch deck required.</p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-4">
                          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Format</p>
                          <p className="mt-2 text-lg font-semibold text-white">3x 8-minute conversations</p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-4">
                          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Duration</p>
                          <p className="mt-2 text-lg font-semibold text-white">30 minutes live</p>
                        </div>
                      </div>
                    </div>

                    {submitted ? (
                      <div className="mt-6 rounded-3xl border border-emerald-300/20 bg-emerald-500/10 p-6 text-center text-slate-50 shadow-lg">
                        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
                        <h3 className="mt-4 text-2xl font-semibold">You're registered</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-200">Check your inbox. We’ll send the Zoom link and session details shortly.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                          <label className="text-sm font-medium text-slate-200 block mb-2">Name *</label>
                          <input
                            type="text"
                            required
                            maxLength={100}
                            className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-200 block mb-2">Email *</label>
                          <input
                            type="email"
                            required
                            maxLength={255}
                            className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                            placeholder="you@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-200 block mb-2">Company / Role</label>
                          <input
                            type="text"
                            maxLength={150}
                            className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
                            placeholder="Agency, startup, consultancy"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          />
                        </div>
                        <Button
                          type="submit"
                          variant="gold"
                          size="lg"
                          className="w-full py-4 text-base font-semibold"
                          disabled={loading}
                        >
                          {loading ? "Saving my spot..." : "Reserve my seat"}
                        </Button>
                        <p className="text-xs text-slate-400 text-center">No spam. Zoom link and event details only.</p>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-slate-200/80 bg-white py-10 sm:py-14">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid gap-4 sm:grid-cols-4 text-center text-sm text-slate-700">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="font-semibold text-slate-900">30 participants only</p>
                  <p className="mt-2 text-slate-500">Focused, not crowded</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="font-semibold text-slate-900">200+ founders registered</p>
                  <p className="mt-2 text-slate-500">Immediate demand</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="font-semibold text-slate-900">4.8 / 5 satisfaction</p>
                  <p className="mt-2 text-slate-500">Quality conversations</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="font-semibold text-slate-900">Hosted by The Scale Summit</p>
                  <p className="mt-2 text-slate-500">Designed for founders</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-50 py-16 sm:py-20 lg:py-24" id="how-it-works">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl text-center">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500 mb-4">How this works</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">A fast, guided session built to convert conversations into action.</h2>
                <p className="mt-5 text-base sm:text-lg text-slate-600">We remove awkward pauses and keep each round focused on value, not small talk.</p>
              </div>

              <div className="mt-12 grid gap-6 lg:grid-cols-3">
                {howItWorks.map((item) => (
                  <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white text-lg font-semibold mb-5">✓</div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl text-center">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400 mb-4">Why this is different</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">We keep the session small, structured, and results-focused.</h2>
              </div>

              <div className="mt-12 grid gap-6 lg:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-8">
                  <h3 className="text-xl font-semibold text-white mb-3">Founder-only audience</h3>
                  <p className="text-slate-400">Every attendee is a decision-maker who is actively looking to connect.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-8">
                  <h3 className="text-xl font-semibold text-white mb-3">Guided introduction flow</h3>
                  <p className="text-slate-400">No open rooms, no aimless waiting. Every intro is timed and purposeful.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-8">
                  <h3 className="text-xl font-semibold text-white mb-3">Clear follow-up actions</h3>
                  <p className="text-slate-400">Each conversation ends with a tangible next step so you can act quickly.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl text-center">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500 mb-4">Attendee feedback</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">The session delivers conversations that matter.</h2>
              </div>

              <div className="mt-12 grid gap-6 lg:grid-cols-2">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.name} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white text-lg font-semibold">{testimonial.name[0]}</div>
                      <div>
                        <p className="font-semibold text-slate-900">{testimonial.name}</p>
                        <p className="text-sm text-slate-500">{testimonial.title}</p>
                      </div>
                    </div>
                    <p className="text-slate-600">“{testimonial.quote}”</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-slate-950 text-white py-16 sm:py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400 mb-4">Last chance</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Reserve your seat before this session sells out.</h2>
                <p className="mt-5 text-base sm:text-lg text-slate-400">Free ticket. One 30-minute session. One step closer to meaningful business growth.</p>
                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <Button
                    variant="gold"
                    size="lg"
                    className="px-8 py-4 text-base font-semibold"
                    onClick={() => document.getElementById("hero-register")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Reserve my free seat
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="px-8 py-4 text-base font-semibold text-slate-100 border border-white/10"
                    onClick={() => document.getElementById("hero-register")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Register now
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <footer className="border-t border-slate-200/80 bg-white py-6 sm:py-8 text-center text-sm text-slate-500">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <p>© {new Date().getFullYear()} The Scale Summit. All rights reserved.</p>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
};

export default Index;
