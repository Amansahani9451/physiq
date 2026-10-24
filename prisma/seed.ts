import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const seedUser = await prisma.user.upsert({
    where: { email: 'demo@physiq.app' },
    update: {},
    create: {
      name: 'Demo Athlete',
      username: 'demoathlete',
      email: 'demo@physiq.app',
      passwordHash: await bcrypt.hash('password123', 12),
      points: 420,
      streak: 8,
      completedWorkouts: 12,
      profile: {
        create: {
          bio: 'Building consistency and healthy habits.',
          fitnessSetup: 'HOME_GYM',
          fitnessGoal: 'STRENGTH',
          trainingDays: 4,
          experience: 'INTERMEDIATE',
          equipment: 'Dumbbells and resistance bands',
          scheduleType: 'WORKING',
          schoolTiming: 'N/A',
        },
      },
    },
  });

  const samplePost = await prisma.post.upsert({
    where: { id: 'demo-post-1' },
    update: {},
    create: {
      id: 'demo-post-1',
      userId: seedUser.id,
      caption: 'Completed my workout and kept my streak alive. Small gains matter.',
      imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
    },
  });

  await prisma.comment.upsert({
    where: { id: 'demo-comment-1' },
    update: {},
    create: {
      id: 'demo-comment-1',
      postId: samplePost.id,
      userId: seedUser.id,
      text: 'Consistency is everything.',
    },
  });

  console.log('Demo user and sample content created.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
