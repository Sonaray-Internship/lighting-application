

//setting room width, height and length values
var jobs = "";
refjob.on("value", function(snapshot) {
    //var a = snapshot.val();
    snapshot.forEach(function (childSnapshot) {
        var value = childSnapshot.val();
        joblist.push(value);
        var option = "<option class='jobs'>"+value.jobname+"</option>"
        jobs += option
    })
    joblistshowbox.html("Jobs:<select > " +jobs+ "</select>")
});





function getdata2(test) {
    data = test;
    getdata(appLux[2]);
}

//helper functions for the number of light calculation
function getdata(lux){
    console.log("lux getdata "+lux);
    if(currentheight<7.5){
        currentdata = data[0][lux]
    }else if(currentheight>=7.5&&currentheight<10.5){
        currentdata = data[1][lux]
    }else{
        currentdata = data[2][lux]
    }
}

function getlights(length,width){
    for (i = 0; i < currentdata.length; i++) {
        if((length<=currentdata[i].length && length> currentdata[i].length-5
            && width<=currentdata[i].width&&width>currentdata[i].length-5)||(
                width<=currentdata[i].length && width>currentdata[i].length-5
                && length<=currentdata[i].width&&length>currentdata[i].length-5
            )){
            return currentdata[i].lights
        }
    }
}


