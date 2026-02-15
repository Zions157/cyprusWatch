const nextConfig = {
  // Turbopack aktif (Next.js 16 default)
  turbopack: {},
  
  // MongoDB ve diğer external packages
  serverExternalPackages: ['mongodb'],
  
  // Diğer ayarlar
  reactStrictMode: true,
}

module.exports = nextConfig