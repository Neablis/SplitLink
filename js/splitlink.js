//builds and returns a new elemnent of X generation
function createLink( generation ){
  var splitLink = $('<a>',{
    text: generation + " : " + 1,
    href: '#',
    class: 'generation' + generation + " splitLink",
    title: generation,
    style: "padding: 10px;",
    click: function(){ splitter( this );$(this).remove();return false;}
  });
  return splitLink;
}

//Created for cosmetic reasons, Just builds a div for X generation
function divBuilder(generation){
  var div;
  if ($("#generation"+generation).length ) {
    div = $("#generation"+generation);
  }else{
    div = jQuery('<div/>', {
      id: "generation"+generation,
      class: "links",
      style: "border:solid;border-width:2px;min-height:20px;height:auto !important;height:20px;"
    });
    $('body').append(div);
  }
  return div;
  
}

//Updates all text of that generation
function updateText( Generation ){
  //I use the divs as a parent search to increase search speed for those elements. Makes it a little more dependent then needed.
  $('#generation'+ Generation + ' '+ '.generation'+Generation).each(function(index){
    var numGeneration = parseInt($(this).attr('title'),10);
    $(this).text((numGeneration + " : " + totals[Generation]));
  });
}

function splitter( object ){
  var numGeneration = parseInt($(object).attr('title'),10);
  totals[numGeneration] = totals[numGeneration]-1;
  if( totals[numGeneration+1] == undefined ){
    totals[numGeneration+1] = 2;
  }else{
    totals[numGeneration+1] = totals[numGeneration+1] + 2;
  }
  var generation = parseInt(numGeneration)+1;
  var link1 = createLink(generation);
  var link2 = createLink(generation);
  var div = divBuilder(generation);
  $(div).append(link1).append(link2);
  updateText(numGeneration);
  updateText(numGeneration+1);
}

$(document).ready(function() { 
    //element to track totals of all splitLinks. 
    //Original thought the project was generationTOTAL : TOTAL so tracking totals was needed for efficientsy 
    totals = {};
    //storing totals in -1
    totals[-1] = 1;
    totals[0] = 1;
    div = jQuery('<div/>', {
      id: "generation"+0,
      class: "links",
      style: "border:solid;border-width:2px;min-height:20px;height:auto !important;height:20px;"
    });
    $('body').append($(div).append(createLink(0)));
});