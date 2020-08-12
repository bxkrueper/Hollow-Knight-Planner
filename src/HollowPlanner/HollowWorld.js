//ideas:
//use something better that alert (don't need to click ok)
//------------------------boss reqs and deeper store items still appear if locked   (add property to itemInfo) + is semiVisable method in icon
//--remember toggle preferences
//circle around bosses
//non-collectables:  shops

class HollowWorld extends World{

	

	constructor(){
		super();
		this._selectedObject = null;
		this.draggingObject = null;
		this._setPriorities();

		this.hideLockedCheckbox;//set by menu strip
		this.showNonCollectables;//set by menu strip
		this.drawLabels;//set by menu strip
		this.recursiveRequirements;//set by menu strip

		this.debugMode = false;
		this.add(new DebugToggle('d',['shift']));
		this.add(new DisplayUpdaterObject());
		this.add(new CameraManipulatorObject());

		ItemInfoDatabase.initilizeDatabase();
		this._dontShowMap = {};//set by hollow.html methods. looked up by icon  example entry: "Rancid Egg":true
	}

	dontShowType(type){
		return this._dontShowMap[type];
	}
	setDontShow(type,val){
		this._dontShowMap[type] = val;
	}

	//override
	doOnWorldViewSet(){
		this.redrawAfter('mouseButtonDown');
		this.redrawAfter('mouseButtonUp');
		this.redrawAfter('mouseMoved');
		this.redrawAfter('keyUp');
		this.redrawAfter('keyInput');
		this.redrawAfter('scroll');

		let backgroundMap = new BackgroundMap();
		this.add(backgroundMap);

		// this.addNonCollectables();
		this.addIcons();
	}

	addIcons(){
		let self = this;
		ItemInfoDatabase.doForAllItemInfo(function(itemInfo){
			self.add(new Icon(itemInfo));
		});
	}

	// addNonCollectables(){
	// 	let self = this;
	// 	ItemInfoDatabase.doForAllItemInfo(function(itemInfo){
	// 		self.add(new Icon(itemInfo));
	// 	});
	// }



	get selectedObject(){
		return this._selectedObject;
	}
	set selectedObject(newSelected){
		let prevSelected = this._selectedObject;
		this._selectedObject=newSelected;
		if(prevSelected===newSelected){
			//do nothing
		}else{
			if(prevSelected!=null&&((typeof prevSelected['deSelected']) == "function")){
				prevSelected.deSelected();
			}
			if(newSelected!=null&&((typeof newSelected['becameSelected']) == "function")){
				newSelected.becameSelected();
			}
		}
	}

	//override
	generateCamera(){
		return new MoveZoomCamera(220,100,5,5);
	}

	//override   to implement selecting
	// doFunctionToAllObjects(methodName,param){
	// 	super.doFunctionToAllObjects(methodName,param);
	// 	if(methodName=='mouseClicked'){
	// 		this.selectedObject=this.currentTarget;
	// 	}
	// }

	

	_setPriorities(){
		this.priorities['BackgroundMap'] = 0;
		this.priorities['NonCollectableIcon'] = 0.2;
		this.priorities['IconObtained'] = 0.5;
		this.priorities['IconDefault'] = 1;
		this.priorities['InfoBox'] = 2;
	}




