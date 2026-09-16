# ORDERING: `cloudflare_workers_route.founders` below references an
# already-deployed Worker script by name — so the first `wrangler deploy`
# (via CI, on the first push to main) must happen before `terraform apply`
# can bind the hostname to it. Mirrors platformfix/prs-dashboard's
# cloudflare_workers_route resource exactly, including the reason it's a
# Route and not a Custom Domain (Routes take precedence over Custom Domains
# on the same hostname, and — unlike Custom Domains — coexist cleanly with a
# wrangler.toml that declares no `routes` entry of its own).
#
# No wildcard DNS record covers founders.platformfix.com the way
# *.stevenwade.xyz covers prs.stevenwade.xyz, so unlike prs-dashboard this
# repo DOES need its own DNS record — a placeholder, proxied A record
# pointing at the reserved documentation IP 192.0.2.1. Cloudflare's Workers
# routing intercepts the request at the edge before any real origin is ever
# reached, so the IP itself is never contacted; it exists only so the
# hostname resolves at all and Universal SSL covers it. Mirrors
# platformfix/tf-atuin-sync's cloudflare_dns_record resource shape.

resource "cloudflare_dns_record" "founders" {
  zone_id = var.cloudflare_zone_id
  name    = "founders.platformfix.com"
  type    = "A"
  content = "192.0.2.1"
  ttl     = 1 # automatic
  proxied = true
}

resource "cloudflare_workers_route" "founders" {
  zone_id = var.cloudflare_zone_id
  pattern = "founders.platformfix.com/*"
  script  = var.worker_script_name
}
