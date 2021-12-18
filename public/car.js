

var opressed = false;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var handBrake = false;
var reset = false;
var jump = false;
jumptest = false;
var boost = false;
var mumbaidrift = false;

var engineForce = 3000,
      maxSteerVal = 0.5, maxForce = 6000, brakeF = 10, brake = 50;












/*
function carAction(action){
  console.log(action);
  if(action == "forward"){
    upPressed = true;
  }
  else if(action == "forward-left"){
    upPressed = true;
    leftPressed = true;
  }
  else if(action == "forward-right"){
    leftPressed = false;
    upPressed = true;
    rightPressed = false;
  }
  else if(action == "backward"){
    backPressed = true;
    upPressed = false;
    leftPressed=false;
    rightPressed=false;
  }
  else if(action == "nothing"){
     backPressed = false;
    upPressed = false;
    leftPressed=false;
    rightPressed=false;
  }
  else{
    backPressed = false;
  }
}
*/

function carAction(throttle, angle, precision, velocityCut, other){
  angle = 180;
  var euler = new THREE.Euler();
var rotation = euler.setFromQuaternion(box.quaternion);
var radians = rotation.y > 0 ? rotation.y : (2 * Math.PI) + rotation.y;
var degrees = THREE.Math.radToDeg(radians);

  if(throttle > 0){
    upPressed = true;
    downPressed = false;
  }
  else if(throttle < 0){
    downPressed = true;
    upPressed = false;
  }
  else{
    upPressed = false;
    downPressed = false;
  }

  
  //console.log("" + degrees);

degree = degrees;
angles = angle;
angle = degrees - angles;
degrees = (angles - degree + 180 + 360) % 360 - 180;

//degrees = degree-angles;
//Math.min(Math.abs(degree - angles), 360 - Math.abs(degree - angles));
//degrees+=180;
//angle = (angles - degree + 180 + 360) % 360 - 180;

//console.log("degree" + degrees);
//console.log("anlge" + angle);
//console.log("angle" + angle);

  if(degrees >= -precision && degrees<=precision){
    leftPressed = false;
    rightPressed = false;
    
    
  }
  else if(degrees > precision && degrees< 180){
    chassisBody.angularVelocity.y = chassisBody.angularVelocity.y/velocityCut;
    leftPressed = true;
    rightPressed = false;
  }
  else if(degrees < -precision && degrees>  -180){
    chassisBody.angularVelocity.y = chassisBody.angularVelocity.y/velocityCut;
    rightPressed = true;
    leftPressed = false;
  }
  else{
    console.log("e")
  }
}









