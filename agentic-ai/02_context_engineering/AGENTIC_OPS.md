# Agentic Ops — Ingénierie de contexte

Notes de cours : gérer la fenêtre de contexte, la mémoire persistante, les Skills
et les System Prompts pour industrialiser le travail avec un agent IA.

---

## 1. La saturation de contexte et le « Lost in the Middle »

### Le mythe de l'omniscience et la dégradation silencieuse

Après 20 minutes d'allers-retours avec l'IA pour corriger un bug tenace, l'agent
se met soudain à « halluciner » : il invente des variables ou oublie les
directives d'architecture.

**Explication technique**

- À chaque itération, l'IA relit l'intégralité de l'historique du chat.
- Plus la conversation s'allonge (copier-coller de logs d'erreurs), plus la
  fenêtre de contexte s'engorge.
- L'étude de Stanford *Lost in the Middle* montre que l'attention des LLMs se
  concentre sur le tout début du prompt (System Prompts) et la toute fin
  (dernière question), mais devient aveugle aux milliers de tokens du milieu.

### Crash test d'attention en conditions réelles

| Étape | Situation | Résultat |
|---|---|---|
| Itérations 1–5 | Fichier d'instructions exigeant TailwindCSS | Parfaitement respecté |
| Itérations 6–15 | Injection de logs serveurs massifs (5000 lignes) | L'historique enfle |
| Itération 16 | « Ajoute un bouton » | Hallucination : CSS en ligne (`style="background: blue"`) au lieu de Tailwind |

Le poids des logs a écrasé l'instruction système.

### Remèdes de l'Agentic Ops

- **Troncature (Context Truncation) — règle d'or** : ne jamais laisser un chat
  s'éterniser. Dès qu'un bug est résolu, ouvrir une nouvelle session. Moins cher
  en tokens et restaure la lucidité de l'IA à 100 %.
- **Résumé d'étape (Summarize & Restart)** : bloqué au milieu d'une refonte
  complexe, demander « Fais un résumé très technique des choix que l'on vient de
  valider en 5 points ». Copier le résumé, ouvrir un chat vierge, le coller et
  poursuivre.
- **Mise à jour de la mémoire** : une fonctionnalité terminée, ordonner
  « Mets à jour le `MEMORY.md` en y inscrivant ce que nous venons de terminer ».

---

## 2. La mémoire évolutive externe (`MEMORY.md`)

### L'amnésie native de l'IA

Fermer l'IDE le soir suffit à faire oublier à l'agent toutes les décisions
d'architecture (base de données, conventions) validées la veille.

### Le pattern de la mémoire persistante

Un fichier `MEMORY.md` à la racine du projet sert de journal de bord sémantique,
rédigé pour la machine.

```markdown
# MÉMOIRE PROJET : [Nom du Projet]

## 🛠️ Stack technique & configuration
- Backend : Node.js / NestJS (Strict Mode activé)
- Base de données : PostgreSQL / Prisma ORM

## 📐 Décisions architecturales (historique)
- [12 mai] : Isolation de la logique de calcul de TVA dans le `TaxService`.
  Les contrôleurs ne font aucun calcul.
- [15 mai] : Les montants financiers sont manipulés en `Integer` (centimes)
  pour éviter les flottants.

## 📊 État actuel & prochaine étape
- Terminés : Module d'Auth, Module Utilisateur.
- En cours : Intégration du système de paiement Stripe.
```

### Protocole d'initialisation

En début de journée, ouvrir une session vierge et taper :

> `@workspace` Initialise-toi en lisant le `#file:MEMORY.md`. Résume ta tâche actuelle.

L'agent retrouve instantanément 100 % de sa pertinence contextuelle.

---

## 3. Les « Skills » — standardiser la production logicielle

### Qu'est-ce qu'un Skill ?

Un Skill est un bloc de *prompt engineering* réutilisable qui définit exactement
comment une tâche doit être exécutée selon les normes de l'équipe. Sans lui,
chaque développeur obtient un style différent (Mocks ou non, commentaires ou
non), créant une dette de maintenabilité.

### Transformer une norme en Skill IA

Exemple : imposer le pattern AAA (Arrange, Act, Assert) pour tous les tests
unitaires, encapsulé dans `TESTING_GUIDELINES.md`.

```markdown
# SKILL : STANDARD DE TEST UNITAIRE
1. Convention de nommage : `should_[EXPECTED_BEHAVIOR]_when_[CONDITION]`
2. Structure AAA obligatoire :
   - // Arrange : initialisation des variables et des mocks.
   - // Act : appel unique de la méthode testée.
   - // Assert : vérifications via expect().
   Ces trois blocs sont toujours séparés par un saut de ligne.
```

### ROI

Invoqué avec `@workspace crée les tests en suivant #file:TESTING_GUIDELINES.md`,
le code généré passe les revues du premier coup. Le gain porte sur les
allers-retours de correction stylistique, pas seulement sur la frappe.

---

## 4. Forger un agent spécialisé (System Prompts)

### Le syndrome du couteau suisse

Un LLM non configuré répond de la manière la plus « statistiquement moyenne »
possible, en piochant dans des dépôts GitHub amateurs comme experts. Un agent
spécialisé attache systématiquement un System Prompt (fiche de poste stricte)
qui restreint l'espace probabiliste vers un domaine d'expertise précis.

### Les 4 piliers d'une fiche de poste IA (framework PRRF)

| Pilier | Rôle | Exemple |
|---|---|---|
| **Persona** | Identité & expertise | « Tu es un Tech Lead Senior, expert en architecture Node.js et en sécurité. » |
| **Rôle** | Objectif unique de la session | « Ta mission unique est d'auditer le code et d'écrire des tests. » |
| **Règles** | Guardrails & stack | « Interdiction de modifier la logique métier. Interdiction de Moment.js, utilise l'objet `Date` natif. » |
| **Format** | Règles de sortie | « Renvoie uniquement le code, sans markdown introductif ni salutations. » |

### Industrialiser au niveau du workspace

- **VS Code / GitHub Copilot** : `.github/copilot-instructions.md` à la racine,
  lu en arrière-plan à chaque requête `@workspace`.
- **Cursor** : fichier `.cursorrules` à la racine.

### Exemple de System Prompt

```text
Tu es un ingénieur QA Senior et un expert en sécurité applicative.
Ta mission est d'analyser le code fourni et de relever les anti-patterns.
Règles absolues :
- Le projet utilise TypeScript strict (strict: true).
- Toute fonction asynchrone doit gérer ses erreurs via un bloc try/catch
  ou un middleware global.
- Tu n'as pas l'autorisation de réécrire la logique métier, tu dois
  uniquement pointer l'erreur de conception.
Format : Renvoie un tableau Markdown avec les colonnes
[Ligne, Criticité, Explication, Suggestion de pattern].
Aucun texte avant ou après le tableau.
```

---

## 📚 Pour aller plus loin

- *Lost in the Middle: How Language Models Use Long Contexts* (Stanford) —
  <https://arxiv.org/abs/2307.03172>
- *External Memory Systems in LLMs* (arXiv) —
  <https://arxiv.org/abs/2305.14322>
- Martin Fowler — *Given / When / Then* —
  <https://martinfowler.com/bliki/GivenWhenThen.html>
- OpenAI — *Prompt Engineering Guide* —
  <https://developers.openai.com/api/docs/guides/prompt-engineering?api-mode=responses>
- GitHub Copilot — *Adding Custom Instructions*
