import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {StarDocRecord} from '../../../shared/sdoc-commons/model/records/sdoc-record';
import {GenericAppService} from '@dps/mycms-commons/dist/commons/services/generic-app.service';
import {
    CommonDocRoutingService
} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-routing.service';
import {
    CommonDocContentUtils,
    CommonDocContentUtilsConfig,
    CommonItemData
} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/services/cdoc-contentutils.service';

export interface StarDocItemData extends CommonItemData {
    tracks?: StarDocRecord[];
    flgShowMap?: boolean;
    flgMapAvailable?: boolean;
}

@Injectable()
export class StarDocContentUtils extends CommonDocContentUtils {
    constructor(sanitizer: DomSanitizer, cdocRoutingService: CommonDocRoutingService, appService: GenericAppService) {
        super(sanitizer, cdocRoutingService, appService);
    }

    getLocationHierarchy(record: StarDocRecord, lastOnly: boolean): any[] {
        if (record.bvcoloridx === undefined || record.dimension === undefined) {
            return [];
        }

        const hierarchyTexts = record.bvcoloridx.split(' -> ');
        const hierarchyIds = record.dimension.split(',');
        if (hierarchyIds.length !== hierarchyTexts.length) {
            return [];
        }

        const hierarchy = [];
        let lastIndex = hierarchyTexts.length - 1;
        if (record.type === 'LOCATION' && hierarchy.length > 1) {
            lastIndex--;
        }

        for (let i = lastOnly ? lastIndex : 0; i < hierarchyTexts.length; i++) {
            if (hierarchyIds[i] !== undefined && hierarchyTexts[i] !== undefined && hierarchyTexts[i].length > 0) {
                hierarchy.push(['LOCATION_' + hierarchyIds[i], hierarchyTexts[i]]);
            }
        }

        return hierarchy;
    }

    getStyleClassForRecord(record: StarDocRecord, layout: string): string[] {
        const value = record['sdocratepers'] || {gesamt: 0};
        const rate = Math.round(((value['gesamt'] || 0) / 3) + 0.5);
        return ['list-item-persrate-' + rate, 'list-item-' + layout + '-persrate-' + rate];
    }

    getStarDocSubItemFiltersForType(record: StarDocRecord, type: string, theme: string, minPerPage?: number): any {
        const filters = {
            type: type
        };

        // filter theme only for locations
        if (record.type === 'LOCATION' && theme !== undefined) {
            filters['theme'] = theme;
        }
        filters['sort'] = 'ratePers';

        if (record.type === 'LOCATION') {
            if (type === 'LOCATION') {
                filters['moreFilter'] = 'loc_parent_id_i:' + record.locId;
                filters['sort'] = 'location';
            } else {
                filters['moreFilter'] = 'loc_lochirarchie_ids_txt:' + record.locId;
                if (type === 'IMAGE') {
                    filters['perPage'] = 12;
                }
            }
        } else if (record.type === 'IMAGE') {
            if (type === 'TOPIMAGE') {
                filters['moreFilter'] = 'track_id_i:' + -1;
            } else if (type === 'LOCATION' && record.locId) {
                filters['moreFilter'] = 'loc_id_i:' + record.locId;
            } else {
                filters['moreFilter'] = 'image_id_i:' + record.imageId;
            }
        }

        if (minPerPage && minPerPage > 0 && minPerPage > filters['perPage']) {
            filters['perPage'] = minPerPage;
        }

        return filters;
    }

    updateItemData(itemData: StarDocItemData, record: StarDocRecord, layout: string): boolean {
        super.updateItemData(itemData, record, layout);
        if (record === undefined) {
            itemData.flgShowMap = false;
            itemData.tracks = [];
            return false;
        }

        itemData.styleClassFor = this.getStyleClassForRecord(<StarDocRecord>itemData.currentRecord, layout);

        if (itemData.currentRecord['sdocimages'] !== undefined && itemData.currentRecord['sdocimages'].length > 0) {
            itemData.image = itemData.currentRecord['sdocimages'][0];
            itemData.thumbnailUrl = this.getThumbnailUrl(itemData.image);
            itemData.previewUrl = this.getPreviewUrl(itemData.image);
            itemData.fullUrl = this.getFullUrl(itemData.image);
        } else if (itemData.currentRecord['sdocvideos'] !== undefined && itemData.currentRecord['sdocvideos'].length > 0) {
            itemData.video = itemData.currentRecord['sdocvideos'][0];
            itemData.thumbnailUrl = this.getVideoThumbnailUrl(itemData.video);
            itemData.previewUrl = this.getVideoPreviewUrl(itemData.video);
            itemData.fullUrl = this.getFullVideoUrl(itemData.video);
        }

        if (record !== undefined && (record.designator || record.geoLoc !== undefined
            || (record.magnitude !== undefined && record.magnitude.length > 20))) {
            itemData.tracks = [record];
            itemData.flgMapAvailable = true;
        } else {
            itemData.tracks = [];
            itemData.flgMapAvailable = false;
        }

        itemData.flgShowMap = itemData.flgMapAvailable;
    }

    protected getServiceConfig(): CommonDocContentUtilsConfig {
        return {
            cdocRecordRefIdField: 'sdoc_id',
            cdocAudiosKey: 'sdocaudios',
            cdocImagesKey: 'sdocimages',
            cdocVideosKey: 'sdocvideos'
        };
    }
}