function makeCar(carName){




























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
    if(event.shiftKey == true) {
        boost = true;
    }
    if(event.keyCode == 77) {
        mumbaidrift = true;
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
    if(event.shiftKey == false) {
        boost = false;
    }
    if(event.keyCode == 77) {
        mumbaidrift = false;
    }
}



var drift = false
function check(){
  var pitchSpeed = 0, rollSpeed = 0, yawSpeed = 0, forwardsmove = false,  backwardsmove = false;
      vehicle.setBrake(0, 0);
			vehicle.setBrake(0, 1);
			vehicle.setBrake(0, 2);
			vehicle.setBrake(0, 3);
      if(jump == true){

        if(jumptest == true){
          chassisBody.velocity.y = 5;   
               console.log("jump");
          jumptest=false;
        }
      }
  if(upPressed){
    forwardsmove = true;
    vehicle.applyEngineForce(-engineForce, 2);
    vehicle.applyEngineForce(-engineForce, 3);
    pitchSpeed = 1;

    

  }
  else if(downPressed){
    backwardsmove = true;
    vehicle.applyEngineForce(engineForce, 2);
    vehicle.applyEngineForce(engineForce, 3);
    pitchSpeed = -1;
  }
  else if(handBrake){
    vehicle.applyEngineForce(0, 2);
    vehicle.applyEngineForce(0, 3);
    vehicle.setBrake(brakeF, 0);
			vehicle.setBrake(brakeF, 1);
			vehicle.setBrake(brakeF, 2);
			vehicle.setBrake(brakeF, 3);
  }
  if(boost && gameBoost[carName] > 0){
    var stats = document.getElementById("stats");
    vehicle.applyEngineForce(-engineForce * 1.5, 2);
    vehicle.applyEngineForce(-engineForce * 1.5, 3);
    var localForward = new CANNON.Vec3(0,0,0.3);
     var worldForward = new CANNON.Vec3(); 
    chassisBody.vectorToWorldFrame(localForward, worldForward);
    chassisBody.velocity.x += worldForward.x;
    chassisBody.velocity.y += worldForward.y;
    chassisBody.velocity.z += worldForward.z;
    console.log(worldForward);
    /*
    chassisBody.velocity.set(box.rotation.x, box.rotation.y, box.rotation.z);
    */

    /*
    var directionVector = new CANNON.Vec3(0,0,10);
    var y = chassisBody.velocity.y;
		chassisBody.quaternion.vmult(directionVector, chassisBody.velocity);*/

    /*
    if(jumptest == false){
    if(chassisBody.position.y<-0.5){
      if(chassisBody.position.y<-9.8){
        console.log("Yweas")
        if(chassisBody.velocity.y <-9.8){

        }
        else{
        chassisBody.velocity.y += -9.8;
        }
      }
      else{
    chassisBody.velocity.y += chassisBody.velocity.y;
    }
    }
    else{
      chassisBody.velocity.y += -5;
    }
    }
    else{
      chassisBody.velocity.y -= 1;
    }
    */
    gameBoost[carName]-=1;

  }
  else if(!boost && !downPressed && !handBrake && !upPressed){
    vehicle.applyEngineForce(0, 2);
    vehicle.applyEngineForce(0, 3);
    vehicle.setBrake(brakeF, 0);
			vehicle.setBrake(brakeF, 1);
			vehicle.setBrake(brakeF, 2);
			vehicle.setBrake(brakeF, 3);
  }
  if(leftPressed){
    if(jumptest){
      if(downPressed){
        yawSpeed = chassisBody.angularVelocity.y - 0.1;
      }
      else{
      yawSpeed = chassisBody.angularVelocity.y + 0.1;
      }
    }
    else{
    yawSpeed = 2;
    }
      vehicle.setSteeringValue(maxSteerVal, 2);
      vehicle.setSteeringValue(maxSteerVal, 3);
  }
  else if(rightPressed){
    if(jumptest){
      if(downPressed){
        yawSpeed = chassisBody.angularVelocity.y + 0.1;
      }
      else{
      yawSpeed = chassisBody.angularVelocity.y - 0.1;
      }
    }
    else{
    yawSpeed = -2;
    }
      vehicle.setSteeringValue( -maxSteerVal, 2);
      vehicle.setSteeringValue( -maxSteerVal, 3);
  }
  else{
    vehicle.setSteeringValue( 0, 2);
      vehicle.setSteeringValue( 0, 3);
  }
  if(opressed){
    drift = true;
    ///vehicle.friction = 0.5;
    //vehicle.friction = 0.5;
    engineForce = 1000000000;
    maxForce = 100000000;
    console.log("go");
    vehicle.applyEngineForce(-engineForce, 2);
    vehicle.applyEngineForce(-engineForce, 3);
  }
  else{
    drift = false
    //vehicle.friction = 5
    //vehicle.friction = 5
    engineForce = 1000;
    maxForce = 4000;
  }
  if(reset){
    chassisBody.position.y = 1.5;
      chassisBody.angularVelocity.set(0, 0, 0); 
      chassisBody.velocity.set(0, 0, 0); // 
      chassisBody.quaternion.setFromEuler(0, 0, 0);
  }



  if(upPressed||downPressed||rightPressed||leftPressed){
    if(jumptest){
      pitchSpeed = 0;
    }
    if(forwardsmove || backwardsmove || boost){
      
    }
    else{
      if(jumptest){
      yawSpeed = 0
      }
    }
    var directionVector = new CANNON.Vec3(pitchSpeed, yawSpeed, rollSpeed);
		chassisBody.quaternion.vmult(directionVector, chassisBody.angularVelocity);
  }
  else{
    chassisBody.angularVelocity.x = chassisBody.angularVelocity.x / 1.1;
    chassisBody.angularVelocity.y = chassisBody.angularVelocity.y / 1.1;
    chassisBody.angularVelocity.z = chassisBody.angularVelocity.z / 1.1;
    vehicle.apply
    
  }
  if(mumbaidrift){
    chassisBody.angularVelocity.y += 5;
  }

}





window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);
setInterval(check,30);



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
chassisBody = new CANNON.Body({mass: 250});
chassisBody.addShape(chassisShapeBottom);
chassisBody.addShape(chassisShapeTop, offset);
chassisBody.position.set(0, 3, 0);
chassisBody.angularVelocity.set(0, 0, 0); // initial velocity
chassisBody.name = carName;
// car visual bod
var geometry = new THREE.BoxGeometry(xlength*2, ylength*2, zlength*2); 

var material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
box = new THREE.Mesh(geometry, material);

//now make the top visule part of the hitbox
var geometry = new THREE.BoxGeometry(1, 0.5, 1.6); // double chasis shape
// double chasis shape
boxTop = new THREE.Mesh(geometry, material);





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
    makedevgui();
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

  }
});

box.castShadow = true;
box.receiveShadow = true;








chassisBody.addEventListener("collide", function(e){
  if(e.body.name == "sphere"){
    chassisBody.hitBall=true;
    console.log("yaya");
  }
  else if(e.body.name == "Wall2" || e.body.name == "box"){
    chassisBody.hitwall=true;
    console.log("illegal");
  }
  else{console.log(e.body.name);
  }
});




 return chassisBody;



}