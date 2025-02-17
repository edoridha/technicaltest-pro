'use strict';
const fs = require('fs')
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync("./db/members.json", "utf-8"))
    data.map(e => {
      delete e.id
      e.createdAt = new Date()
      e.updatedAt = new Date()
      e.password = bcrypt.hashSync(`${e.password}`, 10)
      return e
    })
    queryInterface.bulkInsert("Members", data)
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Members', null, {});

  }
};
