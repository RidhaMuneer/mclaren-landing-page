"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Navigation from "./navigation"

type MediaItem = {
  id: number
  type: "image" | "video"
  src: string
  alt?: string
  title: string
  subtitle: string
}

const mediaItems: MediaItem[] = [
  {
    id: 1,
    type: "image",
    src: "/hero-section-1.png",
    alt: "McLaren Artura Spider - Orange",
    title: "PERFORMANCE AMPLIFIED",
    subtitle: "THE NEW MCLAREN ARTURA SPIDER",
  },
  {
    id: 2,
    type: "video",
    src: "/hero-section-2.mp4",
    alt: "McLaren Artura Spider - Side View",
    title: "ENGINEERED EXCELLENCE",
    subtitle: "EXPERIENCE THE THRILL",
  },
  {
    id: 3,
    type: "image",
    src: "/hero-section-1.png",
    alt: "McLaren Artura Spider - Front View",
    title: "STRIKING DESIGN",
    subtitle: "FORM FOLLOWS FUNCTION",
  },
  {
    id: 4,
    type: "video",
    src: "/hero-section-2.mp4",
    alt: "McLaren Artura Spider - Rear View",
    title: "REVOLUTIONARY TECHNOLOGY",
    subtitle: "PUSHING THE BOUNDARIES",
  },
]

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [currentItem, setCurrentItem] = useState(mediaItems[0])
  const [timeLeft, setTimeLeft] = useState(5)

  useEffect(() => {
    setCurrentItem(mediaItems[activeIndex])
  }, [activeIndex])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          const nextIndex = (activeIndex + 1) % mediaItems.length
          setActiveIndex(nextIndex)
          return 5
        }
        return prevTime - 0.1
      })
    }, 100)

    return () => clearInterval(timer)
  }, [activeIndex])

  const handleNavClick = (index: number) => {
    setActiveIndex(index)
    setTimeLeft(5)
  }

  return (
    <section className="hero-section">
      <Navigation />

      <div className="hero-content">
        <div className="hero-text">
          <h2 className="subtitle">{currentItem.title}</h2>
          <h1 className="title">{currentItem.subtitle}</h1>
          <div className="cta-buttons">
            <Link href="/explore" className="cta-button primary">
              Explore More
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link href="/download" className="cta-button secondary">
              Download Catalogue
            </Link>
          </div>
        </div>

        <div className="media-container">
          {currentItem.type === "image" ? (
            <Image
              src={currentItem.src || "/placeholder.svg"}
              alt={currentItem.alt || ""}
              fill
              style={{ objectFit: "cover" }}
              priority
              className="media-item"
            />
          ) : (
            <video
              src={currentItem.src}
              autoPlay
              muted
              loop
              className="media-item"
              key={currentItem.id}
            />
          )}
        </div>
      </div>

      <div className="navigation-controls">
        {mediaItems.map((item, index) => (
          <button
            key={item.id}
            className={`nav-indicator ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleNavClick(index)}
            aria-label={`View slide ${index + 1}`}
          >
            <div
              className="progress-bar"
              style={{
                width: index === activeIndex ? `${(timeLeft / 5) * 100}%` : "100%",
              }}
            ></div>
          </button>
        ))}
      </div>
    </section>
  )
}

export default HeroSection
