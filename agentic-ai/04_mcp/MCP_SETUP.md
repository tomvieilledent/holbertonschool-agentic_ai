# MCP_SETUP — Déploiement du serveur CRM

## Serveur MCP configuré

- Nom dans `.vscode/mcp.json` : `crm-server`
- Commande : `/usr/bin/env node agentic-ai/agentic-ops-tp4-main/mcp_server.js` (transport `stdio`)
- Identité protocole renvoyée par le serveur (`initialize`) : `crm-mock-server` v1.0.0

## Tool CRM détecté

- `get_customer_status` — récupère le statut client + statut de commande via un email.

## Résultat de la vérification

Poignée de main MCP effectuée en direct sur `stdio` (`initialize` →
`notifications/initialized` → `tools/list` → `tools/call`) :

- `tools/list` renvoie exactement un outil : `get_customer_status`.
- `tools/call get_customer_status` avec `email: "dev@entreprise.com"` renvoie
  `{ "id": 101, "status": "Active", "order_status": "Livrée" }`.

Le serveur charge et expose correctement le Tool CRM attendu.
