import { createClient } from "@supabase/supabase-js";

export default class DatabaseInterface {
	constructor(sessionChangeCallback) {
		this.onSessionChange = sessionChangeCallback;
	}
	async init() {
		this.supabase = createClient(
			"https://qmsunxpbxtqxsfqiwceg.supabase.co",
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzExMDYxNCwiZXhwIjoxOTQ4Njg2NjE0fQ.xi6PzOJLWBSB4YNdcvLn1tKsLiLgDQ5YobY3OZCSTiI"
		);
		window.supabase = this.supabase;
		let sess = await this.supabase.auth.session();
		console.log(sess);
		this.onSessionChange(sess);
		// this.refresh();
		this.supabase.auth.onAuthStateChange(async (event, sess) => {
			this.onSessionChange(sess);
			// this.refresh();
		});
	}
	async login(provider, redirect = "/") {
		// const { user, session, error } = await this.supabase.auth.signIn(
		await this.supabase.auth.signIn(
			{
				provider: provider,
			},
			{
				redirectTo: window.location.origin + redirect,
			}
		);
	}
	logout() {
		this.supabase.auth.signOut();
		// window.location.reload()
	}
}
