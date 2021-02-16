class CheckSocialSite extends Checker{

    static selectAndCheck(node){
        this.select(node);
        this.checkPage(this.selected);
    }

    // Starts the script
    static run() {

        // Select the node that will be observed for mutations
        const targetNode = document;

        // Options for the observer (which mutations to observe)
        const config = {childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        const callback = function(mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for(const mutation of mutationsList) {
                for(const addedNode of mutation.addedNodes){
                    CheckSocialSite.selectAndCheck(addedNode);
                }
            }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);

    }
  
}

Settings.getAndRun(CheckSocialSite);




  