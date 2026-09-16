terraform {
  required_version = ">= 1.15"

  backend "s3" {
    endpoints = {
      s3 = "https://907a10968121934f11e316bb9afee6a1.r2.cloudflarestorage.com"
    }

    bucket = "workshop-platformfix-com"
    key    = "terraform/founders-platformfix-com.tfstate"

    skip_credentials_validation = true
    skip_requesting_account_id  = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    skip_s3_checksum            = true
    region                      = "us-east-1"
    use_lockfile                = true
  }

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.25"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}
