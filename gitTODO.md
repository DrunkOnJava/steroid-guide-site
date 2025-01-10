# GitHub Actions Implementation Guide

This guide provides detailed instructions for implementing key GitHub Actions workflows in our project.

## Table of Contents

1. [Continuous Integration Pipeline](#1-continuous-integration-pipeline)
2. [Code Quality Checks](#2-code-quality-checks)
3. [Automated Dependency Updates](#3-automated-dependency-updates)
4. [Documentation Automation](#4-documentation-automation)
5. [Bundle Size Monitoring](#5-bundle-size-monitoring)
6. [Release Management](#6-release-management)

## 1. Continuous Integration Pipeline

### Setup Instructions

1. Create directory structure:

```bash
mkdir -p .github/workflows
```

2. Create file `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run test
      - run: npm run build
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
```

3. Add test coverage configuration to `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
    },
  },
});
```

4. Update `package.json` scripts:

```json
{
  "scripts": {
    "test": "vitest run --coverage",
    "test:watch": "vitest --coverage"
  }
}
```

## 2. Code Quality Checks

### Setup Instructions

1. Create file `.github/workflows/code-quality.yml`:

```yaml
name: Code Quality

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - name: Run TypeScript compiler
        run: npx tsc --noEmit
      - name: Check formatting
        run: npx prettier --check .
```

2. Create `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

3. Update `package.json` scripts:

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## 3. Automated Dependency Updates

### Setup Instructions

1. Create file `.github/workflows/dependencies.yml`:

```yaml
name: Dependency Updates

on:
  schedule:
    - cron: "0 0 * * 1" # Weekly on Mondays
  workflow_dispatch:

jobs:
  update-deps:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - name: Update dependencies
        uses: renovatebot/renovate@v37
        with:
          configurationFile: renovate.json
          token: ${{ secrets.GITHUB_TOKEN }}
```

2. Create `renovate.json`:

```json
{
  "extends": ["config:base"],
  "packageRules": [
    {
      "matchUpdateTypes": ["minor", "patch"],
      "matchCurrentVersion": "!/^0/",
      "automerge": true
    }
  ],
  "schedule": ["every weekend"],
  "prHourlyLimit": 4,
  "prConcurrentLimit": 16,
  "rangeStrategy": "pin",
  "separateMajorMinor": true,
  "separateMultipleMajor": true
}
```

3. Add Renovate to GitHub App installations in repository settings

## 4. Documentation Automation

### Setup Instructions

1. Create file `.github/workflows/documentation.yml`:

```yaml
name: Documentation

on:
  push:
    paths:
      - "public/content/**"
      - "README.md"
      - "CONTRIBUTING.md"

jobs:
  update-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - name: Generate sitemap
        run: npm run generate-sitemap
      - name: Update headers
        run: npm run add-file-headers
      - name: Create PR
        uses: peter-evans/create-pull-request@v5
        with:
          commit-message: "docs: update documentation"
          title: "Update documentation"
          body: "Automated documentation updates"
          branch: "docs/auto-update"
          delete-branch: true
```

2. Update `package.json` scripts:

```json
{
  "scripts": {
    "generate-sitemap": "ts-node scripts/generate-sitemap.ts",
    "add-file-headers": "node scripts/add-file-headers.js"
  }
}
```

## 5. Bundle Size Monitoring

### Setup Instructions

1. Create file `.github/workflows/bundle-analysis.yml`:

```yaml
name: Bundle Analysis

on:
  pull_request:
    branches: [main]

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - name: Build and analyze bundle
        uses: jackyef/bundlewatch-gh-action@master
        with:
          bundlewatch-github-token: ${{ secrets.BUNDLEWATCH_GITHUB_TOKEN }}
```

2. Create `bundlewatch.config.json`:

```json
{
  "files": [
    {
      "path": "dist/*.js",
      "maxSize": "250kB"
    },
    {
      "path": "dist/*.css",
      "maxSize": "50kB"
    }
  ],
  "ci": {
    "trackBranches": ["main"]
  }
}
```

3. Generate GitHub token for Bundlewatch:
   - Go to GitHub Settings > Developer Settings > Personal Access Tokens
   - Generate new token with `repo` scope
   - Add token to repository secrets as `BUNDLEWATCH_GITHUB_TOKEN`

## 6. Release Management

### Setup Instructions

1. Create file `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    tags:
      - "v*"

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body_path: CHANGELOG.md
          draft: false
          prerelease: false
```

2. Create `CHANGELOG.md`:

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - YYYY-MM-DD

### Added

- Initial release
```

3. Update `package.json` scripts for versioning:

```json
{
  "scripts": {
    "version": "conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md"
  }
}
```

## Required Repository Secrets

Add these secrets in GitHub repository settings (Settings > Secrets and variables > Actions):

1. `GITHUB_TOKEN` (automatically provided by GitHub)
2. `BUNDLEWATCH_GITHUB_TOKEN` (for bundle size monitoring)

## Implementation Checklist

- [ ] Create `.github/workflows` directory
- [ ] Set up CI pipeline (ci.yml)
- [ ] Configure code quality checks (code-quality.yml)
- [ ] Set up Renovate for dependency updates
- [ ] Configure documentation automation
- [ ] Set up bundle size monitoring
- [ ] Configure release management
- [ ] Add required repository secrets
- [ ] Update package.json scripts
- [ ] Create/update configuration files
- [ ] Test each workflow manually using workflow_dispatch

## Best Practices

1. **Workflow Organization**

   - Keep workflows focused and single-purpose
   - Use descriptive names for workflows and jobs
   - Comment complex steps for clarity

2. **Security**

   - Regularly rotate tokens and secrets
   - Use minimum required permissions
   - Review third-party actions before use

3. **Performance**

   - Use build caching
   - Optimize workflow triggers
   - Clean up artifacts regularly

4. **Maintenance**
   - Keep action versions updated
   - Monitor workflow usage and costs
   - Review and update workflow configurations regularly
