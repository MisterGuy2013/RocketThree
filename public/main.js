var groundTexture = new THREE.TextureLoader().load( 'pic/grass.jpg' );
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set( 50, 50 );
groundTexture.anisotropy = 16;
groundTexture.encoding = THREE.sRGBEncoding;






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
const scene = new THREE.Scene();
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




var light = new THREE.PointLight(0xffffff);
    light.position.set(0,200,0);
var color = 0xFFFFFF;
var intensity = 1.5;
var light2 = new THREE.AmbientLight(color, intensity);
///scene.add(light2);


var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
var cube = new THREE.Mesh( geometry, material );




controls = new THREE.OrbitControls (camera, renderer.domElement);


const size = 100;
const divisions = 100;




///adding the ground



var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1000, 1000 ), groundMaterial );
			mesh.position.y = -4.225;
			mesh.rotation.x = - Math.PI / 2;
			mesh.receiveShadow = true;

			scene.add( mesh );

      var geometry = new THREE.PlaneGeometry(10, 10, 10);
var material = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide});
var plane = new THREE.Mesh(geometry, material);
plane.rotation.x = Math.PI/2;
///plane.position.y = -4.225;


      var q = plane.quaternion;
var planeBody = new CANNON.Body({
  mass: 0, // mass = 0 makes the body static
  material: groundMaterial,
  shape: new CANNON.Plane(),
  quaternion: new CANNON.Quaternion(-q._x, q._y, q._z, q._w),
  friction: 30,
  restitution: 0.3,
  contactEquationStiffness: 1e8,
            contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e8,
            frictionEquationRegularizationTime: 3,});
planeBody.position.y = -4.225;
planeBody.name = "planeBody";
world.add(planeBody);


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
   mass: 50, // kg
   position: new CANNON.Vec3(0, 15, 0), // m
   shape: new CANNON.Sphere(radius),
   name: "test"
});
sphereBody.name = "sus";
world.addBody(sphereBody);




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
var opressed = false;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var handBrake = false;
var reset = false;
var jump = false;
var jumptest = false;















function keyDownHandler(event) {
    if(event.keyCode == 68) {
        rightPressed = true;
    }
    else if(event.keyCode == 65) {
        leftPressed = true;
    }
    if(event.keyCode == 83) {
    	downPressed = true;
    }
    else if(event.keyCode == 87) {
    	upPressed = true;
    }
    if(event.keyCode == 17){
      handBrake = true;
    }
    if(event.keyCode == 82){
      reset = true;
    }
    if(event.keyCode == 32){
      //space
      jump = true;
    }
    if(event.keyCode == 79) {
        opressed = true;
    }
}
function keyUpHandler(event) {
    if(event.keyCode == 68) {
        rightPressed = false;
    }
    else if(event.keyCode == 65) {
        leftPressed = false;
    }
    if(event.keyCode == 83) {
    	downPressed = false;
    }
    else if(event.keyCode == 87) {
    	upPressed = false;
    }
    if(event.keyCode == 17){
      handBrake = false;
    }
    if(event.keyCode == 82){
      reset = false;
    }
    if(event.keyCode == 32){
      //space
      jump = false;
    }
    if(event.keyCode == 79) {
        opressed = false;
    }
    if(event.keyCode == 79) {
        opressed = false;
    }
}
var engineForce = 3000,
      maxSteerVal = 0.5, maxForce = 6000, brakeF = 30, brake = 50;
if(isMobile){
  brakeF = 7.5;
}

