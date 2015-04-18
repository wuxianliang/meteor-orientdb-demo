
var orientdb = new Meteor.LiveOrientDB({
  host: 'localhost',
  port: '2424',
  username: 'root',
  password: '123456',
  database: 'players'
});



Meteor.publish('test', function(){
  return orientdb.select(
    'select * from player', {params:{table:"player"}}
  );
});

///////////////////////////////////////////////////////////////////
var liveDb = new LiveMysql({
  host: 'localhost',
  user: 'root',
  password: '235711',
  database: 'leaderboard'
});

var mysqlresult = liveDb.select(
  'SELECT * FROM players ORDER BY score DESC',
  [ { table: 'players' } ]
);


Meteor.publish('allPlayers', function(){
  return liveDb.select(
    'SELECT * FROM players ORDER BY score DESC',
    [ { table: 'players' } ]
  );
});

Meteor.publish('playerScore', function(name){
  return liveDb.select(
    'SELECT id, score FROM players WHERE name = ' + liveDb.db.escape(name),
    [
      {
        table: 'players',
        condition: function(row, newRow){
          return row.name === name;
        }
      }
    ]
  );
});

Meteor.methods({
  'incScore': function(){
      orientdb.execute('INSERT into player set name=:name, score=:score', {params:{name:'abc', score:100}});
    },
  'delScore': function(){
      orientdb.execute('DELETE vertex from player where name=:name', {params:{name:'abc'}});
    },

  'updScore': function(options){
      orientdb.execute('UPDATE #12:1 SET score=:score', options);
    },



});
