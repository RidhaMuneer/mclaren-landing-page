"use client"

import type React from "react"
import { useState, useEffect, useRef, type ReactNode } from "react"

export type DropdownProps = {
  trigger: ReactNode
  children: ReactNode
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  className?: string
  dropdownClassName?: string
  position?: "center" | "left" | "right"
  showArrow?: boolean
  closeOnClick?: boolean
  closeOnOutsideClick?: boolean
  isMobile?: boolean
  mobileClassName?: string
  id?: string
}

const Dropdown = ({
  trigger,
  children,
  isOpen: controlledIsOpen,
  onOpenChange,
  className = "",
  dropdownClassName = "",
  position = "center",
  showArrow = true,
  closeOnClick = true,
  closeOnOutsideClick = true,
  isMobile = false,
  mobileClassName = "",
  id,
}: DropdownProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen

  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const newState = !isOpen
    if (!isControlled) {
      setInternalIsOpen(newState)
    }
    if (onOpenChange) {
      onOpenChange(newState)
    }
  }

  useEffect(() => {
    if (!closeOnOutsideClick) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (
        isOpen &&
        dropdownRef.current &&
        triggerRef.current &&
        !dropdownRef.current.contains(target) &&
        !triggerRef.current.contains(target)
      ) {
        if (!isControlled) {
          setInternalIsOpen(false)
        }
        if (onOpenChange) {
          onOpenChange(false)
        }
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen, closeOnOutsideClick, isControlled, onOpenChange])

  // Close dropdown on window resize
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        if (!isControlled) {
          setInternalIsOpen(false)
        }
        if (onOpenChange) {
          onOpenChange(false)
        }
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [isOpen, isControlled, onOpenChange])

  const handleContentClick = () => {
    if (closeOnClick) {
      if (!isControlled) {
        setInternalIsOpen(false)
      }
      if (onOpenChange) {
        onOpenChange(false)
      }
    }
  }

  let positionClass = "left-1/2 transform -translate-x-1/2"
  if (position === "left") {
    positionClass = "left-0"
  } else if (position === "right") {
    positionClass = "right-0"
  }

  if (isMobile) {
    return (
      <div className={`mobile-dropdown ${className}`}>
        <div ref={triggerRef} onClick={toggleDropdown}>
          {trigger}
        </div>

        <div
          ref={dropdownRef}
          className={`mobile-dropdown-menu ${isOpen ? "open" : ""} ${mobileClassName}`}
          id={id}
          onClick={handleContentClick}
        >
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className={`dropdown ${className}`}>
      <div ref={triggerRef} onClick={toggleDropdown}>
        {trigger}
      </div>

      <div
        ref={dropdownRef}
        className={`dropdown-menu ${isOpen ? "open" : ""} ${positionClass} ${dropdownClassName}`}
        id={id}
        onClick={handleContentClick}
      >
        {showArrow && !isMobile && <div className="dropdown-arrow"></div>}
        {children}
      </div>
    </div>
  )
}

export default Dropdown

