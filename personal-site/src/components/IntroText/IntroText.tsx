import useTypingEffect from '../../hooks/use-typing-effect';
import { useLocation } from 'react-router-dom';
import classes from './intro-text.module.scss';
import { useEffect, useState } from 'react';

enum TextSections {
    none = '',
    greeting = 'Howdy 👋',
    intro = 'My name is Mike.',
    summary = 'I\'m an experienced software engineer with a focus in frontend who enjoys practical code, web technologies, and fluid, accessible user experiences.',
    signoff = 'Tab around a bit to get to know me :-)'
}

export const IntroText = () => {
    const location = useLocation();
    const shouldAnimate = !location?.state?.introTyped;
    const [currentlyTyping, setCurrentlyTyping] = useState(TextSections.none);
    const greetingTyper = useTypingEffect(TextSections.greeting, 1000, 2, 60);
    const introTyper = useTypingEffect(TextSections.intro, 2800, 1, 40);
    const summaryTyper = useTypingEffect(TextSections.summary, 5500, 2, 60);
    const signoffTyper = useTypingEffect(TextSections.signoff, 11000, 2, 80);

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