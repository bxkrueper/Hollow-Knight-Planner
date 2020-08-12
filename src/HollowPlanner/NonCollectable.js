// "use strict";

// class NonCollectable{
// 	constructor(itemInfo){//this item info may have less information than one intended for a collectable
// 		this._itemInfo = itemInfo;
// 		this._pic = Images.get(itemInfo.pictureName);
// 		this._widthScreen = this.itemInfo.size;
// 		this._heightScreen = this.itemInfo.size*(this._pic.height/this._pic.width);
// 	}

// 	doOnAdd(){
// 		this.world.addEventListener(this,'drawScreen',this.drawScreen,this.world.priorities['NonCollectableIcon']);
// 	}

// 	get xScreen(){
// 		return this.world.camera.worldXToScreenX(this.itemInfo.x);
// 	}
// 	get yScreen(){
// 		return this.world.camera.worldYToScreenY(this.itemInfo.y);
// 	}

// 	get leftScreen(){
// 		return this.xScreen-this._widthScreen/2;
// 	}
// 	get topScreen(){
// 		return this.yScreen-this._heightScreen/2;
// 	}

// 	drawScreen(ctx){
// 		ctx.drawImage(this._pic, this.leftScreen, this.topScreen,this._widthScreen,this._heightScreen);
// 	}
// }