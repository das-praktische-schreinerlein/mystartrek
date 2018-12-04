import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GeoDocRecordResolver} from '../shared-gdoc/resolver/gdoc-details.resolver';
import {GeoDocShowpageComponent} from './components/gdoc-showpage/gdoc-showpage.component';
import {GeoDocSearchFormResolver} from '../shared-gdoc/resolver/gdoc-searchform.resolver';
import {GeoDocSearchpageComponent} from './components/gdoc-searchpage/gdoc-searchpage.component';
import {GeoDocAlbumResolver} from '../shared-gdoc/resolver/gdoc-album.resolver';
import {GeoDocAlbumpageComponent} from './components/gdoc-albumpage/gdoc-albumpage.component';

const gdocRoutes: Routes = [
    {
        path: 'gdoc',
        children: [
            {
                path: 'search',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        component: GeoDocSearchpageComponent,
                        data: {
                            id: 'gdocs_default',
                            baseSearchUrl: { data: 'gdoc/' }
                        }
                    },
                    {
                        path: ':when/:where/:what/:fulltext/:moreFilter/:sort/:type/:perPage/:pageNum',
                        component: GeoDocSearchpageComponent,
                        data: {
                            flgDoSearch: true,
                            id: 'gdocs_search',
                            searchFormDefaults: {},
                            baseSearchUrl: { data: 'gdoc/' }
                        },
                        resolve: {
                            searchForm: GeoDocSearchFormResolver
                        }
                    },
                    {
                        path: '**',
                        component: GeoDocSearchpageComponent,
                        data: {
                            id: 'gdocs_fallback',
                            baseSearchUrl: { data: 'gdoc/' }
                        }
                    }
                ]
            },
            {
                path: 'show/:name/:id',
                component: GeoDocShowpageComponent,
                data: {
                    baseSearchUrl: { data: 'gdoc/' }
                },
                resolve: {
                    record: GeoDocRecordResolver
                }
            },
            {
                path: 'album',
                children: [
                    {
                        path: 'edit/:album/:sort/:perPage/:pageNum',
                        component: GeoDocAlbumpageComponent,
                        data: {
                            id: 'gdocs_album_list',
                            flgDoEdit: true,
                            searchFormDefaults: {},
                            baseSearchUrl: { data: 'gdoc/album/show/' }
                        },
                        resolve: {
                            searchForm: GeoDocAlbumResolver
                        }
                    },
                    {
                        path: 'show/:album/:sort/:perPage/:pageNum',
                        component: GeoDocAlbumpageComponent,
                        data: {
                            id: 'gdocs_album_show',
                            searchFormDefaults: {},
                            baseSearchUrl: { data: 'gdoc/' }
                        },
                        resolve: {
                            searchForm: GeoDocAlbumResolver
                        }
                    }
                ]
            },
            {
                path: '**',
                redirectTo: 'gdoc/search',
                data: {
                    id: 'gdoc_fallback'
                }
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(gdocRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class GeoDocRoutingModule {}
