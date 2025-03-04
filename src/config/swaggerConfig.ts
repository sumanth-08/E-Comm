const swaggerDocs = {
  openapi: "3.0.0",
  info: {
    title: "E-Comm",
    version: "1.0.0",
    description: "API documentation",
  },

  paths: {
    // auth
    "/api/auth/signup": {
      post: {
        summary: "Register a new user",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "user@test.com" },
                  password: { type: "string", example: "Qwerty@123" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: { description: "Everything worked as expected" },
          201: { description: "User already exists" },
          202: { description: "Validation Error" },
          500: { description: "Something went wrong, try again" },
        },
      },
    },
    "/api/auth/signin": {
      post: {
        summary: "Login",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", example: "user@example.com" },
                  password: { type: "string", example: "securePassword123" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: { description: "Everything worked as expected" },
          203: { description: "User Data not found" },
          202: { description: "Validation Error" },
          500: { description: "Something went wrong, try again" },
        },
      },
    },

    // category
    "/api/category/add": {
      post: {
        summary: "Create a new category",
        tags: ["Category"],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Electronics" },
                  description: { type: "string", example: "Category for electronic products" },
                },
                required: ["name", "description"],
              },
            },
          },
        },
        responses: {
          200: { description: "Everything worked as expected" },
          202: { description: "Validation error" },
          500: { description: "Something went wrong, try again" },
        },
      },
    },

    "/api/category/list": {
      get: {
        summary: "Get all categories",
        tags: ["Category"],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: "Everything worked as expected",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    responseCode: { type: "integer", example: 200 },
                    responseMessage: { type: "string", example: "Everything worked as expected" },
                    responseData: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          category_id: { type: "string", example: "011574d1-9bb7-4f4e-8fa1-e5f9286be7a5" },
                          name: { type: "string", example: "Laptop" },
                          description: { type: "string", example: "High-performance laptop" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: { description: "Something went wrong, try again" },
        },
      },
    },

    "/api/category/update/{id}": {
      put: {
        summary: "Update an existing category",
        tags: ["Category"],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              example: "64fabc1234567890abcdef",
            },
            description: "Category ID to update",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Updated Electronics" },
                  description: { type: "string", example: "Updated category for electronic products" },
                },
                required: ["name", "description"],
              },
            },
          },
        },
        responses: {
          200: { description: "Everything worked as expected" },
          202: { description: "Validation error" },
          500: { description: "Something went wrong, try again" },
        },
      },
    },

    "/api/category/delete/{id}": {
      delete: {
        summary: "Delete a category",
        tags: ["Category"],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              example: "64fabc1234567890abcdef",
            },
            description: "Category ID to delete",
          },
        ],
        responses: {
          200: { description: "Everything worked as expected" },
          500: { description: "Something went wrong, try again" },
        },
      },
    },

    // product
    "/api/product/add": {
      post: {
        summary: "Add a new product",
        tags: ["Products"],
        security: [{ BearerAuth: [] }], // If authentication is required
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Laptop" },
                  description: { type: "string", example: "High-performance laptop" },
                  price: { type: "number", example: 999.99 },
                  stock: { type: "number", example: 1 },
                  categoryId: { type: "string", example: "64fabc1234567890abcdef" },
                  image: { type: "string", format: "binary" },
                },
                required: ["name", "price", "stock", "categoryId"],
              },
            },
          },
        },
        responses: {
          200: { description: "Everything worked as expected" },
          202: { description: "Validation error" },
          203: { description: "Category not found" },
          500: { description: "Something went wrong, try again" },
        },
      },
    },

    "/api/product/list": {
      get: {
        summary: "Get a list of products",
        tags: ["Products"],
        security: [{ BearerAuth: [] }], // If authentication is required
        parameters: [
          {
            in: "query",
            name: "page",
            schema: { type: "integer", example: 1 },
            description: "Page number for pagination (default: 1)",
          },
          {
            in: "query",
            name: "limit",
            schema: { type: "integer", example: 10 },
            description: "Number of items per page (default: 10)",
          },
          {
            in: "query",
            name: "price_range",
            schema: {
              type: "array",
              items: { type: "string", example: "100-500" },
            },
            description: "Filter products by price range (e.g., '100-500')",
          },
          {
            in: "query",
            name: "search",
            schema: { type: "string", example: "laptop" },
            description: "Search products by name or description",
          },
          {
            in: "query",
            name: "category",
            schema: { type: "string", example: "Electronics" },
            description: "Filter products by category",
          },
        ],
        responses: {
          200: {
            description: "Everything worked as expected",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    responseCode: { type: "integer", example: 200 },
                    responseMessage: { type: "string", example: "Everything worked as expected" },
                    responseData: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          product_id: { type: "string", example: "ebd0e2ce-e52b-413d-8895-538ed820078d" },
                          name: { type: "string", example: "Laptop" },
                          description: { type: "string", example: "High-performance laptop" },
                          price: { type: "number", example: 1200.99 },
                          stock: { type: "integer", example: 1 },
                          imageUrl: { type: "string", nullable: true, example: null },
                          categoryInfo: {
                            type: "object",
                            properties: {
                              category_id: { type: "string", example: "98653b11-c6e7-4f38-a47c-d2109f788674" },
                              name: { type: "string", example: "Electronics" },
                              description: { type: "string", example: "Updated category for electronic products" },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: { description: "Something went wrong, try again" },
        },
      },
    },

    "/api/product/update/{id}": {
      put: {
        summary: "Update an existing Product",
        tags: ["Products"],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              example: "64fabc1234567890abcdef",
            },
            description: "Product ID to update",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Laptop" },
                  description: { type: "string", example: "High-performance laptop" },
                  price: { type: "number", example: 999.99 },
                  stock: { type: "number", example: 1 },
                  categoryId: { type: "string", example: "64fabc1234567890abcdef" },
                },
                required: ["name", "price", "stock", "categoryId"],
              },
            },
          },
        },
        responses: {
          200: { description: "Everything worked as expected" },
          202: { description: "Validation error" },
          500: { description: "Something went wrong, try again" },
        },
      },
    },
    "/api/product/delete/{id}": {
      delete: {
        summary: "Delete a Product",
        tags: ["Products"],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              example: "64fabc1234567890abcdef",
            },
            description: "Product ID to delete",
          },
        ],
        responses: {
          200: { description: "Everything worked as expected" },
          500: { description: "Something went wrong, try again" },
        },
      },
    },

    // cart
    "/api/cart/add": {
      post: {
        summary: "Add product to cart",
        tags: ["Cart"],
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  quantity: { type: "integer" },
                  productId: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Everything worked as expected" },
          201: { description: "Product already exists in cart" },
          203: { description: "Product not found" },
          202: { description: "Validation error" },
          500: { description: "Something went wrong, try again" },
        },
      },
    },

    "/api/cart/list": {
      get: {
        summary: "Get cart item",
        tags: ["Cart"],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: "Everything worked as expected",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    responseCode: { type: "integer", example: 200 },
                    responseMessage: { type: "string", example: "Everything worked as expected" },
                    responseData: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          cart_id: { type: "string", example: "ebd0e2ce-e52b-413d-8895-538ed820078d" },
                          quantity: { type: "integer", example: 5 },
                          price: { type: "number", example: 1200.99 },
                          stock: { type: "integer", example: 1 },
                          productId: { type: "string", example: "e864dfdc-14c3-4b4c-95ee-19028429af39" },
                          userId: { type: "string", example: "4e2c784b-8c46-466e-8cec-5d5b18efe974" },
                          productInfo: {
                            type: "object",
                            properties: {
                              product_id: { type: "string", example: "98653b11-c6e7-4f38-a47c-d2109f788674" },
                              name: { type: "string", example: "Electronics" },
                              description: { type: "string", example: "Updated category for electronic products" },
                              price: { type: "number", example: 1200.99 },
                              stock: { type: "integer", example: 1 },
                              imageUrl: { type: "string", nullable: true, example: null },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: { description: "Something went wrong, try again" },
        },
      },
    },

    "/api/cart/remove/{id}": {
      delete: {
        summary: "Remove Cart item",
        tags: ["Cart"],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
              example: "64fabc1234567890abcdef",
            },
            description: "Cart item removed",
          },
        ],
        responses: {
          200: { description: "Everything worked as expected" },
          500: { description: "Something went wrong, try again" },
        },
      },
    },

    "/api/orders/place": {
      post: {
        summary: "Place an order",
        tags: ["Orders"],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  payment_type: { type: "integer", example: 1 },
                },
                required: ["payment_type"],
              },
            },
          },
        },
        responses: {
          200: { description: "Everything worked as expected" },
          202: { description: "Validation error" },
          203: { description: "Cart data not found" },
          500: { description: "Something went wrong, try again" },
        },
      },
    },

    "/api/orders/history": {
      get: {
        summary: "Order history",
        tags: ["Orders"],
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: "Everything worked as expected",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    responseCode: { type: "integer", example: 200 },
                    responseMessage: { type: "string", example: "Everything worked as expected" },
                    responseData: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          order_id: { type: "string", example: "ebd0e2ce-e52b-413d-8895-538ed820078d" },
                          total_amt: { type: "integer", example: "1200.99" },
                          payment_type: { type: "string", example: "online" },
                          createdAt: { type: "string", example: "2025-03-04T10:31:44.131Z" },
                          order_date: { type: "string", example: "Mar 4, 2025" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: { description: "Something went wrong, try again" },
        },
      },
    },
  },
};

export default swaggerDocs;
