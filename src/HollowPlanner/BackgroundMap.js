"use strict";

class BackgroundMap{
	static width = 449.8;
	static height = 290.1;

	constructor(){
		this._pic = Images.get('Main Map.png');
		this._labels = Images.get('Map Labels.png');
	}

	doOnAdd(){
		this.world.addEventListener(this,'drawWorld',this.drawWorld,this.world.priorities['BackgroundMap']);
		this.world.addEventListener(this,'acceptMouseTarget',this.acceptMouseTarget,this.world.priorities['BackgroundMap']);
		this.world.addEventListener(this,'mouseClicked',this.mouseClicked);

		let world = this.world;
		this._pic.onload = function(){
			world.worldView.redraw();
		};
	}

	drawWorld(ctx){
		//black everywhere
		ctx.fillStyle = '#000000';
		ctx.beginPath();
		ctx.rect(-400,-300, 1500, 900);
		ctx.fill();

		//draw main picture
		ctx.drawImage(this._pic, 0, 0,BackgroundMap.width,BackgroundMap.height);

		//draw labels
		if(this.world.drawLabels){
			ctx.drawImage(this._labels, 0, 0,BackgroundMap.width,BackgroundMap.height);
		}
	}

	acceptMouseTarget(){
		return true;
	}

	mouseClicked(buttonType){
		if(buttonType==='left'){
			this.world.selectedObject = this;
		}
	}
}