import {Injectable} from '@angular/core';
import {GeoDocRecord} from '../../../shared/gdoc-commons/model/records/gdoc-record';
import {CommonDocPlaylistService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-playlist.service';
import {CommonDocContentUtils} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-contentutils.service';

@Injectable()
export class GeoDocPlaylistService extends CommonDocPlaylistService<GeoDocRecord> {

    constructor(protected contentUtils: CommonDocContentUtils) {
        super();
    }

    generateM3uEntityPath(pathPrefix: string, record: GeoDocRecord): string {
        return this.contentUtils.getPreferredFullMediaUrl(record);
    }
}
