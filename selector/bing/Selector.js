
class Selector {

    static select() {
      // checking for every search result from google
      this.selected = document.querySelectorAll("#b_results > li");
    }
    
    static extract(nodeCopy) {
      var list = nodeCopy.querySelectorAll("a");
      return  [...list].map(x => decodeURIComponent(x.href.toLowerCase()))
    }

    static matchesFacebookPage(line, fbPage){
      return line.includes("facebook.com/"+fbPage);
    }
}
