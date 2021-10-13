import { createClient } from "@supabase/supabase-js";
import { createContext } from "react";

export const DbContext = createContext({
	session: null,
	db: null,
	savedStatus: null,
});

export default class DatabaseInterface {
	constructor(sessionChangeCallback, saveStateChangeCallback) {
		this.onSessionChange = sessionChangeCallback;
		this.onSaveStateChange = args =>
			saveStateChangeCallback && saveStateChangeCallback(args);
		this.onSaveStateChange("local_saved");
		this.sess = null;
		this.updateJobs = {};
		this.onReadyJobs = [];
		this.onLogoutJobs = [];
	}
	async init() {
		this.supabase = createClient(
			"https://qmsunxpbxtqxsfqiwceg.supabase.co",
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzExMDYxNCwiZXhwIjoxOTQ4Njg2NjE0fQ.xi6PzOJLWBSB4YNdcvLn1tKsLiLgDQ5YobY3OZCSTiI"
		);
		window.supabase = this.supabase;
		let sess = await this.supabase.auth.session();
		// console.log(sess);
		this.onSessionChange(sess);
		this.sess = sess;
		// this.refresh();
		this.supabase.auth.onAuthStateChange(async (event, sess) => {
			this.onSessionChange(sess);
			this.sess = sess;
			if (sess) {
				this.onReadyJobs.forEach(job => job());
				["lesson_work", "course_progress"].forEach(async table => {
					const store = window.localStorage.getItem(table);
					const localData = store ? JSON.parse(store) : null;
					if (localData) {
						const { data: cloudData, error } = await this.supabase
							.from(table)
							.select("*");
						if (error) {
							console.error(error);
						} else {
							Object.values(localData).forEach(localEntry => {
								const cloudLesson = cloudData.filter(elem =>
									["lessonId", "courseId"].every(primaryKey =>
										elem[primaryKey]
											? elem[primaryKey] === localEntry[primaryKey]
											: true
									)
								)[0];
								// if(cloudLesson && (new Date(cloudLesson.modified_at) > new Date(localEntry.modified_at))){
								if (cloudLesson) {
									return;
								}
								this.updateJobs[
									JSON.stringify({
										...["lessonId", "courseId"].reduce((prev, curr) => ({
											...prev,
											[curr]: localEntry[curr],
										})),
										table,
									})
								] = { table, entry: localEntry };
							});
						}
						localStorage.removeItem(table);
					}
				});
			} else {
				this.onLogoutJobs.forEach(job => job());
				this.onSaveStateChange("local_saved");
			}
			// this.refresh();
		});
		setInterval(_ => {
			Object.keys(this.updateJobs).forEach(async key => {
				const { table, entry } = this.updateJobs[key];
				let { error } = await this.supabase.from(table).upsert(entry);
				if (error) {
					console.error(error);
				} else {
					delete this.updateJobs[key];
				}
			});
			if (Object.keys(this.updateJobs).length === 0 && this.sess) {
				this.onSaveStateChange("online_saved");
			}
		}, 1000);
	}
	async login(provider, redirect = "/") {
		// const { user, session, error } = await this.supabase.auth.signIn(
		await this.supabase.auth.signIn(
			{
				provider: provider,
			},
			{
				redirectTo: redirect,
			}
		);
	}
	registerOnReady(callback) {
		this.onReadyJobs.push(callback);
		if (this.sess) {
			callback();
		}
	}
	registerOnLogout(callback) {
		this.onLogoutJobs.push(callback);
	}
	popListeners() {
		this.onReadyJobs = this.onReadyJobs.splice(0, 1);
		this.onLogoutJobs = this.onLogoutJobs.splice(0, 1);
	}
	getLocally(table, primaryKeys) {
		const store = window.localStorage.getItem(table);
		if (store) {
			const localData = JSON.parse(store)[JSON.stringify({ ...primaryKeys })];
			console.log(localData);
			return localData || null;
		} else {
			return null;
		}
	}
	setLocally(table, primaryKeys, data) {
		const store = window.localStorage.getItem(table);
		let oldData = store ? JSON.parse(store) : {};
		window.localStorage.setItem(
			table,
			JSON.stringify({
				...oldData,
				[JSON.stringify({ ...primaryKeys })]: data,
			})
		);
	}
	removeLocally(table, primaryKeys) {
		const store = window.localStorage.getItem(table);
		let oldData = store ? JSON.parse(store) : {};
		delete oldData[JSON.stringify({ ...primaryKeys })];
		window.localStorage.setItem(table, JSON.stringify(oldData));
	}
	async getStoredLessonData(courseId, lessonId) {
		if (this.sess) {
			let { data: results, error } = await this.supabase
				.from("lesson_work")
				.select("data")
				.eq("course_id", courseId)
				.eq("lesson_id", lessonId);
			// console.log("retrieved from supabase");
			if (error) {
				console.error(error);
			} else {
				return results[0] ? results[0].data : null;
			}
		}
		const localData = this.getLocally("lesson_work", { courseId, lessonId });
		return localData ? localData.data : null;
	}
	async setStoredLessonData(courseId, lessonId, data) {
		const table = "lesson_work";
		const entry = {
			course_id: courseId,
			lesson_id: lessonId,
			modified_at: new Date(Date.now()).toISOString(),
			data: data,
		};
		if (this.sess) {
			this.updateJobs[JSON.stringify({ courseId, lessonId, table })] = {
				entry,
				table,
			};
			this.onSaveStateChange("online_saving");
		} else {
			this.setLocally("lesson_work", { courseId, lessonId }, entry);
		}
	}
	async getStoredCourseData(courseId) {
		if (this.sess) {
			let { data: results, error } = await this.supabase
				.from("course_progress")
				.select("data")
				.eq("course_id", courseId);
			// console.log("retrieved from supabase");
			if (error) {
				console.error(error);
			} else {
				return results[0] ? results[0].data : null;
			}
		}
		const localData = this.getLocally("course_progress", { courseId });
		return localData ? localData.data : null;
	}
	async setStoredCourseData(courseId, data) {
		const table = "course_progress";
		const entry = {
			course_id: courseId,
			modified_at: new Date(Date.now()).toISOString(),
			data: data,
		};
		if (this.sess) {
			this.updateJobs[JSON.stringify({ courseId, table })] = { entry, table };
			this.onSaveStateChange("online_saving");
		} else {
			this.setLocally("course_progress", { courseId }, entry);
		}
	}
	async getAllStoredCourses() {
		if (this.sess) {
			let { data: results, error } = await this.supabase
				.from("course_progress")
				.select("*");
			if (error) {
				console.error(error);
			} else {
				return results ? results : null;
			}
		}
		const localData = localStorage.getItem("course_progress");
		return localData ? Object.values(localData) : null;
	}
	logout() {
		this.supabase.auth.signOut();
		// window.location.reload()
	}
}
