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

//Take length, width, height and number of light as argrument,
//Output the average lux of the room
function avgLux(h,l,w,n) {
    return n*totallux(h)/(l*w)
}

//Take length, width, height and average lux of the room as argrument,
//Output the number of light should be used at least
function numLight(h,l,w,y){
    var num = Math.ceil((l*w*y)/totallux(h))
    return num
}

function numlight2(width,length,lux,lightlum){
    var num =  (width*length*lux)/lightlum-y -0.0145*lux + 0.0902
    if(Math.ceil(num)-num>0.5){
        num = Math.floor(num)
    }else{
        num = Math.ceil(num)
    }
    return num
}

function arrangelight(number,width,length){
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
        if(length >width){
            for(var i = 0; i<factors[0];i++){
                var light = {x:width/2,y:length/factors[0]*(i+1)}
                lights.push(light)
            }
            return lights
        }else{
            for(var i = 0; i<factors[0];i++){
                var light = {x:length/factors[0]*(i+1),y:length/2}
                lights.push(light)
            }
            return lights
        }
    }
    if(factors.length==2){
        if(length >width){
            if(factors[0]>factors[1]){
                for(var i = 0; i<factors[0];i++){
                    for(var j =0;j<factors[1];j++){
                        var light = {x:width/factors[1]*(j+1),y:length/factors[0]*(i+1)}
                        lights.push(light)
                    }
                }
                return lights;
            }else{
                //todo
            }
            for(var i = 0; i<factors[0];i++){
                for(var j =0;j<factors[1];j++)
                var light = {x:width/2,y:length/factors[0]*(i+1)}
                lights.push(light)
            }
            return lights
        }else{
            for(var i = 0; i<factors[0];i++){
                var light = {x:length/factors[0]*(i+1),y:length/2}
                lights.push(light)
            }
            return lights
        }
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
        if (Math.abs(front/back - percentage) < Math.abs(bestcom.x/bestcom.y-percentage)){
            bestcom.x = front
            bestcom.y = back
        }else{
            break;
        }
    }
    if(length >width){
        for(var i =0;i<bestcom.y;i++){
            for(var j=0;j<bestcom.x;j++){
                var light = {x:width/(bestcom.x+1)*(j+1),y:length/(bestcom.y+1)*(i+1)}
                lights.push(light)
            }
        }
    }else{
        for(var i =0;i<bestcom.y;i++){
            for(var j=0;j<bestcom.x;j++){
                var light = {x:width/(bestcom.y+1)*(i+1),y:length/(bestcom.x+1)*(j+1)}
                lights.push(light)
            }
        }
    }
    return lights

}


function factor(n) {
    var minFactor = leastFactor(n);
    if (n==minFactor) return [n];
    var factors = [minFactor]
    factors.push(factor(n/minFactor))
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
