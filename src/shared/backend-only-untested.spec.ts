import {StarDocAdapterResponseMapper} from './sdoc-commons/services/sdoc-adapter-response.mapper';
import {StarDocDataStore} from './sdoc-commons/services/sdoc-data.store';
import {StarDocFileUtils} from './sdoc-commons/services/sdoc-file.utils';
import {StarDocHttpAdapter} from './sdoc-commons/services/sdoc-http.adapter';
import {StarDocItemsJsAdapter} from './sdoc-commons/services/sdoc-itemsjs.adapter';
import {StarDocSearchService} from './sdoc-commons/services/sdoc-search.service';
import {StarDocSolrAdapter} from './sdoc-commons/services/sdoc-solr.adapter';


// import untested service for code-coverage
for (const a in [
    StarDocAdapterResponseMapper,
    StarDocDataStore,
    StarDocFileUtils,
    StarDocHttpAdapter,
    StarDocItemsJsAdapter,
    StarDocSearchService,
    StarDocSolrAdapter
]) {
    console.log('import untested backend-modules for codecoverage');
}
