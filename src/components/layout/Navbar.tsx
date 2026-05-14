"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const overHero = isHome && !scrolled && !menuOpen;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    queueMicrotask(() => setMenuOpen(false));
  }, [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`site-nav ${overHero ? "is-over-hero" : "is-solid"}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
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
            className="site-logo"
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
              className="logo-mark"
            >
              <Image
                src="/logo/logo.png"
                alt="GCES Logo"
                fill
                style={{ objectFit: "contain", borderRadius: "50%" }}
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "var(--nav-brand-color)",
                  lineHeight: 1.1,
                  transition: "color 0.25s ease",
                }}
              >
                GCES IT Club
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "var(--nav-muted-color)",
                  letterSpacing: 0,
                  display: "none",
                  transition: "color 0.25s ease",
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
                  className={`nav-link ${isActive ? "is-active" : ""}`}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contributors"
              className="nav-cta"
              style={{
                marginLeft: "8px",
                padding: "7px 16px",
                borderRadius: "8px",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
                background: "var(--accent-primary)",
                color: "white",
                transition: "transform 0.25s var(--ease-out), box-shadow 0.25s ease, background 0.25s ease",
              }}
            >
              Contributors
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
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
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                  transform: menuOpen
                    ? i === 0
                      ? "rotate(45deg) translate(5px, 5px)"
                      : i === 1
                        ? "scaleX(0)"
                        : "rotate(-45deg) translate(5px, -5px)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
                className="hamburger-line"
              />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="mobile-menu"
            style={{
              background: "var(--nav-bg)",
              backdropFilter: "blur(16px)",
              borderTop: "1px solid var(--border)",
              padding: "1rem 1.5rem 1.5rem",
            }}
          >
            {[
              ...NAV_LINKS,
              { label: "Contributors", href: "/contributors" },
            ].map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? "is-active" : ""}`}
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    fontSize: "1rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    marginBottom: "4px",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <div style={{ padding: "12px 16px" }}>
              <ThemeToggle />
            </div>
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
