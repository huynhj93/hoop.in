var Sequelize = require('sequelize');

var sequelize = new Sequelize('postgres://svmuoadp:8ZWQdJbithVIP05btL4TQVtIn-_Y3FtV@elmer.db.elephantsql.com:5432/svmuoadp');

module.exports = {
  sequelize: sequelize,
};

var Team = require('./models/team_model.js');
var Player = require('./models/player_model.js');
var Game = require('./models/game_model.js');
Team.belongsTo(Game);
Team.hasMany(Player);
Game.hasMany(Team);
Game.hasMany(Player);
Player.belongsTo(Team);
Player.belongsTo(Game);
console.log('i entered even though i exported already');
