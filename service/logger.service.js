const date = new Date().toLocaleTimeString();
const logger = (msg) => console.log(`${date} ========> ${msg}`);

module.exports = logger;
