"use strict";

class Icon{

	static outlineStrokeThickness = 3;

	

	constructor(itemInfo){
		this._itemInfo = itemInfo;
		this.itemInfo.icon = this;//set itemInfo's reference
		this._pic = Images.get(itemInfo.pictureName);
		

		if(this.itemInfo.hitboxType==='rect'){
			this.containsPoint = this.containsPointRect;
			this.drawOutline = this.drawOutlineRect;
		}else{//default to circle
			this.containsPoint = this.containsPointCircle;
			this.drawOutline = this.drawOutlineCircle;
		}
	}

	doOnAdd(){
		if(this._itemInfo.priorityName==null){//default
			this._priority=this.world.priorities['IconDefault'];//don't call setter for first initilization
		}else{
			this._priority=this.world.priorities[this._itemInfo.priorityName];//don't call setter for first initilization
		}
		
		this._have = false;

		this.world.addEventListener(this,'drawScreen',this.drawScreen,this.priority);
		if(!this._itemInfo.nonCollectable){
			this.world.addEventListener(this,'acceptMouseTarget',this.acceptMouseTarget,this.priority);
		}
		this.world.addEventListener(this,'mouseClicked',this.mouseClicked);
	}

	get itemInfo(){
		return this._itemInfo;
	}

	get priority(){
		return this._priority;
	}
	set priority(newPriority){
		this._priority = newPriority;
		this.world.changePriority(this,'drawScreen',this.drawScreen,newPriority);
		this.world.changePriority(this,'acceptMouseTarget',this.acceptMouseTarget,newPriority);
	}

	get have(){
		return this._have;
	}
	set have(newHave){
		this._have = newHave;

		if(this.world.loadingSave){
			return;//don't bother with Counters. those are set directly while loading. Also don't waste time shuffling order 
		}

		this.exchangeCurrencyReqs(this._have);
		this.addToUponGetting(this._have);

		let priority = this._have?this.world.priorities['IconObtained']:this.world.priorities['IconDefault'];
		this.priority = priority;//update priority (still sends it to front of others with the same proirity)
		if(this._have && this.world.selectedObject === this){
			this.world.selectedObject = null;//deselect object after claiming
		}


		// if(this.itemInfo.doOnClaimed!=null){
		// 	this.itemInfo.doOnClaimed();    doOnUnClaimed
		// }
	}
	haveToggle(){
		this.have = !this.have;
	}


	//pay the shop   obtained: if you bought it. if this is false, this means a refund
	exchangeCurrencyReqs(obtained){
		for(let i in this.itemInfo.requirements){
			let req = this.itemInfo.requirements[i];
			if(CounterInventory.isCurrencyItem(req.name)){
				let cost = obtained?-req.quantity:req.quantity;
				CounterInventory.addTo(req.name,cost);
			}
		}
	}
	//obtained: if you got it. if this is false, this means a refund
	addToUponGetting(obtained){
		let addToOnClaimed = this.itemInfo.addToOnClaimed;
		if(addToOnClaimed==null){
			return;
		}
		let quantity = obtained?addToOnClaimed.quantity:-addToOnClaimed.quantity;
		CounterInventory.addTo(addToOnClaimed.name,quantity);
	}

	//center of pic
	get xWorld(){
		return this.itemInfo.x;
	}
	get yWorld(){
		return this.itemInfo.y;
	}
	get xScreen(){
		return this.world.camera.worldXToScreenX(this.xWorld);
	}
	get yScreen(){
		return this.world.camera.worldYToScreenY(this.yWorld);
	}

	//how many pixles wide the image is
	get sizeScreen(){
		return this.itemInfo.size;
	}
	get radiusScreen(){
		return this.sizeScreen/2;
	}

	get widthScreen(){
		return this.sizeScreen;
	}
	get heightScreen(){//height is based of the width. Keeps the picture scaled
		return this.sizeScreen*(this._pic.height/this._pic.width);
	}
	get widthWorld(){
		return this.world.camera.screenXToWorldX(this.widthScreen);
	}
	get heightWorld(){//height is based of the width. Keeps the picture scaled
		return this.world.camera.screenYToWorldY(this.heightScreen);
	}

	///////////optimize finding top left later
	get leftScreen(){
		return this.xScreen-this.widthScreen/2;
	}
	get topScreen(){
		return this.yScreen-this.heightScreen/2;
	}
	get rightScreen(){
		this.world.camera.worldXToScreenX(this.xWorld)+this.widthScreen/2;
	}
	get bottomScreen(){
		return this.world.camera.worldYToScreenY(this.yWorld)+this.heightScreen/2;
	}

