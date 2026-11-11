import { useId } from "react";
import type { VehicleKind } from "@/lib/site";

/**
 * Side-on drawing of a Core Cargo vehicle: white bodywork with the company logo on the side.
 * One drawing per vehicle type, sized so longer vehicles look longer.
 * To use real fleet photos instead, swap this component for an <Image> in VehicleSelector.
 */

const LOGO = "/images/logo-horizontal.png";
const LOGO_RATIO = 1404 / 300;
const GROUND = 180;

function Wheel({ x, r = 19 }: { x: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={GROUND - r} r={r + 4} fill="#c3ccd9" />
      <circle cx={x} cy={GROUND - r} r={r} fill="#1b2330" />
      <circle cx={x} cy={GROUND - r} r={r * 0.55} fill="#aeb8c6" />
      <circle cx={x} cy={GROUND - r} r={r * 0.2} fill="#5b6676" />
    </g>
  );
}

function Logo({ x, y, w }: { x: number; y: number; w: number }) {
  return <image href={LOGO} x={x} y={y} width={w} height={w / LOGO_RATIO} preserveAspectRatio="xMidYMid meet" />;
}

export default function VehicleArt({ kind, size = 0, className = "" }: { kind: VehicleKind; size?: number; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const paint = `url(#body-${uid})`;
  const glass = "#394455";
  const line = "#c3ccd9";
  const x0 = 14;
  let L = 0;
  let art: React.ReactNode = null;

  if (kind === "van") {
    L = [250, 300, 340, 385, 420][size] ?? 385;
    const H = [92, 108, 112, 120, 130][size] ?? 120;
    const r = size === 0 ? 17 : 19;
    const base = GROUND - r + 2;
    const top = base - H;
    const X = (f: number) => x0 + L * f;
    const logoW = L * (size === 0 ? 0.4 : 0.46);
    art = (
      <>
        <path
          d={`M${x0} ${base} V${top + 12} Q${x0} ${top} ${x0 + 14} ${top} H${X(0.66)} Q${X(0.72)} ${top} ${X(0.84)} ${top + H * 0.5} L${X(1) - 8} ${top + H * 0.62} Q${X(1)} ${top + H * 0.66} ${X(1)} ${top + H * 0.76} V${base} Z`}
          fill={paint}
          stroke={line}
          strokeWidth="1.5"
        />
        {/* cab window */}
        <path d={`M${X(0.605)} ${top + 14} H${X(0.675)} L${X(0.8)} ${top + H * 0.47} H${X(0.605)} Z`} fill={glass} />
        {/* door and panel lines */}
        <path d={`M${X(0.585)} ${top + 8} V${base - 4} M${X(0.3)} ${top + 8} V${base - 4}`} stroke={line} strokeWidth="1.2" fill="none" />
        <rect x={x0} y={base - 16} width={L} height="5" fill="#4a5361" />
        <rect x={x0 - 1} y={top + H * 0.5} width="5" height="18" rx="2" fill="#d6453d" />
        <rect x={X(1) - 9} y={top + H * 0.68} width="9" height="7" rx="3" fill="#f3d98b" />
        <rect x={X(1) - 12} y={base - 9} width="14" height="9" rx="3" fill="#2a3340" />
        <Logo x={X(0.07)} y={top + H * 0.2} w={logoW} />
        <Wheel x={X(0.19)} r={r} />
        <Wheel x={X(0.82)} r={r} />
      </>
    );
  } else if (kind === "luton") {
    L = 430;
    const X = (f: number) => x0 + L * f;
    art = (
      <>
        {/* chassis and tail lift */}
        <rect x={x0 + 6} y="148" width={L * 0.72} height="10" fill="#2a3340" />
        <rect x={x0 - 6} y="92" width="6" height="64" rx="2" fill="#8794a6" />
        <rect x={x0 - 8} y="150" width="14" height="5" rx="2" fill="#5b6676" />
        {/* box body with the over-cab pod */}
        <path d={`M${x0} 150 V34 Q${x0} 26 ${x0 + 8} 26 H${X(0.78)} Q${X(0.83)} 26 ${X(0.83)} 40 V74 H${X(0.7)} V150 Z`} fill={paint} stroke={line} strokeWidth="1.5" />
        {/* cab */}
        <path d={`M${X(0.7)} 160 V78 H${X(0.82)} L${X(0.91)} 114 L${X(1) - 8} 122 Q${X(1)} 126 ${X(1)} 134 V160 Z`} fill={paint} stroke={line} strokeWidth="1.5" />
        <path d={`M${X(0.725)} 86 H${X(0.815)} L${X(0.885)} 113 H${X(0.725)} Z`} fill={glass} />
        <rect x={X(1) - 9} y="130" width="9" height="7" rx="3" fill="#f3d98b" />
        <rect x={X(1) - 12} y="152" width="14" height="9" rx="3" fill="#2a3340" />
        <rect x={x0 - 1} y="120" width="5" height="16" rx="2" fill="#d6453d" />
        <Logo x={X(0.08)} y={62} w={L * 0.52} />
        <Wheel x={X(0.2)} />
        <Wheel x={X(0.86)} />
      </>
    );
  } else if (kind === "rigid") {
    L = size === 0 ? 470 : 540;
    const boxH = size === 0 ? 112 : 124;
    const r = size === 0 ? 20 : 23;
    const deck = 146;
    const top = deck - boxH;
    const cabTop = top + boxH * 0.24;
    const X = (f: number) => x0 + L * f;
    art = (
      <>
        <rect x={x0 + 8} y={deck} width={L * 0.8} height="11" fill="#2a3340" />
        <rect x={x0 - 6} y={deck - 60} width="6" height="64" rx="2" fill="#8794a6" />
        <rect x={x0} y={top} width={L * 0.745} height={boxH} rx="5" fill={paint} stroke={line} strokeWidth="1.5" />
        {/* cab-over-engine cab */}
        <path d={`M${X(0.765)} ${GROUND - 20} V${cabTop + 10} Q${X(0.765)} ${cabTop} ${X(0.765) + 10} ${cabTop} H${X(1) - 16} Q${X(1) - 5} ${cabTop} ${X(1) - 3} ${cabTop + 12} L${X(1)} ${cabTop + 62} V${GROUND - 20} Z`} fill={paint} stroke={line} strokeWidth="1.5" />
        <path d={`M${X(1) - 50} ${cabTop + 13} H${X(1) - 15} L${X(1) - 8} ${cabTop + 50} H${X(1) - 50} Z`} fill={glass} />
        <path d={`M${X(1) - 58} ${cabTop + 10} V${GROUND - 24}`} stroke={line} strokeWidth="1.2" fill="none" />
        <rect x={X(1) - 12} y={GROUND - 34} width="14" height="14" rx="3" fill="#2a3340" />
        <rect x={X(1) - 8} y={cabTop + 64} width="8" height="8" rx="3" fill="#f3d98b" />
        <rect x={x0 - 1} y={deck - 20} width="5" height="16" rx="2" fill="#d6453d" />
        <Logo x={X(0.09)} y={top + boxH * 0.27} w={L * 0.5} />
        <Wheel x={X(0.2)} r={r} />
        <Wheel x={X(0.88)} r={r} />
      </>
    );
  } else {
    L = 640;
    const X = (f: number) => x0 + L * f;
    art = (
      <>
        {/* tractor chassis, trailer running gear and landing legs */}
        <rect x={X(0.68)} y="140" width={L * 0.31} height="12" fill="#2a3340" />
        <rect x={x0 + 10} y="138" width={L * 0.3} height="9" fill="#2a3340" />
        <path d={`M${X(0.5)} 138 V168 M${X(0.5) - 7} 168 H${X(0.5) + 7}`} stroke="#5b6676" strokeWidth="4" fill="none" />
        <rect x={x0} y="150" width="12" height="6" rx="2" fill="#5b6676" />
        {/* trailer */}
        <rect x={x0} y="24" width={L * 0.775} height="114" rx="5" fill={paint} stroke={line} strokeWidth="1.5" />
        {/* tractor cab with roof deflector */}
        <path d={`M${X(0.8)} 56 Q${X(0.8)} 30 ${X(0.83)} 28 H${X(0.9)} L${X(0.93)} 56 Z`} fill={paint} stroke={line} strokeWidth="1.5" />
        <path d={`M${X(0.8)} 160 V58 Q${X(0.8)} 50 ${X(0.8) + 8} 50 H${X(1) - 16} Q${X(1) - 5} 50 ${X(1) - 3} 62 L${X(1)} 116 V160 Z`} fill={paint} stroke={line} strokeWidth="1.5" />
        <path d={`M${X(1) - 54} 62 H${X(1) - 15} L${X(1) - 8} 100 H${X(1) - 54} Z`} fill={glass} />
        <path d={`M${X(1) - 62} 58 V156`} stroke={line} strokeWidth="1.2" fill="none" />
        <rect x={X(1) - 12} y="146" width="14" height="14" rx="3" fill="#2a3340" />
        <rect x={X(1) - 8} y="122" width="8" height="9" rx="3" fill="#f3d98b" />
        <rect x={x0 - 1} y="112" width="5" height="18" rx="2" fill="#d6453d" />
        <Logo x={X(0.1)} y={42} w={L * 0.52} />
        <Wheel x={X(0.09)} r={17} />
        <Wheel x={X(0.16)} r={17} />
        <Wheel x={X(0.23)} r={17} />
        <Wheel x={X(0.74)} r={19} />
        <Wheel x={X(0.93)} r={19} />
      </>
    );
  }

  const W = L + 30;
  return (
    <svg viewBox={`0 0 ${W} 196`} className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`body-${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e7ecf3" />
        </linearGradient>
      </defs>
      <ellipse cx={W / 2} cy={GROUND + 3} rx={L * 0.5} ry="7" fill="#0b1220" opacity="0.12" />
      {art}
    </svg>
  );
}
