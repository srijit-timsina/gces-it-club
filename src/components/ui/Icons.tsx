import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

const iconProps = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
});

export function Icon({ name, size = 22, ...props }: IconProps & { name: string }) {
  const base = iconProps(size);

  switch (name) {
    case "award":
      return <svg {...base} {...props}><path d="m15.5 6.5-7 7" /><path d="m8.5 6.5 7 7" /><circle cx="12" cy="10" r="7" /><path d="m8.2 16.3-1.1 5.2 4.9-2.9 4.9 2.9-1.1-5.2" /></svg>;
    case "code":
      return <svg {...base} {...props}><path d="m16 18 6-6-6-6" /><path d="m8 6-6 6 6 6" /></svg>;
    case "book":
      return <svg {...base} {...props}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" /></svg>;
    case "video":
      return <svg {...base} {...props}><path d="m16 13 5.2 3.4V7.6L16 11" /><rect x="3" y="5" width="13" height="14" rx="2" /></svg>;
    case "github":
      return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.11.79-.25.79-.56v-2.16c-3.24.7-3.92-1.38-3.92-1.38-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.21 1.79 1.21 1.04 1.78 2.72 1.26 3.39.97.1-.76.41-1.27.74-1.56-2.58-.29-5.3-1.29-5.3-5.74 0-1.27.45-2.3 1.2-3.12-.12-.29-.52-1.48.11-3.08 0 0 .98-.31 3.18 1.19A11.1 11.1 0 0 1 12 5.35c.98 0 1.96.13 2.88.39 2.2-1.5 3.17-1.19 3.17-1.19.64 1.6.24 2.79.12 3.08.75.82 1.2 1.85 1.2 3.12 0 4.46-2.73 5.45-5.32 5.74.42.36.79 1.08.79 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" /></svg>;
    case "link":
      return <svg {...base} {...props}><path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11.5 4.43" /><path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07l1.33-1.33" /></svg>;
    case "calendar":
      return <svg {...base} {...props}><path d="M8 2v4" /><path d="M16 2v4" /><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18" /></svg>;
    case "map-pin":
      return <svg {...base} {...props}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
    case "mail":
      return <svg {...base} {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
    case "phone":
      return <svg {...base} {...props}><path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.67 2.8a2 2 0 0 1-.45 2.11L8.05 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.84.54 2.8.67A2 2 0 0 1 22 16.9Z" /></svg>;
    case "users":
      return <svg {...base} {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "user":
      return <svg {...base} {...props}><path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" /></svg>;
    case "megaphone":
      return <svg {...base} {...props}><path d="m3 11 18-5v12L3 14v-3Z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>;
    case "image":
      return <svg {...base} {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" /></svg>;
    case "search":
      return <svg {...base} {...props}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>;
    case "x":
      return <svg {...base} {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>;
    case "arrow-right":
      return <svg {...base} {...props}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>;
    case "arrow-left":
      return <svg {...base} {...props}><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>;
    case "external-link":
      return <svg {...base} {...props}><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>;
    case "file-text":
      return <svg {...base} {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></svg>;
    case "star":
      return <svg {...base} {...props}><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21 7 14.2 2 9.3l6.9-1L12 2Z" /></svg>;
    case "alert":
      return <svg {...base} {...props}><path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>;
    case "check":
      return <svg {...base} {...props}><path d="m20 6-11 11-5-5" /></svg>;
    case "mic":
      return <svg {...base} {...props}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><path d="M12 19v3" /></svg>;
    case "tool":
      return <svg {...base} {...props}><path d="M14.7 6.3a4 4 0 0 0-5 5L3 18v3h3l6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-2.8-2.8 2.2-2.6Z" /></svg>;
    case "sun":
      return <svg {...base} {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>;
    case "moon":
      return <svg {...base} {...props}><path d="M20.9 13.4A8 8 0 1 1 10.6 3.1 6 6 0 0 0 20.9 13.4Z" /></svg>;
    default:
      return <svg {...base} {...props}><circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" /></svg>;
  }
}
