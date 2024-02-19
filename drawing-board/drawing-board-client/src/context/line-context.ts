export enum LineDash {
    none = 'None',
    short = 'Short',
    long = 'Long'
}

export class LineContext {
    width: number;
    dashType: LineDash;
    dashValue: [number, number];
    color: string;

    constructor () {
        // default values
        this.width = 12;
        this.dashType = LineDash.none;
        this.dashValue = [0, 0];
        this.color = '#000000';
    }

    updateColor(color: string){
        this.color = color;
    }

    updateWidth(width: number) {
        this.width = width;
        this.setDashValue(this.dashType);
    }

    updateDash(dashType: LineDash) {
        this.dashType = dashType;
        this.setDashValue(dashType)
    }

    private setDashValue(dashType: LineDash) {
        switch(dashType) {
            case LineDash.none:
                this.dashValue = [0, 0];
                break;
            case LineDash.short:
                this.dashValue = [1, 2 * this.width];
                break;
            case LineDash.long:
                this.dashValue = [4 * this.width, 2 * this.width];
                break;
        }
    }

}