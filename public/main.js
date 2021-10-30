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




controls = new THREE.OrbitControls (camera, renderer.domElement);


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







function resetBall(){
  sphereBody.position.set(0,15,0);
  sphereBody.quaternion.set(1,0,0,0)
  sphereBody.angularVelocity.set(0,0,0)
  sphereBody.velocity.set(0,0,0);
}










var jumptest = false;
var planeBody = undefined;
makeArena();



var box = undefined;
var boxTop = undefined;
var chassisBody = undefined;
makeCar();







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
        else if(chassisBody.position.y >= -1.75){
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
                modelvisible:true,
                boost:32
            };


var gui = new dat.GUI({
    height : 5 * 32 - 1
});
var folder = gui.addFolder( 'Developer' );
var carfolder = gui.addFolder( 'Car' );
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
carfolder.add(params, "boost").min(0).max(100)
.name('Boost')
.listen()
.onChange(function(){});
            carfolder.open();}
makecargui();