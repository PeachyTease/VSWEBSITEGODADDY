import { useState, useEffect, useRef } from "react";

const stats = [
  { value: 25000, label: "Children Helped", testId: "text-children-helped" },
  { value: 150, label: "Communities", testId: "text-communities" },
  { value: 12, label: "Countries", testId: "text-countries" },
  { value: 30, label: "Years of Impact", testId: "text-years" },
];

function AnimatedCounter({ 
  value, 
  duration = 2000,
  testId 
}: { 
  value: number; 
  duration?: number;
  testId: string;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const increment = value / (duration / 16);
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <div 
      ref={ref}
      className="text-4xl font-bold text-primary stats-counter"
      data-testid={testId}
    >
      {count.toLocaleString()}
    </div>
  );
}

export default function ImpactStats() {
  return (
    <section className="bg-muted py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <AnimatedCounter 
                value={stat.value} 
                testId={stat.testId}
              />
              <div className="text-muted-foreground mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
