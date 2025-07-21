import { useState, useEffect } from "react";
import Galaxy from "./components/Galaxy";

const domains = {
  premium: [
    { name: "starparty.ai", price: "$6K – $15K" },
    { name: "wordcoin.ai", price: "$5K – $12K" },
    { name: "yieldpunk.com", price: "$4K – $10K" },
    { name: "wallgraphics.art", price: "$1K – $3K" },
    { name: "skullform.com", price: "$1.5K – $5K" }
  ],
  mid: [
    { name: "thinkazoo.com", price: "$1K – $4K" },
    { name: "fridayify.com", price: "$1K – $3K" },
    { name: "fridayified.com", price: "$1K – $3K" },
    { name: "protonfield.com", price: "$800 – $2.5K" },
    { name: "honorism.com", price: "$700 – $2K" },
    { name: "jaxencoin.com", price: "$700 – $2K" }
  ],
  moderate: [
    { name: "agent-army.com", price: "$200 – $500" },
    { name: "spragent.com", price: "$200 – $500" },
    { name: "spongeagent.com", price: "$200 – $500" },
    { name: "operator512.com", price: "$200 – $500" },
    { name: "gearaz.com", price: "$200 – $500" },
    { name: "localbrandpro.com", price: "$200 – $500" },
    { name: "peopleorchestra.com", price: "$200 – $500" },
    { name: "otter-mate.com", price: "$200 – $500" },
    { name: "promptomato.com", price: "$200 – $500" },
    { name: "pre-prompt.com", price: "$200 – $500" }
  ]
};

function GlassCard({ name, price, category }: { name: string; price: string; category: string }) {
  const borderClass =
    category === "premium" ? "border-premium" :
    category === "mid" ? "border-mid" : "border-moderate";

const btnGradient =
  category === "premium"
    ? "bg-gradient-to-r from-cyan-400 to-blue-500 btn-premium"
    : category === "mid"
    ? "bg-gradient-to-r from-indigo-400 to-indigo-600 btn-mid"
    : "bg-gradient-to-r from-teal-400 to-emerald-500 btn-moderate";

  return (
    <div className={`glass border-animate ${borderClass} p-6 text-center hover:scale-105 transition`}>
      <h3 className="text-2xl font-bold">{name}</h3>
      <p className="text-gray-300 mt-2">{price}</p>
      <a
        href={`mailto:Adam@thinkazoo.com?subject=${name} Inquiry`}
        className={`inline-block mt-4 px-5 py-3 rounded-xl bg-gradient-to-r ${btnGradient} text-white font-bold`}
      >
        Inquire Now
      </a>
    </div>
  );
}

function ThemeToggle({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={toggleTheme}
        className="glass flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all"
      >
        {theme === "dark" ? (
          <span className="text-yellow-300 text-2xl">☀️</span>
        ) : (
          <span className="text-blue-500 text-2xl">🌙</span>
        )}
      </button>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Galaxy />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      <div className="relative z-10 container mx-auto px-6 py-16">
        <h1 className="text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          Premium Domains Marketplace
        </h1>

        {/* Premium */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">Premium Domains</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.premium.map((d) => (
              <GlassCard key={d.name} name={d.name} price={d.price} category="premium" />
            ))}
          </div>
        </section>

        {/* Mid-Tier */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-purple-400">Mid-Tier Domains</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.mid.map((d) => (
              <GlassCard key={d.name} name={d.name} price={d.price} category="mid" />
            ))}
          </div>
        </section>

        {/* Moderate */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-lime-400">Other Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.moderate.map((d) => (
              <GlassCard key={d.name} name={d.name} price={d.price} category="moderate" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}