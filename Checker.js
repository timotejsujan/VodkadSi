class Checker extends Selector{
  // checks the given elements of current webpage for matches with untrusted urls or urls of Andrej Babis
  static checkPage(nodes) {
    nodes.forEach(node => {
      // if the element was already checked then it doesn't need to be checked again
      if (!node.getAttribute("vodkadsi")) { 
        // sets the attribute that element was already checked
        node.setAttribute("vodkadsi", "checked"); 
          
        var nodeCopy = this.copyAndFilterAlreadyChecked(node);

        // gets the inner text of element
        var lines = this.extract(nodeCopy);

        // checks for untruested url in every text of element
        lines.some(line => {
          return this.matchesSomeList(line, node);
        })
      }
    });
  }

  static matchesSomeList(line, node){
    ViewCreator.setStyle("untrusted");
    // if settings for untrusted urls is on
    
    if (Settings.untrustedDetectOn && this.checkLineForUrl(StaticData.untrustedSites, node,
      line)) {
        Settings.incNumOfUntrustedCatched();
        return true;
    }

    if (Settings.untrustedDetectOn && this.checkLineForFacebookPage(StaticData.untrustedFacebookPages, node,
      line)) {
        Settings.incNumOfUntrustedCatched();
        return true;
    }
    ViewCreator.setStyle("babis");

    // if settings for urls of Andrej Babis is on
    if (Settings.babisDetectOn && this.checkLineForUrl(StaticData.babisSites, node,
      line)) {
        Settings.incNumOfBabisCatched();
        return true;
    }
    return false;
  }

  // checks the text for untrusted urls or urls of Andrej Babis
  static checkLineForUrl(list, node, line) {
    return list.some( record => {
      if (!this.matchesUrl(line, record.URL.toLowerCase())) return false;
      Checker.createView(node, record);
      return true;
    });
  }

  static matchesUrl(line, badUrl){
      return line.startsWith(badUrl) || 
             line.includes("." + badUrl) || 
             line.includes("//" + badUrl);
  }

  static checkLineForFacebookPage(list, node, line) {
    return list.some( record => {
      if (!this.matchesFacebookPage(line, decodeURIComponent(record.URL.toLowerCase()))) return false;
      Checker.createView(node, record);
      return true;
    });
  }

  static createView(node, record){
    node.prepend(ViewCreator.createView(record));
    ViewCreator.createToggle();
    // if border settings is on, create a border
    if (Settings.drawBorderOn) node.style.border = ViewCreator.getBorderStyle();
  }

  // copies article and removes already checked elements
  static copyAndFilterAlreadyChecked(node){
    // copies the DOM
    var nodeCopy = node.cloneNode(true);
    // select all already checked elements
    var alreadyChecked = nodeCopy.querySelectorAll("[vodkadsi='checked']");
    alreadyChecked.forEach(x =>{
      // removes itself from the copy of an article
      x.parentNode.removeChild(x);
    })
    return nodeCopy;
  }

}
