variable "cloudflare_api_token" {
  description = "Cloudflare API token: Workers Scripts Write + Workers Routes Write (account-scoped, Steven@stevenwade.co.uk's Account) plus DNS Write (zone-scoped, platformfix.com) — op://Claude Code/cloudflare-founders-deploy/credential"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID"
  type        = string
  default     = "907a10968121934f11e316bb9afee6a1"
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID for platformfix.com"
  type        = string
  # Defaulted rather than requiring CI wiring, matching platformfix/tf-atuin-sync's and
  # platformfix/prs-dashboard's rationale: an issue_comment-triggered /apply run always
  # executes the workflow file on the default branch, not the PR branch, so a fix added
  # only to a PR's terraform.yml would have no effect on its own /apply run. A plain
  # Terraform default sidesteps that.
  default = "72aede7e7b7ec85b8ee8be76810e7093"
}

variable "worker_script_name" {
  description = "Name of the deployed Worker (must match wrangler.toml's top-level `name`)"
  type        = string
  default     = "founders-platformfix-com"
}
