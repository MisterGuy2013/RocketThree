const carName = "chassisBody";

const scene = new THREE.Scene();




var groundTexture = new THREE.TextureLoader().load( 'pic/grass.jpg' );
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set( 10, 17.5 );
groundTexture.anisotropy = 16;
groundTexture.encoding = THREE.sRGBEncoding;
var groundMaterial = new THREE.MeshStandardMaterial( { map: groundTexture } );

var wallTexture = new THREE.TextureLoader().load( 'pic/brick.jpeg' );
wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set( 5, 5 );
wallTexture.anisotropy = 16;
wallTexture.encoding = THREE.sRGBEncoding;
var wallMaterial = new THREE.MeshStandardMaterial( { map: wallTexture } );





var params = {
                modelcolor: 0xff0000,  //RED
                hitbox:true,
                modelvisible:true,
                blueScore:0,
                orangeScore:0,
                cameraFollow:"Chase",
                cameraLookAt:"Car"
            };




            



var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
if( isMobile.any() ) {alert("Im sorry this only works on computer, you can try on mobile but it will not be fun.");}

var isMobile = isMobile.any();
var world = new CANNON.World();

const camera = new THREE.PerspectiveCamera( 50, (window.innerWidth / window.innerHeight), 0.1, 1000 );
helper = new CannonHelper(scene);
camera.position.x = 15;
camera.position.y = 15;


///sky
scene.background = new THREE.Color( 'rgb(135,206,250)' );



if(!isMobile){
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );}
else{
  var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/1.5, window.innerHeight/1.5 );}

document.body.appendChild( renderer.domElement );
helper.addLights(renderer);



var light = new THREE.PointLight(0xffffff);
    light.position.set(0,200,0);
var color = 0xFFFFFF;
var intensity = 1.5;
var light2 = new THREE.AmbientLight(color, intensity);
///scene.add(light2);


var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
var cube = new THREE.Mesh( geometry, material );







const size = 100;
const divisions = 100;




///adding the ground





var parent = new THREE.Object3D();

var radius = 2.5

var geometry = new THREE.SphereGeometry( radius, 24, 16, 0 * Math.PI/2, Math.PI/2 );
var material = new THREE.MeshLambertMaterial( { color: "rgb(0,0,0)" } );
mesh = new THREE.Mesh( geometry, material );
parent.add( mesh );

var geometry = new THREE.SphereGeometry( radius, 24, 16, 1 * Math.PI/2, Math.PI/2 );
var material = new THREE.MeshLambertMaterial( { color: "rgb(255,0,0)" } );
mesh = new THREE.Mesh( geometry, material );
parent.add( mesh );

var geometry = new THREE.SphereGeometry( radius, 24, 16, 2 * Math.PI/2, Math.PI/2 );
var material = new THREE.MeshLambertMaterial( { color: "rgb(255,255,255)" } );
mesh = new THREE.Mesh( geometry, material );
parent.add( mesh );

var geometry = new THREE.SphereGeometry( radius, 24, 16, 3 * Math.PI/2, Math.PI/2 );
var material = new THREE.MeshLambertMaterial( { color: "rgb(0,0,255)" } );
mesh = new THREE.Mesh( geometry, material );
parent.add( mesh );
parent.position.set(0,15,0);

var groundMaterial = new THREE.MeshStandardMaterial( { map: groundTexture } );

parent.castShadow = true;
parent.receiveShadow = true;

scene.add(parent);





  ///helper.addLights(renderer);






        


/*var geometry = new THREE.PlaneGeometry(100,100,64,64);
var i;
		//make the terrain bumpy
		for (i = 0, l = geometry.vertices.length; i < l; i++) {
		  var vertex = geometry.vertices[i];
		  var value = groundMatrix[i];
		  vertex.z = value ;
		}

		//ensure light is computed correctly
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

		//create the ground form the geometry and material

		var ground = new THREE.Mesh(geometry,groundMaterial); 
		//rotate 90 degrees around the xaxis so we can see the terrain 
		ground.rotation.x = Math.PI/-2;
    ground.position.y = -4;
		
		//add the ground to the scene
		///scene.add(ground); 






*/





///adding a sphere_geometryvar radius = 1; // m

var sphereBody = new CANNON.Body({
   friction: 5,
   restitution: 0.3,
   contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e8,
            frictionEquationRegularizationTime: 3,
   mass: 5, // kg
   position: new CANNON.Vec3(0, 15, 0), // m
   shape: new CANNON.Sphere(radius),
   name: "ball"
});
sphereBody.name = "sphere";
world.addBody(sphereBody);






var cameraBody = new CANNON.Body({
   friction: 5,
   restitution: 0.3,
   contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e8,
            frictionEquationRegularizationTime: 3,
   mass: 5, // kg
   position: new CANNON.Vec3(15, 15, 0), // m
   shape: new CANNON.Sphere(0.3),
   name: "camera"
});
cameraBody.collisionResponse = 0;
world.add(cameraBody);
//helper.addVisual(cameraBody, "sphere", "normal")





