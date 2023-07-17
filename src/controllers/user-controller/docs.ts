const docs = {
  register: {
    schema: {
      summary: "Register a new User",
      description: "Register a new User",
      tags: ["User"],
      body: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "a User name",
          },
          email: {
            type: "string",
            description: "a User email",
          },
          password: {
            type: "string",
            description: "a User password",
          },
          passwordConfirmation: {
            type: "string",
            description: "a User password confirmation",
          },
        },
      },
      response: {
        201: {
          description: "Returns success message",
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
      },
    },
  },
  login: {
    schema: {
      summary: "Auth user",
      description: "Auth user",
      tags: ["User"],
      body: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "a User email",
          },
          password: {
            type: "string",
            description: "a User password",
          },
        },
      },
      response: {
        200: {
          description: "Returns access token",
          type: "object",
          properties: {
            accessToken: {
              type: "string",
            },
          },
        },
      },
    },
  },
  logout: {
    schema: {
      summary: "Revoke user token",
      description: "Revoke user token",
      tags: ["User"],
      headers: {
        authorization: {
          type: "string",
        },
      },
    },
  },
};

export default docs;
