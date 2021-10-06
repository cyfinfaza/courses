import React from "react";
import { useState } from "react";
import Button from "./button";
import * as componentStyle from "./signinButton.module.scss";

const SigninButton = ({ session, db }) => {
	const [popOutOpen, setPopOutOpen] = useState(false);
	return (
		<div
			className={componentStyle.container}
			onBlur={event => {
				if (!event.currentTarget.contains(event.relatedTarget)) {
					setPopOutOpen(false);
				}
			}}
		>
			{session ? (
				<Button
					iconElement={
						!popOutOpen && (
							<img
								src={session.user.user_metadata.avatar_url}
								alt=""
								className={componentStyle.buttonAvatarIcon}
							/>
						)
					}
					icon={popOutOpen && "expand_less"}
					onClick={_ => setPopOutOpen(!popOutOpen)}
				>
					{popOutOpen ? "Close" : session.user.user_metadata.full_name}
				</Button>
			) : (
				<Button
					accent={!popOutOpen}
					icon={popOutOpen ? "expand_less" : "login"}
					onClick={_ => setPopOutOpen(!popOutOpen)}
				>
					{popOutOpen ? "Close" : "Sign In"}
				</Button>
			)}
			<div
				className={
					componentStyle.popOut +
					(popOutOpen ? " " + componentStyle.popOutOpen : "")
				}
			>
				{session ? (
					<div className="vertiPanel">
						<div className="horizPanel">
							<img
								src={session.user.user_metadata.avatar_url}
								alt=""
								className={componentStyle.avatarIcon}
							/>
							<div className={componentStyle.userInfoText}>
								<span>{session.user.user_metadata.full_name}</span>
								<span>{session.user.user_metadata.user_name}</span>
							</div>
						</div>
						<Button icon="logout" onClick={_ => db.current.logout()}>
							Sign Out
						</Button>
					</div>
				) : (
					<div className="vertiPanel">
						<p>Sign in to save your progress.</p>
						<div className="horizPanel">
							<Button
								iconElement={
									<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
										/>
									</svg>
								}
								accent
								onClick={_ =>
									db.current.login("github", window.location.pathname)
								}
							>
								GitHub
							</Button>
							<Button
								iconElement={
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
										<path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
									</svg>
								}
								accent
							>
								Google
							</Button>
							<Button
								iconElement={
									<svg viewBox="0 0 71 55">
										<g clipPath="url(#clip0)">
											<path d="M60.1045 4.8978c-4.5253-2.0764-9.378-3.6062-14.4518-4.48238-.0924-.01691-.1847.025349-.2323.109869C44.7963 1.6353 44.105 3.0834 43.6209 4.2216c-5.4572-.817-10.8864-.817-16.2317 0-.4842-1.1635-1.2006-2.5863-1.8275-3.696311-.0476-.0817-.1399-.123959-.2323-.109869-5.071.87338-9.9237 2.40318-14.4518 4.48238-.0392.0169-.0728.0451-.0951.0817C1.57795 18.7309-.943561 32.1443.293408 45.3914c.005597.0648.041978.1268.092353.1662C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195c.0924.0282.1903-.0056.2491-.0817 1.3657-1.865 2.5831-3.8315 3.6269-5.8995.0616-.1211.0028-.2648-.1231-.3127-1.931-.7325-3.7697-1.6256-5.5384-2.6398-.1399-.0817-.1511-.2818-.0224-.3776.3722-.2789.7445-.5691 1.0999-.8621.0643-.0535.1539-.0648.2295-.031 11.6196 5.3051 24.1992 5.3051 35.6817 0 .0756-.0366.1652-.0253.2323.0282.3555.293.7277.586 1.1027.8649.1287.0958.1203.2959-.0196.3776-1.7687 1.0339-3.6074 1.9073-5.5412 2.637-.1259.0479-.1819.1944-.1203.3155 1.0662 2.0651 2.2836 4.0316 3.6241 5.8967.056.0789.1567.1127.2491.0845 5.8014-1.7946 11.684-4.5021 17.7569-8.9619.0532-.0394.0868-.0986.0924-.1634 1.4804-15.3151-2.4796-28.6185-10.4975-40.4119-.0196-.0394-.0531-.0676-.0923-.0845zM23.7259 37.3253c-3.4983 0-6.3808-3.2117-6.3808-7.156 0-3.9443 2.8266-7.156 6.3808-7.156 3.5821 0 6.4367 3.2399 6.3807 7.156 0 3.9443-2.8266 7.156-6.3807 7.156zm23.5919 0c-3.4982 0-6.3807-3.2117-6.3807-7.156 0-3.9443 2.8265-7.156 6.3807-7.156 3.5822 0 6.4367 3.2399 6.3808 7.156 0 3.9443-2.7986 7.156-6.3808 7.156z" />
										</g>
										<defs>
											<clipPath id="clip0">
												<path fill="#fff" d="M0 0h71v55H0z" />
											</clipPath>
										</defs>
									</svg>
								}
								accent
							>
								Discord
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SigninButton;
