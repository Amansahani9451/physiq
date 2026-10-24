import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/db';

export default async function LandingPage() {
  const user = await getSessionUser();
  if (user) redirect('/dashboard');

  return (
    <main>
      <div className="container">
        <header className="topbar">
          <div className="brand"><span className="brand-badge">P</span>Physiq</div>
          <nav className="nav">
            <Link href="/">Home</Link>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
          </nav>
        </header>

        <section className="hero">
          <div className="hero-copy">
            <div className="kicker">Social fitness, simplified</div>
            <h1>Build a stronger routine.</h1>
            <p>
              Physiq helps you pick a better fitness setup, follow a daily routine, stay consistent,
              share progress, and compete healthily on the leaderboard.
            </p>
            <div className="cta-row">
              <Link href="/signup" className="btn btn-primary">Get started</Link>
              <Link href="/login" className="btn btn-secondary">Log in</Link>
            </div>
            <div className="stats">
              <div className="stat"><strong>10</strong><span>Routine templates</span></div>
              <div className="stat"><strong>100+</strong><span>Workout ideas</span></div>
              <div className="stat"><strong>24/7</strong><span>Consistency focus</span></div>
            </div>
          </div>

          <div className="auth-shell">
            <div className="auth-card">
              <div className="auth-header">
                <h3>Welcome</h3>
              </div>
              <div className="form-grid">
                <div className="field">
                  <label>Username</label>
                  <input placeholder="example_user" />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <button className="btn btn-primary" type="button">Continue</button>
                <button className="btn btn-secondary" type="button">Continue with Google</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
