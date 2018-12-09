import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {StarDocRecord} from '../../../../shared/sdoc-commons/model/records/sdoc-record';
import {StarDocDataInfoRecord} from '../../../../shared/sdoc-commons/model/records/sdocdatainfo-record';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {AbstractInlineComponent} from '@dps/mycms-frontend-commons/dist/angular-commons/components/inline.component';

@Component({
    selector: 'app-sdoc-datainfo',
    templateUrl: './sdoc-datainfo.component.html',
    styleUrls: ['./sdoc-datainfo.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarDocDataInfoComponent extends AbstractInlineComponent {
    sdocdatainfo: StarDocDataInfoRecord;
    guides: SafeHtml = '';

    @Input()
    public record: StarDocRecord;

    @Input()
    public small? = false;

    constructor(private sanitizer: DomSanitizer, protected cd: ChangeDetectorRef) {
        super(cd);
    }

    protected updateData(): void {
        if (this.record === undefined) {
            this.sdocdatainfo = undefined;
            return;
        }
        this.sdocdatainfo = this.record['sdocdatainfo'];
        let guidesTxt = '';
        if (this.sdocdatainfo && this.sdocdatainfo.guides) {
            this.sdocdatainfo.guides.split(';').forEach(value => {
                guidesTxt += value.startsWith('http') ? '<a href="' + value + '">' + value + '</a> ' : value;
            });
        }
        this.guides = this.sanitizer.bypassSecurityTrustHtml(guidesTxt);
    }
}
