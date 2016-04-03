const $ = require('jquery');
require('jquery-ui');
const _ = require('underscore');

const $photos = $('#photos');
const $captions = $('#captions')

function showPhotos(data) {

  for(var i=0; i < data.length; i++){
    var $box = $('<div><img src="'+ data[i].image_url +'"></div>');
    $box.addClass('photos').attr('id', data[i].id);
    $photos.append($box);

    var $target = $('<div>');
    $target.addClass('target').attr('id', data[i].id).droppable({

    });
    $box.append($target);
  }

   var shuffled = _.shuffle(data);

   for (var i=0; i < shuffled.length; i++) {
     var $textbox = $('<div>');
     $textbox.text(shuffled[i].caption)
     $textbox.addClass('captions').attr('id', shuffled[i].id).draggable({
         containment: '#j-container',
         cursor: 'move',
         snap: '#j-container'
        });
     $captions.append($textbox);
   }




}

module.exports.showPhotos = showPhotos
