# React vs Vue.js vs Svelte

Même landing page, faite trois fois : React, puis Vue 3, puis Svelte 5 (en
migrant depuis les deux précédentes, dans le même dépôt, avec la même
structure de dossiers). Chaque section ci-dessous répond directement aux
questions posées.

## 1. Overall comparison

**Similitudes entre React, Vue.js et Svelte.**
- Les trois découpent l'UI en composants réutilisables, isolés, avec des
  props en entrée et un rendu qui dépend de l'état interne.
- Les trois ont un système de réactivité qui redessine automatiquement le
  DOM quand une donnée observée change, sans manipulation manuelle du DOM.
- Les trois permettent de regrouper logique, template et style dans un seul
  fichier par composant (`.jsx`, `.vue`, `.svelte`).
- Les trois utilisent Vite comme outil de build dans ce projet, avec la
  même structure de dossiers (`components/{cards,layout,sections,ui}`,
  `data/`, `services/`, `global.css`, `main`).
- Les trois proposent une fonction de montage dédiée pour le code à lancer
  une seule fois (`useEffect(fn, [])`, `onMounted`, `onMount`).

**Différences entre les trois implémentations.**
- React est une bibliothèque JS pure : le HTML est simulé en JSX à
  l'intérieur d'une fonction JS. Vue et Svelte utilisent un vrai fichier à
  template (`.vue`, `.svelte`) avec une syntaxe HTML étendue de directives
  ou de blocs de contrôle.
- React et Vue gardent leur code applicatif tel quel au runtime : un
  Virtual DOM calcule un diff à chaque changement d'état. Svelte compile le
  composant en JS impératif dès la build : il n'y a pas de Virtual DOM, le
  code généré sait déjà quelle ligne du DOM mettre à jour.
- La déclaration de l'état diffère nettement : `useState` + setter (React),
  `ref()` + `.value` (Vue), `$state()` + réassignation directe (Svelte).
- La gestion de formulaire diffère : `value`/`onChange` manuels (React) vs
  liaison bidirectionnelle native (`v-model` en Vue, `bind:value` en
  Svelte).

**Concepts apparus dans les trois frameworks.**
Composants, props, état local réactif, rendu conditionnel, rendu de liste,
fonction/hook de montage, gestion d'événements, liaison de formulaire,
notion de clé (`key`) pour les listes.

## 2. Svelte components

**Comment un composant Svelte est créé.**
Un composant est un fichier `.svelte` unique avec jusqu'à trois blocs
optionnels : `<script>` (logique JS et état), le markup HTML au niveau
racine du fichier (pas de balise englobante obligatoire), et `<style>`
(scopé automatiquement au composant — absent dans ce projet car Tailwind
gère tout le style).

**Comment les fichiers `.svelte` sont organisés.**
Même arborescence que React et Vue : `components/{cards,layout,sections,ui}`,
`data/`, `services/`. Chaque composant React/Vue avait un équivalent direct
au même chemin, seule l'extension change.

**Comparaison avec les composants React et les Single File Components Vue.**
- Vs React : pas de fonction qui `return` du JSX, le HTML est écrit
  directement au niveau racine, `class` au lieu de `className`, pas de
  fermeture obligatoire de toutes les balises comme en JSX.
- Vs Vue : structure quasiment identique (fichier à plusieurs blocs), mais
  Svelte n'a pas de balise `<template>` explicite — le markup n'est pas
  encapsulé, il est au premier niveau du fichier.

**Ce qui a semblé plus simple, plus clair ou surprenant.**
Plus simple : moins de bruit syntaxique que Vue (pas de `v-bind:`, `v-if=`
ni `{{ }}`) et moins de plomberie que React (pas de `useState`/setters,
pas de `key` séparée à retenir). Surprenant : l'absence de `<template>`
donne l'impression au premier abord d'un fichier "à moitié JS, à moitié
HTML brut", sans frontière visuelle claire entre les deux — il faut s'y
habituer.

## 3. Templates and syntax

**Comment fonctionne un template Svelte.**
C'est du HTML presque pur : les expressions JS s'insèrent avec
`{expression}` (comme en JSX), les attributs dynamiques s'écrivent
`attr={valeur}`, et un raccourci `{href}` existe quand le nom de
l'attribut et de la variable sont identiques.

```svelte
<a {href} class="btn {variants[variant]}">{@render children?.()}</a>
```

**Comparaison avec JSX et les templates Vue.**
- Vs JSX : plus proche du HTML natif (pas de `className`, pas de `return`,
  pas de parenthèses englobantes, pas de règle "un seul élément racine"
  comme en React sans fragment).
