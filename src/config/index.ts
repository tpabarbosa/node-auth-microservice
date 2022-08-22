const config = {
    PORT: process.env.APP_PORT || process.env.PORT || 5005,
    HOST: process.env.APP_HOST || 'localhost',
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    AUTH_SERVICE_EMAIL:
        process.env.AUTH_SERVICE_EMAIL || 'service@service.email.com',
    AUTH_SERVICE_PASSWORD: process.env.AUTH_SERVICE_PASSWORD || '12345678',
};

export default config;
