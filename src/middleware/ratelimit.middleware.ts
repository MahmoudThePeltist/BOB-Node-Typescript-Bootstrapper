import rateLimit from 'express-rate-limit';

const numberOfRequests: number = 120;
const minutes: number = 1;

const rateLimiter = rateLimit({
  windowMs: minutes * 60 * 1000, // number in milliseconds
  max: numberOfRequests,
  message: `You have exceeded the ${numberOfRequests} requests per ${minutes} min limit.`, 
  headers: true,
});

export default rateLimiter;