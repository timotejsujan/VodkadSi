
class CheckSearchEngine extends Checker{

  static selectAndCheck(){
    // select nodes
    this.select();
    // check selected nodes
    this.checkPage(this.selected);
  }

  // Starts the script
  static run() {  
    this.selectAndCheck();
    // Start the script again after load
    window.onload = function() {
      CheckSearchEngine.selectAndCheck();
    };
  }
    
}

// get settings and run the script
Settings.getAndRun(CheckSearchEngine);

  
