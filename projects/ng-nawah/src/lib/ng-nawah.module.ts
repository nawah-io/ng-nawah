import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { CacheService } from './cache.service'
import { NawahService } from './ng-nawah.service';

@NgModule({
	declarations: [],
	imports: [
		HttpClientModule,
	],
	exports: [],
	providers: [
		CookieService,
		CacheService,
		NawahService,
	]
})
export class NgNawahModule { }