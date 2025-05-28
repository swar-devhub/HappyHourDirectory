"use client";

import { motion } from "framer-motion";
import { MapPin, Search, Clock, Heart } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-10 w-10" />,
      title: "Search",
      description: "Enter your location or use your current location to find happy hours near you.",
    },
    {
      icon: <MapPin className="h-10 w-10" />,
      title: "Discover",
      description: "Browse through a variety of venues and filter by time, distance, and specials.",
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: "Plan",
      description: "View detailed happy hour schedules, including times and special offers.",
    },
    {
      icon: <Heart className="h-10 w-10" />,
      title: "Save",
      description: "Save your favorite spots for quick access on your next happy hour adventure.",
    },
  ];

  return (
    <section className="w-full bg-muted py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Finding the perfect happy hour has never been easier. Follow these simple steps to discover great deals near you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center bg-card p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-primary/10 rounded-full text-primary mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}