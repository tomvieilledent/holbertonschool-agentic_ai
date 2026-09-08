# SECURITY REVIEW — Refactoring itératif d'une faille d'injection SQL

Fichier cible : `agentic-ai/agentic-ops-tp2-main/src/legacy_auth.js`
Suite de tests : `agentic-ai/agentic-ops-tp2-main/test_security.js` (`npm run test:security`)

## Prompt utilisé pour demander la correction à l'Agent

> Le fichier `src/legacy_auth.js` contient une faille critique d'injection SQL :
> dans `authenticateUser(email, password)`, la requête est construite par
> concaténation de chaînes avec les entrées utilisateur (`"... email = '" + email + "' ..."`).
> Refactorise **uniquement** cette vulnérabilité en utilisant une requête
> préparée / paramétrée (placeholders `?` et valeurs liées séparément).
> Contraintes à respecter pour ne pas casser le Test 1 :
> - ne pas modifier la signature de `authenticateUser(email, password)` ;
> - ne pas modifier l'objet retourné en cas de succès : `{ success: true, user: results[0] }` ;
> - conserver le comportement fonctionnel validé par `test_security.js`.
> Adapte la simulation `db.query` pour accepter un second argument `params`
> et lier les valeurs de façon sûre (échappement des quotes). Fournis le diff.

## Résumé de la vulnérabilité identifiée

- **Type** : injection SQL (CWE-89) par concaténation de chaînes.
- **Emplacement** : `authenticateUser`, construction de `const sql = "... '" + email + "' ... '" + password + "'"`.
- **Impact** : une valeur comme `admin@entreprise.com' OR '1'='1` modifie la
  logique de la requête et permet un contournement d'authentification
  (retour d'un utilisateur `admin` sans identifiants valides — fuite de données).
- **Cause racine** : les entrées utilisateur sont traitées comme du code SQL
  et non comme des données.

## Résumé des modifications proposées par l'Agent

- `authenticateUser` utilise désormais une **requête paramétrée** :
  `"SELECT * FROM users WHERE email = ? AND password = ?"` avec les valeurs
  passées séparément : `db.query(sql, [email, password])`.
- `db.query(sql, params = [])` a été étendu pour simuler un *prepared statement* :
  chaque placeholder `?` est remplacé par la valeur correspondante après
  échappement des apostrophes (`'` → `''`), neutralisant la charge d'injection.
- **Inchangé** : signature de `authenticateUser`, objet de retour en cas de
  succès (`{ success: true, user: results[0] }`) et en cas d'échec.

## Résultat des tests

### Avant correction (`npm run test:security`)

```
Test 1 : Connexion légitime...
-> OK

Test 2 : Tentative d'injection SQL...
[DB ENGINE] ... email = 'admin@entreprise.com' OR '1'='1' AND password = 'hack'
❌ FAILED: FAILLE CRITIQUE DÉTECTÉE : L'injection SQL a réussi !
true !== false
EXIT: 1
```

- Test 1 (comportement légitime) : **PASS**
- Test 2 (injection SQL) : **FAIL** — vulnérabilité confirmée.

### Après correction (`npm run test:security`)

```
Test 1 : Connexion légitime...
-> OK

Test 2 : Tentative d'injection SQL...
[DB ENGINE] ... email = 'admin@entreprise.com'' OR ''1''=''1' AND password = 'hack'
-> OK

✅ PASSED: Le code a été correctement sécurisé par l'agent IA.
EXIT: 0
```

- Test 1 (non-régression) : **PASS**
- Test 2 (injection SQL) : **PASS** — la charge est neutralisée, la connexion échoue.
