import { useEffect, useState } from 'react';

const CLIENT_KEY = '6LfOyugpAAAAALpdn3wY7z1aTO2kt4ETFc5r4hiU';

declare global {
    interface Window {
        grecaptcha: {
            ready: (fn: Function) => void,
            execute: (key: string, body: any) => Promise<string>        };
    }
}

export default function useRecaptcha() {
    const [loaded, setLoaded] = useState(false);

    function prepareRecaptcha() {
        window.grecaptcha.ready(() => setLoaded(true))
    }

    async function getToken() {
        if (!loaded) return;
        return window.grecaptcha
            .execute(CLIENT_KEY, { action: 'homepage' })
            .then((token: string) => {
                return token;
            });
    }

    useEffect(() => {
        const style = document.createElement('style');
        const css = document.createTextNode('.grecaptcha-badge {visibility: hidden !important;}');
        style.appendChild(css);
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?render=' + CLIENT_KEY;
        script.addEventListener('load', prepareRecaptcha);
        document.head.appendChild(style);
        document.body.appendChild(script);
    }, [])

    return getToken;
}