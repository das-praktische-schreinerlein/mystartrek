import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {LayoutService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/layout.service';
import {CommonDocListItemComponent} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-list-item/cdoc-list-item.component';
import {GeoDocContentUtils} from '../../services/gdoc-contentutils.service';

@Component({
    selector: 'app-gdoc-list-item',
    templateUrl: './gdoc-list-item.component.html',
    styleUrls: ['./gdoc-list-item.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoDocListItemComponent  extends CommonDocListItemComponent {
    constructor(contentUtils: GeoDocContentUtils, cd: ChangeDetectorRef, layoutService: LayoutService) {
        super(contentUtils, cd, layoutService);
        this.listLayoutName = 'default';
    }
}
