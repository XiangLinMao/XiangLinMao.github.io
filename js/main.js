'use strict';

const MAX_ADULT_STOCK = 1800,
	  MAX_CHILD_STOCK = 200,
	  FLY_TO_ZOOM = 19;
	



require(["pace.min","leaflet"],function(){
	require(["leaflet.markercluster"],function(){
		/*let map = L.map('app', {center: [24.736424,121.091371], zoom: 16}),*/
		var startpoint = new L.icon({iconUrl:"images/sufficient.svg",iconSize:[48,48],iconAnchor:[24,48],popupAnchor:[0,-48]});
		var greenIcon = new L.Icon({
			iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
			shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41]
		});
		//L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);
		let map = L.map('app', {center: [24.736424,121.091371], zoom: 16,attributionControl:false,zoomControl:false,minZoom:3,maxZoom:19}),
			/*openstreetmap*/
			osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			//osmUrl="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
			osm = new L.TileLayer(osmUrl, {minZoom: 3, maxZoom: 19}),
			today = new Date(),
			currentIcon = L.icon({iconUrl:"images/current.svg",className:"animation",iconSize:[24,24]}),
			currentMar = L.marker([0,0], {icon: currentIcon}),
			storeIcon = [
				L.icon({iconUrl:"images/sold-out.svg",iconSize:[48,48],iconAnchor:[24,48],popupAnchor:[0,-48]}),
				L.icon({iconUrl:"images/emergency.svg",iconSize:[48,48],iconAnchor:[24,48],popupAnchor:[0,-48]}),
				L.icon({iconUrl:"images/warning.svg",iconSize:[48,48],iconAnchor:[24,48],popupAnchor:[0,-48]}),
				L.icon({iconUrl:"images/sufficient.svg",iconSize:[48,48],iconAnchor:[24,48],popupAnchor:[0,-48]})
			],
			storeClass = ["sold-out","emergency","warning","sufficient"],
			xhr = new XMLHttpRequest(),
			storeMarkers = L.markerClusterGroup({
				iconCreateFunction: function(cluster) {
					let list = cluster.getAllChildMarkers(),
						order = 0;
					for (let i = 0; i < list.length; i++) {
						order = order < 3 && list[i].options.icon.options.iconUrl === storeIcon[3].options.iconUrl ? 3 :
								order < 2 && list[i].options.icon.options.iconUrl === storeIcon[2].options.iconUrl ? 2 :
								order < 1 && list[i].options.icon.options.iconUrl === storeIcon[1].options.iconUrl ? 1 :
								list[i].options.icon.options.iconUrl === storeIcon[0] ? 0 : order;
					}
					return L.divIcon({className:"icon-cluster " + storeClass[order],iconSize:[72,30]});
				},
				removeOutsideVisibleBounds: true,
				animate: true,
				maxClusterRadius: 40
			}),
			childrenStat = false,
			locationPermit = false;
		
		map.addLayer(osm);

		map.setView([24.736576,121.0928152], 6);

		/*var startpoint = new L.icon({iconUrl:"images/sufficient.svg",iconSize:[48,48],iconAnchor:[24,48],popupAnchor:[0,-48]});*/

		

		//var marker = L.marker([24.736576,121.0928152], {icon: startpoint}).bindPopup('<h1>竹東郵局</h1>').addTo(map);
		

		
		/*var lineArr=[[39.920969009399414, 116.38572692871094],[39.91101264953613,116.3862419128418],[39.91161346435547, 116.39636993408203],[39.9217414855957,    
    		116.3957691192627],[39.9213981628418, 116.38589859008789]];
		var line =newL.polyline(lineArr,{color:'red',opacity:'0.8',weight:'3'}).addTo(map)});*/



		var data = [
			{'name':'竹東郵局',lat:24.736576,lng:121.0928152},
			//{'name':'中豐路一段155號',lat:24.7222411,lng:121.0944373}
		  ]
		
		var markers = new L.MarkerClusterGroup().addTo(map);;
		  //var marker = L.marker([24.723126,121.098473], {icon: startpoint}).bindPopup('<h1>中豐路一段89號</h1>')
		//marker.bindPopup('<h1>竹東郵局</h1>')
		/*marker.openPopup();*/
		/*var kine = L.polyline([[24.736576,121.0928152], [24.736628, 121.093060]], { color: 'red' }).addTo(map);*/
		
		var line12 = L.polyline([[24.73657,121.09281], [24.73662, 121.09306], [24.73019,121.09296], [24.72865,121.09408], [24.72745,121.09480], 
			[24.72687,121.09357], [24.72383,121.09541], [24.72331,121.09448], [24.72316,121.09431], [24.72389,121.09357], [24.72377,121.09335], 
			[24.72365,121.09332], [24.72322,121.09289], [24.72296,121.09268], [24.72293,121.09254], [24.72236,121.09362], [24.72278,121.09399], 
			[24.72279,121.09397], [24.72204,121.09332], [24.72218,121.09312], [24.72217,121.09311], [24.72203,121.09331], [24.72098,121.09242], 
			[24.72096,121.09245], [24.72146,121.09288], [24.72115,121.09333], [24.72116,121.09335], [24.72149,121.09289], [24.72173,121.09310],
			[24.72127,121.09383], [24.72126,121.09388], [24.72175,121.09311], [24.72233,121.09361], [24.72206,121.09421], [24.72192,121.09479],
			[24.72191,121.09539], [24.72219,121.09640], [24.72317,121.09857], [24.72267,121.09875], [24.72250,121.09830], [24.72248,121.09831],
			[24.72266,121.09876], [24.72230,121.09889], [24.72208,121.09812], [24.72244,121.09798], [24.72208,121.09718], [24.72206,121.09718], 
			[24.72241,121.09797], [24.72194,121.09816], [24.72207,121.09859], [24.72206,121.09860], [24.72193,121.09819], [24.72168,121.09828],
			[24.72177,121.09859], [24.72176,121.09859], [24.72166,121.09827], [24.72166,121.09827], [24.72159,121.09828], [24.72153,121.09810],
			[24.72146,121.09808], [24.72157,121.09830], [24.72063,121.09861], [24.71992,121.09874], [24.71968,121.09726], [24.72010,121.09719],
			[24.72010,121.09717], [24.71967,121.09725], [24.71962,121.09693], [24.72022,121.09684], [24.72023,121.09682], [24.71960,121.09692],
			[24.71972,121.09767], [24.71946,121.09772], [24.71941,121.09738], [24.71922,121.09741], [24.71921,121.09745], [24.71940,121.09742],
			[24.71944,121.09774], [24.71922,121.09777], [24.71921,121.09780], [24.71972,121.09770], [24.72001,121.09944], [24.72040,121.10033],
			[24.72042,121.10031], [24.72036,121.10017], [24.72045,121.10010], [24.72035,121.09958], [24.72067,121.09948], [24.72067,121.09946],
			[24.72032,121.09958], [24.72043,121.10009], [24.72034,121.10016], [24.72004,121.09944], [24.71981,121.09949], [24.71976,121.09925],
			[24.71974,121.09925], [24.71979,121.09951], [24.71951,121.09958], [24.71927,121.09959], [24.71911,121.09959], [24.71900,121.09965], 
			[24.71907,121.09998], [24.71890,121.10012], [24.71892,121.10016], [24.71909,121.10001], [24.71913,121.10023], [24.71916,121.10021],
			[24.71904,121.09966], [24.71912,121.09962], [24.71927,121.09963], [24.71936,121.10010], [24.71990,121.09994], [24.71990,121.09992], 
			[24.71962,121.09999], [24.71953,121.09960], [24.72006,121.09946], [24.71995,121.09871], [24.72062,121.09858], [24.72054,121.09823], 
			[24.72007,121.09837], [24.72006,121.09834], [24.72053,121.09822], [24.72057,121.09822], [24.72108,121.09808], [24.72108,121.09805], 
			[24.72092,121.09809], [24.72087,121.09785], [24.72084,121.09785], [24.72090,121.09811], [24.72054,121.09819], [24.72029,121.09790], 
			[24.71989,121.09833], [24.71988,121.09829], [24.72025,121.09790], [24.71996,121.09800], [24.71996,121.09797], [24.72031,121.09786],
			[24.72051,121.09767], [24.72107,121.09726], [24.72116,121.09733], [24.72145,121.09802], [24.72149,121.09804], [24.72118,121.09732], 
			[24.72108,121.09725], [24.72129,121.09708], [24.72169,121.09787], [24.72171,121.09785], [24.72156,121.09746], [24.72174,121.09735], 
			[24.72196,121.09778], [24.72199,121.09777], [24.72175,121.09730], [24.72153,121.09743], [24.72131,121.09706], [24.72178,121.09674], 
			[24.72196,121.09705], [24.72198,121.09702], [24.72180,121.09672], [24.72212,121.09650], [24.72209,121.09647], [24.72121,121.09711],
			[24.72111,121.09689], [24.72103,121.09687], [24.72116,121.09714], [24.72104,121.09723], [24.72092,121.09714], [24.72076,121.09711],
			[24.72081,121.09695], [24.72066,121.09687], [24.72055,121.09685], [24.72030,121.09687], [24.72019,121.09720], [24.72071,121.09715], 
			[24.72072,121.09712], [24.72019,121.09718], [24.72016,121.09726], [24.72018,121.09748], [24.72046,121.09745], [24.72046,121.09743], 
			[24.72020,121.09745], [24.72019,121.09726], [24.72039,121.09674], [24.72043,121.09644], [24.72114,121.09645], [24.72115,121.09662], 
			[24.72118,121.09662], [24.72118,121.09644],
			], { color: 'red' });;
		
		map.setMaxBounds([[90,-180], [-90,180]]);
		document.getElementById("zoom-in").addEventListener("click",function(){map.zoomIn()});
		document.getElementById("zoom-out").addEventListener("click",function(){map.zoomOut()});
		document.getElementById("test").addEventListener("click", function(){line12.addTo(map)});
		document.getElementById("test").addEventListener("click", function(){for(let i =0;data.length>i;i++){
			console.log(data[i].name)
			markers.addLayer(L.marker([data[i].lat,data[i].lng],{icon: greenIcon}).bindPopup('<h1>' + data[i].name + '</h1>'));
		  }
		map.addLayer(markers);});
		
		
		document.getElementById("current-location").addEventListener("click",function(){
			if(locationPermit) {
				map.flyTo(currentMar.getLatLng(),18);
			}
			if (navigator.geolocation) {
				let pos = navigator.geolocation.watchPosition(function(geo){
					currentMar.setLatLng([geo.coords.latitude,geo.coords.longitude]);
					currentMar.bindPopup("<p class='user-location'>目前位置</p><p class='loc-accuracy'>GPS 精確度："+Math.round(geo.coords.accuracy * 100) / 100+" 公尺</p>");
					currentMar.addTo(map);
					storeMarkers.eachLayer(function(layer){
						layer.getPopup().getContent().getElementsByClassName("store-distance")[0].innerText = geoDistance([[geo.coords.latitude,geo.coords.longitude],[layer.getPopup().getContent().dataset.lat,layer.getPopup().getContent().dataset.lng]]);
					});
					locationPermit = true;
				},function(){
					alert("定位資料取得失敗，故不能進行目前位置顯示");
					storeMarkers.eachLayer(function(layer){
						layer.getPopup().getContent().getElementsByClassName("store-distance")[0].innerText = "無定位無距離";
					});
					locationPermit = false;
					currentMar.remove();
				},{enableHighAccuracy:true});
			}
		});
		document.getElementById("menu").addEventListener("click",function(){
			document.getElementById("information").classList.toggle("close");
			this.classList.toggle("close");
		});
		document.getElementById("app").addEventListener("click", function () {
			if (document.documentElement.clientWidth <= 768 && !document.getElementById("information").classList.contains("close")) {
				document.getElementById("information").classList.add("close");
				document.getElementById("menu").classList.add("close");
			}
		});
		
		/*xhr.addEventListener("load", function(){
			let data = JSON.parse(this.responseText),index = {};
			for (let i = 0; i < data.features.length; i++) {
				index[data.features[i].properties.id] = i;
				data.features[i].properties.phone = data.features[i].properties.phone.replace(/ /g,"");
			}
			/*data.features.forEach(function(store){
				let storeLocation = [store.geometry.coordinates[1],store.geometry.coordinates[0]];
				let marker = L.marker(storeLocation,{icon:storeIcon[markerOrder("adult",store.properties.mask_adult)]}),
					popupConfig = {maxWidth: "auto"},
					popupContent = L.DomUtil.create("div","store-information"),
					storeStatus = L.DomUtil.create("div","store-status",popupContent);
				popupContent.dataset.lat = storeLocation[0];
				popupContent.dataset.lng = storeLocation[1];
				popupContent.dataset.id = store.properties.id;
				for (let i = 0; i < 2; i++) {
					let	container = L.DomUtil.create("div","container",storeStatus),
						label = L.DomUtil.create("p","label",container),
						numContainer = L.DomUtil.create("p","number-container",container);
					switch (i) {
					case 0:
						label.innerText = "成人口罩數量";
						container.classList.add(storeClass[markerOrder("adult",store.properties.mask_adult)]);
						numContainer.innerHTML = "<span class='number'>" + store.properties.mask_adult + "</span> 片";
						break;
					case 1:
						label.innerText = "兒童口罩數量";
						container.classList.add(storeClass[markerOrder("child",store.properties.mask_child)]);
						numContainer.innerHTML = "<span class='number'>" + store.properties.mask_child + "</span> 片";
						break;
					}
				}
				let storeName = L.DomUtil.create("p","store-name",popupContent),
					storeAddr = L.DomUtil.create("p","store-address detail",popupContent),
					storePhon = L.DomUtil.create("p","store-phone detail",popupContent),
					storeNote = L.DomUtil.create("p","store-note detail",popupContent),
					storeUpda = L.DomUtil.create("p","store-updated detail",popupContent);
				storeName.innerHTML = store.properties.name + "<span class='store-distance'></span>";
				storeAddr.innerHTML = "<span class='icon fas fa-map-marked-alt'></span><span class='text'><a href='https://www.google.com/maps?q=" + store.properties.name + "+" + store.properties.address + "' target='_blank'>" + store.properties.address + "</a></span>";
				storePhon.innerHTML = "<span class='icon fas fa-phone'></span><span class='text'><a href='tel:" + store.properties.phone + "'>" + store.properties.phone + "</a></span>";
				storeUpda.innerHTML = "<span class='icon fas fa-sync-alt'></span><span class='text'>" + store.properties.updated + "</span>";
				storeNote.innerHTML = "<span class='icon fas fa-sticky-note'></span><span class='text'>" + store.properties.note + "</span>";
				marker.bindPopup(popupContent,popupConfig).on("click",function(){
					location.hash = this.getPopup().getContent().dataset.id;
				});
				storeMarkers.addLayer(marker);
			});*/
			/*map.addLayer(storeMarkers);
			if (location.hash != "") {
				storeMarkers.eachLayer(function(layer){
					let markerData = layer.getPopup().getContent().dataset;
					if(markerData.id == location.hash.substr(1)) {
						map.setView([markerData.lat,markerData.lng],FLY_TO_ZOOM);
						layer.openPopup();
						return this;
					}
				});
			}*/
			/*window.setInterval(function(){
				let updator = new XMLHttpRequest;
				index = {};
				updator.addEventListener("load",function(){
					let json = JSON.parse(this.responseText);
					for (let i = 0; i < json.features.length; i++) {
						index[json.features[i].properties.id] = i;
					}
					storeMarkers.eachLayer(function(layer){
						let dom = layer.getPopup().getContent(),
							id = dom.dataset.id,
							stat = json.features[index[id]],
							con = dom.getElementsByClassName("container"),
							num = dom.getElementsByClassName("number"),
							upd = dom.getElementsByClassName("store-updated")[0].children[1];
						con[0].setAttribute("class","container " + storeClass[markerOrder("adult",stat.properties.mask_adult)]);
						con[1].setAttribute("class","container " + storeClass[markerOrder("child",stat.properties.mask_child)]);
						num[0].innerText = stat.properties.mask_adult;
						num[1].innerText = stat.properties.mask_child;
						upd.innerHTML = stat.properties.updated;
						if (childrenStat)
							layer.setIcon(storeIcon[markerOrder("child",stat.properties.mask_child)]);
						else
							layer.setIcon(storeIcon[markerOrder("adult",stat.properties.mask_adult)]);
					});
					storeMarkers.refreshClusters();
				});
				updator.open("GET", "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json?time=" + new Date().getTime());
				updator.send();
			},30000);*/
		});
		/*xhr.open("GET", "htgithubusercontent.comtps://raw./kiang/pharmacies/master/json/points.json?time=" + new Date().getTime());
		xhr.send();
	});*/
});
