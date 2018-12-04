import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {GeoDocRecord} from '../../../../shared/gdoc-commons/model/records/gdoc-record';
import {GeoDocDataService} from '../../../../shared/gdoc-commons/services/gdoc-data.service';
import {GeoDocSearchForm} from '../../../../shared/gdoc-commons/model/forms/gdoc-searchform';
import {GeoDocSearchResult} from '../../../../shared/gdoc-commons/model/container/gdoc-searchresult';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {GeoDocContentUtils} from '../../services/gdoc-contentutils.service';
import {
    CommonDocMultiActionHeaderComponent,
    CommonDocMultiActionHeaderComponentConfig
} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-multiactionheader/cdoc-multiactionheader.component';
import {BeanUtils} from '@dps//mycms-commons/dist/commons/utils/bean.utils';

@Component({
    selector: 'app-gdoc-multiactionheader',
    templateUrl: '../../../../../../node_modules/@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-multiactionheader/cdoc-multiactionheader.component.html',
    styleUrls: ['../../../../../../node_modules/@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-multiactionheader/cdoc-multiactionheader.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoDocMultiActionHeaderComponent extends
    CommonDocMultiActionHeaderComponent<GeoDocRecord, GeoDocSearchForm, GeoDocSearchResult, GeoDocDataService> {
    constructor(protected appService: GenericAppService, protected contentUtils: GeoDocContentUtils, protected cd: ChangeDetectorRef) {
        super(appService, contentUtils, cd);
    }

    protected getComponentConfig(config: {}): CommonDocMultiActionHeaderComponentConfig {
        if (BeanUtils.getValue(config, 'components.gdoc-multiactionheader.actionTags')) {
            return {
                tagConfigs: config['components']['gdoc-multiactionheader']['actionTags']
            };
        } else {
            console.warn('no valid tagConfigs found');
            return {
                tagConfigs: []
            };
        }
    }

}
