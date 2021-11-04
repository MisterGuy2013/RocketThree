function makeArena(){
function makeSideWalls(){



/// Making the side walls
var wall = new CANNON.Body({
friction: 5,
   restitution: 0.3,
   contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e8,
            frictionEquationRegularizationTime: 3,
   mass: 0, // kg
   position: new CANNON.Vec3(50, 0, 0), // m
   shape: new CANNON.Box(new CANNON.Vec3(10,50,100)),
   name: "Wall1"
})
world.add(wall);
helper.addVisual(wall, "box", wallMaterial);

var wall = new CANNON.Body({
friction: 5,
   restitution: 0.3,
   contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e8,
            frictionEquationRegularizationTime: 3,
   mass: 0, // kg
   position: new CANNON.Vec3(-50, 0, 0), // m
   shape: new CANNON.Box(new CANNON.Vec3(10,50,100)),
   name: "Wall2"
})
world.add(wall);
helper.addVisual(wall, "box", wallMaterial);
}


makeSideWalls();






function makeOtherWalls(){
  

//top wall 2


var wallTexture2 = new THREE.TextureLoader().load( 'pic/brick.jpeg' );
wallTexture2.wrapS = wallTexture2.wrapT = THREE.RepeatWrapping;
wallTexture2.repeat.set( 2.25, 2.25 );
wallTexture2.anisotropy = 16;
wallTexture2.encoding = THREE.sRGBEncoding;
var wallMaterial2 = new THREE.MeshStandardMaterial( { map: wallTexture2 } );



var wall = new CANNON.Body({
friction: 5,
   restitution: 0.3,
   contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e8,
            frictionEquationRegularizationTime: 3,
   mass: 0, // kg
   position: new CANNON.Vec3(0, 27.5, -90), // m
   shape: new CANNON.Box(new CANNON.Vec3(50,22.5,10)),
   name: "Wall2"
})
world.add(wall);
helper.addVisual(wall, "box", wallMaterial2);

//left wall 2


var wallTexture3 = new THREE.TextureLoader().load( 'pic/brick.jpeg' );
wallTexture3.wrapS = wallTexture3.wrapT = THREE.RepeatWrapping;
wallTexture3.repeat.set( 0.5, 0.5 );
wallTexture3.anisotropy = 16;
wallTexture3.encoding = THREE.sRGBEncoding;
var wallMaterial3 = new THREE.MeshStandardMaterial( { map: wallTexture3 } );


var wall = new CANNON.Body({
friction: 5,
   restitution: 0.3,
   contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e8,
            frictionEquationRegularizationTime: 3,
   mass: 0, // kg
   position: new CANNON.Vec3(30, 0, -90), // m
   shape: new CANNON.Box(new CANNON.Vec3(15,5,10)),
   name: "Wall2"
})
world.add(wall);
helper.addVisual(wall, "box", wallMaterial3);

//right wall 2



var wall = new CANNON.Body({
friction: 5,
   restitution: 0.3,
   contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e8,
            frictionEquationRegularizationTime: 3,
   mass: 0, // kg
   position: new CANNON.Vec3(-30, 0, -90), // m
   shape: new CANNON.Box(new CANNON.Vec3(15,5,10)),
   name: "Wall2"
})
world.add(wall);
helper.addVisual(wall, "box", wallMaterial3);


//top wall 2
//new wall side


var wall = new CANNON.Body({
friction: 5,
   restitution: 0.3,
   contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e8,
            frictionEquationRegularizationTime: 3,
   mass: 0, // kg
   position: new CANNON.Vec3(0, 27.5, 90), // m
   shape: new CANNON.Box(new CANNON.Vec3(50,22.5,10)),
   name: "Wall2"
})
world.add(wall);
helper.addVisual(wall, "box", wallMaterial2);

//left wall 1




var wall = new CANNON.Body({
friction: 5,
   restitution: 0.3,
   contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e8,
            frictionEquationRegularizationTime: 3,
   mass: 0, // kg
   position: new CANNON.Vec3(30, 0, 90), // m
   shape: new CANNON.Box(new CANNON.Vec3(15,5,10)),
   name: "Wall2"
})
world.add(wall);
helper.addVisual(wall, "box", wallMaterial3);

//right wall 1



var wall = new CANNON.Body({
friction: 5,
   restitution: 0.3,
   contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e8,
            frictionEquationRegularizationTime: 3,
   mass: 0, // kg
   position: new CANNON.Vec3(-30, 0, 90), // m
   shape: new CANNON.Box(new CANNON.Vec3(15,5,10)),
   name: "Wall2"
})
world.add(wall);
helper.addVisual(wall, "box", wallMaterial3);



//make the walls outside of the contact walls
var wall = new CANNON.Body({
friction: 5,
   restitution: 0.3,
   contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e8,
            frictionEquationRegularizationTime: 3,
   mass: 0, // kg
   position: new CANNON.Vec3(0, 0, -100), // m
   shape: new CANNON.Box(new CANNON.Vec3(15,5,10)),
   name: "Wall2"
})
world.add(wall);
helper.addVisual(wall, "box", wallMaterial3);

var wall = new CANNON.Body({
friction: 5,
   restitution: 0.3,
   contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e8,
            frictionEquationRegularizationTime: 3,
   mass: 0, // kg
   position: new CANNON.Vec3(0, 0, 100), // m
   shape: new CANNON.Box(new CANNON.Vec3(15,5,10)),
   name: "Wall2"
})
world.add(wall);
helper.addVisual(wall, "box", wallMaterial3);

}
makeOtherWalls()




function makeContactWalls(){
function blueWall(){
  ///materials
var bluewall = new THREE.MeshLambertMaterial({color: '#2ce9ff', transparent: true, opacity: 0.5});



  ///CONTACT walls
var contactwall = new CANNON.Body({
friction: 5,
   restitution: 0.3,
   contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e8,
            frictionEquationRegularizationTime: 3,
   mass: 0, // kg
   position: new CANNON.Vec3(0, 0, 95), // m
   shape: new CANNON.Box(new CANNON.Vec3(15,5,10)),
   name: "Contact"
})

  contactwall.collisionResponse = 0;
world.add(contactwall);
contactwall.addEventListener("collide",function(e){ 
  if(e.body.name == "sphere"){
        score("Blue");
  }
});
helper.addVisual(contactwall, "box", bluewall);
}
function orangeWall(){
  ///materials
var orangewall = new THREE.MeshLambertMaterial({color: '#FC540C', transparent: true, opacity: 0.5});



  ///CONTACT walls
var contactwall = new CANNON.Body({
friction: 5,
   restitution: 0.3,
   contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e8,
            frictionEquationRegularizationTime: 3,
   mass: 0, // kg
   position: new CANNON.Vec3(0, 0, -95), // m
   shape: new CANNON.Box(new CANNON.Vec3(15,5,10)),
   name: "Contact"
})

  contactwall.collisionResponse = 0;
world.add(contactwall);
contactwall.addEventListener("collide",function(e){ 
  if(e.body.name == "sphere"){
    score("Orange");
  }
});
helper.addVisual(contactwall, "box", orangewall);
}
blueWall();
orangeWall();
}


makeContactWalls();




function makeGround(){
jumptest = false;
var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 100, 200 ), groundMaterial );
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
planeBody = new CANNON.Body({
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
planeBody.addEventListener("collide",function(e){
        //console.log(e.body.name); use to long name
        //console.log(chassisBody.position.y);
        if(e.body.name == "wheel" || e.body.name == "chassisBody" ){
        jumptest = true;
        }
        });
world.add(planeBody);

}

makeGround();
}