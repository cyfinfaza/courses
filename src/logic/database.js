import { createClient } from "@supabase/supabase-js";

export default class DatabaseInterface {
	constructor(sessionChangeCallback) {
		this.onSessionChange = sessionChangeCallback;
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
		console.log(sess);
		this.onSessionChange(sess);
		this.sess = sess;
		// this.refresh();
		this.supabase.auth.onAuthStateChange(async (event, sess) => {
			this.onSessionChange(sess);
			this.sess = sess;
			if (sess) {
				this.onReadyJobs.forEach(job => job());
				const store = window.localStorage.getItem("lesson_work");
				const localData = store ? JSON.parse(store) : null;
				if (localData) {
					const { data: cloudData, error } = await this.supabase
						.from("lesson_work")
						.select("*");
					if (error) {
						console.error(error);
					} else {
						Object.values(localData).forEach(localLesson => {
							const cloudLesson = cloudData.filter(
								elem =>
									elem.courseId == localLesson.courseId &&
									elem.lessonId == localLesson.lessonId
							)[0];
							// if(cloudLesson && (new Date(cloudLesson.modified_at) > new Date(localLesson.modified_at))){
							if (cloudLesson) {
								// this.removeLocally({
								// 	courseId: localLesson.courseId,
								// 	lessonId: localLesson.lessonId,
								// });
								return;
							}
							this.updateJobs[
								JSON.stringify({
									courseId: localLesson.courseId,
									lessonId: localLesson.lessonId,
								})
							] = localLesson;
						});
					}
					localStorage.removeItem("lesson_work");
				}
			} else {
				this.onLogoutJobs.forEach(job => job());
			}
			// this.refresh();
		});
		setInterval(_ => {
			Object.keys(this.updateJobs).forEach(async key => {
				let { error } = await this.supabase
					.from("lesson_work")
					.upsert(this.updateJobs[key]);
				if (error) {
					console.error(error);
				} else {
					delete this.updateJobs[key];
				}
			});
		}, 1000);
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
	getLocally({ courseId, lessonId }) {
		const store = window.localStorage.getItem("lesson_work");
		if (store) {
			const localData =
				JSON.parse(store)[JSON.stringify({ courseId, lessonId })];
			console.log(localData);
			return localData ? JSON.parse(localData.data) : null;
		} else {
			return null;
		}
	}
	setLocally({ courseId, lessonId }, data) {
		const store = window.localStorage.getItem("lesson_work");
		let oldData = store ? JSON.parse(store) : {};
		window.localStorage.setItem(
			"lesson_work",
			JSON.stringify({
				...oldData,
				[JSON.stringify({ courseId, lessonId })]: data,
			})
		);
	}
	removeLocally({ courseId, lessonId }) {
		const store = window.localStorage.getItem("lesson_work");
		let oldData = store ? JSON.parse(store) : {};
		delete oldData[JSON.stringify({ courseId, lessonId })];
		window.localStorage.setItem("lesson_work", JSON.stringify(oldData));
	}
	async getStoredLessonData(courseId, lessonId) {
		if (this.sess) {
			let { data: results, error } = await this.supabase
				.from("lesson_work")
				.select("data")
				.eq("course_id", courseId)
				.eq("lesson_id", lessonId);
			console.log(results);
			// console.log("retrieved from supabase");
			if (error) {
				console.error(error);
			} else {
				return results[0] ? JSON.parse(results[0].data) : null;
			}
		}
		return this.getLocally({ courseId, lessonId });
	}
	async setStoredLessonData(courseId, lessonId, data) {
		const newData = {
			course_id: courseId,
			lesson_id: lessonId,
			modified_at: new Date(Date.now()).toISOString(),
			data: JSON.stringify(data),
		};
		if (this.sess) {
			this.updateJobs[{ courseId, lessonId }] = newData;
		} else {
			this.setLocally({ courseId, lessonId }, newData);
		}
	}
	logout() {
		this.supabase.auth.signOut();
		// window.location.reload()
	}
}