var drift = false
function check(){
      vehicle.setBrake(0, 0);
			vehicle.setBrake(0, 1);
			vehicle.setBrake(0, 2);
			vehicle.setBrake(0, 3);
      if(jump == true){

        if(jumptest == true){
          chassisBody.velocity.y = 5;   
               console.log("jump")
          jumptest=false;
        }
      }
  if(upPressed){
    
    vehicle.applyEngineForce(-engineForce, 2);
    vehicle.applyEngineForce(-engineForce, 3);
    if(chassisBody.angularVelocity.x >= -3){
    //chassisBody.localAngularVelocity.x-=0.1;
    //chassisBody.angularVelocity = new CANNON.Vec3.forward * 1.0;
    console.log(chassisBody)}
    //chassisBody.rotation.velocity.y+=0.5;
    
    //chassisBody.addLocalForce(engineForce, new CANNON.Vec3(chassisBody.position.x, chassisBody.position.y -5, chassisBody.position.z));
  }
  else if(downPressed){
    vehicle.applyEngineForce(engineForce, 2);
    vehicle.applyEngineForce(engineForce, 3);
    if(chassisBody.angularVelocity.x <= 3){
    chassisBody.angularVelocity.x+=0.1;}
  }
  else if(handBrake){
    vehicle.applyEngineForce(0, 2);
    vehicle.applyEngineForce(0, 3);
    vehicle.setBrake(brakeF, 0);
			vehicle.setBrake(brakeF, 1);
			vehicle.setBrake(brakeF, 2);
			vehicle.setBrake(brakeF, 3);
  }
  else{
    vehicle.applyEngineForce(0, 2);
    vehicle.applyEngineForce(0, 3);
    vehicle.setBrake(brakeF, 0);
			vehicle.setBrake(brakeF, 1);
			vehicle.setBrake(brakeF, 2);
			vehicle.setBrake(brakeF, 3);
  }
  if(leftPressed){
    chassisBody.angularVelocity.y += 0.25;
      vehicle.setSteeringValue(maxSteerVal, 2);
      vehicle.setSteeringValue(maxSteerVal, 3);
  }
  else if(rightPressed){
    chassisBody.angularVelocity.y -= 0.25;
      vehicle.setSteeringValue( -maxSteerVal, 2);
      vehicle.setSteeringValue( -maxSteerVal, 3);
  }
  else{
    vehicle.setSteeringValue( 0, 2);
      vehicle.setSteeringValue( 0, 3);
  }
  if(opressed){
    drift = true
    ///vehicle.friction = 0.5;
    //vehicle.friction = 0.5;
    engineForce = 1000000000
    maxForce = 100000000
    console.log("go");
    vehicle.applyEngineForce(-engineForce, 2);
    vehicle.applyEngineForce(-engineForce, 3);
  }
  else{
    drift = false
    //vehicle.friction = 5
    //vehicle.friction = 5
    engineForce = 1000
    maxForce = 4000
  }
  if(reset){
    chassisBody.position.y = 1.5;
      chassisBody.angularVelocity.set(0, 0, 0); 
      chassisBody.velocity.set(0, 0, 0); // 
      chassisBody.quaternion.setFromEuler(0, 0, 0);
  }
}




window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);
setInterval(check,30);





var geometry = new THREE.PlaneGeometry(10, 10, 10);
var material = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide});
var plane = new THREE.Mesh(geometry, material);
plane.rotation.x = Math.PI/2;

var sunlight = new THREE.DirectionalLight(0xffffff, 2.0);
sunlight.position.set(-100, 100, 0);
scene.add(sunlight)

/**
* Physics
**/











world.broadphase = new CANNON.SAPBroadphase(world);
world.gravity.set(0, -5, 0);
world.defaultContactMaterial.friction = 0.1;

var groundMaterial = new CANNON.Material('groundMaterial');
var wheelMaterial = new CANNON.Material('wheelMaterial');
var wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
    friction: 0.1,
    restitution: 0.0,
    contactEquationStiffness: 0,
});

world.addContactMaterial(wheelGroundContactMaterial);

// car physics body

