import Link from 'next/link';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export default async function ProfilePage() {
  const user = await getSessionUser();
  if (!user) redirect('/login');

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { profile: true }
  });

  if (!dbUser) redirect('/login');

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
        <div className="card">
          <h2>{dbUser.name}</h2>
          <p className="muted">@{dbUser.username}</p>
          <p>{dbUser.profile?.bio || 'General fitness enthusiast building a better routine.'}</p>
          <div className="stats">
            <div className="stat"><strong>{dbUser.points}</strong><span>Points</span></div>
            <div className="stat"><strong>{dbUser.streak}</strong><span>Streak</span></div>
            <div className="stat"><strong>{dbUser.completedWorkouts}</strong><span>Workouts</span></div>
          </div>
        </div>

        <div className="card">
          <h3>Profile details</h3>
          <div className="list">
            <div className="list-card">Setup: {dbUser.profile?.fitnessSetup || 'Not set'}</div>
            <div className="list-card">Goal: {dbUser.profile?.fitnessGoal || 'Not set'}</div>
            <div className="list-card">Training days: {dbUser.profile?.trainingDays || 0}</div>
            <div className="list-card">Experience: {dbUser.profile?.experience || 'Not set'}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
