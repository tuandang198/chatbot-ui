import dotenv from 'dotenv';

dotenv.config();
const HOST : string = process.env.HOST || '';

export const V1 =  '/v1';
export const BASE_URL =  HOST+V1;
export const CHAT = '/answering_with_context';

