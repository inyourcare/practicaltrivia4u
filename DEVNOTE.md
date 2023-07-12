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