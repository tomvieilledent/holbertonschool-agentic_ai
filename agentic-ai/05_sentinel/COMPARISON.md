# COMPARAISON — Mon implémentation vs. la solution officielle (`agentic_ops_tp5-main`)

Implémentation faite indépendamment, sans copier le code de la solution
fournie en tâche 4. Comparaison a posteriori.

## Tests réels effectués

- **Task 1** : `fetch_github_issues(facebook, react)` avec token valide → 5 vraies issues renvoyées.
- **Task 2** : token remplacé par une valeur invalide, même appel → erreur `401 Unauthorized` renvoyée proprement (`isError: true`), processus Node non planté.
- **Task 3** : token restauré, `fetch_github_issues(microsoft, vscode)` → 5 vraies issues, injectées dans `index.html` / `app.js` / `style.css` (vanilla JS, conforme à `.github/copilot-instructions.md`).

## Différences avec la solution

| Aspect | Ma version | Solution officielle |
|---|---|---|
| Token | `process.env.GITHUB_TOKEN` | Hardcodé dans le fichier (`GITHUB_TOKEN = "ghp_..."`) |
| Appel API | `GET /issues?per_page=5` (5 issues demandées directement) | `GET /issues` (jusqu'à 30 par défaut) puis `.slice(0, 5)` côté code |
| Erreur HTTP (`!response.ok`) | `isError: true` + message avec code et raison | Identique dans le principe |
| Erreur réseau (`catch`) | Message d'erreur renvoyé, pas de crash | Identique dans le principe |
| `.vscode/mcp.json` | `/usr/bin/env node <chemin absolu>`, token injecté via `env` | `wsl.exe` avec chemin placeholder à compléter |
| Dashboard (task 3) | Non fourni dans la solution — construit à partir de zéro | — |

## Constat

La logique métier (déclaration du tool, validation des arguments obligatoires,
`isError` sur échec HTTP, `try/catch` sur échec réseau) est équivalente entre
les deux versions — c'est le point testé par l'exercice et il fonctionne à
l'identique. Les différences portent sur des choix d'implémentation annexes
(source du token, pagination côté API) sans impact sur le comportement
demandé.
