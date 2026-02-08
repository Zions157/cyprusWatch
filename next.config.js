const nextConfig = {
  // Turbopack aktif (Next.js 16 default)
  turbopack: {},
  
  // MongoDB ve diğer external packages
  serverExternalPackages: ['mongodb'],
  
  // Diğer ayarlar
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig