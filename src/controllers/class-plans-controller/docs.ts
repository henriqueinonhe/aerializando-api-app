const docs = {
  fetchAll: {
    schema: {
      summary: "Retrieve all Class Plans",
      description: "Retrieve all Class Plans",
      tags: ["Class Plan"],
      headers: { authorization: { type: "string" } },
      response: {
        200: {
          description: "Returns Class Plans",
          type: "array",
          items: {
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              classNumber: { type: "string" },
              focusType1: { type: "string" },
              focusType2: { type: "string" },
              tricks: {
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
              exerciseBlocs: {
                type: "array",
                items: {
                  properties: {
                    id: { type: "number" },
                    exercises: {
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
            },
          },
        },
      },
    },
  },
  fetchById: {
    schema: {
      summary: "Retrieve a Class Plan by ID",
      description: "Retrieve a Class Plan by ID",
      tags: ["Class Plan"],
      headers: { authorization: { type: "string" } },
      params: {
        type: "object",
        properties: { id: { type: "string", description: "Class Plan ID" } },
      },
      response: {
        200: {
          description: "Returns Class Plan",
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            classNumber: { type: "string" },
            focusType1: { type: "string" },
            focusType2: { type: "string" },
            tricks: {
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
            exerciseBlocs: {
              type: "array",
              items: {
                properties: {
                  id: { type: "number" },
                  exercises: {
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
          },
        },
      },
    },
  },
  create: {
    schema: {
      summary: "Create a new Class Plan",
      description: "Create a new Class Plan",
      tags: ["Class Plan"],
      headers: { authorization: { type: "string" } },
      body: {
        type: "object",
        properties: {
          id: { type: "number" },
          name: { type: "string" },
          classNumber: { type: "string" },
          focusType1: { type: "string" },
          focusType2: { type: "string" },
          tricks: {
            type: "array",
            items: {
              properties: {
                id: { type: "number" },
              },
            },
          },
          exerciseBlocs: {
            type: "array",
            items: {
              properties: {
                exercises: {
                  type: "array",
                  items: {
                    properties: { id: { type: "number" } },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  update: {
    schema: {
      summary: "Update a Class Plan",
      description: "Update a Class Plan",
      tags: ["Class Plan"],
      headers: { authorization: { type: "string" } },
      body: {
        type: "object",
        properties: {
          id: { type: "number" },
          name: { type: "string" },
          classNumber: { type: "string" },
          focusType1: { type: "string" },
          focusType2: { type: "string" },
          tricks: {
            type: "array",
            items: {
              properties: {
                id: { type: "number" },
              },
            },
          },
          exerciseBlocs: {
            type: "array",
            items: {
              properties: {
                id: { type: "number" },
                exercises: {
                  type: "array",
                  items: {
                    properties: { id: { type: "number" } },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  delete: {
    schema: {
      summary: "Remove a Class Plan",
      description: "Remove a Class Plan",
      tags: ["Class Plan"],
      headers: { authorization: { type: "string" } },
      params: {
        type: "object",
        properties: { id: { type: "string", description: "Class Plan ID" } },
      },
    },
  },
};
export default docs;
