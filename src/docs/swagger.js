import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerPath = join(__dirname, '../../swagger.yaml'); 

let swaggerDocument;
try {
  swaggerDocument = YAML.load(swaggerPath);
} catch (error) {
  console.error('❌ Erro crítico ao carregar o arquivo swagger.yaml:', error.message);
}

/**
 * Injeta a rota da documentação Swagger UI na aplicação Express.
 * @param {import('express').Express} app - Instância do Express.
 * @param {string} route - Caminho da rota para expor a documentação (Padrão: '/api-docs').
 */
export default function setupDocumentation(app, route = '/api-docs') {
  if (!swaggerDocument) {
    console.warn('⚠️ Swagger UI não pôde ser inicializado devido a falhas no arquivo YAML.');
    return;
  }

  app.use(route, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
