import Link from 'next/link';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export default async function FeedPage() {
  const user = await getSessionUser();
  if (!user) redirect('/login');

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: true, likes: true, comments: { include: { user: true } } },
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

        <section className="stack wide-stack">
          <div className="card-panel">
            <h3>Create progress post</h3>
            <form action="/api/posts" method="post" className="form-grid">
              <div className="field">
                <label htmlFor="caption">Caption</label>
                <textarea id="caption" name="caption" placeholder="Shared my progress today..." required></textarea>
              </div>
              <div className="field">
                <label htmlFor="imageUrl">Image URL (optional)</label>
                <input id="imageUrl" name="imageUrl" type="url" placeholder="https://example.com/progress.jpg" />
              </div>
              <button className="btn btn-primary" type="submit">Post progress</button>
            </form>
          </div>

          {posts.length === 0 ? (
            <div className="card-panel empty-state">No posts yet. Share your first workout or habit update.</div>
          ) : (
            posts.map((post) => (
              <article className="card-panel post-card" key={post.id}>
                <div className="post-header">
                  <div className="avatar-circle mini">{post.user.name.slice(0, 1).toUpperCase()}</div>
                  <div>
                    <strong>{post.user.name}</strong>
                    <div className="muted">@{post.user.username}</div>
                  </div>
                </div>

                {post.imageUrl ? <img src={post.imageUrl} alt="Progress" className="post-image" /> : null}
                <p>{post.caption}</p>
                <div className="post-meta">
                  <span>{post.likes.length} likes</span>
                  <span>{post.comments.length} comments</span>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
