"use client";

import Image from "next/image";
import type { Contributor } from "@/lib/types";
import { Icon } from "./Icons";

export default function ContributorCard({ contributor }: { contributor: Contributor }) {
  return (
    <div
      className="glass-card interactive-card"
      style={{
        padding: "2rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        height: "100%",
        transition: "all 0.3s ease",
      }}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .contributor-image-container {
          position: relative;
          width: 96px;
          height: 96px;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }
        .contributor-image-wrapper {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(34, 85, 153, 0.4);
          position: relative;
          background: var(--accent-soft);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(91, 33, 182, 0.1);
        }
        .contributor-card:hover .contributor-image-wrapper {
          border-color: var(--accent-primary);
          box-shadow: 0 12px 32px rgba(91, 33, 182, 0.2);
          animation: float 3s ease-in-out infinite;
        }
        .contributor-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .contributor-role {
          color: var(--accent-primary);
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .contributor-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--accent-primary);
          margin-left: 0.5rem;
        }
        .contributor-meta {
          color: var(--text-muted);
          font-size: 0.8rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .contributor-bio {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }
        .contributor-socials {
          display: flex;
          gap: 1rem;
          justify-content: center;
          border-top: 1px solid var(--border);
          padding-top: 1.5rem;
          width: 100%;
        }
        .social-link {
          color: var(--text-secondary);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
        }
        .social-link:hover {
          background: var(--accent-soft);
          transform: translateY(-2px);
        }
        .social-link.github:hover {
          color: var(--text-primary);
        }
        .social-link.linkedin:hover {
          color: var(--accent-primary);
        }
        .social-link.website:hover {
          color: #10b981;
        }
      `}</style>

      <div className="contributor-image-container">
        <div className="contributor-image-wrapper">
          {contributor.image_url ? (
            <Image 
              src={contributor.image_url} 
              alt={contributor.name} 
              fill 
              style={{ objectFit: "cover" }} 
            />
          ) : (
            <div style={{ fontSize: "2.5rem" }}>
              <Icon name="code" size={32} />
            </div>
          )}
        </div>
      </div>

      <h3 className="contributor-title">
        {contributor.name || "Unknown Contributor"}
        {(contributor.role || "").toLowerCase().includes('lead') && (
          <span className="contributor-badge" title="Project Lead">
            <Icon name="star" size={16} />
          </span>
        )}
      </h3>

      <div className="contributor-role">
        {contributor.role || "Member"}
      </div>

      {contributor.year && contributor.year !== "-" && (
        <div className="contributor-meta">
          <span>{contributor.year}</span>
          <span>•</span>
          <span>{contributor.branch || "General"}</span>
        </div>
      )}

      {contributor.bio && (
        <p className="contributor-bio">
          {contributor.bio}
        </p>
      )}

      <div className="contributor-socials">
        {contributor.github && (
          <a 
            href={contributor.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link github"
            title="GitHub Profile"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        )}
        {contributor.linkedin && (
          <a 
            href={contributor.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link linkedin"
            title="LinkedIn Profile"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        )}
        {contributor.website && (
          <a 
            href={contributor.website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link website"
            title="Portfolio/Website"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          </a>
        )}
      </div>
    </div>
  );
}
