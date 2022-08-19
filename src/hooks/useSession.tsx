import React, { useReducer, Dispatch, useContext, createContext } from "react";
import { Book, User } from "./constants";

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
    signedIn: boolean
}

const initialSessionState: ISessionState = {
    user: null,
    books: [],
    videoGames: [],
    moviesTV: [],
    music: [],
    signedIn: false
};

type HandledActions = Readonly<
      Action<'SET_SIGNED_IN', { signedIn: boolean }> |
      Action<'SET_USER', { user: User }>
>;

const buildDispatch = (dispatch: Dispatch<HandledActions>) => ({
    setSignedIn: (signedIn: boolean) => {
        dispatch({ type: 'SET_SIGNED_IN', payload: { signedIn }});
    },
    setUser: (user: User) => {
        dispatch({ type: 'SET_USER', payload: { user }});
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
