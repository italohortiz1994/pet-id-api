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

## Front-end do Pet ID

Ao subir a API, o front-end SPA tambem fica disponivel em:

```text
http://localhost:3000/
```

O projeto inclui:

- login e cadastro de tutor/usuario;
- cadastro e listagem de pets;
- vacinas e prontuario;
- identidade publica com QR Code;
- pagina publica do pet;
- rastreamento operacional do pet;
- cadastro e verificacao de veterinarios.

## Conectar no PostgreSQL do Railway

Essa API agora aceita conexao por `DATABASE_URL`, que e a forma mais simples de usar o PostgreSQL criado no Railway.

### Variaveis recomendadas

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME
DB_SSL=true
```

- `DATABASE_URL`: copie a string de conexao do plugin PostgreSQL no Railway
- `DB_SSL=true`: necessario na maioria dos bancos PostgreSQL hospedados

### Rodando localmente apontando para o Railway

No PowerShell:

```powershell
$env:DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME"
$env:DB_SSL="true"
npm run db:migrate
npm run db:seed
npm run start:dev
```

### Rodando a API no proprio Railway

Adicione no servico da API as variaveis:

- `DATABASE_URL=${{Postgres.DATABASE_URL}}`
- `DB_SSL=true`

A aplicacao vai usar essa URL automaticamente no TypeORM.
