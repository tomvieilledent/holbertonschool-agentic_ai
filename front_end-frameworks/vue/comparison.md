# Comparaison React et Vue.js

Ce document compare React et Vue.js à partir de mon propre travail. J'ai d'abord
construit une landing page **Agentic AI** en React, puis je l'ai migrée vers
Vue 3 en conservant le même contenu, le même design (Tailwind CSS) et le même
comportement. Tous les exemples de code proviennent directement de ces deux
implémentations. Les explications sont en français, le code reste en anglais.

## Le modèle mental à avoir

Avant d'entrer dans le détail, voici la base à retenir.

Un composant **React** est essentiellement une fonction JavaScript qui retourne
du JSX. La logique et l'interface vivent dans la même fonction, et l'interface
est décrite par ce que la fonction retourne.

```jsx
function Brand() {
  return (
    <a href="#hero-section" className="flex items-center gap-2">
      <span className="text-sm font-bold text-slate-50">Agentic AI</span>
    </a>
  );
}
```

Un composant **Vue** est un fichier `.vue` découpé en blocs séparés. La logique
est placée dans `<script setup>` et l'interface dans `<template>`.

```vue
<script setup>
import { BrainCircuit } from 'lucide-vue-next'
</script>

<template>
  <a href="#hero-section" class="flex items-center gap-2">
    <span class="text-sm font-bold text-slate-50">Agentic AI</span>
  </a>
</template>
```

La première grande différence est donc structurelle. React réunit logique et
rendu dans un `return`, alors que Vue impose une séparation nette entre la
logique et le template, qui est écrit en HTML plutôt qu'en JSX.

## 1. Composants

### Création d'un composant React

Dans mon projet React, chaque composant est une fonction qui retourne du JSX,
suivie d'un `export default`. Le fichier `StatCard.jsx` en est un exemple
minimal.

```jsx
function StatCard({ value, label }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center">
      <p className="text-3xl font-black text-violet-300 md:text-4xl">{value}</p>
      <p className="mt-2 text-sm text-slate-300 md:text-base">{label}</p>
    </div>
  );
}

export default StatCard;
```

### Création d'un composant Vue

Le même composant en Vue devient un fichier `StatCard.vue`. Le composant n'a pas
besoin d'un `export default` explicite, car le fichier `.vue` est lui-même le
composant exporté.

```vue
<script setup>
defineProps({
  value: { type: String, required: true },
  label: { type: String, required: true },
})
</script>

<template>
  <div class="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center">
    <p class="text-3xl font-black text-violet-300 md:text-4xl">{{ value }}</p>
    <p class="mt-2 text-sm text-slate-300 md:text-base">{{ label }}</p>
  </div>
</template>
```

### Similitudes

Dans les deux frameworks, un composant est une unité réutilisable qui reçoit des
données par des props et produit une interface. La composition fonctionne de la
même manière : mon `App` importe et assemble `Header`, `Hero`, `About`,
`Features`, `Insights`, `Contact` et `Footer` dans les deux versions, et la façon
d'utiliser un composant enfant dans le parent est identique, par exemple
`<StatCard />`.

### Différences

React mélange logique et rendu dans une fonction, tandis que Vue les sépare en
deux blocs. En React, un composant importé doit simplement être appelé dans le
JSX. En Vue avec `<script setup>`, tout composant importé dans le script devient
automatiquement disponible dans le template, sans étape d'enregistrement
supplémentaire. Enfin, l'export est implicite en Vue alors qu'il est explicite en
React.

## 2. Templates

### JSX

En React, l'interface est écrite en JSX, une extension de JavaScript. On y insère
des expressions JavaScript avec des accolades. Ma section `Hero` affiche par
exemple une liste de statistiques directement avec `.map()` dans le JSX.

```jsx
<div className="mt-12 grid w-full grid-cols-2 gap-8 md:grid-cols-4">
  {stats.map((stat) => (
    <StatCard key={stat.label} value={stat.value} label={stat.label} />
  ))}
</div>
```

### Templates Vue

