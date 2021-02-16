class Checker extends Selector{
  // check the given nodes for untrusted urls
  static checkPage(nodes) {
    nodes.forEach(node => {
      // if the element was already checked then it doesn't need to be checked again
      if (!node.getAttribute("vodkadsi")) { 
        // sets the attribute that element was already checked
        node.setAttribute("vodkadsi", "checked"); 
        // copy node and remove already checked elements from the copy 
        var nodeCopy = this.copyAndFilterAlreadyChecked(node);

        // extract just important lines from the node copy
        var lines = this.extract(nodeCopy);

        // check if lines match some of the given lists from StaticData
        lines.some(line => {
          return this.matchesSomeList(line, node);
        })
      }
    });
  }

  // check if lines match some of the given lists from StaticData
  static matchesSomeList(line, node){
    // set view style
    ViewCreator.setStyle("untrusted");
    // check untrusted urls
    if (Settings.untrustedDetectOn && this.checkLineForUrl(StaticData.untrustedSites, node,
      line)) {
        Settings.incNumOfUntrustedCatched(); // increase counter
        return true;
    }
    // check untrusted facebook pages
    if (Settings.untrustedDetectOn && this.checkLineForFacebookPage(StaticData.untrustedFacebookPages, node,
      line)) {
        Settings.incNumOfUntrustedCatched(); // increase counter
        return true;
    }
    // set view style
    ViewCreator.setStyle("babis");

    // check untrusted urls
    if (Settings.babisDetectOn && this.checkLineForUrl(StaticData.babisSites, node,
      line)) {
        Settings.incNumOfBabisCatched(); // increase counter
        return true;
    }
    return false;
  }

  // check if given line matches given list
  static checkLineForUrl(list, node, line) {
    return list.some( record => {
      if (!this.matchesUrl(line, record.URL.toLowerCase())) return false;
      // create view
      Checker.createView(node, record);
      return true;
    });
  }

  static matchesUrl(line, badUrl){
      return line.startsWith(badUrl) || 
             line.includes("." + badUrl) || 
             line.includes("//" + badUrl);
  }

  // check if given line matches given list
  static checkLineForFacebookPage(list, node, line) {
    return list.some( record => {
      if (!this.matchesFacebookPage(line, decodeURIComponent(record.URL.toLowerCase()))) return false;
      // create view
      Checker.createView(node, record);
      return true;
    });
  }

  // create view
  static createView(node, record){
    // prepend view to given node
    node.prepend(ViewCreator.createView(record));
    // create listener on click
    ViewCreator.createToggle();
    // if border settings is on, create a border
    if (Settings.drawBorderOn) node.style.border = ViewCreator.getBorderStyle();
  }

  // copy article and remove already checked elements
  static copyAndFilterAlreadyChecked(node){
    // copy the DOM
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
