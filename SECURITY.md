# Security Policy

## Supported versions

This site ships one rolling deployment on `main` — there's no versioned release to track. Security fixes land on `main` and deploy on the next push.

## Reporting a vulnerability

Please report security issues privately rather than opening a public GitHub issue: use [GitHub's private vulnerability reporting](https://github.com/platformfix/founders.platformfix.com/security/advisories/new) for this repository (Security tab → Report a vulnerability).

Include what you'd include in any good bug report: the affected page or endpoint, what you found, and how to reproduce it. We'll acknowledge new reports within 5 business days and aim to have a fix or mitigation plan within 30 days, depending on severity.

## Scope

In scope: the frontend, the Cloudflare Worker (`/api/inquiry` and its Kit integration), the Terraform-managed infrastructure, and the CI/CD pipeline. Not in scope: the underlying Kit (ConvertKit) or Cloudflare platforms themselves — report those to their own vendors.