	get hoveredOver(){
		return this.world.currentTarget === this;
	}
	get selected(){
		return this.world.selectedObject === this;
	}

	get status(){//locked, available, have
		if(this.have){
			return 'have';
		}

		for(let req of this.itemInfo.requirements){
			if(Icon.meetsReq(req)){
				continue;
			}else{
				return 'locked';
			}
		}

		return 'available';
	}

	static meetsReq(req){
		if(CounterInventory.isCollectionItem(req.name)){
			return CounterInventory.count(req.name)>=req.quantity;
		}else if(req.name==='-choose1-'){
			let choose1List = req.choose1List;
			for(let i in choose1List){
				let optionReq = choose1List[i];
				if(Icon.meetsReq(optionReq)){
					return true;
				}
			}
			return false;
		}else if(req.name==='-all-'){
			let allList = req.allList;
			for(let i in allList){
				let optionReq = allList[i];
				if(!Icon.meetsReq(optionReq)){
					return false;
				}
			}
			return true;
		}else{
			let reqItemInfo = ItemInfoDatabase.getItemInfo(req.name);
			return reqItemInfo.icon.have;
		}
		
	}

	//containsPoint(xScreen,yScreen) is chosen from the ones below
	containsPointCircle(xScreen,yScreen){
		return Math.hypot(xScreen-this.xScreen,yScreen-this.yScreen)<this.radiusScreen;
	}
	containsPointRect(xScreen,yScreen){
		return xScreen>(this.xScreen-this.widthScreen/2) && xScreen<(this.xScreen+this.widthScreen/2) && yScreen>(this.yScreen-this.heightScreen/2) && yScreen<(this.yScreen+this.heightScreen/2);
	}

	//drawOutline(ctx) is chosen from the ones below
	drawOutlineCircle(ctx){
		ctx.strokeStyle = this.getColor();
		ctx.lineWidth = Icon.outlineStrokeThickness;
		ctx.beginPath();
		ctx.arc(this.xScreen,this.yScreen, this.radiusScreen, 0, 2 * Math.PI);
		ctx.stroke();
	}
	drawOutlineRect(ctx){
		ctx.strokeStyle = this.getColor();
		ctx.lineWidth = Icon.outlineStrokeThickness;
		ctx.beginPath();
		ctx.rect(this.leftScreen,this.topScreen, this.widthScreen, this.heightScreen);
		ctx.stroke();
	}

	getColor(){
		if(this.status === 'locked'){
			return '#FF0000';
		}else{
			return '#00FF00';
		}
	}

	drawRequirementLines(ctx,backtraceAllTheWay,requirements = this.itemInfo.requirements,color='#FF0000'){
		
		ctx.lineWidth = Icon.outlineStrokeThickness;
		for(let req of requirements){
			if(Icon.meetsReq(req)){
				continue;
			}

			if(req.name==='-choose1-'){
				ctx.strokeStyle = '#FFFF00';
				let choose1List = req.choose1List;
				for(let i in choose1List){
					let optionReq = choose1List[i];
					this.drawRequirementLines(ctx,backtraceAllTheWay,[optionReq],'#FFFF00');
				}

				continue;
			}
			if(req.name==='-all-'){
				ctx.strokeStyle = '#FF0000';
				let allList = req.allList;
				for(let i in allList){
					let optionReq = allList[i];
					if(!Icon.meetsReq(optionReq)){
						this.drawRequirementLines(ctx,backtraceAllTheWay,[optionReq],'#FF8888');
					}
					
				}

				continue;
			}

			ctx.strokeStyle = color;
			this._drawRequirementLinesHelper(req,ctx,backtraceAllTheWay);
		}
	}
	_drawRequirementLinesHelper(req,ctx,backtraceAllTheWay){
		let reqItemInfo = ItemInfoDatabase.getItemInfo(req.name);
		if(reqItemInfo==null){///////////is in collectable invintory. indicate reqs somehow
			return;
		}

		reqItemInfo.icon.drawArrowTo(this,ctx);
		if(backtraceAllTheWay){////////remove false when reqs are done
			reqItemInfo.icon.drawRequirementLines(ctx,backtraceAllTheWay);
		}
	}

	//holding ctrl reverses it
	hideIfLocked(){
		return (this.world.hideLockedCheckbox && !this.world.worldView.keyIsDown('ctrl')) || (!this.world.hideLockedCheckbox && this.world.worldView.keyIsDown('ctrl'));
	}

