class Checker extends Selector{
  // checks the given elements of current webpage for matches with untrusted urls or urls of Andrej Babis
  static checkPage(articles) {
    articles.forEach(article => {
      // if the element was already checked then it doesn't need to be checked again
      if (article.getAttribute("vodkadsi")) return true; 
      // sets the attribute that element was already checked
      article.setAttribute("vodkadsi", "checked"); 
        
      var article_cpy = this.copyAndFilterAlreadyChecked(article);

      // gets the inner text of element
      var inner_text = this.extract(article_cpy);

      // checks for untruested url in every text of element
      inner_text.some(line => {
        ViewCreator.setStyle("untrusted");
          // if settings for untrusted urls is on
        if (Settings.untrustedDetectOn && this.check_article(StaticData.untrustedSites, article,
          line)) {
            Settings.incNumOfUntrustedCatched();
            return true;
        }

        if (Settings.untrustedDetectOn && this.check_article(StaticData.untrustedFacebookPages, article,
          line)) {
            Settings.incNumOfUntrustedCatched();
            return true;
        }
        ViewCreator.setStyle("babis");

        // if settings for urls of Andrej Babis is on
        if (Settings.babisDetectOn && this.check_article(StaticData.babisSites, article,
          line)) {
            Settings.incNumOfBabisCatched();
            return true;
        }
        return false;
      })
      
    });
  }

  // checks the text for untrusted urls or urls of Andrej Babis
  static check_article(list, article, href) {
    // checks for every url from given list
    for (var site of list) {
      const li = site.URL.toLowerCase();
      // if it matches
      if (href.startsWith(li) || href.includes("." + li) || href.includes(
          "//" + li) || href.includes("/"+li+"/?")) {
        
        article.prepend(ViewCreator.createView(site));
        ViewCreator.createToggle();

        // if border settings is on, create a border
        if (Settings.drawBorderOn) article.style.border = ViewCreator.getBorderStyle();

        // it matches, return true
        return true;
      }
    }
    // no match, return false
    return false;
  }

  // copies article and removes already checked elements
  static copyAndFilterAlreadyChecked(article){
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

}