//slider functions
var sliderFunctions = function(sliderOrientation){
  sliderLength.slider({
    range: "min",
    orientation: sliderOrientation,
    value: 2,
    min: 2,
    max: 20,
    slide: function( event, uilength ) {
      sliderLengthText.text(uilength.value*5);
      roomLength.val( uilength.value );
      room.height(uilength.value+300+ "px");
      xaxis.text("Length: "+uilength.value);
      currentlength = uilength.value;
      var light = getlights((currentlength*5),(currentwidth*5));
        totalLightsText.text("Total Lights: "+light);
        var r = $(".circleHolder").width();
        var lights = arrangelight(light,currentwidth,uilength.value,r,300);

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

     //   $(".information").css({"margin-top":uilength.value*2+(currentheight-6)*10+"px"})
        $(".cube").css({"margin-left":-(uilength.value+currentwidth)/1.5+"px","margin-top":-uilength.value+"px"})


        $(".left").css({"width":uilength.value+300+"px",
            "transform": "translateX("+(-150-uilength.value)+"px)" +
            "  translateZ("+(uilength.value/2)+"px)  " +
            "translateY("+(50+uilength.value/3.1)+"px)  rotateY(90deg)"});

        righttranslateY = 50+uilength.value/1.45
        righttranslateZ = -uilength.value/2
        $(".right").css({"width":uilength.value+300+"px",
            "transform": "translateX("+righttranslateX+"px) " +
           "  translateZ("+righttranslateZ+"px)  " +
            "translateY("+righttranslateY +"px) rotateY(90deg)"})

        $(".top").css({"height":uilength.value+300+"px",
            "transform": " translateZ("+(uilength.value*2) +"px)" +
            "translateX("+(-100-uilength.value)+ "+px) rotateX(90deg)"});

        $(".bottom").css({"height":uilength.value+300+"px",
            "transform": "translateY("+(100-uilength.value/3)+"px)" +
            "translateX("+(uilength.value)+"px rotateX(90deg)"});

        $(".front").css({ "transform": "translateZ("+(uilength.value+150)+"px) " +
        "translateY("+(50+uilength.value/3.1)+"px)"+
            "translateX("+(-uilength.value/2)+"px)"})

        $(".back").css({"left":0+"px","margin-top":0+"px",
            "transform": "translateY("+(50+uilength.value/3.1)+"px)"+
           "translateX("+(-uilength.value/2)+"px)"+
            "translateZ("+(-150)+"px)"})
    }
  });

  sliderHeight.slider({
    range: "min",
    orientation: sliderOrientation,
    value: 6,
    min: 6,
    max: 12,
    slide: function( event, uiheight ) {
      sliderHeightText.text(uiheight.value);
      var result = luxCircles(uiheight.value);
      var vals = Object.values(result)
      //const vals = Object.keys(result).map(key => result[key]);
       // const vals = Object.keys(result).map(function (key) {
         //   result[key]
       // })
      console.log(vals);

      roomHeight.val(uiheight.value);
      currentheight = uiheight.value;
      getdata(appLux[2]);
        var light = getlights((currentlength*5),(currentwidth*5));
        totalLightsText.text("Total Lights: "+light);
      //  var r = uiheight.value/Math.sqrt(3)*17.32/5;
        zaxis.text("Height: "+uiheight.value);
        var r = $(".circleHolder").width();
        var lights = arrangelight(light,currentwidth,currentlength,r,300);
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
        room.html(sum)
        ceilling.html(sum2)
        $(".information").css({"margin-top":currentlength*2+(uiheight.value-6)*20+"px"});

        $(".circleHolder").width(uiheight.value/Math.sqrt(3)*17.32 + "px");
        $(".circleHolder").height(uiheight.value/Math.sqrt(3)*17.32+ "px");
        $(".circle1").width(vals[0] * 100+"%");
        $(".circle1").height(vals[0] * 100+"%");
        $(".circle1").css({"background-color":"radial-gradient(#ff2b1d,#FF8216)"});
        $(".circle2").width(vals[1] * 100+"%");
        $(".circle2").height(vals[1] * 100+"%");
        $(".circle2").css("background-color","radial-gradient(#FF8216,#fffc34)");
        $(".circle3").width(vals[2] * 100+"%");
        $(".circle3").height(vals[2] * 100+"%");
        $(".circle3").css("background-color","radial-gradient(#fffc34,#02d649)");
        $(".circle4").width(vals[3]* 100+"%");
        $(".circle4").height(vals[3] * 100+"%");
        $(".circle4").css("background-color","radial-gradient(#02d649,#162fad)");

        $(".left").css({"height":uiheight.value*100/6+"px"})
        $(".right").css({"height":uiheight.value*100/6+"px"})
        $(".front").css({"height":uiheight.value*100/6+"px"})
        $(".back").css({"height":uiheight.value*100/6+"px"})
        $(".bottom").css({"top":uiheight.value*100/6-200+"px"})
    }
  });


  sliderWidth.slider({
    range: "min",
    orientation: sliderOrientation,
    value: 2,
    min: 2,
    max: 20,
    slide: function( event, uiwidth ) {
      sliderWidthText.text(uiwidth.value*5);
      roomWidth.val(uiwidth.value);

      room.width(uiwidth.value+300+ "px");
      yaxis.text("Width: "+uiwidth.value);
      currentwidth = uiwidth.value;
      var light = getlights((currentlength*5),(currentwidth*5));
      var r = $(".circleHolder").width();
      totalLightsText.text("Total Lights: "+light);
      var lights = arrangelight(light,uiwidth.value,currentlength,r,300);
      var sum = ""
        var sum2 = ""
      for(light in lights){
          var width = Math.ceil(lights[light].x)
          var length = Math.ceil(lights[light].y)
          var ceil = "<div class='circleHolder' style='margin-left:"+width+"px;margin-top:"+length+"px'>" +
              "<div class='circle circle0'></div></div>"
          var light = "<div class='circleHolder'style='margin-left:"+width+"px;margin-top:"+length+"px'>" +
              "<div class='circle circle4'></div>" +
              "<div class='circle circle3'></div>"+
              "<div class='circle circle2'></div>"+
              "<div class='circle circle1'></div>" +
              "</div>"
          sum += light;
          sum2 += ceil;
      }
      room.html(sum)
        ceilling.html(sum2)
        var left = $(".cube").css('marginLeft')
        $(".cube").css({"margin-left":-(uiwidth.value+currentlength)/1.5+"px"})
        $(".front").css({"width":uiwidth.value+300+"px"})
        $(".back").css({"width":uiwidth.value+300+"px"})
        $(".top").css({"width":uiwidth.value+300+"px"})
        $(".bottom").css({"width":uiwidth.value+300+"px"})
        righttranslateX = 150+currentwidth
        $(".right").css({ "transform":
            "translateZ("+(righttranslateZ)+"px)"+
            "translateX("+righttranslateX+"px) translateY("+righttranslateY+"px) rotateY(90deg)"})


    }
  });

};//slider functions end


//save the cookies
$(".save").mouseover(function () {
    $(this).css({"background-color":"blue","color":"white","cursor":"pointer"})
})
$(".save").mouseout(function () {
    $(this).css({"background-color":"white","color":"blue"})
})

$(".save").click(function () {
    var project = currentlength +" "+currentwidth+" "+currentheight+" "+200;
    //30days to expired
    var jobname = $(".jobname").val();
    setCookie("project1",project,30);
    writeUserData(currentlength,currentwidth,currentheight,jobname,"jade",200);
    alert("Job saved!")
    $(".openjob").css({"display":"inline"})
    $(".job").css({"display":"none"})

})
$(".openjob").click(function () {
    $(".job").css({"display":"inline"})
    $(this).css({"display":"none"})
})

