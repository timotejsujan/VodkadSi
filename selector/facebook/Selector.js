
class Selector {

  // select article tags from node
  static select(node) {
    if(typeof node.querySelectorAll === 'function') {
      var article = node.querySelectorAll("[role=article]");
      var tagArticle = node.getElementsByTagName("article");
      article = [...new Set([...article, ...tagArticle])];
      article = article.reverse();
      this.selected = article;
    }
  }

  // extract "a" tags and map uri decoding
  static extract(nodeCopy) {
    var list = nodeCopy.querySelectorAll("a");
    return  [...list].map(x => decodeURIComponent(x.href.toLowerCase()))
  }

  // facebook page matcher
  static matchesFacebookPage(line, fbPage){
    return line.includes("/"+fbPage+"/?");
  }
}