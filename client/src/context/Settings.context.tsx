import { useState, useContext, createContext, useMemo } from 'react';
import { SettingsContextProps } from './types'

const SettingsContext = createContext<SettingsContextProps>(null!);

export function SettingsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [settings, setSettings] = useState<SettingsContextProps['settings']>({
        logo: '',
        correctionLevel: 'L',
        width: 150,
        foregroundColor: '#000'
    });

    const contextValue: SettingsContextProps = useMemo(
        () => ({
            settings,
            updateSettings: setSettings,
        }),
        [settings],
    );

    return (
        <SettingsContext.Provider value={contextValue}>
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettings = () => useContext(SettingsContext);