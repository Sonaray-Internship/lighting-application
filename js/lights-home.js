
//changes text in lights
var setLuxOptions = function(array) {
  setTimeout(function(){
    lightDrop.show();
    var i = 0;
    //hide un used lights
    for(j=4; j > array.length; j--){
        lightDrop.eq(j-1).hide();
      }
    //change text in lights
    lightDrop.each(function(index){
      $( this ).html('<div class="line"></div>'+array[i]);
      i++;
    });
  }, 1000);
}


var selectLuxOptions = function(application){
  switch(application) {
    case "Warehousing":
        setLuxOptions([
                        "Low Use 80lx",
                        "High Use 160lx"

                      ]);
      break;
    case "Equestrian Arenas":
        setLuxOptions([
                        "Private Use 50lx",
                        "Training 100lx",
                        "Competition 200lx",
                        "Filming 400lx"
                      ]);
      break;
    case "Commercial":
        setLuxOptions([
                        "General lighting 200lx",
                        "Food Preperation Areas 200lx",
                        "Retail Shops 300lx",
                        "Showrooms 400lx"
                      ])
      break;
    case "Industrial":
        setLuxOptions([
                        "Low Detail Work 200lx",
                        "High Detail Work 600lx"
                      ])
      break;
  }
}


var dropLights = function(){
  console.log("light drop");
  $(".light-drop-one").animate({
        top: "+=63%" },{
        duration:  1500,
        easing: "easeOutElastic"
    });

  $(".light-drop-two").animate({
        top: "+=55%" },{
        duration:  1500,
        easing: "easeOutElastic"
    });
  $(".light-drop-three").animate({
          top: "+=57%" },{
          duration:  1200,
          easing: "easeOutElastic"
    });
  $(".light-drop-four").animate({
            top: "+=62%" },{
            duration:  900,
            easing: "easeOutElastic"
  });

  lightsDown = true;

};

var upLights = function() {
  $(".light-drop-one").animate({
      top: "-=63%" },{
        duration:  500
    });

  $(".light-drop-two").animate({
      top: "-=55%" },{
        duration:  500
    });
  $(".light-drop-three").animate({
        top: "-=57%" },{
          duration:  500
    });
  $(".light-drop-four").animate({
          top: "-=62%" },{
            duration:  500
  });
  lightsDown = false;
}


//drop down lights clicker
lightDrop.on("click", function(){

    application = $(this).text();
    appLux.push(application);
    if(appLux[1] != null){
      var num = appLux[1].match(/\d+/);
      num = parseInt(num[0]);
      appLux.push(num);
    }
    upLights();
    selectLuxOptions(application);
    if(appLux.length >= 3){
      cube = true;
      setTimeout(function() {
          lightTypeText.html(appLux[0] + ": " +appLux[1]);
          totalLightsText.html("Total Lights: ");
          if($(window).width() < 780){
            cubeContainer.animate({ "width": "100%", "height": "350px"});
          }else {
            cubeContainer.animate({ "width": "60%", "height": "100%"},{duration: 600});
          }
          console.log(appLux);
          getdata(appLux[2]);
          var light = getlights(10,10);
          console.log("lights "+ light);
            totalLightsText.text("Total Lights: "+light);
            var lights = arrangelight(light,10,10,60,300);

            var sum = ""
            var sum2 = ""
            for(light in lights){

                var width = Math.ceil(lights[light].x)
                var length = Math.ceil(lights[light].y)
                var ceil = "<div class='circleHolder' style='margin-left:"+width+"px;margin-top:"+length+"px'>" +
                    "<div class='circle circle0'></div></div>"
                var light = "<div class='circleHolder' style='margin-left:"+width+"px;margin-top:"+length+"px'>" +
                    "<div class='circle circle4'></div>" +
                    "<div class='circle circle3'></div>"+
                    "<div class='circle circle2'></div>"+
                    "<div class='circle circle1'></div>" +
                    "</div>"

                sum += light;
                sum2 += ceil;

            }
            ceilling.html(sum2)
            room.html(sum)
          navContainer.classList.add("m-fadeIn");
          navContainer.classList.remove("m-fadeOut");
      },1500);
  } else {
      setTimeout(function(){
        dropLights();
      },1000);

    }



});

//back button clicker
goBackButton.on("click", function(){
  cube = false;
  appLux = [];
  if(lightsDown == true){
    upLights();
  }

  setLuxOptions(["Warehousing","Equestrian Arenas","Commercial","Industrial"]);
  cubeContainer.css({ "width": "60%", "height": "0%"});
  navContainer.classList.add("m-fadeOut");
  navContainer.classList.remove("m-fadeIn");
  setTimeout(function(){
    dropLights();
  },1000);
});


//slider functions
if($(window).width() < 780){
  sliderFunctions("horizontal");
}else {
  sliderFunctions("vertical");
}


dropLights();
$( window ).resize(function() {
  if(($(window).width() < 780)){
    sliderFunctions("horizontal");
  }

  if(($(window).width() > 780)){
    sliderFunctions("vertical");
  }

  if(($(window).width() < 780) && (cube == true)){
      cubeContainer.css({ "width": "100%", "height": "350px"});

  }

  if(($(window).width() > 780) && (cube == true)){
    cubeContainer.css({ "width": "60%", "height": "100%"});
  }
});
