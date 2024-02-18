export enum LineDash {
    none,
    short,
    long
}

export class LineContext {
    width: number;
    dash: [number, number];
    color: string;

    constructor () {
        // default values
        this.width = 5;
        this.dash = [0, 0];
        this.color = '#000000';
    }

    updateColor(color: string){
        this.color = color;
    }

    updateWidth(width: number) {
        this.width = width;
    }

    updateDash(type: LineDash) {
        switch(type) {
            case LineDash.none:
                this.dash = [0, 0];
                break;
            case LineDash.short:
                this.dash = [1, 2 * this.width];
                break;
            case LineDash.long:
                this.dash = [4 * this.width, 2 * this.width];
                break;
        }
    }

}