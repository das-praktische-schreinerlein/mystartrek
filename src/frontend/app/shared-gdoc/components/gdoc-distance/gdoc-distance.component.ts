import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {GeoDocRecord} from '../../../../shared/gdoc-commons/model/records/gdoc-record';
import {AbstractInlineComponent} from '@dps/mycms-frontend-commons/dist/angular-commons/components/inline.component';

@Component({
    selector: 'app-gdoc-distance',
    templateUrl: './gdoc-distance.component.html',
    styleUrls: ['./gdoc-distance.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoDocDistanceComponent extends AbstractInlineComponent {
    distance: number;

    @Input()
    public record: GeoDocRecord;

    constructor(protected cd: ChangeDetectorRef) {
        super(cd);
    }

    calcDistance(distance: number): number {
        return Math.round(distance + 0.5);
    }

    protected updateData(): void {
        if (this.record === undefined) {
            this.distance = undefined;
            return;
        }
        this.distance = this.record['geoDistance'];
    }
}