En Vue, l'interface est écrite dans un template proche du HTML, avec des
directives spéciales. La même boucle utilise la directive `v-for`.

```vue
<div class="mt-12 grid w-full grid-cols-2 gap-8 md:grid-cols-4">
  <StatCard
    v-for="stat in stats"
    :key="stat.label"
    :value="stat.value"
    :label="stat.label"
  />
</div>
```

### Avantages et inconvénients

Le JSX offre toute la puissance de JavaScript directement dans le rendu, ce qui
est très souple : conditions, boucles et calculs s'écrivent avec la syntaxe du
langage. L'inconvénient est qu'il faut connaître les particularités du JSX comme
`className` au lieu de `class`, `htmlFor` au lieu de `for`, et que la logique de
rendu peut vite se mélanger à l'affichage.

Le template Vue reste très proche du HTML standard, ce qui le rend lisible et
accessible, et les directives comme `v-if` ou `v-for` expriment clairement
l'intention. L'inconvénient est qu'il faut apprendre une syntaxe de directives
propre à Vue, et que le template est moins libre que du JavaScript pur pour les
cas très dynamiques.

## 3. Props

### Props en React

En React, les props sont reçues comme paramètres de la fonction, souvent
déstructurées, avec des valeurs par défaut définies dans la signature. Mon
composant `Button` illustre bien ce point.

```jsx
function Button({ href, children, variant = 'primary', external = false }) {
  return <a href={href} className={`... ${variants[variant]}`}>{children}</a>;
}
```

### Props en Vue

En Vue, les props sont déclarées explicitement avec `defineProps`, en précisant
le type et la valeur par défaut. Le même `Button` devient plus explicite sur le
contrat de chaque prop.

```vue
<script setup>
const props = defineProps({
  href: { type: String, required: true },
  variant: { type: String, default: 'primary' },
  external: { type: Boolean, default: false },
})
</script>
```

### Similitudes et différences

Dans les deux cas, les props sont en lecture seule et servent à passer des
données du parent vers l'enfant. La manière de fournir une prop depuis le parent
est identique, par exemple `variant="secondary"`.

La différence principale est le niveau de formalisme. React se contente d'une
déstructuration JavaScript, alors que Vue demande une déclaration typée avec
`defineProps`, ce qui documente mieux les entrées du composant. Un autre point
important concerne le contenu enfant. En React, le contenu passé entre les
balises est reçu par `props.children`. En Vue, il est projeté avec `<slot />`.
Mon `Button` utilise `{children}` en React et `<slot />` en Vue pour afficher le
libellé du bouton.

Enfin, la propagation des classes CSS diffère nettement. En React, j'avais besoin
d'une prop `className` que je concaténais manuellement pour que le parent puisse
ajouter des classes. En Vue, l'héritage d'attributs est automatique : lorsque le
parent écrit `<Button class="text-xs">`, Vue fusionne seul cette classe avec
celle de l'élément racine du composant. J'ai donc pu supprimer complètement la
prop `className` lors de la migration.

## 4. Gestion de l'état

### État en React

En React, l'état local est créé avec `useState`, qui renvoie une valeur et une
fonction pour la modifier. Ma section `Insights` déclarait deux états.

```jsx
const [insights, setInsights] = useState([]);
const [error, setError] = useState(null);

setInsights(data);
```

### État réactif en Vue

En Vue, j'utilise `ref` pour une valeur simple et `reactive` pour un objet. La
lecture et l'écriture se font par la propriété `.value` dans le script.

```js
const insights = ref([])
const error = ref(null)

insights.value = data
```

Pour le formulaire de `Contact`, l'objet de données utilise `reactive`, ce qui
permet de muter directement chaque champ.

```js
const formData = reactive({ fullName: '', email: '', message: '' })
formData.fullName = ''
```

### Similitudes et différences

Dans les deux frameworks, modifier l'état met à jour l'interface qui en dépend.
La logique métier reste la même : dans `Insights`, je remplis une liste ou je
définis un message d'erreur de façon identique sur le plan fonctionnel.

