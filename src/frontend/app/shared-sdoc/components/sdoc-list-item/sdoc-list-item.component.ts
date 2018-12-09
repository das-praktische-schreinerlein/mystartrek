import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {LayoutService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/layout.service';
import {CommonDocListItemComponent} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-list-item/cdoc-list-item.component';
import {StarDocContentUtils} from '../../services/sdoc-contentutils.service';

@Component({
    selector: 'app-sdoc-list-item',
    templateUrl: './sdoc-list-item.component.html',
    styleUrls: ['./sdoc-list-item.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarDocListItemComponent  extends CommonDocListItemComponent {
    constructor(contentUtils: StarDocContentUtils, cd: ChangeDetectorRef, layoutService: LayoutService) {
        super(contentUtils, cd, layoutService);
        this.listLayoutName = 'default';
    }
}
