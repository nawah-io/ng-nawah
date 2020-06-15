import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgNawahModule } from 'projects/ng-nawah/src/public_api';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
	],
	exports: [
		NgNawahModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
