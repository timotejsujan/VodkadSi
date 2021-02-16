
class Settings {

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

    static set(storage){
        this.babisDetectOn = storage["babisDetectOn"];
        this.untrustedDetectOn = storage["untrustedDetectOn"];
        this.drawBorderOn = storage["drawBorderOn"];
        this.numOfBabisCatched = storage["numOfBabisCatched"];
        this.numOfUntrustedCatched = storage["numOfUntrustedCatched"];
    }

    static incNumOfBabisCatched(){
        this.numOfBabisCatched++;
        chrome.storage.local.set({
            numOfBabisCatched: this.numOfBabisCatched
        });
      }
      
    static incNumOfUntrustedCatched(){
        this.numOfUntrustedCatched++;
        chrome.storage.local.set({
            numOfUntrustedCatched: this.numOfUntrustedCatched
        });
      }

}