# 이전기록

2023-05-20
프로젝트 시작

2023-05-27
프리즈마설치중
yarn add prisma --save-dev
npx prisma init --datasource-provider sqlite
yarn add @prisma/client
npx prisma migrate dev --name init
npx prisma generate
npx prisma studio

2023-06-04 (https://puterism.com/deploy-next-js-with-ec2/)
ec2 instance 연결
ssh -i practicaltrivia-keypair.pem ec2-user@ec2-54-242-114-179.compute-1.amazonaws.com

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
source .bashrc
command -v nvm
nvm install 18.13.0
nvm use 18.13.0
npm i -g yarn
yarn --version
npm i -g pm2

sudo yum install git -y
sudo apt-get update
sudo apt-get install git -y
git version
[ssh 키 등록 후 ssh 로 clone]
ssh-keygen -t ed25519 -C "inyourcareallen@gmail.com"
cat ~/.ssh/id_ed25519.pub

git clone git@github.com:inyourcare/practical-trivia.git
cd practical-trivia
yarn
vi .env
export NODE_OPTIONS="--max-old-space-size=8184" 
echo $NODE_OPTIONS

yarn
yarn build --inspect
pm2 start yarn -w -i 0 --name "next" -- start
pm2 reload "next"
[변화가 있으면 빌드하고 reload 하는 형식으로 보임]

yarn
이거만 하면 된다 -> yarn run deploy:prod -> next build && pm2 startOrRestart ecosystem.config.js --env production

sudo yum install nginx -y
sudo apt-get install nginx -y
sudo nginx -t
sudo systemctl start nginx
sudo systemctl reload nginx
아마존 리눅스 /etc/nginx/nginx.conf.default 에서 바로 수정 해주는게 맞는거같다.
```
  server_name domain.kr
	location / {
		proxy_pass http://127.0.0.1:3000;
	}
```
우분투 /etc/nginx/site-available
```
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www/html;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        server_name practicaltrivia.com;

        return 301 https://practicaltrivia.com;
}
server {
  
        listen [::]:443 ssl ipv6only=on; # managed by Certbot
        listen 443 ssl; # managed by Certbot

        server_name practicaltrivia.com;

        ssl_certificate /etc/letsencrypt/live/practicaltrivia.com/fullchain.pem; # managed
        by Certbot
        ssl_certificate_key /etc/letsencrypt/live/practicaltrivia.com/privkey.pem; # manag
        ed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

        location / {
                proxy_pass http://127.0.0.1:3000;
        }
}
```

sudo apt-get install python3-certbot-nginx
sudo certbot --nginx
sudo crontab -e
0 18 1 * * certbot renew --renew-hook="sudo systemctl restart nginx"







2023-06-05

# 레코드 등록
https://ddochea.tistory.com/119
고정IP생성
Lightsail -> DNS 영역 생성 -> 레코드설정 [@,고정아이피] -> 
Route53 -> 등록된 도메인 -> 레코드 추가 


2023-06-06

# 검색어 반영
https://velog.io/@delay100/lightsailRoute53%EB%A1%9C-%EB%B0%B0%ED%8F%AC%ED%95%9C-%EC%82%AC%EC%9D%B4%ED%8A%B8-Google-Search-Console%EC%97%90-%EB%93%B1%EB%A1%9D%ED%95%98%EA%B8%B0
구글 서치콘솔의 TXT 값을 DNS 레코드 추가에서 [TXT 레코드, @, Value] 차례대로 기입하여 추가


2023-06-06
배포중 빌드타임이 너무 긴 문제가 있어서 도커hub 이용한 배포를 사용하려 한다.

빌드에서 막혀서 이전 기록 가져옴 
```
## 도커 순서
```
Docker file example(official document) (output: 'standalone',)
docker build -t [image name] .    (Image name)
docker run -p 3000:3000 [image name] (외부포트:도커내부포트)

-> 맥북 m1 칩에서 할경우 amd 서버에서 에러발생함...
docker buildx build --platform=linux/amd64 -t [image name]:[version] . 
(default: docker buildx build --platform=linux/arm64 -t [image name]:[version] .)

-> 이미지 저장
docker save -o [save file name].tar [image name]
```
```


2023-06-08
sitemap.xml 추가 host/sitemap.xml 에서 확인가능

2023-07-06
## git history 제거
```
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch ./.env" --prune-empty --tag-name-filter cat -- --all
git push origin --force --all
```

## Ineffective mark-compacts near heap limit Allocation failed
```
export NODE_OPTIONS="--max-old-space-size=(X * 1024)" # Increase to X GB
export NODE_OPTIONS="--max-old-space-size=5120" # Increase to 5 GB
export NODE_OPTIONS="--max-old-space-size=6144" # Increase to 6 GB
export NODE_OPTIONS="--max-old-space-size=7168" # Increase to 7 GB
export NODE_OPTIONS="--max-old-space-size=8192" # Increase to 8 GB
node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))' 조회
```
이거했는데 에러만 나고... 의미가 없는거같음...
그냥 똑같은 환경에서 안되다가 되다가 그럼;

##################################################################################################################################################

# Prisma
2023-05-27
프리즈마설치중
yarn add prisma --save-dev
npx prisma init --datasource-provider sqlite
yarn add @prisma/client
npx prisma migrate dev --name init
npx prisma migrate dev --name create_table
npx prisma generate
npx prisma studio

2023-07-12
### seeding 
[seeding](https://www.prisma.io/docs/guides/database/seed-database)
```
yarn add -D typescript ts-node @types/node
npx prisma db seed
```