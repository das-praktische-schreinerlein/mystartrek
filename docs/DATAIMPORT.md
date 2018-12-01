# Data-Management

## initialize environment (once)

### create and initialize database
- create mediadb the master-database (mysql)
```
mysql
source installer/db/mysql/musikdb/step1_create-db.sql
source installer/db/mysql/musikdb/step3_import-data.sql
source installer/db/mysql/musikdb/step2_create-user.sql
```

### configure local environments

### develop 
- configure a ```backend.json``` with another port and SqlMediadb
- configure ```src/frontend/environments/environment.ts``` to use this as backend-url 

### beta
- configure a second ```backend.beta.json``` with another port and Solr with ```http://localhost:8983/solr/myshpdev``` as backend
- configure ```src/frontend/environments/environment.beta.ts``` to use this as backend-url 


