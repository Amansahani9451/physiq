import Link from 'next/link';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect('/login');

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      profile: true,
      posts: { orderBy: { createdAt: 'desc' }, take: 3 },
      followers: true,
      following: true,
    },
  });

  if (!dbUser) redirect('/login');

  const leaderboard = await prisma.user.findMany({
    orderBy: { points: 'desc' },
    take: 5,
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

        <section className="dashboard-grid">
          <div className="stack">
            <div className="card-panel">
              <p className="eyebrow">Good morning</p>
              <h2>{dbUser.name}</h2>
              <p className="muted">Today’s goal: stay consistent and move with intention.</p>

              <div className="stats-row">
                <div className="stat-card small">
                  <strong>{dbUser.points}</strong>
                  <span>points</span>
                </div>
                <div className="stat-card small">
                  <strong>{dbUser.streak}</strong>
                  <span>streak</span>
                </div>
                <div className="stat-card small">
                  <strong>{dbUser.completedWorkouts}</strong>
                  <span>workouts</span>
                </div>
              </div>
            </div>

            <div className="card-panel">
              <h3>Today’s routine</h3>
              <div className="list-stack">
                {[
                  '06:30 AM — Wake-up + hydration',
                  '07:00 AM — Mobility warm-up',
                  '07:15 AM — Strength circuit',
                  '12:30 PM — Lunch & recovery',
                  '05:30 PM — Workout session',
                  '09:00 PM — Wind down & sleep prep',
                ].map((item) => (
                  <div className="list-item" key={item}>{item}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="stack">
            <div className="card-panel">
              <h3>Leaderboard</h3>
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Points</th>
                    <th>Streak</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={entry.username}>
                      <td>#{index + 1} {entry.username}</td>
                      <td>{entry.points}</td>
                      <td>{entry.streak}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card-panel">
              <h3>Routine status</h3>
              <div className="list-stack">
                <div className="list-item">Hydration target: 2L</div>
                <div className="list-item">Workout goal: 3 sessions this week</div>
                <div className="list-item">Consistency streak: {dbUser.streak} days</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
