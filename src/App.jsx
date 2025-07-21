import { useState, useEffect } from 'react'
import { Mail, Star, Shield, Zap, TrendingUp, Globe, Award, Users, CheckCircle, ArrowRight, ExternalLink, Phone, Clock } from 'lucide-react'
import './App.css'

// Analytics and conversion tracking
const trackEvent = (eventName, properties = {}) => {
  // Google Analytics 4 event tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, properties)
  }
  
  // Custom analytics hook for A/B testing
  console.log('Event tracked:', eventName, properties)
}

// A/B Testing variants
const getVariant = (testName) => {
  const variants = {
    'hero_cta': ['claim_territory', 'secure_empire', 'get_premium'],
    'pricing_display': ['range', 'starting_at', 'from_price']
  }
  
  const savedVariant = localStorage.getItem(`ab_test_${testName}`)
  if (savedVariant) return savedVariant
  
  const testVariants = variants[testName] || ['default']
  const variant = testVariants[Math.floor(Math.random() * testVariants.length)]
  localStorage.setItem(`ab_test_${testName}`, variant)
  return variant
}

// Domain data based on value analysis
const domains = {
  premium: [
    { name: "starparty.ai", price: "$8K – $15K", category: "AI/Events" },
    { name: "wordcoin.ai", price: "$6K – $12K", category: "AI/Crypto" },
    { name: "yieldpunk.com", price: "$5K – $10K", category: "DeFi/Finance" },
    { name: "wallgraphics.art", price: "$3K – $8K", category: "Digital Art" },
    { name: "skullform.com", price: "$4K – $9K", category: "Design/Gaming" },
    { name: "heartwaresolutions.com", price: "$5K – $12K", category: "B2B Services" },
    { name: "reality.baby", price: "$6K – $15K", category: "AR/VR/Tech" }
  ],
  mid: [
    { name: "fridayify.com", price: "$1.5K – $4K", category: "Lifestyle/Productivity" },
    { name: "protonfield.com", price: "$1K – $3K", category: "Tech/Science" },
    { name: "honorism.com", price: "$800 – $2.5K", category: "Philosophy/Consulting" },
    { name: "localbrandpro.com", price: "$1.2K – $3.5K", category: "Marketing Services" },
    { name: "peopleorchestra.com", price: "$1K – $3K", category: "Community/Collaboration" },
    { name: "qualityautomationpartner.com", price: "$1.5K – $4K", category: "B2B Automation" },
    { name: "starpartyai.com", price: "$2K – $5K", category: "AI/Events" },
    { name: "startzoo.com", price: "$1K – $3K", category: "Startup/Business" }
  ],
  moderate: [
    { name: "agent-army.com", price: "$300 – $600", category: "AI/Automation" },
    { name: "spragent.com", price: "$250 – $500", category: "AI Agents" },
    { name: "spongeagent.com", price: "$200 – $450", category: "AI/Playful" },
    { name: "operator512.com", price: "$300 – $600", category: "Tech/Gaming" },
    { name: "gearaz.com", price: "$250 – $500", category: "Equipment/Gear" },
    { name: "otter-mate.com", price: "$200 – $450", category: "Social/Dating" },
    { name: "promptomato.com", price: "$300 – $600", category: "AI Tools" },
    { name: "pre-prompt.com", price: "$350 – $700", category: "AI/Productivity" },
    { name: "circleskull.com", price: "$200 – $450", category: "Gaming/Design" },
    { name: "firedawg.com", price: "$250 – $500", category: "Brandable/General" },
    { name: "assuranceaiadvisors.com", price: "$400 – $800", category: "AI Consulting" },
    { name: "strikingform.com", price: "$300 – $600", category: "Fitness/Design" }
  ]
}