	//ctx properties assumed to be already set
	// drawLineTo(itemInfo2,ctx){
	// 	ctx.beginPath();
	// 	ctx.moveTo(this.xScreen,this.yScreen);
	// 	ctx.lineTo(itemInfo2.icon.xScreen,itemInfo2.icon.yScreen);
	// 	ctx.stroke();
	// }

	//ctx properties assumed to be already set. Draws the arrow to the edge of icon2's radius
	drawArrowTo(icon2,ctx){
		let xEnd = icon2.xScreen;
		let yEnd = icon2.yScreen;
		let arrowDirection = MyMath.findAngleFromTo(this.xScreen,this.yScreen,xEnd,yEnd);
		xEnd -= (icon2.sizeScreen/2+Icon.outlineStrokeThickness)*Math.cos(arrowDirection);
		yEnd -= (icon2.sizeScreen/2+Icon.outlineStrokeThickness)*Math.sin(arrowDirection);

		Icon.drawArrow(ctx,this.xScreen,this.yScreen,xEnd,yEnd,15,2.5);
	}

	//ctx properties assumed to be already set
	//headAngleChange: in radians. pi points them back to x1,y1. pi/2 makes a T 0 keeps the line going  2.5 is a good value
	static drawArrow(ctx,x1,y1,x2,y2,headLength,headAngleChange){
		let arrowDirection = MyMath.findAngleFromTo(x1,y1,x2,y2);
		ctx.beginPath();
		//main part
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);

		//head
		let headDirection = arrowDirection+headAngleChange;
		ctx.lineTo(x2+headLength*Math.cos(headDirection),y2+headLength*Math.sin(headDirection));
		headDirection = arrowDirection-headAngleChange;
		ctx.moveTo(x2,y2);
		ctx.lineTo(x2+headLength*Math.cos(headDirection),y2+headLength*Math.sin(headDirection));

		ctx.stroke();
	}



	hasCounterReqs(){
		for(let req of this.itemInfo.requirements){
			if(CounterInventory.isCollectionItem(req.name)){
				return true;
			}
		}
		return false;
	}

	becameSelected(){
		//move to front in its tier
		this.priority = this.priority;

		//add an InfoBox
		this.addInfoBox();
	}
	deSelected(){
		//delete the infobox that was added when it was selected
		this.deleteInfoBox();
	}
	addInfoBox(){
		this._infoBox = new InfoBox(this);
		this.world.add(this._infoBox);
	}
	deleteInfoBox(){
		if(this._infoBox!=null){
			this.world.delete(this._infoBox);
			delete this._infoBox;
		}
	}


	shouldHide(){
		return (this.itemInfo.nonCollectable && !this.world.showNonCollectables) || (this.hideIfLocked() && this.status==='locked');
	}

	
	drawScreen(ctx){
		if(this.shouldHide()){
			return;
		}

		if(this.selected && this.status==='locked'){
			this.drawRequirementLines(ctx,true);
		}

		//draw icon
		if(this.have){
			//if mouse is near, draw faintly
			let xScreen=this.world.worldView.currentXScreen;
			let yScreen=this.world.worldView.currentYScreen;
			//height and width not /2 to show if mouse is further out
			if(xScreen>(this.xScreen-this.widthScreen*1.5) && xScreen<(this.xScreen+this.widthScreen*1.5) && yScreen>(this.yScreen-this.heightScreen*1.5) && yScreen<(this.yScreen+this.heightScreen*1.5)){
				ctx.globalAlpha = 0.5;
				ctx.drawImage(this._pic, this.leftScreen, this.topScreen,this.widthScreen,this.heightScreen);
				ctx.globalAlpha = 1;

			}else{
				//draw nothing
			}
			
		}else{//don't have
			ctx.drawImage(this._pic, this.leftScreen, this.topScreen,this.widthScreen,this.heightScreen);
			if(this.selected){
				this.drawOutline(ctx);
			}
		}
	}

	

	acceptMouseTarget(){
		if(this.shouldHide()){
			return false;
		}
		
		return this.containsPoint(this.world.worldView.currentXScreen,this.world.worldView.currentYScreen);
	}

	mouseClicked(buttonType){
		if(buttonType==='left'){
			this.world.selectedObject = this;
		}
		if(buttonType==='right'){
			if(this.status==='locked' && !this.world.worldView.keyIsDown('shift')){//holding shift will override reqs
				this.world.selectedObject = this;
			}else{
				this.haveToggle();
			}
			
		}
	}

	toString(){
		return "Icon: " + this.itemInfo.name;
	}
}