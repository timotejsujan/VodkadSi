
class Settings {

    // retrieve settings
    static getAndRun(startup) {
        chrome.storage.local.get({
            babisDetectOn: true,
            untrustedDetectOn: true,
            drawBorderOn: true,
            numOfUntrustedCatched: 0,
            numOfBabisCatched: 0
          }, function(storage) {
            Settings.set(storage);
            startup.run();
          });
    }

    // set settings
    static set(storage){
        this.babisDetectOn = storage["babisDetectOn"];
        this.untrustedDetectOn = storage["untrustedDetectOn"];
        this.drawBorderOn = storage["drawBorderOn"];
        this.numOfBabisCatched = storage["numOfBabisCatched"];
        this.numOfUntrustedCatched = storage["numOfUntrustedCatched"];
    }

    // increase counter and save to storage
    static incNumOfBabisCatched(){
        this.numOfBabisCatched++;
        chrome.storage.local.set({
            numOfBabisCatched: this.numOfBabisCatched
        });
      }
      
    // increase counter and save to storage
    static incNumOfUntrustedCatched(){
        this.numOfUntrustedCatched++;
        chrome.storage.local.set({
            numOfUntrustedCatched: this.numOfUntrustedCatched
        });
      }

}