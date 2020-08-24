"use strict";

class ItemInfoDatabase{
	static _mapObject = {};//name string to Item
	static keys = null;//for saving and loading. does not include non-collectables

	static getItemInfo(name){
		return ItemInfoDatabase._mapObject[name];
	}

	static doForAllItemInfo(func){
		for (const [name, itemInfo] of Object.entries(ItemInfoDatabase._mapObject)) {
			func(itemInfo);
		}
	}

	static initilizeDatabase(){
		ItemInfoDatabase._initilizeRawStats();
		ItemInfoDatabase._setOtherVars();
		ItemInfoDatabase.keys = Object.keys(ItemInfoDatabase._mapObject);
		ItemInfoDatabase.keys = ItemInfoDatabase.keys.filter(function(itemName){
			return !ItemInfoDatabase.getItemInfo(itemName).nonCollectable;
		});
		// console.log(ItemInfoDatabase.keys);
	}
	//not used
	// static _addItemInfo(itemInfo){
	// 	ItemInfoDatabase._mapObject[itemInfo.name] = itemInfo;
	// }
	static _initilizeRawStats(){
		let upperRestingGrounds = {name:"-choose1-",choose1List:[{name:"Lumafly Lantern"},{name:"Tram Pass"},{name:"Dung Defender"},{name:"Desolate Dive"}]};
		let east = {name:"-choose1-",choose1List:[{name:"Crystal Heart"},{name:"Tram Pass"},{name:"Dung Defender"},{name:"Desolate Dive"}]};//Basin, east city, kingdom's edge
		let westCity = {name:"-choose1-",choose1List:[{name:"-all-",allList:[{name:"Mantis Claw"},{name:"City Crest"}]},{name:"-choose1-",choose1List:[{name:"Tram Pass"}]}]};//(claw and crest) or (non infinite recusion from east)??????????????
		let queensGuardens = {name:"-choose1-",choose1List:[{name:"Isma's Tear"},{name:"Shade Cloak"}]};
		let royalWaterwaysStart = {name:"-choose1-",choose1List:[{name:"Simple Lock (Royal Waterways)"},{name:"-all-",allList:[{name:"Crystal Heart"},{name:"Tram Pass"}]}]};//////lock or (tram + ch)
		

		// let royalWaterwaysSW = {name:"-all-",allList:[royalWaterwaysStart,{name:"Desolate Dive"}]};

		// let crystalPeakMain = {name:"-choose1-",choose1List:[{name:"Desolate Dive"},{name:"Lumafly Lantern"}]},{name:"Mantis Claw"};
		

		let corniferNote = "you can buy the map in Iselda's shop if you miss him";

		ItemInfoDatabase._mapObject = 
		{

			//core__________________________________________________________________________________
			"City Crest":{ x:214,y:87.7,size:50,pictureName:"City Crest.png",hitboxType:'circle',linkEx:"City_Crest",
			requirements:[{name:"False Knight"}], notes:"guarded by False Knight"},

			"Vengeful Spirit":{	x:206,y:83,size:50,pictureName:"Vengeful Spirit.png",hitboxType:'rect',linkEx:"Vengeful_Spirit",
			requirements:[], notes:"in the Ancestral Mound",
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Mothwing Cloak":{	x:79.7,y:73,size:50,pictureName:"Mothwing Cloak.png",hitboxType:'circle',linkEx:"Mothwing_Cloak",
			requirements:[{name:"Hornet Protector"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:2}  },

			"Mantis Claw":{	x:182,y:164,size:50,pictureName:"Mantis Claw.png",hitboxType:'circle',linkEx:"Mantis_Claw",
			requirements:[{name:"Mothwing Cloak"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:2}  },

			"Desolate Dive":{ x:266,y:126,size:50,pictureName:"Desolate Dive.png",hitboxType:'circle',linkEx:"Desolate_Dive",
			requirements:[{name:"Soul Master"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Crystal Heart":{ x:342,y:63,size:50,pictureName:"Crystal Heart.png",hitboxType:'circle',linkEx:"Crystal_Heart",
			requirements:[{name:"-choose1-",choose1List:[{name:"Desolate Dive"},{name:"Lumafly Lantern"}]},{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:2}  },

			"Monarch Wings":{ x:186,y:225,size:50,pictureName:"Monarch Wings.png",hitboxType:'circle',linkEx:"Monarch_Wings",
			requirements:[{name:"Broken Vessel"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:2}  },

			"Isma's Tear":{ x:338,y:195,size:50,pictureName:"Ismas Tear.png",hitboxType:'circle',linkEx:"Isma%27s_Tear",
			requirements:[{name:"Crystal Heart"},{name:"Dung Defender"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:2}  },

			"King's Brand":{ x:430,y:173,size:50,pictureName:"Kings Brand.png",hitboxType:'rect',linkEx:"King's_Brand",
			requirements:[{name:"Hornet Sentinel"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:2}  },

			"Shade Cloak":{	x:364,y:274,size:50,pictureName:"Shade Cloak.png",hitboxType:'circle',linkEx:"Shade_Cloak",
			requirements:[{name:"King's Brand"}], notes:"light the lighthouse to cross the lake",
			addToOnClaimed:{name:'Completion',quantity:2}  },

			"Kingsoul (Left)":{	x:55,y:115,size:40,pictureName:"Kingsoul (Left).png",hitboxType:'rect',linkEx:"Kingsoul",
			requirements:[{name:"Traitor Lord"}], notes:null,
			doOnClaimed:ItemInfoDatabase._kingsoulPartDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._kingsoulPartDoOnUnClaimed  },//////////???

			"Kingsoul (Right)":{	x:304,y:223,size:40,pictureName:"Kingsoul (Right).png",hitboxType:'rect',linkEx:"Kingsoul",
			requirements:[{name:"Monarch Wings"},{name:"Awoken Dream Nail"}], notes:"complete the White Palace",
			doOnClaimed:ItemInfoDatabase._kingsoulPartDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._kingsoulPartDoOnUnClaimed  },

			"Void Heart":{	x:273,y:280,size:40,pictureName:"Void Heart.png",hitboxType:'circle',linkEx:"Void_Heart",
			requirements:[{name:"King's Brand"},{name:"Kingsoul (Left)"},{name:"Kingsoul (Right)"}], notes:"Kingsoul must be equipped"},

			"Dream Nail":{	x:332,y:93,size:60,pictureName:"Dream Nail.png",hitboxType:'rect',linkEx:"Dream_Nail",
			requirements:[upperRestingGrounds], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1}  },

			"Monomon the Teacher":{	x:160,y:128,size:30,pictureName:"Monomon the Teacher.png",hitboxType:'rect',linkEx:"Monomon",
			requirements:[{name:"Dream Nail"},{name:"Uumuu"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1}  },

			"Lurien the Watcher":{	x:304,y:112,size:30,pictureName:"Lurien the Watcher.png",hitboxType:'rect',linkEx:"Lurien",
			requirements:[{name:"Watcher Knights"},{name:"Dream Nail"}], notes:"guarded by 6 Watcher Knights",
			addToOnClaimed:{name:'Completion',quantity:1}  },

			"Herrah the Beast":{	x:32.6,y:186,size:30,pictureName:"Herrah the Beast.png",hitboxType:'rect',linkEx:"Herrah",
			requirements:[{name:"Dream Nail"},{name:"Lumafly Lantern"},{name:"Mantis Claw"}], notes:"sit on the bench to go to Beast's Layer",
			addToOnClaimed:{name:'Completion',quantity:1}  },

			"Sly":{	x:259,y:103,size:40,pictureName:"Sly.png",hitboxType:'circle',linkEx:"Sly",
			requirements:[{name:"-choose1-",choose1List:[{name:"Gruz Mother"},{name:"Tram Pass"},{name:"Dung Defender"},{name:"Desolate Dive"}]}], notes:'inside a house'},

			"Simple Key (Sly)":{	x:214,y:15,size:50,pictureName:"Simple Key.png",hitboxType:'circle',linkEx:"Simple_Key",type:"Simple Key",
			requirements:[{name:"Sly"},{name:"Geo",quantity:950}], notes:null,
			addToOnClaimed:{name:'Simple Key',quantity:1} },

			"Simple Key (City of Tears)":{	x:244,y:132,size:50,pictureName:"Simple Key.png",hitboxType:'circle',linkEx:"Simple_Key",type:"Simple Key",
			requirements:[westCity], notes:null,
			addToOnClaimed:{name:'Simple Key',quantity:1} },

			"Simple Key (Ancient Basin)":{	x:213,y:237,size:50,pictureName:"Simple Key.png",hitboxType:'circle',linkEx:"Simple_Key",type:"Simple Key",
			requirements:[east], notes:"inside a Mawlurk corpse",
			addToOnClaimed:{name:'Simple Key',quantity:1} },

			"Simple Key (Pale Lurker)":{	x:407,y:133,size:50,pictureName:"Simple Key.png",hitboxType:'circle',linkEx:"Simple_Key",type:"Simple Key",
			requirements:[{name:"Pale Lurker"}], notes:null,
			addToOnClaimed:{name:'Simple Key',quantity:1} },

			"Simple Lock (Royal Waterways)":{	x:270.7,y:171.7,size:50,pictureName:"Simple Lock.png",hitboxType:'circle',linkEx:"Simple_Key",
			requirements:[westCity,{name:"Simple Key",quantity:1}], notes:null, },

			"Simple Lock (Dirtmouth)":{	x:219.8,y:63.6,size:50,pictureName:"Simple Lock.png",hitboxType:'circle',linkEx:"Simple_Key",
			requirements:[{name:"Simple Key",quantity:1}], notes:"contains Confessor Jiji", },

			"Simple Lock (Pleasure House)":{	x:316.4,y:168.8,size:50,pictureName:"Simple Lock.png",hitboxType:'circle',linkEx:"Simple_Key",
			requirements:[east,{name:"Simple Key",quantity:1}], notes:null, },

			"Simple Lock (Godseeker's cocoon)":{	x:208,y:197.4,size:50,pictureName:"Simple Lock.png",hitboxType:'circle',linkEx:"Simple_Key",
			requirements:[royalWaterwaysStart,{name:"Desolate Dive"},{name:"Simple Key",quantity:1}], notes:"grants access to Godhome", },

			// "City Lock":{	x:220.7,y:144.3,size:50,pictureName:"City Lock.png",hitboxType:'circle',////////can be accessed from the back with desolate dive
			// requirements:[{name:"Mantis Claw"},{name:"City Crest"}], notes:"opens the city doors only once. sets a save point in the city", },

			"Shopkeeper's Key":{	x:280,y:51,size:50,pictureName:"Shopkeepers Key.png",hitboxType:'circle',linkEx:"Shopkeeper's_Key",
			requirements:[{name:"-choose1-",choose1List:[{name:"Desolate Dive"},{name:"Lumafly Lantern"}]},{name:"Mantis Claw"}], notes:"grants access to the rest of Sly's stock"},

			"Elegant Key":{	x:216,y:26,size:50,pictureName:"Elegant Key.png",hitboxType:'circle',linkEx:"Elegant_Key",
			requirements:[{name:"Shopkeeper's Key"},{name:"Geo",quantity:800}], notes:"opens a door in the Soul Sanctum"},

			"Love Key":{	x:134,y:148,size:50,pictureName:"Love Key.png",hitboxType:'circle',linkEx:"Love_Key",
			requirements:[{name:"-choose1-",choose1List:[{name:"Isma's Tear"},{name:"Shade Cloak"}]}], notes:"gives access to the Tower of Love (East city)"},

			"Lumafly Lantern":{	x:207,y:40,size:60,pictureName:"Lumafly Lantern.png",hitboxType:'circle',linkEx:"Lumafly_Lantern",
			requirements:[{name:"Sly"},{name:"Geo",quantity:1800}], notes:null },

			"Bretta":{	x:203,y:176,size:50,pictureName:"Bretta.png",hitboxType:'circle',linkEx:"Bretta",
			requirements:[{name:"Mantis Claw"}], notes:"unlocks her house in Dirtmouth" },

			"save Zote (Vengefly King)":{	x:98.8,y:64.6,size:50,pictureName:"Zote (hurt).png",hitboxType:'circle',linkEx:"Zote",
			requirements:[{name:"Vengefly King"}], notes:null },

			"save Zote (Deepnest)":{	x:130,y:184,size:50,pictureName:"Zote (Deepnest).png",hitboxType:'circle',linkEx:"Zote",
			requirements:[{name:"Mantis Claw"}], notes:"go to the north room and circle around to access" },

			"defeat Zote":{	x:370,y:120,size:50,pictureName:"Zote.png",hitboxType:'circle',linkEx:"Zote",
			requirements:[east,{name:"save Zote (Vengefly King)"},{name:"save Zote (Deepnest)"}], notes:"found at the end of the Trial of the Warrior" },

			"Tram Pass":{	x:88,y:174,size:50,pictureName:"Tram Pass.png",hitboxType:'circle',linkEx:"Tram_Pass",
			requirements:[{name:"Mantis Claw"}], notes:null },

			"Summon the Grimm Troupe":{	x:136,y:54,size:40,pictureName:"Grimm Troupe Icon.png",hitboxType:'circle',linkEx:"Category%3AThe_Grimm_Troupe",
			requirements:[{name:"Mantis Claw"},{name:"Dream Nail"}], notes:"dream nail the corpse then strike the brazier repeatedly" },

			"Howling Wraiths":{	x:109,y:119,size:50,pictureName:"Howling Wraiths.png",hitboxType:'circle',linkEx:"Howling_Wraiths",
			requirements:[{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Shade Soul":{	x:273,y:133,size:50,pictureName:"Shade Soul.png",hitboxType:'circle',linkEx:"Shade_Soul",
			requirements:[{name:"Soul Warrior 2"}], notes:"guarded by a Soul Warrior",
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Descending Dark":{	x:331,y:76,size:50,pictureName:"Descending Dark.png",hitboxType:'circle',linkEx:"Descending_Dark",
			requirements:[{name:"Lumafly Lantern"},{name:"Crystal Heart"},{name:"Desolate Dive"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Abyss Shriek":{	x:236,y:277,size:50,pictureName:"Abyss Shriek.png",hitboxType:'circle',linkEx:"Abyss_Shriek",
			requirements:[{name:"King's Brand"},{name:"Howling Wraiths"}], notes:"perform a Howling Wraith in the room",
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Awoken Dream Nail":{	x:338,y:74,size:50,pictureName:"Awoken Dream Nail.png",hitboxType:'circle',linkEx:"Dream_Nail",
			requirements:[{name:"Dream Essence",quantity:1800}], notes:"gives access to the White Palace",
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Dreamgate":{	x:342,y:70,size:50,pictureName:"Dreamgate.png",hitboxType:'circle',linkEx:"Dreamgate",
			requirements:[{name:"Dream Essence",quantity:900}], notes:"acts like a loadstone" },

			"Cyclone Slash":{	x:140.8,y:39,size:50,pictureName:"Cyclone Slash.png",hitboxType:'circle',linkEx:"Cyclone_Slash",
			requirements:[{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Dash Slash":{	x:429,y:184,size:50,pictureName:"Dash Slash.png",hitboxType:'circle',linkEx:"Dash_Slash",
			requirements:[east,{name:"Geo",quantity:800}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Great Slash":{	x:47.7,y:95,size:50,pictureName:"Great Slash.png",hitboxType:'circle',linkEx:"Great_Slash",
			requirements:[{name:"Crystal Heart"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Salubra's Blessing":{	x:295,y:105,size:50,pictureName:"Salubras Blessing.png",hitboxType:'circle',linkEx:"Salubra%27s_Blessing",
			requirements:[{name:"Mothwing Cloak"},{name:"Charm",quantity:40},{name:"Geo",quantity:800}], notes:"fills your soul at a bench" },

			"Godtuner":{	x:210,y:197,size:40,pictureName:"Godtuner.png",hitboxType:'circle',linkEx:"Godtuner",
			requirements:[{name:"Simple Lock (Godseeker's cocoon)"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Ascension":{	x:345.3,y:69.4,size:40,pictureName:"Achievement Ascension.png",hitboxType:'rect',linkEx:"Seer",
			requirements:[{name:"Dream Essence",quantity:2400}], notes:"hear the Seer's final words",
			addToOnClaimed:{name:'Completion',quantity:1}  },

			//Bosses________________________________________________________________________
			"Broken Vessel":{	x:211,y:225,size:50,pictureName:"Broken Vessel.png",hitboxType:'circle',linkEx:"Broken_Vessel",
			requirements:[{name:"Crystal Heart"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Brooding Mawlek":{	x:186,y:87,size:50,pictureName:"Brooding Mawlek.png",hitboxType:'circle',linkEx:"Brooding_Mawlek",
			requirements:[{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"The Collector":{	x:360,y:152,size:50,pictureName:"The Collector.png",hitboxType:'circle',linkEx:"Collector",
			requirements:[{name:"Love Key"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Crystal Guardian":{	x:286,y:53,size:50,pictureName:"Crystal Guardian.png",hitboxType:'circle',linkEx:"Crystal_Guardian",
			requirements:[{name:"-choose1-",choose1List:[{name:"Desolate Dive"},{name:"Lumafly Lantern"}]},{name:"Mantis Claw"}], notes:null },

			"Enraged Guardian":{	x:287.2,y:47.5,size:60,pictureName:"Enraged Guardian.png",hitboxType:'circle',linkEx:"Enraged_Guardian",
			requirements:[{name:"Crystal Guardian"},{name:"Monarch Wings"}], notes:"does double damage. Drops 550 geo",
			addToOnClaimed:{name:"Geo",quantity:550} },

			"Dung Defender":{	x:296,y:181,size:50,pictureName:"Dung Defender.png",hitboxType:'circle',linkEx:"Dung_Defender",
			requirements:[royalWaterwaysStart], notes:"remember to hit the lever on the right to open up more of the waterways",
			addToOnClaimed:{name:'Completion',quantity:1} },

			"False Knight":{	x:214,y:84,size:50,pictureName:"False Knight.png",hitboxType:'circle',linkEx:"False_Knight",
			requirements:[], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Flukemarm":{	x:243.6,y:194,size:50,pictureName:"Flukemarm.png",hitboxType:'rect',linkEx:"Flukemarm",
			requirements:[royalWaterwaysStart,{name:"Desolate Dive"}], notes:null },

			// "God Tamer":{	x:388,y:115,size:50,pictureName:"God Tamer.png",hitboxType:'circle',linkEx:"God_Tamer",
			// requirements:[{name:"Trial of the Fool"}], notes:null },////////////to auto complete

			"Troupe Master Grimm":{	x:194,y:62,size:50,pictureName:"Grimm.png",hitboxType:'rect',linkEx:"Grimm",
			requirements:[{name:"Grimmkin Nightmare (Fungal Core)"},{name:"Grimmkin Nightmare (Ancient Basin)"},{name:"Grimmkin Nightmare (Hive)"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Gruz Mother":{	x:260,y:99,size:50,pictureName:"Gruz Mother.png",hitboxType:'circle',linkEx:"Gruz_Mother",
			requirements:[], notes:"drops 50 geo",
			addToOnClaimed:[{name:'Completion',quantity:1},{name:"Geo",quantity:50}] },

			"Hive Knight":{	x:408,y:195.5,size:50,pictureName:"Hive Knight.png",hitboxType:'circle',linkEx:"Hive_Knight",
			requirements:[{name:"Tram Pass"},{name:"Monarch Wings"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Hornet Protector":{	x:82.7,y:72.6,size:50,pictureName:"Hornet Protector.png",hitboxType:'circle',linkEx:"Hornet_Protector",
			requirements:[{name:"Vengeful Spirit"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Hornet Sentinel":{	x:432.5,y:169.5,size:50,pictureName:"Hornet Sentinel.png",hitboxType:'circle',linkEx:"Hornet_Sentinel",
			requirements:[{name:"Monarch Wings"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Mantis Lords":{	x:186.4,y:183,size:60,pictureName:"Mantis Lords.png",hitboxType:'circle',linkEx:"Mantis_Lords",
			requirements:[{name:"Mantis Claw"}], notes:"opens the main door to Deepnest and the Village Treasury",
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Massive Moss Charger":{	x:116,y:109,size:60,pictureName:"Massive Moss Charger.png",hitboxType:'circle',linkEx:"Massive_Moss_Charger",
			requirements:[{name:"Mothwing Cloak"}], notes:"drops 300 geo",
			addToOnClaimed:{name:"Geo",quantity:300} },

			"Nosk":{	x:143,y:213,size:50,pictureName:"Nosk.png",hitboxType:'circle',linkEx:"Nosk",
			requirements:[{name:"Crystal Heart"},{name:"Lumafly Lantern"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			// "Oblobbles":{	x:380,y:108,size:50,pictureName:"Oblobbles.png",hitboxType:'circle',linkEx:"Oblobbles",
			// requirements:[{name:"Trial of the Conqueror"}], notes:null },/////////to auto complete

			"Pale Lurker":{	x:412,y:133,size:50,pictureName:"Pale Lurker.png",hitboxType:'circle',linkEx:"Pale_Lurker",
			requirements:[east], notes:null },

			"Soul Master":{	x:266,y:123,size:50,pictureName:"Soul Master.png",hitboxType:'circle',linkEx:"Soul_Master",
			requirements:[{name:"Soul Warrior 1"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Soul Warrior 1":{	x:280,y:130,size:50,pictureName:"Soul Warrior.png",hitboxType:'circle',linkEx:"Soul_Warrior",
			requirements:[westCity], notes:"drops 200 geo",
			addToOnClaimed:{name:"Geo",quantity:200} },

			"Soul Warrior 2":{	x:269.4,y:136,size:50,pictureName:"Soul Warrior.png",hitboxType:'circle',linkEx:"Soul_Warrior",
			requirements:[westCity,{name:"Elegant Key"}], notes:null },

			"Traitor Lord":{	x:73.3,y:115,size:50,pictureName:"Traitor Lord.png",hitboxType:'circle',linkEx:"Traitor_Lord",
			requirements:[{name:"Shade Cloak"}], notes:"does double damage",
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Uumuu":{	x:160,y:121.7,size:50,pictureName:"Uumuu.png",hitboxType:'circle',linkEx:"Uumuu",
			requirements:[{name:"-choose1-",choose1List:[{name:"Isma's Tear"},{name:"Shade Cloak"}]}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },////need tear???

			"Vengefly King":{	x:99,y:63.3,size:50,pictureName:"Vengefly King.png",hitboxType:'circle',linkEx:"Vengefly_King",
			requirements:[{name:"Vengeful Spirit"}], notes:"is eating Zote. If you leave him, he will die. Drops 65 geo",
			addToOnClaimed:{name:"Geo",quantity:65} },

			"Watcher Knights":{	x:302,y:134,size:50,pictureName:"Watcher Knight.png",hitboxType:'circle',linkEx:"Watcher_Knight",
			requirements:[east], notes:"you can kill one before the fight with a chandelier",
			addToOnClaimed:{name:'Completion',quantity:1} },

			"The Hollow Knight":{	x:220,y:70,size:50,pictureName:"The Hollow Knight.png",hitboxType:'circle',linkEx:"Hollow_Knight",
			requirements:[{name:"Lurien the Watcher"},{name:"Monomon the Teacher"},{name:"Herrah the Beast"}], notes:"any % ending"},

			"The Radiance":{	x:227,y:69,size:60,pictureName:"The Radiance.png",hitboxType:'circle',linkEx:"Radiance",
			requirements:[{name:"The Hollow Knight"},{name:"Void Heart"}], notes:"true ending. Dream nail the Hollow Knight when Hornet strikes"},

			//Warriors Graves
			"Elder Hu":{	x:226,y:136,size:50,pictureName:"Elder Hu.png",hitboxType:'circle',linkEx:"Elder_Hu",type:"Dream Essence",
			requirements:[{name:"Mothwing Cloak"},{name:"Dream Nail"}], notes:"gives 100 dream essence",
			addToOnClaimed:[{name:'Dream Essence',quantity:100},{name:'Completion',quantity:1}] },

			"Galien":{	x:96,y:185,size:50,pictureName:"Galien.png",hitboxType:'circle',linkEx:"Galien",type:"Dream Essence",
			requirements:[{name:"Lumafly Lantern"},{name:"Mantis Claw"},{name:"Dream Nail"}], notes:"gives 200 dream essence",
			addToOnClaimed:[{name:'Dream Essence',quantity:200},{name:'Completion',quantity:1}] },

			"Gorb":{	x:129,y:33,size:50,pictureName:"Gorb.png",hitboxType:'circle',linkEx:"Gorb",type:"Dream Essence",
			requirements:[{name:"Mantis Claw"},{name:"Dream Nail"}], notes:"gives 100 dream essence",
			addToOnClaimed:[{name:'Dream Essence',quantity:100},{name:'Completion',quantity:1}] },

			"Markoth":{	x:410.5,y:178.5,size:50,pictureName:"Markoth.png",hitboxType:'circle',linkEx:"Markoth",type:"Dream Essence",
			requirements:[{name:"Shade Cloak"},{name:"Dream Nail"}], notes:"gives 250 dream essence",
			addToOnClaimed:[{name:'Dream Essence',quantity:250},{name:'Completion',quantity:1}] },

			"Marmu":{	x:68,y:137,size:50,pictureName:"Marmu.png",hitboxType:'circle',linkEx:"Marmu",type:"Dream Essence",
			requirements:[queensGuardens,{name:"Dream Nail"}], notes:"gives 150 dream essence",
			addToOnClaimed:[{name:'Dream Essence',quantity:150},{name:'Completion',quantity:1}] },

			"No Eyes":{	x:168,y:103,size:50,pictureName:"No Eyes.png",hitboxType:'circle',linkEx:"No_Eyes",type:"Dream Essence",
			requirements:[{name:"Vengeful Spirit"},{name:"Lumafly Lantern"},{name:"Dream Nail"}], notes:"gives 200 dream essence",
			addToOnClaimed:[{name:'Dream Essence',quantity:200},{name:'Completion',quantity:1}] },

			"Xero":{	x:316,y:93.5,size:50,pictureName:"Xero.png",hitboxType:'circle',linkEx:"Xero",type:"Dream Essence",
			requirements:[upperRestingGrounds,{name:"Dream Nail"}], notes:"gives 100 dream essence",
			addToOnClaimed:[{name:'Dream Essence',quantity:100},{name:'Completion',quantity:1}] },

			//Dream Bosses
			"Failed Champion":{	x:216,y:82,size:40,pictureName:"Failed Champion.png",hitboxType:'circle',linkEx:"Failed_Champion",type:"Dream Essence",
			requirements:[{name:"Dream Nail"},{name:"False Knight"}], notes:"gives 300 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:300} },

			"Grey Prince Zote":{	x:204,y:61,size:40,pictureName:"Grey Prince Zote.png",hitboxType:'circle',linkEx:"Grey_Prince_Zote",type:"Dream Essence",
			requirements:[{name:"Bretta"},{name:"defeat Zote"},{name:"Monarch Wings"},{name:"Dream Nail"}], notes:"gives 300 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:300} },

			"Lost Kin":{	x:210,y:221,size:40,pictureName:"Lost Kin.png",hitboxType:'circle',linkEx:"Lost_Kin",type:"Dream Essence",
			requirements:[{name:"Dream Nail"},{name:"Broken Vessel"}], notes:"gives 400 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:400} },

			"Soul Tyrant":{	x:266,y:129,size:40,pictureName:"Soul Tyrant.png",hitboxType:'circle',linkEx:"Soul_Tyrant",type:"Dream Essence",
			requirements:[{name:"Dream Nail"},{name:"Soul Master"}], notes:"gives 300 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:300} },

			"White Defender":{	x:296,y:184,size:40,pictureName:"White Defender.png",hitboxType:'circle',linkEx:"White_Defender",type:"Dream Essence",
			requirements:[{name:"Dream Nail"},{name:"Dung Defender"},{name:"Desolate Dive"}], notes:"gives 300 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:300} },

			"Nightmare King Grimm or banishment":{	x:194,y:54,size:40,pictureName:"Nightmare King Grimm.png",hitboxType:'circle',linkEx:"Nightmare_King_Grimm",
			requirements:[{name:"Troupe Master Grimm"}], notes:"to banish, talk to Brumm in the Distant Village with the Grimmchild, then meet him at the torch in the Howling Cliffs",
			addToOnClaimed:{name:'Completion',quantity:1} },////////////change for banishment option?

			//Pantheon_______________________________________________________________________________
			"Pantheon of the Master":{	x:194,y:201,size:40,pictureName:"Pantheon of the Master.png",hitboxType:'circle',linkEx:"Pantheon_of_the_Master",
			requirements:[{name:"Simple Lock (Godseeker's cocoon)"},
			{name:"Gruz Mother"},{name:"False Knight"},//Vengefly King is auto-unlocked
			{name:"Massive Moss Charger"},{name:"Hornet Protector"},{name:"Gorb"},
			{name:"Dung Defender"},{name:"-choose1-",choose1List:[{name:"Soul Warrior 1"},{name:"Soul Warrior 2"}]},{name:"Brooding Mawlek"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Pantheon of the Artist":{	x:204,y:201,size:40,pictureName:"Pantheon of the Artist.png",hitboxType:'circle',linkEx:"Pantheon_of_the_Artist",
			requirements:[{name:"Simple Lock (Godseeker's cocoon)"},
			{name:"Xero"},{name:"Crystal Guardian"},{name:"Soul Master"},
			{name:"Trial of the Conqueror"},{name:"Mantis Lords"},{name:"Marmu"},
			{name:"Nosk"},{name:"Flukemarm"},{name:"Broken Vessel"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Pantheon of the Sage":{	x:214,y:201,size:40,pictureName:"Pantheon of the Sage.png",hitboxType:'circle',linkEx:"Pantheon_of_the_Sage",
			requirements:[{name:"Simple Lock (Godseeker's cocoon)"},
			{name:"Hive Knight"},{name:"Elder Hu"},{name:"The Collector"},
			{name:"Troupe Master Grimm"},{name:"Galien"},//god tamer is auto-unlocked
			{name:"Uumuu"},{name:"Hornet Sentinel"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },//Grey Prince Zote is not needed

			"Pantheon of the Knight":{	x:224,y:201,size:40,pictureName:"Pantheon of the Knight.png",hitboxType:'circle',linkEx:"Pantheon_of_the_Knight",
			requirements:[{name:"Pantheon of the Master"},{name:"Pantheon of the Artist"},{name:"Pantheon of the Sage"},
			{name:"Enraged Guardian"},{name:"No Eyes"},{name:"Traitor Lord"},
			{name:"Markoth"},{name:"Watcher Knights"}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Pantheon of Hallownest":{	x:234,y:201,size:40,pictureName:"Pantheon of Hallownest.png",hitboxType:'circle',linkEx:"Pantheon_of_Hallownest",
			requirements:[{name:"Pantheon of the Knight"},{name:"Void Heart"}], notes:null, },

			//Trials
			"Trial of the Warrior":{	x:370,y:125,size:50,pictureName:"Trial of the Warrior.png",hitboxType:'rect',linkEx:"Trial_of_the_Warrior",
			requirements:[east,{name:"Geo",quantity:100}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Trial of the Conqueror":{	x:380,y:125,size:50,pictureName:"Trial of the Conqueror.png",hitboxType:'rect',linkEx:"Trial_of_the_Conqueror",
			requirements:[{name:"Trial of the Warrior"},{name:"Geo",quantity:450}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Trial of the Fool":{	x:390,y:125,size:60,pictureName:"Trial of the Fool.png",hitboxType:'rect',linkEx:"Trial_of_the_Fool",
			requirements:[{name:"Trial of the Conqueror"},{name:"Geo",quantity:800}], notes:null,
			addToOnClaimed:{name:'Completion',quantity:1} },

			//charms__________________________________________________________________________________
			"Wayward Compass":{	x:230,y:45,size:50,pictureName:"Wayward Compass.png",hitboxType:'circle',linkEx:"Wayward_Compass",type:"Charm",
			requirements:[{name:"Map",quantity:1},{name:"Geo",quantity:220}], notes:"Bought from Iselda after meeting Cornifer",
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Gathering Swarm":{	x:181,y:46,size:50,pictureName:"Gathering Swarm.png",hitboxType:'circle',linkEx:"Gathering_Swarm",type:"Charm",
			requirements:[{name:"Sly"},{name:"Geo",quantity:300}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Stalwart Shell":{	x:181,y:36,size:50,pictureName:"Stalwart Shell.png",hitboxType:'circle',linkEx:"Stalwart_Shell",type:"Charm",
			requirements:[{name:"Sly"},{name:"Geo",quantity:200}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Soul Catcher":{	x:203,y:82,size:50,pictureName:"Soul Catcher.png",hitboxType:'circle',linkEx:"Soul_Catcher",type:"Charm",
			requirements:[], notes:"end of the Ancestral Mound",
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Shaman Stone":{	x:283,y:105,size:50,pictureName:"Shaman Stone.png",hitboxType:'circle',linkEx:"Shaman_Stone",type:"Charm",
			requirements:[{name:"Mothwing Cloak"},{name:"Geo",quantity:220}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Soul Eater":{	x:373.5,y:98,size:50,pictureName:"Soul Eater.png",hitboxType:'circle',linkEx:"Soul_Eater",type:"Charm",
			requirements:[{name:"Desolate Dive"}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Dashmaster":{	x:198.7,y:184,size:50,pictureName:"Dashmaster.png",hitboxType:'circle',linkEx:"Dashmaster",type:"Charm",
			requirements:[{name:"Mothwing Cloak"}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Sprintmaster":{	x:181,y:26,size:50,pictureName:"Sprintmaster.png",hitboxType:'circle',linkEx:"Sprintmaster",type:"Charm",
			requirements:[{name:"Geo",quantity:400},{name:"Shopkeeper's Key"}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Grubsong":{	x:185,y:71,size:50,pictureName:"Grubsong.png",hitboxType:'circle',linkEx:"Grubsong",type:"Charm",
			requirements:[{name:"Grub",quantity:10}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Grubberfly's Elegy":{	x:193,y:71,size:50,pictureName:"Grubberflys Elegy.png",hitboxType:'circle',linkEx:"Grubberfly%27s_Elegy",type:"Charm",
			requirements:[{name:"Grub",quantity:46}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Fragile Greed":{	x:207,y:119,size:50,pictureName:"Fragile Greed.png",hitboxType:'circle',linkEx:"Fragile_Greed",type:"Charm",
			requirements:[{name:"Mothwing Cloak"},{name:"Geo",quantity:250}], notes:"breaks if you die with it on",
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Unbreakable Greed":{	x:168.5,y:22,size:50,pictureName:"Unbreakable Greed.png",hitboxType:'circle',linkEx:"Fragile_Greed",type:"Charm",
			requirements:[{name:"Summon the Grimm Troupe"},{name:"Fragile Greed"},{name:"Geo",quantity:9000}], notes:"buy from Divine after giving her Fragile Greed",  },

			"Fragile Heart":{	x:210,y:119,size:50,pictureName:"Fragile Heart.png",hitboxType:'circle',linkEx:"Fragile_Heart",type:"Charm",
			requirements:[{name:"Mothwing Cloak"},{name:"Geo",quantity:350}], notes:"breaks if you die with it on",
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Unbreakable Heart":{	x:168.5,y:32,size:50,pictureName:"Unbreakable Heart.png",hitboxType:'circle',linkEx:"Fragile_Heart",type:"Charm",
			requirements:[{name:"Summon the Grimm Troupe"},{name:"Fragile Heart"},{name:"Geo",quantity:12000}], notes:"buy from Divine after giving her Fragile Heart",  },

			"Fragile Strength":{	x:213,y:119,size:50,pictureName:"Fragile Strength.png",hitboxType:'circle',linkEx:"Fragile_Strength",type:"Charm",
			requirements:[{name:"Mothwing Cloak"},{name:"Geo",quantity:600}], notes:"breaks if you die with it on",
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Unbreakable Strength":{	x:168.5,y:42,size:50,pictureName:"Unbreakable Strength.png",hitboxType:'circle',linkEx:"Fragile_Strength",type:"Charm",
			requirements:[{name:"Summon the Grimm Troupe"},{name:"Fragile Strength"},{name:"Geo",quantity:15000}], notes:"buy from Divine after giving her Fragile Strength",  },

			"Spell Twister":{	x:282,y:121,size:50,pictureName:"Spell Twister.png",hitboxType:'circle',linkEx:"Spell_Twister",type:"Charm",
			requirements:[{name:"Soul Warrior 1"}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Steady Body":{	x:283,y:110,size:50,pictureName:"Steady Body.png",hitboxType:'circle',linkEx:"Steady_Body",type:"Charm",
			requirements:[{name:"Mothwing Cloak"},{name:"Geo",quantity:120}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Heavy Blow":{	x:181,y:18,size:50,pictureName:"Heavy Blow.png",hitboxType:'circle',linkEx:"Heavy_Blow",type:"Charm",
			requirements:[{name:"Geo",quantity:350},{name:"Shopkeeper's Key"}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Quick Slash":{	x:421,y:190,size:50,pictureName:"Quick Slash.png",hitboxType:'circle',linkEx:"Quick_Slash",type:"Charm",
			requirements:[east,{name:"Desolate Dive"}], notes:"in a small tunnel within a wall",
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Longnail":{	x:283,y:115,size:50,pictureName:"Longnail.png",hitboxType:'circle',linkEx:"Longnail",type:"Charm",
			requirements:[{name:"Mothwing Cloak"},{name:"Geo",quantity:300}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Mark of Pride":{	x:196,y:170,size:50,pictureName:"Mark of Pride.png",hitboxType:'circle',linkEx:"Mark_of_Pride",type:"Charm",
			requirements:[{name:"Mantis Lords"}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Fury of the Fallen":{	x:172,y:65,size:50,pictureName:"Fury of the Fallen.png",hitboxType:'circle',linkEx:"Fury_of_the_Fallen",type:"Charm",
			requirements:[], notes:"nail pogo on the spikes to get early",
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Thorns of Agony":{	x:130,y:93,size:50,pictureName:"Thorns of Agony.png",hitboxType:'circle',linkEx:"Thorns_of_Agony",type:"Charm",
			requirements:[{name:"Mothwing Cloak"}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Baldur Shell":{	x:129,y:64,size:50,pictureName:"Baldur Shell.png",hitboxType:'circle',linkEx:"Baldur_Shell",type:"Charm",
			requirements:[{name:"Mothwing Cloak"}], notes:"guarded by 2 Elder Baldurs",
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Flukenest":{	x:243,y:196.3,size:50,pictureName:"Flukenest.png",hitboxType:'circle',linkEx:"Flukenest",type:"Charm",
			requirements:[{name:"Flukemarm"}], notes:"dropped by Flukemarm",
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Defender's Crest":{	x:294,y:180,size:50,pictureName:"Defenders Crest.png",hitboxType:'circle',linkEx:"Defender%27s_Crest",type:"Charm",
			requirements:[{name:"Dung Defender"}], notes:"dropped by Dung Defender",
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Glowing Womb":{	x:232,y:80,size:50,pictureName:"Glowing Womb.png",hitboxType:'circle',linkEx:"Glowing_Womb",type:"Charm",
			requirements:[{name:"Crystal Heart"}], notes:"guarded by aspid Hunters and aspid Mothers",
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Quick Focus":{	x:289,y:105,size:50,pictureName:"Quick Focus.png",hitboxType:'circle',linkEx:"Quick_Focus",type:"Charm",
			requirements:[{name:"Mothwing Cloak"},{name:"Geo",quantity:800}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Deep Focus":{	x:248,y:65,size:50,pictureName:"Deep Focus.png",hitboxType:'circle',linkEx:"Deep_Focus",type:"Charm",
			requirements:[{name:"Crystal Heart"}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Lifeblood Heart":{	x:289,y:110,size:50,pictureName:"Lifeblood Heart.png",hitboxType:'circle',linkEx:"Lifeblood_Heart",type:"Charm",
			requirements:[{name:"Mothwing Cloak"},{name:"Geo",quantity:250}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Lifeblood Core":{	x:255,y:263,size:50,pictureName:"Lifeblood Core.png",hitboxType:'circle',linkEx:"Lifeblood_Core",type:"Charm",
			requirements:[{name:"King's Brand"}], notes:"need at least 15 lifeblood masks. Joni's Blessing and Lifeblood Heart can help",
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Joni's Blessing":{	x:146,y:51,size:50,pictureName:"Jonis Blessing.png",hitboxType:'circle',linkEx:"Joni%27s_Blessing",type:"Charm",
			requirements:[{name:"Mantis Claw"},{name:"Lumafly Lantern"}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Hiveblood":{	x:405.7,y:198.6,size:50,pictureName:"Hiveblood.png",hitboxType:'circle',linkEx:"Hiveblood",type:"Charm",
			requirements:[{name:"Hive Knight"}], notes:"guarded by Hive Knight",
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Spore Shroom":{	x:154,y:156.5,size:50,pictureName:"Spore Shroom.png",hitboxType:'circle',linkEx:"Spore_Shroom",type:"Charm",
			requirements:[{name:"Mantis Claw"}], notes:"access from bottom-left of the room",
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Sharp Shadow":{	x:170,y:217,size:50,pictureName:"Sharp Shadow.png",hitboxType:'circle',linkEx:"Sharp_Shadow",type:"Charm",
			requirements:[{name:"Mantis Claw"},{name:"Shade Cloak"}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Shape of Unn":{	x:37,y:91,size:50,pictureName:"Shape of Unn.png",hitboxType:'circle',linkEx:"Shape_of_Unn",type:"Charm",
			requirements:[{name:"Isma's Tear"}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Nailmaster's Glory":{	x:228,y:14,size:50,pictureName:"Nailmasters Glory.png",hitboxType:'circle',linkEx:"Nailmaster%27s_Glory",type:"Charm",
			requirements:[{name:"Great Slash"},{name:"Cyclone Slash"},{name:"Dash Slash"},{name:"Sly"}], notes:"given by Sly after learning all nail arts",
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Weaversong":{	x:99,y:194,size:50,pictureName:"Weaversong.png",hitboxType:'circle',linkEx:"Weaversong",type:"Charm",
			requirements:[{name:"Lumafly Lantern"},{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Dream Wielder":{	x:341,y:74,size:50,pictureName:"Dream Wielder.png",hitboxType:'circle',linkEx:"Dream_Wielder",type:"Charm",
			requirements:[{name:"Dream Essence",quantity:500}], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Dreamshield":{	x:332.4,y:85.3,size:50,pictureName:"Dreamshield.png",hitboxType:'circle',linkEx:"Dreamshield",type:"Charm",
			requirements:[upperRestingGrounds], notes:null,
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			"Grimmchild":{	x:194,y:63.5,size:50,pictureName:"Grimmchild.png",hitboxType:'circle',linkEx:"Grimmchild",type:"Charm",
			requirements:[{name:"Summon the Grimm Troupe"}], notes:"talk to Grimm",
			addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			// "Carefree Melody":{	x:188,y:62,size:50,pictureName:"Carefree Melody.png",hitboxType:'circle',linkEx:"Carefree_Melody",type:"Charm",
			// requirements:[{name:"Troupe Master Grimm"}], notes:"talk to Nymm after banishing the Grimm Troupe",  },/////////////do on get: unclaim grimchild?

			// "Kingsoul":{	x:30,y:240,size:50,pictureName:"Kingsoul.png",hitboxType:'circle',linkEx:"Kingsoul",
			// requirements:[{name:"Kingsoul (Left)"},{name:"Kingsoul (Right)"}], notes:"combine the two halves",
			// addToOnClaimed:[{name:'Charm',quantity:1},{name:'Completion',quantity:1}]  },

			//Mask Shards______________________________________________________________________________
			"Mask Shard (Sly #1)":{	x:197,y:46,size:50,pictureName:"Mask Shard.png",hitboxType:'rect',linkEx:"Mask_Shard",type:"Mask Shard",
			requirements:[{name:"Sly"},{name:"Geo",quantity:150}], notes:null,
			addToOnClaimed:{name:'Mask Shard',quantity:1},doOnClaimed:ItemInfoDatabase._maskShardDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._maskShardDoOnUnClaimed },

			"Mask Shard (Sly #2)":{	x:197,y:36,size:50,pictureName:"Mask Shard.png",hitboxType:'rect',linkEx:"Mask_Shard",type:"Mask Shard",
			requirements:[{name:"Mask Shard (Sly #1)"},{name:"Geo",quantity:550}], notes:null,
			addToOnClaimed:{name:'Mask Shard',quantity:1},doOnClaimed:ItemInfoDatabase._maskShardDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._maskShardDoOnUnClaimed },

			"Mask Shard (Sly #3)":{	x:197,y:26,size:50,pictureName:"Mask Shard.png",hitboxType:'rect',linkEx:"Mask_Shard",type:"Mask Shard",
			requirements:[{name:"Mask Shard (Sly #2)"},{name:"Shopkeeper's Key"},{name:"Geo",quantity:800}], notes:null,
			addToOnClaimed:{name:'Mask Shard',quantity:1},doOnClaimed:ItemInfoDatabase._maskShardDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._maskShardDoOnUnClaimed },

			"Mask Shard (Sly #4)":{	x:197,y:16,size:50,pictureName:"Mask Shard.png",hitboxType:'rect',linkEx:"Mask_Shard",type:"Mask Shard",
			requirements:[{name:"Mask Shard (Sly #3)"},{name:"Geo",quantity:1500}], notes:null,
			addToOnClaimed:{name:'Mask Shard',quantity:1},doOnClaimed:ItemInfoDatabase._maskShardDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._maskShardDoOnUnClaimed },

			"Mask Shard (Bretta's House)":{	x:204,y:63,size:50,pictureName:"Mask Shard.png",hitboxType:'rect',linkEx:"Mask_Shard",type:"Mask Shard",
			requirements:[{name:"Bretta"}], notes:null,
			addToOnClaimed:{name:'Mask Shard',quantity:1},doOnClaimed:ItemInfoDatabase._maskShardDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._maskShardDoOnUnClaimed },

			"Mask Shard (West Forgotten Crossroads)":{	x:191,y:87,size:50,pictureName:"Mask Shard.png",hitboxType:'rect',linkEx:"Mask_Shard",type:"Mask Shard",
			requirements:[{name:"Brooding Mawlek"}], notes:null,
			addToOnClaimed:{name:'Mask Shard',quantity:1},doOnClaimed:ItemInfoDatabase._maskShardDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._maskShardDoOnUnClaimed },

			"Mask Shard (Middle Forgotten Crossroads)":{	x:213,y:94,size:50,pictureName:"Mask Shard.png",hitboxType:'rect',linkEx:"Mask_Shard",type:"Mask Shard",
			requirements:[{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:'Mask Shard',quantity:1},doOnClaimed:ItemInfoDatabase._maskShardDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._maskShardDoOnUnClaimed },

			"Mask Shard (Stone Sancuary)":{	x:166,y:103,size:50,pictureName:"Mask Shard.png",hitboxType:'rect',linkEx:"Mask_Shard",type:"Mask Shard",
			requirements:[{name:"Vengeful Spirit"},{name:"Lumafly Lantern"}], notes:null,
			addToOnClaimed:{name:'Mask Shard',quantity:1},doOnClaimed:ItemInfoDatabase._maskShardDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._maskShardDoOnUnClaimed },

			"Mask Shard (Queen's Station)":{	x:160.8,y:143,size:50,pictureName:"Mask Shard.png",hitboxType:'rect',linkEx:"Mask_Shard",type:"Mask Shard",
			requirements:[{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:'Mask Shard',quantity:1},doOnClaimed:ItemInfoDatabase._maskShardDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._maskShardDoOnUnClaimed },

			"Mask Shard (Near Mantis Village)":{	x:170,y:184,size:50,pictureName:"Mask Shard.png",hitboxType:'rect',linkEx:"Mask_Shard",type:"Mask Shard",
			requirements:[{name:"Monarch Wings"}], notes:"access from above",
			addToOnClaimed:{name:'Mask Shard',quantity:1},doOnClaimed:ItemInfoDatabase._maskShardDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._maskShardDoOnUnClaimed },

			"Mask Shard (Seer)":{	x:339,y:70,size:50,pictureName:"Mask Shard.png",hitboxType:'rect',linkEx:"Mask_Shard",type:"Mask Shard",
			requirements:[{name:"Dream Essence",quantity:1500}], notes:null,
			addToOnClaimed:{name:'Mask Shard',quantity:1},doOnClaimed:ItemInfoDatabase._maskShardDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._maskShardDoOnUnClaimed },

			"Mask Shard (Flower Quest)":{	x:366,y:94,size:50,pictureName:"Mask Shard.png",hitboxType:'rect',linkEx:"Mask_Shard",type:"Mask Shard",
			requirements:[{name:"Desolate Dive"},queensGuardens], notes:null,
			addToOnClaimed:{name:'Mask Shard',quantity:1},doOnClaimed:ItemInfoDatabase._maskShardDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._maskShardDoOnUnClaimed },

			"Mask Shard (Hive)":{	x:380,y:196,size:50,pictureName:"Mask Shard.png",hitboxType:'rect',linkEx:"Mask_Shard",type:"Mask Shard",
			requirements:[{name:"Tram Pass"},{name:"Monarch Wings"}], notes:"get a Hive Guardian to break the wall",
			addToOnClaimed:{name:'Mask Shard',quantity:1},doOnClaimed:ItemInfoDatabase._maskShardDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._maskShardDoOnUnClaimed },

			"Mask Shard (Grubfather)":{	x:190,y:71,size:50,pictureName:"Mask Shard.png",hitboxType:'rect',linkEx:"Mask_Shard",type:"Mask Shard",
			requirements:[{name:"Grub",quantity:5}], notes:null,
			addToOnClaimed:{name:'Mask Shard',quantity:1},doOnClaimed:ItemInfoDatabase._maskShardDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._maskShardDoOnUnClaimed },

			"Mask Shard (Crystal Guardian)":{	x:283,y:48,size:50,pictureName:"Mask Shard.png",hitboxType:'rect',linkEx:"Mask_Shard",type:"Mask Shard",
			requirements:[{name:"Enraged Guardian"}], notes:null,
			addToOnClaimed:{name:'Mask Shard',quantity:1},doOnClaimed:ItemInfoDatabase._maskShardDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._maskShardDoOnUnClaimed },

			"Mask Shard (Royal Waterways)":{	x:215,y:181,size:50,pictureName:"Mask Shard.png",hitboxType:'rect',linkEx:"Mask_Shard",type:"Mask Shard",
			requirements:[royalWaterwaysStart], notes:null,
			addToOnClaimed:{name:'Mask Shard',quantity:1},doOnClaimed:ItemInfoDatabase._maskShardDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._maskShardDoOnUnClaimed },

			//Vessel Fragment______________________________________________________________________________
			"Vessel Fragment (Sly #1)":{	x:217,y:46,size:50,pictureName:"Vessel Fragment.png",hitboxType:'circle',linkEx:"Vessel_Fragment",type:"Vessel Fragment",
			requirements:[{name:"Sly"},{name:"Geo",quantity:550}], notes:null,
			addToOnClaimed:{name:'Vessel Fragment',quantity:1},doOnClaimed:ItemInfoDatabase._vesselFragmentDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._vesselFragmentDoOnUnClaimed },

			"Vessel Fragment (Sly #2)":{	x:217,y:36,size:50,pictureName:"Vessel Fragment.png",hitboxType:'circle',linkEx:"Vessel_Fragment",type:"Vessel Fragment",
			requirements:[{name:"Vessel Fragment (Sly #1)"},{name:"Shopkeeper's Key"},{name:"Geo",quantity:900}], notes:null,
			addToOnClaimed:{name:'Vessel Fragment',quantity:1},doOnClaimed:ItemInfoDatabase._vesselFragmentDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._vesselFragmentDoOnUnClaimed },

			"Vessel Fragment (Greenpath)":{	x:103,y:105,size:50,pictureName:"Vessel Fragment.png",hitboxType:'circle',linkEx:"Vessel_Fragment",type:"Vessel Fragment",
			requirements:[{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:'Vessel Fragment',quantity:1},doOnClaimed:ItemInfoDatabase._vesselFragmentDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._vesselFragmentDoOnUnClaimed },

			"Vessel Fragment (Forgotten Crossroads)":{	x:208.5,y:99,size:50,pictureName:"Vessel Fragment.png",hitboxType:'circle',linkEx:"Vessel_Fragment",type:"Vessel Fragment",
			requirements:[westCity,{name:"Geo",quantity:150}], notes:"unlock the lift in City of Tears",
			addToOnClaimed:{name:'Vessel Fragment',quantity:1},doOnClaimed:ItemInfoDatabase._vesselFragmentDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._vesselFragmentDoOnUnClaimed },

			"Vessel Fragment (City of Tears)":{	x:348,y:148,size:50,pictureName:"Vessel Fragment.png",hitboxType:'circle',linkEx:"Vessel_Fragment",type:"Vessel Fragment",
			requirements:[east], notes:"guarded by many Husk Sentries",
			addToOnClaimed:{name:'Vessel Fragment',quantity:1},doOnClaimed:ItemInfoDatabase._vesselFragmentDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._vesselFragmentDoOnUnClaimed },

			"Vessel Fragment (Deepnest)":{	x:181,y:198,size:50,pictureName:"Vessel Fragment.png",hitboxType:'circle',linkEx:"Vessel_Fragment",type:"Vessel Fragment",
			requirements:[{name:"Mantis Claw"}], notes:"requires nail pogoing on Garpedes",
			addToOnClaimed:{name:'Vessel Fragment',quantity:1},doOnClaimed:ItemInfoDatabase._vesselFragmentDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._vesselFragmentDoOnUnClaimed },

			"Vessel Fragment (Stag Nest)":{	x:122,y:31,size:50,pictureName:"Vessel Fragment.png",hitboxType:'circle',linkEx:"Vessel_Fragment",type:"Vessel Fragment",
			requirements:[{name:"Stag Station (Stag Nest)"}], notes:null,
			addToOnClaimed:{name:'Vessel Fragment',quantity:1},doOnClaimed:ItemInfoDatabase._vesselFragmentDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._vesselFragmentDoOnUnClaimed },

			"Vessel Fragment (Seer)":{	x:339,y:78,size:50,pictureName:"Vessel Fragment.png",hitboxType:'circle',linkEx:"Vessel_Fragment",type:"Vessel Fragment",
			requirements:[{name:"Dream Essence",quantity:700}], notes:null,
			addToOnClaimed:{name:'Vessel Fragment',quantity:1},doOnClaimed:ItemInfoDatabase._vesselFragmentDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._vesselFragmentDoOnUnClaimed },

			"Vessel Fragment (Ancient Basin)":{	x:279,y:214,size:50,pictureName:"Vessel Fragment.png",hitboxType:'circle',linkEx:"Vessel_Fragment",type:"Vessel Fragment",
			requirements:[east,{name:"Geo",quantity:3000}], notes:"the fountain will refund anything you over-pay",
			addToOnClaimed:{name:'Vessel Fragment',quantity:1},doOnClaimed:ItemInfoDatabase._vesselFragmentDoOnClaimed,doOnUnClaimed:ItemInfoDatabase._vesselFragmentDoOnUnClaimed },

			//Pale ore________________________________________________________________________
			"Pale ore (Ancient Basin)":{	x:236,y:212,size:50,pictureName:"Pale ore.png",hitboxType:'circle',linkEx:"Pale_Ore",type:"Pale Ore",
			requirements:[east], notes:"guarded by 2 Lesser Mawleks",
			addToOnClaimed:{name:'Pale Ore',quantity:1} },

			"Pale ore (Seer)":{	x:340,y:81,size:50,pictureName:"Pale ore.png",hitboxType:'circle',linkEx:"Pale_Ore",type:"Pale Ore",
			requirements:[{name:"Dream Essence",quantity:300}], notes:null,
			addToOnClaimed:{name:'Pale Ore',quantity:1} },

			"Pale ore (Hallownest's Crown)":{	x:311.7,y:11.3,size:50,pictureName:"Pale ore.png",hitboxType:'circle',linkEx:"Pale_Ore",type:"Pale Ore",
			requirements:[{name:"-choose1-",choose1List:[{name:"Desolate Dive"},{name:"Lumafly Lantern"}]},{name:"Monarch Wings"}], notes:null,//confirmed. just wings
			addToOnClaimed:{name:'Pale Ore',quantity:1} },

			"Pale ore (Deepnest)":{	x:155,y:213,size:50,pictureName:"Pale ore.png",hitboxType:'circle',linkEx:"Pale_Ore",type:"Pale Ore",
			requirements:[{name:"Nosk"}], notes:"guarded by Nosk",
			addToOnClaimed:{name:'Pale Ore',quantity:1} },

			"Pale ore (Grubfather)":{	x:188,y:71,size:50,pictureName:"Pale ore.png",hitboxType:'circle',linkEx:"Pale_Ore",type:"Pale Ore",
			requirements:[{name:"Grub",quantity:31}], notes:null,
			addToOnClaimed:{name:'Pale Ore',quantity:1} },

			"Pale ore (Colosseum of Fools)":{	x:380,y:115,size:50,pictureName:"Pale ore.png",hitboxType:'circle',linkEx:"Pale_Ore",type:"Pale Ore",
			requirements:[{name:"Trial of the Conqueror"}], notes:"complete the Trial of the Conqueror",
			addToOnClaimed:{name:'Pale Ore',quantity:1} },

			//Nail upgrades__________________________________________________________________________________
			"Sharpened Nail":{	x:216,y:165,size:20,pictureName:"Sharpened Nail.png",hitboxType:'rect',linkEx:"Nail",
			requirements:[westCity,{name:"Geo",quantity:250}], notes:"does 9 damage (old nail was 5)",
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Channelled Nail":{	x:222,y:165,size:20,pictureName:"Channelled Nail.png",hitboxType:'rect',linkEx:"Nail",
			requirements:[{name:"Sharpened Nail"},{name:"Pale Ore",quantity:1},{name:"Geo",quantity:800}], notes:"does 13 damage",
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Coiled Nail":{	x:228,y:165,size:20,pictureName:"Coiled Nail.png",hitboxType:'rect',linkEx:"Nail",
			requirements:[{name:"Channelled Nail"},{name:"Pale Ore",quantity:2},{name:"Geo",quantity:2000}], notes:"does 17 damage",
			addToOnClaimed:{name:'Completion',quantity:1} },

			"Pure Nail":{	x:234,y:165,size:20,pictureName:"Pure Nail.png",hitboxType:'rect',linkEx:"Nail",
			requirements:[{name:"Coiled Nail"},{name:"Pale Ore",quantity:3},{name:"Geo",quantity:4000}], notes:"does 21 damage",
			addToOnClaimed:{name:'Completion',quantity:1} },

			//charm notches__________________________________________________________________________________
			"Charm notch (Salubra #1)":{	x:272,y:106,size:50,pictureName:"Charm Notch.png",hitboxType:'circle',linkEx:"Category:Charms",type:"Charm Notch",
			requirements:[{name:"Mothwing Cloak"},{name:"Charm",quantity:5},{name:"Geo",quantity:120}], notes:null,
			addToOnClaimed:{name:'Charm Notch',quantity:1} },

			"Charm notch (Salubra #2)":{	x:272,y:111,size:50,pictureName:"Charm Notch.png",hitboxType:'circle',linkEx:"Category:Charms",type:"Charm Notch",
			requirements:[{name:"Mothwing Cloak"},{name:"Charm",quantity:10},{name:"Geo",quantity:500}], notes:null,
			addToOnClaimed:{name:'Charm Notch',quantity:1} },

			"Charm notch (Salubra #3)":{	x:277,y:106,size:50,pictureName:"Charm Notch.png",hitboxType:'circle',linkEx:"Category:Charms",type:"Charm Notch",
			requirements:[{name:"Mothwing Cloak"},{name:"Charm",quantity:18},{name:"Geo",quantity:900}], notes:null,
			addToOnClaimed:{name:'Charm Notch',quantity:1} },

			"Charm notch (Salubra #4)":{	x:277,y:111,size:50,pictureName:"Charm Notch.png",hitboxType:'circle',linkEx:"Category:Charms",type:"Charm Notch",
			requirements:[{name:"Mothwing Cloak"},{name:"Charm",quantity:25},{name:"Geo",quantity:1400}], notes:null,
			addToOnClaimed:{name:'Charm Notch',quantity:1} },

			"Charm notch (Fog Canyon)":{	x:169,y:109,size:50,pictureName:"Charm Notch.png",hitboxType:'circle',linkEx:"Category:Charms",type:"Charm Notch",
			requirements:[{name:"-choose1-",choose1List:[{name:"Isma's Tear"},{name:"Shade Cloak"}]}], notes:'watch your step. The explosions can combo you out',
			addToOnClaimed:{name:'Charm Notch',quantity:1} },

			"Charm notch (Fungal Wastes)":{	x:190.5,y:126.5,size:50,pictureName:"Charm Notch.png",hitboxType:'circle',linkEx:"Category:Charms",type:"Charm Notch",
			requirements:[{name:"Mothwing Cloak"}], notes:"guarded by 2 Shrumal Ogres",
			addToOnClaimed:{name:'Charm Notch',quantity:1} },

			"Charm notch (Colosseum of Fools)":{	x:370,y:115,size:50,pictureName:"Charm Notch.png",hitboxType:'circle',linkEx:"Category:Charms",type:"Charm Notch",
			requirements:[{name:"Trial of the Warrior"}], notes:null,
			addToOnClaimed:{name:'Charm Notch',quantity:1} },

			"Charm notch (Grimm)":{	x:194,y:58,size:50,pictureName:"Charm Notch.png",hitboxType:'circle',linkEx:"Category:Charms",type:"Charm Notch",
			requirements:[{name:"Troupe Master Grimm"}], notes:null,
			addToOnClaimed:{name:'Charm Notch',quantity:1} },

			//Stag Stations
			"Stag Station (City Storerooms)":{	x:247.2,y:126.4,size:50,pictureName:"Stag Station.png",hitboxType:'circle',linkEx:"Fast_Travel",showAsNonCollectable:true,type:"Stag Station",
			requirements:[westCity,{name:"Geo",quantity:200}], notes:null,
			addToOnClaimed:{name:'Stag Station',quantity:1} },

			"Stag Station (King's Station)":{	x:350.3,y:167.3,size:50,pictureName:"Stag Station.png",hitboxType:'circle',linkEx:"Fast_Travel",showAsNonCollectable:true,type:"Stag Station",
			requirements:[east,{name:"Geo",quantity:300}], notes:null,
			addToOnClaimed:{name:'Stag Station',quantity:1} },

			"Stag Station (Distant Village)":{	x:46.3,y:180.8,size:50,pictureName:"Stag Station.png",hitboxType:'circle',linkEx:"Fast_Travel",showAsNonCollectable:true,type:"Stag Station",
			requirements:[{name:"Lumafly Lantern"},{name:"Mantis Claw"},{name:"Geo",quantity:250}], notes:null,
			addToOnClaimed:{name:'Stag Station',quantity:1} },

			"Stag Station (Dirtmouth)":{	x:201.5,y:63,size:50,pictureName:"Stag Station.png",hitboxType:'circle',linkEx:"Fast_Travel",showAsNonCollectable:true,type:"Stag Station",
			requirements:[{name:"Stag Station",quantity:1}], notes:"access from another stag station",
			addToOnClaimed:{name:'Stag Station',quantity:1} },

			"Stag Station (Forgotten Crossroads)":{	x:232.8,y:90.6,size:50,pictureName:"Stag Station.png",hitboxType:'circle',linkEx:"Fast_Travel",showAsNonCollectable:true,type:"Stag Station",
			requirements:[{name:"Geo",quantity:50}], notes:null,
			addToOnClaimed:{name:'Stag Station',quantity:1} },

			"Stag Station (Queen's Station)":{	x:146.3,y:145.6,size:50,pictureName:"Stag Station.png",hitboxType:'circle',linkEx:"Fast_Travel",showAsNonCollectable:true,type:"Stag Station",
			requirements:[{name:"Vengeful Spirit"},{name:"Geo",quantity:120}], notes:null,
			addToOnClaimed:{name:'Stag Station',quantity:1} },

			"Stag Station (Greenpath)":{	x:89.2,y:77,size:50,pictureName:"Stag Station.png",hitboxType:'circle',linkEx:"Fast_Travel",showAsNonCollectable:true,type:"Stag Station",
			requirements:[{name:"Vengeful Spirit"},{name:"Geo",quantity:140}], notes:null,
			addToOnClaimed:{name:'Stag Station',quantity:1} },

			"Stag Station (Stag Nest)":{	x:116,y:32,size:50,pictureName:"Stag Station.png",hitboxType:'circle',linkEx:"Fast_Travel",showAsNonCollectable:true,type:"Stag Station",
			requirements:[{name:"Stag Station",quantity:10}], notes:"access from another stag station",
			addToOnClaimed:{name:'Stag Station',quantity:1} },

			"Stag Station (Queen's Gardens)":{	x:83,y:136.7,size:50,pictureName:"Stag Station.png",hitboxType:'circle',linkEx:"Fast_Travel",showAsNonCollectable:true,type:"Stag Station",
			requirements:[queensGuardens,{name:"Geo",quantity:200}], notes:null,
			addToOnClaimed:{name:'Stag Station',quantity:1} },

			"Stag Station (Resting Grounds)":{	x:354.2,y:86.1,size:50,pictureName:"Stag Station.png",hitboxType:'circle',linkEx:"Fast_Travel",showAsNonCollectable:true,type:"Stag Station",
			requirements:[upperRestingGrounds], notes:null,
			addToOnClaimed:{name:'Stag Station',quantity:1} },

			"Stag Station (Hidden Station)":{	x:322.2,y:223.3,size:50,pictureName:"Stag Station.png",hitboxType:'circle',linkEx:"Fast_Travel",showAsNonCollectable:true,type:"Stag Station",
			requirements:[{name:"Monarch Wings"},{name:"Geo",quantity:300}], notes:null,
			addToOnClaimed:{name:'Stag Station',quantity:1} },

			//Toll Benches
			"Toll Bench (Greenpath)":{	x:108.9,y:85.6,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",showAsNonCollectable:true,
			requirements:[{name:"Vengeful Spirit"},{name:"Geo",quantity:50}], notes:null, },

			"Toll Bench (Ancient Basin)":{	x:262.9,y:225.6,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",showAsNonCollectable:true,
			requirements:[east,{name:"Geo",quantity:150}], notes:null, },

			"Toll Bench (City of Tears)":{	x:269,y:141,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",showAsNonCollectable:true,
			requirements:[westCity,{name:"Geo",quantity:150}], notes:null, },

			"Toll Bench (Queen's Gardens)":{	x:71.4,y:147.3,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",showAsNonCollectable:true,
			requirements:[queensGuardens,{name:"Geo",quantity:150}], notes:null, },

			//Cornifer maps
			"Cornifer (Forgotten Crossroads)":{	x:200,y:87.4,size:50,pictureName:"Cornifer card.png",hitboxType:'circle',linkEx:"Forgotten_Crossroads",type:"Map",
			requirements:[{name:"Geo",quantity:30}], notes:corniferNote,
			addToOnClaimed:{name:'Map',quantity:1} },

			"Cornifer (Greenpath)":{	x:162,y:89,size:50,pictureName:"Cornifer card.png",hitboxType:'circle',linkEx:"Greenpath",type:"Map",
			requirements:[{name:"Vengeful Spirit"},{name:"Geo",quantity:60}], notes:corniferNote,
			addToOnClaimed:{name:'Map',quantity:1} },

			"Cornifer (Fungal Wastes)":{	x:167,y:146,size:50,pictureName:"Cornifer card.png",hitboxType:'circle',linkEx:"Fungal_Wastes",type:"Map",
			requirements:[{name:"Mothwing Cloak"},{name:"Geo",quantity:75}], notes:corniferNote,
			addToOnClaimed:{name:'Map',quantity:1} },

			"Cornifer (Crystal Peak)":{	x:272,y:57.6,size:50,pictureName:"Cornifer card.png",hitboxType:'circle',linkEx:"Crystal_Peak",type:"Map",
			requirements:[{name:"-choose1-",choose1List:[{name:"Desolate Dive"},{name:"Lumafly Lantern"}]},{name:"Mantis Claw"},{name:"Geo",quantity:112}], notes:corniferNote,
			addToOnClaimed:{name:'Map',quantity:1} },

			"Cornifer (City of Tears)":{	x:270.5,y:141,size:50,pictureName:"Cornifer card.png",hitboxType:'circle',linkEx:"City_of_Tears",type:"Map",
			requirements:[westCity,{name:"Geo",quantity:90}], notes:corniferNote,
			addToOnClaimed:{name:'Map',quantity:1} },

			"Cornifer (Deepnest)":{	x:139,y:169.6,size:50,pictureName:"Cornifer card.png",hitboxType:'circle',linkEx:"Deepnest",type:"Map",
			requirements:[{name:"Mantis Claw"},{name:"Geo",quantity:38}], notes:corniferNote,
			addToOnClaimed:{name:'Map',quantity:1} },

			"Cornifer (Royal Waterways)":{	x:208,y:179,size:50,pictureName:"Cornifer card.png",hitboxType:'circle',linkEx:"Royal_Waterways",type:"Map",
			requirements:[royalWaterwaysStart,{name:"Geo",quantity:75}], notes:corniferNote,
			addToOnClaimed:{name:'Map',quantity:1} },

			"Cornifer (Fog Canyon)":{	x:154.6,y:113,size:50,pictureName:"Cornifer card.png",hitboxType:'circle',linkEx:"Fog_Canyon",type:"Map",
			requirements:[{name:"-choose1-",choose1List:[{name:"Isma's Tear"},{name:"Shade Cloak"}]},{name:"Monarch Wings"},{name:"Geo",quantity:150}], notes:corniferNote,
			addToOnClaimed:{name:'Map',quantity:1} },

			"Cornifer (Queen's Gardens)":{	x:119.3,y:132,size:50,pictureName:"Cornifer card.png",hitboxType:'circle',linkEx:"Queen%27s_Gardens",type:"Map",
			requirements:[queensGuardens,{name:"Geo",quantity:150}], notes:corniferNote,
			addToOnClaimed:{name:'Map',quantity:1} },

			"Cornifer (Ancient Basin)":{	x:280,y:216,size:50,pictureName:"Cornifer card.png",hitboxType:'circle',linkEx:"Ancient_Basin",type:"Map",
			requirements:[east,{name:"Geo",quantity:112}], notes:corniferNote,
			addToOnClaimed:{name:'Map',quantity:1} },

			"Cornifer (Kingdom's Edge)":{	x:369.5,y:176,size:50,pictureName:"Cornifer card.png",hitboxType:'circle',linkEx:"Kingdom%27s_Edge",type:"Map",
			requirements:[east,{name:"Geo",quantity:112}], notes:corniferNote,
			addToOnClaimed:{name:'Map',quantity:1} },

			"Cornifer (Howling Cliffs)":{	x:119,y:44.6,size:50,pictureName:"Cornifer card.png",hitboxType:'circle',linkEx:"Howling_Cliffs",type:"Map",
			requirements:[{name:"Mantis Claw"},{name:"Geo",quantity:75}], notes:corniferNote,
			addToOnClaimed:{name:'Map',quantity:1} },

			//Whispering Roots________________________________________________________________________
			"Whispering Root (Ancestral Mound)":{	x:205,y:80,size:40,pictureName:"Whispering Root.png",hitboxType:'circle',linkEx:"Whispering_Root",type:"Dream Essence",
			requirements:[{name:"Dream Nail"}], notes:"gives 42 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:42} },

			"Whispering Root (City of Tears)":{	x:247,y:136,size:40,pictureName:"Whispering Root.png",hitboxType:'circle',linkEx:"Whispering_Root",type:"Dream Essence",
			requirements:[westCity,{name:"Dream Nail"}], notes:"gives 28 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:28} },

			"Whispering Root (Crystal Peak)":{	x:319,y:43,size:40,pictureName:"Whispering Root.png",hitboxType:'circle',linkEx:"Whispering_Root",type:"Dream Essence",
			requirements:[{name:"-choose1-",choose1List:[{name:"Desolate Dive"},{name:"Lumafly Lantern"}]},{name:"Monarch Wings"},{name:"Dream Nail"}], notes:"gives 21 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:21} },

			"Whispering Root (Deepnest)":{	x:74,y:198,size:40,pictureName:"Whispering Root.png",hitboxType:'circle',linkEx:"Whispering_Root",type:"Dream Essence",
			requirements:[{name:"Lumafly Lantern"},{name:"Mantis Claw"},{name:"Dream Nail"}], notes:"gives 45 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:45} },

			"Whispering Root (outside Grubfather Room)":{	x:196,y:68,size:40,pictureName:"Whispering Root.png",hitboxType:'circle',linkEx:"Whispering_Root",type:"Dream Essence",
			requirements:[{name:"Dream Nail"}], notes:"gives 29 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:29} },

			"Whispering Root (Fungal Wastes: Near Fog Canyon)":{	x:192,y:118,size:40,pictureName:"Whispering Root.png",hitboxType:'circle',linkEx:"Whispering_Root",type:"Dream Essence",
			requirements:[{name:"-choose1-",choose1List:[{name:"Isma's Tear"},{name:"Shade Cloak"}]},{name:"Dream Nail"}], notes:"gives 20 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:20} },

			"Whispering Root (Near Mantis Village)":{	x:186,y:160,size:40,pictureName:"Whispering Root.png",hitboxType:'circle',linkEx:"Whispering_Root",type:"Dream Essence",
			requirements:[{name:"Mantis Claw"},{name:"Dream Nail"}], notes:"gives 18 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:18} },

			"Whispering Root (Greenpath)":{	x:91,y:107.5,size:40,pictureName:"Whispering Root.png",hitboxType:'circle',linkEx:"Whispering_Root",type:"Dream Essence",
			requirements:[queensGuardens,{name:"Dream Nail"}], notes:"gives 44 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:44} },

			"Whispering Root (The Hive)":{	x:389,y:208,size:40,pictureName:"Whispering Root.png",hitboxType:'circle',linkEx:"Whispering_Root",type:"Dream Essence",
			requirements:[{name:"Tram Pass"},{name:"Monarch Wings"},{name:"Dream Nail"}], notes:"gives 20 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:20} },

			"Whispering Root (Howling Cliffs)":{	x:108,y:55,size:40,pictureName:"Whispering Root.png",hitboxType:'circle',linkEx:"Whispering_Root",type:"Dream Essence",
			requirements:[{name:"Mantis Claw"},{name:"Dream Nail"}], notes:"gives 46 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:46} },

			"Whispering Root (Kingdom's Edge)":{	x:374,y:161,size:40,pictureName:"Whispering Root.png",hitboxType:'circle',linkEx:"Whispering_Root",type:"Dream Essence",
			requirements:[east,{name:"Dream Nail"}], notes:"gives 51 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:51} },

			"Whispering Root (Queen's Gardens)":{	x:117.6,y:146,size:40,pictureName:"Whispering Root.png",hitboxType:'circle',linkEx:"Whispering_Root",type:"Dream Essence",
			requirements:[queensGuardens,{name:"Dream Nail"}], notes:"gives 29 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:29} },

			"Whispering Root (Resting Grounds)":{	x:344,y:83.5,size:40,pictureName:"Whispering Root.png",hitboxType:'circle',linkEx:"Whispering_Root",type:"Dream Essence",
			requirements:[upperRestingGrounds,{name:"Dream Nail"}], notes:"gives 20 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:20} },

			"Whispering Root (Broken lift)":{	x:307,y:200,size:40,pictureName:"Whispering Root.png",hitboxType:'circle',linkEx:"Whispering_Root",type:"Dream Essence",
			requirements:[east,{name:"Dream Nail"}], notes:"gives 35 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:35} },

			"Whispering Root (Spirits' Glade)":{	x:371,y:71,size:40,pictureName:"Whispering Root.png",hitboxType:'circle',linkEx:"Whispering_Root",type:"Dream Essence",
			requirements:[{name:"Dream Nail"},{name:"Dream Essence",quantity:200}], notes:"gives 34 dream essence",
			addToOnClaimed:{name:'Dream Essence',quantity:34} },

			//grubs__________________________________________________________________________________
			"Grub (NE Forgotten Crossroads)":{	x:256.7,y:70.2,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[], notes:"guarded by a Husk Guard",//none
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (NW Forgotten Crossroads)":{	x:208,y:76,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Mothwing Cloak"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (East Forgotten Crossroads)":{	x:240,y:84,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[], notes:"behind a breakable wall",
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (SE Forgotten Crossroads)":{	x:245,y:90,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[], notes:"nail pogo on the spikes",//none
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (West Forgotten Crossroads)":{	x:173,y:92,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[], notes:null,//none?
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (North Greenpath)":{	x:103,y:69,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Vengeful Spirit"}], notes:"guarded by a moss knight",
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (South Greenpath)":{	x:108,y:106,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Mothwing Cloak"}], notes:"nail pogo on the Durandoos",
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (East Greenpath)":{	x:162.3,y:87,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Vengeful Spirit"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (SE Greenpath)":{	x:156,y:98,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Vengeful Spirit"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Central Fungal Wastes)":{	x:187.5,y:143,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Mothwing Cloak"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (West Fungal Wastes)":{	x:148,y:151.8,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Soul Sanctum)":{	x:251,y:130,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Desolate Dive"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (outside Soul Sanctum)":{	x:274,y:148,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[westCity], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (City of Tears Watcher's Tower)":{	x:300,y:144,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[east], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (City of Tears Living Quarters)":{	x:326.2,y:169.4,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[east], notes:"guarded by a Great Husk Sentry",
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (east of King's Station)":{	x:356.7,y:173,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[east], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (West Crystal Peak)":{	x:229,y:65,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Crystal Heart"}], notes:"behind a grub mimic",
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Crystal Peak center-top)":{	x:288.6,y:60,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"-choose1-",choose1List:[{name:"Desolate Dive"},{name:"Lumafly Lantern"}]},{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Crystal Peak center-left)":{	x:281,y:69,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"-choose1-",choose1List:[{name:"Desolate Dive"},{name:"Lumafly Lantern"}]},{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Crystal Peak center-right)":{	x:294,y:72.5,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"-choose1-",choose1List:[{name:"Desolate Dive"},{name:"Lumafly Lantern"}]},{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Crystal Heart room)":{	x:306,y:59.8,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Crystal Heart"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (NE Crystal Peak)":{	x:337,y:43,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"-choose1-",choose1List:[{name:"Desolate Dive"},{name:"Lumafly Lantern"}]},{name:"Monarch Wings"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Crystallised Mound)":{	x:330,y:73,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Lumafly Lantern"},{name:"Crystal Heart"},{name:"Desolate Dive"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Resting Grounds)":{	x:355,y:98,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Desolate Dive"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Royal Waterways near bench)":{	x:255,y:182.5,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[royalWaterwaysStart], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Royal Waterways Isma's room)":{	x:339,y:186,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Isma's Tear"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Royal Waterways passage to Kingdom's Edge)":{	x:338,y:178,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Tram Pass"},{name:"Monarch Wings"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Howling Cliffs)":{	x:131.5,y:58.3,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Central Kingdom's Edge)":{	x:398,y:171,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[east], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (SE Kingdom's Edge)":{	x:438,y:194,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[east, {name:"Desolate Dive"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Fog Canyon)":{	x:154,y:120.7,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"-choose1-",choose1List:[{name:"Isma's Tear"},{name:"Shade Cloak"}]},{name:"Crystal Heart"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (North Queen's Gardens)":{	x:85.4,y:101,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[queensGuardens], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (NW Queen's Gardens)":{	x:50,y:115,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[queensGuardens], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Central Queen's Gardens)":{	x:84,y:140,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[queensGuardens], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Central Deepnest)":{	x:128.2,y:189,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Crystal Heart"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (NE Deepnest)":{	x:159.5,y:162.6,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (West Deepnest)":{	x:83,y:196,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Lumafly Lantern"},{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (South Deepnest)":{	x:125,y:209,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Crystal Heart"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Beast's Den)":{	x:32,y:182,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Lumafly Lantern"},{name:"Mantis Claw"}], notes:"close to Herrah the Beast",
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (West Ancient Basin)":{	x:220.5,y:217,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Monarch Wings"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (East Ancient Basin)":{	x:255.8,y:214.7,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[east,{name:"Desolate Dive"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (West Hive)":{	x:356.4,y:191,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Tram Pass"},{name:"Desolate Dive"},{name:"Isma's Tear"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (East Hive)":{	x:392.2,y:191.2,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"Tram Pass"},{name:"Monarch Wings"}], notes:"interrupt Crystal Heart and wing to the hole in the ceiling",
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Tower of Love 1)":{	x:363,y:149,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"The Collector"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Tower of Love 2)":{	x:360,y:149,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"The Collector"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			"Grub (Tower of Love 3)":{	x:357,y:149,size:40,pictureName:"Grub.png",hitboxType:'circle',linkEx:"Grub",type:"Grub",
			requirements:[{name:"The Collector"}], notes:null,
			addToOnClaimed:{name:'Grub',quantity:1} },

			//Wanderer's Journals
			"Wanderer's Journal (Greenpath: North)":{	x:98,y:76,size:30,pictureName:"Wanderers Journal.png",hitboxType:'circle',linkEx:"Wanderer's_Journal",type:"Wanderer's Journal",
			requirements:[{name:"Vengeful Spirit"}], notes:null,
			addToOnClaimed:{name:"Wanderer's Journal",quantity:1} },

			"Wanderer's Journal (Greenpath: SE)":{	x:148,y:106,size:30,pictureName:"Wanderers Journal.png",hitboxType:'circle',linkEx:"Wanderer's_Journal",type:"Wanderer's Journal",
			requirements:[{name:"Vengeful Spirit"}], notes:null,
			addToOnClaimed:{name:"Wanderer's Journal",quantity:1} },

			"Wanderer's Journal (Fungal Wastes: North)":{	x:186,y:134,size:30,pictureName:"Wanderers Journal.png",hitboxType:'circle',linkEx:"Wanderer's_Journal",type:"Wanderer's Journal",
			requirements:[{name:"Mothwing Cloak"}], notes:null,
			addToOnClaimed:{name:"Wanderer's Journal",quantity:1} },

			"Wanderer's Journal (Fungal Wastes: South)":{	x:188,y:158,size:30,pictureName:"Wanderers Journal.png",hitboxType:'circle',linkEx:"Wanderer's_Journal",type:"Wanderer's Journal",
			requirements:[{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:"Wanderer's Journal",quantity:1} },

			"Wanderer's Journal (City of Tears: West)":{	x:231,y:129,size:30,pictureName:"Wanderers Journal.png",hitboxType:'circle',linkEx:"Wanderer's_Journal",type:"Wanderer's Journal",
			requirements:[westCity], notes:null,
			addToOnClaimed:{name:"Wanderer's Journal",quantity:1} },

			"Wanderer's Journal (Pleasure House Shaft)":{	x:323,y:155,size:30,pictureName:"Wanderers Journal.png",hitboxType:'circle',linkEx:"Wanderer's_Journal",type:"Wanderer's Journal",
			requirements:[{name:"Simple Lock (Pleasure House)"}], notes:null,
			addToOnClaimed:{name:"Wanderer's Journal",quantity:1} },

			"Wanderer's Journal (City of Tears: East)":{	x:342,y:158,size:30,pictureName:"Wanderers Journal.png",hitboxType:'circle',linkEx:"Wanderer's_Journal",type:"Wanderer's Journal",
			requirements:[east], notes:null,
			addToOnClaimed:{name:"Wanderer's Journal",quantity:1} },

			"Wanderer's Journal (Howling Cliffs)":{	x:116,y:52.7,size:30,pictureName:"Wanderers Journal.png",hitboxType:'circle',linkEx:"Wanderer's_Journal",type:"Wanderer's Journal",
			requirements:[{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:"Wanderer's Journal",quantity:1} },

			"Wanderer's Journal (Crystal Peak)":{	x:300,y:46,size:30,pictureName:"Wanderers Journal.png",hitboxType:'circle',linkEx:"Wanderer's_Journal",type:"Wanderer's Journal",
			requirements:[{name:"-choose1-",choose1List:[{name:"Desolate Dive"},{name:"Lumafly Lantern"}]},{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:"Wanderer's Journal",quantity:1} },

			"Wanderer's Journal (Resting Grounds)":{	x:373.8,y:100,size:30,pictureName:"Wanderers Journal.png",hitboxType:'circle',linkEx:"Wanderer's_Journal",type:"Wanderer's Journal",
			requirements:[{name:"Desolate Dive"}], notes:null,
			addToOnClaimed:{name:"Wanderer's Journal",quantity:1} },

			"Wanderer's Journal (Ancient Basin)":{	x:297,y:203,size:30,pictureName:"Wanderers Journal.png",hitboxType:'circle',linkEx:"Wanderer's_Journal",type:"Wanderer's Journal",
			requirements:[east], notes:null,
			addToOnClaimed:{name:"Wanderer's Journal",quantity:1} },

			"Wanderer's Journal (Kingdom's Edge: West)":{	x:367,y:165,size:30,pictureName:"Wanderers Journal.png",hitboxType:'circle',linkEx:"Wanderer's_Journal",type:"Wanderer's Journal",
			requirements:[east], notes:null,
			addToOnClaimed:{name:"Wanderer's Journal",quantity:1} },

			"Wanderer's Journal (Kingdom's Edge: North)":{	x:399,y:158,size:30,pictureName:"Wanderers Journal.png",hitboxType:'circle',linkEx:"Wanderer's_Journal",type:"Wanderer's Journal",
			requirements:[{name:"Monarch Wings"}], notes:null,
			addToOnClaimed:{name:"Wanderer's Journal",quantity:1} },

			"Wanderer's Journal (Kingdom's Edge: South)":{	x:396,y:176,size:30,pictureName:"Wanderers Journal.png",hitboxType:'circle',linkEx:"Wanderer's_Journal",type:"Wanderer's Journal",
			requirements:[east], notes:null,
			addToOnClaimed:{name:"Wanderer's Journal",quantity:1} },

			//Hallownest Seals
			"Hallownest Seal (Grubfather)":{	x:186,y:68,size:30,pictureName:"Hallownest Seal.png",hitboxType:'circle',linkEx:"Hallownest_Seal",type:"Hallownest Seal",
			requirements:[{name:"Grub",quantity:23}], notes:null,
			addToOnClaimed:{name:"Hallownest Seal",quantity:1} },

			"Hallownest Seal (Forgotten Crossroads)":{	x:208,y:66.5,size:30,pictureName:"Hallownest Seal.png",hitboxType:'circle',linkEx:"Hallownest_Seal",type:"Hallownest Seal",
			requirements:[{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:"Hallownest Seal",quantity:1} },

			"Hallownest Seal (Greenpath)":{	x:111.7,y:97.8,size:30,pictureName:"Hallownest Seal.png",hitboxType:'circle',linkEx:"Hallownest_Seal",type:"Hallownest Seal",
			requirements:[{name:"Crystal Heart"}], notes:null,
			addToOnClaimed:{name:"Hallownest Seal",quantity:1} },

			"Hallownest Seal (Queen's Station)":{	x:148.9,y:140.8,size:30,pictureName:"Hallownest Seal.png",hitboxType:'circle',linkEx:"Hallownest_Seal",type:"Hallownest Seal",
			requirements:[{name:"Monarch Wings"}], notes:null,
			addToOnClaimed:{name:"Hallownest Seal",quantity:1} },

			"Hallownest Seal (Fungal Wastes: near Queen's Station)":{	x:179,y:131,size:30,pictureName:"Hallownest Seal.png",hitboxType:'circle',linkEx:"Hallownest_Seal",type:"Hallownest Seal",
			requirements:[{name:"Mothwing Cloak"}], notes:null,
			addToOnClaimed:{name:"Hallownest Seal",quantity:1} },

			"Hallownest Seal (Mantis Village)":{	x:198.2,y:170.3,size:30,pictureName:"Hallownest Seal.png",hitboxType:'circle',linkEx:"Hallownest_Seal",type:"Hallownest Seal",
			requirements:[{name:"Mantis Lords"}], notes:null,
			addToOnClaimed:{name:"Hallownest Seal",quantity:1} },

			"Hallownest Seal (Fog Canyon: West)":{	x:129,y:113,size:30,pictureName:"Hallownest Seal.png",hitboxType:'circle',linkEx:"Hallownest_Seal",type:"Hallownest Seal",
			requirements:[{name:"Vengeful Spirit"}], notes:null,
			addToOnClaimed:{name:"Hallownest Seal",quantity:1} },

			"Hallownest Seal (Fog Canyon: East)":{	x:181,y:104,size:30,pictureName:"Hallownest Seal.png",hitboxType:'circle',linkEx:"Hallownest_Seal",type:"Hallownest Seal",
			requirements:[{name:"-choose1-",choose1List:[{name:"Isma's Tear"},{name:"Shade Cloak"}]}], notes:null,
			addToOnClaimed:{name:"Hallownest Seal",quantity:1} },

			"Hallownest Seal (Resting Grounds)":{	x:343.8,y:98.5,size:30,pictureName:"Hallownest Seal.png",hitboxType:'circle',linkEx:"Hallownest_Seal",type:"Hallownest Seal",
			requirements:[{name:"Desolate Dive"}], notes:null,
			addToOnClaimed:{name:"Hallownest Seal",quantity:1} },

			"Hallownest Seal (Seer)":{	x:342,y:77,size:30,pictureName:"Hallownest Seal.png",hitboxType:'circle',linkEx:"Hallownest_Seal",type:"Hallownest Seal",
			requirements:[{name:"Dream Essence",quantity:100}], notes:null,
			addToOnClaimed:{name:"Hallownest Seal",quantity:1} },

			"Hallownest Seal (Watcher's Tower)":{	x:296,y:135,size:30,pictureName:"Hallownest Seal.png",hitboxType:'circle',linkEx:"Hallownest_Seal",type:"Hallownest Seal",
			requirements:[{name:"Watcher Knights"}], notes:null,
			addToOnClaimed:{name:"Hallownest Seal",quantity:1} },

			"Hallownest Seal (Soul Sanctum)":{	x:254,y:130,size:30,pictureName:"Hallownest Seal.png",hitboxType:'circle',linkEx:"Hallownest_Seal",type:"Hallownest Seal",
			requirements:[{name:"Desolate Dive"}], notes:null,
			addToOnClaimed:{name:"Hallownest Seal",quantity:1} },

			"Hallownest Seal (City of Tears: West)":{	x:255,y:162,size:30,pictureName:"Hallownest Seal.png",hitboxType:'circle',linkEx:"Hallownest_Seal",type:"Hallownest Seal",
			requirements:[westCity], notes:null,
			addToOnClaimed:{name:"Hallownest Seal",quantity:1} },

			"Hallownest Seal (King's Station)":{	x:345,y:164,size:30,pictureName:"Hallownest Seal.png",hitboxType:'circle',linkEx:"Hallownest_Seal",type:"Hallownest Seal",
			requirements:[{name:"Monarch Wings"}], notes:"nail pogo off the spikes",
			addToOnClaimed:{name:"Hallownest Seal",quantity:1} },

			"Hallownest Seal (Deepnest)":{	x:157,y:174,size:30,pictureName:"Hallownest Seal.png",hitboxType:'circle',linkEx:"Hallownest_Seal",type:"Hallownest Seal",
			requirements:[{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:"Hallownest Seal",quantity:1} },

			"Hallownest Seal (Beast's Den)":{	x:28,y:190,size:30,pictureName:"Hallownest Seal.png",hitboxType:'circle',linkEx:"Hallownest_Seal",type:"Hallownest Seal",
			requirements:[{name:"Lumafly Lantern"},{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:"Hallownest Seal",quantity:1} },

			"Hallownest Seal (Queen's Gardens)":{	x:49,y:129,size:30,pictureName:"Hallownest Seal.png",hitboxType:'circle',linkEx:"Hallownest_Seal",type:"Hallownest Seal",
			requirements:[queensGuardens], notes:null,
			addToOnClaimed:{name:"Hallownest Seal",quantity:1} },

			//King's Idols
			"King's Idol (Grubfather)":{	x:192,y:68,size:40,pictureName:"Kings Idol.png",hitboxType:'rect',linkEx:"King's_Idol",type:"King's Idol",
			requirements:[{name:"Grub",quantity:38}], notes:null,
			addToOnClaimed:{name:"King's Idol",quantity:1} },

			"King's Idol (Crystal Peak)":{	x:272,y:55.2,size:40,pictureName:"Kings Idol.png",hitboxType:'rect',linkEx:"King's_Idol",type:"King's Idol",
			requirements:[{name:"-choose1-",choose1List:[{name:"Desolate Dive"},{name:"Lumafly Lantern"}]},{name:"Monarch Wings"}], notes:null,
			addToOnClaimed:{name:"King's Idol",quantity:1} },

			"King's Idol (Resting Grounds)":{	x:372,y:78,size:40,pictureName:"Kings Idol.png",hitboxType:'rect',linkEx:"King's_Idol",type:"King's Idol",
			requirements:[{name:"Dream Essence",quantity:200}], notes:null,
			addToOnClaimed:{name:"King's Idol",quantity:1} },

			"King's Idol (Royal Waterways)":{	x:299.3,y:184.9,size:40,pictureName:"Kings Idol.png",hitboxType:'rect',linkEx:"King's_Idol",type:"King's Idol",
			requirements:[{name:"Dung Defender"},{name:"Desolate Dive"}], notes:null,
			addToOnClaimed:{name:"King's Idol",quantity:1} },

			"King's Idol (Howling Cliffs)":{	x:101.5,y:57.5,size:40,pictureName:"Kings Idol.png",hitboxType:'rect',linkEx:"King's_Idol",type:"King's Idol",
			requirements:[{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:"King's Idol",quantity:1} },

			"King's Idol (Kingdom's Edge: outside colosseum)":{	x:356,y:134,size:40,pictureName:"Kings Idol.png",hitboxType:'rect',linkEx:"King's_Idol",type:"King's Idol",
			requirements:[east], notes:null,
			addToOnClaimed:{name:"King's Idol",quantity:1} },

			"King's Idol (Kingdom's Edge: behind colosseum)":{	x:420,y:135,size:40,pictureName:"Kings Idol.png",hitboxType:'rect',linkEx:"King's_Idol",type:"King's Idol",
			requirements:[east], notes:null,
			addToOnClaimed:{name:"King's Idol",quantity:1} },

			"King's Idol (Deepnest)":{	x:126,y:184,size:40,pictureName:"Kings Idol.png",hitboxType:'rect',linkEx:"King's_Idol",type:"King's Idol",
			requirements:[{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:"King's Idol",quantity:1} },

			//Arcane Eggs
			"Arcane Egg (Abyss: Birthplace)":{	x:263,y:284,size:40,pictureName:"Arcane Egg.png",hitboxType:'circle',linkEx:"Arcane_Egg",type:"Arcane Egg",
			requirements:[{name:"King's Brand"},{name:"Kingsoul (Left)"},{name:"Kingsoul (Right)"}], notes:null,
			addToOnClaimed:{name:"Arcane Egg",quantity:1} },

			"Arcane Egg (Abyss: near Shade Cloak)":{	x:357,y:276,size:40,pictureName:"Arcane Egg.png",hitboxType:'circle',linkEx:"Arcane_Egg",type:"Arcane Egg",
			requirements:[{name:"King's Brand"}], notes:null,
			addToOnClaimed:{name:"Arcane Egg",quantity:1} },

			"Arcane Egg (Abyss: Lifeblood Core room)":{	x:254.4,y:267.1,size:40,pictureName:"Arcane Egg.png",hitboxType:'circle',linkEx:"Arcane_Egg",type:"Arcane Egg",
			requirements:[{name:"King's Brand"}], notes:"must get before Lifeblood Core or not at all",//////////////lifeblood reqs
			addToOnClaimed:{name:"Arcane Egg",quantity:1} },

			"Arcane Egg (Seer)":{	x:344,y:74,size:40,pictureName:"Arcane Egg.png",hitboxType:'circle',linkEx:"Arcane_Egg",type:"Arcane Egg",
			requirements:[{name:"Dream Essence",quantity:1200}], notes:null,
			addToOnClaimed:{name:"Arcane Egg",quantity:1} },

			//Rancid Eggs
			"Rancid Egg (Crystal Peak North)":{	x:297,y:48.8,size:30,pictureName:"Rancid Egg.png",hitboxType:'circle',linkEx:"Rancid_Egg",type:"Rancid Egg",
			requirements:[{name:"-choose1-",choose1List:[{name:"Desolate Dive"},{name:"Lumafly Lantern"}]},{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:"Rancid Egg",quantity:1} },

			"Rancid Egg (Crystal Peak entrence)":{	x:265,y:75,size:30,pictureName:"Rancid Egg.png",hitboxType:'circle',linkEx:"Rancid_Egg",type:"Rancid Egg",
			requirements:[{name:"Desolate Dive"}], notes:null,
			addToOnClaimed:{name:"Rancid Egg",quantity:1} },

			"Rancid Egg (Crystal Peak center)":{	x:286,y:78,size:30,pictureName:"Rancid Egg.png",hitboxType:'circle',linkEx:"Rancid_Egg",type:"Rancid Egg",
			requirements:[{name:"-choose1-",choose1List:[{name:"Desolate Dive"},{name:"Lumafly Lantern"}]}], notes:null,
			addToOnClaimed:{name:"Rancid Egg",quantity:1} },

			"Rancid Egg (Blue Lake)":{	x:288.3,y:97.8,size:30,pictureName:"Rancid Egg.png",hitboxType:'circle',linkEx:"Rancid_Egg",type:"Rancid Egg",
			requirements:[{name:"Crystal Heart"}], notes:null,
			addToOnClaimed:{name:"Rancid Egg",quantity:1} },

			"Rancid Egg (Kingdom's Edge North)":{	x:374.8,y:137.5,size:30,pictureName:"Rancid Egg.png",hitboxType:'circle',linkEx:"Rancid_Egg",type:"Rancid Egg",
			requirements:[east], notes:null,
			addToOnClaimed:{name:"Rancid Egg",quantity:1} },

			"Rancid Egg (Kingdom's Edge SE)":{	x:427,y:193,size:30,pictureName:"Rancid Egg.png",hitboxType:'circle',linkEx:"Rancid_Egg",type:"Rancid Egg",
			requirements:[east,{name:"Desolate Dive"}], notes:null,
			addToOnClaimed:{name:"Rancid Egg",quantity:1} },

			"Rancid Egg (Pleasure House tunnel)":{	x:321.6,y:145.4,size:30,pictureName:"Rancid Egg.png",hitboxType:'circle',linkEx:"Rancid_Egg",type:"Rancid Egg",
			requirements:[{name:"Simple Lock (Pleasure House)"}], notes:null,
			addToOnClaimed:{name:"Rancid Egg",quantity:1} },

			"Rancid Egg (Royal Waterways West)":{	x:220.6,y:177,size:30,pictureName:"Rancid Egg.png",hitboxType:'circle',linkEx:"Rancid_Egg",type:"Rancid Egg",
			requirements:[royalWaterwaysStart], notes:null,
			addToOnClaimed:{name:"Rancid Egg",quantity:1} },

			"Rancid Egg (Royal Waterways center-west)":{	x:239.5,y:180.4,size:30,pictureName:"Rancid Egg.png",hitboxType:'circle',linkEx:"Rancid_Egg",type:"Rancid Egg",
			requirements:[royalWaterwaysStart], notes:null,
			addToOnClaimed:{name:"Rancid Egg",quantity:1} },

			"Rancid Egg (Royal Waterways center)":{	x:266.7,y:186.1,size:30,pictureName:"Rancid Egg.png",hitboxType:'circle',linkEx:"Rancid_Egg",type:"Rancid Egg",
			requirements:[royalWaterwaysStart], notes:null,
			addToOnClaimed:{name:"Rancid Egg",quantity:1} },

			"Rancid Egg (Royal Waterways East)":{	x:315.3,y:194.4,size:30,pictureName:"Rancid Egg.png",hitboxType:'circle',linkEx:"Rancid_Egg",type:"Rancid Egg",
			requirements:[{name:"Crystal Heart"}], notes:null,
			addToOnClaimed:{name:"Rancid Egg",quantity:1} },

			"Rancid Egg (Fungal Wastes)":{	x:172.1,y:157,size:30,pictureName:"Rancid Egg.png",hitboxType:'circle',linkEx:"Rancid_Egg",type:"Rancid Egg",
			requirements:[{name:"Monarch Wings"}], notes:null,
			addToOnClaimed:{name:"Rancid Egg",quantity:1} },

			"Rancid Egg (Deepnest big room east)":{	x:97,y:195.7,size:30,pictureName:"Rancid Egg.png",hitboxType:'circle',linkEx:"Rancid_Egg",type:"Rancid Egg",
			requirements:[{name:"Lumafly Lantern"},{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:"Rancid Egg",quantity:1} },

			"Rancid Egg (Deepnest big room west)":{	x:72.9,y:199,size:30,pictureName:"Rancid Egg.png",hitboxType:'circle',linkEx:"Rancid_Egg",type:"Rancid Egg",
			requirements:[{name:"Lumafly Lantern"},{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:"Rancid Egg",quantity:1} },

			"Rancid Egg (Beast's Den)":{	x:36.3,y:185,size:30,pictureName:"Rancid Egg.png",hitboxType:'circle',linkEx:"Rancid_Egg",type:"Rancid Egg",
			requirements:[{name:"Lumafly Lantern"},{name:"Mantis Claw"}], notes:null,
			addToOnClaimed:{name:"Rancid Egg",quantity:1} },

			"Rancid Egg (Queen's Garden)":{	x:109.8,y:127.6,size:30,pictureName:"Rancid Egg.png",hitboxType:'circle',linkEx:"Rancid_Egg",type:"Rancid Egg",
			requirements:[queensGuardens], notes:null,
			addToOnClaimed:{name:"Rancid Egg",quantity:1} },

			"Rancid Egg (Greenpath)":{	x:43.3,y:98.4,size:30,pictureName:"Rancid Egg.png",hitboxType:'circle',linkEx:"Rancid_Egg",type:"Rancid Egg",
			requirements:[{name:"Crystal Heart"}], notes:null,
			addToOnClaimed:{name:"Rancid Egg",quantity:1} },

			"Rancid Egg (City of Tears center)":{	x:270.4,y:156.7,size:30,pictureName:"Rancid Egg.png",hitboxType:'circle',linkEx:"Rancid_Egg",type:"Rancid Egg",
			requirements:[westCity], notes:null,
			addToOnClaimed:{name:"Rancid Egg",quantity:1} },

			//one time geo caches_____________________________________________________________
			"Large Geo Catch":{	x:437.2,y:197.1,size:40,pictureName:"Large Geo Catch.png",hitboxType:'circle',linkEx:"Kingdom%27s_Edge#Points%20of%20Interest",type:"Geo",
			requirements:[east, {name:"Desolate Dive"}], notes:"behind a breakable wall. At the bottom of a cave requiring multiple Desolate Dives. Gives 420 geo",
			addToOnClaimed:{name:"Geo",quantity:420} },

			"Gorgeous Husk":{	x:319,y:167.4,size:40,pictureName:"Gorgeous Husk.png",hitboxType:'circle',linkEx:"Gorgeous_Husk",type:"Geo",
			requirements:[east], notes:"Inside. Past a secret alcove in the right wall. Gives 420 geo",
			addToOnClaimed:{name:"Geo",quantity:420} },

			"Geo Chest (False Knight)":{	x:210.6,y:84.6,size:40,pictureName:"Geo Chest.png",hitboxType:'rect',linkEx:"Geo",type:"Geo",
			requirements:[{name:"False Knight"}], notes:"Gives 200 geo",
			addToOnClaimed:{name:"Geo",quantity:200} },

			"Geo Chest (Mantis Lords)":{	x:199,y:171,size:40,pictureName:"Geo Chest.png",hitboxType:'rect',linkEx:"Geo",type:"Geo",
			requirements:[{name:"Mantis Lords"}], notes:"Gives 620 geo",
			addToOnClaimed:{name:"Geo",quantity:620} },

			"Geo Chest (Soul Master)":{	x:252,y:120,size:40,pictureName:"Geo Chest.png",hitboxType:'rect',linkEx:"Geo",type:"Geo",
			requirements:[{name:"Soul Master"}], notes:"Gives 380 geo",
			addToOnClaimed:{name:"Geo",quantity:380} },

			"Geo Chest (Watcher Knights)":{	x:295,y:130,size:40,pictureName:"Geo Chest.png",hitboxType:'rect',linkEx:"Geo",type:"Geo",
			requirements:[{name:"Watcher Knights"}], notes:"Gives 650 geo",
			addToOnClaimed:{name:"Geo",quantity:650} },

			//Grimm monsters____________________________________________________________________
			"Grimmkin Novice (Greenpath)":{	x:125,y:97,size:50,pictureName:"Grimm Flame.png",hitboxType:'circle',linkEx:"Grimmkin_Novice",
			requirements:[{name:"Grimmchild"}], notes:"Grimmchild must be equipped"},

			"Grimmkin Novice (Crystal Peak)":{	x:239,y:57,size:50,pictureName:"Grimm Flame.png",hitboxType:'circle',linkEx:"Grimmkin_Novice",
			requirements:[{name:"Grimmchild"}], notes:"Grimmchild must be equipped"},

			"Grimmkin Novice (City of Tears)":{	x:232,y:127,size:50,pictureName:"Grimm Flame.png",hitboxType:'circle',linkEx:"Grimmkin_Novice",
			requirements:[westCity,{name:"Grimmchild"}], notes:"Grimmchild must be equipped"},

			"Grimmkin Master (King's Pass)":{	x:163,y:61,size:50,pictureName:"Grimm Flame.png",hitboxType:'circle',linkEx:"Grimmkin_Master",
			requirements:[{name:"Grimmkin Novice (Greenpath)"},{name:"Grimmkin Novice (Crystal Peak)"},{name:"Grimmkin Novice (City of Tears)"}], notes:"Grimmchild must be equipped"},

			"Grimmkin Master (Resting Grounds)":{	x:319,y:98,size:50,pictureName:"Grimm Flame.png",hitboxType:'circle',linkEx:"Grimmkin_Master",
			requirements:[east,{name:"Grimmkin Novice (Greenpath)"},{name:"Grimmkin Novice (Crystal Peak)"},{name:"Grimmkin Novice (City of Tears)"}], notes:"Grimmchild must be equipped"},

			"Grimmkin Master (Kingdom's Edge)":{	x:374,y:180,size:50,pictureName:"Grimm Flame.png",hitboxType:'circle',linkEx:"Grimmkin_Master",
			requirements:[east,{name:"Grimmkin Novice (Greenpath)"},{name:"Grimmkin Novice (Crystal Peak)"},{name:"Grimmkin Novice (City of Tears)"}], notes:"Grimmchild must be equipped"},

			"Grimmkin Nightmare (Fungal Core)":{	x:173,y:175,size:50,pictureName:"Grimm Flame.png",hitboxType:'circle',linkEx:"Grimmkin_Nightmare",
			requirements:[{name:"Monarch Wings"},{name:"Grimmkin Master (King's Pass)"},{name:"Grimmkin Master (Resting Grounds)"},{name:"Grimmkin Master (Kingdom's Edge)"}], notes:"Grimmchild must be equipped"},

			"Grimmkin Nightmare (Ancient Basin)":{	x:291.5,y:202,size:50,pictureName:"Grimm Flame.png",hitboxType:'circle',linkEx:"Grimmkin_Nightmare",
			requirements:[east,{name:"Grimmkin Master (King's Pass)"},{name:"Grimmkin Master (Resting Grounds)"},{name:"Grimmkin Master (Kingdom's Edge)"}], notes:"Grimmchild must be equipped"},

			"Grimmkin Nightmare (Hive)":{	x:367,y:197,size:50,pictureName:"Grimm Flame.png",hitboxType:'circle',linkEx:"Grimmkin_Nightmare",
			requirements:[{name:"Tram Pass"},{name:"Monarch Wings"},{name:"Grimmkin Master (King's Pass)"},{name:"Grimmkin Master (Resting Grounds)"},{name:"Grimmkin Master (Kingdom's Edge)"}], notes:"Grimmchild must be equipped"},

			//shorcuts
			"Shortcut (Ancestral Mound)":{	x:202,y:87.4,size:30,pictureName:"Arrow Left.png",hitboxType:'rect',type:"Shortcut",
			requirements:[], notes:null},

			"Shortcut (Brooding Mawlek)":{	x:194.8,y:87.5,size:30,pictureName:"Arrow Right.png",hitboxType:'rect',type:"Shortcut",
			requirements:[{name:"Mantis Claw"}], notes:null},

			"Shortcut (East Forgotten Crossroads)":{	x:240.5,y:79,size:30,pictureName:"Arrow Up.png",hitboxType:'rect',type:"Shortcut",
			requirements:[], notes:null},

			"Shortcut (Crystal Peak Top)":{	x:296.2,y:52.5,size:30,pictureName:"Arrow Down.png",hitboxType:'rect',type:"Shortcut",
			requirements:[{name:"-choose1-",choose1List:[{name:"Desolate Dive"},{name:"Lumafly Lantern"}]},{name:"Mantis Claw"}], notes:null},

			"Shortcut (Crystal Peak Center)":{	x:298.6,y:61.6,size:30,pictureName:"Arrow Left.png",hitboxType:'rect',type:"Shortcut",
			requirements:[{name:"-choose1-",choose1List:[{name:"Desolate Dive"},{name:"Lumafly Lantern"}]},{name:"Mantis Claw"}], notes:null},

			"Shortcut (Crystal Peak Bottom)":{	x:295.7,y:72.3,size:30,pictureName:"Arrow Left.png",hitboxType:'rect',type:"Shortcut",
			requirements:[{name:"-choose1-",choose1List:[{name:"Desolate Dive"},{name:"Lumafly Lantern"}]},{name:"Mantis Claw"}], notes:null},

			"Shortcut (Resting Grounds Floor)":{	x:316,y:96.5,size:30,pictureName:"Arrow Up.png",hitboxType:'rect',type:"Shortcut",
			requirements:[east], notes:null},

			"Shortcut (Resting Grounds South)":{	x:336.4,y:99,size:30,pictureName:"Arrow Left.png",hitboxType:'rect',type:"Shortcut",
			requirements:[{name:"Desolate Dive"}], notes:null},

			"Shortcut (Colosseum)":{	x:346.3,y:127.7,size:30,pictureName:"Arrow Left.png",hitboxType:'rect',type:"Shortcut",
			requirements:[east], notes:null},

			"Shortcut (Kingdom's Edge East)":{	x:411.4,y:185.8,size:30,pictureName:"Arrow Left.png",hitboxType:'rect',type:"Shortcut",
			requirements:[east,{name:"Desolate Dive"}], notes:null},

			"Shortcut (Hive Central)":{	x:372,y:197,size:30,pictureName:"Arrow Left.png",hitboxType:'rect',type:"Shortcut",
			requirements:[{name:"Tram Pass"},{name:"Monarch Wings"}], notes:null},

			"Shortcut (Hive Exit)":{	x:351.8,y:196.1,size:30,pictureName:"Arrow Left.png",hitboxType:'rect',type:"Shortcut",
			requirements:[{name:"Tram Pass"},{name:"Monarch Wings"}], notes:null},

			"Shortcut (Kingdom's Edge SW)":{	x:366.6,y:184.6,size:30,pictureName:"Arrow Right.png",hitboxType:'rect',type:"Shortcut",
			requirements:[{name:"Tram Pass"},{name:"Monarch Wings"}], notes:null},

			"Shortcut (Royal Waterways East)":{	x:307.7,y:182.8,size:30,pictureName:"Arrow Down.png",hitboxType:'rect',type:"Shortcut",
			requirements:[{name:"Tram Pass"},{name:"Crystal Heart"}], notes:null},

			"Shortcut (Royal Waterways East to City)":{	x:320,y:182.8,size:30,pictureName:"Arrow Up.png",hitboxType:'rect',type:"Shortcut",
			requirements:[royalWaterwaysStart,{name:"Crystal Heart"}], notes:null},

			"Shortcut (Dung Defender)":{	x:301,y:180.7,size:30,pictureName:"Arrow Right.png",hitboxType:'rect',type:"Shortcut",
			requirements:[{name:"Dung Defender"}], notes:null},

			"Shortcut (Junk Pit to West City)":{	x:223.7,y:189.7,size:30,pictureName:"Arrow Up.png",hitboxType:'rect',type:"Shortcut",
			requirements:[royalWaterwaysStart,{name:"Desolate Dive"}], notes:null},

			"Shortcut (Broken Vessel)":{	x:223.6,y:225.2,size:30,pictureName:"Arrow Right.png",hitboxType:'rect',type:"Shortcut",
			requirements:[{name:"Crystal Heart"}], notes:null},

			// "Shortcut (Sharp Shadow)":{	x:000,y:000,size:30,pictureName:"Arrow Left.png",hitboxType:'rect',type:"Shortcut",
			// requirements:[], notes:null},

			"Shortcut (Queen's Guarden to Deepnest)":{	x:75.8,y:168.6,size:30,pictureName:"Arrow Down.png",hitboxType:'rect',type:"Shortcut",
			requirements:[queensGuardens], notes:null},

			"Shortcut (Queen's Guarden Stag Station)":{	x:80,y:136.4,size:30,pictureName:"Arrow Right.png",hitboxType:'rect',type:"Shortcut",
			requirements:[queensGuardens], notes:null},

			"Shortcut (Queen's Guarden to Greenpath)":{	x:95,y:107.3,size:30,pictureName:"Arrow Right.png",hitboxType:'rect',type:"Shortcut",
			requirements:[queensGuardens], notes:null},

			"Shortcut (Queen's Guarden to Fog Canyon)":{	x:117.8,y:122.6,size:30,pictureName:"Arrow Left.png",hitboxType:'rect',type:"Shortcut",
			requirements:[queensGuardens], notes:null},

			"Shortcut (Queen's Guardens to Fungal Wastes)":{	x:127,y:153,size:30,pictureName:"Arrow Right.png",hitboxType:'rect',type:"Shortcut",
			requirements:[queensGuardens], notes:null},

			"Shortcut (Greenpath West)":{	x:98.6,y:94.2,size:30,pictureName:"Arrow Down.png",hitboxType:'rect',type:"Shortcut",
			requirements:[{name:"Vengeful Spirit"}], notes:null},

			"Shortcut (Greenpath North)":{	x:104,y:72,size:30,pictureName:"Arrow Right.png",hitboxType:'rect',type:"Shortcut",
			requirements:[{name:"Vengeful Spirit"}], notes:null},

			"Shortcut (Teacher's Archive)":{	x:152.8,y:123,size:30,pictureName:"Arrow Left.png",hitboxType:'rect',type:"Shortcut",
			requirements:[{name:"-choose1-",choose1List:[{name:"Isma's Tear"},{name:"Shade Cloak"}]}], notes:null},

			"Shortcut (Fungal Wastes Shroomal Ogres)":{	x:186.5,y:129.2,size:30,pictureName:"Arrow Down.png",hitboxType:'rect',type:"Shortcut",
			requirements:[{name:"Mothwing Cloak"}], notes:null},

			"Shortcut (North of Mantis Village)":{	x:179,y:151,size:30,pictureName:"Arrow Left.png",hitboxType:'rect',type:"Shortcut",
			requirements:[{name:"Mothwing Cloak"}], notes:null},

			"Shortcut (Mantis Lords)":{	x:181.4,y:185.3,size:30,pictureName:"Arrow Left.png",hitboxType:'rect',type:"Shortcut",
			requirements:[{name:"Mantis Lords"}], notes:null},

			"Shortcut (Royal Waterways to Fungal Wastes)":{	x:205.3,y:181.5,size:30,pictureName:"Arrow Left.png",hitboxType:'rect',type:"Shortcut",
			requirements:[royalWaterwaysStart], notes:null},

			"Shortcut (City Storage Room)":{	x:235.2,y:141.7,size:30,pictureName:"Arrow Down.png",hitboxType:'rect',type:"Shortcut",
			requirements:[westCity], notes:null},

			"Shortcut (Relic Seeker Lemm)":{	x:267.6,y:166.2,size:30,pictureName:"Arrow Down.png",hitboxType:'rect',type:"Shortcut",
			requirements:[westCity], notes:null},

			"Shortcut (Watcher's Tower Bottom)":{	x:289,y:171,size:30,pictureName:"Arrow Left.png",hitboxType:'rect',type:"Shortcut",
			requirements:[east], notes:null},

			"Shortcut (Watcher's Tower Middle)":{	x:281,y:152.5,size:30,pictureName:"Arrow Left.png",hitboxType:'rect',type:"Shortcut",
			requirements:[east], notes:null},

			"Shortcut (Pleasure House)":{	x:331.2,y:136.6,size:30,pictureName:"Arrow Right.png",hitboxType:'rect',type:"Shortcut",
			requirements:[{name:"Simple Lock (Pleasure House)"}], notes:null},

			"Shortcut (Deepnest North)":{	x:137.8,y:179.7,size:30,pictureName:"Arrow Right.png",hitboxType:'rect',type:"Shortcut",
			requirements:[{name:"Mantis Claw"}], notes:null},

			//Mr Mushroom___________________________________________________
			"Mr. Mushroom 1":{	x:165,y:146,size:40,pictureName:"Mister Mushroom.png",hitboxType:'rect',type:"Mister Mushroom",
			requirements:[{name:"Spore Shroom"}], notes:"Spore Shroom must be equipped"},

			"Mr. Mushroom 2":{	x:344.5,y:196.6,size:40,pictureName:"Mister Mushroom.png",hitboxType:'rect',type:"Mister Mushroom",
			requirements:[{name:"Mr. Mushroom 1"},{name:"Tram Pass"}], notes:"Spore Shroom must be equipped"},

			"Mr. Mushroom 3":{	x:93,y:185,size:40,pictureName:"Mister Mushroom.png",hitboxType:'rect',type:"Mister Mushroom",
			requirements:[{name:"Mr. Mushroom 2"},{name:"Lumafly Lantern"}], notes:"Spore Shroom must be equipped"},

			"Mr. Mushroom 4":{	x:142.7,y:39.4,size:40,pictureName:"Mister Mushroom.png",hitboxType:'rect',type:"Mister Mushroom",
			requirements:[{name:"Mr. Mushroom 3"}], notes:"Spore Shroom must be equipped. In the house"},

			"Mr. Mushroom 5":{	x:200,y:225,size:40,pictureName:"Mister Mushroom.png",hitboxType:'rect',type:"Mister Mushroom",
			requirements:[{name:"Mr. Mushroom 4"},{name:"Crystal Heart"}], notes:"Spore Shroom must be equipped"},

			"Mr. Mushroom 6":{	x:109.7,y:124.1,size:40,pictureName:"Mister Mushroom.png",hitboxType:'rect',type:"Mister Mushroom",
			requirements:[{name:"Mr. Mushroom 5"},queensGuardens], notes:"Spore Shroom must be equipped"},

			"Mr. Mushroom 7":{	x:154.5,y:65,size:40,pictureName:"Mister Mushroom.png",hitboxType:'rect',type:"Mister Mushroom",
			requirements:[{name:"Mr. Mushroom 6"}], notes:"Spore Shroom must be equipped"},












			//non collectables_____________________________________________________________________
			//!!!! put at the end to make saving work

			//regular benches (non-toll)
			"Bench (Nailmaster Mato)":{	x:140.5,y:38.5,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Mantis Claw"}], notes:null, },

			"Bench (Dirtmouth)":{	x:197.1,y:62.8,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[], notes:null, },

			"Bench (Crystal Peak North)":{	x:286,y:52.7,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Crystal Guardian"}], notes:null, },

			"Bench (Crystal Peak South)":{	x:290.5,y:85.8,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[upperRestingGrounds], notes:null, },

			"Bench (Ancestral Mound)":{	x:205,y:84,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"False Knight"}], notes:null, },

			"Bench (Forgotten Crossroads Hot Spring)":{	x:215.6,y:91.7,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[], notes:null, },

			"Bench (Salubra)":{	x:268.7,y:101.7,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Mothwing Cloak"}], notes:null, },

			"Bench (Grey Mourner)":{	x:368.8,y:95,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Desolate Dive"}], notes:null, },

			"Bench (Lake of Unn)":{	x:58.4,y:76.8,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Mothwing Cloak"}], notes:null, },

			"Bench (Nailmaster Sheo)":{	x:47.6,y:95,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Crystal Heart"}], notes:null, },

			"Bench (Greenpath Entrence)":{	x:144,y:74,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Vengeful Spirit"}], notes:null, },

			"Bench (Greenpath SE)":{	x:155.8,y:100.6,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Vengeful Spirit"}], notes:null, },

			"Bench (Teacher's Archive)":{	x:160,y:122.5,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"-choose1-",choose1List:[{name:"Isma's Tear"},{name:"Shade Cloak"}]}], notes:null, },

			"Bench (Leg Eater)":{	x:209.4,y:119.1,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Mothwing Cloak"}], notes:null, },

			"Bench (Queen's Garden East)":{	x:113.5,y:133,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[queensGuardens], notes:null, },

			// "Bench (Distant Village)":{	x:000,y:000,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			// requirements:[], notes:null, },

			"Bench (Deepnest Failed Tram)":{	x:133,y:172.2,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Mantis Claw"}], notes:null, },

			"Bench (Deepnest Hot Spring)":{	x:144,y:207.2,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Mantis Claw"}], notes:null, },

			"Bench (Mantis Village Treasury)":{	x:200,y:172.5,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Mantis Lords"}], notes:null, },

			"Bench (East of Mantis Village)":{	x:211.3,y:174.8,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Mothwing Cloak"}], notes:null, },

			"Bench (City of Tears West)":{	x:248.5,y:158,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[westCity], notes:null, },

			"Bench (Watcher's Tower)":{	x:290,y:155,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[east], notes:null, },

			"Bench (Pleasure House)":{	x:329.6,y:136.5,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Simple Lock (Pleasure House)"}], notes:null, },

			"Bench (Colosseum)":{	x:375.8,y:130,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[east], notes:null, },

			"Bench (Kingdom's Edge East)":{	x:403.2,y:158,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Monarch Wings"}], notes:null, },

			"Bench (Nailmaster Oro)":{	x:429,y:184,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[east], notes:null, },

			"Bench (Hive)":{	x:360,y:211,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Tram Pass"},{name:"Monarch Wings"}], notes:null, },

			"Bench (Royal Waterways Central)":{	x:259,y:185.4,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[royalWaterwaysStart,{name:"Desolate Dive"}], notes:null, },

			"Bench (Forgotten Crossroads Stag Station)":{	x:236.5,y:90.7,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[], notes:null, },

			"Bench (Queen's Garden Stag Station)":{	x:88,y:136.7,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[queensGuardens], notes:null, },

			"Bench (Greenpath Stag Station)":{	x:92.4,y:77,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Vengeful Spirit"}], notes:null, },

			"Bench (King's Station)":{	x:346.3,y:167,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[east], notes:null, },

			"Bench (Resting Grounds Stag Station)":{	x:350.5,y:85.8,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[upperRestingGrounds], notes:null, },

			"Bench (City of Tears Storage Room Stag Station)":{	x:243.7,y:126.4,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[westCity], notes:null, },

			"Bench (Ancient Basin Stag Station)":{	x:318.7,y:223.2,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Monarch Wings"}], notes:null, },

			"Bench (Queen's Station)":{	x:150,y:145.6,size:50,pictureName:"Bench.png",hitboxType:'circle',linkEx:"Bench_(Hollow_Knight)",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Vengeful Spirit"}], notes:null, },

			//Lifeblood Cocoons__________________________________________________________________
			"Lifeblood Cocoon (King's Pass)":{	x:159,y:58.2,size:40,pictureName:"Lifeblood Cocoon.png",hitboxType:'circle',linkEx:"Lifeblood_Cocoon",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[], notes:"gives 2 lifeseeds", },

			"Lifeblood Cocoon (Ancestral Mound)":{	x:202.8,y:80,size:40,pictureName:"Lifeblood Cocoon.png",hitboxType:'circle',linkEx:"Lifeblood_Cocoon",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"False Knight"}], notes:"gives 2 lifeseeds", },

			"Lifeblood Cocoon (Greenpath)":{	x:109.4,y:69.1,size:40,pictureName:"Lifeblood Cocoon.png",hitboxType:'circle',linkEx:"Lifeblood_Cocoon",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Vengeful Spirit"}], notes:"gives 2 lifeseeds", },

			"Lifeblood Cocoon (Fog Canyon)":{	x:125,y:114.5,size:40,pictureName:"Lifeblood Cocoon.png",hitboxType:'circle',linkEx:"Lifeblood_Cocoon",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Vengeful Spirit"}], notes:"gives 3 lifeseeds", },

			"Lifeblood Cocoon (Mantis Village)":{	x:182.4,y:180.4,size:40,pictureName:"Lifeblood Cocoon.png",hitboxType:'circle',linkEx:"Lifeblood_Cocoon",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Mantis Claw"}], notes:"gives 2 lifeseeds", },

			"Lifeblood Cocoon (Failed Tramway)":{	x:107,y:171.5,size:40,pictureName:"Lifeblood Cocoon.png",hitboxType:'circle',linkEx:"Lifeblood_Cocoon",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Mantis Claw"}], notes:"gives 2 lifeseeds", },

			"Lifeblood Cocoon (Deepnest)":{	x:101.2,y:180.7,size:40,pictureName:"Lifeblood Cocoon.png",hitboxType:'circle',linkEx:"Lifeblood_Cocoon",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Lumafly Lantern"},{name:"Mantis Claw"}], notes:"gives 3 lifeseeds", },

			"Lifeblood Cocoon (Kingdom's Edge)":{	x:395,y:148,size:40,pictureName:"Lifeblood Cocoon.png",hitboxType:'circle',linkEx:"Lifeblood_Cocoon",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[east], notes:"gives 3 lifeseeds", },

			//hot springs
			"Hot Spring (Forgotten Crossroads)":{	x:213.3,y:91.4,size:40,pictureName:"Hot Spring.png",hitboxType:'circle',linkEx:"Hot_Spring",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[], notes:null, },

			"Hot Spring (Deepnest)":{	x:140.8,y:207,size:40,pictureName:"Hot Spring.png",hitboxType:'circle',linkEx:"Hot_Spring",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Mantis Claw"}], notes:null, },

			"Hot Spring (Pleasure House)":{	x:326,y:136.2,size:40,pictureName:"Hot Spring.png",hitboxType:'circle',linkEx:"Hot_Spring",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[{name:"Simple Lock (Pleasure House)"}], notes:null, },

			"Hot Spring (Colosseum of Fools)":{	x:385.7,y:130.3,size:40,pictureName:"Hot Spring.png",hitboxType:'circle',linkEx:"Hot_Spring",priorityName:"NonCollectableIcon",nonCollectable:true,
			requirements:[east], notes:null, },





			//example of picking only one requirement
			//{name:"-choose1-",choose1List:[{name:"Vengeful Spirit"},{name:"Bretta"}]}

		};
	}

	static _setOtherVars(){
		for (const [name, itemInfo] of Object.entries(ItemInfoDatabase._mapObject)) {
			itemInfo['name'] = name;
		}
	}




	//addToUponGetting() has already been called when these functions are called
	static _maskShardDoOnClaimed(){
		let count = CounterInventory.count("Mask Shard");
		if(count%4===0){//just got a complete mask
			CounterInventory.addTo("Completion",1);
		}
	}
	static _maskShardDoOnUnClaimed(){
		let count = CounterInventory.count("Mask Shard");
		if(count%4===3){//just lost a complete mask
			CounterInventory.addTo("Completion",-1);
		}
	}

	static _vesselFragmentDoOnClaimed(){
		let count = CounterInventory.count("Vessel Fragment");
		if(count%3===0){//just got a complete vessel
			CounterInventory.addTo("Completion",1);
		}
	}
	static _vesselFragmentDoOnUnClaimed(){
		let count = CounterInventory.count("Vessel Fragment");
		if(count%3===2){//just lost a complete vessel
			CounterInventory.addTo("Completion",-1);
		}
	}

	static _kingsoulPartDoOnClaimed(){
		let leftHave = ItemInfoDatabase.getItemInfo("Kingsoul (Left)").icon.have;
		let rightHave = ItemInfoDatabase.getItemInfo("Kingsoul (Right)").icon.have;

		if(leftHave&&rightHave){//kingsoul was just completed
			CounterInventory.addTo("Charm",1);
			CounterInventory.addTo("Completion",1);
		}
	}
	static _kingsoulPartDoOnUnClaimed(){
		let leftHave = ItemInfoDatabase.getItemInfo("Kingsoul (Left)").icon.have;
		let rightHave = ItemInfoDatabase.getItemInfo("Kingsoul (Right)").icon.have;

		if((leftHave&&!rightHave)||(!leftHave&&rightHave)){//there is only one now, so kingsoul was just uncompleted
			CounterInventory.addTo("Charm",-1);
			CounterInventory.addTo("Completion",-1);
		}
	}
}




// class NonCollectableDatabase{
// 	static _mapObject = {};//name string to Item

// 	static getItemInfo(name){
// 		return NonCollectableDatabase._mapObject[name];
// 	}

// 	static doForAllItemInfo(func){
// 		for (const [name, itemInfo] of Object.entries(NonCollectableDatabase._mapObject)) {
// 			func(itemInfo);
// 		}
// 	}

// 	static initilizeDatabase(){
// 		ItemInfoDatabase._mapObject = 
// 		{

// 		};
// 	}
// }