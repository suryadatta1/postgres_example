const Sequelize = require('sequelize');
const db = require('../config/database');

const Gig = db.define('gig', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userGroup: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

Gig.sync().then(() => {
  console.log('table created');
});
module.exports = Gig;
