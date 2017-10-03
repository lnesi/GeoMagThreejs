import {Vector3} from 'three';

// Three Structure
// {
// "p":[
// 		{	
// 			"d":"0,0,-1",
// 			"n":{
// 					"p":[
// 						{
// 							"d":"-1,0,0",
// 						 	"n":{}
// 						 }
// 					]
// 				}
// 		},
// 	]
// };

const GeoTree={
p:[
		{
			d:"0,1,0",
			n:{
				p:[
					{d:"1,0,0",n:{}}
				]
			  }
		},
		{
			d:"1,0,0",
			n:{}
		},
		{
			d:"0,0,-1",
			n:{}
		}

	]
};



export default GeoTree;