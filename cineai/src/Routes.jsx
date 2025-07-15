import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import AiPoweredHomepage from "pages/ai-powered-homepage";
import IntelligentMovieCatalog from "pages/intelligent-movie-catalog";
import PersonalCinemaDashboard from "pages/personal-cinema-dashboard";
import SupportTrustCenter from "pages/support-trust-center";
import AiInsightsPreferences from "pages/ai-insights-preferences";
import ImmersiveBookingInterface from "pages/immersive-booking-interface";
import MovieAssistant from "pages/movie-assistant";
import Login from "pages/auth/Login";
import Signup from "pages/auth/Signup";
import PaymentInterface from "pages/payment/PaymentInterface";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<AiPoweredHomepage />} />
        <Route path="/ai-powered-homepage" element={<AiPoweredHomepage />} />
        <Route path="/intelligent-movie-catalog" element={<IntelligentMovieCatalog />} />
        <Route path="/personal-cinema-dashboard" element={<PersonalCinemaDashboard />} />
        <Route path="/support-trust-center" element={<SupportTrustCenter />} />
        <Route path="/ai-insights-preferences" element={<AiInsightsPreferences />} />
        <Route path="/immersive-booking-interface" element={<ImmersiveBookingInterface />} />
        <Route path="/movie-assistant" element={<MovieAssistant />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/payment" element={<PaymentInterface />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;