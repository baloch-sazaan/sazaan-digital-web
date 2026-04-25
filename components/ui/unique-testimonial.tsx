import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    quote: "The technical precision Sazaan brought to our studio's platform was unmatched. They don't just build websites; they build digital experiences.",
    author: "Sarah Chen",
    role: "Design Director",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    quote: "Our workflow was fragmented until Sazaan integrated their automation systems. We've significantly improved efficiency without increasing overhead.",
    author: "Marcus Johnson",
    role: "Studio Founder",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    quote: "Their development strategy didn't just give us traffic; it gave us authority. We are now the preferred choice in our market.",
    author: "Elena Rodriguez",
    role: "Marketing Head",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedQuote, setDisplayedQuote] = useState(testimonials[0].quote)
  const [displayedRole, setDisplayedRole] = useState(testimonials[0].role)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null)
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (t1.current !== null) clearTimeout(t1.current)
      if (t2.current !== null) clearTimeout(t2.current)
    }
  }, [])

  const handleSelect = (index: number) => {
    if (index === activeIndex || isAnimating) return
    setIsAnimating(true)

    t1.current = setTimeout(() => {
      setDisplayedQuote(testimonials[index].quote)
      setDisplayedRole(testimonials[index].role)
      setActiveIndex(index)
      t2.current = setTimeout(() => setIsAnimating(false), 400)
    }, 200)
  }

  return (
    <div className="flex flex-col items-center gap-16 py-24 md:py-48 bg-[#F7F7F5] border-y border-[#E2E2DE]">
      <div className="relative px-8 w-full">
        <span className="absolute left-4 md:left-20 -top-12 text-[120px] font-serif text-[#E8FF3A] select-none pointer-events-none opacity-30">
          "
        </span>

        <p
          className={cn(
            "text-4xl md:text-6xl lg:text-7xl font-black font-barlow uppercase text-[#111111] text-center max-w-5xl mx-auto leading-[0.95] tracking-tightest transition-all duration-400 ease-out",
            isAnimating ? "opacity-0 blur-md scale-[0.98]" : "opacity-100 blur-0 scale-100",
          )}
        >
          {displayedQuote}
        </p>

        <span className="absolute right-4 md:right-20 -bottom-16 text-[120px] font-serif text-[#E8FF3A] select-none pointer-events-none opacity-30">
          "
        </span>
      </div>

      <div className="flex flex-col items-center gap-6 mt-2">
        <p
          className={cn(
            "text-[10px] font-bold font-dmsans text-[#555555] tracking-[0.3em] uppercase transition-all duration-500 ease-out",
            isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
          )}
        >
          {displayedRole}
        </p>

        <div className="flex items-center justify-center gap-3">
          {testimonials.map((testimonial, index) => {
            const isActive = activeIndex === index
            const isHovered = hoveredIndex === index && !isActive
            const showName = isActive || isHovered

            return (
              <button
                key={testimonial.id}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "relative flex items-center gap-0 rounded-full cursor-pointer",
                  "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  isActive ? "bg-[#111111] shadow-lg" : "bg-transparent hover:bg-[#F7F7F5]",
                  showName ? "pr-4 pl-2 py-2" : "p-1",
                  !isActive && "border border-[#E2E2DE]"
                )}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className={cn(
                      "w-12 h-12 rounded-full object-cover",
                      "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                      isActive ? "ring-2 ring-[#E8FF3A]" : "ring-0",
                      !isActive && "hover:scale-105",
                    )}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div
                  className={cn(
                    "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    showName ? "grid-cols-[1fr] opacity-100 ml-2" : "grid-cols-[0fr] opacity-0 ml-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <span
                      className={cn(
                        "text-[10px] font-bold font-dmsans tracking-widest uppercase whitespace-nowrap block",
                        "transition-colors duration-300",
                        isActive ? "text-white" : "text-[#111111]",
                      )}
                    >
                      {testimonial.author}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
