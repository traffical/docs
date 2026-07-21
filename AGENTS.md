# Documentation project instructions

## About this project

- This is a documentation site built on [Mintlify](https://mintlify.com)
- Pages are MDX files with YAML frontmatter
- Configuration and navigation live in `docs.json`
- Run `mint dev` to preview locally
- Run `mint broken-links` to check links

## Style preferences

- Use active voice and second person ("you")
- Keep sentences concise — one idea per sentence
- Use sentence case for headings
- Bold for UI elements: Click **Settings**
- Code formatting for file names, commands, paths, and code references

## Content boundaries

- Document only the **public, stable** surface: published SDK methods, public HTTP
  endpoints, shipped CLI commands/flags, documented config keys, dashboard features.
- Do **not** document internal-only services, experimental code, private helpers, or
  admin tooling — and never name internal components, infrastructure vendors, or
  hosting details in docs pages.
- If the source is ambiguous about whether something is public or how it behaves,
  flag it for human review rather than guessing.

## Verifying against source

Maintainers keep a local, untracked source-of-truth map at `.agents/source-map.md`
(gitignored). If it is present in your checkout, use it to locate the code that
backs each docs area before asserting behavior. If it is absent, verify claims
against the published SDKs and public docs, and flag anything you cannot confirm.
