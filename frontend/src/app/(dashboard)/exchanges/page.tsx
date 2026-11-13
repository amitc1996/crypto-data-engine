
const exchanges = [
  { name: "Binance", markets: "Spot, Futures" },
  { name: "Bybit", markets: "Spot, Futures" },
  { name: "OKX", markets: "Spot, Futures" },
  { name: "Coinbase", markets: "Spot" },
];

export default function ExchangesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Exchanges
        </h1>
        <p className="mt-1 text-slate-400">
          Manage supported cryptocurrency exchanges
        </p>
      </div>

      <div className="space-y-3">
        {exchanges.map((exchange) => (
          <div
            key={exchange.name}
            className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-5"
          >
            <div>
              <h2 className="font-semibold">
                {exchange.name}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {exchange.markets}
              </p>
            </div>

            <span className="rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-300">
              Configuration pending
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
