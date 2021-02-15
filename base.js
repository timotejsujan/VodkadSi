
var staticData = (new StaticData()).constructor;

var settings = new Settings();

var disinformation_style = {color:"#D64933", text:"Nedůvěryhodná stránka: ", iconPath:"icons/warning.png"};
var babis_style = {color:"orange", text:"Stránka Andreje Babiše: ", iconPath:"icons/butterfly.png"};

// checks the given elements of current webpage for matches with untrusted urls or urls of Andrej Babis
function checkPage(articles, checkInnerText = false) {
  articles.forEach(article => {
    // if the element was already checked then it doesn't need to be checked again
    if (!article.getAttribute("vodkadsi")) { 
      
      var article_cpy = copyAndFilterAlreadyChecked(article);

      // sets the attribute that element was already checked
      article.setAttribute("vodkadsi", true);
      // gets the inner text of element
      var inner_text;
      if (checkInnerText){
        inner_text = article_cpy.innerText.toLowerCase().split("\n");
      } else {
        inner_text = article_cpy.querySelectorAll("a");
        inner_text = [...inner_text];
      }

      // checks for untruested url in every text of element
      inner_text.some(elem => {
        var line = (checkInnerText ? elem : decodeURIComponent(elem.href.toLowerCase()));
          // if settings for untrusted urls is on
        if (settings.getUntrustedDetectOn && check_article(staticData.untrustedSites, article,
          line, disinformation_style)) {
            settings.getNumOfUntrustedCatched++;
            chrome.storage.local.set({
              s_catched: settings.getNumOfUntrustedCatched
            });
            return true;
        }

        if (settings.getUntrustedDetectOn && check_article(staticData.untrustedFacebookPages, article,
          line, disinformation_style)) {
            settings.getNumOfUntrustedCatched++;
            chrome.storage.local.set({
              s_catched: settings.getNumOfUntrustedCatched
            });
            return true;
        }
        
        // if settings for urls of Andrej Babis is on
        if (settings.getBabisDetectOn && check_article(staticData.babisSites, article,
          line, babis_style)) {
            settings.getNumOfBabisCatched++;
            chrome.storage.local.set({
              bf_catched: settings.getNumOfBabisCatched
            });
            return true;
        }
        return false;
      })
    }
  });
}

// checks the text for untrusted urls or urls of Andrej Babis
function check_article(list, article, href, style) {
  // checks for every url from given list
  for (var site of list) {
    const li = site.URL.toLowerCase();
    // if it matches
    if (href.startsWith(li) || href.includes("." + li) || href.includes(
        "//" + li) || href.includes("/"+li+"/?")) {
      // creates the icon
      var icon = create_icon(style.iconPath, style.text + site.URL);
      // creates a popup
      var popup = create_popup(site);
      const toggle = document.createElement("script");
      toggle.innerHTML = 'function togglePopup(elem){elem.classList.toggle("vodkadsi_show");}';
      // creates a div
      const elem = document.createElement("div");
      popup.appendChild(icon);
      elem.appendChild(popup);
      elem.appendChild(toggle);

      // if border settings is on, create a border
      if (settings.getDrawBorderOn) {
        article.style.border = "solid " + style.color + " 2px";
      }
      article.prepend(elem);
      // it matches, return true
      return true;
    }
  }
  // no match, return false
  return false;
}

function create_popup(site) {
  const elem = document.createElement("div");
  elem.classList.add("vodkadsi_popup");
  elem.setAttribute("onclick", "togglePopup(this.querySelector(\"span\"))");

  const span = document.createElement("span");
  span.classList.add("vodkadsi_popuptext");
  span.innerHTML = "<div><i>Nedůvěryhodná stránka:</i></div><b>"+site.URL;
  if (typeof site.SOURCE !== "undefined") {
    span.innerHTML +=         
                    "</b><br><div><i>Zdroje:</i></div>";

      var sources_arr = site.SOURCE.split(",");

      sources_arr.forEach(
        x => {
          const a = document.createElement("a");
          const result = staticData.getSource(x);
          a.href=result.URL;
          a.textContent=result.NAME;
          a.target="_blank";
          span.appendChild(a);
          span.append(document.createElement("br"));
        }
      )

      if (sources_arr.length != 0 )span.removeChild(span.lastChild);
  }

  elem.appendChild(span);

  return elem;
}

// creates an icon
function create_icon(iconPath, text) {
  // creates img element
  const elem = document.createElement("img");
  // src to an image
  elem.src = chrome.extension.getURL(iconPath);
  elem.classList.add("vodkadsi-icon");
  elem.setAttribute("alt", "Icon");
  elem.setAttribute("title", text);
  return elem;
}

// copies article and removes already checked elements
function copyAndFilterAlreadyChecked(article){
  // copies the DOM
  var article_cpy = article.cloneNode(true);
  // select all already checked elements
  var form = article_cpy.querySelectorAll("[vodkadsi='true']");
  form.forEach(f =>{
    // removes itself from the copy of an article
    f.parentNode.removeChild(f);
  })
  return article_cpy;
}


