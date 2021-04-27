AFRAME.registerComponent('panel-shape', {
	  init: function () {
		this.totalTurns = 0;
		this.direction = 0;
	  },
	  
	  tick: function () {
		
		  var el = this.el;
		  let avatarPOV = document.querySelector("#avatar-pov-node")
		  var y = avatarPOV.object3D.position.y - 0.5;
		  el.setAttribute('position', el.object3D.position.x + ', ' + (y + Math.sin(Date.now() / 500) * .05) + ', ' + el.object3D.position.z);

		  //Sets the text on the component
		  this.el.setAttribute('text', 'value', "You have turned " +this.totalTurns+ " times");
		  this.el.setAttribute('text', 'align', 'center');

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

				if (this.direction != 0) {
					this.totalTurns++;
					el.object3D.visible = true;
				}
				this.direction = 0;
			}
			else if (angle >= 90 && angle < 180) {
				el.object3D.position.x = 0;
				el.object3D.position.z = -0.5;
				el.object3D.rotation.y = 0;
				el.object3D.rotation.x = -Math.PI/4;
				el.object3D.rotation.z = 0;

				if (this.direction != 1) {
					this.totalTurns++;
					el.object3D.visible = true;
				}
				this.direction = 1;
			}
			else if (angle >= 180 && angle < 270) {
				el.object3D.position.x = -0.5;
				el.object3D.position.z = 0;
				el.object3D.rotation.y = Math.PI/2;
				el.object3D.rotation.z = Math.PI/4;
				el.object3D.rotation.x = -Math.PI/4;

				if (this.direction != 2) {
					this.totalTurns++;
					el.object3D.visible = true;
				}
				this.direction = 2;
			} else {
				el.object3D.position.x = 0;
				el.object3D.position.z = 0.5;
				el.object3D.rotation.y = Math.PI; 
				el.object3D.rotation.z = 0;
				el.object3D.rotation.x = Math.PI/4;

				if (this.direction != 3) {
					this.totalTurns++;
					el.object3D.visible = true;
				}
				this.direction = 3;
			}
	  },
  });
