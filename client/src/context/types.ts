import { Code } from '../types';
export interface settings {
    logo: string,
    correctionLevel: string,
    width: number,
    foregroundColor: string
}
export interface AppContextProps {
    settings: settings,
    updateSettings: (newSettings: settings) => void;
    codes: Code[];
    page: number;
    setPage: (page: number) => void
    codesCount: number;
    getAllCodes: () => void
}
