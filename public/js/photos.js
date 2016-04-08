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
    $target.addClass('target').data('number', data[i].id).attr('id', data[i].id).droppable({
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
     $textbox.addClass('captions').data('number', shuffled[i].id).attr('id', shuffled[i].id).draggable({
      //  containment: '#j-container',
       cursor: 'move',
       snap: '#j-container',
       revert: true,
     });
     $captions.append($textbox);
   }

  function handleCaptionDrop (event, ui) {
     var target = $(this).data('number');
     var caption = ui.draggable.data('number');

     if (target == caption) {
       $(this).append(ui.draggable);
       $(this).css("height", "100%");
       ui.draggable.addClass( 'correct' );
       ui.draggable.draggable( 'disable' );
       $(this).droppable( 'disable' );
       ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
       ui.draggable.draggable( 'option', 'revert', false );
       correctMatches++
     }

     if (correctMatches == data.length) {
       window.timerStop();
     }
   }
}

module.exports.showPhotos = showPhotos
