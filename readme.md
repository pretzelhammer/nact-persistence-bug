# nact persistence bug?

REPRO STEPS:

```bash
$ nvm use # switch to node v14.4
$ npm install # install deps
# note: deps are installed locally and mounted by node container
$ docker-compose up -d # starts postgres & node containers
$ npm run test-nact.js # runs nact test in node container
$ npm run psql # connects to psql inside postgres container
# note: in psql run "\dt" to list all tables in current db
# note 2: run "\q" to quit psql
$ docker-compose down # brings containers down
```