La différence tient au mécanisme. En React, je passe par un setter
(`setInsights(data)`) et le changement provoque une réexécution de la fonction du
composant. En Vue, j'assigne directement `insights.value = data` et Vue met à
jour de manière ciblée uniquement les parties du template qui utilisent cette
donnée. Un détail pratique important est le `.value` : il est obligatoire dans le
script Vue, mais inutile dans le template, où Vue le résout automatiquement. Pour
les objets, `reactive` évite de recréer un nouvel objet à chaque modification,
alors qu'en React je devais renvoyer une nouvelle référence, par exemple avec
`setFormData((previous) => ({ ...previous, [name]: value }))`.

## 5. Cycle de vie

### Logique de cycle de vie en React

En React, j'utilisais `useEffect` avec un tableau de dépendances vide pour
exécuter du code une seule fois au montage. Ma section `Insights` chargeait les
données de cette façon.

```jsx
useEffect(() => {
  async function loadInsights() {
    try {
      const data = await getInsights();
      setInsights(data);
    } catch {
      setError('Unable to load insights. Please try again later.');
    }
  }
  loadInsights();
}, []);
```

### Logique de cycle de vie en Vue

En Vue, ce besoin correspond au hook dédié `onMounted`, qui est plus explicite
sur l'intention.

```js
onMounted(async () => {
  try {
    insights.value = await getInsights()
  } catch {
    error.value = 'Unable to load insights. Please try again later.'
  }
})
```

### Similitudes et différences

Le résultat est le même : les données sont chargées au premier affichage du
composant. Les deux approches gèrent aussi le nettoyage, avec la fonction
retournée par `useEffect` en React et `onUnmounted` en Vue.

La différence est conceptuelle. En React, `useEffect` est un outil unique dont le
comportement dépend du tableau de dépendances, ce qui peut prêter à confusion. En
Vue, il existe des hooks distincts et nommés selon le moment concerné, comme
`onMounted` et `onUnmounted`. J'ai retenu qu'il ne faut pas convertir
systématiquement un `useEffect` en `watch`. Le `useEffect` de montage correspond
à `onMounted`, alors qu'un `useEffect` qui réagit à un changement de valeur
correspondrait plutôt à `watch` ou `watchEffect`.

## 6. Rendu conditionnel

### Rendu conditionnel en React

En React, le rendu conditionnel s'écrit avec l'opérateur ternaire ou avec
l'opérateur logique. Ma section `Insights` choisit entre un message d'erreur et
la grille de résultats.

```jsx
{error ? (
  <p className="text-sm text-red-400">{error}</p>
) : (
  <div className="mt-12 grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {/* grille */}
  </div>
)}
```

Dans `About`, je masque la barre verticale sous la dernière étape avec un
opérateur logique.

```jsx
{step.id !== steps.length && (
  <div className="w-px flex-1 bg-violet-500"></div>
)}
```

### Rendu conditionnel en Vue

En Vue, ces conditions utilisent les directives `v-if` et `v-else`.

```vue
<p v-if="error" class="text-sm text-red-400">{{ error }}</p>

<div v-else class="mt-12 grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
  <!-- grille -->
</div>
```

```vue
<div v-if="step.id !== steps.length" class="w-px flex-1 bg-violet-500"></div>
```

### Similitudes et différences

La logique de décision est identique, seule l'écriture change. React exprime la
condition avec du JavaScript inséré dans le JSX, ce qui impose parfois des
parenthèses et des blocs imbriqués. Vue attache une directive directement sur
l'élément concerné, ce qui reste lisible car chaque branche est un élément
distinct du template. Le motif React `condition && element` se traduit simplement
par un `v-if` sur l'élément.

## 7. Rendu dynamique

### Rendu dynamique en React

Le rendu dynamique inclut les listes générées à partir de données et les balises
ou composants choisis à l'exécution. En React, je génère mes cartes avec `.map()`
et je choisis parfois la balise avec une variable. Ma section `Features`
parcourt les données de fonctionnalités.

