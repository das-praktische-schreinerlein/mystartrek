import {StarDocAdapterResponseMapper} from './sdoc-commons/services/sdoc-adapter-response.mapper';
import {StarDocDataStore} from './sdoc-commons/services/sdoc-data.store';
import {StarDocFileUtils} from './sdoc-commons/services/sdoc-file.utils';
import {StarDocHttpAdapter} from './sdoc-commons/services/sdoc-http.adapter';
import {StarDocItemsJsAdapter} from './sdoc-commons/services/sdoc-itemsjs.adapter';
import {StarDocRoutingService} from './sdoc-commons/services/sdoc-routing.service';
import {StarDocSearchService} from './sdoc-commons/services/sdoc-search.service';


// import untested service for code-coverage
for (const a in [
    StarDocAdapterResponseMapper,
    StarDocDataStore,
    StarDocFileUtils,
    StarDocHttpAdapter,
    StarDocItemsJsAdapter,
    StarDocRoutingService,
    StarDocSearchService,
]) {
    console.log('import untested frontend-modules for codecoverage');
}
