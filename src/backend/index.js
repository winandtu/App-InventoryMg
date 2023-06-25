//import db from '..models/modelIndex';
const db = require('models/modelIndex');


db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
