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
  probe.position.copy(chassisBody.position);
  probe.lookAt(parent.position);
  
  //console.log(euler);
  var degrees = eulerToDegrees(probe.quaternion);
  
  //console.log(degrees);
  carAction(100,degrees,10,3);
}