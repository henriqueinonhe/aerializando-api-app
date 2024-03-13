const docs = {
  fetchAll: {
    schema: {
      summary: "Retrieve all Tricks",
      description: "Retrieve all Tricks",
      tags: ["Trick"],
      headers: {
        authorization: {
          type: "string",
        },
      },
      response: {
        200: {
          description: "Returns Tricks",
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
      summary: "Retrieve a trick by ID",
      description: "Retrieve a trick by ID",
      tags: ["Trick"],
      headers: {
        authorization: { type: "string" },
      },
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Trick ID",
          },
        },
      },
      response: {
        200: {
          description: "Returns Trick",
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
      summary: "Create a new Trick",
      description: "Create a new Trick",
      tags: ["Trick"],
      headers: {
        authorization: {
          type: "string",
        },
      },
      body: {
        type: "object",
        properties: {
          type: { type: "object" },
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
      summary: "Update a trick",
      description: "Update a trick",
      tags: ["Trick"],
      headers: {
        authorization: {
          type: "string",
        },
      },
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
      summary: "Remove a Trick",
      description: "Remove a Trick",
      tags: ["Trick"],
      headers: {
        authorization: {
          type: "string",
        },
      },
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Trick ID",
          },
        },
      },
    },
  },
};

export default docs;
