"use client";

import * as React from "react";
import { createMap } from "piri";
import { cn } from "@/lib/utils";

/**
 * Dotted world map, adapted from Magic UI's Dotted Map (MIT, https://magicui.design/docs/components/dotted-map).
 * The map is drawn with the maintained `piri` package (the successor to `svg-dotted-map`). Markers pulse only when
 * asked to, because a ping on every pin is decoration. Pass real places only.
 */
export interface Marker {
  lat: number;
  lng: number;
  size?: number;
  pulse?: boolean;
  label?: string;
}

type MapMarker = Omit<Marker, "lat" | "lng"> & { x: number; y: number };

export interface DottedMapProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  mapSamples?: number;
  markers?: Marker[];
  dotColor?: string;
  markerColor?: string;
  dotRadius?: number;
  stagger?: boolean;
  pulse?: boolean;
  renderMarkerOverlay?: (args: { marker: MapMarker; index: number; x: number; y: number; r: number }) => React.ReactNode;
}

export function DottedMap({
  width = 150,
  height = 75,
  mapSamples = 5000,
  markers = [],
  dotColor = "currentColor",
  markerColor = "#2f5f8a",
  dotRadius = 0.2,
  stagger = true,
  pulse = false,
  renderMarkerOverlay,
  className,
  style,
  ...svgProps
}: DottedMapProps) {
  const { points, addMarkers } = React.useMemo(() => createMap({ width, height, mapSamples }), [width, height, mapSamples]);
  const processed = addMarkers(markers as unknown as Parameters<typeof addMarkers>[0]) as unknown as MapMarker[];

  const { xStep, yToRow } = React.useMemo(() => {
    const sorted = [...points].sort((a, b) => a.y - b.y || a.x - b.x);
    const rows = new Map<number, number>();
    let step = 0;
    let prevY = Number.NaN;
    let prevX = Number.NaN;
    for (const p of sorted) {
      if (p.y !== prevY) {
        prevY = p.y;
        prevX = Number.NaN;
        if (!rows.has(p.y)) rows.set(p.y, rows.size);
      }
      if (!Number.isNaN(prevX)) {
        const d = p.x - prevX;
        if (d > 0) step = step === 0 ? d : Math.min(step, d);
      }
      prevX = p.x;
    }
    return { xStep: step || 1, yToRow: rows };
  }, [points]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={cn("text-ink/20", className)} style={{ width: "100%", height: "100%", ...style }} {...svgProps}>
      {points.map((p, i) => {
        const row = yToRow.get(p.y) ?? 0;
        const dx = stagger && row % 2 === 1 ? xStep / 2 : 0;
        return <circle key={`${p.x}-${p.y}-${i}`} cx={p.x + dx} cy={p.y} r={dotRadius} fill={dotColor} />;
      })}

      {processed.map((marker, i) => {
        const row = yToRow.get(marker.y) ?? 0;
        const dx = stagger && row % 2 === 1 ? xStep / 2 : 0;
        const x = marker.x + dx;
        const y = marker.y;
        const r = marker.size ?? dotRadius;
        const pings = pulse ? marker.pulse !== false : marker.pulse === true;
        return (
          <g key={`${marker.x}-${marker.y}-${i}`}>
            <circle cx={x} cy={y} r={r} fill={markerColor} />
            {pings ? (
              <circle cx={x} cy={y} r={r} fill="none" stroke={markerColor} strokeWidth={0.3} pointerEvents="none">
                <animate attributeName="r" values={`${r};${r * 2.8}`} dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0" dur="1.8s" repeatCount="indefinite" />
              </circle>
            ) : null}
            {renderMarkerOverlay?.({ marker: { ...marker, x, y }, index: i, x, y, r })}
          </g>
        );
      })}
    </svg>
  );
}
