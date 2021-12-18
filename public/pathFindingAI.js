function eulerToDegrees(e){
  var euler = new THREE.Euler();
  
  var rotation = euler.setFromQuaternion(e);
  var radians = rotation.y > 0 ? rotation.y : (2 * Math.PI) + rotation.y;
  var degrees = THREE.Math.radToDeg(radians);
  //degrees+=180;
  if(degrees > 360){
    degrees-=360;
  }
  return degrees
}
function runPathFinding(){
    var qrot = new THREE.Quaternion();
  qrot.setFromUnitVectors(box.position,parent.position);
  
  //console.log(euler);
  var degrees = eulerToDegrees(qrot);
  console.log(degrees);
  carAction(100,degrees,10,3);
}