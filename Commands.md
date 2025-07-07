
```
npm install @nestjs/typeorm typeorm pg
```

```
npm install class-validator class-transformer
```

```
nest generate class inventory/entities/attribute.entity --no-spec
```

<!-- Add Following in package.json for Migration: [datasource.js instead of datasource.ts] -->
```
"typeorm": "npm run build && npx typeorm -d dist/db/datasource.js",
"migration:generate": "npm run typeorm -- migration:generate",
"migration:run": "npm run typeorm -- migration:run",
"migration:revert": "npm run typeorm -- migration:revert",
"db:drop": "npm run typeorm -- schema:drop"
```

<!--  Migration Generate -->
```
npm run migration:generate -- db/migrations/initial 
```

<!-- Migration Run -->
```
npm run migration:run
```

<!-- For Swagger -->
npm install @nestjs/swagger --legacy-peer-deps

<!-- Token -->
npm i jsonwebtoken @types/jsonwebtoken --legacy-peer-deps

<!-- Hash -->
npm i bcrypt --legacy-peer-deps

<!-- Deployment -->
npm run start 3333

<!-- For Future Migrations -->
npm run typeorm migration:generate -- -n AddLotEntityAndRelation
npm run typeorm migration:run