import { supabase, testConnection } from './supabase'

// Modo de operación: 'supabase' o 'json-server'
let API_MODE = 'supabase'

// Servicios para Supabase
const supabaseService = {
  // Obtener métricas del dashboard
  getMetrics: async () => {
    const { data, error } = await supabase
      .from('metrics')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()
    
    if (error) throw error
    return data
  },

  // Obtener datos de ventas
  getSales: async () => {
    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .order('month', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Obtener usuarios
  getUsers: async (page = 1, limit = 10) => {
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    const { data, error, count } = await supabase
      .from('users')
      .select('*', { count: 'exact' })
      .range(from, to)
    
    if (error) throw error
    return {
      data: data || [],
      total: count || 0
    }
  },

  // Obtener actividades recientes
  getActivities: async (limit = 5) => {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data || []
  },

  // Obtener productos top
  getTopProducts: async (limit = 5) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('sales', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data || []
  },

  // Obtener distribución de usuarios
  getUserDistribution: async () => {
    const { data, error } = await supabase
      .from('user_distribution')
      .select('*')
      .order('age_group', { ascending: true })
    
    if (error) throw error
    return data || []
  }
}

// Servicios para JSON Server (como fallback)
const jsonServerService = {
  getMetrics: async () => {
    const response = await fetch('http://localhost:3001/metrics')
    return response.json()
  },
  
  getSales: async () => {
    const response = await fetch('http://localhost:3001/sales')
    return response.json()
  },
  
  getUsers: async (page = 1, limit = 10) => {
    const response = await fetch(`http://localhost:3001/users?_page=${page}&_limit=${limit}`)
    const data = await response.json()
    return {
      data,
      total: parseInt(response.headers.get('x-total-count') || data.length)
    }
  },
  
  getActivities: async (limit = 5) => {
    const response = await fetch(`http://localhost:3001/activities?_sort=created_at&_order=desc&_limit=${limit}`)
    return response.json()
  },
  
  getTopProducts: async (limit = 5) => {
    const response = await fetch(`http://localhost:3001/products?_sort=sales&_order=desc&_limit=${limit}`)
    return response.json()
  },
  
  getUserDistribution: async () => {
    const response = await fetch('http://localhost:3001/user_distribution')
    return response.json()
  }
}

// Servicio principal que elige la implementación
export const dashboardService = {
  getMetrics: () => API_MODE === 'supabase' 
    ? supabaseService.getMetrics() 
    : jsonServerService.getMetrics(),

  getSales: () => API_MODE === 'supabase'
    ? supabaseService.getSales()
    : jsonServerService.getSales(),

  getUsers: (page, limit) => API_MODE === 'supabase'
    ? supabaseService.getUsers(page, limit)
    : jsonServerService.getUsers(page, limit),

  getActivities: (limit) => API_MODE === 'supabase'
    ? supabaseService.getActivities(limit)
    : jsonServerService.getActivities(limit),

  getTopProducts: (limit) => API_MODE === 'supabase'
    ? supabaseService.getTopProducts(limit)
    : jsonServerService.getTopProducts(limit),

  getUserDistribution: () => API_MODE === 'supabase'
    ? supabaseService.getUserDistribution()
    : jsonServerService.getUserDistribution()
}

// Función para cambiar entre modos
export const setApiMode = async (mode) => {
  if (mode === 'supabase') {
    const connected = await testConnection()
    if (connected) {
      API_MODE = 'supabase'
      console.log('✅ Modo cambiado a Supabase')
    } else {
      console.warn('❌ No se pudo conectar a Supabase, manteniendo JSON Server')
      API_MODE = 'json-server'
    }
  } else {
    API_MODE = 'json-server'
    console.log('✅ Modo cambiado a JSON Server')
  }
  return API_MODE
}

// Función para obtener el modo actual
export const getApiMode = () => API_MODE

// Probar conexión al cargar
testConnection().then(connected => {
  if (!connected) {
    API_MODE = 'json-server'
    console.warn('🚨 Usando JSON Server como fallback')
  }
})