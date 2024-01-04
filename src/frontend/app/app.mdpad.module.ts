import {NgModule} from '@angular/core';
import {AppComponent} from './components/app/app.component';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {RouterModule, Routes} from '@angular/router';
import {AppViewerModule} from './app.viewer.module';

registerLocaleData(localeDe);

export const mdpadRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/mdpad/editor'
    }
];


@NgModule({
    imports: [
        RouterModule.forChild(mdpadRoutes),
    ],
    exports: [
        RouterModule
    ]
})
export class AppMdPadFirstRoutingModule {}

@NgModule({
    imports: [
        RouterModule.forRoot(mdpadRoutes, // must be imported last !!!!
            { enableTracing: true } // <-- debugging purposes only
        ),
    ],
    exports: [
        RouterModule
    ]
})
export class AppMdPadGlobalRoutingModule {}

@NgModule({
    entryComponents: [
    ],
    imports: [
        AppMdPadFirstRoutingModule,
        AppViewerModule,
        AppMdPadGlobalRoutingModule
    ],
    // Since the bootstrapped component is not inherited from your
    // imported AppModule, it needs to be repeated here.
    bootstrap: [AppComponent]
})
export class AppMdPadModule {}
