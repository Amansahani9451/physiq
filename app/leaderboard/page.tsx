import Link from 'next/link';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export default async function LeaderboardPage() {
  const user = await getSessionUser();
  if (!user) redirect('/login');

  const leaderboard = await prisma.user.findMany({
    orderBy: { points: 'desc' },
    take: 10,
    select: { username: true, points: true, streak: true },
  });

  const currentUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { username: true, points: true, streak: true },
  });

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

        <section className="card-panel">
          <h3>Leaderboard</h3>
          <p className="muted">Your rank is based on consistency and healthy progress, not just time spent.</p>
          <div className="leaderboard-summary">
            <strong>{currentUser?.username}</strong>
            <span>{currentUser?.points} points • {currentUser?.streak} day streak</span>
          </div>

          <table className="leaderboard-table large">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Points</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.username}>
                  <td>#{index + 1}</td>
                  <td>{entry.username}</td>
                  <td>{entry.points}</td>
                  <td>{entry.streak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
