function onGot(item) {
    //get_lists();

    babis_switch = item["babis_switch"];
    dezin_switch = item["dezin_switch"];
    border_switch = item["border_switch"];
    bf_catched = item["bf_catched"];
    s_catched = item["s_catched"];

    // Select the node that will be observed for mutations
    const targetNode = document;

    // Options for the observer (which mutations to observe)
    const config = {childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for(const mutation of mutationsList) {
            for(const addedNode of mutation.addedNodes){
                vodkadsiCallback(addedNode);
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

}
  
function onError(error) {
console.log(`Error: ${error}`);
}

chrome.storage.local.get({
    babis_switch: true,
    dezin_switch: true,
    border_switch: false,
    bf_catched: 0,
    s_catched: 0
  }, function(item) {
    onGot(item);
  });

  function myFunc(myObj) {
    var x, txt = "";
    for (x in myObj) {
      txt += myObj[x].name + "<br>";
    }
    console.log(txt);
  }

  function get_lists(){
      /*
    var s = document.createElement("script");
    s.src = "http://seznam.cz/?callback=myFunc";
    document.body.appendChild(s);
      
    fetch('http://vodkadsi.cz/')
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
  
        // Examine the text in the response
        response.json().then(function(data) {
          console.log(data);
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    })
      
    var response;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://vodkadsi.cz", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // innerText does not let the attacker inject HTML elements.
            console.log(this.responseText);
            response = xhr.responseText;
            var list = [];
            response = JSON.parse(response);
            for(const item of response){
                list.push(item.URL);
            }
            vodkadsi_list = list;
        }
    }
    xhr.send();
    */
  }

  