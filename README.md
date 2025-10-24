🚀 Admin Dashboard - Vue.js + Supabase
Un dashboard administrativo moderno construido con Vue.js 3, conectado a una base de datos PostgreSQL real con Supabase.

✨ Características
⚡ Vue.js 3 - Composition API

🗄️ Supabase - Base de datos PostgreSQL en la nube

🎨 Tailwind CSS - Diseño utility-first

📊 Chart.js - Gráficos interactivos con datos reales

🌙 Modo Oscuro/Claro - Toggle de tema

📱 Responsive Design - Mobile-first

🛣️ Vue Router - Navegación SPA

🗄️ Pinia - Gestión de estado

🔄 API Dual - Supabase + JSON Server (fallback)

🛠️ Stack Tecnológico
Frontend
Framework: Vue 3 + Composition API

Build Tool: Vite

Routing: Vue Router 4

State Management: Pinia

Styling: Tailwind CSS

Charts: Chart.js + vue-chartjs

HTTP Client: Axios

Backend & Database
Database: Supabase (PostgreSQL)

Authentication: Preparado para Supabase Auth

API: REST API automática

Development: JSON Server para mocking

🚀 Instalación
bash
# Clonar el repositorio
git clone https://github.com/rabagoAI/admin-dashboard.git

# Navegar al directorio
cd admin-dashboard

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar en desarrollo
npm run dev

# Ejecutar JSON Server (modo desarrollo)
npm run json-server

# Construir para producción
npm run build
⚙️ Configuración
Variables de Entorno
Crea un archivo .env basado en .env.example:

env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
Configuración de Supabase
Crear cuenta en Supabase

Crear nuevo proyecto

Obtener URL y API Key desde Settings > API

Ejecutar los scripts SQL incluidos para crear las tablas

📁 Estructura del Proyecto
text
admin-dashboard/
├── src/
│   ├── components/
│   │   ├── charts/          # Componentes de gráficos
│   │   │   ├── LineChart.vue
│   │   │   ├── BarChart.vue
│   │   │   └── PieChart.vue
│   │   ├── layout/          # Layout principal
│   │   │   ├── MainLayout.vue
│   │   │   ├── Sidebar.vue
│   │   │   └── Header.vue
│   │   └── widgets/         # Widgets del dashboard
│   │       ├── KpiCard.vue
│   │       ├── ActivityItem.vue
│   │       └── ProductItem.vue
│   ├── views/               # Vistas/páginas
│   │   ├── Dashboard.vue
│   │   ├── Analytics.vue
│   │   ├── Users.vue
│   │   └── Settings.vue
│   ├── stores/              # Estado global (Pinia)
│   │   └── dashboard.js
│   ├── services/            # Servicios API
│   │   ├── api.js
│   │   └── supabase.js
│   ├── router/              # Configuración de rutas
│   │   └── index.js
│   └── main.js              # Entrada de la aplicación
├── public/                  # Archivos estáticos
└── package.json             # Dependencias y scripts
📊 Funcionalidades del Dashboard
Módulos Implementados
✅ Panel Principal - KPI cards y métricas en tiempo real

✅ Gráficos Interactivos - Ventas, distribución de usuarios, performance

✅ Actividad Reciente - Log de actividades del sistema

✅ Productos Top - Ranking de productos más vendidos

✅ Selector de Datos - Cambio entre Supabase y JSON Server

Gráficos Incluidos
Sales Overview - Gráfico de líneas para tendencias

User Distribution - Gráfico de pie para demografía

Performance Metrics - Gráfico de barras para KPIs

🔧 Desarrollo
Scripts Disponibles
bash
npm run dev          # Servidor de desarrollo
npm run build        # Construcción para producción
npm run preview      # Vista previa de producción
npm run json-server  # API mock para desarrollo
Estructura de la Base de Datos
El proyecto utiliza 6 tablas principales en PostgreSQL:

metrics - Métricas generales del dashboard

sales - Datos de ventas mensuales

users - Información de usuarios

activities - Registro de actividades

products - Catálogo de productos

user_distribution - Distribución demográfica

🚀 Despliegue
Recomendado: Vercel/Netlify
bash
# Instalar CLI de Vercel
npm i -g vercel

# Desplegar
vercel --prod
Variables de Entorno en Producción
Asegúrate de configurar:

VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

🤝 Contribución
Fork el proyecto

Crear una rama feature (git checkout -b feature/AmazingFeature)

Commit tus cambios (git commit -m 'Add some AmazingFeature')

Push a la rama (git push origin feature/AmazingFeature)

Abrir un Pull Request

📝 Licencia
Distribuido bajo la Licencia MIT. Ver LICENSE para más información.

🏷️ Versiones
v1.1.0 - Integración con Supabase PostgreSQL

v1.0.0 - Dashboard básico con Vue.js

