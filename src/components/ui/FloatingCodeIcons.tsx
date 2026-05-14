"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { Icon } from "./Icons";

const floatingIcons = [
  {
    icon: "code",
    label: "Code",
    tone: "cyan",
    style: { top: "18%", left: "8%", "--float-x": "10px", "--float-rotate": "-8deg", "--float-delay": "0s" },
  },
  {
    icon: "terminal",
    label: "Terminal",
    tone: "emerald",
    style: { top: "30%", right: "10%", "--float-x": "-12px", "--float-rotate": "7deg", "--float-delay": "-1.4s" },
  },
  {
    icon: "braces",
    label: "Braces",
    tone: "amber",
    style: { bottom: "24%", left: "13%", "--float-x": "14px", "--float-rotate": "6deg", "--float-delay": "-2.2s" },
  },
  {
    icon: "github",
    label: "GitHub",
    tone: "blue",
    style: { bottom: "27%", right: "16%", "--float-x": "-8px", "--float-rotate": "-5deg", "--float-delay": "-3.1s" },
  },
  {
    icon: "cpu",
    label: "Systems",
    tone: "rose",
    style: { top: "58%", right: "7%", "--float-x": "9px", "--float-rotate": "10deg", "--float-delay": "-4s" },
  },
] as const;

type FloatingStyle = CSSProperties & Record<`--${string}`, string>;

export default function FloatingCodeIcons() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="floating-code-layer">
      {floatingIcons.map((item, index) => (
        <button
          key={item.label}
          type="button"
          className={`floating-code-icon floating-code-icon--${item.tone} ${activeIndex === index ? "is-active" : ""}`}
          style={item.style as FloatingStyle}
          aria-label={`${item.label} icon`}
          title={item.label}
          onClick={() => setActiveIndex(activeIndex === index ? null : index)}
        >
          <Icon name={item.icon} size={22} />
          <span className="floating-code-pulse" />
        </button>
      ))}
    </div>
  );
}
