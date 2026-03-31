import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
// Carrega as variáveis do arquivo .env
dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_KEY || '';
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('As variáveis SUPABASE_URL e SUPABASE_ANON_KEY são obrigatórias no .env');
}
// Exportamos a instância do cliente
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
