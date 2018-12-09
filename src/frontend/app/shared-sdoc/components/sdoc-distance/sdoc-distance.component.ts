import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {StarDocRecord} from '../../../../shared/sdoc-commons/model/records/sdoc-record';
import {AbstractInlineComponent} from '@dps/mycms-frontend-commons/dist/angular-commons/components/inline.component';

@Component({
    selector: 'app-sdoc-distance',
    templateUrl: './sdoc-distance.component.html',
    styleUrls: ['./sdoc-distance.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarDocDistanceComponent extends AbstractInlineComponent {
    distance: number;

    @Input()
    public record: StarDocRecord;

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
