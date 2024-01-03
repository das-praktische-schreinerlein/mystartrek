window.importStaticConfigJsonP = `
{
    "components": {
        "pdoc-sectionpage": {
        },
        "pdoc-editor-commands": {
            "commandBlocks": [
                {
                    "label": "Markdown:",
                    "commands": [
                        {
                            "label": "<h1>",
                            "type": "rangeCommand",
                            "commandStart": "# ",
                            "commandEnd": "\\n"
                        },
                        {
                            "label": "<h2>",
                            "type": "rangeCommand",
                            "commandStart": "## ",
                            "commandEnd": "\\n"
                        },
                        {
                            "label": "<h3>",
                            "type": "rangeCommand",
                            "commandStart": "### ",
                            "commandEnd": "\\n"
                        },
                        {
                            "label": "<link>",
                            "type": "rangeCommand",
                            "commandStart": "[](",
                            "commandEnd": ")"
                        },
                        {
                            "label": "<bold>",
                            "type": "rangeCommand",
                            "commandStart": "**",
                            "commandEnd": "**"
                        },
                        {
                            "label": "<li>",
                            "type": "rangeCommand",
                            "commandStart": "   - ",
                            "commandEnd": "\\n"
                        },
                        {
                            "label": "<ol>",
                            "type": "rangeCommand",
                            "commandStart": "   1. ",
                            "commandEnd": "\\n"
                        },
                        {
                            "label": "<table>",
                            "type": "singleCommand",
                            "command": "\\nHead1 | Head2 | Head3\\n----|----|----\\nColumn1 | Column2 | Column3\\n\\n"
                        }
                    ]
                },
                {
                    "label": "Boxes:",
                    "commands": [
                        {
                            "label": "Box",
                            "type": "rangeCommand",
                            "commandStart": "<!---BOX styleclass--->\\n",
                            "commandEnd": "<!---/BOX styleclass--->\\n\\n"
                        },
                        {
                            "label": "Container",
                            "type": "rangeCommand",
                            "commandStart": "<!---CONTAINER id--->\\n",
                            "commandEnd": "<!---/CONTAINER id--->\\n\\n"
                        },
                        {
                            "label": "Style",
                            "type": "rangeCommand",
                            "commandStart": "<!---STYLE tag.style--->\\n",
                            "commandEnd": "<!---/STYLE tag.style--->\\n\\n"
                        },
                        {
                            "label": "Info",
                            "type": "rangeCommand",
                            "commandStart": "<!---BOX.INFO header--->\\ncontent\\n",
                            "commandEnd": "<!---/BOX.INFO--->\\n\\n"
                        },
                        {
                            "label": "Warn",
                            "type": "rangeCommand",
                            "commandStart": "<!---BOX.WARN header--->\\ncontent\\n",
                            "commandEnd": "<!---/BOX.WARN--->\\n\\n"
                        },
                        {
                            "label": "Alert",
                            "type": "rangeCommand",
                            "commandStart": "<!---BOX.ALERT header--->\\ncontent\\n",
                            "commandEnd": "<!---/BOX.ALERT--->\\n\\n"
                        }
                    ]
                },
                {
                    "label": "Extensions:",
                    "commands": [
                        {
                            "label": "Splitter",
                            "type": "singleCommand",
                            "command": " :|: "
                        },
                        {
                            "label": "Text-Toggler",
                            "type": "singleCommand",
                            "command": "<!---TOGGLER containerIdToToggle,text--->"
                        },
                        {
                            "label": "Icon-Toggler",
                            "type": "singleCommand",
                            "command": "<!---TOGGLER containerIdToToggle,icon--->"
                        },
                        {
                            "label": "Toggle-Lists-Text",
                            "type": "singleCommand",
                            "command": "<!---TOGGLER.AFTER ul:dps-md-ul,text--->"
                        },
                        {
                            "label": "Toggle-Lists-Icon",
                            "type": "singleCommand",
                            "command": "<!---TOGGLER.AFTER ul:dps-md-ul,icon--->"
                        },
                        {
                            "label": "Graph",
                            "type": "singleCommand",
                            "command": "\\n\`\`\`mermaid\\ngraph LR\\n      A --- B\\n      B-->C[fa:fa-ban forbidden]\\n      B-->D(fa:fa-spinner);\\n\`\`\`\\n"
                        },
                        {
                            "label": "Gantt",
                            "type": "singleCommand",
                            "command": "\\n\`\`\`mermaid\\ngantt\\n    title Urlaubsplanung Sommer 2015\\n    dateFormat  DD.MM.YYYY\\n\\n    section Urlaub1\\n    Alpen1               :alpen1     , 01.07.2015     , 7d\\n    Alpen2               :alpen2     , after alpen1   , 7d\\n\\n    section Urlaub/Ferien\\n    Alpen Hüttentour     :alpen3     , after alpen2     , 6d\\n    Sachsen              :sachsen    , after alpen3 , 3d\\n    Ferienende Schule    :holend     , 27.08.2015     , 1d\\n    Ötztal               :alpen4     , after sachsen    , 5d\\n\`\`\`\\n"
                        }
                    ]
                },
                {
                    "label": "Emojis:",
                    "commands": [
                        {
                            "label": "😃",
                            "type": "singleCommand",
                            "command": "&#128515;"
                        }
                    ]
                }
            ]
        },
    },
    "services": {
        "adminJobArea": {
            "jobsAllowed": false
        }
    }
}
`;

var script = document.createElement('script');
script.type='application/json';
script.id = 'assets/staticdata/static.myshpconfig.js';
var text = document.createTextNode(importStaticConfigJsonP);
script.appendChild(text);
document.head.appendChild(script);
