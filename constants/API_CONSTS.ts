// import dotenv from 'dotenv';

// dotenv.config();
const HOST : string = process.env.NEXT_PUBLIC_API_URL || '';

export const V1 =  'api/v1/answer';
export const BASE_URL =  HOST+V1;
export const CHAT = '/answering_with_context';