```jsx
{features.map((feature) => (
  <FeatureCard
    key={feature.title}
    icon={feature.icon}
    title={feature.title}
    description={feature.description}
  />
))}
```

Mon composant `SectionTitle` rend une balise dynamique grâce à la prop `as`.

```jsx
function SectionTitle({ top, bottom, as: Tag = 'h2' }) {
  return (
    <Tag className="leading-none font-black tracking-tight">
      <span className="block text-slate-50">{top}</span>
      <span className="block text-violet-300">{bottom}</span>
    </Tag>
  );
}
```

Les icônes sont aussi rendues dynamiquement, puisque `FeatureCard` reçoit un
composant d'icône en prop et l'affiche avec `<Icon size={24} />`.

### Rendu dynamique en Vue

En Vue, les listes utilisent `v-for` et les balises ou composants dynamiques
utilisent l'élément spécial `<component :is>`.

```vue
<FeatureCard
  v-for="feature in features"
  :key="feature.title"
  :icon="feature.icon"
  :title="feature.title"
  :description="feature.description"
/>
```

```vue
<component :is="as" class="leading-none font-black tracking-tight">
  <span class="block text-slate-50">{{ top }}</span>
  <span class="block text-violet-300">{{ bottom }}</span>
</component>
```

Dans `FeatureCard`, l'icône passée en prop est rendue avec
`<component :is="icon" :size="24" />`.

### Similitudes et différences

Les deux frameworks demandent une clé unique par élément de liste, `key` en React
et `:key` en Vue, pour optimiser les mises à jour. Le concept de composant
polymorphe existe des deux côtés.

La différence est syntaxique. React exécute directement `array.map()` dans le
rendu, alors que Vue pose la directive `v-for` sur l'élément à répéter, sans
`return` ni parenthèses. Pour une balise dynamique, React utilise une variable en
JSX comme `<Tag>`, tandis que Vue utilise `<component :is="...">`, ce qui sert
aussi à rendre un composant d'icône reçu en prop.

## 8. Formulaires

### Gestion des formulaires en React

En React, chaque champ est contrôlé manuellement avec `value` et `onChange`, et
un gestionnaire met à jour l'état. Mon formulaire de `Contact` fonctionnait ainsi.

```jsx
function handleChange(event) {
  const { name, value } = event.target;
  setFormData((previous) => ({ ...previous, [name]: value }));
}

<input
  id="fullName"
  name="fullName"
  value={formData.fullName}
  onChange={handleChange}
  onFocus={() => setFocusedField('fullName')}
/>
```

La validation était recalculée à chaque rendu, et la soumission empêchait le
rechargement de la page.

```jsx
const isNameValid = formData.fullName.trim().length >= 2;

async function handleSubmit(event) {
  event.preventDefault();
  setIsSending(true);
}
```

### Gestion des formulaires en Vue

En Vue, la liaison bidirectionnelle `v-model` remplace le couple
`value` plus `onChange`, ce qui supprime le gestionnaire générique. La validation
devient un ensemble de `computed`, et la soumission utilise le modificateur
`.prevent`.

```vue
<input
  id="fullName"
  v-model="formData.fullName"
  name="fullName"
  :class="fieldBorderClass('fullName', isNameValid)"
  @focus="focusedField = 'fullName'"
  @blur="focusedField = null"
/>
```

```js
const isNameValid = computed(() => formData.fullName.trim().length >= 2)

async function handleSubmit() {
  isSending.value = true
}
```

```vue
<form autocomplete="off" @submit.prevent="handleSubmit">
```

### Similitudes et différences

Le comportement final est identique : le bouton reste désactivé tant que le
formulaire est invalide, grâce à `:disabled="!isFormValid || isSending"` en Vue et
`disabled={!isFormValid || isSending}` en React, et un message de retour informe
l'utilisateur.

