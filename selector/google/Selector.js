class Selector {

  // select search engine results
  static select() {
    this.selected = [...document.getElementById("rso").getElementsByClassName("g")];
  }

  // extract "a" tags and map uri decoding
  static extract(nodeCopy) {
    var list = nodeCopy.querySelectorAll("a");
    return  [...list].map(x => decodeURIComponent(x.href.toLowerCase()))
  }

  // facebook page matcher
  static matchesFacebookPage(line, fbPage){
    return line.includes("facebook.com/"+fbPage);
  }
}