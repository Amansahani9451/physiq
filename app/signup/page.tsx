import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';

export default async function SignupPage() {
  const user = await getSessionUser();
  if (user) redirect('/dashboard');

  return (
    <main className="container">
      <header className="topbar">
        <div className="brand"><span className="brand-badge">P</span>Physiq</div>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
        </nav>
      </header>

      <section className="hero" style={{ gridTemplateColumns: '1fr' }}>
        <div className="auth-shell" style={{ maxWidth: 620, margin: '0 auto' }}>
          <div className="auth-card">
            <div className="auth-header">
              <h3>Create account</h3>
              <span className="muted">Free and secure</span>
            </div>
            <form action="/api/auth/register" method="post" className="form-grid">
              <div className="field">
                <label htmlFor="name">Full name</label>
                <input id="name" name="name" placeholder="Your name" required />
              </div>
              <div className="field">
                <label htmlFor="username">Username</label>
                <input id="username" name="username" placeholder="myfitnessjourney" required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className="field">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" placeholder="Min 8 characters" required />
              </div>
              <button className="btn btn-primary" type="submit">Create account</button>
            </form>
            <div className="actions" style={{ marginTop: 18 }}>
              <span>Already have an account?</span>
              <Link href="/login">Log in</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
