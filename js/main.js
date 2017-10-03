import * as THREE from 'three';
import {TweenMax, Expo} from "gsap";
import GeoBall from "./GeoBall.js";
import GeoPipe from "./GeoPipe.js";
var OrbitControls = require('three-orbit-controls')(THREE);
window.THREE=THREE;

const GeoTree=[
				{poles: [
						{d:new THREE.Vector3(0,0,-1),node:
											{poles:[{d:new THREE.Vector3(-1,0,0),node:{}}]}
						},
						{d:new THREE.Vector3(0,0.5,0.5),node:
											{poles:[{d:new THREE.Vector3(0,1,0),node:{}}]}
						}, 
						{d:new THREE.Vector3(1,0,0),node:{}}
						]
				}
			  ];


class GeomagDemo{
	constructor(){
		this.geopieces=[];
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.camera.name="Camera";
		this.camera.position.z=20;
		this.renderer = new THREE.WebGLRenderer({ alpha: true ,antialias:true});
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		document.getElementById("sceneHolder").appendChild( this.renderer.domElement );

		this.scene.add(this.camera);

		this.controls=new OrbitControls(this.camera);
		window.scene=this.scene;

		this.parseNode(GeoTree[0]);
		this.animate();
	}

	parseNode(node,pointer=new THREE.Vector3()){
		console.log("PARSEING NODE:",node, "AT POINTER:",pointer);
		var ball=new GeoBall();
		ball.position.x=pointer.x;
		ball.position.y=pointer.y;
		ball.position.z=pointer.z;
		this.scene.add(ball);
		this.geopieces.push(ball);
		if(node.poles){
			node.poles.forEach((pole,index)=>{
				this.parsePole(pole,pointer)
			});
		}
	}

	parsePole(pole,pointerNode){
		var pointer=Object.assign(new THREE.Vector3(), pointerNode);
	 	console.log("PARSEING POLE:",pole, "AT POINTER:",pointer);
	 	var pipe=new GeoPipe();
	 	pole.d.normalize();

	 	pointer.x+=pole.d.x*((GeoBall.SIZE/2)+(GeoPipe.SIZE/2));
	 	pointer.y+=pole.d.y*((GeoBall.SIZE/2)+(GeoPipe.SIZE/2));
	 	pointer.z+=pole.d.z*((GeoBall.SIZE/2)+(GeoPipe.SIZE/2));
	 	pipe.position.x=pointer.x;
		pipe.position.y=pointer.y;
		pipe.position.z=pointer.z;
		pipe.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0),pole.d);
		pointer.x+=pole.d.x*((GeoBall.SIZE/2)+(GeoPipe.SIZE/2));
	 	pointer.y+=pole.d.y*((GeoBall.SIZE/2)+(GeoPipe.SIZE/2));
	 	pointer.z+=pole.d.z*((GeoBall.SIZE/2)+(GeoPipe.SIZE/2));
	 	this.scene.add(pipe);
	 	this.geopieces.push(pipe);
	 	if(pole.node){
	 		this.parseNode(pole.node,pointer);
	 	}

	}

	explode(){
		this.geopieces.forEach(item=>{
			var radius=50;
			TweenMax.to(item.position,1,{ease: Expo.easeOut,x:THREE.Math.randFloat(-radius,radius),y:THREE.Math.randFloat(-radius,radius),z:THREE.Math.randFloat(-radius,radius)});
		});
	}

	animate(){
		requestAnimationFrame( this.animate.bind(this) );
		this.renderer.render( this.scene, this.camera );
	}


}
var app=new GeomagDemo();
window.explode=app.explode.bind(app);











