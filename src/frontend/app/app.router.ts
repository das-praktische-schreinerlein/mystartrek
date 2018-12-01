import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SectionsPDocsResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/sections-pdocs.resolver';
import {ErrorPageComponent} from './components/errorpage/errorpage.component';
import {SectionComponent} from '@dps/mycms-frontend-commons/dist/frontend-pdoc-commons/components/section/section.component';
import {SectionBarComponent} from '@dps/mycms-frontend-commons/dist/frontend-pdoc-commons/components/sectionbar/sectionbar.component';
import {SectionsPDocRecordResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/sections-pdoc-details.resolver';
import {SectionsBaseUrlResolver} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/resolver/sections-baseurl.resolver';
import {SectionPageComponent} from '@dps/mycms-frontend-commons/dist/frontend-pdoc-commons/components/sectionpage/section-page.component';

export const appRoutes: Routes = [
    {
        path: 'errorpage',
        pathMatch: 'full',
        component: ErrorPageComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/pages/start'
    },
    {
        path: '',
        outlet: 'navbar',
        component: NavbarComponent,
        resolve: {
            pdocs: SectionsPDocsResolver,
        },
    },
    {
        path: 'sections',
        children: [
            {
                path: ':section',
                component: SectionComponent,
                children: [
                    {
                        path: '',
                        outlet: 'sectionbar',
                        component: SectionBarComponent,
                        resolve: {
                            pdoc: SectionsPDocRecordResolver
                        }
                    },
                    {
                        path: '',
                        pathMatch: 'full',
                        component: SectionPageComponent,
                        data: {
                            id: 'sections_section',
                        },
                        resolve: {
                            pdoc: SectionsPDocRecordResolver,
                            baseSearchUrl: SectionsBaseUrlResolver
                        },
                    }
                ]
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/pages/start',
        data: {
            id: 'global_fallback'
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
