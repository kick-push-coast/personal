import classes from'./dot-game.module.scss';
import { initGame, reset } from '../../assets/js/dotgame.js';
import { useEffect } from 'react';

export const DotGame = () => {

    useEffect(() => {
        initGame();
        return () => {
            reset();
        }
    }, [])

    return (
        <div className={classes.gameContainer + " gameContainer" + " "}>
            <div className={classes.timer + " timer"}>
                <div className={classes.hiScore + " hiScore"}>NEW HI SCORE</div>
                <span>TIME</span>
            </div>


            <div className={classes.menu + " menu"}>
                <div className={classes.menuTitle + " menuTitle"}>
                    <h2>Protect your dot</h2>
                </div>
                <div className={classes.directionsContainer + " directionsContainer"}>
                    <div className={classes.directions + " directions"}>
                        <div className={classes.directionsText + " directionsText"}>Use </div>
                        <div className={classes.keys + " keys"}>
                            <div><span className={classes.key + " key"}>&uarr;</span></div>
                            <div><span className={classes.key + " key"}>&larr;</span><span className={classes.key + " "}>&darr;</span><span className={classes.key + " "}>&rarr;</span></div>
                        </div>
                        <div className={classes.directionsText + " directionsText"}> to move</div>
                    </div>
                    <div className={classes.directions + " directions"}>
                        <div className={classes.directionsText + " directionsText"}>Press </div>
                        <div className={classes.keys + " keys"}>
                            <div><span className={classes.key + " " + classes.space + " key space"}>SPACE</span></div>
                        </div>
                        <div className={classes.directionsText + " directionsText"}> to start</div>
                    </div>
                </div>
            </div>
            <div className={classes.menu + " " + classes.gameover + " menu gameover"}>
                <div className={classes.menuTitle + " menuTitle"}>
                    <h2>Game Over</h2>
                </div>
                <div className={classes.directionsContainer + " directionsContainer"}>
                    <div className={classes.directions + " directions"}>
                        <div className={classes.directionsText + " directionsText"}>Press </div>
                        <div className={classes.keys + " keys"}>
                            <div><span className={classes.key + " " + classes.space + " key space"}>SPACE</span></div>
                        </div>
                        <div className={classes.directionsText + " directionsText"}> to play again</div>
                    </div>
                </div>
            </div>
            <canvas width="1352" height="873"></canvas>
        </div>
    );
};