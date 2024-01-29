import { useEffect, useState } from "react";

export interface TypingEffectState {
    text: string,
    isAnimating: boolean;
    startTyping: (value: string, delay: number, chunkSize: number, interval: number) => void;
}

const useTypingEffect = (): TypingEffectState => {
    const [text, setText] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);



    const startTyping = (value: string, delay = 0, chunkSize = 3, interval = 80) => {
        let intervalId: NodeJS.Timeout;
        let i = 0;

        setTimeout(() => {
            setIsAnimating(true);
            intervalId = setInterval(() => {
                setText(prev => {
                    let curr = prev;
                    for (let j = 0; j < chunkSize; j++) {
                        if (i === value.length) {
                            clearInterval(intervalId);
                            setTimeout(() => {
                                setIsAnimating(false);
                            }, 0);

                            return curr;
                        }
                        curr = curr + value[i++];
                    }
                    return curr;
                });
            }, interval);
        }, delay);
    }

    return {text, isAnimating, startTyping};
};

export default useTypingEffect;