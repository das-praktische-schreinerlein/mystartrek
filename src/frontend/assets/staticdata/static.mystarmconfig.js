window.importStaticConfigJsonP = `
{
    "skipMediaCheck": false,
    "staticPDocsFile": "assets/staticdata/static.mystarmpdocs.js",
    "staticSDocsFiles": [
        "assets/staticdata/static.mystarmsdocs_searchresult.js",
        "assets/staticdata/samples-static.mystarmsdocs_stars_export_chunk0.js"
    ],
    "components": {
        "sdoc-showpage": {
            "showBigImages": false,
            "allowedQueryParams": [],
            "availableTabs": {
                "STAR": true
            }
        },
        "sdoc-albumpage": {
            "allowAutoplay": false,
            "m3uAvailable": true
        },
        "cdoc-listheader": {
            "allowAutoplay": false
        },
        "pdoc-sectionpage": {
            "availableTabs": {
                "STAR": true,
                "ALL": true
            }
        }
    },
    "services": {
        "adminJobArea": {
            "jobsAllowed": false
        },
        "global": {
            "hideCopyrightFooter": true
        }
    }
}
`;

var script = document.createElement('script');
script.type='application/json';
script.id = 'assets/staticdata/static.mystarmconfig.js';
var text = document.createTextNode(importStaticConfigJsonP);
script.appendChild(text);
document.head.appendChild(script);
