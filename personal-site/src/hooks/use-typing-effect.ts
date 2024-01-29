import { useEffect, useState } from "react";

const useTypingEffect = (value: string, delay = 0, chunkSize = 3, interval = 80) => {
    const [text, setText] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasRun, setHasRun] = useState(false);



    useEffect(() => {
        if (hasRun) {
            return;
        }
        setHasRun(true);

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
    }, [])


    return {text, isAnimating};
};

export default useTypingEffect;