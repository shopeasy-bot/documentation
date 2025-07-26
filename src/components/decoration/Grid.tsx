import { useId } from "react";
import { cn } from "@/lib/cn";

interface GridProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  squares?: Array<[x: number, y: number]>;
  strokeDasharray?: string;
  strokeWidth?: number;
  showGrid?: boolean;
  showSquares?: boolean;
  gridColor?: string;
  squareColor?: string;
  squareOpacity?: number;
  [key: string]: unknown;
}

export function GridDecoration({
  width = 40,
  height = 40,
  x = 0,
  y = 0,
  strokeDasharray = "0",
  strokeWidth = 1,
  squares,
  className,
  showGrid = true,
  showSquares = true,
  gridColor = "rgba(156, 163, 175, 0.3)", // gray-400/30
  squareColor = "rgba(156, 163, 175, 0.5)",
  squareOpacity = 0.5,
  ...props
}: GridProps) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      {...props}
    >
      <defs>
        {showGrid && (
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <path
              d={`M0 ${height}V0H${width}`}
              fill="none"
              stroke={gridColor}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
            />
          </pattern>
        )}
      </defs>

      {showGrid && (
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill={`url(#${id})`}
        />
      )}

      {showSquares && squares?.length && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy]) => (
            <rect
              key={`${sx}-${sy}`}
              width={width - 2}
              height={height - 2}
              x={sx * width + 1}
              y={sy * height + 1}
              fill={squareColor}
              opacity={squareOpacity}
              strokeWidth={0}
              rx={2}
              ry={2}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
