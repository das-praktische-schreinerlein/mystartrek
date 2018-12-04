import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {LayoutService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/layout.service';
import {GeoDocListItemComponent} from '../gdoc-list-item/gdoc-list-item.component';
import {GeoDocContentUtils} from '../../services/gdoc-contentutils.service';

@Component({
    selector: 'app-gdoc-list-item-small',
    templateUrl: './gdoc-list-item-small.component.html',
    styleUrls: ['./gdoc-list-item-small.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoDocListItemSmallComponent extends GeoDocListItemComponent {
    constructor(contentUtils: GeoDocContentUtils, cd: ChangeDetectorRef, layoutService: LayoutService) {
        super(contentUtils, cd, layoutService);
        this.listLayoutName = 'small';
    }
}
