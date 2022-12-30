import React, { useReducer, Dispatch, useContext, createContext } from "react";
import { Book, User } from "./constants";

export enum Stages {
    VIEWING,
    SCANNING,
    ADDING
};

export interface Action<TType extends string, TPayload = void> {
	type: TType;
	payload: TPayload;
	error?: boolean;
}

interface ISessionState {
    user: User | null,
    books: Book[],
    videoGames: any[],
    moviesTV: any[],
    music: any[],
    signedIn: boolean,
    barcode: string,
    stage: Stages,
    barcodeObject: any,
}

const initialSessionState: ISessionState = {
    user: null,
    books: [],
    videoGames: [],
    moviesTV: [],
    music: [],
    signedIn: false,
    barcode: "",
    stage: Stages.VIEWING,
    barcodeObject: {},
};

type HandledActions = Readonly<
      Action<'SET_SIGNED_IN', { signedIn: boolean }> |
      Action<'SET_USER', { user: User }> |
      Action<'SET_BARCODE', { barcode: string }> |
      Action<'SET_STAGE', { stage: Stages }> |
      Action<'SET_BARCODE_OBJECT', { barcodeObject: any }> 
>;

const buildDispatch = (dispatch: Dispatch<HandledActions>) => ({
    setSignedIn: (signedIn: boolean) => {
        dispatch({ type: 'SET_SIGNED_IN', payload: { signedIn }});
    },
    setUser: (user: User) => {
        dispatch({ type: 'SET_USER', payload: { user }});
    },
    setBarcode: (barcode: string) => {
        dispatch({ type: 'SET_BARCODE', payload: { barcode }});
    },
    setStage: (stage: Stages) => {
        dispatch({ type: 'SET_STAGE', payload: { stage }});
    },
    setBarcodeObject: (barcodeObject: any) => {
        dispatch({ type: 'SET_BARCODE_OBJECT', payload: { barcodeObject }});
    },
});

const sessionReducer = (state: ISessionState, action: HandledActions): ISessionState => {
    switch(action.type) {
        case 'SET_SIGNED_IN': {
            return { ...state, signedIn: action.payload.signedIn };
        }
        case 'SET_USER': {
            return { ...state, user: action.payload.user };
        }
        case 'SET_BARCODE': {
            return { ...state, barcode: action.payload.barcode };
        }
        case 'SET_STAGE': {
            return { ...state, stage: action.payload.stage };
        }
        case 'SET_BARCODE_OBJECT': {
            return { ...state, barcodeObject: action.payload.barcodeObject };
        }
        default:
            return state;
    }
};

type SessionDispatch = ReturnType<typeof buildDispatch>;

interface ISessionProviderProps {
    children: JSX.Element;
}

interface ISessionContextProps {
    state: ISessionState;
    actionableDispatch: SessionDispatch | null;
}

const SessionContext = createContext<ISessionContextProps>({ state: initialSessionState, actionableDispatch: null });

export const SessionProvider = ({ children }: ISessionProviderProps) => {
    const [state, dispatch] = useReducer(sessionReducer, initialSessionState);
    const actionableDispatch = buildDispatch(dispatch);
    return (
        <SessionContext.Provider value={{state, actionableDispatch}}>
            {children}
        </SessionContext.Provider>
    )
};

export const useSession = () => {
    const { state, actionableDispatch } = useContext(SessionContext);
    return [state, actionableDispatch] as [ISessionState, SessionDispatch];
};
