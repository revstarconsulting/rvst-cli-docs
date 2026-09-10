// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// If deploying under a subpath (e.g. CloudFront /tutorials/), set SITE and BASE
// at build time: SITE=https://docs.example.com BASE=/tutorials npm run build
const site = process.env.SITE || undefined;
const base = process.env.BASE || undefined;

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [
    starlight({
      title: 'Kiro Workbench Docs',
      description:
        'Install kiroctl, bind a client-scoped project, and use the delivered Kiro capabilities — agents, skills, gates, steering, missions and QA.',
      // Pagefind full-text search is on by default for static builds.
      social: [],
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'What is Kiro Workbench?', slug: 'start/overview' },
            { label: 'Install', slug: 'start/install' },
            { label: 'Your first project', slug: 'start/first-run' },
            { label: 'Try Kiro', slug: 'start/try-kiro' },
          ],
        },
        {
          label: 'Capabilities',
          items: [
            { label: 'Overview', slug: 'capabilities/overview' },
            { label: 'Agents', slug: 'capabilities/agents' },
            { label: 'Skills', slug: 'capabilities/skills' },
            { label: 'Gates', slug: 'capabilities/gates' },
            { label: 'Steering', slug: 'capabilities/steering' },
          ],
        },
        {
          label: 'Workflows',
          items: [
            { label: 'Missions & /goal', slug: 'workflows/missions' },
            { label: 'QA & Design', slug: 'workflows/qa-and-design' },
            { label: 'Azure DevOps power', slug: 'workflows/azure-devops' },
          ],
        },
        {
          label: 'Customize',
          items: [
            { label: 'Customize Without Losing It', slug: 'customize/customizing' },
            { label: 'Author Your Own Skill', slug: 'customize/authoring-skills' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Commands', slug: 'reference/commands' },
            { label: 'Troubleshooting', slug: 'reference/troubleshooting' },
          ],
        },
      ],
    }),
  ],
});
