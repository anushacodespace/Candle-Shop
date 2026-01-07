"use client";

export default function SeedPage() {
  // 👉 SEED FESTIVAL PRODUCTS
  const insertFestival = async () => {
    const products = [
      {
        name: "Diya Glow Candle",
        slug: "diya-glow-candle",
        price: 449,
        description: "Warm golden festival diya candle — perfect for celebrations.",
        image: "/images/festival_candle_1_800.png",
        stock: 20,
        category: "Festival Candles",
      },
      {
        name: "Festive Floral Candle",
        slug: "festive-floral-candle",
        price: 499,
        description: "Hand-poured floral candle with soft festive fragrance.",
        image: "/images/festival_candle_2_800.png",
        stock: 18,
        category: "Festival Candles",
      },
      {
        name: "Golden Ritual Candle",
        slug: "golden-ritual-candle",
        price: 599,
        description: "Premium decorative candle inspired by traditional rituals.",
        image: "/images/festival_candle_3_800.png",
        stock: 15,
        category: "Festival Candles",
      },
      {
        name: "Festival Aura Candle",
        slug: "festival-aura-candle",
        price: 549,
        description: "Aromatic candle that brightens homes during celebrations.",
        image: "/images/festival_candle_4_800.png",
        stock: 22,
        category: "Festival Candles",
      },
    ];

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(products),
    });

    alert("Festival products inserted!");
  };

  // 👉 SEED CALM PRODUCTS
  const insertCalm = async () => {
    const products = [
      {
        name: "Lavender Calm Candle",
        slug: "lavender-calm-1",
        price: 399,
        description: "Lavender aroma for deep relaxation.",
        image: "/images/calm1.png",
        stock: 16,
        category: "Calm Candles",
      },
      {
        name: "Ocean Calm Candle",
        slug: "ocean-calm-2",
        price: 449,
        description: "Soft waves fragrance for peaceful nights.",
        image: "/images/calm2.png",
        stock: 18,
        category: "Calm Candles",
      },
      {
        name: "Zen Meditation Candle",
        slug: "zen-calm-3",
        price: 499,
        description: "Perfect for meditation and yoga sessions.",
        image: "/images/calm3.png",
        stock: 20,
        category: "Calm Candles",
      },
    ];

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(products),
    });

    alert("Calm products inserted!");
  };

  // 👉 SEED DECOR / AESTHETIC PRODUCTS
  const insertDecor = async () => {
    const products = [
      {
        name: "Marble Pillar Candle",
        slug: "marble-pillar-candle",
        price: 799,
        description: "Elegant marble-textured decor candle",
        image: "/images/decor_candle_1.png",
        stock: 20,
        category: "Decor Candles",
      },
      {
        name: "Glass Dome Candle",
        slug: "glass-dome-candle",
        price: 899,
        description: "Luxury candle inside protective glass dome",
        image: "/images/decor_candle_2.png",
        stock: 18,
        category: "Decor Candles",
      },
      {
        name: "Vintage Gold Candle",
        slug: "vintage-gold-candle",
        price: 699,
        description: "Antique-style decor candle with golden finish",
        image: "/images/decor_candle_3.png",
        stock: 25,
        category: "Decor Candles",
      },
      {
        name: "Rustic Wooden Candle",
        slug: "rustic-wooden-candle",
        price: 649,
        description: "Candle wrapped with natural wooden decor ring",
        image: "/images/decor_candle_4.png",
        stock: 22,
        category: "Decor Candles",
      },
      {
        name: "Crystal Jar Candle",
        slug: "crystal-jar-candle",
        price: 799,
        description: "Premium crystal glass candle for home decor",
        image: "/images/decor_candle_5.png",
        stock: 15,
        category: "Decor Candles",
      },
      {
        name: "Pearl White Candle",
        slug: "pearl-white-candle",
        price: 599,
        description: "Minimal aesthetic candle with pearl finish",
        image: "/images/decor_candle_6.png",
        stock: 19,
        category: "Decor Candles",
      },
      {
        name: "Designer Cage Candle",
        slug: "designer-cage-candle",
        price: 999,
        description: "Decor candle enclosed inside a designer cage",
        image: "/images/decor_candle_7.png",
        stock: 14,
        category: "Decor Candles",
      },
      {
        name: "Boho Rope Candle",
        slug: "boho-rope-candle",
        price: 549,
        description: "Bohemian decorative candle with rope wrap",
        image: "/images/decor_candle_8.png",
        stock: 24,
        category: "Decor Candles",
      },
      {
        name: "Flower Jar Candle",
        slug: "flower-jar-candle",
        price: 749,
        description: "Glass jar candle with floral top decor",
        image: "/images/decor_candle_9.png",
        stock: 16,
        category: "Decor Candles",
      },
      {
        name: "Luxury Metal Jar Candle",
        slug: "luxury-metal-candle",
        price: 999,
        description: "Premium metal container candle — statement decor",
        image: "/images/decor_candle_10.png",
        stock: 12,
        category: "Decor Candles",
      },
    ];

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(products),
    });

    alert("Decor products inserted!");
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Seed Products</h2>

      <button onClick={insertFestival}>Seed Festival Candles</button>
      <br /><br />

      <button onClick={insertCalm}>Seed Calm Candles</button>
      <br /><br />

      <button onClick={insertDecor}>Seed Decor Candles</button>
    </div>
  );
}
