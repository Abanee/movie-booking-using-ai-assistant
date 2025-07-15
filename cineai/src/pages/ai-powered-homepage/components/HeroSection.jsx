import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentHero, setCurrentHero] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const heroMovies = [
    {
      id: 1,
      title: "Dune: Part Two",
      tagline: "The universe awaits",
      description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop",
      rating: 8.7,
      genre: "Sci-Fi Epic",
      runtime: "166 min",
      releaseYear: "2024"
    },
    {
      id: 2,
      title: "Oppenheimer",
      tagline: "The world forever changes",
      description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      backdrop: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?w=1920&h=1080&fit=crop",
      rating: 8.4,
      genre: "Historical Drama",
      runtime: "180 min",
      releaseYear: "2023"
    },
    {
      id: 3,
      title: "Spider-Man: Across the Spider-Verse",
      tagline: "It\'s how you wear the mask",
      description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People.",
      backdrop: "https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg?w=1920&h=1080&fit=crop",
      rating: 8.9,
      genre: "Animated Adventure",
      runtime: "140 min",
      releaseYear: "2023"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroMovies.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [heroMovies.length]);

  const handleQuickBook = async () => {
    setIsLoading(true);
    // Simulate booking process
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const currentMovie = heroMovies[currentHero];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={currentMovie.backdrop}
          alt={currentMovie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Genre Badge */}
            <div className="inline-flex items-center space-x-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-2 mb-6">
              <Icon name="Sparkles" size={16} color="var(--color-accent)" />
              <span className="text-accent text-sm font-medium">{currentMovie.genre}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 font-accent">
              {currentMovie.title}
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl text-accent mb-6 font-medium">
              {currentMovie.tagline}
            </p>

            {/* Movie Info */}
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={20} color="var(--color-accent)" />
                <span className="text-white font-semibold">{currentMovie.rating}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} color="var(--color-muted-foreground)" />
                <span className="text-muted-foreground">{currentMovie.runtime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={20} color="var(--color-muted-foreground)" />
                <span className="text-muted-foreground">{currentMovie.releaseYear}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-xl">
              {currentMovie.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="Ticket"
                iconPosition="left"
                loading={isLoading}
                onClick={handleQuickBook}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Book Now
              </Button>
              
              <Link to="/intelligent-movie-catalog">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Play"
                  iconPosition="left"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Watch Trailer
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="lg"
                iconName="Plus"
                iconPosition="left"
                className="text-white hover:bg-white/10"
              >
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {heroMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHero(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentHero
                  ? 'bg-accent scale-125' :'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="flex flex-col items-center space-y-2 text-white/60">
          <span className="text-sm font-medium">Discover More</span>
          <div className="w-px h-8 bg-white/40"></div>
          <Icon name="ChevronDown" size={20} className="animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;