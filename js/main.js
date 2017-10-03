import * as THREE from 'three';
import GeoBall from "./GeoBall.js";
import GeoPipe from "./GeoPipe.js";
import GeoTree from "./GeoTree.js";
var TWEEN=require('@tweenjs/tween.js');
var OrbitControls = require('three-orbit-controls')(THREE);

window.THREE=THREE;
window.TWEEN=TWEEN;


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

		this.parseNode(GeoTree);
		this.animate();
		this.createLights();
	}

	parseNode(node,pointer=new THREE.Vector3()){
		//console.log("PARSEING NODE:",node, "AT POINTER:",pointer);
		var ball=new GeoBall();
		ball.position.x=pointer.x;
		ball.position.y=pointer.y;
		ball.position.z=pointer.z;
		//Copy Position and rotation as reference for random animation
		ball.refPosition=ball.position.clone();
		ball.refRotation=ball.rotation.clone();
		this.scene.add(ball);
		this.geopieces.push(ball);
		if(node.p){
			node.p.forEach((pole,index)=>{
				this.parsePole(pole,pointer)
			});
		}
	}

	parsePole(pole,pointerNode){
		var pointer=Object.assign({}, pointerNode);
		var di=pole.d.split(',');
		var direction=new THREE.Vector3(di[0],di[1],di[2]);
		direction.normalize();
	 //	console.log("PARSEING POLE:",pole, "AT POINTER:",pointer);
	 	
	 	var pipe=new GeoPipe();

	 	

	 	pointer.x+=direction.x*((GeoBall.SIZE/2)+(GeoPipe.SIZE/2));
	 	pointer.y+=direction.y*((GeoBall.SIZE/2)+(GeoPipe.SIZE/2));
	 	pointer.z+=direction.z*((GeoBall.SIZE/2)+(GeoPipe.SIZE/2));
	 	pipe.position.x=pointer.x;
		pipe.position.y=pointer.y;
		pipe.position.z=pointer.z;
		pipe.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0),direction);
		pointer.x+=direction.x*((GeoBall.SIZE/2)+(GeoPipe.SIZE/2));
	 	pointer.y+=direction.y*((GeoBall.SIZE/2)+(GeoPipe.SIZE/2));
	 	pointer.z+=direction.z*((GeoBall.SIZE/2)+(GeoPipe.SIZE/2));
	 	//Copy Position and rotation as reference for random animation
	 	this.scene.add(pipe);
	 	pipe.refPosition=pipe.position.clone();
	 	pipe.refRotation=pipe.rotation.clone();
	 	
		console.log(pipe.rotation,pipe.refRotation);
	 	this.geopieces.push(pipe);
	 	if(pole.n){
	 		this.parseNode(pole.n,pointer);
	 	}

	}

	explode(){
		this.geopieces.forEach(item=>{
			var radius=50;
			var duration=1000;
			var positionTarget=new THREE.Vector3(THREE.Math.randFloat(-radius,radius),THREE.Math.randFloat(-radius,radius),THREE.Math.randFloat(-radius,radius));
			new TWEEN.Tween(item.position).to(positionTarget,duration).easing(TWEEN.Easing.Exponential.Out).start();
			if(item.name=="GeoPipe"){
				new TWEEN.Tween(item.rotation).to({z:THREE.Math.randFloat(0,20)},duration).easing(TWEEN.Easing.Exponential.Out).start();
			}
		
			
			
		});
		setTimeout(this.implode.bind(this),3000);
	}
	
	implode(){

		this.geopieces.forEach(item=>{
			var delay=THREE.Math.randFloat(0,3);
			var duration=2000;
			new TWEEN.Tween(item.position).to(item.refPosition,duration).easing(TWEEN.Easing.Exponential.In).start();
			if(item.name=="GeoPipe"){
				new TWEEN.Tween(item.rotation).to({z:item.refRotation.z},duration).easing(TWEEN.Easing.Exponential.In).start();
			}
			
			
			
		});
	}

	animate(time){
		requestAnimationFrame( this.animate.bind(this) );
		this.renderer.render( this.scene, this.camera );
		TWEEN.update(time);
	}

	createLights(){
		var light = new THREE.PointLight( 0xffffff, 5, 200 );
		light.name="Light";
		light.position.set( 50, 50, 50 );
		this.scene.add( light );
	}

}
var app=new GeomagDemo();
window.app=app;
window.explode=app.explode.bind(app);