// Lead Capture Modal Component
function LeadCaptureModal({ isOpen, onClose, domainName = '' }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Track conversion event
    trackEvent('lead_capture', {
      domain: domainName,
      email: email,
      source: 'modal'
    })
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      onClose()
      alert('Thank you! We\'ll be in touch within 2 hours.')
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
      <div className="glass-card-dark max-w-md w-full p-8 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl"
        >
          ×
        </button>
        
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              {domainName ? `Interested in ${domainName}?` : 'Get Premium Domain Info'}
            </h3>
            <p className="text-white/80">
              Get instant access to detailed domain analysis and exclusive pricing.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-gradient"
            >
              {isSubmitting ? 'Sending...' : 'Get Instant Access'}
            </button>
          </form>

          <div className="text-center text-sm text-white/60">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="w-4 h-4" />
              <span>Response within 2 hours</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>100% secure & confidential</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Urgency Banner Component
function UrgencyBanner() {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60) // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60

  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 text-center relative z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center space-x-4 text-sm font-semibold">
          <span>🔥 LIMITED TIME: Free domain analysis expires in</span>
          <div className="flex space-x-2">
            <span className="bg-white/20 px-2 py-1 rounded">{hours.toString().padStart(2, '0')}</span>
            <span>:</span>
            <span className="bg-white/20 px-2 py-1 rounded">{minutes.toString().padStart(2, '0')}</span>
            <span>:</span>
            <span className="bg-white/20 px-2 py-1 rounded">{seconds.toString().padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass-card-dark py-4' : 'py-6'
    }`} style={{zIndex: 9999}}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold gradient-text">
          dopedomains.com
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="text-white/80 hover:text-white transition-colors">Home</a>
          <a href="#domains" className="text-white/80 hover:text-white transition-colors">Domains</a>
          <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
          <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
        </div>
        <button className="btn-gradient-outline">
          Get Started
        </button>
      </div>
    </nav>
  )
}

// Hero Section Component
function HeroSection() {
  return (
    <section id="home" className="min-h-screen gradient-bg-hero relative overflow-hidden flex items-center pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl floating-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight">
                Secure Your
                <span className="gradient-text block">Digital Empire</span>
                with Premium Domains
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Transform your business with hand-picked, high-value domain names that instantly establish credibility, boost SEO rankings, and position you as the industry leader your customers expect.
              </p>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-blue-400" />
                <span className="text-white/90">Instant Authority</span>
              </div>
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-purple-400" />
                <span className="text-white/90">SEO Advantage</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="w-6 h-6 text-blue-400" />
                <span className="text-white/90">Marketing Boost</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-6 h-6 text-purple-400" />
                <span className="text-white/90">Premium Quality</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-gradient pulse-glow">
                Claim Your Digital Territory Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="btn-gradient-outline">
                Browse Premium Collection
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-white/80 text-sm">500+ Happy Customers</span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-white/80 text-sm ml-2">4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Illustration */}
          <div className="relative">
            <div className="glass-card p-8 shimmer">
              <img 
                src="/src/assets/hero-illustration.png" 
                alt="Premium Domain Marketplace" 
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Problem Agitation Section
function ProblemSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-slate-900 to-slate-800 relative z-10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            The Hidden Cost of <span className="gradient-text">Generic Domains</span>
          </h2>
          <p className="text-xl text-white/80 leading-relaxed">
            Every day you operate with a generic, unmemorable domain name, you're hemorrhaging potential customers, credibility, and revenue.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "Trust Erosion",
                description: "Customers judge your business within 0.05 seconds of seeing your domain"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "SEO Disadvantage", 
                description: "Generic domains fight an uphill battle for search engine visibility"
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Brand Confusion",
                description: "Customers can't remember your domain and end up at competitors"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Investor Perception",
                description: "Generic domains signal amateur operation to potential investors"
              }
            ].map((item, index) => (
              <div key={index} className="glass-card-dark p-8 text-center space-y-4 hover:scale-105 transition-transform">
                <div className="text-red-400 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Domain Card Component
function DomainCard({ domain, tier, onInquire }) {
  const tierColors = {
    premium: "from-cyan-400 to-blue-500",
    mid: "from-indigo-400 to-purple-500", 
    moderate: "from-emerald-400 to-teal-500"
  }

  const tierBorders = {
    premium: "border-cyan-400/50",
    mid: "border-purple-400/50",
    moderate: "border-emerald-400/50"
  }

  const handleInquire = () => {
    trackEvent('domain_inquiry_click', {
      domain: domain.name,
      tier: tier,
      price: domain.price
    })
    onInquire(domain.name)
  }

  return (
    <div className={`glass-card-dark p-6 hover:scale-105 transition-all duration-300 border-2 ${tierBorders[tier]} group`}>
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-white group-hover:gradient-text transition-all">
              {domain.name}
            </h3>
            <span className="text-sm text-white/60 bg-white/10 px-2 py-1 rounded-full">
              {domain.category}
            </span>
          </div>
          <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
        </div>
        
        <div className="space-y-3">
          <p className="text-lg text-white/80 font-semibold">{domain.price}</p>
          
          <button 
            onClick={handleInquire}
            className={`w-full bg-gradient-to-r ${tierColors[tier]} text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300`}
          >
            Inquire Now
          </button>
        </div>
      </div>
    </div>
  )
}

// Domains Section
function DomainsSection({ onInquire }) {
  return (
    <section id="domains" className="py-32 bg-slate-900 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Premium <span className="gradient-text">Domain Collection</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Hand-picked domains that don't just represent your business – they elevate it. Choose from our curated collection of premium digital real estate.
          </p>
        </div>

        {/* Premium Domains */}
        <div className="space-y-24">
          <div>
            <div className="flex items-center space-x-4 mb-8">
              <Award className="w-8 h-8 text-cyan-400" />
              <h3 className="text-3xl font-bold text-cyan-400">Premium Domains</h3>
              <span className="text-white/60">$3K - $15K</span>
            </div>
            <p className="text-white/80 mb-12 max-w-3xl">
              The crown jewels of our collection – domains that don't just represent your business, they elevate it. Perfect for industry leaders who demand the best.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {domains.premium.map((domain, index) => (
                <DomainCard key={index} domain={domain} tier="premium" onInquire={onInquire} />
              ))}
            </div>
          </div>

          {/* Mid-Tier Domains */}
          <div>
            <div className="flex items-center space-x-4 mb-8">
              <Star className="w-8 h-8 text-purple-400" />
              <h3 className="text-3xl font-bold text-purple-400">Mid-Tier Domains</h3>
              <span className="text-white/60">$800 - $5K</span>
            </div>
            <p className="text-white/80 mb-12 max-w-3xl">
              Smart investments for growing businesses. These domains offer excellent branding potential and strong market presence at a fraction of premium costs.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {domains.mid.map((domain, index) => (
                <DomainCard key={index} domain={domain} tier="mid" onInquire={onInquire} />
              ))}
            </div>
          </div>

          {/* Opportunity Domains */}
          <div>
            <div className="flex items-center space-x-4 mb-8">
              <Zap className="w-8 h-8 text-emerald-400" />
              <h3 className="text-3xl font-bold text-emerald-400">Opportunity Domains</h3>
              <span className="text-white/60">$200 - $800</span>
            </div>
            <p className="text-white/80 mb-12 max-w-3xl">
              Hidden gems for smart entrepreneurs. Perfect for new ventures, side projects, or businesses looking to expand their digital footprint.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {domains.moderate.map((domain, index) => (
                <DomainCard key={index} domain={domain} tier="moderate" onInquire={onInquire} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Why Trust <span className="gradient-text">Premium Domains</span>
            </h2>
            <p className="text-xl text-white/80 leading-relaxed">
              In 2019, I watched a brilliant entrepreneur lose a $2 million funding round because investors couldn't take his business seriously with a generic domain name. That moment changed everything.
            </p>
            <p className="text-white/70 leading-relaxed">
              I realized that in our digital-first world, your domain name isn't just your address – it's your first impression, your credibility signal, and often the deciding factor between success and failure.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "15+", label: "Years Experience" },
                { number: "500+", label: "Happy Customers" },
                { number: "100%", label: "Secure Transfers" },
                { number: "30-Day", label: "Money Back" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold gradient-text">{stat.number}</div>
                  <div className="text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="glass-card-dark p-8">
              <img 
                src="/src/assets/domain-network.png" 
                alt="Domain Network" 
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Ready to Secure Your <span className="gradient-text">Digital Future?</span>
          </h2>
          <p className="text-xl text-white/80">
            Your perfect domain is waiting, but premium digital real estate moves fast. Don't let your ideal domain slip away to a competitor.
          </p>

          <div className="glass-card-dark p-8 max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-6 h-6 text-blue-400" />
                <span className="text-xl text-white">Adam@thinkazoo.com</span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">What Happens Next:</h3>
                <div className="space-y-3 text-left">
                  {[
                    "Immediate Response: We'll respond within 2 hours",
                    "Domain Analysis: Detailed information about your chosen domain", 
                    "Secure Transfer: Professional escrow process protects your investment",
                    "Ongoing Support: We're here to help maximize your domain's value"
                  ].map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => window.location.href = 'mailto:Adam@thinkazoo.com?subject=Domain Inquiry'}
                className="btn-gradient w-full"
              >
                Start Your Domain Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-slate-950 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6">
          <div className="text-2xl font-bold gradient-text">dopedomains.com</div>
          <p className="text-white/60 max-w-2xl mx-auto">
            Transforming businesses with premium domain names that command authority, boost credibility, and drive results.
          </p>
          <div className="flex justify-center space-x-8">
            <a href="#home" className="text-white/60 hover:text-white transition-colors">Home</a>
            <a href="#domains" className="text-white/60 hover:text-white transition-colors">Domains</a>
            <a href="#about" className="text-white/60 hover:text-white transition-colors">About</a>
            <a href="#contact" className="text-white/60 hover:text-white transition-colors">Contact</a>
          </div>
          <div className="border-t border-white/10 pt-6">
            <p className="text-white/40 text-sm">
              © 2025 Premium Domains Marketplace. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDomain, setSelectedDomain] = useState('')

  const handleInquire = (domainName) => {
    setSelectedDomain(domainName)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedDomain('')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-['Inter']">
      <UrgencyBanner />
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <DomainsSection onInquire={handleInquire} />
      <AboutSection />
      <ContactSection />
      <Footer />
      
      <LeadCaptureModal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        domainName={selectedDomain}
      />
    </div>
  )
}

export default App

