import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { gsap } from 'gsap';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import { useFadeIn, useSlideIn } from '../../hooks/useGSAP';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const containerRef = useFadeIn(0, 0.8);
  const formRef = useSlideIn('up', 0.3, 0.8);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch
  } = useForm();

  const watchedEmail = watch('email');

  useEffect(() => {
    // Error message animation
    if (errors?.email || errors?.password) {
      const errorElements = document.querySelectorAll('.error-message');
      gsap.fromTo(errorElements, 
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [errors]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data in localStorage
      localStorage.setItem('cineai_user', JSON.stringify({
        email: data.email,
        loginTime: new Date().toISOString()
      }));
      
      // Success animation
      gsap.to(formRef.current, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(formRef.current, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      });
      
      setTimeout(() => {
        navigate('/ai-powered-homepage');
      }, 500);
      
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In - CineAI</title>
        <meta name="description" content="Sign in to your CineAI account for personalized movie recommendations" />
      </Helmet>

      <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/ai-powered-homepage" className="inline-flex items-center space-x-2">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <Icon name="Film" size={24} color="var(--color-accent-foreground)" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white font-accent">CineAI</h1>
                <p className="text-sm text-white/70">Intelligent Cinema</p>
              </div>
            </Link>
          </div>

          {/* Form */}
          <div ref={formRef} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-cinematic border border-white/20">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
              <p className="text-white/70">Sign in to discover your next favorite movie</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  type="email"
                  placeholder="Email address"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && (
                  <p className="error-message text-red-400 text-sm mt-1 flex items-center space-x-1">
                    <Icon name="AlertCircle" size={14} />
                    <span>{errors.email.message}</span>
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 pr-12"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
                  </button>
                </div>
                {errors.password && (
                  <p className="error-message text-red-400 text-sm mt-1 flex items-center space-x-1">
                    <Icon name="AlertCircle" size={14} />
                    <span>{errors.password.message}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-accent bg-white/10 border-white/20 rounded focus:ring-accent"
                    {...register('rememberMe')}
                  />
                  <span className="text-white/70 text-sm">Remember me</span>
                </label>
                <Link to="/auth/forgot-password" className="text-accent text-sm hover:text-accent/80 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                fullWidth
                size="lg"
                loading={isLoading}
                iconName="LogIn"
                iconPosition="left"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Sign In
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="px-3 text-white/50 text-sm">or</span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <Button
                variant="outline"
                fullWidth
                iconName="Chrome"
                iconPosition="left"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Continue with Google
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="Facebook"
                iconPosition="left"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Continue with Facebook
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-white/70">
                Don't have an account?{' '}
                <Link to="/auth/signup" className="text-accent hover:text-accent/80 transition-colors font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;