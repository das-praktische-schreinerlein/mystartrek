import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {StarDocRecord} from '../../../../shared/sdoc-commons/model/records/sdoc-record';
import {Layout} from '@dps/mycms-frontend-commons/dist/angular-commons/services/layout.service';
import {AngularHtmlService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/angular-html.service';
import {AngularMarkdownService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/angular-markdown.service';
import {PlatformService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/platform.service';
import {StarDocDataService} from '../../../../shared/sdoc-commons/services/sdoc-data.service';
import {StarDocSearchFormConverter} from '../../services/sdoc-searchform-converter.service';
import {StarDocContentUtils, StarDocItemData} from '../../services/sdoc-contentutils.service';
import {AbstractInlineComponent} from '@dps/mycms-frontend-commons/dist/angular-commons/components/inline.component';
import {ActionTagEvent} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-actiontags/cdoc-actiontags.component';

@Component({
    selector: 'app-sdoc-list-item-page',
    templateUrl: './sdoc-list-item-page.component.html',
    styleUrls: ['./sdoc-list-item-page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarDocListItemPageComponent extends AbstractInlineComponent {
    private flgDescRendered = false;
    public contentUtils: StarDocContentUtils;
    listItem: StarDocItemData = {
        currentRecord: undefined,
        styleClassFor: undefined,
        thumbnailUrl: undefined,
        previewUrl: undefined,
        fullUrl: undefined,
        image: undefined,
        urlShow: undefined,
        tracks: [],
        flgShowMap: false,
        flgMapAvailable: false,
    };
    maxImageHeight = '0';
    imageShowMap = false;

    @Input()
    public record: StarDocRecord;

    @Input()
    public backToSearchUrl: string;

    @Input()
    public layout: Layout;

    @Input()
    public short? = false;

    @Output()
    public show: EventEmitter<StarDocRecord> = new EventEmitter();

    @Output()
    public showImage: EventEmitter<StarDocRecord> = new EventEmitter();

    @Output()
    public playerStarted: EventEmitter<StarDocRecord> = new EventEmitter();

    @Output()
    public playerStopped: EventEmitter<StarDocRecord> = new EventEmitter();

    constructor(contentUtils: StarDocContentUtils, protected cd: ChangeDetectorRef, private platformService: PlatformService,
                private angularMarkdownService: AngularMarkdownService, private angularHtmlService: AngularHtmlService,
                private sdocDataService: StarDocDataService, private searchFormConverter: StarDocSearchFormConverter) {
        super(cd);
        this.contentUtils = contentUtils;
    }

    submitShow(sdoc: StarDocRecord) {
        this.show.emit(sdoc);
        return false;
    }

    onActionTagEvent(event: ActionTagEvent) {
        if (event.result !== undefined) {
            this.record = <StarDocRecord>event.result;
            this.updateData();
        }

        return false;
    }

    onVideoStarted() {
        this.playerStarted.emit(this.record);
    }

    onVideoEnded() {
        this.playerStopped.emit(this.record);
    }

    renderDesc(): string {
        if (this.flgDescRendered || !this.record) {
            return;
        }

        if (!this.platformService.isClient()) {
            return this.record.descTxt || '';
        }

        if (this.record.descHtml) {
            this.flgDescRendered = this.angularHtmlService.renderHtml('#desc', this.record.descHtml, true);
        } else {
            const desc = this.record.descMd ? this.record.descMd : '';
            this.flgDescRendered = this.angularMarkdownService.renderMarkdown('#desc', desc, true);
        }

        return '';
    }

    protected updateData(): void {
        const me = this;

        this.contentUtils.updateItemData(this.listItem, this.record, 'page');
        this.maxImageHeight = (window.innerHeight - 150) + 'px';
        if (this.record.type === 'IMAGE') {
            this.listItem.flgShowMap = this.listItem.flgShowMap &&  this.imageShowMap;
        }
        this.cd.markForCheck();
    }
}
