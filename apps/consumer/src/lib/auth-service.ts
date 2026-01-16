import { supabase } from './supabase';

export async function signUpUser(formData: any, role: 'consumers' | 'riders' | 'vendors') {
    // 1. Trigger Supabase Auth with Vercel dynamic redirect
    const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
                full_name: formData.name,
                phone: formData.phone,
            }
        }
    });

    if (error) throw error;

    // 2. Immediate sync to your specific app table
    if (data.user) {
        const { error: dbError } = await supabase
            .from(role)
            .insert([{
                id: data.user.id,
                full_name: formData.name,
                email: formData.email,
                phone: formData.phone
            }]);

        if (dbError) throw dbError;
    }

    return data;
}