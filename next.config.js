/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_CLUSTER: process.env.REACT_APP_CLUSTER,
  },
  images: {
    domains: [
      'kajabi-storefronts-production.kajabi-cdn.com',
      'upload.wikimedia.org',
      'i.ytimg.com',
      'angartwork.akamaized.net',
      'i.scdn.co',                                                // Added the host name. This and below 2. 
      'resources.tidal.com',                                      // It is neccessary to add the hostname from which the image is been served.
      'encrypted-tbn1.gstatic.com',
      'encrypted-tbn0.gstatic.com'                             
    ],
  },
}

module.exports = nextConfig
