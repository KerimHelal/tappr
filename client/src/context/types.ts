export interface settings {
    logo: string,
    correctionLevel: string,
    width: number,
    foregroundColor: string
}
export interface SettingsContextProps {
    settings: settings,
    updateSettings: (newSettings: settings) => void;
}
