# Context Engineering

## Prompt utilisé

> En te basant strictement sur #file:src/repositories/user.repository.js et
> #file:src/services/user.service.js, génère un nouveau service d'export de données
> dans src/services/. Reproduis exactement le même pattern d'accès au repository
> (import du singleton via `require`, appel direct de `userRepository.findByEmail`)
> et la même gestion des exceptions que `user.service.js` (test `if (!user)` puis
> `throw new Error("Utilisateur introuvable dans le système")`). Le service expose
> une méthode asynchrone qui retourne le profil utilisateur sérialisé en JSON.
> N'écris aucune autre logique et ne modifie aucun fichier existant.

## Fichiers fournis à Copilot comme contexte

- `src/repositories/user.repository.js`
- `src/services/user.service.js`

## Service généré

- Nom : `ExportService`
- Chemin : `agentic-ai/agentic-ops-tp2-main/src/services/export.service.js`

## Éléments d'architecture existante repris par l'IA

- Import du repository en tant que singleton exporté : `require('../repositories/user.repository')`.
- Accès aux données via la méthode publique du repository `findByEmail(email)`, sans requête directe à `db`.
- Classe de service contenant des méthodes `async`, instance unique exportée avec `module.exports = new ExportService()`.
- Gestion des exceptions identique : vérification `if (!user)` puis `throw new Error("Utilisateur introuvable dans le système")`.
- Nommage des fichiers `*.service.js` et emplacement dans `src/services/`.
