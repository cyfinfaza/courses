import React, { createContext, useState, useEffect } from "react";
import DatabaseInterface from "./database";

export const DbContext = createContext({
	session: null,
	db: null,
	saveState: null,
	courseId: null,
});

export const Provider = ({ children }) => {
	const [saveState, setSaveState] = useState("local_saved");
	const [session, setSession] = useState(null);
	const db = useRef();
	useEffect(function () {
		async function effect() {
			db.current = new DatabaseInterface(setSession, setSaveState);
			await db.current.init();
		}
		effect();
	}, []);
	return (
		<DbContext.Provider value={{ session, db: db.current, saveState }}>
			{children}
		</DbContext.Provider>
	);
};

exports = { default: DbContext, Provider };
