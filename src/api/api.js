const tickersHandlers = new Map();
let socket = null;
const lastUpdateTime = new Map(); 

function buildSocketUrl(tickers) {
  const streams = tickers.map(t => `${t.toLowerCase()}usdt@trade`).join('/');
  return `wss://stream.binance.com:9443/stream?streams=${streams}`;
}

function connectToBinanceSocket() {
  if (socket) {
    socket.close();
  }

  const tickers = Array.from(tickersHandlers.keys());
  if (tickers.length === 0) return;

  socket = new WebSocket(buildSocketUrl(tickers));

  socket.addEventListener("message", (event) => {
    const { data } = JSON.parse(event.data);
    const fullSymbol = data.s; 
    const symbol = fullSymbol.replace("USDT", ""); 
    const price = Number(data.p);

    const handlers = tickersHandlers.get(symbol);
    if (!handlers) return;

    const now = Date.now();
    const last = lastUpdateTime.get(symbol) || 0;

    if (now - last >= 2000) { 
      handlers.forEach(fn => fn(price));
      lastUpdateTime.set(symbol, now);
    }
  });

  socket.addEventListener("error", (e) => {
    console.error("Binance socket error:", e);
  });

  socket.addEventListener("close", () => {
    console.warn("🔌 Binance socket closed");
  });
}

export const subscribeToTicker = (ticker, cb) => {
  const normalized = ticker.toUpperCase();
  const subscribers = tickersHandlers.get(normalized) || [];
  tickersHandlers.set(normalized, [...subscribers, cb]);

  connectToBinanceSocket();
};

export const unsubscribeFromTicker = (ticker) => {
  const normalized = ticker.toUpperCase();
  tickersHandlers.delete(normalized);

  connectToBinanceSocket();
};
