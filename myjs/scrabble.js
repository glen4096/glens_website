/* 
 * Glen Anderson
 * GUI I - Assignment 9: scrabble in jQuery
 * 12/8/2015
 * 
 */

// This is the array structure that I used for the tiles.
// I adapted it from the JSON file that was posted on Piazza by Ramon Meza.

var pieces = [
  {"letter":"a", "value":1,  "amount":9, "remaining":9},
  {"letter":"b", "value":3,  "amount":2, "remaining":2},
  {"letter":"c", "value":3,  "amount":2, "remaining":2},
  {"letter":"d", "value":2,  "amount":4, "remaining":4},
  {"letter":"e", "value":1,  "amount":12,"remaining":12},
  {"letter":"f", "value":4,  "amount":2, "remaining":2},
  {"letter":"g", "value":2,  "amount":3, "remaining":3},
  {"letter":"h", "value":4,  "amount":2, "remaining":2},
  {"letter":"i", "value":1,  "amount":9, "remaining":9},
  {"letter":"j", "value":8,  "amount":1, "remaining":1},
  {"letter":"k", "value":5,  "amount":1, "remaining":1},
  {"letter":"l", "value":1,  "amount":4, "remaining":4},
  {"letter":"m", "value":3,  "amount":2, "remaining":2},
  {"letter":"n", "value":1,  "amount":6, "remaining":6},
  {"letter":"o", "value":1,  "amount":8, "remaining":8},
  {"letter":"p", "value":3,  "amount":2, "remaining":2},
  {"letter":"q", "value":10, "amount":1, "remaining":1},
  {"letter":"r", "value":1,  "amount":6, "remaining":6},
  {"letter":"s", "value":1,  "amount":4, "remaining":4},
  {"letter":"t", "value":1,  "amount":6, "remaining":6},
  {"letter":"u", "value":1,  "amount":4, "remaining":4},
  {"letter":"v", "value":4,  "amount":2, "remaining":2},
  {"letter":"w", "value":4,  "amount":2, "remaining":2},
  {"letter":"x", "value":8,  "amount":1, "remaining":1},
  {"letter":"y", "value":4,  "amount":2, "remaining":2},
  {"letter":"z", "value":10, "amount":1, "remaining":1},
  {"letter":"_", "value":0,  "amount":2, "remaining":2}
];

// array to associate tile id's with values.
// These mappings are used by the drop event handlers (see below).
var map =[];
map["piece0"] = 0;
map["piece1"] = 0;
map["piece2"] = 0;
map["piece3"] = 0;
map["piece4"] = 0;
map["piece5"] = 0;
map["piece6"] = 0;
map["piece7"] = 0;

$(document).ready(function (){ 
    
    // use jQuery to make board slots droppable
    $("#slot1").droppable( {drop: piece_dropped, out:piece_moved_out} );
    $("#slot2").droppable( {drop: piece_dropped, out: piece_moved_out} );
    $("#slot3").droppable( {drop: piece_dropped, out:piece_moved_out} );
    $("#slot4").droppable( {drop: piece_dropped_triple, out: triple_out} );
    $("#slot5").droppable( {drop: piece_dropped, out:piece_moved_out} );
    $("#slot6").droppable( {drop: piece_dropped, out:piece_moved_out} );
    $("#slot7").droppable( {drop: piece_dropped, out:piece_moved_out} );
    
});

//global varaible for score
var total_score = 0;

//global variable for cumulative total
var accum = 0;

//add value of tile to score when a tile is moved into a slot
function piece_dropped(event, ui){
    var draggableID = ui.draggable.attr("id");
    var dragged_tile_val = map[draggableID];
 
    //console.log(dragged_tile_val);
    total_score +=dragged_tile_val;
    $("#score").html(total_score);
}

//add 3*value of tile to score when a tile is moved into triple slot
function piece_dropped_triple(event, ui){
    var draggableID = ui.draggable.attr("id");
    var dragged_tile_val = map[draggableID];
    total_score += (3*dragged_tile_val);
    $("#score").html(total_score);
}

//subtract value of tile from score when a piece is moved from a slot
function piece_moved_out(event, ui){
    var draggableID = ui.draggable.attr("id");
    var dragged_tile_val = map[draggableID];
    total_score -=dragged_tile_val;
    $("#score").html(total_score);
}

//subtract from 3*value of tile score when a piece is moved from triple slot
function triple_out(event, ui){
    var draggableID = ui.draggable.attr("id");
    var dragged_tile_val = map[draggableID];
    total_score -= (3*dragged_tile_val);
    $("#score").html(total_score);
}

function score_submit(){
    if (total_score <= 0) {return;}
    accum += total_score;
    $("#accum_score").html(accum);
    
    //reset current hand and current score
    get_pieces();
}

//reset current score, reset the available tiles, reset mappings, get new hand
function get_pieces(){
    
    //reset id to value mappings, because tile ids are not associated with values yet
    map["piece0"] = 0;
    map["piece1"] = 0;
    map["piece2"] = 0;
    map["piece3"] = 0;
    map["piece4"] = 0;
    map["piece5"] = 0;
    map["piece6"] = 0;
    map["piece7"] = 0;
    
    //reset current score
    total_score = 0;
    $("#score").html(0);
    
    //empty current hand
    $("#rack").html("");
    
    //put all pieces back into the pile to choose from
    for(var i=0; i<27; i++){
        pieces[i].remaining = pieces[i].amount;
    }
    
    //get 7 tiles
    for(var i=0; i<7; i++){
        
        var random_num = Math.floor(Math.random() * (26 - 0 + 1)) + 0;
        
        // if the random number gen. picked a piece that there are no more of,
        // pick new ones until you pick a piece that still exists
        while(pieces[random_num].remaining < 1) {
            var random_num = Math.floor(Math.random() * (26 - 0 + 1)) + 0;
        }
        //decrement the number remaining of the chosen tile
        pieces[random_num].remaining = pieces[random_num].remaining -1 ;
        
        //add the tiles to the rack so they can be seen and chosen by the user
        $("#rack").append(
                "<img " + "class = 'pieces' " +" id= 'piece"+ i +"'" + " src= 'scrabble_pics/scrabble_piece_"
                + pieces[random_num].letter +
                ".jpg' alt='scrabblepiece'>");
        
        // use jquery to make the tiles draggable
        $("#piece" + i).draggable( { cursor: 'move',
                                     snap:".board_slot",
                                     containment: "#scrabble" 
                                     });
        //Associate tile id with the value of that piece.
        //Use the map array for this mapping.
        map["piece" + i] = pieces[random_num].value;
                                     
    }
    

};