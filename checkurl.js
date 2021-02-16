

class CheckUrl {
  // checks current url for match with untrusted urls or urls of Andrej Babis
  static checkUrl(list, iconPath) {
    // gets current url
    const currUrl = window.location.href.toLowerCase();
    // checks match for every url from given list
    return list.some(record => {
      // if matches, then change the icon
      if (!this.matches(currUrl, record.URL.toLowerCase())) return false;

      chrome.runtime.sendMessage({"newIconPath": iconPath});
      return true;
    });
  }

  static matches(currUrl, badUrl){
      return currUrl.includes("//" + badUrl) || currUrl.includes('.' + badUrl)
  }

  static run() {

    if (Settings.untrustedDetectOn) {
      if(this.checkUrl(StaticData.untrustedSites, ViewCreator.untrustedStyle.iconPath)){
        Settings.incNumOfUntrustedCatched();
        return;
      }
    }

    if (Settings.babisDetectOn) {
      if(this.checkUrl(StaticData.babisSites, ViewCreator.babisStyle.iconPath)){
        Settings.incNumOfBabisCatched();
      }
    }
  }

}

Settings.getAndRun(CheckUrl);


	


	

