"use strict";

class InfoBox{

	static infoBoxFont = 'Arial';
	static infoBoxTitleFontSize = 20;
	static infoBoxReqsFontSize = 18;
	static infoBoxNotesFontSize = 12;
	static infoBoxInnerBorderWidth = 5;
	static infoBoxInnerBorderHeight = 5;
	static infoBoxStroke = 3;
	static infoBoxTextYDisplacement = 2;//to make it looked vertically centered

	constructor(icon){
		this.icon = icon;
	}

	doOnAdd(){
		let priority=this.world.priorities['InfoBox'];

		this.world.addEventListener(this,'drawScreen',this.drawScreen,priority);
		// this.world.addEventListener(this,'acceptMouseTarget',this.acceptMouseTarget,this.priority);
		this.world.addEventListener(this,'mouseButtonDown',this.mouseButtonDown);



		this._setWidthInfo(this.world.worldView.ctx);
	}

	//sets this._infoBoxWidth and this._titleWidth
	_setWidthInfo(ctx){
		//title
		ctx.font = InfoBox.infoBoxTitleFontSize + 'px ' + InfoBox.infoBoxFont;
		this._titleWidth = ctx.measureText(this.icon.itemInfo.name).width;//title width

		let maxWidth = this._titleWidth;

		//reqs
		if(this.icon.hasCounterReqs()){
			let totalReqsWidth = 0;
			for(let req of this.icon.itemInfo.requirements){
				if(CounterInventory.isCollectionItem(req.name)){
					//image
					let image = CounterInventory.getImageFor(req.name);
					totalReqsWidth += InfoBox.infoBoxReqsFontSize * (image.width/image.height);//scaled pic

					//text
					let text = 'x' + req.quantity.toString();
					ctx.font = InfoBox.infoBoxReqsFontSize + 'px ' + InfoBox.infoBoxFont;
					totalReqsWidth += ctx.measureText(text).width;
				}
			}

			maxWidth = Math.max(maxWidth,totalReqsWidth);
		}

		//notes
		if(this.icon.itemInfo.notes!=null){
			ctx.font = InfoBox.infoBoxNotesFontSize + 'px ' + InfoBox.infoBoxFont;
			let notesWidth = ctx.measureText(this.icon.itemInfo.notes).width;
			maxWidth = Math.max(maxWidth,notesWidth);
		}


		this._infoBoxWidth =  maxWidth + InfoBox.infoBoxInnerBorderWidth*2;
		this._titleBoxHeight = InfoBox.infoBoxTitleFontSize + InfoBox.infoBoxInnerBorderHeight*2;
	}

	mouseButtonDown(buttonType){
		if(this._inTitle(this.world.worldView.currentXScreen,this.world.worldView.currentYScreen) && this.world.worldView.keyIsDown('ctrl')){
			//link to wiki
			let linkEx = this.icon.itemInfo.linkEx;
			if(linkEx!=null){
				let fullLink = "https://hollowknight.fandom.com/wiki/" + this.icon.itemInfo.linkEx;
				window.open(fullLink, '_blank');
			}
			
		}
	}

	_inTitle(xScreen,yScreen){
		return xScreen>this._startX && yScreen>this._startY && xScreen<this._startX+this._titleWidth && yScreen<this._startY+this._titleBoxHeight;
	}

	hasLink(){
		return this.icon.itemInfo.linkEx!=null;
	}


	drawScreen(ctx){
		this.drawInfoBox(ctx);
	}


	drawInfoBox(ctx){
		let right = this.icon.xScreen+this.icon.widthScreen/2;
		let top = this.icon.yScreen-this.icon.heightScreen/2;
		let infoBoxWidth = this._infoBoxWidth;

		this._startX = right+10;
		this._startY = top;

		if(right+infoBoxWidth>this.world.camera.screenWidth){
			//move to other side of icon
			this._startX = this.icon.xScreen-this.icon.widthScreen/2-infoBoxWidth-10;
		}
		this.drawInfoBoxAt(ctx,this._startX,this._startY,infoBoxWidth);
	}

