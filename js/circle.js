console.log("hello");
$("#circleSubmit").click(function(event) {
  event.preventDefault();
  console.log('circle');
  $(".circle1").width("200px").height("200px");

});
