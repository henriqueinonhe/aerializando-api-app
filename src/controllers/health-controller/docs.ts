const docs = {
  health: {
    schema: {
      summary: "Check app health",
      description: "Check app health",
      tags: ["Health"],
      response: {
        200: {
          description: "App health",
          type: "object",
          properties: {
            db: { type: "string", description: "Can be 'dead' or 'live'" },
            version: { type: "string" },
          },
        },
      },
    },
  },
};
export default docs;
