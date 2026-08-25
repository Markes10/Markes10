import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Upsert a default user
  const user = await prisma.user.upsert({
    where: { email: 'dweepan@example.com' },
    update: {},
    create: {
      email: 'dweepan@example.com',
      name: 'Dweepan Gain',
    },
  });

  // Seed posts
  const posts = [
    {
      title: 'Building AI-Powered CRM Platforms',
      content:
        'A deep dive into architecting enterprise-grade AI CRM + PIM systems with LLM integration, multi-tenant design, and real-time analytics.',
      published: true,
      authorId: user.id,
    },
    {
      title: 'Optimizing NLP Pipelines for Production',
      content:
        'Lessons learned from deploying NLP classification models handling 5,000+ emails/day with 92% accuracy.',
      published: true,
      authorId: user.id,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: {
        authorId_title: { authorId: post.authorId, title: post.title },
      },
      update: {
        content: post.content,
        published: post.published,
      },
      create: post,
    });
  }

  // Seed projects
  const projects = [
    {
      title: 'AI CRM + PIM Platform',
      description:
        'Enterprise-grade CRM with AI-powered product information management serving 50+ business clients.',
      stack:
        'Python, FastAPI, React, PostgreSQL, OpenAI GPT-4, LangChain, Docker, AWS',
      highlights:
        'LLM pipelines for product categorization, AI hybrid scoring for lead prioritization, 99.7% uptime',
      url: null,
      githubUrl: null,
    },
    {
      title: 'AI Email Assistant',
      description:
        'Intelligent email management system with auto-categorization, prioritization, and smart drafting.',
      stack: 'Python, OpenAI GPT-4, FastAPI, React, TypeScript, NLP, SpaCy',
      highlights:
        '92% classification accuracy across 12 categories, 45% reduction in email handling time',
      url: null,
      githubUrl: null,
    },
    {
      title: 'Fraud Detection System',
      description:
        'Real-time fraud detection pipeline for financial transactions using ensemble ML models.',
      stack:
        'Python, XGBoost, Random Forest, Pandas, Flask, PostgreSQL, Docker',
      highlights:
        '95% precision, 91% recall, 40% fewer false positives vs rule-based system',
      url: null,
      githubUrl: null,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { title: project.title },
      update: {
        description: project.description,
        stack: project.stack,
        highlights: project.highlights,
        url: project.url,
        githubUrl: project.githubUrl,
      },
      create: project,
    });
  }

  console.log('✅ Database seeded successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
