# pet-id-api

## Subir com Docker

```bash
docker compose up --build
```

Esse comando sobe:

- API em `http://localhost:3000`
- PostgreSQL em `localhost:5432`

No startup da API, o container:

1. espera o banco ficar disponivel;
2. aplica as migrations;
3. executa as seeds;
4. inicia o NestJS.

## Variaveis usadas no Docker

- `DB_HOST=db`
- `DB_PORT=5432`
- `DB_USERNAME=postgres`
- `DB_PASSWORD=postgres`
- `DB_DATABASE=petid`

## Rodar localmente sem Docker

```bash
npm install
npm run db:migrate
npm run db:seed
npm run start:dev
```
