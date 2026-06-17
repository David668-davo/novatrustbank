interface BankCardProps {
  type: string;
  last4: string;
  name: string;
  expiry: string;
}

export default function BankCard({
  type,
  last4,
  name,
  expiry,
}: BankCardProps) {
  return (
    <div className={`bank-card ${type}`}>
      <div className="bank-card-pattern" />
      <div className="bank-card-pattern2" />

      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div className="bank-card-brand">
            NT
          </div>

          <div
            style={{
              fontSize: 12,
              background:
                "rgba(255,255,255,0.15)",
              padding: "4px 10px",
              borderRadius: 6,
            }}
          >
            VISA
          </div>
        </div>

        <div className="bank-card-chip" />

        <div className="bank-card-number">
          •••• •••• •••• {last4}
        </div>

        <div className="bank-card-bottom">
          <div>
            <div
              style={{
                fontSize: 10,
                opacity: 0.6,
                marginBottom: 2,
              }}
            >
              CARD HOLDER
            </div>

            <div className="bank-card-holder">
              {name}
            </div>
          </div>

          <div className="bank-card-expiry">
            <div
              style={{
                fontSize: 10,
                opacity: 0.6,
                marginBottom: 2,
              }}
            >
              EXPIRES
            </div>

            <div>{expiry}</div>
          </div>
        </div>
      </div>
    </div>
  );
}