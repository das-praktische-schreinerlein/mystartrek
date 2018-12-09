import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StarDocRecordResolver} from '../shared-sdoc/resolver/sdoc-details.resolver';
import {StarDocShowpageComponent} from './components/sdoc-showpage/sdoc-showpage.component';
import {StarDocSearchFormResolver} from '../shared-sdoc/resolver/sdoc-searchform.resolver';
import {StarDocSearchpageComponent} from './components/sdoc-searchpage/sdoc-searchpage.component';
import {StarDocAlbumResolver} from '../shared-sdoc/resolver/sdoc-album.resolver';
import {StarDocAlbumpageComponent} from './components/sdoc-albumpage/sdoc-albumpage.component';

const sdocRoutes: Routes = [
    {
        path: 'sdoc',
        children: [
            {
                path: 'search',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        component: StarDocSearchpageComponent,
                        data: {
                            id: 'sdocs_default',
                            baseSearchUrl: { data: 'sdoc/' }
                        }
                    },
                    {
                        path: ':when/:where/:what/:fulltext/:moreFilter/:sort/:type/:perPage/:pageNum',
                        component: StarDocSearchpageComponent,
                        data: {
                            flgDoSearch: true,
                            id: 'sdocs_search',
                            searchFormDefaults: {},
                            baseSearchUrl: { data: 'sdoc/' }
                        },
                        resolve: {
                            searchForm: StarDocSearchFormResolver
                        }
                    },
                    {
                        path: '**',
                        component: StarDocSearchpageComponent,
                        data: {
                            id: 'sdocs_fallback',
                            baseSearchUrl: { data: 'sdoc/' }
                        }
                    }
                ]
            },
            {
                path: 'show/:name/:id',
                component: StarDocShowpageComponent,
                data: {
                    baseSearchUrl: { data: 'sdoc/' }
                },
                resolve: {
                    record: StarDocRecordResolver
                }
            },
            {
                path: 'album',
                children: [
                    {
                        path: 'edit/:album/:sort/:perPage/:pageNum',
                        component: StarDocAlbumpageComponent,
                        data: {
                            id: 'sdocs_album_list',
                            flgDoEdit: true,
                            searchFormDefaults: {},
                            baseSearchUrl: { data: 'sdoc/album/show/' }
                        },
                        resolve: {
                            searchForm: StarDocAlbumResolver
                        }
                    },
                    {
                        path: 'show/:album/:sort/:perPage/:pageNum',
                        component: StarDocAlbumpageComponent,
                        data: {
                            id: 'sdocs_album_show',
                            searchFormDefaults: {},
                            baseSearchUrl: { data: 'sdoc/' }
                        },
                        resolve: {
                            searchForm: StarDocAlbumResolver
                        }
                    }
                ]
            },
            {
                path: '**',
                redirectTo: 'sdoc/search',
                data: {
                    id: 'sdoc_fallback'
                }
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(sdocRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class StarDocRoutingModule {}
