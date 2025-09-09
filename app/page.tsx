"use client"

import { useState, useEffect, useRef, memo } from "react"

declare global {
  interface Window {
    __AWEBER_FORM_CACHE__?: Record<string, string>
  }
}
const App = () => {

  const setCurrentPage =(param:any)=>{
    let pageUrl=param;
    if(param=='companies'){
      pageUrl='/webinar-internal-venture-labs';
    }
    if(param=='intrapreneurs'){
      pageUrl='/webinar-ultra-wealth';
    }
    if(param=='spinoffs'){
      pageUrl='/AI-powered-businesses-for-sale';
    }
    if(param=='home'){
      pageUrl='/';
    }

    window.history.pushState({}, "", pageUrl)
    setCurrentPageNow(param);
  }
  const [currentPage, setCurrentPageNow] = useState("home")
  // const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState({})
const scrollYRef = useRef(0)
  // useEffect(() => {
  //   const handleScroll = () => setScrollY(window.scrollY)
  //   window.addEventListener("scroll", handleScroll)
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [])

const AWEBER_SRC = {
  companies: "https://forms.aweber.com/form/16/675776216.js",
  intrapreneurs: "https://forms.aweber.com/form/92/536220692.js",
}
  useEffect(() => {
    const handleScroll = () => { scrollYRef.current = window.scrollY }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  useEffect(() => {
    const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        setIsVisible((prev) => ({
          ...prev,
          //@ts-ignore
          [entry.target.id || entry.target.dataset.animate]: entry.isIntersecting,
        }))
      })
    },
    { threshold: 0.1 }
  )

    const elements = document.querySelectorAll("[data-animate]")
  elements.forEach((el) => {
    // 🚫 Skip Aweber forms
    if (
      el.classList.contains("AW-Form-675776216") ||
      el.classList.contains("AW-Form-536220692")
    ) {
      return
    }
    observer.observe(el)
  })

  return () => observer.disconnect()
}, [currentPage])

  //@ts-ignore
  const ShimmerButton = ({ children, className = "", onClick, variant = "primary" }) => {
    const baseClasses =
      variant === "primary"
        ? "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-[0_0_30px_rgba(59,130,246,0.5)]"
        : "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-blue-900 shadow-[0_0_30px_rgba(251,191,36,0.5)]"

    return (
      <button
        onClick={onClick}
        className={`
          relative overflow-hidden px-8 py-4 rounded-2xl font-bold text-lg
          transition-all duration-500 transform hover:scale-110 hover:rotate-1
          hover:shadow-[0_0_50px_rgba(59,130,246,0.8)]
          ${baseClasses}
          before:absolute before:top-0 before:-left-full before:w-full before:h-full
          before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent
          before:transition-all before:duration-700 before:transform before:skew-x-12
          hover:before:left-full hover:before:animate-pulse
          backdrop-blur-sm border border-white/20
          ${className}
        `}
      >
        <span className="relative z-10 drop-shadow-lg">{children}</span>
      </button>
    )
  }

  const Header = () => {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-blue-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 pt-4">
            <button
              onClick={() => setCurrentPage("home")}
              className="flex-shrink-0 hover:opacity-80 transition-all duration-300 transform hover:scale-105"
            >
              <img src="/spin-accelerator-logo.png" alt="Spin Accelerator" className="h-12 w-auto drop-shadow-lg" />
            </button>

            <nav className="flex space-x-8">
              {[
                { key: "home", label: "Home" },
                { key: "companies", label: "For Companies" },
                { key: "intrapreneurs", label: "For Intrapreneurs" },
                { key: "spinoffs", label: "Businesses for Sale" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setCurrentPage(item.key)}
                  className={`px-4 py-2 rounded-xl text-lg font-normal transition-all duration-300 transform hover:scale-105 ${
                    currentPage === item.key
                      ? "text-white bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>
    )
  }

  //@ts-ignore
  const InnovateAutomateProfitSection = ({ page }) => {
    const getContextualContent = () => {
      switch (page) {
        case "companies":
          return {
            innovate: "Transform your organization with cutting-edge innovation labs",
            automate: "Streamline processes and accelerate time-to-market",
            profit: "Generate measurable ROI through strategic innovation",
          }
        case "intrapreneurs":
          return {
            innovate: "Turn your creative crisis into breakthrough opportunities",
            automate: "Leverage AI and systems to scale your internal ventures",
            profit: "Build ultra-wealth while maintaining job security",
          }
        case "spinoffs":
          return {
            innovate: "Acquire proven business models with validated market fit",
            automate: "Inherit established systems and operational frameworks",
            profit: "Generate immediate returns from day-one revenue streams",
          }
        default:
          return {
            innovate: "Revolutionary methodologies that transform industries",
            automate: "Systematic approaches that scale exponentially",
            profit: "Sustainable wealth creation through strategic innovation",
          }
      }
    }

    const content = getContextualContent()

    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-0">
            {/* INNOVATE - White section */}
            <div className="bg-white text-black p-12 flex items-center justify-between border-b-2 border-black">
              <div>
                <h2 className="text-8xl md:text-9xl font-black mb-4">INNOVATE</h2>
                <p className="text-xl md:text-2xl font-medium max-w-2xl">{content.innovate}</p>
              </div>
              <div className="text-6xl font-black">→</div>
            </div>

            {/* AUTOMATE - Blue section */}
            <div className="bg-blue-600 text-white p-12 flex items-center justify-between border-b-2 border-black">
              <div>
                <h2 className="text-8xl md:text-9xl font-black mb-4">AUTOMATE</h2>
                <p className="text-xl md:text-2xl font-medium max-w-2xl">{content.automate}</p>
              </div>
              <div className="text-6xl font-black">→</div>
            </div>

            {/* PROFIT - Yellow section */}
            <div className="bg-yellow-400 text-black p-12 flex items-center justify-between">
              <div>
                <h2 className="text-8xl md:text-9xl font-black mb-4">PROFIT</h2>
                <p className="text-xl md:text-2xl font-medium max-w-2xl">{content.profit}</p>
              </div>
              <div className="text-6xl font-black">→</div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const Footer = () => {
    return (
      <footer className="bg-black text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">© Spin Accelerator, 2025</p>
        </div>
      </footer>
    )
  } 

  //@ts-ignore
  const AweberForm = memo(function AweberForm({ formType }: { formType: "companies" | "intrapreneurs" }) {
   const containerRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        window.__AWEBER_FORM_CACHE__ ||= {}
    
        const container = containerRef.current
        if (!container) return
    
        // 1) If we have cached HTML from a previous mount, restore it immediately.
        const cached = window.__AWEBER_FORM_CACHE__[formType]
        if (cached && !container.innerHTML) {
          container.innerHTML = cached
          return () => {
            window.__AWEBER_FORM_CACHE__![formType] = container.innerHTML
          }
        }
    
        // 2) Otherwise, ensure the script runs again.
        const src = AWEBER_SRC[formType]
    
        // If a script with this src already exists, inject a "fresh" one to re-run Aweber’s embed logic.
        const forceReinit = () => {
          const s = document.createElement("script")
          s.type = "text/javascript"
          s.async = true
          // cache-bust so the browser doesn’t skip execution
          s.src = `${src}?v=${Date.now()}`
          document.head.appendChild(s)
        }
    
        // If no script exists yet, add one with an ID; if it exists, add a fresh copy
        const existing = Array.from(document.scripts).some((sc) => (sc as HTMLScriptElement).src.startsWith(src))
        if (!existing) {
          const s = document.createElement("script")
          s.type = "text/javascript"
          s.async = true
          s.id = `aweber-${formType}-loader`
          s.src = src
          document.head.appendChild(s)
        } else {
          forceReinit()
        }
    
        // 3) On unmount, cache the HTML so we can restore instantly next time.
        return () => {
          if (container) {
            window.__AWEBER_FORM_CACHE__![formType] = container.innerHTML
          }
        }
      }, [formType])

    return (
      <div className="bg-white rounded-2xl p-8 shadow-2xl border border-blue-200">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-black text-gray-900 mb-2">SECURE YOUR SPOT</h3>
          <p className="text-gray-700 leading-tight">
            Join industry leaders in this exclusive webinar. Limited seats available.
          </p>
        </div> 

       <div
        ref={containerRef}
        className={formType === "companies" ? "AW-Form-675776216" : "AW-Form-536220692"}
        style={{ minHeight: "400px" }}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: "" }}
      />

        <p className="text-xs text-gray-500 text-center leading-tight mt-4">
          By registering, you agree to receive email communications about this webinar and future innovation programs.
          You can unsubscribe at any time.
        </p>
      </div>
    )
  })

  const HomePage = () => {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section with dramatic typography */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="leading-none mb-8">
                <div className="text-4xl md:text-6xl font-normal text-gray-900 mb-2">Innovation</div>
                <div className="text-8xl md:text-[10rem] font-black text-blue-600 mb-2">VELOCITY</div>
                <div className="text-6xl md:text-8xl font-black text-gray-900 mb-2">=</div>
                <div className="text-5xl md:text-7xl font-black text-gray-900 mb-2">Survival</div>
                <div className="text-3xl md:text-5xl font-normal text-gray-700">+ Strategic Advantage</div>
              </h1>

              <p className="mt-12 text-2xl md:text-3xl text-gray-700 max-w-4xl mx-auto leading-tight font-light">
                In a world reshaped by AI, political volatility, and economic upheaval —{" "}
                <strong className="font-black text-black">innovation is no longer optional. It's existential.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Sections */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* For Companies */}
              <div className="bg-gray-900 rounded-2xl p-8 shadow-xl border border-blue-400 hover:shadow-2xl transition-all duration-300 flex flex-col">
                <div className="flex items-center mb-6">
                  <svg
                    className="w-8 h-8 text-blue-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <h2 className="text-3xl font-black text-white">For Companies</h2>
                </div>

                <div className="space-y-4 text-gray-300 leading-tight flex-grow">
                  <p className="font-bold text-lg text-white">{">"} Future-proof your business</p>
                  <p>
                    Install <strong>Internal Innovation Labs</strong> that accelerate strategic growth, boost
                    shareholder value, and make your organization unignorable.
                  </p>
                  <p>
                    We deliver executive-level innovation architecture through workshops, off-site retreats, and bespoke
                    coaching that embeds sustainable competitive advantage from within.
                  </p>
                  <p>Transform uncertainty into opportunity with proven methodologies.</p>

                  <p className="text-yellow-400 font-semibold mt-4">
                    → Companies that fail to adapt will lose relevance — and market share.
                  </p>
                </div>

                <div className="mt-8">
                  <ShimmerButton onClick={() => setCurrentPage("companies")} className="w-full">
                    START LEARNING
                  </ShimmerButton>
                </div>
              </div>

              {/* For Intrapreneurs */}
              <div className="bg-gray-900 rounded-2xl p-8 shadow-xl border border-yellow-400 hover:shadow-2xl transition-all duration-300 flex flex-col">
                <div className="flex items-center mb-6">
                  <svg
                    className="w-8 h-8 text-yellow-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                  <h2 className="text-3xl font-black text-white">For Intrapreneurs</h2>
                </div>

                <div className="space-y-4 text-gray-300 leading-tight flex-grow">
                  <p className="font-bold text-lg text-white">{">"} Become a founder inside your company-employer</p>
                  <p>
                    <strong>Build wealth while you build what matters.</strong>
                  </p>
                  <p>
                    Our courses, coaching, and group workshops help you launch internal ventures, contribute
                    transformative ideas, and generate autonomy and abundance — backed by your company's capital.
                  </p>
                  <p>
                    Whether you're seeking entrepreneurial freedom while maintaining job security, or looking to
                    maximize your creative potential within established organizations, our proven methodologies guide
                    you toward sustainable wealth creation.
                  </p>

                  <p className="text-yellow-400 font-semibold mt-4">
                    → Your creativity is capital. Let's turn it into value.
                  </p>
                </div>

                <div className="mt-8">
                  <ShimmerButton variant="secondary" onClick={() => setCurrentPage("intrapreneurs")} className="w-full">
                    START LEARNING
                  </ShimmerButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section  id="features"
  data-animate className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-12">WHY CHOOSE SPIN ACCELERATOR?</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <h3 className="text-xl font-bold mb-3">PROVEN METHODOLOGIES</h3>
                <p className="leading-tight">
                  Battle-tested innovation frameworks used by Fortune 500 companies worldwide.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-8 8"
                  />
                </svg>
                <h3 className="text-xl font-bold mb-3">MEASURABLE RESULTS</h3>
                <p className="leading-tight">
                  Track and demonstrate the impact of your innovation initiatives with clear metrics.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
                <h3 className="text-xl font-bold mb-3">EXPERT GUIDANCE</h3>
                <p className="leading-tight">
                  Learn from industry experts who have successfully implemented innovation programs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InnovateAutomateProfitSection page="home" />
      </div>
    )
  }

  const CompaniesWebinar = () => {
    return (
      <div className="min-h-screen bg-black">
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="leading-none mb-8">
                <div className="text-3xl md:text-5xl font-normal text-yellow-400 mb-4">JOIN THE</div>
                <div className="text-4xl md:text-6xl font-normal text-white mb-4">WEBINAR</div>
                <div className="text-8xl md:text-[6rem] font-black text-blue-400 mb-4">How Top Companies Win</div>
                <div className="text-2xl md:text-4xl font-light text-gray-300 mb-4">in</div>
                <div className="text-4xl md:text-6xl font-black text-white mb-4">UNPREDICTABLE</div>
                <div className="text-4xl md:text-6xl font-black text-white mb-4">MARKETS</div>
                <div className="text-xl md:text-3xl font-light text-gray-300">by building</div>
                <div className="text-3xl md:text-5xl font-black text-blue-400">INTERNAL INNOVATION LABS</div>
              </h1>

              <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-blue-300 max-w-4xl mx-auto mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">In this webinar, you will learn:</h2>

                <div className="text-left space-y-6 text-gray-900 text-xl leading-tight">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                    <p className="font-semibold">The strategic ROI of building innovation capacity internally</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">2</span>
                    </div>
                    <p className="font-semibold">How to protect shareholder value by accelerating internal change</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                    <p className="font-semibold">How innovation labs become your best hedge against disruption</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-1 bg-blue-600 rounded-2xl p-8 shadow-2xl">
                <h3 className="text-3xl font-black text-white mb-8 text-center">What You'll Master:</h3>
                <div className="space-y-6 text-white">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-900 font-bold text-lg">✓</span>
                    </div>
                    <p className="text-xl leading-tight font-medium">
                      Strategic innovation frameworks that drive measurable results
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-900 font-bold text-lg">✓</span>
                    </div>
                    <p className="text-xl leading-tight font-medium">Executive-level implementation strategies</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-900 font-bold text-lg">✓</span>
                    </div>
                    <p className="text-xl leading-tight font-medium">Risk mitigation through internal innovation</p>
                  </div>
                </div>
              </div>

             <div
  className={`lg:col-span-2 bg-gray-900 rounded-2xl p-4 ${
    currentPage === "companies" ? "" : "hidden"
  }`}
>
                <AweberForm formType="companies" />
              </div>
            </div>
          </div>
        </section>

        <InnovateAutomateProfitSection page="companies" />
      </div>
    )
  }

  const IntrapreneursWebinar = () => {
    return (
      <div className="min-h-screen bg-black">
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="leading-none mb-8">
                <div className="text-3xl md:text-5xl font-normal text-yellow-400 mb-4">JOIN THE WEBINAR:</div>
                <div className="text-2xl md:text-4xl font-light text-gray-300 mb-4">
                  How to <span className="text-4xl md:text-6xl font-black text-blue-400">USE</span> your{" "}
                  <span className="text-4xl md:text-6xl font-black text-white">EMOTIONAL CRISIS</span>
                </div>
                <div className="text-xl md:text-3xl font-light text-gray-300 mb-4">
                  to execute this <span className="text-4xl md:text-6xl font-black text-yellow-400">rapid</span> and
                  highly scalable
                </div>
                <div className="text-xl md:text-3xl font-light text-gray-300 mb-4">
                  <span className="text-4xl md:text-6xl font-black text-yellow-400">ULTRA-WEALTH</span> building
                  strategy
                </div>
                <div className="text-xl md:text-3xl font-light text-gray-300 mb-4">
                  without leaving your{" "}
                  <span className="text-3xl md:text-5xl font-black text-white">CORPORATE PURGATORY</span>{" "}
                  <span className="text-2xl md:text-4xl font-light text-gray-300">(Yet!)</span>
                </div>
              </h1>

              <div className="bg-blue-600 rounded-2xl p-8 shadow-2xl border-2 border-blue-400 max-w-4xl mx-auto mb-12">
                <div className="text-center">
                  <p className="text-white text-2xl leading-relaxed font-bold">
                    — all with my SpinAccelerator Methodology, Artificial <strong>INTELLIGENCE</strong>,
                    <br />
                    and the MetaMindBend framework for identity transformation
                  </p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-1 bg-yellow-400 rounded-2xl p-8 shadow-2xl">
                <h3 className="text-3xl font-black text-black mb-8 text-center">Your Transformation:</h3>
                <div className="space-y-6 text-black">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-lg">💡</span>
                    </div>
                    <p className="text-xl leading-tight font-medium">
                      Turn emotional crisis into wealth-building momentum
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-lg">🎯</span>
                    </div>
                    <p className="text-xl leading-tight font-medium">Master the MetaMindBend identity framework</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-lg">⚡</span>
                    </div>
                    <p className="text-xl leading-tight font-medium">
                      Build ultra- (meta-level) wealth while keeping your job—using cutting-edge entrepreneurial
                      insights, the power of AI, and the SpinAccelerator Methodology
                    </p>
                  </div>
                </div>
              </div>

               <div
  className={`lg:col-span-2 bg-gray-900 rounded-2xl p-4 ${
    currentPage === "intrapreneurs" ? "" : "hidden"
  }`}
>
                <AweberForm formType="intrapreneurs" />
              </div>
            </div>
          </div>
        </section>

        <InnovateAutomateProfitSection page="intrapreneurs" />
      </div>
    )
  }

  const SpinoffBusinesses = () => {
    useEffect(() => {
      const script = document.createElement("script")
      script.src = "https://embed.acuityscheduling.com/js/embed.js"
      script.type = "text/javascript"
      script.async = true
      document.head.appendChild(script)

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    }, [])

    return (
      <div className="min-h-screen bg-black">
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="leading-none mb-8">
                <div className="text-6xl md:text-8xl font-black text-yellow-400 mb-4">BUSINESSES</div>
                <div className="text-3xl md:text-5xl font-light text-gray-300 mb-4">FOR</div>
                <div className="text-8xl md:text-[10rem] font-black text-white mb-8">SALE</div>
                <div className="text-2xl md:text-4xl font-light text-gray-300 mb-4">ACQUIRE PROVEN</div>
                <div className="text-4xl md:text-6xl font-black text-blue-400 mb-4">INNOVATION</div>
                <div className="text-4xl md:text-6xl font-black text-white">ASSETS</div>
              </h1>

              <div className="text-center text-gray-300 max-w-4xl mx-auto mt-12">
                <p className="text-lg leading-relaxed">
                  Through our SpinAccelerator methodology, we've incubated and developed multiple high-potential
                  spin-off businesses that are now ready for acquisition. These aren't just ideas—they're validated
                  business models with proven market traction, established customer bases, and scalable frameworks.
                  Whether you're looking to expand your portfolio, enter new markets, or acquire innovative
                  capabilities, our spin-off businesses represent exceptional opportunities for strategic growth and
                  immediate market entry.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-1 gap-12 items-start">
              <div className="bg-gray-900 rounded-2xl p-8">
                <div className="bg-white rounded-2xl p-4 shadow-2xl border border-blue-200">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-gray-900 mb-2">SCHEDULE A BUYER CONSULTATION</h3>
                    <p className="text-gray-700 leading-tight">
                      Book a confidential call to discuss available opportunities and find the perfect acquisition
                      match.
                    </p>
                  </div>

                  <div className="w-full">
                    <iframe
                      src="https://app.acuityscheduling.com/schedule.php?owner=16939305&appointmentType=82307459"
                      width="100%"
                      height="800"
                      frameBorder="0"
                      allow="payment"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InnovateAutomateProfitSection page="spinoffs" />

        


      </div>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case "companies":
        return <CompaniesWebinar />
      case "intrapreneurs":
        return <IntrapreneursWebinar />
      case "spinoffs":
        return <SpinoffBusinesses />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      {renderPage()}
      <Footer />
    </div>
  )
}

export default App
