const $ = require('jquery');
require('jquery-ui');
const _ = require('underscore');

const $photos = $('#photos');
const $captions = $('#captions');

function showPhotos(data) {
  console.log('im in showPhotos')
  var correctMatches = 0;

  for(var i=0; i < data.length; i++){
    var $box = $('<div><img src="'+ data[i].image_url +'"></div>');
    $box.addClass('photos').attr('id', data[i].id);
    $photos.append($box);

    var $target = $('<div>');
    $target.addClass('target').data('number', data[i].id).droppable({
      accept: '.captions',
      hoverClass: 'hovered',
      drop: handleCaptionDrop
    });
    $box.append($target);
  }

  var shuffled = _.shuffle(data);

  for (var i=0; i < shuffled.length; i++) {
     var $textbox = $('<div>');
     $textbox.text(shuffled[i].caption)
     $textbox.addClass('captions').data('number', shuffled[i].id).draggable({
       containment: '#j-container',
       cursor: 'move',
       revert: true
     });

     $captions.append($textbox);
   }

   $captions.css({
     'position': 'sticky',
      'top': '0'
    })
  // var $window    = $(window);
  // var offset     = $captions.offset();
  // var topPadding = 0;
  //
  // $window.scroll(function() {
  //   if ($window.scrollTop() > offset.top) {
  //     $captions.stop().animate({
  //     marginTop: $window.scrollTop() - offset.top + topPadding
  //     });
  //   } else {
  //       $captions.stop().animate({
  //       marginTop: 0
  //       });
  //   }
  // });

  function handleCaptionDrop (event, ui) {

     var target = $(this).data('number');
     var caption = ui.draggable.data('number');

     if (target == caption) {
       $(this).css({
       'height': ui.draggable.height() });
       ui.draggable.addClass( 'correct' );
       ui.draggable.draggable( 'disable' );
       ui.draggable.position( { of: $(this), my: 'center center', at: 'center center'  } );
       ui.draggable.draggable( 'option', 'revert', false );
      //  $(this).append(ui.draggable);
       $(this).droppable( 'disable' );
       correctMatches++
     }

     if (correctMatches == data.length) {
       window.timerStop();
     }
   }
}

module.exports.showPhotos = showPhotos
