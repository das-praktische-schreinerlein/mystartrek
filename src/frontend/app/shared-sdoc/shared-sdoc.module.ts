import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {StarDocListComponent} from './components/sdoc-list/sdoc-list.component';
import {StarDocListItemComponent} from './components/sdoc-list-item/sdoc-list-item.component';
import {StarDocSearchformComponent} from './components/sdoc-searchform/sdoc-searchform.component';
import {StarDocInlineSearchpageComponent} from './components/sdoc-inline-searchpage/sdoc-inline-searchpage.component';
import {AngularCommonsModule} from '@dps/mycms-frontend-commons/dist/angular-commons/angular-commons.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {NgbAccordionModule, NgbRatingModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {LightboxModule} from 'ngx-lightbox';
import {StarDocMapComponent} from './components/sdoc-map/sdoc-map.component';
import {
    StarDocLinkedLocHierarchyComponent
} from './components/sdoc-linked-loc-hierarchy/sdoc-linked-loc-hierarchy.component';
import {StarDocDistanceComponent} from './components/sdoc-distance/sdoc-distance.component';
import {StarDocDateFormatPipe} from './pipes/sdoc-dateformat.pipe';
import {DatePipe} from '@angular/common';
import {StarDocDataMetaComponent} from './components/sdoc-datameta/sdoc-datameta.component';
import {StarDocActionsComponent} from './components/sdoc-actions/sdoc-actions.component';
import {StarDocActionTagsComponent} from './components/sdoc-actiontags/sdoc-actiontags.component';
import {FileDropModule} from 'ngx-file-drop';
import {
    FrontendCommonDocCommonsModule
} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/frontend-cdoc-commons.module';
import {StarDocKeywordsComponent} from './components/sdoc-keywords/sdoc-keywords.component';
import {StarDocMultiActionHeaderComponent} from './components/sdoc-multiactionheader/sdoc-multiactionheader.component';
import {StarDocListItemSmallComponent} from './components/sdoc-list-item-small/sdoc-list-item-small.component';
import {StarDocListItemFlatComponent} from './components/sdoc-list-item-flat/sdoc-list-item-flat.component';
import {StarDocListItemThinComponent} from './components/sdoc-list-item-thin/sdoc-list-item-thin.component';
import {RouterModule} from '@angular/router';
import {StarDocListItemPageComponent} from './components/sdoc-list-item-page/sdoc-list-item-page.component';

@NgModule({
    declarations: [
        StarDocListComponent,
        StarDocListItemComponent,
        StarDocListItemSmallComponent,
        StarDocListItemFlatComponent,
        StarDocListItemPageComponent,
        StarDocListItemThinComponent,
        StarDocSearchformComponent,
        StarDocInlineSearchpageComponent,
        StarDocMapComponent,
        StarDocInlineSearchpageComponent,
        StarDocLinkedLocHierarchyComponent,
        StarDocDataMetaComponent,
        StarDocDistanceComponent,
        StarDocDateFormatPipe,
        StarDocActionsComponent,
        StarDocActionTagsComponent,
        StarDocKeywordsComponent,
        StarDocMultiActionHeaderComponent
    ],
    imports: [
        NgbAccordionModule, NgbRatingModule, NgbTabsetModule,
        ToastrModule,
        MultiselectDropdownModule,
        TranslateModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularCommonsModule,
        FrontendCommonDocCommonsModule,
        LightboxModule,
        FileDropModule,
        RouterModule
    ],
    providers: [
        DatePipe
    ],
    exports: [
        StarDocListComponent,
        StarDocListItemComponent,
        StarDocListItemSmallComponent,
        StarDocListItemFlatComponent,
        StarDocListItemPageComponent,
        StarDocListItemThinComponent,
        StarDocSearchformComponent,
        StarDocInlineSearchpageComponent,
        StarDocMapComponent,
        StarDocInlineSearchpageComponent,
        StarDocLinkedLocHierarchyComponent,
        StarDocDataMetaComponent,
        StarDocDistanceComponent,
        StarDocDateFormatPipe,
        StarDocActionsComponent,
        StarDocActionTagsComponent,
        StarDocKeywordsComponent,
        StarDocMultiActionHeaderComponent
    ]
})
export class SharedStarDocModule {}
