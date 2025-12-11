import Link from 'next/link'
import { Navigation } from '@/components/layout/Navigation'
import { CyberButton } from '@/components/ui/CyberButton'
import { CyberCard } from '@/components/ui/CyberCard'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 cyber-grid-bg opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-pink/10 via-transparent to-cyber-blue/10"></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-cyber font-black mb-6 text-neon animate-glow">
            TIC IT
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 font-futura">
            The Future of Concert Ticket Booking
          </p>
          <p className="text-lg mb-12 text-gray-400 max-w-2xl mx-auto">
            Experience the future of event ticketing with our cyberpunk-inspired platform. 
            Secure your spot at the hottest concerts with cutting-edge technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/events">
              <CyberButton variant="primary" size="large">
                Browse Events
              </CyberButton>
            </Link>
            <Link href="/search">
              <CyberButton variant="secondary" size="large">
                Search Tickets
              </CyberButton>
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-cyber-pink rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-cyber-blue rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-cyber-green rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-cyber-purple rounded-full animate-pulse delay-500"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-cyber font-bold text-center mb-16 text-neon">
            Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <CyberCard className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-cyber-blue/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-cyber-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-cyber font-semibold mb-4 text-cyber-blue">
                Instant Booking
              </h3>
              <p className="text-gray-400">
                Lightning-fast ticket booking with real-time availability and secure payment processing.
              </p>
            </CyberCard>

            <CyberCard className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-cyber-pink/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-cyber-pink" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-cyber font-semibold mb-4 text-cyber-pink">
                Social Features
              </h3>
              <p className="text-gray-400">
                Connect with friends, share event experiences, and discover concerts through your network.
              </p>
            </CyberCard>

            <CyberCard className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-cyber-green/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-cyber-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-cyber font-semibold mb-4 text-cyber-green">
                Event Discovery
              </h3>
              <p className="text-gray-400">
                Find your next favorite artist or event with our intelligent recommendation engine.
              </p>
            </CyberCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <CyberCard className="p-12">
            <h2 className="text-3xl font-cyber font-bold mb-6 text-neon">
              Ready to Experience the Future?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join thousands of music lovers who have already upgraded their concert experience with Tic It.
            </p>
            <Link href="/register">
              <CyberButton variant="primary" size="large">
                Get Started Today
              </CyberButton>
            </Link>
          </CyberCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-cyber-blue/20">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-cyber font-bold mb-4 text-neon">TIC IT</h3>
          <p className="text-gray-400 mb-6">The future of concert ticketing</p>
          <div className="flex justify-center space-x-6">
            <Link href="/about" className="text-gray-400 hover:text-cyber-blue transition-colors">
              About
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-cyber-blue transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-cyber-blue transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-cyber-blue transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
