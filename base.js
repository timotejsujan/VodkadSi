
var vodkadsi_api;
if (chrome == null){
	vodkadsi_api = browser;
} else{
	vodkadsi_api = chrome;
}
var border_switch = "";
vodkadsi_api.storage.sync.get(['border_switch'], function(result) {
		border_switch =  result.border_switch;
		if (border_switch == null) {
			border_switch = true;
		}
});

function vodkadsi_checkPage(article) {
	for (var i = 0; i < article.length; i++) {
		if(!article[i].getAttribute("vodkadsi")){
			article[i].setAttribute("vodkadsi", true);
			var articleText = article[i].innerText.toLowerCase();
			var articleHrefs = articleText.split("\n");
			//var test = x[i].querySelectorAll("a"); 
			var found = false;
			for (var j = 0; j < articleHrefs.length; j++){
				if (dezin_switch){
					found = vodkadsi_checkArticle(vodkadsi_list, article[i], articleHrefs[j], true);
				}
				if (babis_switch){
					found = found || vodkadsi_checkArticle(vodkadsi_babis, article[i], articleHrefs[j], false);
				}
				if (found){
					break;
				}
			}
		}
	}
};

function vodkadsi_checkArticle(list, article, href, dez){
	for(var j = 0; j < list.length; j++){
		var li = list[j].toLowerCase();
		if (href.startsWith(li) || href.includes("."+li) || href.includes("//"+li)){
			var color = '';
			var text = '';
			var iconPath = '';
			//var bgcolor = '';
			if (dez){
				color = '#D64933';
				text = 'Příspěvek obsahuje odkaz na nedůvěryhodnou stránku ';
				iconPath = 'icons/warning.png';
				//bgcolor = '#F08080';
			} else{
				color = 'orange';
				text = 'Příspěvek obsahuje odkaz na stránku Andreje Babiše ';
				iconPath = 'icons/butterfly.png';
				//bgcolor = '#FFFACD';
			}
			var icon = vodkadsi_createIcon(iconPath, text);
			var elem = document.createElement("div");
			//elem.style.backgroundColor = "white";
			elem.appendChild(icon);

			if (border_switch) {
				article.style.border = "solid "+color+" 2px";
			}
			//icon.setAttribute("data-tooltip-content", icon.getAttribute("data-tooltip-content") + list[j]);
			icon.setAttribute("title", icon.getAttribute("title") + list[j]);
			article.prepend(elem);
			return true;
		}
	}
	return false;	
};

function vodkadsi_createIcon(iconPath, text){
	var elem = document.createElement("img");
	elem.src = vodkadsi_api.extension.getURL(iconPath);
	elem.classList.add("vodkadsi-icon");
	elem.setAttribute("alt", "Icon");
	//elem.setAttribute("data-hover", "tooltip");
	//elem.setAttribute("data-tooltip-content", text);
	elem.setAttribute("title", text);
	return elem;
};
