const server = require("./src/server.js");
const { conn } = require('./src/sequelize.js');
const PORT = 3002;

conn.sync({ force: false }).then(() => {
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))


