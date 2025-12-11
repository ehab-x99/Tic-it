import Link from 'next/link'
import { Navigation } from '@/components/layout/Navigation'
import { CyberButton } from '@/components/ui/CyberButton'
import { CyberCard } from '@/components/ui/CyberCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { AnimatedTooltip } from '@/components/ui/AnimatedTooltip'

export default function HomePage() {
  const floatingElements = [
    { size: 'w-3 h-3', color: 'bg-cyber-pink', delay: '0s', position: 'top-20 left-10' },
    { size: 'w-6 h-6', color: 'bg-cyber-blue', delay: '0.5s', position: 'top-40 right-20' },
    { size: 'w-4 h-4', color: 'bg-cyber-green', delay: '1s', position: 'bottom-40 left-20' },
    { size: 'w-5 h-5', color: 'bg-cyber-purple', delay: '1.5s', position: 'bottom-20 right-10' },
    { size: 'w-2 h-2', color: 'bg-cyber-cyan', delay: '2s', position: 'top-1/3 left-1/4' },
    { size: 'w-4 h-4', color: 'bg-cyber-yellow', delay: '2.5s', position: 'top-1/4 right-1/3' },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 cyber-grid-bg opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-pink/10 via-transparent to-cyber-blue/10"></div>
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/20 via-transparent to-cyber-pink/20 animate-shimmer"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <ScrollReveal direction="scale" delay={200}>
            <h1 className="text-6xl md:text-8xl font-cyber font-black mb-6 text-neon animate-glow-pulse">
              TIC IT
            </h1>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={400}>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 font-futura">
              The Future of Concert Ticket Booking
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={600}>
            <p className="text-lg mb-12 text-gray-400 max-w-2xl mx-auto">
              Experience the future of event ticketing with our cyberpunk-inspired platform. 
              Secure your spot at the hottest concerts with cutting-edge technology.
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={800}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/events">
                <CyberButton 
                  variant="primary" 
                  size="large"
                  animated={true}
                  glowEffect={true}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  }
                  iconPosition="right"
                >
                  Browse Events
                </CyberButton>
              </Link>
              <Link href="/search">
                <CyberButton 
                  variant="outline" 
                  size="large"
                  animated={true}
                  pulse={true}
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                >
                  Search Tickets
                </CyberButton>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Enhanced Floating Elements */}
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute ${element.position} ${element.size} ${element.color} rounded-full animate-float gpu-accelerated`}
            style={{
              animationDelay: element.delay,
              animationDuration: '6s'
            }}
          >
            <div className="absolute inset-0 bg-current rounded-full animate-ping opacity-20"></div>
          </div>
        ))}
        
        {/* Animated lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent animate-shimmer"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-pink/50 to-transparent animate-shimmer" style={{ animationDelay: '1s' }}></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="down" delay={200}>
            <h2 className="text-4xl font-cyber font-bold text-center mb-16 text-neon">
              Features
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-cyber-blue" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Instant Booking',
                description: 'Lightning-fast ticket booking with real-time availability and secure payment processing.',
                iconBgClass: 'bg-cyber-blue/20',
                titleClass: 'text-cyber-blue',
                delay: 0
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-cyber-pink" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                ),
                title: 'Social Features',
                description: 'Connect with friends, share event experiences, and discover concerts through your network.',
                iconBgClass: 'bg-cyber-pink/20',
                titleClass: 'text-cyber-pink',
                delay: 200
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-cyber-green" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                ),
                title: 'Event Discovery',
                description: 'Find your next favorite artist or event with our intelligent recommendation engine.',
                iconBgClass: 'bg-cyber-green/20',
                titleClass: 'text-cyber-green',
                delay: 400
              }
            ].map((feature, index) => (
              <ScrollReveal key={index} direction="up" delay={feature.delay}>
                <CyberCard className="p-8 text-center group hover:scale-105 transition-all duration-300 gpu-accelerated">
                  <div className="w-16 h-16 mx-auto mb-6 bg-dark-800/50 rounded-full flex items-center justify-center group-hover:animate-bounce-gentle">
                    <div className={`p-3 ${feature.iconBgClass} rounded-full group-hover:scale-110 transition-all duration-300`}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className={`text-xl font-cyber font-semibold mb-4 ${feature.titleClass} group-hover:animate-glow-pulse`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 to-cyber-pink/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </CyberCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal direction="up" delay={200}>
            <CyberCard className="p-12 group hover:scale-105 transition-all duration-500 gpu-accelerated">
              <div className="relative">
                <h2 className="text-3xl font-cyber font-bold mb-6 text-neon group-hover:animate-glow-pulse">
                  Ready to Experience the Future?
                </h2>
                <p className="text-lg text-gray-300 mb-8 group-hover:text-gray-200 transition-colors duration-300">
                  Join thousands of music lovers who have already upgraded their concert experience with Tic It.
                </p>
                
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-pink/5 via-cyber-blue/5 to-cyber-purple/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <ScrollReveal direction="scale" delay={400}>
                  <Link href="/register">
                    <CyberButton 
                      variant="primary" 
                      size="large"
                      glowEffect={true}
                      pulse={true}
                      icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      }
                      iconPosition="right"
                    >
                      Get Started Today
                    </CyberButton>
                  </Link>
                </ScrollReveal>
              </div>
            </CyberCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-cyber-blue/20 bg-dark-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <ScrollReveal direction="up" delay={100}>
            <div className="mb-6">
              <h3 className="text-2xl font-cyber font-bold mb-4 text-neon animate-glow-pulse">TIC IT</h3>
              <p className="text-gray-400">The future of concert ticketing</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={300}>
            <div className="flex justify-center space-x-6 flex-wrap gap-4">
              {[
                { href: '/about', label: 'About' },
                { href: '/privacy', label: 'Privacy' },
                { href: '/terms', label: 'Terms' },
                { href: '/contact', label: 'Contact' }
              ].map((link, index) => (
                <AnimatedTooltip key={link.href} content={`Visit ${link.label}`} position="top">
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-cyber-blue transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyber-blue rounded-md px-2 py-1"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {link.label}
                  </Link>
                </AnimatedTooltip>
              ))}
            </div>
          </ScrollReveal>
          
          {/* Animated separator */}
          <ScrollReveal direction="scale" delay={500}>
            <div className="mt-8 pt-8 border-t border-cyber-blue/20">
              <div className="flex justify-center items-center space-x-2">
                <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-2 bg-cyber-pink rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                <div className="w-2 h-2 bg-cyber-purple rounded-full animate-pulse" style={{ animationDelay: '0.9s' }} />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </div>
  )
}
