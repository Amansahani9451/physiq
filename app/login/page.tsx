import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';

export default async function LoginPage() {
  const user = await getSessionUser();
  if (user) redirect('/dashboard');

  return (
    <main className="page-shell">
      <div className="container auth-wrap">
        <header className="topbar">
          <div className="brand">
            <span className="brand-mark">P</span>
            <span>Physiq</span>
          </div>

          <nav className="nav">
            <Link href="/">Home</Link>
            <Link href="/signup">Sign Up</Link>
          </nav>
        </header>

        <section className="auth-card-main">
          <div className="card-panel auth-panel">
            <div className="panel-header">
              <h3>Log in</h3>
              <span className="pill soft">Secure access</span>
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

              <button className="btn btn-primary btn-full" type="submit">Log in</button>
            </form>

            <div className="helper-row">
              <span>Need an account?</span>
              <Link href="/signup">Create one</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
