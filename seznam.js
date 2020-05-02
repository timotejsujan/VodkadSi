
window.setInterval(vodkadsiCallback, 1000);

function vodkadsiCallback(){
    var article = $("[data-dot=results] > div");
    vodkadsi_checkPage(article);
}