- Vs Vue : les directives Vue (`v-if`, `v-for`, posées en attribut sur
  l'élément) deviennent en Svelte des blocs de contrôle (`{#if}`, `{#each}`)
  qui englobent le markup — le contrôle de rendu n'est plus mêlé aux
  attributs de l'élément.

**Avantages et limites observés.**
Avantage : la concaténation de classes dynamiques est plus lisible en
Svelte (`class="... {variants[variant]} {className}"`, du JS inline direct
dans le HTML) qu'en React (template string séparée en JS) ou qu'en Vue
(`:class` séparé, objet `computed`). Limite : les blocs `{#if}`/`{#each}`
cassent le flux HTML avec leurs fermetures `{/if}`/`{/each}`, un style plus
proche de Jinja/Handlebars que du "tout est une expression JS" de JSX.

## 4. Props and data flow

**Comment les props sont gérées en Svelte.**
Elles se déclarent dans le `<script>` avec `$props()` et une
déstructuration, valeurs par défaut incluses :

```js
let { href, variant = 'primary', external = false, children } = $props()
```

**Comparaison avec les props React et Vue.**
En React, les props sont simplement les paramètres de la fonction
composant. En Vue, elles se déclarent avec `defineProps({...})`, type et
défaut explicites. Svelte est le plus concis des trois côté écriture
(déstructuration directe comme React) tout en gardant un point d'entrée
explicite unique (`$props()`) comme Vue.

**Ce qui est resté conceptuellement identique.**
Dans les trois frameworks, les props sont des données en lecture seule qui
descendent du parent vers l'enfant, de façon unidirectionnelle — jamais
modifiées directement par l'enfant.

## 5. State and reactivity

```js
// React
const [insights, setInsights] = useState([])
setInsights(data)

// Vue
const insights = ref([])
insights.value = data

// Svelte
let insights = $state([])
insights = data
```

**Comment l'état réactif est géré en Svelte.**
`$state()` transforme une variable `let` normale en état réactif ; elle se
réassigne ensuite comme n'importe quelle variable JS — pas de setter, pas
de `.value`. C'est le compilateur Svelte qui repère à la build les
réassignations de variables `$state` et génère le code de mise à jour du
DOM correspondant.

**Comparaison avec React et Vue.**
React réexécute toute la fonction composant via le setter (`useState`) et
un Virtual DOM calcule le diff. Vue trace les dépendances au runtime via un
proxy (`ref`/`reactive`) et met à jour finement ce qui a changé. Svelte
déplace ce travail à la compilation : le runtime final est déjà du JS
ciblé, sans Virtual DOM ni proxy à l'exécution.

**Différence de quantité de code.**
Svelte est le plus court des trois : pas de tuple état/setter (vs React) et
pas de `.value` à chaque lecture dans le `<script>` (vs Vue) — juste une
variable qu'on lit et réassigne normalement.

**Ce que ça enseigne sur la réactivité en frontend.**
La réactivité n'est pas qu'une question d'API mais de *quand* le travail
est fait : au runtime à chaque rendu (React), au runtime via un système de
dépendances (Vue), ou à la compilation une fois pour toutes (Svelte). D'où
des bundles et un runtime plus légers côté Svelte, au prix d'un compilateur
plus complexe.

## 6. Rendering logic

```svelte
{#if error}
  <p class="text-sm text-red-400">{error}</p>
{:else}
  <div class="grid ...">
    {#each insights as insight, index (insight.title)}
      <InsightCard {index} title={insight.title} />
    {/each}
  </div>
{/if}
```

**Rendu conditionnel en Svelte.** Bloc `{#if}` / `{:else}` / `{/if}`
autour du markup à afficher ou non.

**Rendu de liste dynamique en Svelte.** Bloc `{#each tableau as item, index
(clé)}` ... `{/each}`, avec une clé optionnelle entre parenthèses pour
identifier chaque élément.

**Comparaison avec React et Vue.**
- `{#if}`/`{:else}` ≈ le ternaire React (`cond ? a : b`) et le `&&` pour un
  affichage optionnel ≈ `v-if`/`v-else` en Vue. Même logique, syntaxe en
  bloc plutôt qu'en expression JS (React) ou en directive d'attribut (Vue).
- `{#each item, index (key)}` ≈ `arr.map()` en React (avec `key` en
  attribut JSX) ≈ `v-for` avec `:key` en Vue. La clé Svelte est un argument
  entre parenthèses du bloc plutôt qu'un attribut séparé, ce qui rend plus
  difficile de l'oublier — contrairement à React où un `key` manquant ne
  casse rien visuellement dans l'immédiat (juste un warning en console).

## 7. Lifecycle and side effects

```js
onMount(async () => {
  try {
    insights = await getInsights()
  } catch {
    error = '...'
  }
})
```

**Comment le cycle de vie est géré en Svelte.** Une seule fonction
`onMount`, importée de `svelte`, exécutée une fois après le premier rendu
du composant dans le DOM.

**Comparaison entre `onMount`, `useEffect` et `onMounted`.** `onMount`
(Svelte) et `onMounted` (Vue) sont quasiment identiques : une fonction
dédiée au montage, sans paramètre supplémentaire à gérer. `useEffect(fn,
[])` en React fait la même chose mais avec un piège classique : le tableau
de dépendances, qu'il faut renseigner correctement (oublié ou mal rempli,
il cause des bugs de re-exécution).

**Ce qui reste identique malgré la syntaxe différente.** Dans les trois,
un seul point d'entrée sert à lancer un appel réseau au montage, et la
gestion de l'état d'erreur (`try/catch` + état dédié) reste entièrement à
la charge du développeur — aucun des trois ne la gère automatiquement.

