

class CheckUrl {
  // check if current url matches given list
  static checkUrl(list, iconPath) {
    // gets current url
    const currUrl = window.location.href.toLowerCase();
    // checks match for every url from given list
    return list.some(record => {
      if (!this.matches(currUrl, record.URL.toLowerCase())) return false;
      // change the main icon
      chrome.runtime.sendMessage({"newIconPath": iconPath});
      return true;
    });
  }

  static matches(currUrl, badUrl){
      return currUrl.includes("//" + badUrl) || currUrl.includes('.' + badUrl)
  }

  // Starts the script
  static run() {

    if (Settings.untrustedDetectOn) {
      if(this.checkUrl(StaticData.untrustedSites, ViewCreator.untrustedStyle.iconPath)){
        Settings.incNumOfUntrustedCatched(); // increase counter
        return;
      }
    }

    if (Settings.babisDetectOn) {
      if(this.checkUrl(StaticData.babisSites, ViewCreator.babisStyle.iconPath)){
        Settings.incNumOfBabisCatched(); // increase counter
      }
    }
  }

}

// get settings and run the script
Settings.getAndRun(CheckUrl);


	


	