$(".openjob").mouseover(function () {
    $(this).css({"background-color":"blue","color":"white","cursor":"pointer"})
})
$(".openjob").mouseout(function () {
    $(this).css({"background-color":"white","color":"blue"})
})


function writeUserData(length, width, height,jobname,user,lux) {
    database.ref("Simulation Data").push().set({
        length: length,
        width: width,
        height : height,
        lux: lux,
        user: user,
        jobname: jobname
    });
}

//cookies
function setCookie(savename, savevalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = savename + "=" +  savevalue + ";" + expires + ";path=/";
}



//function of circle
function sixtylux(height){
    var p = -0.44*height*height +5.524*height-17.01
    return p;
}
function eightylux(height){
    var p = -0.368*height+2.317
    if(p<0){
        return 0
    }
    return p
}
function fourtylux(height){
    var p = 0
    if(height<8){
        p = 0.1776*height-0.8253
    }else{
        p = -0.288*height+2.553
    }
    if(p<0){
        return 0
    }
    return p
}
function twentylux(height){
    var p = 0
    if(height<8){
        p=0.1064*height-0.2942
    }else if(height<11){
        p=0.1362*height-0.9078
    }else{
        p=-0.149*height+1.931
    }
    return p
}
function thritylux(height) {
    var p = 0
    if(height<9){
        p = 0.19*height-1.313
    }else{
        p= -0.196*height+2.101
    }
    return p
}
function tenlux(height){
    var p = 0
    if(p<11){
        p=0.06949*height-0.2347
    }else{
        p=0.032*height-0.161
    }
    return p
}
function fifthteenlux(height){
    return 0.08*height-0.713
}
function fivelux(height){
    return 0.037*height-0.0575
}


function luxCircles(height) {
    var circles = new Object();
    if(height<8) {
        var p1 = eightylux(height)
        var p2 = sixtylux(height)
        var p3 = fourtylux(height)
        var p4 = twentylux(height)
        var l =normalize(p1,p2,p3,p4)
        circles.lux80 = l[0]
        circles.lux60 = l[1]+l[0]
        circles.lux40 = l[2]+l[1]+l[0]
        circles.lux20 = 1

    }else if(height<11) {
        var p1 = fourtylux(height)
        var p2 = thritylux(height)
        var p3 = twentylux(height)
        var p4 = tenlux(height)
        var l= normalize(p1,p2,p3,p4)
        circles.lux40 = l[0]
        circles.lux30 = l[1]+l[0]
        circles.lux20 = l[2]+l[1]+l[0]
        circles.lux10 = 1
    }else {
        var p1 = twentylux(height)
        var p2 = fifthteenlux(height)
        var p3 = tenlux(height)
        var p4 = fivelux(height)
        var l = normalize(p1,p2,p3,p4)
        circles.lux20 = l[0]
        circles.lux15 = l[1]+l[0]
        circles.lux10 = l[2]+l[1]+l[0]
        circles.lux5 = 1
    }

    return circles;
}

function normalize(p1,p2,p3,p4){
    p = p1+p2+p3+p4
    var pp1 = p1/p
    var pp2 = p2/p
    var pp3 = p3/p
    var pp4 = p4/p
    var l = [pp1,pp2,pp3,pp4]
    return l
}

function area(height){
    return 3*height*height/2
}

//take height as argument output the total lux on the ground of one light produce
function totallux(height){
    var  key = 'lux'
    var lux = []
    if(height<8){
        lux = [80,60,40,20]
    }else if(height<11){
        lux = [40,30,20,10]
    }else{
        lux = [20,15,10,5]
    }
    var x = luxCircles(height)
    var key1 =  key+lux[0]
    var key2 = key +lux[1]
    var key3 = key +lux[2]
    var key4 = key +lux[3]
    console.log(x[key1],x[key2],x[key3],x[key4])
    var area1 = Math.pow(height*Math.sqrt(3)*x[key1],2)/2
    var area2 = Math.pow(height*Math.sqrt(3)*x[key2],2)/2-area1
    var area3 = Math.pow(height*Math.sqrt(3)*x[key3],2)/2-area1-area2
    var area4 = Math.pow(height*Math.sqrt(3)*x[key4],2)/2-area1-area2-area3
    var totallux = area1*lux[0] +area2*lux[1]+area3*lux[2]+area4*lux[3]
    console.log("totallux"+totallux/area(height))
    console.log("area"+area(height))
    return totallux
}

