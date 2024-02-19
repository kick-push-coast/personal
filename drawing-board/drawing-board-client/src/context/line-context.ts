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
        this.width = 5;
        this.dashType = LineDash.none;
        this.dashValue = [0, 0];
        this.color = '#000000';
    }

    updateColor(color: string){
        this.color = color;
    }

    updateWidth(width: number) {
        this.width = width;
    }

    updateDash(dashType: LineDash) {
        this.dashType = dashType;
        console.log(this.dashType);
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