class ViewCreator{
    // counter for creating IDs
    static counter = 0;
    static untrustedStyle = {color:"#D64933", text:"Nedůvěryhodná stránka: ", iconPath:"icons/warning.png"};
    static babisStyle = {color:"orange", text:"Stránka Andreje Babiše: ", iconPath:"icons/butterfly.png"};
    // current style applied
    static currentStyle = {color:"#D64933", text:"Nedůvěryhodná stránka: ", iconPath:"icons/warning.png"};

    // set view style
    static setStyle(style){
        if (style === "untrusted") this.currentStyle = this.untrustedStyle;
        else if (style === "babis") this.currentStyle = this.babisStyle;
    }

    // get border style
    static getBorderStyle(){
        return "solid " + this.currentStyle.color + " 2px";
    }

    // create view
    static createView(site){
        // create an icon
        const icon = this.createIcon(this.currentStyle.iconPath);
        // create a popup
        const popup = this.createPopup(site);
        popup.appendChild(icon);
        // create a div
        const div = document.createElement("div");
        div.appendChild(popup);
        return div;
    }

    // create an icon
    static createIcon(iconPath) {
        // creates img element
        const img = document.createElement("img");
        // add src to an image
        img.src = chrome.runtime.getURL(iconPath);
        img.classList.add("vodkadsi-icon");
        img.setAttribute("alt", "Icon");
        return img;
    }

    // create a popup
    static createPopup(site) {
        const div = document.createElement("div");
        div.classList.add("vodkadsi_popup");
        // set id for listener
        div.setAttribute("id", "vodkadsi"+this.counter);
        var span = document.createElement("span");
        span.classList.add("vodkadsi_popuptext");
        span.innerHTML = "<div><i>"+this.currentStyle.text+"</i></div><b>"+decodeURIComponent(site.URL);
        // set sources
        span = this.setSource(span, site);
        div.appendChild(span);
        return div;
    }

    // create listener for popup click
    static createToggle() {
        const script = document.createElement("script");
        // listener for popup displaying
        document.getElementById('vodkadsi'+this.counter).addEventListener('click', function(e) {
            // forbid click through the element
            e.stopPropagation();
            const elem = this.querySelector("span");
            elem.classList.toggle("vodkadsi_show");
          });
        this.counter++;
        return script;
    }

    // set sources
    static setSource(span, site){
        var sourcesStr = site.SOURCE;
        // if source is undefined, search for the untrusted url
        if (typeof site.SiteID !== "undefined") {
            sourcesStr = StaticData.getUntrustedSiteFromFacebookPage(site.SiteID).SOURCE;
        }
        if (typeof sourcesStr !== "undefined") {
            // source text
            span.innerHTML += "</b><br><div><i>Zdroje:</i></div>";
            // split source IDs to array
            var sources_arr = sourcesStr.split(",");
    
            sources_arr.forEach(
                x => {
                    // get source record by id
                    const result = StaticData.getSource(x);
                    const a = document.createElement("a");
                    a.href=result.URL;
                    a.textContent=result.NAME;
                    a.target="_blank";
                    span.appendChild(a);
                    span.append(document.createElement("br"));
                }
            )
            // remove last br element
            if (sources_arr.length != 0 ) span.removeChild(span.lastChild);
        }
        return span;
    }

}