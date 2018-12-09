import {Injectable} from '@angular/core';
import {StarDocRecord} from '../../../shared/sdoc-commons/model/records/sdoc-record';
import {CommonDocPlaylistService} from '@dps/mycms-commons/dist/search-commons/services/cdoc-playlist.service';
import {CommonDocContentUtils} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-contentutils.service';

@Injectable()
export class StarDocPlaylistService extends CommonDocPlaylistService<StarDocRecord> {

    constructor(protected contentUtils: CommonDocContentUtils) {
        super();
    }

    generateM3uEntityPath(pathPrefix: string, record: StarDocRecord): string {
        return this.contentUtils.getPreferredFullMediaUrl(record);
    }
}
