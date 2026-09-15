# Spécifications fonctionnelles et techniques

## Objectif
Définir un script qui surveille en continu le fichier `tasks.json`, toutes les 5 secondes, et affiche dans la console l’action de la première tâche dont le statut est `pending`.

Le script doit être exécuté dans un conteneur Docker léger.

## Périmètre
Le comportement attendu se limite à :
- lire `tasks.json` en boucle,
- identifier la première tâche avec `status: "pending"`,
- afficher sa valeur `action` dans la console,
- fonctionner de manière continue dans Docker.

Aucune modification de `tasks.json` n’est demandée.
Aucune interface graphique n’est requise.

## Données attendues
Le fichier `tasks.json` contient une liste d’objets avec au minimum les champs suivants :
- `id`
- `action`
- `status`

Le statut à prendre en compte est strictement `pending`.

## Comportement fonctionnel
1. Le script lit le contenu de `tasks.json`.
2. Il parcourt les tâches dans l’ordre du fichier.
3. Il sélectionne la première tâche dont `status` vaut `pending`.
4. Il affiche dans la console la valeur du champ `action` de cette tâche.
5. Si aucune tâche n’est `pending`, le script affiche un message explicite indiquant qu’aucune action n’est disponible.
6. Le script répète ce cycle toutes les 5 secondes.

## Règles de sélection
- L’ordre des tâches dans le fichier est significatif.
- Une seule tâche doit être affichée par cycle : la première tâche `pending` trouvée.
- Si plusieurs tâches sont `pending`, la priorité va à la première dans la liste.
- Si la structure du fichier est invalide, le script doit signaler l’erreur de manière lisible dans la console.

## Contraintes d’exécution
- Le script doit tourner de façon persistante jusqu’à arrêt explicite du conteneur.
- L’intervalle de vérification est fixé à 5 secondes.
- Le conteneur doit rester léger, avec une image de base minimale.
- Le conteneur doit embarquer uniquement ce qui est nécessaire à l’exécution du script.

## Contraintes Docker
Le conteneur doit respecter les principes suivants :
- image de base légère,
- exécution simple du script au démarrage,
- montage ou inclusion de `tasks.json` accessible au runtime,
- logs visibles directement via la sortie standard du conteneur.

## Observabilité
Les messages affichés dans la console doivent permettre de comprendre rapidement :
- quelle action a été trouvée,
- si aucune tâche n’est en attente,
- si le fichier est illisible ou invalide.

## Critères d’acceptation
Le besoin est considéré comme satisfait si :
- le script lit bien `tasks.json` toutes les 5 secondes,
- il affiche l’action de la première tâche `pending`,
- il ne retourne pas une tâche déjà `done` si une tâche `pending` existe avant ou après dans le fichier,
- il fonctionne correctement dans un conteneur Docker léger,
- les messages de sortie sont compréhensibles.

## Hypothèses
- `tasks.json` reste au format tableau JSON.
- Le fichier est disponible au même emplacement que celui attendu par le conteneur ou monté dans le conteneur.
- Le script n’a pas besoin de modifier l’état des tâches.

## Hors périmètre
- ajout ou suppression de tâches,
- persistance de l’état traité,
- API réseau,
- interface web,
- orchestration multi-conteneurs.
