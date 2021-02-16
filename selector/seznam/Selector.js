
class Selector {

  static select() {
    // checking for every search result from google
    this.selected = document.querySelectorAll("[data-dot=results] > div");
  }

  static extract(nodeCopy) {
    var list = nodeCopy.querySelectorAll("a");
    return  [...list].map(x => decodeURIComponent(x.href.toLowerCase()))
  }

}