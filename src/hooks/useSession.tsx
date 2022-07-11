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
    music: any[]
}

const initialSessionState: ISessionState = {
    user: null,
    books: [],
    videoGames: [],
    moviesTV: [],
    music: []
};

type HandledActions = Readonly<
      Action<'SELECT_INSTRUMENT', { instrument: string }>
>;

const buildDispatch = (dispatch: Dispatch<HandledActions>) => ({
    
});

const sessionReducer = (state: ISessionState, action: HandledActions): ISessionState => {
    switch(action.type) {
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
