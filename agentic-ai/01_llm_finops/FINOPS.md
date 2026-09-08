# L'Audit du Gouffre — Simulateur FinOps

## 1. Mesure du system prompt

- Outil : OpenAI Tokenizer (`platform.openai.com/tokenizer`), modèle **GPT-5**
- Résultat : **77 tokens** (336 caractères)

## 2. Coût d'une exécution

- Input = 77 + 15 000 = **15 077 tokens** → 15 077 × 5 $/1M = **0,075385 $**
- Output = 500 tokens → 500 × 15 $/1M = **0,0075 $**
- **Total = 0,082885 $**

## 3. Boucle d'erreur (10 itérations)

Historique conservé, +500 tokens d'input par itération : `input(n) = 15 077 + (n−1)×500`.

| Itér. | Input | Coût itération | Coût cumulé |
|---:|---:|---:|---:|
| 1 | 15 077 | 0,082885 $ | 0,082885 $ |
| 2 | 15 577 | 0,085385 $ | 0,168270 $ |
| 3 | 16 077 | 0,087885 $ | 0,256155 $ |
| 4 | 16 577 | 0,090385 $ | 0,346540 $ |
| 5 | 17 077 | 0,092885 $ | 0,439425 $ |
| 6 | 17 577 | 0,095385 $ | 0,534810 $ |
| 7 | 18 077 | 0,097885 $ | 0,632695 $ |
| 8 | 18 577 | 0,100385 $ | 0,733080 $ |
| 9 | 19 077 | 0,102885 $ | 0,835965 $ |
| 10 | 19 577 | 0,105385 $ | **0,941350 $** |

## 4. Auto-évaluation

- Σ input = 10 × 15 077 + 500 × (0+1+…+9) = 150 770 + 22 500 = **173 270 tokens**
- Coût total = 173 270 × 5 $/1M + 5 000 × 15 $/1M = 0,86635 + 0,075 = **0,941350 $** ✅ (identique au cumul du tableau)
- Sans croissance du contexte : 10 × 0,082885 = 0,82885 $. Le surcoût lié à l'historique = 500 × 5 $/1M × 45 = **+0,1125 $ (+13,6 %)**, avec une croissance quadratique.

## 5. Optimisation

Limiter la croissance du contexte :
- **Troncature / fenêtre glissante** : ne conserver que les k dernières réponses.
- **Compaction** : résumer l'historique en un court texte → supprime le terme quadratique.
- **Prompt caching** : mettre en cache le code de 15 000 tokens (identique à chaque appel) → coût input divisé par ~10 sur ce bloc.
- **Plafond d'itérations** (3–5) puis escalade humaine.
