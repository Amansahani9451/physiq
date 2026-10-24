import Link from 'next/link';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export default async function ProfilePage() {
  const user = await getSessionUser();
  if (!user) redirect('/login');

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { profile: true },
  });

  if (!dbUser) redirect('/login');

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

        <section className="dashboard-grid profile-grid">
          <div className="card-panel">
            <div className="profile-head">
              <div className="avatar-circle">{dbUser.name.slice(0, 1).toUpperCase()}</div>
              <div>
                <h2>{dbUser.name}</h2>
                <p className="muted">@{dbUser.username}</p>
              </div>
            </div>

            <p className="muted">{dbUser.profile?.bio || 'General fitness enthusiast building a better routine.'}</p>

            <div className="stats-row">
              <div className="stat-card small"><strong>{dbUser.points}</strong><span>Points</span></div>
              <div className="stat-card small"><strong>{dbUser.streak}</strong><span>Streak</span></div>
              <div className="stat-card small"><strong>{dbUser.completedWorkouts}</strong><span>Workouts</span></div>
            </div>
          </div>

          <div className="card-panel">
            <h3>Profile details</h3>
            <div className="list-stack">
              <div className="list-item">Setup: {dbUser.profile?.fitnessSetup || 'Not set'}</div>
              <div className="list-item">Goal: {dbUser.profile?.fitnessGoal || 'Not set'}</div>
              <div className="list-item">Training days: {dbUser.profile?.trainingDays || 0}</div>
              <div className="list-item">Experience: {dbUser.profile?.experience || 'Not set'}</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
