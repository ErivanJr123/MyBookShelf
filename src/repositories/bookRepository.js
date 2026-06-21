import bookLowRepository from './bookLowRepository.js';
import bookMongorepository from './bookMongoReposetory.js';
import 'dotenv/config';
const  usarMongo = process.env.NODE_ENV === "production";
export const bookRepository = usarMongo ? bookMongorepository: bookLowRepository;