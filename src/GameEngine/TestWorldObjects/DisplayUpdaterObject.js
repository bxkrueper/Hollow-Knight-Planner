"use strict";

class DisplayUpdaterObject{

	constructor(){

	}

	doOnAdd(){
		this.world.addEventListener(this,'drawScreen',this.drawScreen);
	}

	drawScreen(ctx){
		if(this.world.debugMode){
			ctx.font = 20 + 'px Arial';
			ctx.fillStyle = "yellow";
			ctx.fillText("Button Down: " + this.world.worldView.currentButtonDown,10,20);
			ctx.fillText("current click screen: (" + this.world.worldView.currentXScreen + ',' + this.world.worldView.currentYScreen + ')',10,40);
			ctx.fillText("current X World: " + this.world.worldView.currentXWorld,10,60);
			ctx.fillText("current Y World: " + this.world.worldView.currentYWorld,10,80);
			ctx.fillText("pixelsPerUnit: " + this.world.camera.pixelsPerUnitX,10,100);
			ctx.fillText("Keys pressed: " + Array.from(this.world.worldView.currentKeys).join(','),10,120);
		}
		

		// ctx.fillText("xCenter: " + this.world.camera.xCenter,10,120);
		// ctx.fillText("yCenter: " + this.world.camera.yCenter,10,130);
		// ctx.fillText("pixelsPerUnitX: " + this.world.camera.pixelsPerUnitX,10,140);
		// ctx.fillText("pixelsPerUnitY: " + this.world.camera.pixelsPerUnitY,10,150);
	}

	// updateEverything(){
	// 	this._mouseButtonInfo.textContent = ;
	// 	this._previousXScreenInfo.textContent = ;
	// 	this._previousYScreenInfo.textContent = ;
	// 	this._currentXScreenInfo.textContent = ;
	// 	this._currentYScreenInfo.textContent = ;
	// 	this._previousXWorldInfo.textContent = ;
	// 	this._previousYWorldInfo.textContent = ;
	// 	this._currentXWorldInfo.textContent = ;
	// 	this._currentYWorldInfo.textContent = ;
	// 	this._keysPressedInfo.textContent = ;
	// }

	

	toString(){
		return "DisplayUpdaterObject";
	}

	

}