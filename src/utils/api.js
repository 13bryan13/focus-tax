// Fetch product list from FakeStore
export const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  };
  
  // Fetch BTC price from CoinGecko
  export const fetchBTCPrice = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );
    if (!res.ok) throw new Error("Failed to fetch BTC price");
    const data = await res.json();
    return data.bitcoin.usd;
  };
  