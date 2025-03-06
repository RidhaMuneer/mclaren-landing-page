"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

const carImages = [
  {
    id: 1,
    src: "/car-showcase-1.png",
    alt: "McLaren Artura Spider - Front View",
    thumbnail: "/car-showcase-1.png",
  },
  {
    id: 2,
    src: "/car-showcase-2.png",
    alt: "McLaren Artura Spider - Side View",
    thumbnail: "/car-showcase-2.png",
  },
  {
    id: 3,
    src: "/car-showcase-3.png",
    alt: "McLaren Artura Spider - Rear View",
    thumbnail: "/car-showcase-3.png",
  },
  {
    id: 4,
    src: "/car-showcase-4.png",
    alt: "McLaren Artura Spider - Rear View",
    thumbnail: "/car-showcase-4.png",
  },
]

const CarShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % carImages.length)
  }

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + carImages.length) % carImages.length)
  }

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index)
  }

  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth * 0.5
      const containerWidth = sliderRef.current.offsetWidth
      const centerPosition = (activeIndex * slideWidth) - ((containerWidth - slideWidth) / 2)
      
      sliderRef.current.scrollTo({
        left: centerPosition,
        behavior: "smooth",
      });
    }
  }, [activeIndex])

  return (
    <section className="showcase">
      <div className="showcase-content">
        <h1 className="showcase-title">MCLAREN ARTURA SPIDER</h1>
        <h2 className="showcase-subtitle">The Next Generation</h2>

        <div className="showcase-slider-container">
          <div className="showcase-slider" ref={sliderRef}>
            {carImages.map((image, index) => (
              <div 
                key={image.id} 
                className={`showcase-slide ${index === activeIndex ? "active" : ""}`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={1000}
                  height={600}
                  priority={index === activeIndex}
                  className="slide-image"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="showcase-navigation">
          <button className="nav-arrow prev" onClick={prevSlide} aria-label="Previous image">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="thumbnail-container">
            {carImages.map((image, index) => (
              <button
                key={image.id}
                className={`thumbnail-button ${index === activeIndex ? "active" : ""}`}
                onClick={() => handleThumbnailClick(index)}
                aria-label={`View ${image.alt}`}
              >
                <Image
                  src={image.thumbnail || "/placeholder.svg"}
                  alt={image.alt}
                  width={150}
                  height={100}
                  className="thumbnail-image"
                />
              </button>
            ))}
          </div>

          <button className="nav-arrow next" onClick={nextSlide} aria-label="Next image">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <Link href="/learn-more" className="learn-more-button">
          Learn More
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
      </div>
    </section>
  )
}

export default CarShowcase