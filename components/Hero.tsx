"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Negócios, Inovação, Confiança",
      subtitle: "Conectando projetos inovadores a investidores estratégicos",
      description: "Impulsionando crescimento, rentabilidade e expansão global",
    },
    {
      title: "Expansão Global",
      subtitle: "Atuamos no mundo inteiro",
      description: "Pensamos grande e conectamos oportunidades internacionais",
    },
    {
      title: "Alto Potencial de Retorno",
      subtitle: "Projetos com impacto real",
      description: "Foco em rentabilidade e crescimento sustentável",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="home" className="pt-20 min-h-[85vh] flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#0F0F0F]"></div>
      
      {/* Slider */}
      <div className="relative w-full h-[85vh]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
              <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-bold mb-6 bg-gradient-to-r from-white via-[#1179a6] to-white bg-clip-text text-transparent uppercase tracking-tight">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-sans font-semibold text-gray-300 mb-4">
                {slide.subtitle}
              </p>
              <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
                {slide.description}
              </p>
            </div>
          </div>
        ))}

        {/* Slider Indicators */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-[#1179a6]"
                  : "w-2 bg-gray-600 hover:bg-gray-500"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-[#1179a6]" />
        </div>
      </div>
    </section>
  );
}

