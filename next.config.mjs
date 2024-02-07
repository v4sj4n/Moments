/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SUPABASE_HOST,
        port: '',
        pathname: '/storage/v1/object/public/moment/moments/**',
      },
    ]
  }
};

export default nextConfig;
