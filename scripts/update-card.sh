#!/bin/sh
# Downloads the current build of the appliance cards from GitHub into the
# Home Assistant www folder. Works with a private repository when a GitHub
# token is supplied, and skips the download when the file has not changed.
#
#   GITHUB_TOKEN=github_pat_... ./update-card.sh
#   GITHUB_TOKEN=github_pat_... ./update-card.sh --ref latest
#   ./update-card.sh --dest /config/www/ha-appliance-cards.js --file dist/aeg-dishwasher-card.js
#
# Every option can also be given as an environment variable (REPO, REF, FILE,
# DEST, GITHUB_TOKEN).

set -eu

REPO="${REPO:-gabor-io/ha-appliance-custom-card}"
REF="${REF:-main}"
FILE="${FILE:-dist/ha-appliance-cards.js}"
DEST="${DEST:-/config/www/ha-appliance-cards.js}"
TOKEN="${GITHUB_TOKEN:-}"
QUIET=0

usage() {
  cat <<'USAGE'
Usage: update-card.sh [options]

  --repo  owner/name   GitHub repository            (default gabor-io/ha-appliance-custom-card)
  --ref   ref          branch, tag, or "latest"     (default main; "latest" = newest release)
  --file  path         file inside the repository   (default dist/ha-appliance-cards.js)
  --dest  path         where to write it            (default /config/www/ha-appliance-cards.js)
  --token token        GitHub token (or GITHUB_TOKEN env); required for a private repository
  --quiet              only print errors and actual updates
  -h, --help           this text

Exit codes: 0 = up to date or updated, 1 = download failed, 2 = bad usage.
USAGE
}

while [ $# -gt 0 ]; do
  case "$1" in
    --repo) REPO="${2:?--repo needs a value}"; shift 2 ;;
    --ref) REF="${2:?--ref needs a value}"; shift 2 ;;
    --file) FILE="${2:?--file needs a value}"; shift 2 ;;
    --dest) DEST="${2:?--dest needs a value}"; shift 2 ;;
    --token) TOKEN="${2:?--token needs a value}"; shift 2 ;;
    --quiet) QUIET=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "unknown option: $1" >&2; usage >&2; exit 2 ;;
  esac
done

command -v curl >/dev/null 2>&1 || {
  echo "curl is not available; run this script where curl exists (e.g. the Docker host)" >&2
  exit 1
}

say() { [ "$QUIET" -eq 1 ] || echo "$@"; }

API="https://api.github.com"

# GET $1 into file $2, asking for media type $3.
fetch() {
  if [ -n "$TOKEN" ]; then
    curl -fsSL -H "Authorization: Bearer $TOKEN" -H "Accept: $3" \
      -H "X-GitHub-Api-Version: 2022-11-28" -o "$2" "$1"
  else
    curl -fsSL -H "Accept: $3" -H "X-GitHub-Api-Version: 2022-11-28" -o "$2" "$1"
  fi
}

# First string value of key $1 in the JSON file $2.
json_value() {
  tr ',' '\n' <"$2" | grep -o "\"$1\"[[:space:]]*:[[:space:]]*\"[^\"]*\"" | head -n 1 |
    sed 's/.*"\([^"]*\)"[[:space:]]*$/\1/'
}

tmpdir=$(mktemp -d)
cleanup() { rm -rf "$tmpdir"; }
trap cleanup EXIT INT TERM

if [ "$REF" = "latest" ]; then
  if fetch "$API/repos/$REPO/releases/latest" "$tmpdir/release.json" "application/vnd.github+json" 2>/dev/null; then
    tag=$(json_value tag_name "$tmpdir/release.json")
  else
    tag=""
  fi
  if [ -n "$tag" ]; then
    REF="$tag"
    say "latest release: $REF"
  else
    REF="main"
    say "no release found, falling back to the main branch"
  fi
fi

CONTENTS="$API/repos/$REPO/contents/$FILE?ref=$REF"

if ! fetch "$CONTENTS" "$tmpdir/meta.json" "application/vnd.github+json"; then
  echo "cannot read $FILE from $REPO@$REF - check the token, the repository and the ref" >&2
  exit 1
fi
sha=$(json_value sha "$tmpdir/meta.json")

stamp="$DEST.sha"
if [ -n "$sha" ] && [ -f "$DEST" ] && [ -f "$stamp" ] && [ "$(cat "$stamp")" = "$sha" ]; then
  say "already up to date ($REF, ${sha%"${sha#???????}"})"
  exit 0
fi

if ! fetch "$CONTENTS" "$tmpdir/card.js" "application/vnd.github.raw"; then
  echo "downloading $FILE failed" >&2
  exit 1
fi

# a truncated or wrong file must never replace a working card
if [ ! -s "$tmpdir/card.js" ] || ! grep -q "customElements.define" "$tmpdir/card.js"; then
  echo "the downloaded file does not look like a Lovelace card, keeping the old one" >&2
  exit 1
fi

mkdir -p "$(dirname "$DEST")"
cp "$tmpdir/card.js" "$DEST.tmp"
mv "$DEST.tmp" "$DEST"
[ -n "$sha" ] && printf '%s\n' "$sha" >"$stamp"

echo "updated $DEST from $REPO@$REF"
echo "reload the browser with Ctrl+F5 (or bump ?v= on the Lovelace resource) to pick it up"
