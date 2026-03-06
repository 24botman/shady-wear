import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Ensure we don't crash if the URL is invalid during initialization
export const supabase = (supabaseUrl && supabaseUrl.startsWith('http'))
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        auth: {
            getSession: async () => ({ data: { session: null } }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            signInWithOAuth: async () => {
                alert("⚠️ Configuration Missing: Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Netlify environment variables.");
                return { error: { message: "Supabase not configured" } };
            },
            signOut: async () => { }
        }
    };
