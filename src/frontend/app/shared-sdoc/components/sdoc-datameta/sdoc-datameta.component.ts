import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {StarDocRecord} from '../../../../shared/sdoc-commons/model/records/sdoc-record';
import {AbstractInlineComponent} from '@dps/mycms-frontend-commons/dist/angular-commons/components/inline.component';

@Component({
    selector: 'app-sdoc-datameta',
    templateUrl: './sdoc-datameta.component.html',
    styleUrls: ['./sdoc-datameta.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarDocDataMetaComponent extends AbstractInlineComponent {
    sdocdatameta: StarDocRecord;

    @Input()
    public record: StarDocRecord;

    @Input()
    public small? = false;

    constructor(protected cd: ChangeDetectorRef) {
        super(cd);
    }

    protected updateData(): void {
        if (this.record === undefined) {
            this.sdocdatameta = undefined;
            return;
        }
        this.sdocdatameta = this.record;
    }
}
