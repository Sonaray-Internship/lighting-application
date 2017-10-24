console.log("formula");
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
     var p= 0
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

function totallux(height){
    var  key = 'lux'
    var lux = []
    if(height<8){
        lux = [80,60,40,20]
    }else if(heigh<11){
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

function numLight(h,l,w,y){
    var num = Math.ceil(l*w*y/totallux(h))
    return num
}
