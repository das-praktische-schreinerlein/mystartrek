import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {LayoutService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/layout.service';
import {StarDocListItemComponent} from '../sdoc-list-item/sdoc-list-item.component';
import {StarDocContentUtils} from '../../services/sdoc-contentutils.service';

@Component({
    selector: 'app-sdoc-list-item-thin',
    templateUrl: './sdoc-list-item-thin.component.html',
    styleUrls: ['./sdoc-list-item-thin.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarDocListItemThinComponent extends StarDocListItemComponent {
    constructor(contentUtils: StarDocContentUtils, cd: ChangeDetectorRef, layoutService: LayoutService) {
        super(contentUtils, cd, layoutService);
        this.listLayoutName = 'thin';
    }
}
