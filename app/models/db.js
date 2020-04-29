'use strict';

/*
Create connection to mongo
 */

require('dotenv').config();

const Mongoose = require('mongoose');

Mongoose.set('useNewUrlParser', true);
Mongoose.set('useUnifiedTopology', true);
Mongoose.set('useFindAndModify', false);
Mongoose.connect(process.env.MONGODB_URI || process.env.localhostdb);
// Mongoose.connect(process.env.db);
const db = Mongoose.connection;

db.on('error', function(err) {
  console.log(`database connection error: ${err}`);
});

db.on('disconnected', function() {
  console.log('database disconnected');
});

db.once('open', function() {
  console.log(`database connected to ${this.name} on ${this.host}`);
  // seed();

});

async function seed() {
  var seeder = require('mais-mongoose-seeder')(Mongoose);
  const data = require('./seed-data.json');
  const User = require('./user');
  const dbData = await seeder.seed(data, { dropDatabase: false, dropCollections: true });
  console.log(dbData);
}