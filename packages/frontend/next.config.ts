// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = { 
  images: {
    domains: ["cdn.discordapp.com"]
  },
  async rewrites() {
    // Hole die URL deines Backends aus einer SERVER-SEITIGEN Umgebungsvariable.
    // Diese Variable sollte NICHT mit NEXT_PUBLIC_ beginnen!
    // Beispiel: INTERNAL_BACKEND_URL=http://eve-backend:4000 (in .env.local/.env.production)
    const backendUrl = process.env.INTERNAL_BACKEND_URL;

    // Es ist gut, einen Fallback oder eine Warnung zu haben, falls die Variable nicht gesetzt ist
    return [
      {
        source: '/api/backend/:path*', 
        // ...werden intern an dein Backend weitergeleitet, wobei der Pfad übernommen wird.
        destination: `${backendUrl}/:path*`, 
      },
    ];
  },

};

export default nextConfig;