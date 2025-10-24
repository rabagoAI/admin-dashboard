# 🚀 Migración a Supabase - Guía

## 📊 Estructura de Tablas para PostgreSQL

### Tabla: metrics
```sql
CREATE TABLE metrics (
  id SERIAL PRIMARY KEY,
  total_users INTEGER,
  new_signups INTEGER,
  revenue DECIMAL,
  conversion_rate DECIMAL,
  active_users INTEGER,
  bounce_rate DECIMAL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  month VARCHAR(7),
  revenue DECIMAL,
  orders INTEGER,
  growth DECIMAL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  status VARCHAR(50),
  join_date DATE,
  last_login TIMESTAMPTZ,
  country VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);