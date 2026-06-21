import authorLowRepository from "./authorLowRepository.js";
import authorMongoRepository from "./authorMongoRepository.js";
import "dotenv/config";
const usarMongo = process.env.NODE_ENV === "production";
export const authorRepository = usarMongo ? authorMongoRepository: authorLowRepository;