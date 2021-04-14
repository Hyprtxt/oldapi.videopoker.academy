module.exports = ({ env }) => ({
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: "no-reply@videopoker.academy",
      defaultReplyTo: "nobody@videopoker.academy",
      testAddress: "tdy721@gmail.com",
    },
  },
})
