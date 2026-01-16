"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    phone_number: phone,
                    role: 'consumer', // Hardcoded for this app
                },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            alert(error.message);
        } else {
            alert("Verification email sent! Please check your inbox.");
            router.push("/login");
        }
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen flex-col p-6 bg-white">
            <h1 className="text-2xl font-bold text-primary mb-2">Create Account</h1>
            <p className="text-gray-500 mb-8">Join the QuickServe community today.</p>

            <form onSubmit={handleRegister} className="space-y-4">
                <input
                    type="text" placeholder="Full Name" required
                    className="w-full p-4 bg-gray-100 rounded-xl outline-none border-none"
                    onChange={(e) => setFullName(e.target.value)}
                />
                <input
                    type="email" placeholder="Email Address" required
                    className="w-full p-4 bg-gray-100 rounded-xl outline-none border-none"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="tel" placeholder="Phone Number (e.g. +234...)" required
                    className="w-full p-4 bg-gray-100 rounded-xl outline-none border-none"
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input
                    type="password" placeholder="Password" required
                    className="w-full p-4 bg-gray-100 rounded-xl outline-none border-none"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    disabled={loading}
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-transform active:scale-95"
                >
                    {loading ? "Creating Account..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
}