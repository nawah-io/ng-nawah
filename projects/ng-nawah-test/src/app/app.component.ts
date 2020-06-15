import { Component, OnInit } from '@angular/core';

import { NawahService, Res, Doc } from 'projects/ng-nawah/src/public_api';
// import { NawahService, Res, Doc } from 'ng-nawah';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'ng-nawah-test';
	retryCount: number = 3;

	constructor(public nawah: NawahService) { }

	ngOnInit() {
		this.nawah.inited$.subscribe((init) => {
			if (init) {
				try {
					this.nawah.checkAuth();
				} catch (err) {
					console.log(err);
				}
			} else {
				console.log('will try to reconnect');
				if (this.retryCount > 0) {
					this.retryCount--;
					this.init();
				} else {
					alert('I\'m dead');
				}
			}
		});
		this.nawah.authed$.subscribe((session: Doc) => {
			console.log('authed$.session', session);
			if (session) {
				window.history.replaceState('Object', 'Title', '/authed');
			} else {
				window.history.replaceState('Object', 'Title', '/not-authed');
			}
		});
	}

	init(): void {
		this.nawah.init({
			api: 'ws://localhost:8081/ws',
			anonToken: '__ANON_TOKEN_f00000000000000000000012',
			authAttrs: ['email'],
			appId: '5e082e470a38bd02f993081a',
			debug: true
		});
	}

	auth(): void {
		this.nawah.auth('email', 'admin@app.nawah', 'S0mE_V3Ry_STR0nG_P@SsW0rD', ['f00000000000000000000013']);
		//.subscribe((res) => { alert('Authed succefully!') });
	}

	signout(): void {
		this.nawah.signout();
		//.subscribe((res) => { alert('Singed-out succefully!') });
	}

	submit(): void {
		this.nawah.call({
			endpoint: 'staff/create',
			doc: {
				name: {
					ar_AE: 'staff ar',
					en_AE: 'staff en'
				},
				bio: {
					ar_AE: 'bio ar',
					en_AE: 'bio en'
				},
				jobtitle: {
					ar_AE: 'jobtitle ar',
					en_AE: 'jobtitle en'
				},
				photo: document.querySelector('input').files,
			},
			awaitAuth: true
		}).subscribe((res: Res<Doc>) => {
			console.log('submit.res', res);
		}, (err: Res<Doc>) => {
			console.log('submit.err', err);
		});
	}

	createblogcat(): void {
		this.nawah.call({
			endpoint: 'blog_cat/create',
			doc: {
				title: {
					ar_AE: 'staff ar',
					en_AE: 'staff en'
				},
				desc: {
					ar_AE: 'staff ar',
					en_AE: 'staff en'
				}
			},
			awaitAuth: true
		}).subscribe((res: Res<Doc>) => {
			console.log('createblogcat.res', res);
		}, (err: Res<Doc>) => {
			console.log('createblogcat.err', err);
		});
	}
}
