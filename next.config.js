/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['pdf-lib'], // Just in case, though pdf-lib is usually fine
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
    async rewrites() {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://achievers-summit-backend.vercel.app';
        return [
            {
                source: '/api/tickets/:path*',
                destination: `${apiUrl}/api/tickets/:path*`,
            },
            {
                source: '/api/bookings/:path*',
                destination: `${apiUrl}/api/bookings/:path*`,
            },
            {
                source: '/api/speakers/:path*',
                destination: `${apiUrl}/api/speakers/:path*`,
            },
            {
                source: '/api/payments/:path*',
                destination: `${apiUrl}/api/payments/:path*`,
            },
            {
                source: '/api/paystack/:path*',
                destination: `${apiUrl}/api/paystack/:path*`,
            },
            {
                source: '/api/faq/:path*',
                destination: `${apiUrl}/api/faq/:path*`,
            },
            {
                source: '/api/units/:path*',
                destination: `${apiUrl}/api/units/:path*`,
            },
            {
                source: '/api/institutions/:path*',
                destination: `${apiUrl}/api/institutions/:path*`,
            },
            {
                source: '/api/ambassador-status/:path*',
                destination: `${apiUrl}/api/ambassador-status/:path*`,
            },
            {
                source: '/api/community/:path*',
                destination: `${apiUrl}/api/community/:path*`,
            },
            {
                source: '/api/popups',
                destination: `${apiUrl}/api/popups`,
            },
        ];
    },
}

module.exports = nextConfig
