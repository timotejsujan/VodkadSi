
// workaround for compatibility with Mozilla Firefox extensions
var vodkadsi_api;
if (chrome == null) {
  vodkadsi_api = browser;
} else {
  vodkadsi_api = chrome;
}

function waitForCheckPage(article){
  if(babis_switch !== "" && dezin_switch !== "" && border_switch !== ""){
    vodkadsi_checkPage(article);
  } else{
    getSettings();
    setTimeout(waitForCheckPage, 1000);
  }
}

// checks the given elements of current webpage for matches with untrusted urls or urls of Andrej Babis
function vodkadsi_checkPage(article) {
  if (article == undefined){
    vodkadsiCallback();
    return;
  }
  for (var i = 0; i < article.length; i++) {
    // if the element was already checked then it doesn't need to be checked again
    if (!article[i].getAttribute("vodkadsi")) {
      // sets the attribute that element was already checked
      article[i].setAttribute("vodkadsi", true);
      // gets the inner text of element
      const articleText = article[i].innerText.toLowerCase();
      // splitting on new line
      const articleHrefs = articleText.split("\n");
      var found = false;
      // checks for untruested url in every text of element
      for (var j = 0; j < articleHrefs.length; j++) {
        // if settings for untrusted urls is on
        if (dezin_switch) {
          // checks for matches with untrusted urls
          found = vodkadsi_checkArticle(vodkadsi_list, article[i],
              articleHrefs[j], true);
        }
        // if url was matched then break
        if (found) {
          break;
        }
        // if settings for urls of Andrej Babis is on
        if (babis_switch) {
          // checks for matches with urls of Andrej Babis
          found = found || vodkadsi_checkArticle(vodkadsi_babis, article[i],
              articleHrefs[j], false);
        }
        // if url was matched then break
        if (found) {
          break;
        }
      }
    }
  }
}

// checks the text for untrusted urls or urls of Andrej Babis
function vodkadsi_checkArticle(list, article, href, dez) {
  // checks for every url from given list
  for (var j = 0; j < list.length; j++) {
    const li = list[j].toLowerCase();
    // if it matches
    if (href.startsWith(li) || href.includes("." + li) || href.includes(
        "//" + li)) {
      var color = '';
      var text = '';
      var iconPath = '';
      // if checking for untrusted urls
      if (dez) {
        color = '#D64933';
        text = 'Příspěvek obsahuje odkaz na nedůvěryhodnou stránku ';
        iconPath = 'icons/warning.png';
      } else { // if checking for urls of Andrej Babis
        color = 'orange';
        text = 'Příspěvek obsahuje odkaz na stránku Andreje Babiše ';
        iconPath = 'icons/butterfly.png';
      }
      // creates the icon
      const icon = vodkadsi_createIcon(iconPath, text);
      // creates a div
      const elem = document.createElement("div");
      elem.appendChild(icon);
      // if border settings is on, create a border
      if (border_switch) {
        article.style.border = "solid " + color + " 2px";
      }
      // put an explanation title to the img
      icon.setAttribute("title", icon.getAttribute("title") + list[j]);
      article.prepend(elem);
      // it matches, return true
      return true;
    }
  }
  // no match, return false
  return false;
}

// creates an icon
function vodkadsi_createIcon(iconPath, text) {
  // creates img element
  const elem = document.createElement("img");
  // src to an image
  elem.src = vodkadsi_api.extension.getURL(iconPath);
  elem.classList.add("vodkadsi-icon");
  elem.setAttribute("alt", "Icon");
  elem.setAttribute("title", text);
  return elem;
}

