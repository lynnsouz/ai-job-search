# gupy-cli

Search Brazilian job postings on [Gupy](https://portal.gupy.io) from the command line.
Zero runtime dependencies: plain `bun` + `fetch` + JSON parsing (the search endpoint is
JSON, and detail pages carry the job as JSON in `__NEXT_DATA__`, so no HTML parser is needed).

**Personal use only:** Gupy's terms forbid aggregating or copying the platform. Keep volume low.

## Setup

```bash
cd .agents/skills/gupy-search/cli && bun install   # dev types only, for typecheck
```

## Usage

```bash
bun run src/cli.ts search -q "iOS" --remote remote --format table
bun run src/cli.ts search -q "desenvolvedor ios" --jobage 14
bun run src/cli.ts detail pagseguro/12683119 --format plain
bun run src/cli.ts --help
```

## Development

```bash
bun run typecheck
bun run test        # offline parsing tests + a small live smoke test against portal.gupy.io
```

Endpoint and field documentation: `../url-reference.md`.
