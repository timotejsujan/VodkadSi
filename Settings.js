
class Settings {

    static set(storage){
        this.babisDetectOn = storage["babis_switch"];
        this.untrustedDetectOn = storage["dezin_switch"];
        this.drawBorderOn = storage["border_switch"];
        this.numOfBabisCatched = storage["bf_catched"];
        this.numOfUntrustedCatched = storage["s_catched"];
    }

}