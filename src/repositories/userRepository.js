import userLowRepository from './userLowRepository.js';
import userMongoRepository from './userMongoRepository.js';
import 'dotenv/config';
const usarMongo = process.env.NODE_ENV === "production";
export const userRepository = usarMongo ? userMongoRepository: userLowRepository;