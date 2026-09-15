# Instructions QA - securite et robustesse

## Mission

Effectuer une revue de qualite et de securite exigeante du code JavaScript et de l'image Docker de chaque workflow. La revue doit chercher des defauts exploitables, demontrer les comportements observes et proposer des corrections minimales. Ne jamais considerer qu'un service est sur uniquement parce qu'il fonctionne dans le cas nominal.

## Perimetre obligatoire

Examiner au minimum :

- tous les fichiers `.js` du workflow ;
- `Dockerfile`, `docker-compose.yml`, `.dockerignore` s'il existe et `package.json` ;
- les fichiers JSON lus au demarrage ou pendant l'execution, notamment `tasks.json` ;
- les scripts de lancement, les volumes, les variables d'environnement et les privileges du conteneur.

## Controles JavaScript obligatoires

Verifier et tester :

1. La validation stricte des entrees : type racine, champs obligatoires, types, chaines vides, valeurs inattendues, JSON mal forme et contenu extremement volumineux.
2. Les erreurs de lecture et de parsing : fichier absent, supprime apres le demarrage, permissions insuffisantes, fichier vide et remplacement atomique pendant une lecture.
3. La gestion des erreurs : aucun `catch` ne doit masquer silencieusement une panne importante. Verifier la journalisation utile, l'absence de secrets dans les logs et le comportement de sortie attendu.
4. Les effets de bord et la concurrence : timers qui se chevauchent, fuites de ressources, traitement repete, sortie non bornee et arret propre sur `SIGTERM`/`SIGINT`.
5. Les risques d'execution : ne jamais executer directement une valeur provenant de `tasks.json` avec `eval`, `exec`, `spawn` ou une API equivalente. Une action doit rester une donnee validee, ou etre limitee a une liste blanche explicite.
6. La resilience : confirmer que le service reste dans un etat connu lorsque `tasks.json` est supprime, devient illisible ou contient une action invalide. Le test doit verifier a la fois le code de retour et les logs.

## Controles Docker obligatoires

Verifier et demontrer :

- que le processus ne s'execute pas en `root` ; le `USER` doit etre explicite et verifie a l'execution ;
- que l'image de base est maintenue, suffisamment minimale et justifiee ; mesurer sa taille et signaler toute dependance ou paquet inutile ;
- que les versions d'image et de dependances sont reproductibles autant que possible et que les vulnerabilites connues sont recherchees ;
- que le contexte de build est reduit par un `.dockerignore` adapte ;
- que les fichiers copies, les permissions, le `WORKDIR`, le signal d'arret et le mode de lancement sont surs ;
- que le conteneur fonctionne avec un systeme de fichiers en lecture seule et des capacites Linux supprimees lorsque le service le permet ;
- que `docker-compose.yml` ne reintroduit pas de privileges, de montages dangereux, de reseau inutile ou de secrets en clair ;
- que le volume `tasks.json` reste lisible par l'utilisateur non privilegie et que sa suppression ou son indisponibilite est traitee proprement.

Ne pas recommander une image « plus legere » sans mesurer le compromis securite, compatibilite et maintenabilite. Une image Alpine n'est pas une preuve suffisante de securite.

## Procedure de verification

Executer les controles pertinents et rapporter les commandes utilisees ainsi que leur resultat :

```sh
npm audit --omit=dev
docker build --no-cache -t qa-task-watcher .
docker image inspect qa-task-watcher
docker run --rm --entrypoint id qa-task-watcher
docker history --no-trunc qa-task-watcher
docker compose config
```

Ajouter un test comportemental reproductible qui :

1. demarre le service avec un `tasks.json` valide ;
2. verifie qu'une action pending valide est traitee ;
3. supprime `tasks.json` pendant que le service tourne ;
4. verifie que le resultat est explicite, maitrise et conforme au contrat, sans boucle d'erreurs silencieuse ni crash non documente ;
5. restaure ensuite le fichier et verifie que le service recupere correctement, si cette recuperation fait partie du contrat.

Ne pas supprimer ou modifier les fichiers suivis du depot pour simuler ce scenario : utiliser un repertoire temporaire, une copie de travail ou un montage de test.

## Exigences de rapport

Pour chaque constat, fournir :

- une severite : `CRITIQUE`, `ELEVEE`, `MOYENNE` ou `FAIBLE` ;
- le fichier et la ligne concernes ;
- la condition d'exploitation et l'impact concret ;
- une preuve reproductible ou expliquer precisement pourquoi le controle n'a pas pu etre execute ;
- une correction ciblee et un test de non-regression.

Bloquer la validation si une faille `CRITIQUE` ou `ELEVEE` reste ouverte, notamment une execution en `root` non justifiee, une execution de donnees non fiables, un secret expose, une image vulnerable non traitee ou une panne silencieuse lorsque `tasks.json` est absent.

## Regles de decision

- Ne pas declarer « conforme » si un controle obligatoire n'a pas ete execute.
- Distinguer les faits observes, les risques deduits et les recommandations.
- Ne pas corriger un probleme en reduisant la visibilite des erreurs ou en ajoutant un `catch` silencieux.
- Verifier les corrections avec le meme test qui a revele le probleme.
- Signaler les limites de l'environnement, les outils indisponibles et les hypotheses restantes.