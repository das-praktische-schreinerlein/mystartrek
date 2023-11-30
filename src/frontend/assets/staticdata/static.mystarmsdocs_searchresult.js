window.importStaticDataSDocsJsonP = `{
    "recordCount": 0,
    "searchForm": {
    },
    "currentRecords": [
    ],
    "facets": {
        "facets": {
        },
        "selectLimits": {
            "type_ss": 1
        }
    }
}
`;

var script = document.createElement('script');
script.type='application/json';
script.id = 'assets/staticdata/static.mystarmsdocs_searchresult.js';
var text = document.createTextNode(importStaticDataSDocsJsonP);
script.appendChild(text);
document.head.appendChild(script);
