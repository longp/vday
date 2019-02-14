// Original code by: 
// Prisoner849 (https://discourse.threejs.org/u/prisoner849)
//
// https://jsfiddle.net/prisoner849/exztfmr0/
var clock = new THREE.Clock();
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 5);

var renderer = new THREE.WebGLRenderer
({
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var limit = 1.8;
var step = limit / 1000;
var points = [];

for (let i = -limit; i <= limit; i += step) 
{
  points.push(new THREE.Vector3(i, 0, 0));
  
}

var geom = new THREE.BufferGeometry().setFromPoints(points);
var material = new THREE.ShaderMaterial({
  uniforms: {
    aVal: {value: 25},
    texture: {value: new THREE.TextureLoader().load("spark1.png")}
  },
  vertexShader: `
  	#define PI 3.1415926
  
  	uniform float aVal;
    
  	float heart(float x, float a)
    {
      return pow(abs(x), 2. / 3.) + 0.9 * sqrt(3.3 - pow(abs(x), 2.)) * sin(a * PI * x);
    }
    
  	void main()
    {
    	vec3 pos = position;
      pos.y = heart(pos.x, aVal);
      vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
      gl_Position = projectionMatrix * mvPosition;

      gl_PointSize = min(aVal, 50.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D texture;
    void main()
    {
    	gl_FragColor = vec4( 1., 0., 0., 1.0 ) * texture2D( texture, gl_PointCoord );
    }
  `,
  blending: THREE.AdditiveBlending,
  depthTest: false,
  transparent: true,
  vertexColors: true
});

var heart = new THREE.Points(geom, material);
scene.add(heart);

renderer.setAnimationLoop(() => {
  var delta = clock.getDelta();
  var time = clock.getElapsedTime();

  // heart.rotation.y = 1.6 * time;
  // heart.rotation.x = 1.6 * time ;
  
  material.uniforms.aVal.value = Math.sin(time) * 25;
  renderer.render(scene, camera);

  
  
});


