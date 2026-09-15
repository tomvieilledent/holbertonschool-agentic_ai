# Spécifications fonctionnelles

## Contexte

Le système doit surveiller le fichier de données `tasks.json` afin d’identifier la prochaine tâche à traiter. Il doit fonctionner en continu et informer l’utilisateur de l’action associée à la première tâche dont le statut est `pending`.

## User Story

En tant qu’utilisateur du système, je veux que les tâches soient consultées automatiquement toutes les 5 secondes afin de connaître, dans la console, l’action de la première tâche en attente.

## Règles de gestion

- Le fichier de référence est `tasks.json`.
- Une vérification doit être effectuée toutes les 5 secondes, de manière répétée et sans arrêt volontaire du système.
- Les tâches sont examinées dans leur ordre d’apparition dans `tasks.json`.
- Seule la première tâche ayant exactement le statut `pending` est retenue.
- Lorsque cette tâche existe, son champ `action` doit être affiché dans la console.
- Les tâches placées après la première tâche `pending` ne doivent pas être affichées lors de la même vérification.
- Lorsqu’aucune tâche n’a le statut `pending`, aucune action de tâche ne doit être affichée.
- Chaque vérification doit utiliser l’état courant du fichier afin de prendre en compte les changements intervenus depuis la vérification précédente.
- Une erreur de lecture ou un contenu inexploitable ne doit pas être présenté comme une action de tâche valide.

## Critères d’acceptation

- **AC1 - Lecture répétée :** le système réalise une nouvelle vérification à intervalles de 5 secondes tant qu’il est en fonctionnement.
- **AC2 - Première tâche en attente :** lorsqu’une liste contient plusieurs tâches dont le statut est `pending`, seule l’action de la première est affichée.
- **AC3 - Absence de tâche en attente :** lorsqu’aucune tâche n’a le statut `pending`, aucune action n’est affichée pour cette vérification.
- **AC4 - Actualisation :** lorsqu’une modification de `tasks.json` intervient entre deux vérifications, la vérification suivante utilise les nouvelles données.
- **AC5 - Sortie observable :** l’action affichée correspond exactement à la valeur du champ `action` de la tâche retenue.
- **AC6 - Fonctionnement continu :** après une vérification réussie, le système reste actif pour effectuer la suivante.
- **AC7 - Données invalides :** si `tasks.json` ne peut pas être lu ou ne contient pas une liste de tâches exploitable, aucune action invalide n’est affichée.

## Contraintes

- Le traitement doit fonctionner en continu sans intervention manuelle entre deux vérifications.
- L’intervalle entre deux vérifications doit être de 5 secondes.
- La console constitue le seul canal attendu pour l’affichage de l’action.
- Le comportement doit rester déterministe : à données identiques et ordre identique, la même action doit être retenue.
- Le système ne doit pas modifier les données de `tasks.json`.

## Exigences Docker

- Le système doit pouvoir être démarré dans un conteneur Docker.
- Le démarrage du conteneur doit lancer automatiquement le traitement attendu, sans étape manuelle supplémentaire.
- Le conteneur doit rester actif tant que la surveillance périodique est attendue.
- Les sorties destinées à la console doivent être visibles dans les journaux du conteneur.
- Le fichier `tasks.json` doit être accessible au système pendant toute la durée de l’exécution.
- L’arrêt du conteneur doit interrompre la surveillance.