## 8. Forms and events

```svelte
<input
  bind:value={formData.fullName}
  onfocus={() => (focusedField = 'fullName')}
  onblur={() => (focusedField = null)}
/>
<form onsubmit={handleSubmit}>...</form>
```

**Comment les champs de formulaire sont gérés en Svelte.** Liaison directe
avec `bind:value={variable}` : la variable et le champ restent synchronisés
dans les deux sens, sans code intermédiaire.

**Comment les événements sont gérés en Svelte.** Comme des attributs JS
directs sur l'élément (`onclick`, `onsubmit`, `onfocus`), en minuscules et
sans préfixe.

**Comparaison avec React et Vue.**
- Vs React : Svelte évite le trio `value` + `onChange` + fonction
  `handleChange` à écrire soi-même — un seul `bind:value` suffit, comme
  Vue.
- Vs Vue : les événements Svelte 5 sont des attributs (`onclick`) plutôt
  que des directives préfixées par `@` (`@click`) — plus proche de
  React/HTML natif — tout en gardant un `bind:` façon Vue pour les champs.
- Les trois demandent la même validation manuelle côté frontend
  (longueur, format), ici via un état dérivé : `$derived` (Svelte),
  `computed` (Vue), recalcul simple à chaque rendu (React).

## 9. Project organization

**Comment le projet Svelte est organisé.** Identique aux projets React et
Vue : `src/components/{cards,layout,sections,ui}`, `src/data/`,
`src/services/`, `src/global.css`, un composant racine `App`, un point
d'entrée `main` qui monte l'app dans le DOM, `vite.config.js`.

**Ce qui est resté identique aux projets React et Vue.** Les noms de
dossiers, les noms de fichiers composant par composant, la logique métier
(`services/insightsService.js`, `data/*.js`) copiée sans changement — seul
le composant qui les consomme change de syntaxe.

**Ce qui a changé à cause des conventions Svelte.** L'extension `.svelte`
partout, un `svelte.config.js` dédié au compilateur, et `main.js` qui
utilise `mount()` (API Svelte 5) au lieu de `createRoot()` (React) ou
`createApp()` (Vue).

## 10. AI-assisted migration

**Outils IA utilisés.** Claude Code, en s'appuyant directement sur les
projets React et Vue déjà présents dans le dépôt comme référence de départ.

**Comment les versions React et Vue ont aidé la migration Svelte.** Elles
ont servi de spécification vivante : même structure de dossiers, mêmes
noms de composants, mêmes props, même copy textuelle. La migration a
consisté à relire chaque fichier `.vue`/`.jsx` équivalent et à le traduire
composant par composant plutôt qu'à repartir de zéro.

**Ce qui a bien fonctionné.** La conversion directe des composants simples
(props, markup, classes Tailwind) et la transposition des concepts déjà
connus : `onMounted`/`useEffect` → `onMount`, `ref`/`useState` → `$state`.

**Ce qui a demandé une relecture ou correction manuelle.** Le typage
implicite JS détecté par `svelte-check` (par exemple
`document.getElementById('app')` peut renvoyer `null`, incompatible avec le
`target` attendu par `mount()`) — une dizaine d'erreurs de ce type ont dû
être corrigées après coup, aucune n'étant visible juste en lisant le code
généré. Le fait que Svelte 5 (runes `$props`/`$state`/`$derived`) soit
récent aurait aussi pu faire glisser des habitudes Svelte 4 (`export let`,
`$:`) sans les deux implémentations de référence à côté pour vérifier.

**Comment la structure du projet a influencé la qualité de la migration.**
La structure identique des trois projets (mêmes noms de fichiers, mêmes
dossiers) a été le facteur le plus déterminant : elle a permis de vérifier
composant par composant, sans jamais se demander où se trouvait
l'équivalent d'un fichier donné.

## 11. Professional perspective

**Ce que ce projet a appris sur l'adaptation à un nouveau framework.**
Changer de framework, une fois qu'on en connaît déjà un, est surtout un
travail de traduction de concepts déjà acquis (composant, prop, état,
cycle de vie) vers une nouvelle syntaxe — pas un nouvel apprentissage
complet.

**Pourquoi l'architecture des composants compte plus que la syntaxe.**
C'est ce socle commun (composants, props, état, cycle de vie) qui rend un
fichier `.svelte` immédiatement compréhensible pour qui connaît déjà React
ou Vue, alors que mémoriser une API précise ne se transfère pas d'un
framework à l'autre.

**Comment l'IA peut réduire la barrière entre frameworks frontend.**
En traduisant fichier par fichier tout en gardant la structure du projet
identique, l'IA rend le portage rapide et cohérent — la partie
mécanique du transfert de syntaxe est largement automatisable.

**Pourquoi il faut quand même lire, tester, déboguer et valider le code
généré.** Les erreurs de typage sur `main.js`, ou une subtilité de
réactivité mal transposée, ne se voient qu'en exécutant le linter, le
typecheck et l'application elle-même — jamais juste en lisant le diff
généré par l'IA.
