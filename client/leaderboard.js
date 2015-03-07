Meteor.methods({
  'incScore': function(id, amount){
    var originalIndex;
    players.forEach(function(player, index){
      if(player.id === id){
        originalIndex = index;
        players[index].score += amount;
        players.changed();
      }
    });

    // Reverse changes if needed (due to resorting) on update
    players.addEventListener('update.incScoreStub', function(index, msg){
      if(originalIndex !== index){
        players[originalIndex].score -= amount;
      }
      players.removeEventListener('update.incScoreStub');
    });
  }
});


Template.leaderboard.helpers({
  oplayers: function () {

    return oplayers.reactive();
  },
  selectedName: function () {
    players.depend();
    var player = players.filter(function(player){
      return player.id === Session.get("selectedPlayer");
    });
    return player.length && player[0].name;
  }
});

Template.leaderboard.events({
  'click .inc': function () {
    Meteor.call('incScore', Session.get("selectedPlayer"), 5);
  }
});

Template.player.helpers({
  selected: function () {
    return Session.equals("selectedPlayer", this.id) ? "selected" : '';
  }
});

Template.player.events({
  'click': function () {
    //Meteor.call('incScore');
    //Meteor.call('delScore');
    Meteor.call('updScore', {params:{score:61}});
  }
});