var xlength = 0.5, ylength = 0.15, zlength = 1.2;
var chassisShapeBottom = new CANNON.Box(new CANNON.Vec3(xlength, ylength, zlength));
var chassisShapeTop = new CANNON.Box(new CANNON.Vec3(0.5, 0.25, 0.8));
var offset = new CANNON.Vec3(0,0.20,-0.3);
//chassisShapeTop.position.set(0,1,0);
var chassisBody = new CANNON.Body({mass: 500});
chassisBody.addShape(chassisShapeBottom);
chassisBody.addShape(chassisShapeTop, offset);
chassisBody.position.set(0, 3, 0);
chassisBody.angularVelocity.set(0, 0, 0); // initial velocity
chassisBody.name = "chassisBody";
// car visual bod
var geometry = new THREE.BoxGeometry(xlength*2, ylength*2, zlength*2); 

var material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
var box = new THREE.Mesh(geometry, material);

//now make the top visule part of the hitbox
var geometry = new THREE.BoxGeometry(1, 0.5, 1.6); // double chasis shape
// double chasis shape
var boxTop = new THREE.Mesh(geometry, material);





////loading the model
var loader = new THREE.GLTFLoader();



// Load a glTF resource
loader.load(
	// resource URL
  
	'pic/NoWheel.glb',
	// called when the resource is loaded
	function ( gltf ) {
    box.material.visible = false;
    boxTop.material.visible = false;
    params.hitbox = false;
   // updategui();
    ///box.position.y = 0.15;
    gltf.scene.rotation.y = Math.PI / 2;
    gltf.scene.position.y = -0.50;

    gltf.scene.name = "GLTF";
		box.add( gltf.scene );
    makegui();
		// Object
	});
scene.add(box);
scene.add(boxTop);




// parent vehicle object
vehicle = new CANNON.RaycastVehicle({
  chassisBody: chassisBody,
  indexRightAxis: 0, // x
  indexUpAxis: 1, // y
  indexForwardAxis: 2, // z
  name:"chassisBody"
});

// wheel options
var options = {
  radius: 0.25,
  directionLocal: new CANNON.Vec3(0, -1, 0),
  suspensionStiffness: 85,
  suspensionRestLength: 0.4,
  frictionSlip: 5,
  dampingRelaxation: 1.3,
  dampingCompression: 2.3,
  maxSuspensionForce: 200000,
  rollInfluence:  0.01,
  axleLocal: new CANNON.Vec3(-1, 0, 0),
  chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
  maxSuspensionTravel: 0.20,
  customSlidingRotationalSpeed: -30,
  useCustomSlidingRotationalSpeed: true,
  name:"wheel"
};

var axlewidth = 0.7;

var down = -1.3

options.chassisConnectionPointLocal.set(axlewidth, 0, -1);
options.directionLocal = new CANNON.Vec3(-0.575,down,0.625);
vehicle.addWheel(options);

options.chassisConnectionPointLocal.set(-axlewidth, 0, -1);
options.directionLocal = new CANNON.Vec3(0.575,down,0.625);
vehicle.addWheel(options);

options.chassisConnectionPointLocal.set(axlewidth, 0, 1);
options.directionLocal = new CANNON.Vec3(-0.575,down,-0.35);
vehicle.addWheel(options);

options.chassisConnectionPointLocal.set(-axlewidth, 0, 1);
options.directionLocal = new CANNON.Vec3(0.575,down,-0.35);
vehicle.addWheel(options);

console.log(vehicle);
vehicle.wheelInfos[0].name = "wheels";
vehicle.addToWorld(world);



wheelNum = 0;
// car wheels
var wheelradius = 0.25;
var wheelBodies = [],
    wheelVisuals = [];
