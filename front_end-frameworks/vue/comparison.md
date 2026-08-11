# React vs Vue.js

J'ai fait ma landing page en React puis je l'ai refaite en Vue 3, même design,
même comportement. Voici les différences que j'ai vues.

## Composants

React : une fonction qui retourne du JSX.

```jsx
function Brand() {
  return <span className="text-sm font-bold">Agentic AI</span>;
}
```

Vue : un fichier `.vue` avec `<script setup>` + `<template>`, logique et HTML
séparés.

```vue
<template>
  <span class="text-sm font-bold">Agentic AI</span>
</template>
```

## Props

React récupère les props en paramètres de la fonction. Vue les déclare avec
`defineProps({...})`, en précisant le type. Plus verbeux mais plus clair.

Petit détail sympa : en Vue, si le parent met une classe sur un composant
(`<Button class="text-xs">`), elle est ajoutée automatiquement. En React il
fallait que je gère ça moi-même avec une prop `className`.

## État

```jsx
// React
const [insights, setInsights] = useState([]);
setInsights(data);
```

```js
// Vue
const insights = ref([])
insights.value = data
```

React réexécute le composant via le setter. Vue met juste à jour ce qui a
changé, avec `.value` (obligatoire dans le script, pas dans le template).

## Chargement au montage

`useEffect(fn, [])` en React devient `onMounted(fn)` en Vue. Vue a un hook par
étape du cycle de vie, c'est plus lisible que le tableau de dépendances de
`useEffect`.

## Conditions et boucles

- `cond ? a : b` → `v-if` / `v-else`
- `cond && <p/>` → `v-if`
- `arr.map()` → `v-for`

Même logique, juste écrite différemment : en JS dans le JSX côté React, en
directive sur l'élément côté Vue.

## Formulaires

Le vrai gain de Vue : `v-model`.

```vue
<input v-model="formData.fullName" />
```

Ça remplace `value` + `onChange` + une fonction `handleChange` à la main en
React. Plus court, moins de code.

## Événements

`onClick` → `@click`, `onSubmit` → `@submit`. Vue a des modificateurs comme
`.prevent` qui évitent le `event.preventDefault()` manuel.

## Structure du projet

Identique des deux côtés, juste les extensions changent (`.jsx` → `.vue`,
`main.jsx` → `main.js`). Chaque composant React avait son équivalent direct au
même endroit, ça a rendu la migration simple.

## Bilan

Même concepts (composants, props, état, cycle de vie), syntaxe différente.
Vue m'a fait gagner du code surtout sur les formulaires et les classes CSS.
