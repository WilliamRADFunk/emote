/* 
Emo.te Custom Scripts v1.0
Last Updated: 2016-Nov-03
Author: William R.A.D. Funk - http://WilliamRobertFunk.com 
*/

var FPS = 60;
var start = null;
var context;
var centerX;
var centerY;
var mouseX = centerX;
var mouseY = centerY;
var mouseState = 0;
var scene;
var player;
var playerSize = 5;
var playerSpeed = 3.5;
var extraneous = [];

// Canvas setup and Engine instigation.
function init()
{	// Set up the Engine
	Engine.canvas = document.getElementById('engine-wrapper');
	Engine.canvas.width = Engine.canvas.clientWidth;
	Engine.canvas.height = Engine.canvas.clientHeight;
	centerX = Engine.canvas.width/2;
	centerY = Engine.canvas.height/2;
	context = Engine.canvas.getContext('2d');
	
	// Create the player
	player = new Engine.Orb(centerX, centerY, playerSize, [0,255,0,1], [0,255,100,1]);
	scene = new Engine.Scene();
	scene.add(player);
	
	// Create the keyboard event listener
	document.addEventListener("keypress", performEmote, false);
	document.addEventListener("mousedown", mouseDown, false);
	document.addEventListener("mouseup", mouseUp, false);
	document.addEventListener("mousemove", mouseMove, false);

	// Instigate the rendering loop.
	window.requestAnimationFrame(Engine.update);
	//setInterval(Engine.run, (1000/FPS)); //Change FPS at top to alter speed. Lower is slower.
}
// Receive emote command and perform its effect.
function performEmote(e)
{
	if(e.keyCode === 32)
	{
		var emote = new Engine.Orb(player.position.x, player.position.y, 20, [255,0,255,0.5], [255,0,255,0.5]);
		extraneous.push(emote);
		scene.add(emote);
	}
}
// Mouse state is active (mov player)
function mouseDown(e)
{
	mouseState = 1;
	getMouseCoordinates(e);
}
// Mouse state is inactive (stop moving player)
function mouseUp(e)
{
	mouseState = 0;
}
// Mouse has moved, change the new pointer location.
function mouseMove(e)
{
	if(mouseState === 1) getMouseCoordinates(e);
}
// Calculate mouse position relative to canvas
function getMouseCoordinates(e)
{
	var wrapperElement = document.getElementById("engine-wrapper");
	var rect = wrapperElement.getBoundingClientRect();
	var width = wrapperElement.offsetWidth;
	var height = wrapperElement.offsetHeight;
	// Get the X coordinate for mouse
	if(e.clientX <= rect.left) mouseX = 0 + playerSize;
	else if(e.clientX >= (rect.left + width)) mouseX = width - playerSize;
	else mouseX = e.clientX - rect.left;
	// Get the Y coordinate for mouse
	if(e.clientY >= (rect.top + height)) mouseY = height - playerSize;
	else if(e.clientY <= rect.top) mouseY = 0 + playerSize;
	else mouseY = e.clientY - rect.top;
}
// Does some smoothing math to transition player toward mouse pointer.
function movePlayer()
{
	var oldPlayerX = player.position.x;
	var oldPlayerY = player.position.y;
	var xDiff = mouseX - oldPlayerX;
	var yDiff = mouseY - oldPlayerY;

	if(Math.abs(xDiff) <= 2 && Math.abs(yDiff) <= 2) return;

	var distance = Math.sqrt(Math.pow(mouseX-oldPlayerX,2) + Math.pow(mouseY-oldPlayerY,2));
	var directionX = ((xDiff != 0) ? (xDiff / distance) : 0);
	var directionY = ((yDiff != 0) ? (yDiff / distance) : 0);

	var modifierX = (directionX < 0) ? Math.floor(directionX * playerSpeed) : Math.ceil(directionX * playerSpeed);
	var modifierY = (directionY < 0) ? Math.floor(directionY * playerSpeed) : Math.ceil(directionY * playerSpeed);

	var newPlayerX = oldPlayerX + modifierX;
	var newPlayerY = oldPlayerY + modifierY;

	player.move(newPlayerX, newPlayerY);
}