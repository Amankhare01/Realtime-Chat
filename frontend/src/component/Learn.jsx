import { useState, useEffect } from 'react';

function useIsOnline() {
    const [isOnline, setIsOnline] = useState(window.navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline;
}

const Learn = () => {
    const isOnline = useIsOnline();

    return (
        <div>
            <h1>{isOnline ? "Online" : "Offline"}</h1>
        </div>
    );
};

export default Learn;
