import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {GeoDocRecord} from '../../../../shared/gdoc-commons/model/records/gdoc-record';
import {Layout} from '@dps/mycms-frontend-commons/dist/angular-commons/services/layout.service';
import {AngularHtmlService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/angular-html.service';
import {AngularMarkdownService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/angular-markdown.service';
import {PlatformService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/platform.service';
import {GeoDocDataService} from '../../../../shared/gdoc-commons/services/gdoc-data.service';
import {GeoDocSearchFormConverter} from '../../services/gdoc-searchform-converter.service';
import {GeoDocContentUtils, GeoDocItemData} from '../../services/gdoc-contentutils.service';
import {AbstractInlineComponent} from '@dps/mycms-frontend-commons/dist/angular-commons/components/inline.component';
import {ActionTagEvent} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-actiontags/cdoc-actiontags.component';

@Component({
    selector: 'app-gdoc-list-item-page',
    templateUrl: './gdoc-list-item-page.component.html',
    styleUrls: ['./gdoc-list-item-page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoDocListItemPageComponent extends AbstractInlineComponent {
    private flgDescRendered = false;
    public contentUtils: GeoDocContentUtils;
    listItem: GeoDocItemData = {
        currentRecord: undefined,
        styleClassFor: undefined,
        thumbnailUrl: undefined,
        previewUrl: undefined,
        fullUrl: undefined,
        image: undefined,
        urlShow: undefined,
        tracks: [],
        flgShowMap: false,
        flgShowProfileMap: false,
        flgMapAvailable: false,
        flgProfileMapAvailable: false
    };
    maxImageHeight = '0';
    imageShowMap = false;

    @Input()
    public record: GeoDocRecord;

    @Input()
    public backToSearchUrl: string;

    @Input()
    public layout: Layout;

    @Input()
    public short? = false;

    @Output()
    public show: EventEmitter<GeoDocRecord> = new EventEmitter();

    @Output()
    public showImage: EventEmitter<GeoDocRecord> = new EventEmitter();

    @Output()
    public playerStarted: EventEmitter<GeoDocRecord> = new EventEmitter();

    @Output()
    public playerStopped: EventEmitter<GeoDocRecord> = new EventEmitter();

    constructor(contentUtils: GeoDocContentUtils, protected cd: ChangeDetectorRef, private platformService: PlatformService,
                private angularMarkdownService: AngularMarkdownService, private angularHtmlService: AngularHtmlService,
                private gdocDataService: GeoDocDataService, private searchFormConverter: GeoDocSearchFormConverter) {
        super(cd);
        this.contentUtils = contentUtils;
    }

    submitShow(gdoc: GeoDocRecord) {
        this.show.emit(gdoc);
        return false;
    }

    onActionTagEvent(event: ActionTagEvent) {
        if (event.result !== undefined) {
            this.record = <GeoDocRecord>event.result;
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
            this.listItem.flgShowProfileMap = this.listItem.flgShowProfileMap &&  this.imageShowMap;
        }
        this.cd.markForCheck();
    }
}
