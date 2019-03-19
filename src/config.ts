export const config = {
    server: {
        port:  +(process.env.PORT || 3000),
        name: 'users',
    },
    cors: {
        allowedOrigins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:4200'],
    },
};
