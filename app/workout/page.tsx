import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import WorkoutTimer from '@/components/WorkoutTimer';

export default async function WorkoutPage() {
  const user = await getSessionUser();
  if (!user) redirect('/login');

  return (
    <main className="page-shell">
      <div className="container">
        <header className="topbar">
          <div className="brand">
            <span className="brand-mark">P</span>
            <span>Physiq</span>
          </div>

          <nav className="nav">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/workout">Workout</Link>
            <Link href="/feed">Feed</Link>
            <Link href="/leaderboard">Leaderboard</Link>
            <Link href="/profile">Profile</Link>
            <form action="/api/auth/logout" method="post">
              <button type="submit" className="btn btn-secondary">Logout</button>
            </form>
          </nav>
        </header>

        <WorkoutTimer />
      </div>
    </main>
  );
}
