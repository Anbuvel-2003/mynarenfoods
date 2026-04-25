"use client";

import { useActionState } from "react";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Mail, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md glass p-8 rounded-3xl animate-scale-in">
        <h2 className="text-3xl font-bold mb-2 text-center">Welcome Back</h2>
        <p className="text-white/60 text-center mb-8">Sign in to your MynarenFoods account</p>

        <form action={action} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="input-field pl-12"
                required
              />
            </div>
            {state?.errors?.email && (
              <p className="text-red-400 text-xs mt-1 ml-1">{state.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="input-field pl-12"
                required
              />
            </div>
            {state?.errors?.password && (
              <p className="text-red-400 text-xs mt-1 ml-1">{state.errors.password}</p>
            )}
          </div>

          {state?.message && (
            <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-xl">
              {state.message}
            </p>
          )}

          <Button disabled={pending} type="submit" className="w-full py-4 text-lg">
            {pending ? (
              <span className="flex items-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Signing in...</span>
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-white/60">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary-400 hover:underline font-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
