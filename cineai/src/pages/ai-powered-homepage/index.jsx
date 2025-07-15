import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import AIRecommendations from './components/AIRecommendations';
import MoodDiscovery from './components/MoodDiscovery';
import SocialProof from './components/SocialProof';
import QuickActions from './components/QuickActions';

const AIHomepage = () => {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleSmoothScroll = (e) => {
      if (e.target.hash) {
        e.preventDefault();
        const target = document.querySelector(e.target.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>CineAI - Your Perfect Movie Night, Intelligently Curated</title>
        <meta 
          name="description" 
          content="Discover your next favorite movie with AI-powered recommendations. Book tickets seamlessly at CineAI - where artificial intelligence meets cinema passion." 
        />
        <meta name="keywords" content="movie booking, AI recommendations, cinema tickets, movie discovery, personalized movies" />
        <meta property="og:title" content="CineAI - AI-Powered Movie Discovery & Booking" />
        <meta property="og:description" content="Find the perfect movie for your mood with intelligent recommendations and seamless booking." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/ai-powered-homepage" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection />

          {/* AI Recommendations */}
          <AIRecommendations />

          {/* Mood Discovery */}
          <MoodDiscovery />

          {/* Quick Actions */}
          <QuickActions />

          {/* Social Proof */}
          <SocialProof />
        </main>

        {/* Footer */}
        <footer className="bg-primary text-primary-foreground py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-accent-foreground font-bold">C</span>
                  </div>
                  <span className="text-xl font-bold font-accent">CineAI</span>
                </div>
                <p className="text-sm text-primary-foreground/80 mb-4">
                  Your perfect movie night, intelligently curated through the power of artificial intelligence.
                </p>
                <div className="flex space-x-3">
                  <button className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                    <span className="text-xs">f</span>
                  </button>
                  <button className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                    <span className="text-xs">t</span>
                  </button>
                  <button className="w-8 h-8 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                    <span className="text-xs">in</span>
                  </button>
                </div>
              </div>

              {/* Movies */}
              <div>
                <h4 className="font-semibold mb-4">Movies</h4>
                <ul className="space-y-2 text-sm text-primary-foreground/80">
                  <li><a href="/intelligent-movie-catalog" className="hover:text-primary-foreground transition-colors">Now Playing</a></li>
                  <li><a href="/intelligent-movie-catalog" className="hover:text-primary-foreground transition-colors">Coming Soon</a></li>
                  <li><a href="/intelligent-movie-catalog" className="hover:text-primary-foreground transition-colors">Top Rated</a></li>
                  <li><a href="/ai-insights-preferences" className="hover:text-primary-foreground transition-colors">AI Recommendations</a></li>
                </ul>
              </div>

              {/* Theaters */}
              <div>
                <h4 className="font-semibold mb-4">Theaters</h4>
                <ul className="space-y-2 text-sm text-primary-foreground/80">
                  <li><a href="/intelligent-movie-catalog" className="hover:text-primary-foreground transition-colors">Find Theaters</a></li>
                  <li><a href="/immersive-booking-interface" className="hover:text-primary-foreground transition-colors">Premium Experience</a></li>
                  <li><a href="/immersive-booking-interface" className="hover:text-primary-foreground transition-colors">IMAX & Dolby</a></li>
                  <li><a href="/intelligent-movie-catalog" className="hover:text-primary-foreground transition-colors">Special Events</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-primary-foreground/80">
                  <li><a href="/support-trust-center" className="hover:text-primary-foreground transition-colors">Help Center</a></li>
                  <li><a href="/personal-cinema-dashboard" className="hover:text-primary-foreground transition-colors">My Account</a></li>
                  <li><a href="/support-trust-center" className="hover:text-primary-foreground transition-colors">Contact Us</a></li>
                  <li><a href="/support-trust-center" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-primary-foreground/60">
                © {new Date().getFullYear()} CineAI. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="text-xs text-primary-foreground/60">Powered by AI</span>
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AIHomepage;