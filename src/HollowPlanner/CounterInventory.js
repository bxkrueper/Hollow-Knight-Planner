"use strict";
//for items that are in a group and are interchangable (all geo, simple keys are the same)
class CounterInventory{
	static _map = CounterInventory.getDefaultMap();

	static getDefaultMap(){
		return {
			"Geo":0,
			"Simple Key":0,
			"Pale Ore":0,

			"Mask Shard":0,
			"Vessel Fragment":0,
			"Grub":0,
			"Dream Essence":0,
			"Charm Notch":3,
			"Charm":0,
			"Stag Station":0,
			"Map":0,


			"Wanderer's Journal":0,
			"Hallownest Seal":0,
			"King's Idol":0,
			"Arcane Egg":0,
		};
	}

	static resetMap(){
		CounterInventory._map = CounterInventory.getDefaultMap();
	}

	static isCollectionItem(name){
		return CounterInventory._map[name]!=null;
	}
	static isCurrencyItem(name){
		return name==='Geo' || name==='Simple Key' || name==='Pale Ore';
	}

	static count(name){
		return CounterInventory._map[name];
	}

	static addTo(name,amount){
		if(CounterInventory._map[name]!=null){
			CounterInventory._map[name]+=amount;

			CounterInventory.updateLabel(name);
		}
	}

	static set(name,amount){
		if(CounterInventory._map[name]!=null){
			CounterInventory._map[name]=amount;

			CounterInventory.updateLabel(name);
		}
	}

	static updateLabel(name,count){
		if(count==null){
			count = CounterInventory.count(name);
		}

		let label = document.getElementById(name + " Label");
		if(label!=null){
			if(label.type==='text'){
				label.value = count;//MyAlgs.thousands_separators(count);
			}else{
				//assume it is a label
				label.innerHTML = count;//MyAlgs.thousands_separators(count);
			}
			
		}
	}

	static updateAllLabels(){
		for (const [name, amount] of Object.entries(CounterInventory._map)) {
			CounterInventory.updateLabel(name,amount);
		}
	}

	static getImageFor(name){
		return Images.get(name + ".png");
	}

	//func accepts (name,itemInfo)
	static doForAllCounters(func){
		for (const [name, amount] of Object.entries(CounterInventory._map)) {
			func(name,amount);
		}
	}
}