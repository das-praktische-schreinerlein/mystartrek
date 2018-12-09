import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {StarDocRecord} from '../../../../shared/sdoc-commons/model/records/sdoc-record';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {CommonDocRoutingService} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-routing.service';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {StarDocContentUtils} from '../../services/sdoc-contentutils.service';
import {AbstractInlineComponent} from '@dps/mycms-frontend-commons/dist/angular-commons/components/inline.component';

@Component({
    selector: 'app-sdoc-linked-loc-hierarchy',
    templateUrl: './sdoc-linked-loc-hierarchy.component.html',
    styleUrls: ['./sdoc-linked-loc-hierarchy.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarDocLinkedLocHierarchyComponent extends AbstractInlineComponent {
    locations: any[];

    @Input()
    public record: StarDocRecord;

    @Input()
    public lastOnly? = false;

    constructor(private sanitizer: DomSanitizer, private commonRoutingService: CommonRoutingService,
                private cdocRoutingService: CommonDocRoutingService, private contentUtils: StarDocContentUtils,
                protected cd: ChangeDetectorRef) {
        super(cd);
    }

    protected updateData(): void {
        if (this.record === undefined || this.record.type === 'NEWS') {
            this.locations = [];
            return;
        }
        this.locations = this.contentUtils.getLocationHierarchy(this.record, this.lastOnly);
    }

    public submitShow(event, location): boolean {
        this.commonRoutingService.navigateByUrl(this.getUrl(location));
        return false;
    }

    public getShowUrl(location: any): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(this.getUrl(location));
    }

    private getUrl(location: any): string {
        return this.cdocRoutingService.getShowUrl(new StarDocRecord({id: location[0], name: location[1], type: 'LOCATION'}), '');
    }

}
