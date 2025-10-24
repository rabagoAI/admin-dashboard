import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Faltan variables de entorno de Supabase')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Función para probar la conexión
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('metrics').select('*').limit(1)
    if (error) throw error
    console.log('✅ Conexión a Supabase exitosa')
    return true
  } catch (error) {
    console.error('❌ Error conectando a Supabase:', error)
    return false
  }
}