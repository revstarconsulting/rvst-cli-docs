#!/usr/bin/env bash
#
# Deploy the built static site to AWS S3 + CloudFront.
#
# Hosting target is NOT hard-coded — set it via environment variables so we can
# switch between a dedicated bucket/distribution and reusing an existing one
# without editing this script.
#
# Required env vars:
#   S3_BUCKET            e.g. rvst-cli-docs  (or rvst-cli-releases)
#   CLOUDFRONT_DIST_ID   e.g. E3VBHALAHPTZJ0
#
# Optional env vars:
#   S3_PREFIX            key prefix within the bucket (e.g. tutorials). Default: empty (bucket root)
#   AWS_PROFILE          named AWS profile to use. Default: current credentials
#   BASE                 site base path passed to the build (e.g. /tutorials/). Must match S3_PREFIX
#   SITE                 absolute site URL for canonical links / sitemap
#
# Usage:
#   S3_BUCKET=rvst-cli-docs CLOUDFRONT_DIST_ID=EXXXX ./scripts/deploy.sh
#
set -euo pipefail

: "${S3_BUCKET:?Set S3_BUCKET to the target bucket name}"
: "${CLOUDFRONT_DIST_ID:?Set CLOUDFRONT_DIST_ID to the CloudFront distribution ID}"

S3_PREFIX="${S3_PREFIX:-}"
PROFILE_ARG=""
if [ -n "${AWS_PROFILE:-}" ]; then
  PROFILE_ARG="--profile ${AWS_PROFILE}"
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="${ROOT}/dist"

# Normalize the S3 destination (bucket + optional prefix) and the invalidation path.
if [ -n "${S3_PREFIX}" ]; then
  CLEAN_PREFIX="${S3_PREFIX#/}"; CLEAN_PREFIX="${CLEAN_PREFIX%/}"
  S3_DEST="s3://${S3_BUCKET}/${CLEAN_PREFIX}"
  INVALIDATION_PATH="/${CLEAN_PREFIX}/*"
else
  S3_DEST="s3://${S3_BUCKET}"
  INVALIDATION_PATH="/*"
fi

echo "==> Building static site"
( cd "${ROOT}" && npm run build )

if [ ! -d "${DIST}" ]; then
  echo "Build did not produce ${DIST}" >&2
  exit 1
fi

echo "==> Syncing ${DIST} -> ${S3_DEST}"
# Hashed assets (immutable) get a long cache; HTML gets no-cache so content updates are seen.
aws ${PROFILE_ARG} s3 sync "${DIST}/" "${S3_DEST}/" \
  --delete \
  --exclude "*.html" \
  --cache-control "public,max-age=31536000,immutable"

aws ${PROFILE_ARG} s3 sync "${DIST}/" "${S3_DEST}/" \
  --exclude "*" --include "*.html" \
  --cache-control "public,max-age=0,must-revalidate" \
  --content-type "text/html; charset=utf-8"

echo "==> Invalidating CloudFront ${CLOUDFRONT_DIST_ID} (${INVALIDATION_PATH})"
aws ${PROFILE_ARG} cloudfront create-invalidation \
  --distribution-id "${CLOUDFRONT_DIST_ID}" \
  --paths "${INVALIDATION_PATH}" >/dev/null

echo "==> Done."
