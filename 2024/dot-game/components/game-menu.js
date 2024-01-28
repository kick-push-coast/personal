export class GameMenu extends HTMLElement {

    constructor() {
        super();
    }

}

if ('customElements' in window) {
    customElements.define('game-menu', GameMenu);
}