	drawInfoBoxAt(ctx,xScreen,yScreen,infoBoxWidth){
		let currentYDisplacement = 0;

		//title
		let titleBoxHeight = InfoBox.infoBoxTitleFontSize + InfoBox.infoBoxInnerBorderHeight*2;
		this._drawTitleBox(ctx,xScreen,yScreen,infoBoxWidth,titleBoxHeight);
		currentYDisplacement+=titleBoxHeight;

		//counter reqs
		if(this.icon.hasCounterReqs()){
			let counterReqsBoxHeight = InfoBox.infoBoxReqsFontSize + InfoBox.infoBoxInnerBorderHeight*2
			this._drawCounterReqsBox(ctx,xScreen,yScreen+currentYDisplacement,infoBoxWidth,counterReqsBoxHeight);
			currentYDisplacement+=counterReqsBoxHeight;
		}


		//notes
		if(this.icon.itemInfo.notes!=null){
			let notesBoxHeight = InfoBox.infoBoxNotesFontSize + InfoBox.infoBoxInnerBorderHeight*2
			this._drawNotesBox(ctx,xScreen,yScreen+currentYDisplacement,infoBoxWidth,notesBoxHeight);
			// currentYDisplacement+=counterReqsBoxHeight;//not needed now as nothing comes after
		}

	}



	_drawInfoBoxBackground(ctx,xScreen,yScreen,width,height){
		ctx.fillStyle = 'black';
		ctx.beginPath();
		ctx.rect(xScreen,yScreen,width,height);
		ctx.globalAlpha = 0.5;
		ctx.fill();
		ctx.globalAlpha = 1;

		ctx.strokeStyle = 'grey';
		ctx.lineWidth = InfoBox.infoBoxStroke;
		ctx.beginPath();
		ctx.rect(xScreen,yScreen,width,height);
		ctx.stroke();
	}

	//width and height included innerBorder
	_drawTitleBox(ctx,xScreen,yScreen,width,height){
		ctx.font = InfoBox.infoBoxTitleFontSize + 'px ' + InfoBox.infoBoxFont;
		this._drawInfoBoxBackground(ctx,xScreen,yScreen,width,height);

		//draw name text
		ctx.textBaseline = 'bottom';
		ctx.fillStyle = 'white';
		if(this.hasLink() && this._inTitle(this.world.worldView.currentXScreen,this.world.worldView.currentYScreen) && this.world.worldView.keyIsDown('ctrl')){
			ctx.fillStyle = 'blue';
		}
		ctx.fillText(this.icon.itemInfo.name,xScreen + InfoBox.infoBoxInnerBorderWidth,yScreen + InfoBox.infoBoxInnerBorderHeight + (InfoBox.infoBoxTitleFontSize+InfoBox.infoBoxTextYDisplacement));
	}

	//width and height included innerBorder
	_drawCounterReqsBox(ctx,xScreen,yScreen,width,height){
		this._drawInfoBoxBackground(ctx,xScreen,yScreen,width,height);
		ctx.font = InfoBox.infoBoxReqsFontSize + 'px ' + InfoBox.infoBoxFont;
		ctx.textBaseline = 'bottom';
		ctx.fillStyle = 'white';

		let currentX = xScreen + InfoBox.infoBoxInnerBorderWidth;
		for(let req of this.icon.itemInfo.requirements){
			if(CounterInventory.isCollectionItem(req.name)){
				//draw image
				let image = CounterInventory.getImageFor(req.name);
				let picWidth = InfoBox.infoBoxReqsFontSize * (image.width/image.height);//scale pic
				ctx.drawImage(image, currentX, yScreen + InfoBox.infoBoxInnerBorderHeight,picWidth,InfoBox.infoBoxReqsFontSize);
				currentX+=picWidth;

				//draw text
				let text = 'x' + req.quantity.toString();
				ctx.fillStyle = CounterInventory.count(req.name)>=req.quantity?'white':'red';
				let textWidth = ctx.measureText(text).width;
				ctx.fillText(text,currentX,yScreen + InfoBox.infoBoxInnerBorderHeight + (InfoBox.infoBoxReqsFontSize+InfoBox.infoBoxTextYDisplacement));
				currentX+=textWidth;
			}
		}
		
	}

	//width and height included innerBorder
	_drawNotesBox(ctx,xScreen,yScreen,width,height){
		ctx.font = InfoBox.infoBoxNotesFontSize + 'px ' + InfoBox.infoBoxFont;
		this._drawInfoBoxBackground(ctx,xScreen,yScreen,width,height);

		//draw name text
		ctx.textBaseline = 'bottom';
		ctx.fillStyle = 'white';
		ctx.fillText(this.icon.itemInfo.notes,xScreen + InfoBox.infoBoxInnerBorderWidth,yScreen + InfoBox.infoBoxInnerBorderHeight + (InfoBox.infoBoxNotesFontSize+InfoBox.infoBoxTextYDisplacement));
	}
}