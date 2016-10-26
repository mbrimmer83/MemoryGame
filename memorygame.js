var clickCounter = 0;
var moveCounter = 0;
var state = 'on';
var lastMonster = '';
var currentMonster = '';
var matchCounter = 0;
var levelNumber = 16;

var monsters = [
  'monsters-01.png',
  'monsters-02.png',
  'monsters-03.png',
  'monsters-04.png',
  'monsters-05.png',
  'monsters-06.png',
  'monsters-07.png',
  'monsters-08.png',
  'monsters-09.png',
  'monsters-10.png',
  'monsters-11.png',
  'monsters-12.png',
  'monsters-13.png',
  'monsters-14.png',
  'monsters-15.png',
  'monsters-16.png'
];

function randomMonster(levelNumber) {
  var monstersDeck1 = [];
  var monstersDeck2 = [];
  for (var i = 0; i < levelNumber; i++) {
    var idx = Math.floor(Math.random() * monsters.length);
    monstersDeck1.push(monsters[idx]);
    monstersDeck1.push(monsters[idx]);
    monsters.splice(idx, 1);
  }
  while (monstersDeck1.length > 0) {
    var idx2 = Math.floor(Math.random() * monstersDeck1.length);
    monstersDeck2.push(monstersDeck1[idx2]);
    monstersDeck1.splice(idx2, 1);
  }

  return monstersDeck2;
}

function addMonster() {
  var monstersDeck = randomMonster(levelNumber);
  var html = '';
  var columnNum = "";
  if (levelNumber === 4) {
    columnNum = "column-4";
  } else if (levelNumber === 9) {
    columnNum = "column-6";
  } else if (levelNumber === 16) {
    columnNum = "column-8";
  }
  for (var i = 0; i < monstersDeck.length; i++) {
    var monster = monstersDeck[i];
    html += ('<div class="tile">' +
    '<img class="monster" src="../memorygame/images/' + monster + '">' +
    '<div class="back"></div>' +
    '</div>');
  }
  $('#grid')
  .addClass(columnNum)
  .append(html);
}

$(function() {
  addMonster ();
  $('.tile').click(function() {
    if ($(this).hasClass('show')) {
      return;
    }
    $(this).addClass('show');
    $('#message').text("");
    clickCounter += 1;
    if (state === 'on') {
      state = 'off';
    } else {
      state = 'on';
    }
    if (clickCounter % 2 === 0) {
      moveCounter += 1;
    }
    if (state === 'off') {
      lastMonster = $(this).find('.monster').attr('src');
    }
    if (state === 'on') {
      currentMonster = $(this).find('.monster').attr('src');
    }
    if (state === 'on' && lastMonster === currentMonster) {
      $('.tile.show').addClass('lock');
      $('#message').text('You got a match!');
      matchCounter += 1;
    } else if (state === 'on') {
      var timeout = setTimeout(function() {
        $('.tile').removeClass('show');
      }, 1000);
      $('#message').text('Sorry, that is not a match!');
    }
    $('#turn').text('Turn: ' + moveCounter);
    if (matchCounter === levelNumber) {
      $('#message').text('Winner');
    }
  });
});
