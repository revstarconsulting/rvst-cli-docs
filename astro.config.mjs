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
      title: 'RevStar CLI Tutorials',
      description:
        'Install rvst-cli, link a project, and get value from the delivered Kiro capabilities — agents, skills, hooks, and steering.',
      // Pagefind full-text search is on by default for static builds.
      social: [],
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'What is rvst-cli?', slug: 'start/overview' },
            { label: 'Install', slug: 'start/install' },
            { label: 'Link a Project', slug: 'start/link' },
          ],
        },
        {
          label: 'Capabilities',
          items: [
            { label: 'Overview', slug: 'capabilities/overview' },
            { label: 'Agents', slug: 'capabilities/agents' },
            { label: 'Skills', slug: 'capabilities/skills' },
            { label: 'Hooks', slug: 'capabilities/hooks' },
            { label: 'Steering', slug: 'capabilities/steering' },
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