controls = new THREE.OrbitControls (camera, document.getElementById("main"));






/*
var loader = new THREE.FontLoader();
loader.load('pic/font.json', 
function(font){
  var MyWords = "WARNING: EXPLOSIVE";
 var shape = new THREE.TextGeometry(MyWords, {font: font ,size:'4',curveSegments: 20, weight: 'normal',height : 4,hover:30});
 var wrapper = new THREE.MeshBasicMaterial({color: 0x65676,ambient: 0x030303, specular: 0x009900, shininess: 3});
 var words = new THREE.Mesh(shape, wrapper);
 words.position.x=50;
 words.position.z=-10;
 words.position.y=5;
 words.rotateY(-Math.PI/2);
 words.scale.set(0.5, 0.5, 0.5);
 scene.add(words);
});

 */





var geometry = new THREE.PlaneGeometry(10, 10, 10);
var material = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide});
var plane = new THREE.Mesh(geometry, material);
plane.rotation.x = Math.PI/2;

/*
old lights
var sunlight = new THREE.DirectionalLight(0xffffff, 2.0);
sunlight.position.set(-100, 100, 0);
scene.add(sunlight)
*/



/**
* Physics
**/



function preloader() {
     // counter
     var i = 0;


     // create object
     imageObj = new Image();


     // set image list
     images = new Array();
     images[0]="pic/Score/0-0.png"
     images[1]="pic/Score/0-1.png"
     images[2]="pic/Score/0-2.png"
     images[3]="pic/Score/1-0.png"
     images[4]="pic/Score/1-2.png"
     images[5]="pic/Score/2-1.png"
     images[6]="pic/Score/2-0.png"
     images[7]="pic/Score/2-2.png"
     images[8]="pic/Score/1-1.png"




     // start preloading
     for(i=0; i<=3; i++) 
     {
          imageObj.src=images[i];
     }
} 

preloader();

function resetBall(){
  sphereBody.position.set(0,15,0);
  sphereBody.quaternion.set(1,0,0,0)
  sphereBody.angularVelocity.set(0,0,0)
  sphereBody.velocity.set(0,0,0);
}



function score(goal){
  chassisBody.scored=true;
  var display = document.getElementById("main");
  if(goal == "Blue"){
    params.orangeScore++;
  }
  if(goal == "Orange"){
    params.blueScore++;
  }
  if(params.blueScore > 5){
    alert("blue wins!")
  }
  else if(params.orangeScore > 5){
    alert("orange wins!")
  }
  else{
  display.src = "/pic/Score/" + params.blueScore + "-" + params.orangeScore + ".png";
  }
  resetBall();
}




//try{

var jumptest = false;
var planeBody = undefined;
makeArena();



var box = undefined;
var boxTop = undefined;
var chassisBody = undefined;
makeCar(carName);




var gameBoost = new BOOST(scene, world, helper);
gameBoost.addBoostResponse(carName, 32);






world.broadphase = new CANNON.SAPBroadphase(world);
world.gravity.set(0, -5, 0);
world.defaultContactMaterial.friction = 0.1;

var groundMaterial = new CANNON.Material('groundMaterial');

 








var forma = new CANNON.Box(new CANNON.Vec3(2,2,2));
    var mass = 2;
    var box_alma2 = new CANNON.Body(mass);
    box_alma2.addShape(forma);
    box_alma2.useQuaternion = true;
    box_alma2.position.y = 80;
    world.add(box_alma2);
    helper.addVisual(box_alma2, "box", "normal");

/**
* Main
**/

function updatePhysics() {
/*  if(chassisBody.velocity.y < 0){
    console.log(chassisBody.velocity.y);
  }*/




  world.step(1/60);





  // update the chassis position
  box.position.copy(chassisBody.position);
  box.quaternion.copy(chassisBody.quaternion);
  boxTop.position.set(chassisBody.position.x,chassisBody.position.y + 0.2,chassisBody.position.z -0.3);
  boxTop.quaternion.copy(chassisBody.quaternion);
  parent.position.copy(sphereBody.position);
  parent.quaternion.copy(sphereBody.quaternion);
  ///parent.quaternion.set(sphereBody.quaternion.x, sphereBody.quaternion.y, sphereBody.quaternion.z, sphereBody.quaternion.w );
        if(chassisBody.position.y <= -3.50){
          jumptest = true;
        }
        else if(chassisBody.position.y >= -2.75){
          jumptest = false;
        }

}

