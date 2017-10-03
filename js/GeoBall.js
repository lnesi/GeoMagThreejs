import * as THREE from 'three';
var radius=3.5;

var geometry = new THREE.SphereGeometry( 3.5, 20, 20 );
var material = new THREE.MeshStandardMaterial( {color: 0xB5B5B5} );
material.wireframe=true;
export default class GeoBall extends THREE.Mesh{
	
	constructor(){
		
		super(geometry,material);
		this.name="GeoBall";
		
	}

	static get SIZE(){
		return 2*radius;
	}

	
}



