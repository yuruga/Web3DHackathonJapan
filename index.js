jThree( function( j3 ) {

	$( "#loading" ).remove();
	//j3.Trackball();
	j3.Stats();

	var audioDate = j3("import").contents().find("audio")[0];
	audioDate.play();


	
    start();
    
    var poundTarget;
    
	function start(){
	    var camera = j3("camera");
	    var me = j3("#me")
	    
	    //camera.animate({rotateX:3.14},1000);
	    spring([camera, me]);
	    
	    $(window).click(pound)
	    
	}
	
	function pound(){
	    console.log("pound")
	    var kine = j3("#kine_mesh");
	    console.log(kine)
	    kine.animate({translateY:-20},150, "easeInQuad", function(){
	        j3(this).animate({translateY:20},300, "easeOutQuad");
	    })
	    
	    if(poundTarget == "mochi")
	    {
	        success();
	    }else
	    {
	        fail();
	    }
	    
	}
	
	function changePoundTarget(){
	    poundTarget = Math.random()<0.5?"neko":"mochi";
	    console.log(poundTarget)

	    if(poundTarget == "neko")
	    {
	    	j3("import").contents().find("audio")[1].play();
	    }else
	    {
	    	j3("import").contents().find("audio")[1].pause();
	    }
	    
	}
	
	function success(){
	    
	}
	function fail(){
	    
	}
	
	function spring(targets, mass){
	    var target = targets[0];
	    console.log(targets[0].position())
	    var defPos = target.position();
	    var m = mass || 1;
	    var g = -9.8;
	    var gf = g*m;
	    var a;
	    var v =0;
	    var k = 0.389;//バネ定数
	    var nl = 4800;//自然長
	    var sf;//バネの力
	    
	    var loop = function(){
	        var p = target.position();
	        var l = -p[1]+defPos[1];
	        //console.log(Math.max(0,l-nl))
	        sf = k*(Math.max(0,l-nl));
	        a = (gf+sf)/m;
	        //console.log(gf+sf, sf)
	        var len = targets.length;
	        //console.log(len)
	        for(var i = 0; i<len; i++)
	        {
	            targets[i].position(p[0], p[1]+v, p[2]);
	        }
	        var oldV = v; 
	        v += a;
	        v *= 0.999;
	        v = Math.max(v, -45);
	        setTimeout(loop, 60)
	        
	        if(v<0 && oldV*v <0)
	        {
	            changePoundTarget();
	        }
	    }
	    
	    loop();
	}
	/*setInterval(function(){
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
	}*/
},
function() {
	alert( "このブラウザはWebGLに対応していません。" );
} );
