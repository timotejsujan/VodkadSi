class ViewCreator{
    static counter = 0;
    static untrustedStyle = {color:"#D64933", text:"Nedůvěryhodná stránka: ", iconPath:"icons/warning.png"};
    static babisStyle = {color:"orange", text:"Stránka Andreje Babiše: ", iconPath:"icons/butterfly.png"};
    static currentStyle;

    static setStyle(style){
        if (style === "untrusted") this.currentStyle = this.untrustedStyle;
        else if (style === "babis") this.currentStyle = this.babisStyle;
    }

    static getBorderStyle(){
        return "solid " + this.currentStyle.color + " 2px";
    }

    static createView(site){
        // creates the icon
        const icon = this.createIcon(site);
        // creates a popup
        const popup = this.createPopup(site);
        popup.style.zIndex = "2147483647";
        popup.appendChild(icon);

        // creates a div
        const div = document.createElement("div");
        div.appendChild(popup);
        
        return div;
    }

    // creates an icon
    static createIcon(site) {
        // creates img element
        const img = document.createElement("img");
        // src to an image
        img.src = chrome.extension.getURL(this.currentStyle.iconPath);
        img.classList.add("vodkadsi-icon");
        img.setAttribute("alt", "Icon");
        img.setAttribute("title", this.currentStyle.text + site.URL);
        return img;
    }

    static createPopup(site) {
        const div = document.createElement("div");
        div.classList.add("vodkadsi_popup");
        div.setAttribute("id", "vodkadsi"+this.counter);
      
        var span = document.createElement("span");
        span.classList.add("vodkadsi_popuptext");
        span.innerHTML = "<div><i>"+this.currentStyle.text+"</i></div><b>"+site.URL;

        span = this.setSource(span, site);
      
        div.appendChild(span);
      
        return div;
    }

    static createToggle() {
        const script = document.createElement("script");
        document.getElementById('vodkadsi'+this.counter).addEventListener('click', function(e) {
            e.stopPropagation();
            const elem = this.querySelector("span");
            elem.classList.toggle("vodkadsi_show");
          });
        this.counter++;
        return script;
    }

    static setSource(span, site){
        if (typeof site.SOURCE !== "undefined") {
            span.innerHTML += "</b><br><div><i>Zdroje:</i></div>";
        
            var sources_arr = site.SOURCE.split(",");
    
            sources_arr.forEach(
                x => {
                    const result = StaticData.getSource(x);
                    const a = document.createElement("a");
                    a.href=result.URL;
                    a.textContent=result.NAME;
                    a.target="_blank";
                    span.appendChild(a);
                    span.append(document.createElement("br"));
                }
            )
    
            if (sources_arr.length != 0 ) span.removeChild(span.lastChild);
        }
        return span;
    }

}