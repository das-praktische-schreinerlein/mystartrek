import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {StarDocSearchForm} from '../../../../shared/sdoc-commons/model/forms/sdoc-searchform';
import {StarDocSearchResult} from '../../../../shared/sdoc-commons/model/container/sdoc-searchresult';
import {Facets} from '@dps/mycms-commons/dist/search-commons/model/container/facets';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import {StarDocSearchFormUtils} from '../../services/sdoc-searchform-utils.service';
import {GeoLocationService} from '@dps/mycms-commons/dist/commons/services/geolocation.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {StarDocDataCacheService} from '../../services/sdoc-datacache.service';
import {SearchFormUtils} from '@dps/mycms-frontend-commons/dist/angular-commons/services/searchform-utils.service';
import {StarDocSearchFormConverter} from '../../services/sdoc-searchform-converter.service';
import {CommonDocSearchformComponent} from '@dps/mycms-frontend-commons/dist/frontend-cdoc-commons/components/cdoc-searchform/cdoc-searchform.component';
import {StarDocRecord} from '../../../../shared/sdoc-commons/model/records/sdoc-record';
import {StarDocDataService} from '../../../../shared/sdoc-commons/services/sdoc-data.service';

@Component({
    selector: 'app-sdoc-searchform',
    templateUrl: './sdoc-searchform.component.html',
    styleUrls: ['./sdoc-searchform.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarDocSearchformComponent extends CommonDocSearchformComponent<StarDocRecord, StarDocSearchForm, StarDocSearchResult, StarDocDataService> {
    // initialize a private variable _searchForm, it's a BehaviorSubject
    private geoLocationService = new GeoLocationService();

    public optionsSelectSubType: IMultiSelectOption[] = [];
    public optionsSelectMagnitude: IMultiSelectOption[] = [];
    public optionsSelectDimension: IMultiSelectOption[] = [];
    public optionsSelectDesignator: IMultiSelectOption[] = [];
    public optionsSelectBvcoloridx: IMultiSelectOption[] = [];

    public settingsSelectSubType: IMultiSelectSettings = this.defaultSeLectSettings;
    public settingsSelectMagnitude: IMultiSelectSettings = this.defaultSeLectSettings;
    public settingsSelectDimension: IMultiSelectSettings = this.defaultSeLectSettings;
    public settingsSelectBvcoloridx: IMultiSelectSettings = this.defaultSeLectSettings;
    public settingsSelectDesignator: IMultiSelectSettings = this.defaultSeLectSettings;

    public textsSelectSubType: IMultiSelectTexts = { checkAll: 'Alle auswählen',
        uncheckAll: 'Alle abwählen',
        checked: 'Typ ausgewählt',
        checkedPlural: 'Typ ausgewählt',
        searchPlaceholder: 'Find',
        defaultTitle: '',
        allSelected: 'alles'};
    public textsSelectMagnitude: IMultiSelectTexts = { checkAll: 'Alle auswählen',
        uncheckAll: 'Alle abwählen',
        checked: 'Helligkeit ausgewählt',
        checkedPlural: 'Helligkeit ausgewählt',
        searchPlaceholder: 'Find',
        defaultTitle: '',
        allSelected: 'Alle'};
    public textsSelectDimension: IMultiSelectTexts = { checkAll: 'Alle auswählen',
        uncheckAll: 'Alle abwählen',
        checked: 'Größe ausgewählt',
        checkedPlural: 'Größe ausgewählt',
        searchPlaceholder: 'Find',
        defaultTitle: '',
        allSelected: 'Alle'};
    public textsSelectBvcoloridx: IMultiSelectTexts = { checkAll: 'Alle auswählen',
        uncheckAll: 'Alle abwählen',
        checked: 'Farbe ausgewählt',
        checkedPlural: 'Farbe ausgewählt',
        searchPlaceholder: 'Find',
        defaultTitle: '',
        allSelected: 'Alle'};
    public textsSelectDesignator: IMultiSelectTexts = { checkAll: 'Alle auswählen',
        uncheckAll: 'Alle abwählen',
        checked: 'Helligkeit ausgewählt',
        checkedPlural: 'Helligkeit ausgewählt',
        searchPlaceholder: 'Find',
        defaultTitle: '',
        allSelected: 'Alle'};

    @Input()
    public showWhere? = this.showForm;

    @Input()
    public showWhen? = this.showForm;

    constructor(sanitizer: DomSanitizer, fb: FormBuilder, searchFormUtils: SearchFormUtils,
                private sdocSearchFormUtils: StarDocSearchFormUtils, searchFormConverter: StarDocSearchFormConverter,
                sdocDataCacheService: StarDocDataCacheService, toastr: ToastrService, cd: ChangeDetectorRef) {
        super(sanitizer, fb, searchFormUtils, sdocSearchFormUtils, searchFormConverter, sdocDataCacheService, toastr, cd);
        this.defaultSeLectSettings.dynamicTitleMaxItems = 2;
    }

    protected createDefaultSearchResult(): StarDocSearchResult {
        return new StarDocSearchResult(new StarDocSearchForm({}), 0, undefined, new Facets());
    }

    protected createDefaultFormGroup(): any {
        return this.fb.group({
            when: [],
            where: [],
            nearby: '',
            nearbyAddress: '',
            nearbyDistance: '10',
            what: [],
            moreFilter: '',
            fulltext: '',
            designator: [],
            magnitude: [],
            bvcoloridx: [],
            dimension: [],
            playlists: [],
            subtype: [],
            type: [],
            sort: '',
            perPage: 10,
            pageNum: 1
        });
    }


    protected updateFormGroup(sdocSearchSearchResult: StarDocSearchResult): void {
        const values: StarDocSearchForm = sdocSearchSearchResult.searchForm;
        this.searchFormGroup = this.fb.group({
            when: [(values.when ? values.when.split(/,/) : [])],
            what: [(values.what ? values.what.split(/,/) : [])],
            where: [(values.where ? values.where.split(/,/) : [])],
            nearbyAddress: values.nearbyAddress,
            nearbyDistance: '10',
            nearby: values.nearby,
            fulltext: values.fulltext,
            moreFilter: values.moreFilter,
            subtype: [(values.subtype ? values.subtype.split(/,/) : [])],
            designator: [(values.designator ? values.designator.split(/,/) : [])],
            magnitude: [(values.magnitude ? values.magnitude.split(/,/) : [])],
            bvcoloridx: [(values.bvcoloridx ? values.bvcoloridx.split(/,/) : [])],
            dimension: [(values.dimension ? values.dimension.split(/,/) : [])],
            playlists: [(values.playlists ? values.playlists.split(/,/) : [])],
            type: [(values.type ? values.type.split(/,/) : [])]
        });
    }

    protected updateSelectComponents(sdocSearchSearchResult: StarDocSearchResult) {
        super.updateSelectComponents(sdocSearchSearchResult);
        const me = this;

        const rawValues = this.searchFormGroup.getRawValue();
        this.optionsSelectSubType = this.searchFormUtils.moveSelectedToTop(
            this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(
                this.sdocSearchFormUtils.getSubTypeValues(sdocSearchSearchResult), true, [], true)
                .sort(function (a, b) {
                    if (a['count'] < b['count']) {
                        return 1;
                    }
                    if (a['count'] > b['count']) {
                        return -1;
                    }
                    return a.name.localeCompare(b.name);
                }),
            rawValues['subtype']);

        this.optionsSelectMagnitude = this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(
            this.sdocSearchFormUtils.getMagnitudeValues(sdocSearchSearchResult), true, [], true);
        this.optionsSelectDimension = this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(
            this.sdocSearchFormUtils.getDimensionValues(sdocSearchSearchResult), true, [], true);
        this.optionsSelectDesignator = this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(
            this.sdocSearchFormUtils.getDesignatorValues(sdocSearchSearchResult), true, [], true);
        this.optionsSelectBvcoloridx = this.searchFormUtils.getIMultiSelectOptionsFromExtractedFacetValuesList(
            this.sdocSearchFormUtils.getBVColoridxValues(sdocSearchSearchResult), true, [], true);

        const values: StarDocSearchForm = sdocSearchSearchResult.searchForm;
        const [lat, lon, dist] = this.sdocSearchFormUtils.extractNearbyPos(values.nearby);
        if (lat && lon && (values.nearbyAddress === undefined || values.nearbyAddress === '')) {
            this.geoLocationService.doReverseLookup(lat, lon).then(function (result: any) {
                me.searchFormGroup.patchValue({'nearbyAddress':
                        StarDocSearchForm.sdocFields.nearbyAddress.validator.sanitize(result.address)});
            });
        }
        if (dist) {
            this.searchFormGroup.patchValue({'nearbyDistance': dist});
        }
    }

    protected updateAvailabilityFlags(sdocSearchSearchResult: StarDocSearchResult) {
        this.showDetailsAvailable = (this.optionsSelectMagnitude.length > 0 || this.optionsSelectDesignator.length > 0
            || this.optionsSelectDimension.length > 0 || this.optionsSelectBvcoloridx.length > 0);
        this.showMetaAvailable = (this.optionsSelectPlaylists.length > 0);
    }

    updateFormState(state?: boolean): void {
        if (state !== undefined) {
            this.showForm = this.showDetails = this.showFulltext = this.showMeta = this.showSpecialFilter = this.showWhat = this.showWhen
                = this.showWhere = state;
        } else {
            this.showForm = this.showDetails || this.showFulltext || this.showMeta || this.showSpecialFilter || this.showWhat
                || this.showWhen || this.showWhere;
        }

        this.changedShowForm.emit(this.showForm);
    }
}
