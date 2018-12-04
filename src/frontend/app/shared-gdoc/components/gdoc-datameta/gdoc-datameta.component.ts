import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {GeoDocRecord} from '../../../../shared/gdoc-commons/model/records/gdoc-record';
import {AbstractInlineComponent} from '@dps/mycms-frontend-commons/dist/angular-commons/components/inline.component';

@Component({
    selector: 'app-gdoc-datameta',
    templateUrl: './gdoc-datameta.component.html',
    styleUrls: ['./gdoc-datameta.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoDocDataMetaComponent extends AbstractInlineComponent {
    gdocdatameta: GeoDocRecord;

    @Input()
    public record: GeoDocRecord;

    @Input()
    public small? = false;

    constructor(protected cd: ChangeDetectorRef) {
        super(cd);
    }

    protected updateData(): void {
        if (this.record === undefined) {
            this.gdocdatameta = undefined;
            return;
        }
        this.gdocdatameta = this.record;
    }
}
