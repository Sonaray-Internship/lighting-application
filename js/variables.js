var data = null
var config = {
    apiKey: "AIzaSyAi2uLzEvHu2_R6r_QQxr0DVXQkpz_LwqA",
    authDomain: "light-simulating-calculator.firebaseapp.com",
    databaseURL: "https://light-simulating-calculator.firebaseio.com",
    projectId: "light-simulating-calculator",
    storageBucket: "light-simulating-calculator.appspot.com",
    messagingSenderId: "982520848532"
};
firebase.initializeApp(config);
var database = firebase.database();
var ref = database.ref("data")
var refjob = database.ref("Simulation Data")
ref.on("value", function(snapshot) {
    test = snapshot.val()
    getdata2(test)

}, function (error) {
    console.log("Error: " + error.code);
});


//variables
var cube          = $(".cube")
var room          = $( ".room ");
var ceilling      = $(".room2");
var roomLength    = $( ".length" );
var roomHeight    = $( ".height" );
var roomWidth     = $( ".width" );
var xaxis         = $(".xaxis");
var yaxis         = $(".yaxis");
var zaxis         = $(".zaxis");
var lighttype     = $(".lighttype");
var luxlv         = $(".luxlv");
var displaylight  = $(".displaylight");

    previousJobsButton = $(".previous-jobs-button");
var joblistshowbox= $(".job-list");
var joblist       = [];


  sliderOrientation     = "vertical";
  container             = $(".container");
  lightsDown            = false;
  cube                  = false;
  lightDropOne          = $(".light-drop-one");
  lightDropTwo          = $(".light-drop-two");
  lightDropThree        = $(".ligth-drop-three");
  lightDropFour         = $(".light-drop-four");
  lightDrop             = $(".light-drop");
  lightHomeColumnOne    = $(".light-home-column-one");
  lightHomeColumnTwo    = $(".light-home-column-two");
  lightHomeColumnThree  = $(".light-home-column-three");
  lightHomeColumnFour   = $(".light-home-column-four");
  lightTypeText         = $(".light-type-text");
  totalLightsText       = $(".total-lights-text");
  application           = "";
  appLux                = [];
  goBackButton          = $(".go-back-button");
  cubeContainer         = $(".cube-container");

  var navContainer      = document.getElementById("nav-container");
  //slider variables
  sliderLength          = $("#slider-length");
  sliderWidth           = $("#slider-width");
  sliderHeight          = $("#slider-height");
  sliderLengthText      = $(".slider-length-text");
  sliderWidthText       = $(".slider-width-text");
  sliderHeightText      = $(".slider-height-text");


  var currentlength = 2
  var currentwidth = 2
  var currentheight = 6
  var currentdata = null
  var righttranslateX = 150
  var righttranslateY =50
  var righttranslateZ = 0
