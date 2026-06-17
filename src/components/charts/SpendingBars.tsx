interface SpendingBarItem {
  label: string;
  val: number;
  active?: boolean;
}

interface SpendingBarsProps {
  data: SpendingBarItem[];
}

export default function SpendingBars({
  data,
}: SpendingBarsProps) {
  const max = Math.max(...data.map((d) => d.val));

  return (
    <div className="spend-bar">
      {data.map((d, i) => (
        <div key={i} className="spend-col">
          <div
            className="spend-bar-fill"
            style={{
              height: `${(d.val / max) * 80}px`,
              background: d.active
                ? "linear-gradient(180deg,#1A56DB,#0891B2)"
                : "#E2E8F0",
            }}
          />
          <span className="spend-month">{d.label}</span>
        </div>
      ))}
    </div>
  );
}