La différence majeure est la quantité de code. En React, il faut lier la valeur
et écouter le changement pour chaque champ, souvent via un `handleChange`
partagé. En Vue, `v-model` synchronise automatiquement le champ et la donnée dans
les deux sens, ce qui m'a permis de supprimer la fonction `handleChange`. La
validation change aussi de nature : en React elle est recalculée à chaque rendu
comme simple variable, alors qu'en Vue elle est exprimée par des `computed` qui ne
se recalculent que lorsque leurs dépendances changent. Enfin, l'attribut
`htmlFor` du label en JSX redevient `for` dans le template Vue.

## 9. Événements

### Gestion des événements en React

En React, les événements utilisent la convention `onXxx` à laquelle on passe une
fonction. Dans `Contact`, je gérais le focus et la soumission.

```jsx
<input onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} />
<form onSubmit={handleSubmit}>
```

### Gestion des événements en Vue

En Vue, les événements utilisent la directive `@`, raccourci de `v-on`. On peut y
écrire une expression directe ou appeler une fonction.

```vue
<input @focus="focusedField = 'email'" @blur="focusedField = null" />
<form @submit.prevent="handleSubmit">
```

### Similitudes et différences

Le principe est le même : on associe un comportement à une interaction
utilisateur. La différence est syntaxique, avec `onClick` qui devient `@click` et
`onSubmit` qui devient `@submit`. Vue ajoute la notion de modificateurs, comme
`.prevent`, qui appelle `preventDefault` à ma place. J'ai ainsi pu retirer l'appel
manuel `event.preventDefault()` et le paramètre `event` de `handleSubmit`. Vue
autorise aussi l'écriture d'une expression directement dans l'attribut, ce qui
raccourcit le code pour des cas simples comme la mise à jour du champ focalisé.

## 10. Organisation du projet

### Structure du projet React

Mon projet React suit une organisation par responsabilités, avec un dossier de
composants découpé en sous-dossiers, ainsi que des dossiers pour les données et
les services.

```text
src/
  App.jsx
  main.jsx
  global.css
  components/
    ui/        Brand, Button, SectionBadge, SectionTitle, SocialLink
    cards/     FeatureCard, InsightCard, StatCard
    layout/    Header, Footer
    sections/  Hero, About, Features, Insights, Contact
  data/        features.js, insights.js, steps.js
  services/    insightsService.js
```

### Structure du projet Vue

J'ai conservé exactement la même arborescence en Vue, en remplaçant les fichiers
`.jsx` par des fichiers `.vue` et le point d'entrée `main.jsx` par `main.js`.

```text
src/
  App.vue
  main.js
  global.css
  components/
    ui/        Brand, Button, SectionBadge, SectionTitle, SocialLink
    cards/     FeatureCard, InsightCard, StatCard
    layout/    Header, Footer
    sections/  Hero, About, Features, Insights, Contact
  data/        features.js, insights.js, steps.js
  services/    insightsService.js
```

### Similitudes et différences

L'organisation logique est identique, ce qui a rendu la migration prévisible :
chaque composant React avait un équivalent direct au même emplacement. Les
fichiers de données et de services sont même restés inchangés, car ils ne
contiennent que du JavaScript pur, à l'exception de `features.js` où j'ai
seulement remplacé l'import `lucide-react` par `lucide-vue-next`.

Les différences se situent au niveau des extensions et de la configuration. Le
point d'entrée passe de `main.jsx` avec `ReactDOM.createRoot(...).render(<App/>)`
à `main.js` avec `createApp(App).mount('#app')`. L'élément cible dans
`index.html` passe de `#root` à `#app`. La configuration change aussi : le plugin
Vite passe de `@vitejs/plugin-react` à `@vitejs/plugin-vue`, et la configuration
ESLint passe des plugins React à `eslint-plugin-vue`. Tailwind CSS est intégré de
la même manière dans les deux projets, via le plugin `@tailwindcss/vite` et un
import `@import 'tailwindcss'` dans `global.css`.

## 11. Migration assistée par IA

### Outils utilisés

Pour cette migration, j'ai utilisé un assistant IA, Claude, comme outil
d'apprentissage et de productivité. Je m'en suis servi pour comprendre les
équivalences entre React et Vue, pour convertir des composants et pour vérifier la
configuration du projet. J'ai gardé la responsabilité de relire, de corriger et
de valider chaque fichier produit.

