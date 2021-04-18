/**
 * Sets up an entity with the holdable button functionality so that it can alter
 * scale on cursor movement.
 * Taken from Vincent's hover shape component
 */

 AFRAME.registerComponent('drag-scale', {
	init: function () {
	//Setup holdable button functionality
	  this.el.classList.add('interactable')
	  this.el.setAttribute('tags', {
		isHoldable: true,
		holdableButton: true,
	  })
	  this.el.setAttribute('is-remote-hover-target', '')
  
	  this.dragCursor = null // This will hold the cursor performing the drag, if any
	  this.prevPosition = new THREE.Vector3() // Position of the cursor on the previous frame. Useful for determining speed of the drag.
	  this.scaleMax = new THREE.Vector3(1.25, 1.25, 1.25);
	  this.scaleMin = new THREE.Vector3(.25, .25, 25);
  
	  // Set up handlers for those events we enabled earlier
	  this.el.object3D.addEventListener(
		'holdable-button-down',
		({ object3D }) => {
		  this.dragCursor = object3D
		  this.prevPosition.copy(object3D.position)
		}
	  )
	  this.el.object3D.addEventListener('holdable-button-up', () => {
		this.dragCursor = null
	  })
	},
	tick: function () {
	  // If any cursor is held down...
	  if (this.dragCursor) {
		// Compute change in cursor vertical position
		const dy = this.dragCursor.position.y - this.prevPosition.y;
  
		// Take ownership of the `networked` entity and update the networked radius
		if (NAF.connection.isConnected()) {
		  NAF.utils.takeOwnership(this.el)
		}
		//Update the scale of the object as the vertical change in the cursor position.
		this.el.object3D.scale.y = this.el.object3D.scale.y + dy;
		this.el.object3D.scale.x = this.el.object3D.scale.x + dy;
		this.el.object3D.scale.z = this.el.object3D.scale.z + dy;
		if (this.el.object3D.scale.y > this.scaleMax.y) {
			  this.el.object3D.scale.y = this.scaleMax.y;
			  this.el.object3D.scale.x = this.scaleMax.x;
			  this.el.object3D.scale.z = this.scaleMax.z;
		} else if (this.el.object3D.scale.y < this.scaleMin.y) {
			  this.el.object3D.scale.y = this.scaleMin.y;
			  this.el.object3D.scale.x = this.scaleMin.x;
			  this.el.object3D.scale.z = this.scaleMin.z;
		}
		// Store cursor position for next frame.
		this.prevPosition.copy(this.dragCursor.position)
	  }
	},
  })
  
  
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
  
  //Query assets in order to setup template
  const assets = document.querySelector("a-assets");
  assets.insertAdjacentHTML(
	'beforeend',
	`
	<template id="panel-shape-media">
	  <a-entity
		geometry="primitive: plane;"
		material="color: blue;"
		panel-shape
		drag-scale
	  ></a-entity>
	</template>
  `
  )
  
  const vectorRequiresUpdate = epsilon => {
		  return () => {
			  let prev = null;
			  return curr => {
				  if (prev === null) {
					  prev = new THREE.Vector3(curr.x, curr.y, curr.z);
					  return true;
				  } else if (!NAF.utils.almostEqualVec3(prev, curr, epsilon)) {
					  prev.copy(curr);
					  return true;
				  }
				  return false;
			  };
		  };
	  };
  
  NAF.schemas.add({
		template: "#panel-shape-media",
	  components: [
	  {
			component: "position",
			requiresNetworkUpdate: vectorRequiresUpdate(0.001)
	  },
	  {
		  component: "rotation",
		  requiresNetworkUpdate: vectorRequiresUpdate(0.001)
	  },
	  {
		  component: "scale",
		  requiresNetworkUpdate: vectorRequiresUpdate(0.001)
	  }],
	});


// method to add the entity to the avatar in Hubs
function mod_add_avatar_panel(){
	var el = document.createElement("a-entity");
	el.setAttribute("networked", { 
		template: "#panel-shape-media",
		networkId: 'shapeButton',
		owner: 'scene',
	});


    let avatar = document.querySelector("#avatar-rig")
    el.object3D.scale.set(0.5,0.5,1);

    avatar.appendChild(el)
}

mod_add_avatar_panel();
