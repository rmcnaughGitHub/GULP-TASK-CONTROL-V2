'use strict'

var run = window.run || {};

run = {

	time : 1,

	init: function(){
		//run.loadSpriteSheet();
		run.clickBanner('clicker');
	},

	//PRELOAD SPRITESHEETS | IMAGES
	loadSpriteSheet: function(){
	    var loadedImages = 0;
	    var imageArr = [''];

	    preloadImages();

	    function preloadImages(){
	        for(var i = 0; i<imageArr.length;i++){
	            var tempImage = new Image();
	            tempImage.src = imageArr[i];
	            tempImage.onload = trackProgress();
	        }
	    };

	    function trackProgress(){
	        loadedImages++;
	        if(loadedImages == imageArr.length){
	        	//*RUN FUNCTION HERE*

	        }
	    };

	},


	//RANDOM NUMBER BETWEEN TWO NUMBERS
	randomIntFromInterval: function(min,max){
	    return Math.floor(Math.random()*(max-min+1)+min);
	},

	//OPACITY CONTROL
	opacitySwitch: function (object, percentage, time) {
		if( object.hasClass('display-none') ){
			object.removeClass('display-none').addClass('display-block');
		}
		object.animate({opacity: percentage}, time);
		//TweenLite.to(object,time, {opacity: percentage, ease: Expo.easeOut});
		//console.log( object, ' ', 'opacity ', object.css('opacity'));
	},

	//ALL EVENT LISTENERS
	eventListeners: function(object){
		
	},

	//BANNER CLICK FUNCTION
	clickBanner: function(object){
		document.getElementById(object).addEventListener('click', function(e){
			e.stopPropagation();
			console.log( object, 'BANNER CLICKED' );
		});
	},

	//KILL TWEENS
	killTweens: function(object){
		TweenLite.killTweensOf(object);
	},

	//BUILD DYNAMIC OBJECTS TO ANIMATE
	buildDynamicObject: function(size, sizeNum, widTh, heigHT, numObjects, topDiv, theClassName, leftMinPos, 
		leftMaxPos, topMinPos, topMaxPos){
		for (var i = 0; i<numObjects; i++){
			var size = Math.floor( Math.random() * sizeNum) + 'px';
			var objTo = document.getElementById(topDiv)
		    var newDiv = document.createElement("div");
		    newDiv.className = theClassName;
		    objTo.appendChild(newDiv);
		    //
		    newDiv.style.position = 'absolute';
		    newDiv.style.zIndex = 0;
		    newDiv.style.opacity = Math.random() * 1;
		    newDiv.style.left = nameSpace.randomIntFromInterval(leftMinPos,leftMaxPos) + 'px';
		    newDiv.style.top = nameSpace.randomIntFromInterval(topMinPos,topMaxPos) + 'px';
		    newDiv.style.height = widTH;
		    newDiv.style.width = heigHT;
		    //console.log('newDiv ', newDiv, ' newDiv-top ', newDiv.style.top,  ' newDiv-left ', newDiv.style.left, ' newDiv-Alpha ', newDiv.style.opacity);
		    nameSpace.floatLeft(newDiv);
		}
	},

	//MAIN TWEEN FUNCTION
	slideLeftRight: function(object, time, wait, xPosLeft, xPosRight, easeIng){
		TweenLite.to(object, time, {delay: wait, left: xPosLeft, right: xPosRight, ease: easeIng});
	},

	//MOVEMENT FOR DYBNAMICALLY GENERATED OBJECTS
	floatLeft: function(Object){
		TweenMax.to(Object, Math.floor( Math.random() * 7), {delay:Math.random() * 1, left: -10, force3d:true, ease:Sine.easeInOut, onComplete: function(){
			Object.style.left = '300px';
		}});
	},

	//MAIN ANIMATION
	animation: function(){

	}
	
};

document.addEventListener('DOMContentLoaded', function(){
	console.log('WORKING NOW');
	run.init();
});