### Ce qui a bien fonctionné

Les transformations mécaniques et répétitives ont été très fiables. Le
remplacement de `className` par `class`, la conversion de `.map()` en `v-for`, le
passage de `useState` à `ref` ou `reactive`, la transformation de `useEffect` de
montage en `onMounted`, et la réécriture des champs contrôlés en `v-model` ont
été rapides et corrects. La structure de dossiers étant conservée, la
correspondance entre composants React et Vue a été directe.

### Ce qui a nécessité des corrections manuelles

Plusieurs points ont demandé une intervention réfléchie. Dans `InsightCard`, la
version React utilisait un style en ligne pour l'image de fond, ce que la consigne
Vue interdit. J'ai remplacé ce style par une balise `<img>` en `object-cover`
pour obtenir un rendu identique sans style en ligne. La configuration ESLint a
aussi demandé des ajustements : j'ai désactivé la règle
`vue/multi-word-component-names` afin de conserver les noms de composants du
projet React comme `Button` ou `Hero`, ainsi que `vue/require-default-prop`, puis
j'ai délégué la mise en forme à Prettier en désactivant les règles de formatage
en conflit. J'ai également corrigé un import cassé hérité du gabarit initial,
`style.css` devenant `global.css`, sans lequel le build échouait. Enfin, il a
fallu vérifier que le mappage du cycle de vie était correct et ne pas convertir
mécaniquement chaque `useEffect` en `watch`.

### Enseignements tirés

Cette migration m'a permis de bien distinguer les deux modèles de réactivité.
React réexécute la fonction du composant après un appel de setter, alors que Vue
suit les dépendances et met à jour l'interface de façon ciblée quand une donnée
réactive change. J'ai aussi mesuré l'intérêt de `v-model`, qui réduit
sensiblement le code des formulaires, et celui de l'héritage d'attributs de Vue,
qui a rendu inutile la prop `className`. J'ai retenu que le `.value` est requis
dans le script mais pas dans le template, et qu'il faut choisir le bon outil de
réactivité selon le besoin plutôt que de plaquer les habitudes React. Le point le
plus important est qu'un outil IA accélère la conversion, mais que la
compréhension et la validation restent de ma responsabilité, en particulier sur
les cas qui ne se traduisent pas de façon mécanique.

## Tableau de correspondance

| React | Vue 3 |
| --- | --- |
| `function Component()` retourne du JSX | fichier `.vue` avec `<script setup>` et `<template>` |
| `props` en paramètres | `defineProps()` |
| `props.children` | `<slot />` |
| `useState()` | `ref()` ou `reactive()` |
| `setState(v)` | `ref.value = v` ou mutation de l'objet `reactive` |
| valeur calculée dans le rendu | `computed()` |
| `useEffect(fn, [])` | `onMounted(fn)` |
| `array.map()` | `v-for` |
| `condition && element` | `v-if` |
| `condition ? a : b` | `v-if` et `v-else` |
| `onClick` | `@click` |
| `value` plus `onChange` | `v-model` |
| `className` | `class` |
| `htmlFor` | `for` |
| `prop={value}` | `:prop="value"` |
| `{variable}` | `{{ variable }}` |
| `{...props}` | `v-bind="props"` |
| `<Tag />` dynamique | `<component :is="tag" />` |

## Conclusion

La migration a montré que React et Vue partagent les mêmes concepts fondamentaux,
à savoir des composants, des props, un état réactif, un cycle de vie, du rendu
conditionnel et dynamique, et une gestion des événements et des formulaires. La
différence se situe surtout dans la philosophie et la syntaxe. React s'appuie sur
du JavaScript qui décrit le rendu, alors que Vue sépare la logique et un template
enrichi de directives, avec un système de réactivité qui met à jour l'interface
de manière ciblée. La version Vue de mon projet est restée visuellement et
fonctionnellement équivalente à la version React, tout en étant plus concise sur
les formulaires et sur la gestion des classes.
