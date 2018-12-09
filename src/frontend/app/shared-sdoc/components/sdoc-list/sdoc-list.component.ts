import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {StarDocRecord} from '../../../../shared/sdoc-commons/model/records/sdoc-record';
import {StarDocSearchResult} from '../../../../shared/sdoc-commons/model/container/sdoc-searchresult';
import {StarDocSearchFormConverter} from '../../services/sdoc-searchform-converter.service';
import {StarDocLightBoxService} from '../../services/sdoc-lightbox.service';
import {Layout} from '@dps/mycms-frontend-commons/dist/angular-commons/services/layout.service';
import {StarDocSearchForm} from '../../../../shared/sdoc-commons/model/forms/sdoc-searchform';
import {CommonDocListComponent} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-list/cdoc-list.component';
import {CommonDocLightboxAlbumConfig} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-lightbox.service';

@Component({
    selector: 'app-sdoc-list',
    templateUrl: './sdoc-list.component.html',
    styleUrls: ['./sdoc-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarDocListComponent extends CommonDocListComponent<StarDocRecord, StarDocSearchForm, StarDocSearchResult> {
    @Output()
    public playerStarted: EventEmitter<StarDocRecord> = new EventEmitter();

    @Output()
    public playerStopped: EventEmitter<StarDocRecord> = new EventEmitter();

    public Layout = Layout;

    private lightboxAlbumConfig: CommonDocLightboxAlbumConfig = {
        album: [],
        idPos: {}
    };

    constructor(private searchFormConverter: StarDocSearchFormConverter,
                private lightboxService: StarDocLightBoxService, protected cd: ChangeDetectorRef) {
        super(cd);
    }

    onShowImage(record: StarDocRecord) {
        if (record.type === 'IMAGE') {
            this.lightboxService.openId(this.lightboxAlbumConfig, record.id);
        } else {
            this.show.emit(record);
        }
        return false;
    }

    onPlayerStarted(sdoc: StarDocRecord) {
        this.playerStarted.emit(sdoc);
    }

    onPlayerStopped(sdoc: StarDocRecord) {
        this.playerStopped.emit(sdoc);
    }

    getBackToSearchUrl(searchResult: StarDocSearchResult): string {
        return (searchResult.searchForm ?
            this.searchFormConverter.searchFormToUrl(this.baseSearchUrl, searchResult.searchForm) : undefined);
    }

    protected updateData(): void {
        this.lightboxAlbumConfig = this.lightboxService.createAlbumConfig(this.searchResult);
    }
}
