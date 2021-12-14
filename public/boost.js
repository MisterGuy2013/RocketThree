const BOOST = function(scene, world, helper){
  this.boostResponse = {};

  this.addBoostResponse = function addBoostResponse(name, response){
    this[name]=response;
  }

  this.generateBoost = function generateBoost(vec3, boostAmount, respawnTime, radius, res, name){
  var body = new CANNON.Body({
            mass: 0
        });
        body.collisionResponse = 0;
        body.position.set(vec3)
        body.name = name;
        body.radius = radius;
        body.res = res;
        body.respawnTime = respawnTime;
        body.boostAmount = boostAmount;
        

        var shape = new CANNON.Sphere(radius, res, res);
        body.addShape(shape);
        world.add(body);
        helper.addVisual(body, "sphere", "normal");

        body.addEventListener("collide",function(e){ 
          if(this[e.body.name] != undefined){
            alert("errr now what")
          }
          else{
            this[e.body.name];
          }
          });
  }

  this.generateDefault = function generateDefault(x, y, z){
    //main 4
    generateBoost(new CANNON.vec3(x, y, z),150, 5, 1, 64, "BOOST0");
    generateBoost(new CANNON.vec3(-x, y, z),150, 5, 1, 64, "BOOST1");
    generateBoost(new CANNON.vec3(x, y, -z),150, 5, 1, 64, "BOOST3");
    generateBoost(new CANNON.vec3(-x, y, -z),150, 5, 1, 64, "BOOST4");

    //other
    generateBoost(new CANNON.vec3(0, y, z),15, 5, 0.5, 64, "BOOST5");

  }

  this.restart = function restart(){

  }

}