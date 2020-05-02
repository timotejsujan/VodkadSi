window.setInterval(vodkadsiCallback, 1000);

function vodkadsiCallback(){
    var article = $("[role=article]");
	var tagArticle = document.getElementsByTagName("article");
	article = [...new Set([...article, ...tagArticle])];
    vodkadsi_checkPage(article);
}