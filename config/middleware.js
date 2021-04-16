module.exports = {
  settings: {
    cors: {
      origin: [
        "https://api.videopoker.academy",
        "https://videopoker.academy",
        "http://localhost:8000",
        "http://localhost:8080",
        "http://localhost:1337",
      ],
    },
    parser: {
      enabled: true,
      multipart: true,
      formidable: {
        maxFileSize: 4 * 1024 * 1024 * 1024, // 4GB Default was 200mb
      },
    },
  },
}
