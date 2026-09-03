# rvst-cli-docs

Tutorials site for the RevStar CLI (`rvst-cli`) and its capability registry
(`rvst-registry`). Shows RevStar developers how to install the CLI, link a
project, and get value out of the delivered Kiro capabilities — agents, skills,
hooks, and steering.

## Stack

- **[Astro Starlight](https://starlight.astro.build/)** — static docs site.
- **Search** — Pagefind full-text search, built in, static (no server).
- **Content** — Markdown / MDX under `src/content/docs/`.
- **Videos** — unlisted YouTube, embedded via `src/components/YouTubeEmbed.astro`
  (embed by default, `mode="link"` for a link-out). Videos are **not** stored in
  this repo or the bucket.
- **Hosting** — AWS S3 + CloudFront (static `dist/` output). Target bucket and
  distribution are configured at deploy time, not hard-coded.

## Develop

```sh
npm install
npm run dev        # local dev server at http://localhost:4321
npm run build      # static output to dist/
npm run preview    # serve the built dist/ locally
```

## Deploy (AWS)

The deploy script is target-agnostic — set the bucket and distribution via env
vars so we can choose dedicated-vs-reuse without editing code:

```sh
S3_BUCKET=<bucket> CLOUDFRONT_DIST_ID=<dist-id> AWS_PROFILE=<profile> npm run deploy
```

Optional: `S3_PREFIX=tutorials` and `BASE=/tutorials/` to host under a subpath
(e.g. reusing an existing distribution). See `scripts/deploy.sh` for all vars.

## Adding a video

In any `.mdx` page:

```mdx
import { YouTubeEmbed } from '../../../components/YouTubeEmbed.astro';

<YouTubeEmbed id="UNLISTED_VIDEO_ID" title="Linking a project" />
<YouTubeEmbed id="UNLISTED_VIDEO_ID" title="Linking a project" mode="link" />
```

> Unlisted ≠ private. Anyone with the link can watch — don't use it for
> confidential material.

## Content structure

```
src/content/docs/
  index.mdx                 landing / splash
  start/                    overview, install, link
  capabilities/             overview, agents, skills, hooks, steering
  customize/                customizing, authoring-skills
  reference/                commands, troubleshooting
```

## Source of truth

Content is grounded in the actual delivered capabilities:

- CLI: `/Users/ernesto/Documents/revstar/rvst-cli`
- Registry: `/Users/ernesto/Documents/revstar/rvst-registry`
  (capability `revstar/kiro`, currently v0.7.0)
