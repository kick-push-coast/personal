export class GameMenu extends HTMLElement {

    static get observedAttributes() { 
        return ['game-state']; 
    }

    constructor() {
        super();
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'game-state') {
            switch(newValue) {
                case 'stop':
                    this.stopGame();
                    break;
                case 'start':
                    this.startGame();
                    break;
            }
        }
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
            .menu {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                padding-top: 20px;
                padding-bottom: 20px;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                font-family: monospace, serif;
              }
              
              .menuTitle {
                flex-grow: 1;
                flex-basis: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                color: #000;
                letter-spacing: .1em;
                animation-duration: 0.7s;
                animation-name: pulse;
                animation-iteration-count: infinite;
                animation-direction: alternate;
              }
              
              .menuTitle h2 {
                  font-size: 2.6rem !important;
              }
              
              @keyframes pulse {
                0% {
                  color: rgba(77, 77, 77, 0);
                }
              
                70% {
                  color: rgba(77, 77, 77, 1);
                }
              }
              
              .directionsContainer {
                flex-grow: 1;
                flex-basis: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
              }
              
              .directions {
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: center;
                margin: 10px 0;
              }
              
              .directionsText {
                font-size: 1.6rem;
                color: #4d4d4d;
              }
              
              .directionsText:first-child {
                width: 60px;
                min-width: 60px;
                max-width: 60px;
                padding-left: 32px;
                text-align: right;
              }
              
              .directionsText:last-child {
                width: 90px;
                text-align: left;
              }
              
              .directions div {
                margin: 0 10px;
              }
              
              .keys {
                display: flex;
                flex-direction: column;
                text-align: center;
                font-size: 10px;
              }
              
              .key {
                box-sizing: border-box;
                width: 30px;
                height: 30px;
                color: #4d4d4d;
                display: inline-block;
                padding: 8px 0 0 0;
                border: 3px solid #4d4d4d;
                text-align: center;
                margin: -1px;
              }
              
              .space {
                width: 86px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding-top: 2px;
              }
              
              .keySpace {
                  @extend .key;
                  @extend .space;
              }
              
              .gameover {
                display: none;
                top: 0;
                bottom: 0;
                padding-top: 100px;
                padding-bottom: 100px; 
                background-color: rgba(255, 255, 255, .9);    
              }
              
              .gameover h2 {
                color: #c60000;
                font-size: 2.6rem !important;
              }
              
              .gameover .directionsText:last-child {
                width: 150px;
              }
            </style>
            <div id="start-menu" class="menu">
                <div class="menuTitle">
                    <h2>Protect your dot</h2>
                </div>
                <div class="directionsContainer">
                    <div class="directions">
                        <div class="directionsText">Use </div>
                        <div class="keys">
                            <div><span class="key">&uarr;</span></div>
                            <div><span class="key">&larr;</span><span class="key">&darr;</span><span class="key">&rarr;</span></div>
                        </div>
                        <div class="directionsText"> to move</div>
                    </div>
                    <div class="directions">
                        <div class="directionsText">Press </div>
                        <div class="keys">
                            <div><span class="key space">SPACE</span></div>
                        </div>
                        <div class="directionsText"> to start</div>
                    </div>
                </div>
            </div>
            <div id="gameover-menu" class="menu gameover">
                <div class="menuTitle">
                    <h2>Game Over</h2>
                </div>
                <div class="directionsContainer">
                    <div class="directions">
                        <div class="directionsText">Press </div>
                        <div class="keys">
                            <div><span class="key space">SPACE</span></div>
                        </div>
                        <div class="directionsText"> to play again</div>
                    </div>
                </div>
            </div>
        `
        this.startMenuElement = this.querySelector('#start-menu');
        this.gameoverMenuElement = this.querySelector('#gameover-menu');
    }

    startGame() {
        this.startMenuElement.style.display = 'none';
        this.gameoverMenuElement.style.display = 'none';
    }

    stopGame() {
        this.gameoverMenuElement.style.display = 'flex';
    }

}

if ('customElements' in window) {
    customElements.define('game-menu', GameMenu);
}