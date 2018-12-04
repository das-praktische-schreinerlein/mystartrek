import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {LayoutService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/layout.service';
import {GeoDocListItemComponent} from '../gdoc-list-item/gdoc-list-item.component';
import {GeoDocContentUtils} from '../../services/gdoc-contentutils.service';

@Component({
    selector: 'app-gdoc-list-item-flat',
    templateUrl: './gdoc-list-item-flat.component.html',
    styleUrls: ['./gdoc-list-item-flat.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoDocListItemFlatComponent extends GeoDocListItemComponent {
    constructor(contentUtils: GeoDocContentUtils, cd: ChangeDetectorRef, layoutService: LayoutService) {
        super(contentUtils, cd, layoutService);
        this.listLayoutName = 'flat';
    }
}
