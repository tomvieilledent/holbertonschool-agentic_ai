# React / Vue vs Svelte

Même landing page, troisième version. Après React (composants + JSX) et Vue
(SFC + Composition API), voici ce que Svelte change.

## Composants

React : une fonction qui retourne du JSX. Vue : un `.vue` avec
`<script setup>` + `<template>`. Svelte : un `.svelte` avec `<script>` +
markup, mais le HTML n'est pas dans une balise `<template>`, il est au niveau
racine du fichier.

```svelte
<script>
  import { BrainCircuit } from '@lucide/svelte'
</script>

<span class="text-sm font-bold">Agentic AI</span>
```

Pas de fonction de rendu, pas de VDOM : Svelte compile chaque composant en
JS qui manipule le DOM directement.

## Props

React : paramètres de fonction. Vue : `defineProps({...})`. Svelte 5 (runes) :
`let { href, variant = 'primary', children } = $props()`. Plus proche de la
déstructuration JS classique que du `defineProps` de Vue.

Comme en Vue, la classe passée par le parent (`<Button class="text-xs">`)
n'arrive pas automatiquement dans le composant : il faut la récupérer via
`class: className` dans `$props()` et l'ajouter soi-même au template, comme
en React avec `className`.

## État

```jsx
// React
const [insights, setInsights] = useState([]);
setInsights(data);
```

```js
// Svelte 5
let insights = $state([])
insights = data
```

Pas de `.value` comme avec `ref` en Vue : `$state` rend la variable
directement réactive, en assignation directe. Pour un état dérivé, `$derived`
remplace `computed()`.

## Chargement au montage

`useEffect(fn, [])` en React, `onMounted(fn)` en Vue, `onMount(fn)` en
Svelte : quasi identique à Vue, juste sans le `on` préfixé différemment.

## Conditions et boucles

- `cond ? a : b` → `{#if}...{:else}...{/if}`
- `arr.map()` → `{#each arr as item (item.id)}...{/each}`

Comme Vue avec `v-if`/`v-for`, mais en blocs de template (`{#if}`, `{#each}`)
plutôt qu'en directives sur l'élément.

## Formulaires

`bind:value` en Svelte fait la même chose que `v-model` en Vue : un seul
attribut remplace `value` + `onChange` + un handler manuel comme en React.

```svelte
<input bind:value={formData.fullName} />
```

## Événements

`onClick` (React) / `@click` (Vue) → `onclick` en Svelte 5 (attribut DOM
natif, sans préfixe `@` ni `on` en camelCase). `handleSubmit(event)` reste une
fonction classique appelant `event.preventDefault()`, comme en React ; Vue
avait l'avantage du modificateur `.prevent`.

## Rendu dynamique (tag / icône dynamique)

`as="h1"` en React se gérait avec une variable de composant `Tag`. Vue
utilise `<component :is="as">`. Svelte a son propre élément :
`<svelte:element this={Tag}>`. Pour une icône passée en prop
(`icon: Icon = $props()`), on l'utilise directement comme un composant :
`<Icon size={16} />`, exactement comme en React et en Vue.

## Structure du projet

Identique aux deux précédentes versions : mêmes dossiers
(`components/ui`, `components/layout`, `components/sections`,
`components/cards`, `data/`, `services/`), seules les extensions changent
(`.jsx`/`.vue` → `.svelte`, `main.jsx` → `main.js`).

## Bilan

Svelte pousse plus loin l'idée de Vue : moins de code que React sur les
formulaires et les classes conditionnelles, et en plus pas de VDOM ni de
`.value` à gérer grâce aux runes (`$state`, `$derived`, `$props`). Le bundle
de production est aussi sensiblement plus léger, le compilateur retirant tout
le runtime superflu.
