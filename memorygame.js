var clickCounter = 0;
var moveCounter = 0;
var state = 'on';
var lastMonster = '';
var currentMonster = '';
var matchCounter = 0;


$(function() {
  $('.tile').click(function() {
    if ($(this).hasClass('show')) {
      return;
    }
    $(this).addClass('show')
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
        $('.tile').removeClass('show')
      }, 1000);
      $('#message').text('Sorry, that is not a match!')
    }
    $('#turn').text('Turn: ' + moveCounter);
    if (matchCounter === 4) {
      $('#message').text('Winner');
    }
  });
});
