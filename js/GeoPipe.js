import * as THREE from 'three';
var points=[];
points.push( new THREE.Vector2( 0.00, -6.75 ) );
points.push( new THREE.Vector2( 1.50, -7.00 ) );
points.push( new THREE.Vector2( 1.80, -7.00 ) );
points.push( new THREE.Vector2( 1.80, -5.50 ) );
points.push( new THREE.Vector2( 1.50, -4.50 ) );
points.push( new THREE.Vector2( 1.50,  4.50 ) );
points.push( new THREE.Vector2( 1.80,  5.50 ) );
points.push( new THREE.Vector2( 1.80,  7.00 ) );
points.push( new THREE.Vector2( 1.50,  7.00 ) );
points.push( new THREE.Vector2( 0.00,  7.00 ) );


var geometry = new THREE.LatheGeometry( points,10 );
var material = new THREE.MeshStandardMaterial( {color: 0x186120} );
material.roughness=1;
material.metalness=0;
material.wireframe=true;
export default class GeoPipe extends THREE.Mesh{
	constructor(){
		super(geometry,material);
		this.name="GeoPipe";
	}

	static get SIZE(){
		return 14;
	}
}