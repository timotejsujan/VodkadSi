
class CheckSearchEngine extends Checker{

  static selectAndCheck(){
    this.select();
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

Settings.getAndRun(CheckSearchEngine);

  
