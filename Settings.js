
class Settings {

    set(storage){
        this.babisDetectOn = storage["babis_switch"];
        this.untrustedDetectOn = storage["dezin_switch"];
        this.drawBorderOn = storage["border_switch"];
        this.numOfBabisCatched = storage["bf_catched"];
        this.numOfUntrustedCatched = storage["s_catched"];
    }

    get getBabisDetectOn() {
        return this.babisDetectOn;
    }

    get getUntrustedDetectOn() {
        return this.untrustedDetectOn;
    }

    get getDrawBorderOn() {
        return this.drawBorderOn;
    }

    get getNumOfBabisCatched() {
        return this.numOfBabisCatched;
    }

    get getNumOfUntrustedCatched() {
        return this.numOfUntrustedCatched;
    }
}