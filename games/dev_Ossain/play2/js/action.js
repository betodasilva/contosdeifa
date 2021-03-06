 var correctCards = 0;
$( init );
 
 var card1 = '<p align="center"><b>O numero um é o primeiro simbolo da lista de algarismos indo arábicos, é representado pelo simbolo "2"</b></p>';

function init() {
 
  // Reset the game
  correctCards = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );
 
  // Create the pile of shuffled cards
  var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
  numbers.sort( function() { return Math.random() - .5 } );
 
  for ( var i=0; i<10; i++ ) {
    $('<div></div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );

    document.getElementById('card'+numbers[i]).style.backgroundImage = "url('images/folha" + numbers[i] + "c.png')";
    document.getElementById('card'+numbers[i]).style.backgroundRepeat = "no-repeat";
    document.getElementById('card'+numbers[i]).style.backgroundSize = "78% 118%";
  
    /* Individually coloured cards 
     
    #card1.correct {
        background: url(../images/folha1.png);
        background-size: 78% 118%;
        background-repeat: no-repeat;
    }
    #card2.correct { background: brown; }
    #card3.correct { background: orange; }
    #card4.correct { background: yellow; }
    #card5.correct { background: green; }
    #card6.correct { background: cyan; }
    #card7.correct { background: blue; }
    #card8.correct { background: indigo; }
    #card9.correct { background: purple; }
    #card10.correct { background: violet; }

    document.getElementsByClassName('card'+numbers[i]+'.correct').style.backgroundImage = "url('images/folha" + numbers[i] + "c.png')";
    document.getElementById('card'+numbers[i]).style.backgroundImage = "url('images/folha" + numbers[i] + "c.png')";
    document.getElementById('card'+numbers[i]).style.backgroundRepeat = "no-repeat";
    document.getElementById('card'+numbers[i]).style.backgroundSize = "78% 118%";
    */
  }
 
  // Create the card slots
  var words = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten' ];
  for ( var i=1; i<=10; i++ ) {
    $('<div></div>').data( 'number', i ).attr( 'id', 'cardSlot'+i ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );

   document.getElementById('cardSlot'+i).style.backgroundImage = "url('images/folha" + i + "p.png')";
    document.getElementById('cardSlot'+i).style.backgroundRepeat = "no-repeat";
    document.getElementById('cardSlot'+i).style.backgroundSize = "78% 118%";
  }
 
}

function handleCardDrop( event, ui ) {
  var slotNumber = $(this).data( 'number' );
  var cardNumber = ui.draggable.data( 'number' );
 
  // If the card was dropped to the correct slot,
  // change the card colour, position it directly
  // on top of the slot, and prevent it being dragged
  // again
 
  if ( slotNumber == cardNumber ) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    $('#cardDescription').html( cardNumber );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    correctCards++;
  } 
   
  // If all the cards have been placed correctly then display a message
  // and reset the cards for another go
 
  if ( correctCards == 10 ) {
	alert("Done");
  }
 
}
