//variables
var room          = $( ".room ");
var roomLength    = $( ".length" );
var roomHeight    = $( ".height" );
var roomWidth     = $( ".width" );
var circleHolder  = $( ".circleHolder" );
var circle1       = $( ".circle1" );
var circle2       = $( ".circle2" );
var circle3       = $( ".circle3" );
var circle4       = $( ".circle4" );
//setting room width, height and length values
roomLength.val(8);
roomWidth.val(8);
roomHeight.val(6);

//slider functions
$( "#slider-length" ).slider({
  range: "min",
  value: 8,
  min: 8,
  max: 200,
  slide: function( event, uilength ) {

    roomLength.val( uilength.value );
    room.height(uilength.value*5 + "px");
  }
});
roomLength.change(function() {
  var oldVal = $( "#slider-length").slider("option", "value");
  var newVal = $(this).val();
  if (isNaN(newVal) || newVal < 8 || newVal > 200) {
    roomLength.val(oldVal);
  } else {
    $( "#slider-length" ).slider("option", "value", newVal);
    room.height(newVal*5 + "px");
  }
});

$( "#slider-height" ).slider({
  range: "min",
  value: 6,
  min: 6,
  max: 12,
  slide: function( event, uiheight ) {
    var result = luxCircles(uiheight.value);

    const vals = Object.keys(result).map(key => result[key]);
    console.log(result);
    roomHeight.val(uiheight.value);
    circleHolder.width(uiheight.value*20 + "px");
    circleHolder.height(uiheight.value*20 + "px");
    circle1.width(vals[0].toFixed(2) * 100+"%");
    circle1.height(vals[0].toFixed(2) * 100+"%");
    circle2.width(vals[1].toFixed(2) * 100+"%");
    circle2.height(vals[1].toFixed(2) * 100+"%");
    circle3.width(vals[2].toFixed(2) * 100+"%");
    circle3.height(vals[2].toFixed(2) * 100+"%");
    circle4.width(vals[3].toFixed(2) * 100+"%");
    circle4.height(vals[3].toFixed(2) * 100+"%");

  }
});

roomHeight.change(function() {
  var oldVal = $( "#slider-height").slider("option", "value");
  var newVal = $(this).val();
  if (isNaN(newVal) || newVal < 6 || newVal > 12) {
    roomHeight.val(oldVal);
  } else {
    $( "#slider-height" ).slider("option", "value", newVal);
  }
});

$( "#slider-width" ).slider({
  range: "min",
  value: 8,
  min: 8,
  max: 200,
  slide: function( event, uiwidth ) {
    roomWidth.val(uiwidth.value);
    room.width(uiwidth.value*5 + "px");
  }
});

roomWidth.change(function() {

  var oldVal = $( "#slider-width").slider("option", "value");
  var newVal = $(this).val();
  if (isNaN(newVal) || newVal < 8 || newVal > 200) {
    roomWidth.val(oldVal);
  } else {
    $( "#slider-width" ).slider("option", "value", newVal);
    room.width(newVal*5 + "px");
  }
});
