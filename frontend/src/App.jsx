import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import Dashboard from "./pages/Dashboard";
import AllPosts from "./pages/AllPosts";
import PostDetail from "./pages/PostDetail";
import Categories from "./pages/Categories";

function Navigation() {
  return (
    <nav className="flex items-center gap-6">
      <Link to="/" className="hover:text-blue-600 transition-colors">
        All Posts
      </Link>
      <SignedIn>
        <Link to="/my-posts" className="hover:text-blue-600 transition-colors">
          My Posts
        </Link>
        <Link to="/categories" className="hover:text-blue-600 transition-colors">
          Categories
        </Link>
      </SignedIn>
    </nav>
  );
}

export default function App() {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="mx-auto max-w-6xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div>
                <h1 className="text-2xl font-bold">Week 4 • Blog App</h1>
                <p className="text-slate-600 text-sm">
                  MERN Stack • Express + MongoDB + React + Tailwind
                </p>
              </div>
              <Navigation />
            </div>
            <div className="flex items-center gap-3">
              <SignedOut>
                <SignInButton mode="modal" />
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </header>

        <main className="py-8">
          <div className="mx-auto max-w-6xl px-4">
            <Routes>
              <Route path="/" element={<AllPosts />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route
                path="/my-posts"
                element={
                  <SignedIn>
                    <Dashboard />
                  </SignedIn>
                }
              />
              <Route
                path="/categories"
                element={
                  <SignedIn>
                    <Categories />
                  </SignedIn>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>

        <footer className="bg-white border-t mt-12">
          <div className="mx-auto max-w-6xl p-6 text-center text-slate-600">
            <p>Week 4 MERN Blog App • Built with Express, MongoDB, React, and Tailwind CSS</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
