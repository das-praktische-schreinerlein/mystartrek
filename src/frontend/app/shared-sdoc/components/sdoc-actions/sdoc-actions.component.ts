import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {StarDocRecord} from '../../../../shared/sdoc-commons/model/records/sdoc-record';
import {StarDocDynamicComponentService} from '../../services/sdoc-dynamic-components.service';
import {StarDocDataService} from '../../../../shared/sdoc-commons/services/sdoc-data.service';
import {ToastrService} from 'ngx-toastr';
import {
    CommonDocActionsComponent,
    CommonDocActionsComponentConfig
} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-actions/cdoc-actions.component';
import {StarDocSearchForm} from '../../../../shared/sdoc-commons/model/forms/sdoc-searchform';
import {StarDocSearchResult} from '../../../../shared/sdoc-commons/model/container/sdoc-searchresult';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {StarDocActionTagService} from '../../services/sdoc-actiontag.service';

@Component({
    selector: 'app-sdoc-action',
    templateUrl: './../../../../../../node_modules/@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-actions/cdoc-actions.component.html',
    styleUrls: ['./../../../../../../node_modules/@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-actions/cdoc-actions.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarDocActionsComponent extends CommonDocActionsComponent<StarDocRecord, StarDocSearchForm, StarDocSearchResult, StarDocDataService> {
    constructor(protected dynamicComponentService: StarDocDynamicComponentService,
                protected toastr: ToastrService,
                protected cd: ChangeDetectorRef, protected appService: GenericAppService,
                protected actionTagService: StarDocActionTagService) {
        super(dynamicComponentService, toastr, cd, appService, actionTagService);
    }

    protected getComponentConfig(config: {}): CommonDocActionsComponentConfig {
        return {
            baseEditPath: 'sdocadmin'
        };
    }

}
