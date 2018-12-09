import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';

import 'leaflet';
import {StarDocRecord} from '../../../../shared/sdoc-commons/model/records/sdoc-record';
import {MapElement} from '@dps/mycms-frontend-commons/dist/angular-maps/services/leaflet-geo.plugin';
import {PlatformService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/platform.service';
import {StarDocContentUtils} from '../../services/sdoc-contentutils.service';
import {AbstractInlineComponent} from '@dps/mycms-frontend-commons/dist/angular-commons/components/inline.component';
import * as Celestial from 'd3-celestial';
import {Feature, FeatureCollection, Point} from "geojson";
import {featureGroup} from "leaflet";

@Component({
    selector: 'app-sdoc-map',
    templateUrl: './sdoc-map.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarDocMapComponent extends AbstractInlineComponent {
    showLoadingSpinner = false;
    mapElements: MapElement[] = [];
    mapElementsReverseMap = new Map<MapElement, StarDocRecord>();
    geoJson = {
        "type": "FeatureCollection",
        "features": []
    };

    @Input()
    public mapId: string;

    @Input()
    public height: string;

    @Input()
    public sdocs: StarDocRecord[];

    @Input()
    public mapCenterPos: L.LatLng;

    @Input()
    public mapZoom: number;

    @Input()
    public showImageTrackAndGeoPos? = false;

    @Output()
    public centerChanged: EventEmitter<L.LatLng> = new EventEmitter();

    @Output()
    public sdocClicked: EventEmitter<StarDocRecord> = new EventEmitter();

    @Output()
    public mapElementsFound: EventEmitter<MapElement[]> = new EventEmitter();

    constructor(private contentUtils: StarDocContentUtils, protected cd: ChangeDetectorRef,
                private platformService: PlatformService) {
        super(cd);
    }

    onTrackClicked(mapElement: MapElement) {
        this.sdocClicked.emit(this.mapElementsReverseMap.get(mapElement));
    }

    onMapElementsLoaded(mapElements: MapElement[]) {
        this.showLoadingSpinner = false;
        this.cd.detectChanges();
    }

    renderMap() {
        this.mapElementsReverseMap.clear();
        if (!this.sdocs) {
            this.mapElements = [];
            this.showLoadingSpinner = false;
            return;
        }

        this.showLoadingSpinner = (this.sdocs.length > 0 ? true : false);
        this.geoJson.features = [];

        for (let i = 0; i < this.sdocs.length; i++) {
            const record =  this.sdocs[i];

            for (const mapElement of this.contentUtils.createMapElementForStarDoc(record, this.showImageTrackAndGeoPos)) {
                this.mapElementsReverseMap.set(mapElement, record);
            }

            const feature = {
                type: 'Feature',
                id: record.id,
                properties: {
                    n: record.name,
                    loc: [record.geoLon, record.geoLat]
                },
                geometry: {
                    type: 'Point',
                    coordinates: [record.geoLon, record.geoLat]
                }
            };
            this.geoJson.features.push(feature);
        }
        this.mapElements = Array.from(this.mapElementsReverseMap.keys());
        this.mapElementsFound.emit(this.mapElements);

        this.showLoadingSpinner = false;

        this.cd.markForCheck();
    }

    protected renderCelestial() {
        const me = this;
        const config = {
            width: 0,           // Default width, 0 = full parent element width;
                                // height is determined by projection
            projection: "aitoff",    // Map projection used: see below
            transform: "equatorial", // Coordinate transformation: equatorial (default),
                                     // ecliptic, galactic, supergalactic
            center: null,       // Initial center coordinates in set transform
                                // [longitude, latitude, orientation] all in degrees
                                // null = default center [0,0,0]
            orientationfixed: true,  // Keep orientation angle the same as center[2]
            geopos: null,       // optional initial geographic position [lat,lon] in degrees,
                                // overrides center
            follow: "zenith",   // on which coordinates to center the map, default: zenith, if location enabled,
                                // otherwise center
            adaptable: true,    // Sizes are increased with higher zoom-levels
            interactive: true,  // Enable zooming and rotation with mousewheel and dragging
            form: false,         // Display form for interactive settings  // TODO true
            location: false,    // Display location settings (no center setting on form)
            daterange: [],      // Calender date range; null: displaydate-+10; [n<100]: displaydate-+n; [yr]: yr-+10;
                                // [yr, n<100]: [yr-n, yr+n]; [yr0, yr1]
            controls: true,     // Display zoom controls
            lang: "",           // Language for names, so far only for constellations:
                                // de: german, es: spanish. Default:en or empty string for english
            container: this.mapId,   // ID of parent element, e.g. div, null = html-body
            datapath: "assets/stardata/",  // Path/URL to data files, empty = subfolder 'data'
            stars: {
                show: true,    // Show stars
                limit: 6,      // Show only stars brighter than limit magnitude
                colors: true,  // Show stars in spectral colors, if not use default color
                style: { fill: "#ffffff", opacity: 1 }, // Style for stars
                names: true,   // Show star designation (Bayer, Flamsteed, Variable star, Gliese,
                //  whichever applies first in that order)
                proper: false, // Show proper name (if one exists)
                desig: false,  // Show all designations, including Draper and Hipparcos
                namelimit: 2.5,  // Show only names/designations for stars brighter than namelimit
                namestyle: { fill: "#ddddbb", font: "11px Georgia, Times, 'Times Roman', serif",
                    align: "left", baseline: "top" },  // Style for star designations
                propernamestyle: { fill: "#ddddbb", font: "11px Georgia, Times, 'Times Roman', serif",
                    align: "right", baseline: "bottom" }, // Styles for star names
                propernamelimit: 1.5,  // Show proper names for stars brighter than propernamelimit
                size: 7,       // Maximum size (radius) of star circle in pixels
                exponent: -0.28, // Scale exponent for star size, larger = more linear
                data: 'stars.6.json' // Data source for stellar data,
                                     // number indicates limit magnitude
            },
            dsos: {
                show: true,    // Show Deep Space Objects
                limit: 6,      // Show only DSOs brighter than limit magnitude
                names: true,   // Show DSO names
                desig: true,   // Show short DSO names
                namestyle: { fill: "#cccccc", font: "11px Helvetica, Arial, serif",
                    align: "left", baseline: "top" }, // Style for DSO names
                namelimit: 6,  // Show only names for DSOs brighter than namelimit
                size: null,    // Optional seperate scale size for DSOs, null = stars.size
                exponent: 1.4, // Scale exponent for DSO size, larger = more non-linear
                data: 'dsos.bright.json', // Data source for DSOs,
                                          // opt. number indicates limit magnitude
                symbols: {  //DSO symbol styles, 'stroke'-parameter present = outline
                    gg: {shape: "circle", fill: "#ff0000"},          // Galaxy cluster
                    g:  {shape: "ellipse", fill: "#ff0000"},         // Generic galaxy
                    s:  {shape: "ellipse", fill: "#ff0000"},         // Spiral galaxy
                    s0: {shape: "ellipse", fill: "#ff0000"},         // Lenticular galaxy
                    sd: {shape: "ellipse", fill: "#ff0000"},         // Dwarf galaxy
                    e:  {shape: "ellipse", fill: "#ff0000"},         // Elliptical galaxy
                    i:  {shape: "ellipse", fill: "#ff0000"},         // Irregular galaxy
                    oc: {shape: "circle", fill: "#ffcc00",
                        stroke: "#ffcc00", width: 1.5},             // Open cluster
                    gc: {shape: "circle", fill: "#ff9900"},          // Globular cluster
                    en: {shape: "square", fill: "#ff00cc"},          // Emission nebula
                    bn: {shape: "square", fill: "#ff00cc",
                        stroke: "#ff00cc", width: 2},               // Generic bright nebula
                    sfr:{shape: "square", fill: "#cc00ff",
                        stroke: "#cc00ff", width: 2},               // Star forming region
                    rn: {shape: "square", fill: "#00ooff"},          // Reflection nebula
                    pn: {shape: "diamond", fill: "#00cccc"},         // Planetary nebula
                    snr:{shape: "diamond", fill: "#ff00cc"},         // Supernova remnant
                    dn: {shape: "square", fill: "#999999",
                        stroke: "#999999", width: 2},               // Dark nebula grey
                    pos:{shape: "marker", fill: "#cccccc",
                        stroke: "#cccccc", width: 1.5}              // Generic marker
                }
            },
            planets: {  //Show planet locations, if date-time is set
                show: false,
                // List of all objects to show
                which: ["sol", "mer", "ven", "ter", "lun", "mar", "jup", "sat", "ura", "nep"],
                // Font styles for planetary symbols
                style: { fill: "#00ccff", font: "bold 17px 'Lucida Sans Unicode', Consolas, sans-serif",
                    align: "center", baseline: "middle" },
                symbols: {  // Character and color for each symbol in 'which', simple circle \u25cf
                    "sol": {symbol: "\u2609", fill: "#ffff00"},
                    "mer": {symbol: "\u263f", fill: "#cccccc"},
                    "ven": {symbol: "\u2640", fill: "#eeeecc"},
                    "ter": {symbol: "\u2295", fill: "#00ffff"},
                    "lun": {symbol: "\u25cf", fill: "#ffffff"}, // overridden by generated cresent
                    "mar": {symbol: "\u2642", fill: "#ff9999"},
                    "cer": {symbol: "\u26b3", fill: "#cccccc"},
                    "ves": {symbol: "\u26b6", fill: "#cccccc"},
                    "jup": {symbol: "\u2643", fill: "#ff9966"},
                    "sat": {symbol: "\u2644", fill: "#ffcc66"},
                    "ura": {symbol: "\u2645", fill: "#66ccff"},
                    "nep": {symbol: "\u2646", fill: "#6666ff"},
                    "plu": {symbol: "\u2647", fill: "#aaaaaa"},
                    "eri": {symbol: "\u25cf", fill: "#eeeeee"}
                }
            },
            constellations: {
                show: true,    // Show constellations
                names: true,   // Show constellation names
                desig: true,   // Show short constellation names (3 letter designations)
                namestyle: { fill:"#cccc99", align: "center", baseline: "middle",
                    font: ["14px Helvetica, Arial, sans-serif",  // Style for constellations
                        "12px Helvetica, Arial, sans-serif",  // Different fonts for diff.
                        "11px Helvetica, Arial, sans-serif"]},// ranked constellations
                lines: true,   // Show constellation lines, style below
                linestyle: { stroke: "#cccccc", width: 1, opacity: 0.6 },
                bounds: false, // Show constellation boundaries, style below
                boundstyle: { stroke: "#cccc00", width: 0.5, opacity: 0.8, dash: [2, 4] }
            },
            mw: {
                show: true,     // Show Milky Way as filled multi-polygon outlines
                style: { fill: "#ffffff", opacity: 0.15 }  // Style for MW layers
            },
            lines: {  // Display & styles for graticule & some planes
                graticule: { show: true, stroke: "#cccccc", width: 0.6, opacity: 0.8,
                    // grid values: "outline", "center", or [lat,...] specific position
                    lon: {pos: [""], fill: "#eee", font: "10px Helvetica, Arial, sans-serif"},
                    // grid values: "outline", "center", or [lon,...] specific position
                    lat: {pos: [""], fill: "#eee", font: "10px Helvetica, Arial, sans-serif"}},
                equatorial: { show: true, stroke: "#aaaaaa", width: 1.3, opacity: 0.7 },
                ecliptic: { show: true, stroke: "#66cc66", width: 1.3, opacity: 0.7 },
                galactic: { show: false, stroke: "#cc6666", width: 1.3, opacity: 0.7 },
                supergalactic: { show: false, stroke: "#cc66cc", width: 1.3, opacity: 0.7 }
            },
            background: {        // Background style
                fill: "#000000",   // Area fill
                opacity: 1,
                stroke: "#000000", // Outline
                width: 1.5
            },
            horizon: {  //Show horizon marker, if location is set and map projection is all-sky
                show: false,
                stroke: "#000099", // Line
                width: 1.0,
                fill: "#000000",   // Area below horizon
                opacity: 0.5
            }
        };

        // Asterisms canvas style properties for lines and text
        var lineStyle = {
                stroke:"#f00",
                fill: "rgba(255, 204, 204, 0.4)",
                width:3
            },
            textStyle = {
                fill:"#f00",
                font: "bold 15px Helvetica, Arial, sans-serif",
                align: "center",
                baseline: "bottom"
            };
        Celestial.clear();
        Celestial.add({type:"line", callback: function(error, json) {
                if (error) return console.warn(error);
                // Load the geoJSON file and transform to correct coordinate system, if necessary
                var asterism = Celestial.getData(me.geoJson, config.transform);
                // Add to celestiasl objects container in d3
                Celestial.container.selectAll(".asterisms")
                    .data(asterism.features)
                    .enter().append("path")
                    .attr("class", "ast");
                // Trigger redraw to display changes
                Celestial.redraw();
            }, redraw: function() {
                // Select the added objects by class name as given previously
                Celestial.container.selectAll(".ast").each(function(d) {
                    // Set line styles
                    Celestial.setStyle(lineStyle);
                    // Project objects on map
                    Celestial.map(d);
                    // draw on canvas
                    Celestial.context.fill();
                    Celestial.context.stroke();

                    // If point is visible (this doesn't work automatically for points)
                    if (Celestial.clip(d.properties.loc)) {
                        // get point coordinates
                        const pt = Celestial.mapProjection(d.properties.loc);
                        // Set text styles
                        Celestial.setTextStyle(textStyle);
                        // and draw text on canvas
                        Celestial.context.fillText(d.properties.n, pt[0], pt[1]);
                    }
                });
            } });

        // Display map with the configuration above or any subset therof
        Celestial.display(config);
    }

    protected updateData(): void {
        if (this.platformService.isClient()) {
            this.renderMap();
        }
    }
}
