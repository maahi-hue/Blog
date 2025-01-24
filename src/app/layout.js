import "./globals.css";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "A simple blog application",
};

export default async function RootLayout({ children }) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <html lang="en">
      <body>
        <header className="bg-gray-800 text-white shadow-lg">
          <nav className="container mx-auto flex justify-between items-center py-4 px-6">
            <h1 className="text-3xl font-bold tracking-tight">BLOG</h1>
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                className="text-sm font-semibold text-white hover:text-gray-200"
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-semibold text-white hover:text-gray-200"
              >
                Profile
              </Link>
              {!(await isAuthenticated()) ? (
                <>
                  <LoginLink className="text-sm font-semibold text-white hover:text-gray-200 border border-gray-500 rounded-md px-2 py-1 bg-slate-700">
                    Sign in
                  </LoginLink>
                  <RegisterLink className="text-sm font-semibold text-white hover:text-gray-200 border border-gray-500 rounded-md px-2 py-1 bg-slate-700">
                    Sign up
                  </RegisterLink>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  {user?.picture ? (
                    <img
                      className="w-10 h-10 rounded-full border-2 border-white"
                      src={user?.picture}
                      alt="user profile avatar"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center bg-indigo-700 text-white font-semibold rounded-full">
                      {user?.given_name?.[0]}
                      {user?.family_name?.[0]}
                    </div>
                  )}
                  <div>
                    <p className="text-lg font-semibold">
                      {user?.given_name} {user?.family_name}
                    </p>
                    <LogoutLink className="text-sm font-semibold text-white hover:text-gray-200 border border-gray-500 rounded-md px-2 py-1 bg-slate-700">
                      Log out
                    </LogoutLink>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </header>
        <main className="min-h-screen bg-gray-100 p-6">{children}</main>
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto text-center space-y-4">
            <strong className="text-2xl font-semibold">BLOG</strong>
            <p className="text-gray-400 text-sm">
              © 2025 Blog, Inc. All rights reserved
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
