import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {StarDocRecord} from '../../../../shared/sdoc-commons/model/records/sdoc-record';
import {StarDocDataTechRecord} from '../../../../shared/sdoc-commons/model/records/sdocdatatech-record';
import {AbstractInlineComponent} from '@dps/mycms-frontend-commons/dist/angular-commons/components/inline.component';

@Component({
    selector: 'app-sdoc-datatech',
    templateUrl: './sdoc-datatech.component.html',
    styleUrls: ['./sdoc-datatech.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarDocDataTechComponent extends AbstractInlineComponent {
    sdocdatatech: StarDocDataTechRecord;

    @Input()
    public record: StarDocRecord;

    @Input()
    public small? = false;

    constructor(protected cd: ChangeDetectorRef) {
        super(cd);
    }

    protected updateData(): void {
        if (this.record === undefined) {
            this.sdocdatatech = undefined;
            return;
        }
        this.sdocdatatech = this.record['sdocdatatech'];
    }
}
