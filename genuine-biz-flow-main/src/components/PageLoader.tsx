import { useState, useEffect } from "react";
import { Users } from "lucide-react";

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center gradient-navy">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/10 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/3 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Connecting Dots Animation */}
      <div className="relative">
        {/* Central Icon */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-gold/20 animate-ping" style={{ animationDuration: "2s" }} />
            <div className="absolute -inset-4 rounded-full border border-gold/30 animate-ping" style={{ animationDuration: "3s", animationDelay: "0.5s" }} />
            
            {/* Main Circle */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-2xl shadow-gold/30 animate-bounce" style={{ animationDuration: "1.5s" }}>
              <Users className="h-12 w-12 text-primary animate-pulse" />
            </div>
          </div>

          {/* Loading Text */}
          <div className="mt-8 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>

          <h2 className="mt-6 text-2xl font-display font-bold text-primary-foreground tracking-wide">
            The Scale Summit
          </h2>
          <p className="mt-2 text-sm text-gold font-body animate-pulse">
            Building Connections...
          </p>
        </div>

        {/* Floating Network Nodes */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-gold"
              style={{
                top: `${50 + 35 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                left: `${50 + 35 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                animation: `float 2s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
                boxShadow: "0 0 10px hsl(35, 75%, 53%)",
              }}
            />
          ))}
        </div>

        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ width: '400px', height: '400px' }}>
          {[...Array(6)].map((_, i) => {
            const angle1 = (i * 60 * Math.PI) / 180;
            const angle2 = ((i + 1) * 60 * Math.PI) / 180;
            const x1 = 200 + 140 * Math.cos(angle1);
            const y1 = 200 + 140 * Math.sin(angle1);
            const x2 = 200 + 140 * Math.cos(angle2);
            const y2 = 200 + 140 * Math.sin(angle2);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="hsl(35, 75%, 53%)"
                strokeWidth="1"
                strokeOpacity="0.2"
                className="animate-pulse"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default PageLoader;
