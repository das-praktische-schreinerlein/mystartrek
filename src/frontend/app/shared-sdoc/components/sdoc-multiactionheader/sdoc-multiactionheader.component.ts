import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {StarDocRecord} from '../../../../shared/sdoc-commons/model/records/sdoc-record';
import {StarDocDataService} from '../../../../shared/sdoc-commons/services/sdoc-data.service';
import {StarDocSearchForm} from '../../../../shared/sdoc-commons/model/forms/sdoc-searchform';
import {StarDocSearchResult} from '../../../../shared/sdoc-commons/model/container/sdoc-searchresult';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {StarDocContentUtils} from '../../services/sdoc-contentutils.service';
import {
    CommonDocMultiActionHeaderComponent,
    CommonDocMultiActionHeaderComponentConfig
} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-multiactionheader/cdoc-multiactionheader.component';
import {BeanUtils} from '@dps//mycms-commons/dist/commons/utils/bean.utils';

@Component({
    selector: 'app-sdoc-multiactionheader',
    templateUrl: '../../../../../../node_modules/@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-multiactionheader/cdoc-multiactionheader.component.html',
    styleUrls: ['../../../../../../node_modules/@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-multiactionheader/cdoc-multiactionheader.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarDocMultiActionHeaderComponent extends
    CommonDocMultiActionHeaderComponent<StarDocRecord, StarDocSearchForm, StarDocSearchResult, StarDocDataService> {
    constructor(protected appService: GenericAppService, protected contentUtils: StarDocContentUtils, protected cd: ChangeDetectorRef) {
        super(appService, contentUtils, cd);
    }

    protected getComponentConfig(config: {}): CommonDocMultiActionHeaderComponentConfig {
        if (BeanUtils.getValue(config, 'components.sdoc-multiactionheader.actionTags')) {
            return {
                tagConfigs: config['components']['sdoc-multiactionheader']['actionTags']
            };
        } else {
            console.warn('no valid tagConfigs found');
            return {
                tagConfigs: []
            };
        }
    }

}
