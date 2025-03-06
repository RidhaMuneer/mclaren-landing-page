"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import Dropdown from "./dropdown"

type NavigationProps = {
  onNavItemClick?: () => void
}

type DropdownItem = {
  title: string
  href: string
  image?: string
}

type DropdownContent = {
  [key: string]: DropdownItem[]
}

const dropdownContent: DropdownContent = {
  models: [
    { title: "Artura", href: "/models/artura", image: "/artura.webp" },
    { title: "GT", href: "/models/gt", image: "/gt.webp" },
    { title: "720S", href: "/models/720s", image: "/720s.webp" },
    { title: "765LT", href: "/models/765lt", image: "/765lt.webp" },
  ],
  discover: [
    { title: "Motorsport", href: "/discover/motorsport" },
    { title: "McLaren Special Operations", href: "/discover/special-operations" },
    { title: "Heritage", href: "/discover/heritage" },
    { title: "Experiences", href: "/discover/experiences" },
  ],
  ownership: [
    { title: "McLaren Financial Services", href: "/ownership/financial-services" },
    { title: "Warranty", href: "/ownership/warranty" },
    { title: "Service & Maintenance", href: "/ownership/service" },
    { title: "Track Days", href: "/ownership/track-days" },
  ],
}

const Navigation = ({ onNavItemClick }: NavigationProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    // Close any open dropdowns when toggling mobile menu
    setActiveDropdown(null)
  }

  // Handle dropdown open/close
  const handleDropdownChange = (dropdown: string, isOpen: boolean) => {
    setActiveDropdown(isOpen ? dropdown : null)
  }

  // Close menu when clicking a nav item without dropdown
  const handleNavClick = () => {
    setMenuOpen(false)
    setActiveDropdown(null)
    if (onNavItemClick) {
      onNavItemClick()
    }
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        toggleRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [menuOpen])

  // Handle body overflow when menu is open
  useEffect(() => {
    // Use a class on the html element instead of directly setting style
    if (menuOpen) {
      document.documentElement.classList.add("menu-open")
    } else {
      document.documentElement.classList.remove("menu-open")
    }

    return () => {
      document.documentElement.classList.remove("menu-open")
    }
  }, [menuOpen])

  // Render dropdown trigger button
  const renderDropdownTrigger = (label: string, isActive: boolean) => (
    <button className={`nav-button dropdown-toggle ${isActive ? "active" : ""}`} aria-expanded={isActive}>
      {label}
      <svg
        className="dropdown-icon"
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )

  // Render mobile dropdown trigger button
  const renderMobileDropdownTrigger = (label: string, isActive: boolean) => (
    <button className={`mobile-nav-button mobile-dropdown-toggle ${isActive ? "active" : ""}`}>
      {label}
      <svg
        className={`mobile-dropdown-icon ${isActive ? "open" : ""}`}
        width="14"
        height="8"
        viewBox="0 0 14 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )

  // Render models dropdown content
  const renderModelsContent = () => (
    <div className="dropdown-grid">
      {dropdownContent.models.map((item, index) => (
        <Link key={index} href={item.href} className="dropdown-item with-image" onClick={handleNavClick}>
          {item.image && (
            <div className="dropdown-item-image">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                width={200}
                height={120}
                className="model-image"
              />
            </div>
          )}
          <span className="dropdown-item-title">{item.title}</span>
        </Link>
      ))}
    </div>
  )

  // Render list dropdown content
  const renderListContent = (items: DropdownItem[]) => (
    <div className="dropdown-list">
      {items.map((item, index) => (
        <Link key={index} href={item.href} className="dropdown-item" onClick={handleNavClick}>
          {item.title}
        </Link>
      ))}
    </div>
  )

  // Render mobile dropdown content
  const renderMobileContent = (items: DropdownItem[]) => (
    <>
      {items.map((item, index) => (
        <Link key={index} href={item.href} className="mobile-dropdown-item" onClick={handleNavClick}>
          {item.title}
        </Link>
      ))}
    </>
  )

  return (
    <header className="header">
      <div className="logo">
        <Image src="/mclaren-logo.png" alt="McLaren Logo" width={180} height={50} priority />
      </div>

      {/* Desktop Navigation */}
      <nav className="nav-menu desktop-menu">
        <ul>
          <li>
            <Dropdown
              trigger={renderDropdownTrigger("Models", activeDropdown === "models")}
              isOpen={activeDropdown === "models"}
              onOpenChange={(isOpen) => handleDropdownChange("models", isOpen)}
              dropdownClassName="models-dropdown"
            >
              {renderModelsContent()}
            </Dropdown>
          </li>

          <li>
            <Dropdown
              trigger={renderDropdownTrigger("Discover", activeDropdown === "discover")}
              isOpen={activeDropdown === "discover"}
              onOpenChange={(isOpen) => handleDropdownChange("discover", isOpen)}
            >
              {renderListContent(dropdownContent.discover)}
            </Dropdown>
          </li>

          <li>
            <Dropdown
              trigger={renderDropdownTrigger("Ownership", activeDropdown === "ownership")}
              isOpen={activeDropdown === "ownership"}
              onOpenChange={(isOpen) => handleDropdownChange("ownership", isOpen)}
            >
              {renderListContent(dropdownContent.ownership)}
            </Dropdown>
          </li>

          <li>
            <button className="nav-button" onClick={handleNavClick}>
              News and Offer
            </button>
          </li>
        </ul>
      </nav>

      {/* Desktop Contact Button */}
      <Link href="/contact" className="contact-button desktop-contact" onClick={handleNavClick}>
        Contact Us
      </Link>

      {/* Mobile Menu Toggle Button */}
      <button
        ref={toggleRef}
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Mobile Menu Dropdown */}
      <div ref={menuRef} className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <nav className="mobile-nav">
          <ul>
            <li>
              <Dropdown
                trigger={renderMobileDropdownTrigger("Models", activeDropdown === "mobile-models")}
                isOpen={activeDropdown === "mobile-models"}
                onOpenChange={(isOpen) => handleDropdownChange("mobile-models", isOpen)}
                isMobile={true}
              >
                {renderMobileContent(dropdownContent.models)}
              </Dropdown>
            </li>

            <li>
              <Dropdown
                trigger={renderMobileDropdownTrigger("Discover", activeDropdown === "mobile-discover")}
                isOpen={activeDropdown === "mobile-discover"}
                onOpenChange={(isOpen) => handleDropdownChange("mobile-discover", isOpen)}
                isMobile={true}
              >
                {renderMobileContent(dropdownContent.discover)}
              </Dropdown>
            </li>

            <li>
              <Dropdown
                trigger={renderMobileDropdownTrigger("Ownership", activeDropdown === "mobile-ownership")}
                isOpen={activeDropdown === "mobile-ownership"}
                onOpenChange={(isOpen) => handleDropdownChange("mobile-ownership", isOpen)}
                isMobile={true}
              >
                {renderMobileContent(dropdownContent.ownership)}
              </Dropdown>
            </li>

            <li>
              <button className="mobile-nav-button" onClick={handleNavClick}>
                News and Offer
              </button>
            </li>

            <li className="mobile-contact-item">
              <Link href="/contact" className="contact-button mobile-contact" onClick={handleNavClick}>
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navigation

