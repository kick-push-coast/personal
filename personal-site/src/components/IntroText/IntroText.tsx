import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalLoadedStateContext } from '../LayoutContainer';
import useTypingEffect from '../../hooks/use-typing-effect';
import classes from './intro-text.module.scss';

enum TextSections {
    none = '',
    greeting = 'Howdy 👋',
    intro = 'My name is Mike.',
    summary = 'I\'m an experienced, frontend-focused software engineer who enjoys practical code, web technologies, and fluid user experiences.',
    signoff = 'Tab around a bit to get to know me :-)'
}

export const IntroText = () => {
    const globalLoadedStateContext = useContext(GlobalLoadedStateContext);
    const location = useLocation();
    const shouldAnimate = !location?.state?.introWasTyped;

    const [hasTyped, setHasTyped] = useState(false);
    const [currentlyTyping, setCurrentlyTyping] = useState(TextSections.none);

    const greetingTyper = useTypingEffect();
    const introTyper = useTypingEffect();
    const summaryTyper = useTypingEffect();
    const signoffTyper = useTypingEffect();

    useEffect(() => {
        if (globalLoadedStateContext.loaded && !hasTyped) {
            greetingTyper.startTyping(TextSections.greeting, 1000, 2, 60);
            introTyper.startTyping(TextSections.intro, 2600, 1, 40);
            summaryTyper.startTyping(TextSections.summary, 5200, 2, 60);
            signoffTyper.startTyping(TextSections.signoff, 10600, 2, 80);
            setHasTyped(true);
        }
    }, [globalLoadedStateContext.loaded])

    useEffect(() => {
        if (greetingTyper.isAnimating && shouldAnimate) {
            setCurrentlyTyping(TextSections.greeting);
        }
    }, [greetingTyper.isAnimating])

    useEffect(() => {
        if (introTyper.isAnimating && shouldAnimate) {
            setCurrentlyTyping(TextSections.intro);
        }
    }, [introTyper.isAnimating])

    useEffect(() => {
        if (summaryTyper.isAnimating && shouldAnimate) {
            setCurrentlyTyping(TextSections.summary);
        }
    }, [summaryTyper.isAnimating])
    
    useEffect(() => {
        if (signoffTyper.isAnimating && shouldAnimate) {
            setCurrentlyTyping(TextSections.signoff);
        }
    }, [signoffTyper.isAnimating])

    return (
        <>
            <h2 className={currentlyTyping === TextSections.greeting ? classes.typing : ''}>
                {shouldAnimate ? greetingTyper.text : TextSections.greeting}
            </h2>
            <h3 className={currentlyTyping === TextSections.intro ? classes.typing : ''}>
                {shouldAnimate ? introTyper.text : TextSections.intro}
            </h3>
            <p className={currentlyTyping === TextSections.summary ? classes.typing : ''}>
                {shouldAnimate ? summaryTyper.text : TextSections.summary}
            </p>
            <p className={classes.hideMobile + ' ' + (currentlyTyping === TextSections.signoff ? classes.typing : '')}>
                {shouldAnimate? signoffTyper.text : TextSections.signoff}
            </p>
        </>
    );
}