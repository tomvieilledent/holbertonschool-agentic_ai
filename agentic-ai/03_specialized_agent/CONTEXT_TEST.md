# CONTEXT TEST — Crash test de saturation d'attention

Question posée dans les deux cas : « Au fait, rappelle-moi la règle de
nommage exacte de nos tests selon nos guidelines d'entreprise ? »

## Réponse avant purge du contexte (session saturée)

Session ayant servi à générer `cart_calculator.test.js`, polluée juste avant
la question par 4 paragraphes de Lorem Ipsum et 3 questions complexes
hors-sujet (NP-complétude, Traité de Westphalie, algorithmes de compression).

> La convention de nommage définie dans `TESTING_GUIDELINES.md` est :
> `should_[EXPECTED_BEHAVIOR]_when_[CONDITION]`
> Exemple donné dans le fichier : `should_return_zero_when_cart_is_empty`.
> Structure du corps du test en 3 blocs séparés par des sauts de ligne :
> `// Arrange`, `// Act`, `// Assert`.

## Réponse après réinitialisation (nouvel agent, contexte vierge)

Nouvelle session, initialisée uniquement avec `MEMORY.md` et
`TESTING_GUIDELINES.md` (aucun historique de la session précédente).

> La règle est : `should_[EXPECTED_BEHAVIOR]_when_[CONDITION]`

## Constat

Aucune dégradation observée dans ce test : les deux réponses sont
identiques et correctes. Contrairement au scénario de dérive décrit dans
`AGENTIC_OPS.md` (« Lost in the Middle »), le bruit injecté (~250 mots) est
resté très en-deçà de la capacité de la fenêtre de contexte du modèle utilisé
ici, et la règle recherchée avait été lue et citée peu avant dans la même
session — donc proche de la fin du contexte, la zone la mieux retenue.
L'expérience confirme la théorie sans la reproduire à cette échelle : la
dérive attendue nécessiterait un volume de bruit bien plus important (des
milliers de lignes, comme dans l'exemple du cours) ou une information cible
noyée loin dans le milieu de l'historique.
