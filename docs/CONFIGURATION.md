# Configure MyStarTrek

## Backend

### API-Server Config: config/backend.PROFILE.json
The configuration-file to configure the backend-api-server.

- server-port for backend-api
```json
{
    "port": 4100
}
```

### Frontendserver: config/frontend.PROFILE.json
The configuration for the frontendserver.

- configure port and cachefolder
```json
{
    "port": 4002,
    "cacheFolder": "cache/"
} 
```

### Backend-Firewall: config/firewall.PROFILE.json
The configuration-file to configure the firewall for backend-api-server and frontend-server.

- if you habe a dns-blacklist-account
```json
{
    "dnsBLConfig": {
        "apiKey": "",
        "maxThreatScore": 20,
        "dnsttl": 3600000,
        "errttl": 60000,
        "timeout": 3000,
        "whitelistIps": ["::1", "127.0.0.1"],
        "cacheRedisUrl": "redis://localhost:6379/",
        "cacheRedisPass": "blablub",
        "cacheRedisDB": "1"
    }
}
```
- static blacklist to block spanner/spider...
```json
{
    "blackListIps": [
    ]
}
```

### API-Server Content: config/pdocs-de.json
Configure the content of the static section-pages.

- page-content
```json
{
 "pdocs": [
  {
   "id": "start",
   "descMd": "Willkommen bei MyStarTrek.",
   "flgShowTopTen": true,
   "flgShowNews": true,
   "flgShowSearch": true,
   "heading": "Thats MyStarTrek",
   "name": "Start",
   "subSectionIds": "schwerpunkt",
   "teaser": "Willkommen bei MyStarTrek",
   "type": "SectionOverviewPage"
  }
  ]
}
```

### API-Server themefilter: config/themeFilterConfig.json
Configure the mapping of the section-page-ids to specifiv filters a "berge -> KW_Berge".

- mapping
```json
{ 
   "berge": { "keywords_txt": { "in": ["kw_berge"] } },
   "museum": { "keywords_txt": { "in": ["kw_museum", "kw_museumsbesuch"] } },
   "klettern": { "keywords_txt": { "in": ["kw_klettern", "kw_sachsenklettern", "kw_sportklettern", "kw_alpinklettern"] } }
}
```
 
## Frontend

### Build-Environment: src/frontend/environments/environment.*.ts

- connection-urls of the backend-api
```typescript
export const environment = {
};
```
- production and writable-flags
```typescript
export const environment = {
    production: false,
};
```
- tracking-provider
```typescript
export const environment = {
    trackingProviders: [Angulartics2Piwik]
};
```

### App-Config: src/frontend/assets/config.json

- keyword/person-structure
```json
{
    "components": {
    }
}
```

### Override some message-resources: src/frontend/assets/locales/locale-de-overrides.json 

- brandname and descriptions
```json
{
    "nav.brand.appName": "MyStarTrek",
    "meta.title.prefix.errorPage": "MyStarTrek - Oje ein Fehler",
    "meta.title.prefix.sectionPage": "MyStarTrek - {{title}}",
    "meta.title.prefix.cdocSearchPage": "MyStarTrek - Suche",
    "meta.title.prefix.cdocShowPage": "MyStarTrek - {{cdoc}}",
    "meta.title.prefix.cdocSectionSearchPage": "MyStarTrek - {{title}} - Suche",
    "meta.title.prefix.cdocSectionShowPage": "MyStarTrek - {{title}} - {{cdoc}}",
    "meta.desc.prefix.errorPage": "MyStarTrek - Oje ein Fehler ist aufgetreten",
    "meta.desc.prefix.sectionPage": "MyStarTrek - {{title}} - {{teaser}}",
    "meta.desc.prefix.cdocSearchPage": "MyStarTrek - Touren/Berichte/Regionen/Bilder/Infos",
    "meta.desc.prefix.cdocShowPage": "MyStarTrek - Infos für {{cdoc}}",
    "meta.desc.prefix.cdocSectionSearchPage": "MyStarTrek - Touren/Berichte/Regionen/Bilder/Infos zum Thema {{title}} - {{teaser}}",
    "meta.desc.prefix.cdocSectionShowPage": "MyStarTrek - {{title}} - Infos für {{cdoc}}",
```
