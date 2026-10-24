import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';

export default async function SignupPage() {
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
            <Link href="/login">Login</Link>
          </nav>
        </header>

        <section className="auth-card-main">
          <div className="card-panel auth-panel wide">
            <div className="panel-header">
              <h3>Create account</h3>
              <span className="pill soft">Free • secure</span>
            </div>

            <form action="/api/auth/register" method="post" className="form-grid two-up">
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

              <div className="span-2">
                <button className="btn btn-primary btn-full" type="submit">Create account</button>
              </div>
            </form>

            <div className="helper-row">
              <span>Already have an account?</span>
              <Link href="/login">Log in</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
