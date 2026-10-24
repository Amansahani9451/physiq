import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';

export default async function HomePage() {
  const user = await getSessionUser();
  if (user) redirect('/dashboard');

  return (
    <main className="page-shell">
      <div className="container">
        <header className="topbar">
          <div className="brand">
            <span className="brand-mark">P</span>
            <span>Physiq</span>
          </div>

          <nav className="nav">
            <Link href="/">Home</Link>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
          </nav>
        </header>

        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Social fitness • practical routines</span>
            <h1>Build a stronger routine.</h1>
            <p>
              Physiq helps you pick your setup, follow a realistic routine, stay consistent,
              post progress, and compete kindly on the leaderboard.
            </p>

            <div className="cta-row">
              <Link href="/signup" className="btn btn-primary">Get started</Link>
              <Link href="/login" className="btn btn-secondary">Log in</Link>
            </div>

            <div className="stats-row">
              <div className="stat-card">
                <strong>10</strong>
                <span>routine templates</span>
              </div>
              <div className="stat-card">
                <strong>3x</strong>
                <span>better consistency focus</span>
              </div>
              <div className="stat-card">
                <strong>24/7</strong>
                <span>healthy habit tracking</span>
              </div>
            </div>
          </div>

          <div className="card-panel">
            <div className="panel-header">
              <h3>Welcome</h3>
              <span className="pill">Free</span>
            </div>
            <div className="auth-form-mini">
              <div className="field">
                <label>Username</label>
                <input defaultValue="demo_user" readOnly />
              </div>
              <div className="field">
                <label>Password</label>
                <input type="password" defaultValue="password123" readOnly />
              </div>
              <Link href="/signup" className="btn btn-primary btn-full">Create account</Link>
              <Link href="/login" className="btn btn-secondary btn-full">Already have an account?</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
