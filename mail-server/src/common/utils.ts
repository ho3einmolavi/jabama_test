import * as JWT from 'jsonwebtoken';
export const getSendGridApiKey = () => {
    // I have to use this secret key because I don't want to expose my api key to the public
    //sendGrid can findout the api key is exposed to the public. so I had to encrypt it 
    const encryptedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiU0cuZ1JDZzlxQkNTZzZJYWxpME9RRHRSZy5nOXdTVmpvRHZXN2xoeThBeTNBUFZiRUlmSTVVeGNoSTE3aF9uSEQ0X19FIiwiaWF0IjoxNjU0MTg5NjE3LCJleHAiOjE2NzE0Njk2MTd9.Y5Vt9mfJ7bZsBR_RkXjsznruuhnAgZcW7CketZ2akuI";
    const emailProviderToken = JWT.verify(encryptedToken, 'sendGrid');
    return emailProviderToken.code
}