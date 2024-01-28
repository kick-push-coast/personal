const HI_SCORE_KEY = "dotGameHiScore"; 

export class GameTimer extends HTMLElement {

    static get observedAttributes() { 
        return ['game-state']; 
    }

    constructor() {
        super();
        this.timeStart = new Date();
        this.timeHasStarted = false;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'game-state') {
            switch(newValue) {
                case 'stop':
                    this.stopTime();
                    break;
                case 'start':
                    this.startTime();
                    break;
                case 'pause':
                    this.pauseTime();
                    break;
            }
        }
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
            .timer {
                position: absolute;
                top: 30px;
                left: 30px;
                font-size: 14px;
                border: 2px solid #000;
                background-color: rgba(255, 255, 255, .85);
                padding: 24px 20px;
                height: 30px;
                width: auto;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                z-index: 1;
                font-family: monospace;
            }
            .timer span {
                font-weight: bold;
                letter-spacing: 0.07em;
            }
            .hi-score {
                position: absolute;
                top: 40px;
                right: -40px;
                font-size: 11px;
                color: #fff;
                display: none;
                flex-direction: column;
                justify-content: center;                
                background: #000;
                width: 50px;
                height: 50px;
                min-height: 50px;
                text-align: center;
                z-index: 1;
                transform: rotate(-20deg);
            }
            .hi-score:before, .hi-score:after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                height: 50px;
                width: 50px;
                background: #000;
                z-index: -1;
            }
            .hi-score:before {  
                transform: rotate(30deg);
            }
            .hi-score:after {
                transform: rotate(60deg);
            }
            </style>
            <div class="timer">
                <div class="hi-score">NEW HI SCORE</div>
                <span>TIME</span>
            </div>
        `
        this.timerElement = this.querySelector('.timer');
        this.timerCountElement = document.createElement('div');
        this.timerCountElement.setAttribute('class', 'count');
        this.timerCountElement.textContent = "0.0";
        this.timerElement.appendChild(this.timerCountElement);
        this.hiScore = localStorage.getItem(HI_SCORE_KEY) || 0;
        this.hiScoreElement = this.querySelector('.hi-score');
    }

    stopTime() {
        this.timeHasStarted = false;
        if (this.timeDiff > this.hiScore) {
            this.hiScore = this.timeDiff;
            localStorage.setItem(HI_SCORE_KEY, this.hiScore);
            this.hiScoreElement.style.display = 'flex';
        }
    }

    pauseTime() {
        if (this.timeHasStarted) {
            this.timeHasStarted = false;
            this.timePaused = new Date();
        }
    }

    startTime() {
        if (this.timePaused) {
            this.timeStart = new Date() - (this.timePaused - this.timeStart);
            this.timePaused = null;
        } else {
            this.timeStart = new Date();
        }
        this.hiScoreElement.style.display = 'none';
        this.timeHasStarted = true;
        this.loopTime();
    }

    loopTime() {
        if (this.timeHasStarted) {      
            let timeCurrent = new Date();
            this.timeDiff = timeCurrent - this.timeStart;
            this.timerCountElement.textContent = (this.timeDiff / 1000).toFixed(1);
            setTimeout(() => {
                requestAnimationFrame(this.loopTime.bind(this));
            }, 100);
        }
    }

}

if ('customElements' in window) {
    customElements.define('game-timer', GameTimer);
}