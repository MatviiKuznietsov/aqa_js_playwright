const config = {
    baseUrl: process.env.BASE_URL ?? 'localhost:3000',
    apiUrl: process.env.API_URL,
    httpCredentials: {
        username: process.env.HTTP_CREDENTIALS_USERNAME,
        password: process.env.HTTP_CREDENTIALS_PASSWORD,
    }
}

export default config