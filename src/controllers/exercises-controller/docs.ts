const docs = {
  fetchAll: {
    schema: {
      summary: "Retrieve all Exercises",
      description: "Retrieve all Exercises",
      tags: ["Exercise"],
      headers: { authorization: { type: "string" } },
      response: {
        200: {
          description: "Returns Exercises",
          type: "array",
          items: {
            properties: {
              id: { type: "number" },
              type: { type: "string" },
              name: { type: "string" },
              description: { type: "string" },
              videoLink: { type: "string" },
              videoThumbnail: { type: "string" },
            },
          },
        },
      },
    },
  },
  fetchById: {
    schema: {
      summary: "Retrieve a Exercise by ID",
      description: "Retrieve a Exercise by ID",
      tags: ["Exercise"],
      headers: { authorization: { type: "string" } },
      params: {
        type: "object",
        properties: { id: { type: "string", description: "Exercise ID" } },
      },
      response: {
        200: {
          description: "Returns Exercise",
          type: "object",
          properties: {
            id: { type: "number" },
            type: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            videoLink: { type: "string" },
            videoThumbnail: { type: "string" },
          },
        },
      },
    },
  },
  create: {
    schema: {
      summary: "Create a new Exercise",
      description: "Create a new Exercise",
      tags: ["Exercise"],
      headers: { authorization: { type: "string" } },
      body: {
        type: "object",
        properties: {
          type: { type: "string" },
          name: { type: "string" },
          description: { type: "string" },
          videoLink: { type: "string" },
          videoThumbnail: { type: "string" },
        },
      },
    },
  },
  update: {
    schema: {
      summary: "Update a Exercise",
      description: "Update a Exercise",
      tags: ["Exercise"],
      headers: { authorization: { type: "string" } },
      body: {
        type: "object",
        properties: {
          id: { type: "number" },
          type: { type: "string" },
          name: { type: "string" },
          description: { type: "string" },
          videoLink: { type: "string" },
          videoThumbnail: { type: "string" },
        },
      },
    },
  },
  delete: {
    schema: {
      summary: "Remove a Exercise",
      description: "Remove a Exercise",
      tags: ["Exercise"],
      headers: { authorization: { type: "string" } },
      params: {
        type: "object",
        properties: { id: { type: "string", description: "Exercise ID" } },
      },
    },
  },
};
export default docs;
