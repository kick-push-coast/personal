import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalLoadedStateContext } from '../LayoutContainer';
import { Ducks } from '../Ducks/Ducks';
import useTypingEffect from '../../hooks/use-typing-effect';
import classes from './intro-text.module.scss';
import useIsMobile from '../../hooks/use-is-mobile';

enum TextSections {
    none = '',
    greeting = 'Howdy 👋',
    intro = 'My name is Mike.',
    summary = 'I\'m an experienced, frontend-focused software engineer who enjoys practical code, web technologies, and fluid user experiences.',
    signoff = 'Tab around a bit to get to know me :-)',
    duck = 'What are you still doing here?'
}

export const IntroText = () => {
    const globalLoadedStateContext = useContext(GlobalLoadedStateContext);
    const location = useLocation();
    const isMobile = useIsMobile();
    const shouldAnimate = !location?.state?.introWasTyped;

    const [hasTyped, setHasTyped] = useState(false);
    const [showDucks, setShowDucks] = useState(!shouldAnimate && !isMobile);
    const [currentlyTyping, setCurrentlyTyping] = useState(TextSections.none);

    const greetingTyper = useTypingEffect();
    const introTyper = useTypingEffect();
    const summaryTyper = useTypingEffect();
    const signoffTyper = useTypingEffect();

    useEffect(() => {
        if (globalLoadedStateContext.loaded && shouldAnimate && !hasTyped && !isMobile) {
            greetingTyper.startTyping(TextSections.greeting, 1000, 2, 60);
            introTyper.startTyping(TextSections.intro, 2600, 1, 40);
            summaryTyper.startTyping(TextSections.summary, 5200, 2, 60);
            signoffTyper.startTyping(TextSections.signoff, 10600, 2, 80);
            setHasTyped(true);
        }
    }, [globalLoadedStateContext.loaded, isMobile])

    useEffect(() => {
        if (greetingTyper.isAnimating) {
            setCurrentlyTyping(TextSections.greeting);
        }
    }, [greetingTyper.isAnimating])

    useEffect(() => {
        if (introTyper.isAnimating) {
            setCurrentlyTyping(TextSections.intro);
        }
    }, [introTyper.isAnimating])

    useEffect(() => {
        if (summaryTyper.isAnimating) {
            setCurrentlyTyping(TextSections.summary);
        }
    }, [summaryTyper.isAnimating])
    
    useEffect(() => {
        if (signoffTyper.isAnimating) {
            setCurrentlyTyping(TextSections.signoff);
            setTimeout(() => {
                setShowDucks(!isMobile);
            }, 7000);
        }
    }, [signoffTyper.isAnimating])


    return (
        <>
            <h2 className={currentlyTyping === TextSections.greeting ? classes.typing : ''}>
                {shouldAnimate && !isMobile ? greetingTyper.text : TextSections.greeting}
            </h2>
            <h3 className={currentlyTyping === TextSections.intro ? classes.typing : ''}>
                {shouldAnimate && !isMobile ? introTyper.text : TextSections.intro}
            </h3>
            <p className={currentlyTyping === TextSections.summary ? classes.typing : ''}>
                {shouldAnimate && !isMobile ? summaryTyper.text : TextSections.summary}
            </p>
            <p className={classes.hideMobile + ' ' + (currentlyTyping === TextSections.signoff ? classes.typing : '')}>
                {shouldAnimate && !isMobile ? signoffTyper.text : TextSections.signoff}
            </p>
            { showDucks ?
                <Ducks /> : <></>
            }
        </>
    );
}