	loadSaveString(saveString){
		this.loadingSave = true;//lets Icon know not to bother with selecting or shuffling order, as many things are being claimed at once

		saveString = saveString.trim();//remove any surounding white space from someone's text editer when it was copied

		try{
			let stringArray = saveString.split("^^");
			let counterString = stringArray[0];
			let bitString = MyAlgs.hexStringToBinaryString(stringArray[1]);
console.log(bitString);
console.log(bitString.length);

			let counterStringArray = counterString.split(";");

			//set counter ammounts
			for(let i=0;i<counterStringArray.length;i++){
				let name = CounterInventory.keys[i];
				CounterInventory.set(name,Number(counterStringArray[i]));
			}

			//set icon have/not have.  Ignore uncollectables
			let keys = ItemInfoDatabase.keys;
			let length = Math.min(keys.length,bitString.length);//slight protection against corrupted data
			for(let bitStringIndex=0;bitStringIndex<length;bitStringIndex++){
				if(bitString[bitStringIndex]==='1'){//have it
					ItemInfoDatabase.getItemInfo(keys[bitStringIndex]).icon.have = true;
				}else{//0. don't have
					ItemInfoDatabase.getItemInfo(keys[bitStringIndex]).icon.have = false;
				}
			}

			this.worldView.redraw();
			alert("Import successful!");
		}catch(e){
			this.worldView.redraw();
			alert("Error reading save text!");
			console.log("Problem occured: " + e);
		}
		
		
		this.loadingSave = false;
	}

///////'π'.charCodeAt(0).toString(2).padStart(16,0);   returns '0000001111000000'
///////String.fromCharCode(parseInt('0000001111000000', 2));  returns 'π'

	
	getSaveText(){
		let string = "";

		CounterInventory.keys.forEach(function(value, index, array){
			let amount = CounterInventory.count(value);
			string += amount.toString() + ';';
		});

		string = string.slice(0,string.length-1);//get rid of last comma
		string += "^^";//seperator between counters and havs

		//ignore uncollectables at the end
		let haveBinString = '';
		ItemInfoDatabase.keys.forEach(function(value, index, array){
			let itemInfo = ItemInfoDatabase.getItemInfo(value);
				let addOn = itemInfo.icon.have?'1':'0';
  				haveBinString += addOn;
		});

console.log(haveBinString);
console.log(haveBinString.length);
		string += MyAlgs.binaryStringToHexString(haveBinString);
		return string;
	}



	// static itemSeperator = "--";
	// static counterAmountSeperator = "::";

	// loadSaveString(saveString){
	// 	this.loadingSave = true;//lets Icon know not to bother with selecting or shuffling order, as many things are being claimed at once
	// 	//unclaim all items
	// 	ItemInfoDatabase.doForAllItemInfo(function(itemInfo){
	// 		itemInfo.icon.have = false;
	// 	});

	// 	saveString = saveString.trim();//remove any surounding white space from someone's text editer when it was copied

	// 	try{
	// 		let stringArray = saveString.split(HollowWorld.itemSeperator);

	// 		for(let itemString of stringArray){
	// 			if(itemString.search(HollowWorld.counterAmountSeperator)>=0){
	// 				//itemString describes a Counter Inventory amount
	// 				let itemStringArray = itemString.split(HollowWorld.counterAmountSeperator);
	// 				CounterInventory.set(itemStringArray[0],Number(itemStringArray[1]));
	// 			}else{
	// 				//itemString is for an icon that needs to be claimed
	// 				ItemInfoDatabase.getItemInfo(itemString).icon.have = true;
	// 			}
	// 		}

	// 		this.worldView.redraw();
	// 		alert("Import successful!");
	// 	}catch(e){
	// 		this.worldView.redraw();
	// 		alert("Error reading save text!");
	// 		console.log("Problem occured: " + e);
	// 	}
		
		
	// 	this.loadingSave = false;
	// }


	// //items seperated by '--'. counters seperated by '::'
	// //ex: "Geo::123--Pale Ore::2--City Crest--False Knight"
	// getSaveText(){
	// 	let string = "";

	// 	CounterInventory.doForAllCounters(function(name,amount){
	// 		string += (name + HollowWorld.counterAmountSeperator + amount.toString() + HollowWorld.itemSeperator);
	// 	});

	// 	ItemInfoDatabase.doForAllItemInfo(function(itemInfo){
	// 		if(itemInfo.icon.have){
	// 			string += (itemInfo.name + HollowWorld.itemSeperator);
	// 		}
	// 	});

	// 	string = string.slice(0,string.length-2);

	// 	return string;
	// }
	
}