jThree( function( j3 ) {

	$( "#loading" ).remove();

	j3.Trackball();
	j3.Stats();
	
	var audioDate = j3("import").contents().find("audio")[0];
	audioDate.play();
	
	setInterval(function(){
	    var rand = Math.floor( Math.random() * 2 );
	    if(rand == 0){
	    	j3("import").contents().find("audio")[1].pause();
	    }else{
	    	j3("import").contents().find("audio")[1].play();
	    }
	},3500)
	var flag = 1;
	roop();
	function roop (){
		var speed = 5000;
		if(flag){
			flag = 0;
			j3("obj").animate({
	            positionY: 100
	        },speed);
		}else{
			flag = 1;
			j3("obj").animate({
	            positionY: 0
	        },speed);
		}
	    setTimeout(function(){
	        roop ();
	    },speed);
	}
},
function() {
	alert( "このブラウザはWebGLに対応していません。" );
} );
