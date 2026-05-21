#!/usr/bin/env bash
set -euo pipefail

DBS=("employee_db_developement" "employee_db_production")

for db in "${DBS[@]}"; do
  echo "▶ Ensuring database '${db}' exists"
  psql -v ON_ERROR_STOP=1 --username "${POSTGRES_USER}" --dbname "postgres" <<-EOSQL
    SELECT 'CREATE DATABASE "${db}"'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${db}')\gexec
EOSQL
done