clock = new THREE.Clock();
var lastPos = new THREE.Vector3(0,0,0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
function animate() {
  helper.updateBodies(world);
  updatePhysics();
   var diff = new THREE.Vector3().copy(box.position).sub(lastPos);
  ///light.position.copy(camera.position);
  ///scene.add(light); 







    

    if(params.cameraFollow == "Chase"){
    

     //camera time
direction = new CANNON.Vec3();
if(params.cameraFollow == "Chase"){
directionVadd = new CANNON.Vec3(0,1.5,-7);
var newpos = new CANNON.Vec3(chassisBody.position.x, chassisBody.position.y, chassisBody.position.z);
chassisBody.quaternion.vmult(directionVadd, directionVadd);
newpos.vadd(directionVadd, newpos)
newpos.vsub(cameraBody.position, direction);
//direction.y = 0;
//direction.normalize();

// Get the rotation between the forward vector and the direction vector
var forward = new CANNON.Vec3(0,0,1);
cameraBody.quaternion.setFromVectors(forward, direction);

// Multiply direction by 10 and store in body.velocity
var fixedSpeed = 5;
direction.mult(fixedSpeed,cameraBody.velocity);
    camera.position.copy(cameraBody.position);
}


    if(camera.position.y <= -4.25){
      camera.position.y = -4.15
    }}
    else if(params.cameraFollow == "Ball Camera"){
  /*
  math class finally helped, 
  y = mx + b 
  m = (y2-y1)/(x2-x1)
  b = -mx + y
  x = (y-b)/m
  inverse: I=1/m
  d = m*v
  v = d/m
  so get m and b, 
  get 
  */
  var cameraDistance = 2;
  var slope = (box.position.z-parent.position.z)/(box.position.x-parent.position.x);
  var intercept = (-slope * box.position.x) + box.position.z;
  var slopeInverse = 1/slope;
  var multiplicationVar = cameraDistance/slopeInverse;
  var x = box.position.x + multiplicationVar;
  var z = box.position.z + slope*multiplicationVar
  var cameraDistance = 2;
  var slope = (box.position.z-parent.position.z)/(box.position.x-parent.position.x);
  var intercept = (-slope * box.position.x) + box.position.z;
  var slopeInverse = 1/slope;
  var multiplicationVar = cameraDistance/slopeInverse;
  var x = box.position.x + 2;
  var z = slope*(box.position.x+2) + intercept;


  
  cameraBody.position.set(x, -3, z);
  camera.position.copy(cameraBody.position);
}
if(params.cameraFollow == "Normal"){
camera.position.add(diff);
controls.update();
}



if(params.cameraLookAt == "Car"){
    controls.target.copy(box.position)
    controls.update();
}
else if(params.cameraLookAt == "Ball"){
  controls.target.copy(parent.position)
    controls.update();
}
    lastPos.copy(box.position);
    controls.update();





box.lookAt(parent.position);
	requestAnimationFrame( animate );
	
  
  
  
  
  renderer.render( scene, camera );
  lastPos = new THREE.Vector3().copy(box.position);
}




// it looks cool setTimeout(function(){cameraBody.position.set(25,0,15)},2500 )


var sense = 50;

function mobile(){
  if(isMobile){
  if(joystick.deltaY() < -1*sense){
    upPressed = true;
  }
  else{
    upPressed = false;
  }
  if(joystick.deltaY() > sense){
    downPressed = true;
  }
  else{
    downPressed = false;
  }
  if(joystick.deltaX() < -1*sense){
    leftPressed = true;
  }
  else{
    leftPressed = false;
  }
  if(joystick.deltaX() > sense){
    rightPressed = true;
  }
  else{
    rightPressed = false;
  }
  

  }
}



console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");
	
			var joystick	= new VirtualJoystick({
				container	: document.getElementById('container'),
				mouseSupport	: true,
			});
			joystick.addEventListener('touchStart', function(){
				console.log('down')
			})
			joystick.addEventListener('touchEnd', function(){
				console.log('up')
			})

			setInterval(mobile
				, 1/30 * 1000);




    





























var gui = new dat.GUI({
    height : 5 * 32 - 1
});
var folder = gui.addFolder( 'Developer' );
var carfolder = gui.addFolder( 'Car' );
var camerafolder = gui.addFolder( 'Camera' );
/*folder.addColor( params, 'modelcolor' )  
                .name('Developer')
                .listen()
                .onChange( function() { materialmodel.MeshPhongMaterial.color.set( params.modelcolor); } );     */
function makedevgui(){
folder.add(params, "hitbox")
.name('Hitboxes')
.listen()
.onChange(function(){box.material.visible = params.hitbox;boxTop.material.visible = params.hitbox;});
            folder.open();
folder.add(params, "modelvisible")
.name('Model is Visible')
.listen()
.onChange(function(){box.children[0].visible = params.modelvisible;});
            folder.open();}


function makecargui(){
carfolder.add(gameBoost, carName).min(0).max(100)
.name('Boost')
.listen()
.onChange(function(){});
            carfolder.open();}
makecargui();

function makecameragui(){
camerafolder.add(params, "cameraFollow", ["Chase", "Ball Camera", "Normal"])
.name('Camera Follow Confinguration')
.listen()
.onChange(function(){});
            camerafolder.open();
}
makecameragui();




animate();









/*
}
catch(err){
  alert(err);
}*/
