import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {GeoDocRecord} from '../../../../shared/gdoc-commons/model/records/gdoc-record';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {CommonDocRoutingService} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-routing.service';
import {CommonRoutingService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/common-routing.service';
import {GeoDocContentUtils} from '../../services/gdoc-contentutils.service';
import {AbstractInlineComponent} from '@dps/mycms-frontend-commons/dist/angular-commons/components/inline.component';

@Component({
    selector: 'app-gdoc-linked-loc-hierarchy',
    templateUrl: './gdoc-linked-loc-hierarchy.component.html',
    styleUrls: ['./gdoc-linked-loc-hierarchy.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoDocLinkedLocHierarchyComponent extends AbstractInlineComponent {
    locations: any[];

    @Input()
    public record: GeoDocRecord;

    @Input()
    public lastOnly? = false;

    constructor(private sanitizer: DomSanitizer, private commonRoutingService: CommonRoutingService,
                private cdocRoutingService: CommonDocRoutingService, private contentUtils: GeoDocContentUtils,
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
        return this.cdocRoutingService.getShowUrl(new GeoDocRecord({id: location[0], name: location[1], type: 'LOCATION'}), '');
    }

}
