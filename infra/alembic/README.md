# Alembic Migrations

This folder contains the scaffolding for database migrations. Initialize Alembic inside `apps/api` with the following commands:

```bash
cd apps/api
alembic init ../infra/alembic
```

Update `env.py` to import models from `app.models.core` and point `alembic.ini` to the connection string from environment variables. Migration scripts should live under `infra/alembic/versions/`.
