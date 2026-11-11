// Lightweight inline icon set (stroke icons, inherit currentColor)
type P = { className?: string };
const base = "fill-none stroke-current stroke-[1.8]";
const svg = (d: React.ReactNode) => ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" className={`${base} ${className}`} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

export const IconArrow = svg(<path d="M5 12h14M13 6l6 6-6 6" />);
export const IconClock = svg(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
export const IconBolt = svg(<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />);
export const IconTruck = svg(<><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></>);
export const IconCalendar = svg(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>);
export const IconChart = svg(<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />);
export const IconShield = svg(<><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z" /><path d="m9 12 2 2 4-4" /></>);
export const IconMap = svg(<><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></>);
export const IconMail = svg(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>);
export const IconPhone = svg(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />);
export const IconCheck = svg(<path d="m5 12 5 5L20 7" />);
export const IconFactory = svg(<path d="M3 21V10l6 4V10l6 4V5h6v16zM7 17h2M12 17h2M17 17h2" />);
export const IconGlobe = svg(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>);
export const IconTools = svg(<path d="M14 7a4 4 0 0 0 5 5l2 2-7 7-2-2a4 4 0 0 0-5-5L3 10l7-7z" />);
export const IconPlus = svg(<path d="M12 5v14M5 12h14" />);
export const IconDoc = svg(<><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>);
export const IconPlane = svg(<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />);
export const IconBox = svg(<><path d="M12 3 4 7v10l8 4 8-4V7z" /><path d="m4 7 8 4 8-4M12 11v10" /></>);
export const IconTimer = svg(<><circle cx="12" cy="13.5" r="7.5" /><path d="M12 9.5v4l2.5 1.5M9.5 3h5M12 3v3" /></>);
export const IconSearch = svg(<><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.3-4.3" /></>);
export const IconUser = svg(<><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20c.6-3.6 3.4-5.5 7-5.5s6.4 1.9 7 5.5" /></>);
export const IconPause = svg(<path d="M8.5 5v14M15.5 5v14" />);
export const IconPlay = svg(<path d="M8 5v14l11-7z" />);
export const IconBeam = svg(<path d="M7 4h10M7 20h10M12 4v16" />);
export const IconVan = svg(<><path d="M2.5 7h10.5l5 4.5h3.5V16h-2M2.5 7v9h2M9 16h6" /><circle cx="6.8" cy="16.5" r="2" /><circle cx="17" cy="16.5" r="2" /></>);
