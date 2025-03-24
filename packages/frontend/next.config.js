import dotenv from 'dotenv';
dotenv.config({ path: ".env.frontend" });
console.log(process.env.NEXT_PUBLIC_API_URL);
const nextConfig = {
    async rewrites() {
      return [
        {
            source: '/api/:path*',
            destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`
          },
      ];
    },
  };
  

export default nextConfig;