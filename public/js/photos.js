const $ = require('jquery')
require('jquery-ui')
const $photos = $('#photos')

function showPhotos(data) {

  for(var i=0; i < data.length; i++){
    var $box = $('<div><img src="'+ data[i].image_url +'"></div>');
    $box.addClass('photos').attr('id', data[i].id)
    $photos.append($box)

    var $target = $('<div>')
    $target.addClass('target').attr('id', data[i].id)
    $box.append($target)

  }

}

module.exports.showPhotos = showPhotos
