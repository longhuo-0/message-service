module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cloud Audition Project",
      version: "1.0.0",
      description:
        "A REST API working with message resource",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Long Huo",
        url: "https://github.com/GoodSpeed-HL",
        email: "long_huo@icloud.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./routes/index.js", "./routes/messages.js"],
}
