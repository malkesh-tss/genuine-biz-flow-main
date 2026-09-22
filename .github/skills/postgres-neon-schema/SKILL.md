---
name: postgres-neon-schema
description: "Use for PostgreSQL or Neon schema changes, registration fields, indexes, constraints, migrations, row-level security, and API query alignment."
argument-hint: "Describe the database table, field, query, or migration change."
---
# PostgreSQL And Neon Schema

## Procedure
1. Compare `frontend/database/schema.sql` with every API query that reads or writes the affected table.
2. Verify table names, schema namespaces, column types, nullability, checks, defaults, indexes, and timestamps.
3. Use a migration or explicitly documented rollout path for existing data; do not rely on an ad hoc destructive recreation.
4. Keep API queries parameterized and confirm constraints match server-side validation.
5. Review Row Level Security and database privileges before changing access behavior.
6. Test valid, invalid, duplicate, and missing-field cases with non-production data.

## Known Contract Check
The current SQL creates `registrations` without a visible `tss` schema, while API queries reference `tss.registrations`. Treat that as a contract mismatch to verify and resolve deliberately, not as an assumption to hide.