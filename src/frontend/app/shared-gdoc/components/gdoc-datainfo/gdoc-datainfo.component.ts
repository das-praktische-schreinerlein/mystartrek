import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {GeoDocRecord} from '../../../../shared/gdoc-commons/model/records/gdoc-record';
import {GeoDocDataInfoRecord} from '../../../../shared/gdoc-commons/model/records/gdocdatainfo-record';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {AbstractInlineComponent} from '@dps/mycms-frontend-commons/dist/angular-commons/components/inline.component';

@Component({
    selector: 'app-gdoc-datainfo',
    templateUrl: './gdoc-datainfo.component.html',
    styleUrls: ['./gdoc-datainfo.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoDocDataInfoComponent extends AbstractInlineComponent {
    gdocdatainfo: GeoDocDataInfoRecord;
    guides: SafeHtml = '';

    @Input()
    public record: GeoDocRecord;

    @Input()
    public small? = false;

    constructor(private sanitizer: DomSanitizer, protected cd: ChangeDetectorRef) {
        super(cd);
    }

    protected updateData(): void {
        if (this.record === undefined) {
            this.gdocdatainfo = undefined;
            return;
        }
        this.gdocdatainfo = this.record['gdocdatainfo'];
        let guidesTxt = '';
        if (this.gdocdatainfo && this.gdocdatainfo.guides) {
            this.gdocdatainfo.guides.split(';').forEach(value => {
                guidesTxt += value.startsWith('http') ? '<a href="' + value + '">' + value + '</a> ' : value;
            });
        }
        this.guides = this.sanitizer.bypassSecurityTrustHtml(guidesTxt);
    }
}
