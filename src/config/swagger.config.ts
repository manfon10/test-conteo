import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Usuarios",
    version: "1.0.0",
    description: "API RESTful para la gestión de usuarios con arquitectura limpia",
    contact: {
      name: "Manuel Fonseca",
      email: "manueldazafon@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor de desarrollo",
    },
  ],
  components: {
    schemas: {
      Address: {
        type: "object",
        required: ["street", "city", "country"],
        properties: {
          street: {
            type: "string",
            description: "Nombre de la calle",
            example: "Av. Principal",
          },
          city: {
            type: "string",
            description: "Nombre de la ciudad",
            example: "Lima",
          },
          country: {
            type: "string",
            description: "Nombre del país",
            example: "Perú",
          },
          zip_code: {
            type: "string",
            description: "Código postal",
            example: "15001",
          },
        },
      },
      User: {
        type: "object",
        required: ["name", "email", "address"],
        properties: {
          id: {
            type: "string",
            description: "ID único del usuario",
            example: "60d21b4667d0d8992e610c85",
          },
          name: {
            type: "string",
            description: "Nombre del usuario",
            example: "Manuel Fonseca",
          },
          email: {
            type: "string",
            description: "Email del usuario",
            format: "email",
            example: "manuel@ejemplo.com",
          },
          age: {
            type: "integer",
            description: "Edad del usuario",
            example: 24,
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "Fecha de creación del usuario",
          },
          addresses: {
            type: "array",
            description: "Lista de direcciones del usuario",
            items: {
              $ref: "#/components/schemas/Address",
            },
          },
        },
      },
      UserInput: {
        type: "object",
        required: ["name", "email"],
        properties: {
          name: {
            type: "string",
            description: "Nombre del usuario",
            example: "Manuel Fonsecaz",
          },
          email: {
            type: "string",
            description: "Email del usuario",
            format: "email",
            example: "manuel@ejemplo.com",
          },
          age: {
            type: "integer",
            description: "Edad del usuario",
            example: 24,
          },
          addresses: {
            type: "array",
            description: "Lista de direcciones del usuario",
            items: {
              $ref: "#/components/schemas/Address",
            },
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          statusCode: {
            type: "integer",
            description: "Codigo de estado HTTP",
            example: 404,
          },
          message: {
            type: "string",
            description: "Mensaje de error",
            example: "Usuario no encontrado",
          },
        },
      },
      PaginatedUsers: {
        type: "object",
        properties: {
          last_page: {
            type: "integer",
            description: "última página",
          },
          total_records: {
            type: "integer",
            description: "Total páginas",
          },
          current_page: {
            type: "integer",
            description: "Página actual",
          },
          has_more_pages: {
            type: "integer",
            description: "Páginas disponibles",
          },
          data: {
            type: "array",
            description: "Datos de los usuarios",
            items: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
    },
    parameters: {
      userId: {
        name: "id",
        in: "path",
        required: true,
        description: "ID del usuario",
        schema: {
          type: "string",
        },
      },
      pageParam: {
        name: "page",
        in: "query",
        required: false,
        description: "Número de página",
        schema: {
          type: "integer",
          default: 1,
        },
      },
      limitParam: {
        name: "limit",
        in: "query",
        required: false,
        description: "Cantidad de elementos por página",
        schema: {
          type: "integer",
          default: 10,
        },
      },
      cityParam: {
        name: "city",
        in: "query",
        required: true,
        description: "Ciudad para filtrar usuarios",
        schema: {
          type: "string",
        },
      },
    },
    responses: {
      BadRequest: {
        description: "Solicitud inválida",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
            },
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/presentation/*.routes.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
