var bInitCalled = false, bPageLoaded = false, tl = null;

var TOP_HEIGHT = 250;

$(window).load(function(e){
	bPageLoaded = true;
	checkReady();
});

function checkReady(){
	if (bInitCalled && bPageLoaded) {	
		doStart();
	}
}

function init() {
	//init checks
	bInitCalled = true;
	checkReady();
}

function doStart() {
	//Main area visible (initially hidden in CSS)
	$("body").css({ visibility: "visible"});
	//Execute animations
	animate();
}

$(document).ready(function(){
	init();
});