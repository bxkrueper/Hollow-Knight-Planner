//ideas:
//------use bit map for save string- smaller string
//use something better that alert (don't need to click ok)
//bug: can have wrong values in counter if reading bad saveText  fix: don't bypass setter. instead use setter but set var to not send to front
//collected toll benches count as non-collectables
//------------------------way to filter (just grubs for example)
//------------------------boss reqs and deeper store items still appear if locked   (add property to itemInfo) + is semiVisable method in icon


//pictures of place names
//auto claim: kingsoul, dirtmounth station, stag nest
//circle around bosses
//non-collectables:  shops
//rancid eggs?

class HollowWorld extends World{

	static itemSeperator = "--";
	static counterAmountSeperator = "::";

	constructor(){
		super();
		this._selectedObject = null;
		this.draggingObject = null;
		this._setPriorities();

		this.hideLockedCheckbox;//set by menu strip
		this.showNonCollectables;//set by menu strip

		this.debugMode = false;
		this.add(new DebugToggle('d',['shift']));
		this.add(new DisplayUpdaterObject());
		this.add(new CameraManipulatorObject());

		ItemInfoDatabase.initilizeDatabase();
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

		this.addIcons();

	}

	addIcons(){
		let self = this;
		ItemInfoDatabase.doForAllItemInfo(function(itemInfo){
			self.add(new Icon(itemInfo));
		});
	}

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
		//unclaim all items
		ItemInfoDatabase.doForAllItemInfo(function(itemInfo){
			itemInfo.icon.have = false;
		});

		saveString = saveString.trim();//remove any surounding white space from someone's text editer when it was copied

		try{
			let stringArray = saveString.split(HollowWorld.itemSeperator);

			for(let itemString of stringArray){
				if(itemString.search(HollowWorld.counterAmountSeperator)>=0){
					//itemString describes a Counter Inventory amount
					let itemStringArray = itemString.split(HollowWorld.counterAmountSeperator);
					CounterInventory.set(itemStringArray[0],Number(itemStringArray[1]));
				}else{
					//itemString is for an icon that needs to be claimed
					ItemInfoDatabase.getItemInfo(itemString).icon.have = true;
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


	//items seperated by '--'. counters seperated by '::'
	//ex: "Geo::123--Pale Ore::2--City Crest--False Knight"
	getSaveText(){
		let string = "";

		CounterInventory.doForAllCounters(function(name,amount){
			string += (name + HollowWorld.counterAmountSeperator + amount.toString() + HollowWorld.itemSeperator);
		});

		ItemInfoDatabase.doForAllItemInfo(function(itemInfo){
			if(itemInfo.icon.have){
				string += (itemInfo.name + HollowWorld.itemSeperator);
			}
		});

		string = string.slice(0,string.length-2);

		return string;
	}
	
}