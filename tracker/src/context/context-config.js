import React, { createContext } from 'react';

export const ContextVar = createContext();

export const ContextProvider = ({ children }) => {
	const hi = 'hi';

	return <ContextVar.Provider value={{ hi }}>{children}</ContextVar.Provider>;
};
