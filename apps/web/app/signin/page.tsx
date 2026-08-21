"use client";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoader(true);
    setError("");

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/sign-in`,
        { username, password }
      )
      .then(() => {
        router.push("/dashboard");
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || "Please enter correct credentials"
        );
      })
      .finally(() => {
        setLoader(false);
      });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 font-sans text-gray-900 antialiased">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="font-semibold tracking-tight text-gray-900">
            betterStack
          </span>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Sign in
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor your stack again.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-xs font-medium text-gray-600"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                disabled={loader}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-50 disabled:opacity-50"
                placeholder="yourname"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-medium text-gray-600"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loader}
                autoComplete="current-password"
                minLength={8}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:bg-gray-50 disabled:opacity-50"
                placeholder="At least 8 characters"
              />
            </div>

            <button
              type="submit"
              disabled={loader}
              className="flex w-full items-center justify-center rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {loader ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Sign In"
              )}
            </button>

            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-2.5 text-center text-xs font-medium text-red-600">
                {error}
              </div>
            )}
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-emerald-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}