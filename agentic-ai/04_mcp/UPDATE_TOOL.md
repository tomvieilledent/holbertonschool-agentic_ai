# UPDATE_TOOL — Nouvel outil MCP en écriture

## Tool ajouté

`update_customer_status` — déclaré dans `ListToolsRequestSchema` et implémenté
dans `CallToolRequestSchema` de `mcp_server.js`.

## Paramètres transmis lors du test

```json
{ "email": "dev@entreprise.com", "new_status": "Inactif" }
```

## Résultat retourné par le Tool

```
Succès: le statut de dev@entreprise.com est maintenant "Inactif".
```

## Vérification Human-in-the-Loop

Avant d'autoriser l'appel, le nom du Tool (`update_customer_status`) et les
deux paramètres (`email: dev@entreprise.com`, `new_status: Inactif`) ont été
relus et confirmés conformes à la demande avant exécution.
