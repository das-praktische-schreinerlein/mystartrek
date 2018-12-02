# Install MyGeoManager

## prepare-dev

### prepare src-directory
- add symlinks
    - on windows in admin-console
```
cd src\frontend\ && mklink /D shared ..\shared && cd ..\backend\ && mklink /D shared ..\shared  && cd ..\frontendserver\ && mklink /D shared ..\shared
```
- run `npm install`
- fix mytourbook/node_modules/js-data/dist/js-data.js defineMapper 
```
    descriptor.configurable = true;
    Object.defineProperty(mapper.recordClass.prototype, localField, descriptor);
```
- node_modules\@angular\cli\models\webpack-configs\common.js for tests: resolve .js before .ts
```
            extensions: ['.js', '.ts'],
``` 


## Development server
Run `npm backend-build-serve` to build and start the backend. Navigate to `http://localhost:4100/api/v1/de/pdoc/` to get the pdocs.

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`.

## Running unit tests
Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `npm e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `npm start`.

## Build prod
Run `npm build-prod-de` or `npm build-prod-en` for the prod-versions in `dist/`. 

## Deploy prod
Stop backend via startscript
```
/etc/init.d/mygeom start
/etc/init.d/mygeom-frontend start
```

Copy startscript `installer/linux/init.d/mygeom*` to `/etc/init.d/` and change paths.

Copy files to server
```
package.json
dist
config
error_docs
```

Copy files on server to `$APPDIR`
```
cd $APPDIR
rm -fr dist
mv $IMPORTDIR/dist $APPDIR

rm -fr config
mv $IMPORTDIR/config $APPDIR

rm -fr error_docs
mv $IMPORTDIR/error_docs $APPDIR

rm -fr package.json 
mv $IMPORTDIR/package.json $APPDIR
```

Install packages
```
cd $APPDIR
npm install 
```

Set permissions and rights für `$APPDIR`

Start backend via startscript
```
/etc/init.d/mygeom start
/etc/init.d/mygeom start-frontend
```

- clear redis-cache [seen on](https://stackoverflow.com/questions/4006324/how-to-atomically-delete-keys-matching-a-pattern-using-redis)
```
select 2
EVAL "local keys = redis.call('keys', ARGV[1]) \n for i=1,#keys,5000 do \n redis.call('del', unpack(keys, i, math.min(i+4999, #keys))) \n end \n return keys" 0 cache*
```