//generate the coordinate of lights
function arrangelight(number,width,length,r,bond){
    var long =0
    var short =0
    if(length >width){
        long = length
        short = width
    }else{
        short = length
        long = width
    }
    var percentage = short/long
    var lights = []

    var factors = factor(number)

    if(factors.length==1){
        console.log("f1")
        if(length >width){
            for(var i = 0; i<factors[0];i++){
                var light = {x:(width+bond)/2-r/2,y:(length+bond)/(factors[0]+1)*(i+1)-r/2}
                lights.push(light)
            }
            return lights
        }else{
            for(var i = 0; i<factors[0];i++){
                var light = {x:(width+bond)/(factors[0]+1)*(i+1)-r/2,y:(length+bond)/2-r/2}
                lights.push(light)
            }
            return lights
        }
    }
    //when there is only two factors
    if(factors.length==2){
  //      if(Math.abs(factors[0]/factors[1] - percentage) < Math.abs(1/number-percentage)){
            if(length >width){
                for(var i = 0; i<factors[0];i++){
                    for(var j =0;j<factors[1];j++){
                            var light = {x:(width+bond)/(factors[0]+1)*(i+1)-r/2,y:(length+bond)/(factors[1]+1)*(j+1)-r/2}
                            lights.push(light)
                    }
                }
                return lights;
            }else{
                for(var i = 0; i<factors[0];i++){
                    for(var j =0;j<factors[1];j++){
                        var light = {x:(bond+width)/(factors[1]+1)*(j+1)-r/2,y:(bond+length)/(factors[0]+1)*(i+1)-r/2}
                        lights.push(light)
                    }
                }
                return lights;
            }
    /*    }else{
            if(length>width){
                for(var i = 0; i<number;i++){
                    var light = {x:width/2-r/2,y:length/(number+1)*(i+1)-r/2}
                    lights.push(light)
                }
                return lights
            }else{
                for(var i = 0; i<number;i++){
                    var light = {x:width/(number+1)*(i+1)-r/2,y:length/2-r/2}
                    lights.push(light)
                }
                return lights
            }

        }*/

    }

    var bestcom = {x:1,y:number}

    for(var i=1;i<factors.length;i++){
        var front = 1
        var back =1
        for(var j =0;j<i;j++){
            front *= factors[j]
        }
        for(var j = i;j<factors.length;j++){
            back *= factors[j]
        }
        if (Math.abs(front/back - 1) < Math.abs(bestcom.x/bestcom.y-1)){
            bestcom.x = front
            bestcom.y = back
        }else{
            break;
        }
    }
  //  console.log(bestcom)
    if(length >width){
        for(var i =0;i<bestcom.y;i++){
            for(var j=0;j<bestcom.x;j++){
                var light = {x:(bond+width)/(bestcom.x+1)*(j+1)-r/2,y:(bond+length)/(bestcom.y+1)*(i+1)-r/2}

                lights.push(light)
            }
        }
    }else{
        for(var i =0;i<bestcom.y;i++){
            for(var j=0;j<bestcom.x;j++){
                var light = {x:(bond+width)/(bestcom.y+1)*(i+1)-r/2,y:(bond+length)/(bestcom.x+1)*(j+1)-r/2}
                lights.push(light)
            }
        }
    }
    return lights

}

//return the list of factor given by the number of light
function factor(n) {
    var minFactor = leastFactor(n);
    if (n==minFactor) return [n];
    var factors = [minFactor]
    factors = factors.concat(factor(n/minFactor))
    return factors;
}

// find the least factor in n by trial division
function leastFactor(n) {
    if (isNaN(n) || !isFinite(n)) return NaN;
    if (n==0) return 0;
    if (n%1 || n*n<2) return 1;
    if (n%2==0) return 2;
    if (n%3==0) return 3;
    if (n%5==0) return 5;
    var m = Math.sqrt(n);
    for (var i=7;i<=m;i+=30) {
        if (n%i==0)      return i;
        if (n%(i+4)==0)  return i+4;
        if (n%(i+6)==0)  return i+6;
        if (n%(i+10)==0) return i+10;
        if (n%(i+12)==0) return i+12;
        if (n%(i+16)==0) return i+16;
        if (n%(i+22)==0) return i+22;
        if (n%(i+24)==0) return i+24;
    }
    return n;
}
