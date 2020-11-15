module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '614257ce1696c813a5cdb591446b6d92'),
    },
  },
  url: 'https://api.videopoker.academy'
});
