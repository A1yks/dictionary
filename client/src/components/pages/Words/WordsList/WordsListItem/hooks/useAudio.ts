import { useEffect, useRef, useState } from 'react';

function useAudio(audioSrc: string | undefined) {
    const [audioLoading, setAudioLoading] = useState<boolean>(false);
    const audio = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audioLoaded = () => setAudioLoading(false);

        if (audio.current === null) {
            audio.current = new Audio();
            audio.current.addEventListener('canplaythrough', audioLoaded);
        }

        return () => {
            if (audio.current !== null) {
                audio.current.removeAttribute('src');
                audio.current.load();
                audio.current.removeEventListener('canplaythrough', audioLoaded);
                audio.current = null;
            }
        };
    }, []);

    function playWord() {
        if (audio.current !== null && audioSrc) {
            if (!audio.current.src) {
                audio.current.src = audioSrc;
                audio.current.load();
                setAudioLoading(true);
            }

            audio.current.currentTime = 0;
            audio.current.play();
        }
    }

    return { playWord, audioLoading };
}

export default useAudio;
