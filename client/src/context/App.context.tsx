import { useState, useContext, createContext, useMemo, useEffect } from 'react';
import { AppContextProps } from './types'
import { Code } from '../types';
import { fetchCodes } from '../api/codes';
import Alert from 'react-s-alert';

const AppContext = createContext<AppContextProps>(null!);

export function AppProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [settings, setSettings] = useState<AppContextProps['settings']>({
        logo: '',
        correctionLevel: 'L',
        width: 150,
        foregroundColor: '#000'
    });
    const [codes, setCodes] = useState<Code[]>([]);
    const [codesCount, setCodesCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);

    const getAllCodes = async () => {
        try {
            const { codes, count, error } = await fetchCodes(page);
            if (error) {
                Alert.error('An Error occured while fetching Codes.', {
                    position: 'top-right',
                    effect: 'slide',
                    timeout: 'none'
                });
                return;
            }
            setCodes(codes);
            setCodesCount(Math.ceil(count / 12));
        } catch (e) {
            Alert.error('An Error occured while fetching Codes.', {
                position: 'top-right',
                effect: 'slide',
                timeout: 'none'
            });
        }
    }

    const contextValue: AppContextProps = useMemo(
        () => ({
            settings,
            updateSettings: setSettings,
            codes,
            codesCount,
            getAllCodes,
            page,
            setPage
        }),
        [settings, codes, codesCount, page],
    );

    useEffect(() => {
        getAllCodes();
    }, [page])

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);