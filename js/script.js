const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// colours
const white = new THREE.MeshStandardMaterial({color: 0xffffff});
const grey = new THREE.MeshStandardMaterial({color: 0x999999});
const black = new THREE.MeshStandardMaterial({color: 0x14171d});

// shapes
const headGeometry = new THREE.SphereGeometry(7, 30, 30, 0, 2*Math.PI, 0, 0.75 * Math.PI);
const head = new THREE.Mesh(headGeometry, white);
let eyeGeometry = new THREE.SphereGeometry(5, 30, 30, 0, 2*Math.PI, 0, 0.25 * Math.PI);
eyeGeometry = eyeGeometry.rotateX(-Math.PI * -0.5);
eyeGeometry = eyeGeometry.rotateY(-Math.PI * -0.12);
const eye = new THREE.Mesh(eyeGeometry, black);
let irisGeometry = new THREE.SphereGeometry(4, 30, 30, 0, 2*Math.PI, 0, 0.25 * Math.PI);
irisGeometry = irisGeometry.rotateX(-Math.PI * -0.5);
irisGeometry = irisGeometry.rotateY(-Math.PI * -0.12);
const iris = new THREE.Mesh(irisGeometry, new THREE.MeshStandardMaterial({color: 0x7881a0}));
const bodyGeometry = new THREE.CylinderGeometry(3, 3, 4.5, 30);
const body = new THREE.Mesh(bodyGeometry, white);
const beltGeometry = new THREE.CylinderGeometry(3, 3, 1, 30);
const belt = new THREE.Mesh(beltGeometry, black);
const rightLegGeometry = new THREE.CylinderGeometry(1, 1, 2.5, 30);
const rightLeg = new THREE.Mesh(rightLegGeometry, white);
const leftLegGeometry = new THREE.CylinderGeometry(1, 1, 2.5, 30);
const leftLeg = new THREE.Mesh(leftLegGeometry, white);
const rightBootGeometry = new THREE.CylinderGeometry(1, 1, 2, 30);
const rightBoot = new THREE.Mesh(rightBootGeometry, black);
const leftBootGeometry = new THREE.CylinderGeometry(1, 1, 2, 30);
const leftBoot = new THREE.Mesh(leftBootGeometry, black);

const footPath = new THREE.Shape();
footPath.ellipse(0,0,1.5,1,0, Math.PI*2, false,0);

const footExtrudeSettings = {
	steps: 10,
	depth: 0.5,
	bevelEnabled: false,
};

let rightFootgeometry = new THREE.ExtrudeBufferGeometry(footPath, footExtrudeSettings);
rightFootgeometry = rightFootgeometry.rotateX(-Math.PI * 0.5);
rightFootgeometry = rightFootgeometry.rotateY(-Math.PI * 0.7);
const rightFoot = new THREE.Mesh(rightFootgeometry, black);
let leftFootgeometry = new THREE.ExtrudeBufferGeometry(footPath, footExtrudeSettings);
leftFootgeometry = leftFootgeometry.rotateX(-Math.PI * 0.5);
leftFootgeometry = leftFootgeometry.rotateY(-Math.PI * -0.7);
const leftFoot = new THREE.Mesh(leftFootgeometry, black);
let rightArmGeometry = new THREE.CylinderGeometry(0.75, 0.75, 7, 30);
rightArmGeometry = rightArmGeometry.rotateZ(-Math.PI * 0.5);
const rightArm = new THREE.Mesh(rightArmGeometry, black);
let leftArmGeometry = new THREE.CylinderGeometry(0.75, 0.75, 7, 30);
leftArmGeometry = leftArmGeometry.rotateZ(-Math.PI * 0.5);
const leftArm = new THREE.Mesh(leftArmGeometry, black);

var handPath = new THREE.Shape();
handPath.moveTo(0, 0);
handPath.arc(0, 0, 2, 21, Math.PI*2, false);

var holePath = new THREE.Path();
holePath.absarc(0, 0, 1, 0, Math.PI*2, true);
handPath.holes.push(holePath);

const handExtrudeSettings = {
	steps: 10,
	depth: 1,
	bevelEnabled: false,
};

let rightHandGeometry = new THREE.ExtrudeBufferGeometry(handPath, handExtrudeSettings);
rightHandGeometry = rightHandGeometry.rotateZ(-Math.PI * -0.65);
const rightHand = new THREE.Mesh(rightHandGeometry, grey);
let leftHandGeometry = new THREE.ExtrudeBufferGeometry(handPath, handExtrudeSettings);
leftHandGeometry = leftHandGeometry.rotateZ(-Math.PI * 0.35);
const leftHand = new THREE.Mesh(leftHandGeometry, grey);

// body part positioning
eye.position.x = 1;
eye.position.z = 2.4;
iris.position.x = 1.4;
iris.position.z = 3.7;
body.position.y = -7;
belt.position.y = -10;
rightLeg.position.y = -11.75;
rightLeg.position.x = -1;
leftLeg.position.y = -11.75;
leftLeg.position.x = 1;
rightBoot.position.y = -14;
rightBoot.position.x = -1;
leftBoot.position.y = -14;
leftBoot.position.x = 1;
rightFoot.position.x = -1.25;
rightFoot.position.y = -15.5;
rightFoot.position.z = 0.25;
leftFoot.position.x = 1.25;
leftFoot.position.y = -15.5;
leftFoot.position.z = 0.25;
rightArm.position.x = -6.5;
rightArm.position.y = -6.5;
leftArm.position.x = 6.5;
leftArm.position.y = -6.5;
rightHand.position.x = -10.5;
rightHand.position.y = -6.5;
rightHand.position.z = -0.5;
leftHand.position.x = 10.5;
leftHand.position.y = -6.5;
leftHand.position.z = -0.5;

// light settings
const color = 0xFFFFFF;
const intensity = 0.3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-10, 10, 10);
light.target.position.set(-5, 0, 0);
const ambLight = new THREE.AmbientLight(0xcccccc); // soft white light

// add lights to scene
scene.add(ambLight, light, light.target);
// add elements to scene
scene.add(head, eye, iris, body, belt, rightLeg, leftLeg, rightBoot, leftBoot, rightFoot, leftFoot, rightArm, leftArm, rightHand, leftHand);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0,0,45);
controls.update();

const animate = function() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render (scene, camera);
};

const onWindowResize = function(event) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

animate();
onWindowResize();
