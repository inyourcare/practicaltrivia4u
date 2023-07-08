# Prisma
2023-05-27
프리즈마설치중
yarn add prisma --save-dev
npx prisma init --datasource-provider sqlite
yarn add @prisma/client
npx prisma migrate dev --name init
npx prisma generate
npx prisma studio