vehicle.wheelInfos.forEach(function(wheel) {
  var shape = new CANNON.Cylinder(wheelradius, wheelradius, wheelradius / 2, 20);
  var body = new CANNON.Body({mass: 1, material: wheelMaterial,name:"wheel"});
  var q = new CANNON.Quaternion();
  q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
  body.addShape(shape, new CANNON.Vec3(), q);
  wheelBodies.push(body);
  // wheel visual body
  var geometry = new THREE.CylinderGeometry( wheelradius, wheelradius, 0.2, 32 );
  var material = new THREE.MeshPhongMaterial({
    color: 'rgb(16, 16, 16)',
    emissive: 'rgb(16, 16, 16)',
    side: THREE.DoubleSide,
    flatShading: true,
  });
  var cylinder = new THREE.Mesh(geometry, material);
  cylinder.geometry.rotateZ(Math.PI/2);
  wheelVisuals.push(cylinder);
  scene.add(cylinder);
  
  var loader = new THREE.GLTFLoader();



// Load a glTF resource
loader.load(
	// resource URL
  
	'pic/wheel.glb',
	// called when the resource is loaded
	function ( gltf ) {
    cylinder.material.visible = false;
    ///box.position.y = 0.15;
    gltf.scene.position.y = 0.0;
    if(wheelNum == 0 || wheelNum==2){
      
      gltf.scene.rotation.y = Math.PI / -2;
    }
    else{
      gltf.scene.rotation.y = Math.PI / 2;
    }
    
		cylinder.add( gltf.scene );
    wheelNum+=1;
		// Object
  
	});
  
});

// update the wheels to match the physics
world.addEventListener('postStep', function() {
  for (var i=0; i<vehicle.wheelInfos.length; i++) {
    vehicle.updateWheelTransform(i);
    var t = vehicle.wheelInfos[i].worldTransform;
    // update wheel physics
    wheelBodies[i].position.copy(t.position);
    wheelBodies[i].quaternion.copy(t.quaternion);
    // update wheel visuals
    wheelVisuals[i].position.copy(t.position);
    wheelVisuals[i].quaternion.copy(t.quaternion);
    
    /*wheelBodies[i].addEventListener("collide",function(e){ 

        jumptest = true;

        
});
chassisBody.addEventListener("collide",function(e){
        //console.log(e.body.name); use to long name
        jumptest = true;
        });
        */

  }
  planeBody.addEventListener("collide",function(e){
        //console.log(e.body.name); use to long name
        //console.log(chassisBody.position.y);
        if(e.body.name == "wheel" || e.body.name == "chassisBody" ){
        jumptest = true;}
        });
        if(chassisBody.position.y <= -3.75){
          jumptest = true;
        }
});









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
  world.step(1/60);
  // update the chassis position
  box.position.copy(chassisBody.position);
  box.quaternion.copy(chassisBody.quaternion);
  boxTop.position.set(chassisBody.position.x,chassisBody.position.y + 0.2,chassisBody.position.z -0.3);
  boxTop.quaternion.copy(chassisBody.quaternion);
  parent.position.copy(sphereBody.position);
  parent.quaternion.copy(sphereBody.quaternion);
  ///parent.quaternion.set(sphereBody.quaternion.x, sphereBody.quaternion.y, sphereBody.quaternion.z, sphereBody.quaternion.w );

}

clock = new THREE.Clock();
var lastPos = new THREE.Vector3(0,0,0);
function animate() {
  helper.updateBodies(world);
  updatePhysics();
  ///light.position.copy(camera.position);
  ///scene.add(light); 







    

    
     let diff = new THREE.Vector3().copy(box.position).sub(lastPos);

    camera.position.add(diff);

    controls.target.copy(box.position)
    controls.update();
    lastPos.copy(box.position);
    controls.update();



	requestAnimationFrame( animate );
	renderer.render( scene, camera );
  lastPos = new THREE.Vector3().copy(box.position);
}
animate();






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




    


























var params = {
                modelcolor: 0xff0000,  //RED
                hitbox:true,
                modelvisible:true
            };


var gui = new dat.GUI({
    height : 5 * 32 - 1
});
var folder = gui.addFolder( 'Developer' );
/*folder.addColor( params, 'modelcolor' )  
                .name('Developer')
                .listen()
                .onChange( function() { materialmodel.MeshPhongMaterial.color.set( params.modelcolor); } );     */
function makegui(){
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