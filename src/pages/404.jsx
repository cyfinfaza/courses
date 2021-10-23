import * as React from "react";
import Button from "../ui-components/button";
import Glow from "../ui-components/glow";
import Head from "../ui-components/head";
import * as pageStyle from "./signin.module.scss";

const SigninPage = () => {
	return (
		<>
			<Head title={"404"} />
			<div className={pageStyle.container}>
				<Glow>
					<img src="/logo.svg" alt="logo" className={pageStyle.logo} />
				</Glow>
				<h1>404</h1>
				<h2>Uh oh. This page does not exist.</h2>
				<Button linksTo="/">Go Home</Button>
			</div>
		</>
	);
};

export default SigninPage;
