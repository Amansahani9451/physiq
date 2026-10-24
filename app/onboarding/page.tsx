import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';

export default async function OnboardingPage() {
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

        <section className="card-panel onboarding-card">
          <p className="eyebrow">Your setup</p>
          <h2>Set up your ideal routine</h2>

          <form action="/api/onboarding" method="post" className="form-grid two-up">
            <div className="field">
              <label htmlFor="fitnessSetup">Fitness setup</label>
              <select id="fitnessSetup" name="fitnessSetup">
                <option value="HOME">Home Workout</option>
                <option value="GYM">Gym</option>
                <option value="HOME_GYM">Home Gym</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="fitnessGoal">Goal</label>
              <select id="fitnessGoal" name="fitnessGoal">
                <option value="GENERAL">General fitness</option>
                <option value="STRENGTH">Strength</option>
                <option value="MUSCLE">Muscle building</option>
                <option value="ENDURANCE">Endurance</option>
                <option value="ROUTINE">Better daily routine</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="trainingDays">Days per week</label>
              <input id="trainingDays" name="trainingDays" type="number" min="2" max="7" defaultValue={3} />
            </div>

            <div className="field">
              <label htmlFor="experience">Experience</label>
              <select id="experience" name="experience">
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="equipment">Equipment</label>
              <input id="equipment" name="equipment" defaultValue="Bodyweight + dumbbells" />
            </div>

            <div className="field">
              <label htmlFor="scheduleType">Schedule</label>
              <select id="scheduleType" name="scheduleType">
                <option value="STUDENT">Student</option>
                <option value="WORKING">Working</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="field span-2">
              <label htmlFor="schoolTiming">School/work timing</label>
              <input id="schoolTiming" name="schoolTiming" defaultValue="08:00 AM - 02:00 PM" />
            </div>

            <div className="field span-2">
              <label htmlFor="bio">Bio</label>
              <textarea id="bio" name="bio" placeholder="I want to build consistency and feel stronger every week."></textarea>
            </div>

            <div className="span-2">
              <button className="btn btn-primary btn-full" type="submit">Save routine setup</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
