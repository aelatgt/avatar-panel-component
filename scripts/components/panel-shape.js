/**
   * Component to allow a hubs entity to adjust rotation and position depending on avatar.
   * Also adds a small, constant hover to the entity
   */
  
  AFRAME.registerComponent('panel-shape', {
	  tick: function () {
		  var el = this.el;
		  let avatarPOV = document.querySelector("#avatar-pov-node")
		  var y = avatarPOV.object3D.position.y - 0.5;
		  el.setAttribute('position', el.object3D.position.x + ', ' + (y + Math.sin(Date.now() / 500) * .05) + ', ' + el.object3D.position.z);

		  //Get the avatar POV's angle to see where it's facing
		  let pov = document.querySelector("#avatar-pov-node")
		  var angle = pov.rotationObj.y + 135
		
		  //Change the entity's position and rotation depending on the angle
			if (angle >= 0 && angle < 90) {
				el.object3D.position.x = 0.5;
				el.object3D.position.z = 0;
				el.object3D.rotation.y = 3 * Math.PI/2;
				el.object3D.rotation.z = -Math.PI/4;
				el.object3D.rotation.x = -Math.PI/4;
			}
			else if (angle >= 90 && angle < 180) {
				el.object3D.position.x = 0;
				el.object3D.position.z = -0.5;
				el.object3D.rotation.y = 0;
				el.object3D.rotation.x = -Math.PI/4;
				el.object3D.rotation.z = 0;
			}
			else if (angle >= 180 && angle < 270) {
				el.object3D.position.x = -0.5;
				el.object3D.position.z = 0;
				el.object3D.rotation.y = Math.PI/2;
				el.object3D.rotation.z = Math.PI/4;
				el.object3D.rotation.x = -Math.PI/4;
			} else {
				el.object3D.position.x = 0;
				el.object3D.position.z = 0.5;
				el.object3D.rotation.y = Math.PI; 
				el.object3D.rotation.z = 0;
				el.object3D.rotation.x = Math.PI/4;
			}
	  },
  });
