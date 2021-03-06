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
			//osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			osmUrl="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
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
			{'name':'中豐路一段155號',lat:24.7222411,lng:121.0944373}
		  ]
		
		var markers = new L.MarkerClusterGroup().addTo(map);;
		  //var marker = L.marker([24.723126,121.098473], {icon: startpoint}).bindPopup('<h1>中豐路一段89號</h1>')
		//marker.bindPopup('<h1>竹東郵局</h1>')
		/*marker.openPopup();*/
		/*var kine = L.polyline([[24.736576,121.0928152], [24.736628, 121.093060]], { color: 'red' }).addTo(map);*/
		
		var line12 = L.polyline([[24.736576,121.0928152], [24.736628, 121.093060], [24.735786, 121.093030], [24.735763, 121.095307], [24.735877, 121.095491]
		, [24.735770, 121.095911], [24.735160, 121.096410], [24.734312, 121.097556], [24.733147, 121.098852], [24.732874, 121.099241], [24.732673, 121.099633]
		, [24.732145, 121.099994], [24.731755, 121.099992], [24.727464, 121.099477], [24.723404, 121.099311], [24.723230, 121.098585], [24.722261, 121.096405], [24.723836, 121.095439], [24.723298, 121.094466]
		, [24.723158, 121.094324], [24.723907, 121.093562], [24.723367, 121.092973], [24.722961, 121.092547], [24.722347, 121.093603], [24.722737, 121.093974], [24.722756, 121.093934]
		, [24.720812, 121.092255], [24.720796, 121.092277], [24.721441, 121.092839], [24.721053, 121.093392], [24.721088, 121.093410], [24.721465, 121.092877], [24.721694, 121.093079]
		, [24.721221, 121.093767], [24.721242, 121.093781], [24.721714, 121.093090], [24.722346, 121.093615], [24.722333, 121.093635], [24.722071, 121.094246], [24.721946, 121.094798]
		, [24.721934, 121.094991], [24.721953, 121.095498], [24.722026, 121.095825], [24.722202, 121.096458], [24.723177, 121.098576], [24.722642, 121.098769], [24.722501, 121.098392]
		, [24.722480, 121.098401], [24.722621, 121.098773], [24.722324, 121.098884], [24.722058, 121.098138], [24.722703, 121.097873], [24.722687, 121.097842], [24.722435, 121.097956]
		, [24.722058, 121.097158], [24.722048, 121.097158], [24.722426, 121.097955], [24.722002, 121.098126], [24.722009, 121.098166], [24.721904, 121.098212], [24.721993, 121.098569]
		, [24.722026, 121.098560], [24.721922, 121.098194], [24.721673, 121.098275], [24.721755, 121.098568], [24.721771, 121.098563], [24.721688, 121.098267], [24.721698, 121.098237]
		, [24.721573, 121.098286], [24.721521, 121.098331], [24.721284, 121.098416], [24.721003, 121.098471], [24.720620, 121.098576], [24.720584, 121.098633], [24.720539, 121.098596]
		, [24.719937, 121.098699], [24.719685, 121.097251], [24.720106, 121.097178], [24.720103, 121.097160], [24.719668, 121.097231], [24.719624, 121.096915], [24.720235, 121.096834]
		, [24.720235, 121.096813], [24.719627, 121.096889], [24.719565, 121.096639], [24.719555, 121.096642], [24.719731, 121.097667], [24.719515, 121.097715], [24.719446, 121.097387]
		, [24.719437, 121.097388], [24.719508, 121.097719], [24.719300, 121.097766], [24.719306, 121.097782], [24.719740, 121.097681], [24.719925, 121.098703], [24.720035, 121.099454]
		, [24.720155, 121.099767], [24.720324, 121.100182], [24.720430, 121.100117], [24.720346, 121.099594], [24.720652, 121.099442], [24.720649, 121.099400], [24.720288, 121.099578]
		, [24.720386, 121.100122], [24.720334, 121.100149], [24.720044, 121.099447], [24.719832, 121.099491], [24.719818, 121.099270], [24.719792, 121.099276], [24.719799, 121.099494]
		, [24.719499, 121.099547], [24.719468, 121.099342], [24.719444, 121.099348], [24.719470, 121.099572], [24.719009, 121.099608], [24.719097, 121.099959], [24.718983, 121.100060]
		, [24.718996, 121.100085], [24.719102, 121.099991], [24.719162, 121.100237], [24.719200, 121.100227], [24.719080, 121.099625], [24.719281, 121.099623], [24.719363, 121.100065]
		, [24.719906, 121.099919], [24.719862, 121.099878], [24.719614, 121.099938], [24.719540, 121.099578], [24.720030, 121.099477], [24.720050, 121.099395], [24.719962, 121.098721]
		, [24.720648, 121.098592], [24.720557, 121.098210], [24.720118, 121.098339], [24.720127, 121.098367], [24.720565, 121.098231], [24.721115, 121.098071], [24.721110, 121.098017]
		, [24.720918, 121.098074], [24.720862, 121.097783], [24.720821, 121.097796], [24.720876, 121.098088], [24.720558, 121.098204], [24.720246, 121.097819], [24.720077, 121.097857]
		, [24.720083, 121.097901], [24.720237, 121.097854], [24.720278, 121.097878], [24.719900, 121.098268], [24.719929, 121.098290], [24.720329, 121.097849], [24.720386, 121.097777]
		, [24.721074, 121.097248], [24.721164, 121.097300], [24.721458, 121.098015], [24.721467, 121.098000], [24.721162, 121.097269], [24.721102, 121.097224], [24.721303, 121.097071]
		, [24.721557, 121.097472], [24.721721, 121.097870], [24.721738, 121.097859], [24.721559, 121.097419], [24.721715, 121.097359], [24.721898, 121.097729], [24.721932, 121.097708]
		, [24.721727, 121.097309], [24.721524, 121.097393], [24.721314, 121.097048], [24.721737, 121.096752], [24.722001, 121.097170], [24.722035, 121.097139], [24.721775, 121.096721]
		, [24.722043, 121.096539], [24.722041, 121.096510], [24.721182, 121.097130], [24.721034, 121.096875], [24.720996, 121.096893], [24.721153, 121.097147], [24.721062, 121.097222]
		, [24.720936, 121.097114]], { color: 'red' });;
		
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
