import { useEffect, useState } from 'react';

const CLIENT_KEY = '6LfOyugpAAAAALpdn3wY7z1aTO2kt4ETFc5r4hiU';

declare global {
    interface Window {
        grecaptcha: any;
    }
}

export default function useRecaptcha() {
    const [recaptchaToken, setRecaptchaToken] = useState('');

    const handleLoaded = () => {
        window.grecaptcha.ready(() => {
            window.grecaptcha
                .execute(CLIENT_KEY, { action: 'homepage' })
                .then((token: string) => {
                    setRecaptchaToken(token);
                })
        })
    }

    useEffect(() => {
        const style = document.createElement('style');
        const css = document.createTextNode('.grecaptcha-badge {visibility: hidden !important;}');
        style.appendChild(css);
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?render=' + CLIENT_KEY;
        script.addEventListener('load', handleLoaded);
        document.head.appendChild(style);
        document.body.appendChild(script);
    }, [])

    return recaptchaToken;
}