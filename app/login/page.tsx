import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';

export default async function LoginPage() {
  const user = await getSessionUser();
  if (user) redirect('/dashboard');

  return (
    <main className="container">
      <header className="topbar">
        <div className="brand"><span className="brand-badge">P</span>Physiq</div>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/signup">Sign Up</Link>
        </nav>
      </header>

      <section className="hero" style={{ gridTemplateColumns: '1fr' }}>
        <div className="auth-shell" style={{ maxWidth: 560, margin: '0 auto' }}>
          <div className="auth-card">
            <div className="auth-header">
              <h3>Log in</h3>
              <span className="muted">Secure access</span>
            </div>
            <form action="/api/auth/login" method="post" className="form-grid">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className="field">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" placeholder="••••••••" required />
              </div>
              <button className="btn btn-primary" type="submit">Log in</button>
            </form>
            <div className="actions" style={{ marginTop: 18 }}>
              <span>Need an account?</span>
              <Link href="/signup">Create one</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
