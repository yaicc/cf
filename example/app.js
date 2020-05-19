const { App } = require('..');

const PORT = process.env.API_PORT || 3000;
const app = new App();

app.run(PORT);