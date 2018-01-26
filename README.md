# poolus-api-template

## Local Configuration
Copy 'config.sample.js' to 'config.development.js'  
 ( in case 'NODE_ENV=development' Load Only 'config.development.js' file )
 
## Project Start
* STEP 1) 프로젝트 root 폴더에서 모듈 설치
npm install

* STEP 2-1) pm2를 이용하여 서비스 실행  (Production) -> 예상
NODE_ENV=production pm2 start pm2.json --node-args="--max-old-space-size=2048"

* STEP 2-2) npm command 를 이용하여 서비스 실행 (Development)
npm start

### Timezone Configuration
* Asia/Seoul

### Spec
* Node  v9.4.0
* NPM   v5.6.0
* Redis
* Elastic-Search
* MariaDB

### TEST API URI
http://localhost:5500/health

