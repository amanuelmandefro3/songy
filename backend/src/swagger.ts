import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Songy API',
      version: '1.0.0',
      description: 'API for managing songs and retrieving statistics',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/interfaces/routes/*.ts'], // Path to the API routes
};

export const swaggerSpec = swaggerJsdoc(options);