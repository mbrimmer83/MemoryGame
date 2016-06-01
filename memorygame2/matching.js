var turn = 1;
var firstCard;
var win = 0;

var app = angular.module('matching', []);
app.controller('MatchingController', function($scope, $timeout) {

  function Tile(imageUrl) {
    this.state = false;
    this.imageUrl = imageUrl;
  }

  $scope.newGame = function() {
    $scope.tiles = [
      _.shuffle([
        new Tile('monsters-01.png'),
        new Tile('monsters-02.png'),
        new Tile('monsters-03.png'),
        new Tile('monsters-04.png')
      ]),
      _.shuffle([
        new Tile('monsters-01.png'),
        new Tile('monsters-02.png'),
        new Tile('monsters-03.png'),
        new Tile('monsters-04.png')
      ])
    ]
  }

  var images = _.shuffle[
    'monsters-01.png',
    'monsters-02.png',
    'monsters-03.png',
    'monsters-04.png',
    'monsters-01.png',
    'monsters-02.png',
    'monsters-03.png',
    'monsters-04.png'
  ];

  $scope.showImage = function(tile) {
    tile.state = true;
    if (turn % 2 === 1) {
      firstCard = tile;
      tile.state = true;
    }
    if (firstCard.imageUrl === tile.imageUrl) {
      firstCard.state = true;
      tile.state = true;
      turn++;
    } else {
      $scope.checkMatch(tile);
    }
  }

  $scope.checkMatch = function(tile) {
    $timeout(function() {
      if (firstCard.imageUrl !== tile.imageUrl) {
        firstCard.state = false;
        tile.state = false;
        turn++;
      }
    }, 1000);
  };

  $scope.newGame();

});
