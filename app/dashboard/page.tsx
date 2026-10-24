import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect('/login');

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      profile: true,
      posts: { include: { likes: true, comments: { include: { user: true } } } },
      followers: true,
      following: true,
    }
  });

  if (!dbUser) redirect('/login');

  const leaderboard = await prisma.user.findMany({
    orderBy: { points: 'desc' },
    take: 5,
    select: { username: true, points: true, streak: true }
  });

  return (
    <main className="container">
      <header className="topbar">
        <div className="brand"><span className="brand-badge">P</span>Physiq</div>
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/profile">Profile</Link>
          <form action="/api/auth/logout" method="post"><button className="btn btn-secondary" type="submit">Logout</button></form>
        </nav>
      </header>

      <section className="dashboard-grid">
        <div>
          <div className="card">
            <p className="kicker">Good morning</p>
            <h2>{dbUser.name}</h2>
            <p className="muted">Today’s goal: workout + routine consistency.</p>
            <div className="stats" style={{ marginTop: '18px' }}>
              <div className="stat"><strong>{dbUser.points}</strong><span>Points</span></div>
              <div className="stat"><strong>{dbUser.streak}</strong><span>Streak</span></div>
              <div className="stat"><strong>{dbUser.completedWorkouts}</strong><span>Workouts</span></div>
            </div>
          </div>

          <div className="card" style={{ marginTop: '18px' }}>
            <h3>Today’s routine</h3>
            <div className="list">
              {[
                '06:30 AM — Wake-up + hydration',
                '07:00 AM — Mobility warm-up',
                '07:15 AM — Strength circuit',
                '12:30 PM — Lunch and protein intake',
                '05:30 PM — Workout session',
                '09:00 PM — Wind down & sleep prep'
              ].map((item) => (
                <div className="list-card" key={item}>{item}</div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <h3>Leaderboard</h3>
            <table className="table-list">
              <thead>
                <tr><th>User</th><th>Points</th><th>Streak</th></tr>
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
          <div className="card" style={{ marginTop: '18px' }}>
            <h3>Routine status</h3>
            <div className="list">
              <div className="list-card">Workout complete: {dbUser.completedWorkouts > 0 ? 'Yes' : 'Not yet'}</div>
              <div className="list-card">Hydration reminder: 2L goal</div>
              <div className="list-card">Weekly goal: 3 work sessions</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
