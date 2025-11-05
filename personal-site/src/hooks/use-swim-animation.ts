import { MutableRefObject, useEffect, useRef, useState } from "react";

export interface SwimmingAnimationState {
    startSwimming: () => void;
    toggleSwimming: () => void;
    isPaused: boolean;
}

function isPastContainerEnd(container:HTMLElement, child: HTMLElement): boolean {
    const childRect = child.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
  
    return childRect.right >= containerRect.right - 5;
}

function takeAChance(chance: number): boolean {
    return (Math.floor(Math.random() * chance) + 1) === chance;
}

const useSwimAnimation = (container: MutableRefObject<HTMLElement>, swimmer: MutableRefObject<HTMLElement>): SwimmingAnimationState => {
    const swimInterval = useRef(null as unknown as NodeJS.Timeout);

    const [isPaused, setIsPaused] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [currentOffset, setCurrentOffset] = useState(-20);
    const [currentSwimmingForward, setCurrentSwimmingForward] = useState(true);

    useEffect(() => {
        if (!swimmer.current || !isStarted) {
            return;
        }
        let leftOffset = currentOffset;
        let isSwimmingForward = currentSwimmingForward;
        if (!isPaused) {
            swimInterval.current = setInterval(() => {
                // Check for pause
                if (isPaused) {
                    return;
                }

                // Handle direction change at container edge
                if (leftOffset <= 0) {
                    isSwimmingForward = true;
                    setCurrentSwimmingForward(isSwimmingForward);
                    swimmer.current.style.transform = `scaleX(1) ` + swimmer.current.style.transform.replace(/scaleX\(.+?\)/, "");
                } else if (isPastContainerEnd(container.current, swimmer.current)) {
                    isSwimmingForward = false;
                    setCurrentSwimmingForward(isSwimmingForward);
                    swimmer.current.style.transform = `scaleX(-1) ` + swimmer.current.style.transform.replace(/scaleX\(.+?\)/, "");
                // Add random direction changes
                } else if (takeAChance(40)) {
                    if (isSwimmingForward) {
                        isSwimmingForward = false;
                        setCurrentSwimmingForward(isSwimmingForward);
                        swimmer.current.style.transform = `scaleX(-1) ` + swimmer.current.style.transform.replace(/scaleX\(.+?\)/, "");
                    } else {
                        isSwimmingForward = true;
                        setCurrentSwimmingForward(isSwimmingForward);
                        swimmer.current.style.transform = `scaleX(1) ` + swimmer.current.style.transform.replace(/scaleX\(.+?\)/, "");
                    }
                }
                
                // Handle position update
                if (isSwimmingForward) {
                    leftOffset++;
                    setCurrentOffset(leftOffset);
                } else {
                    leftOffset--;
                    setCurrentOffset(leftOffset);
                }

                // Set position
                swimmer.current.style.transform = `translateX(${leftOffset}ch) ` + swimmer.current.style.transform.replace(/translateX\(.+?\)/, ""); 
            }, 140);
        }

        return () =>  {
            clearInterval(swimInterval.current);
            swimInterval.current = null as unknown as NodeJS.Timeout;
        };

    }, [isStarted, isPaused]);

    const startSwimming = () => {
        setIsStarted(true);
    }

    const toggleSwimming = () => {
        setIsPaused(!isPaused);
    }

    return {startSwimming, toggleSwimming, isPaused};
};

export default useSwimAnimation;