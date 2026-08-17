#!/usr/bin/env bash
#
# Deploie les quatre projets (Vanilla + React + Vue + Svelte) et une page d'accueil sur GitHub Pages.
#
# Structure publiee sur la branche gh-pages :
#   /                -> home/index.html (page d'accueil avec les liens)
#   /vanilla/        -> projet HTML/CSS/JS vanilla (pas de build)
#   /vue/            -> build du projet Vue
#   /react/          -> build du projet React
#   /svelte/         -> build du projet Svelte
#
# URL finale : https://tomvieilledent.github.io/holbertonschool-agentic_ai/
#
# Usage : ./deploy-all.sh
set -euo pipefail

# Dossier contenant ce script (front_end-frameworks/).
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE="$ROOT/_site"

# gh-pages est installe dans les node_modules du projet Vue.
GH_PAGES="$ROOT/vue/node_modules/.bin/gh-pages"

echo "==> Build du projet React"
(cd "$ROOT/react" && npm run build)

echo "==> Build du projet Vue"
(cd "$ROOT/vue" && npm run build)

echo "==> Build du projet Svelte"
(cd "$ROOT/svelte" && npm run build)

echo "==> Assemblage du dossier a publier (_site/)"
rm -rf "$SITE"
mkdir -p "$SITE"
cp "$ROOT/home/index.html" "$SITE/index.html"
cp -r "$ROOT/vanilla" "$SITE/vanilla"
cp -r "$ROOT/react/dist" "$SITE/react"
cp -r "$ROOT/vue/dist" "$SITE/vue"
cp -r "$ROOT/svelte/dist" "$SITE/svelte"

echo "==> Publication sur la branche gh-pages"
"$GH_PAGES" -d "$SITE"

echo "==> Termine : https://tomvieilledent.github.io/holbertonschool-agentic_ai/"
