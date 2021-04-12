// method to add the entity to the avatar in Hubs
function mod_add_avatar_panel(){
	var el = document.createElement("a-entity");
	el.setAttribute("networked", { 
		template: "#hover-shape-media",
		networkId: 'shapeButton',
		owner: 'scene',
	});


    let avatar = document.querySelector("#avatar-rig")
    el.object3D.scale.set(0.5,0.5,1);

    avatar.appendChild(el)
}
