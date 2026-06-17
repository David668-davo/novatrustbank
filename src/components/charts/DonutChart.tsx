interface Segment {
  pct: number;
}

interface DonutChartProps {
  segments: Segment[];
}

export default function DonutChart({
  segments,
}: DonutChartProps) {
  const size = 130;
  const cx = 65;
  const cy = 65;
  const r = 48;
  const stroke = 18;

  const circ = 2 * Math.PI * r;

  let offset = 0;

  const colors = [
    "#1A56DB",
    "#0891B2",
    "#059669",
    "#D97706",
    "#7C3AED",
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      {segments.map((seg, i) => {
        const dash = (seg.pct / 100) * circ;
        const gap = circ - dash;

        const circle = (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={colors[i]}
            strokeWidth={stroke}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={
              (-offset * circ) / 100 + circ * 0.25
            }
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        );

        offset += seg.pct;

        return circle;
      })}

      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill="#0F172A"
      >
        100%
      </text>

      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        fontSize="10"
        fill="#64748B"
      >
        Allocated
      </text>
    </svg>
  );
}