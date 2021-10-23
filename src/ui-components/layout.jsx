import React from "react";
import * as componentStyle from "./layout.module.scss";
import SigninButton from "./signinButton";
import Head from "./head";

const Layout = ({ children, db, session, title, description }) => {
	return (
		<>
			<Head title={title} description={description} />
			<div className={componentStyle.container}>
				<div className={componentStyle.header}>
					<div className={componentStyle.headerLeft}>
						<img src="/logo.svg" alt="logo" style={{ height: "48px" }} />
						<h1>Cy2 Learn</h1>
					</div>
					<div>{db && <SigninButton db={db} session={session} />}</div>
				</div>
				<div>{children}</div>
			</div>
		</>
	);
};

export default Layout;
