"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.3s ease",
          background: scrolled
            ? "rgba(10,14,26,0.95)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "68px",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                background: "white",
                borderRadius: "50%",
                padding: "2px",
              }}
            >
              <Image src="/logo/logo.png" alt="GCES Logo" fill style={{ objectFit: "contain", borderRadius: "50%" }} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#f1f5f9",
                  lineHeight: 1.1,
                }}
              >
                GCES IT Club
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "#64748b",
                  letterSpacing: "0.05em",
                  display: "none",
                }}
                className="logo-tagline"
              >
                Innovate · Code · Collaborate
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    color: isActive ? "#60a5fa" : "#94a3b8",
                    background: isActive ? "rgba(59,130,246,0.1)" : "transparent",
                    border: isActive ? "1px solid rgba(59,130,246,0.2)" : "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.target as HTMLElement).style.color = "#f1f5f9";
                      (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.target as HTMLElement).style.color = "#94a3b8";
                      (e.target as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contributors"
              style={{
                marginLeft: "8px",
                padding: "7px 16px",
                borderRadius: "8px",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
                background: "linear-gradient(135deg, #2563eb 0%, #dc2626 100%)",
                color: "white",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.transform = "translateY(-1px)";
                (e.target as HTMLElement).style.boxShadow = "0 4px 15px rgba(59,130,246,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.transform = "translateY(0)";
                (e.target as HTMLElement).style.boxShadow = "none";
              }}
            >
              Contributors
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "8px",
              display: "none",
              flexDirection: "column",
              gap: "5px",
            }}
            className="hamburger-btn"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "#f1f5f9",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                  transform:
                    menuOpen
                      ? i === 0
                        ? "rotate(45deg) translate(5px, 5px)"
                        : i === 1
                        ? "opacity: 0; scaleX(0)"
                        : "rotate(-45deg) translate(5px, -5px)"
                      : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              background: "rgba(10,14,26,0.98)",
              backdropFilter: "blur(16px)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "1rem 1.5rem 1.5rem",
            }}
          >
            {[...NAV_LINKS, { label: "Contributors", href: "/contributors" }].map(
              (link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      display: "block",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      fontSize: "1rem",
                      fontWeight: 500,
                      textDecoration: "none",
                      marginBottom: "4px",
                      color: isActive ? "#60a5fa" : "#94a3b8",
                      background: isActive ? "rgba(59,130,246,0.1)" : "transparent",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              }
            )}
          </div>
        )}
      </nav>

      {/* Responsive styles */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .hamburger-btn { display: none !important; }
          .logo-tagline { display: block !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
