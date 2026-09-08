## Prompt à donner aux 2 IA ##
Écris un script pour scraper une page web et sauvegarder les données, en gérant les erreurs.

## Résultat chatGPT GPT-5.6 Luna ##

Voici un exemple en Python avec requests et BeautifulSoup. Il récupère les données d’une page, gère les erreurs réseau/HTTP et sauvegarde le résultat en JSON.

```python
import json
import logging
from pathlib import Path

import requests
from bs4 import BeautifulSoup


URL = "https://example.com"
OUTPUT_FILE = Path("data.json")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)


def scrape_page(url: str) -> list[dict]:
    try:
        response = requests.get(
            url,
            timeout=15,
            headers={"User-Agent": "Mozilla/5.0"}
        )
        response.raise_for_status()

    except requests.exceptions.Timeout:
        logging.error("La requête a expiré.")
        return []

    except requests.exceptions.HTTPError as exc:
        logging.error("Erreur HTTP : %s", exc)
        return []

    except requests.exceptions.RequestException as exc:
        logging.error("Erreur réseau : %s", exc)
        return []

    try:
        soup = BeautifulSoup(response.text, "html.parser")

        results = []
        for item in soup.select(".item"):
            title = item.select_one(".title")
            description = item.select_one(".description")

            results.append({
                "title": title.get_text(strip=True) if title else None,
                "description": (
                    description.get_text(" ", strip=True)
                    if description else None
                ),
            })

        return results

    except Exception as exc:
        logging.exception("Erreur lors de l'analyse HTML : %s", exc)
        return []


def save_data(data: list[dict], filename: Path) -> None:
    try:
        filename.parent.mkdir(parents=True, exist_ok=True)

        with filename.open("w", encoding="utf-8") as file:
            json.dump(data, file, ensure_ascii=False, indent=2)

        logging.info("%d éléments sauvegardés dans %s", len(data), filename)

    except (OSError, TypeError) as exc:
        logging.error("Impossible de sauvegarder les données : %s", exc)


if __name__ == "__main__":
    data = scrape_page(URL)

    if data:
        save_data(data, OUTPUT_FILE)
    else:
        logging.warning("Aucune donnée récupérée.")
```

## Résultat Claude Sonnet 5 ##

```python
#!/usr/bin/env python3
"""
Script de scraping web avec gestion des erreurs.

Fonctionnalités :
- Requêtes HTTP avec retries automatiques et timeout
- Gestion des erreurs réseau, HTTP et de parsing
- Extraction de données (titres, liens, paragraphes — à adapter)
- Sauvegarde des résultats en CSV et JSON
- Journalisation (logging) des succès/échecs

Dépendances :
    pip install requests beautifulsoup4 --break-system-packages
"""

import csv
import json
import logging
import sys
import time
from dataclasses import dataclass, asdict
from pathlib import Path
from urllib.parse import urljoin

import requests
from requests.adapters import HTTPAdapter, Retry
from bs4 import BeautifulSoup

# ----------------------------------------------------------------------
# Configuration
# ----------------------------------------------------------------------

TIMEOUT = 10          # secondes
MAX_RETRIES = 3
BACKOFF_FACTOR = 1.5
USER_AGENT = (
    "Mozilla/5.0 (compatible; MonScraper/1.0; +https://example.com/bot)"
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger(__name__)


@dataclass
class Item:
    """Représente un élément extrait de la page."""
    titre: str
    lien: str


def creer_session() -> requests.Session:
    """Crée une session requests avec stratégie de retry intégrée."""
    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT})

    retries = Retry(
        total=MAX_RETRIES,
        backoff_factor=BACKOFF_FACTOR,
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["GET"],
    )
    adapter = HTTPAdapter(max_retries=retries)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    return session


def recuperer_page(session: requests.Session, url: str) -> str | None:
    """
    Récupère le HTML d'une page. Retourne None en cas d'échec définitif.
    """
    try:
        reponse = session.get(url, timeout=TIMEOUT)
        reponse.raise_for_status()
        reponse.encoding = reponse.apparent_encoding
        return reponse.text

    except requests.exceptions.Timeout:
        logger.error("Timeout lors de la requête vers %s", url)
    except requests.exceptions.ConnectionError:
        logger.error("Erreur de connexion vers %s", url)
    except requests.exceptions.HTTPError as e:
        logger.error("Erreur HTTP (%s) pour %s", e.response.status_code, url)
    except requests.exceptions.RequestException as e:
        logger.error("Erreur inattendue lors de la requête : %s", e)

    return None


def parser_page(html: str, base_url: str) -> list[Item]:
    """
    Parse le HTML et extrait les éléments souhaités.
    À adapter selon la structure réelle de la page cible.
    """
    items: list[Item] = []
    try:
        soup = BeautifulSoup(html, "html.parser")

        # Exemple : extraction de tous les liens <a> avec du texte
        for balise in soup.find_all("a", href=True):
            titre = balise.get_text(strip=True)
            if not titre:
                continue
            lien = urljoin(base_url, balise["href"])
            items.append(Item(titre=titre, lien=lien))

    except Exception as e:
        logger.error("Erreur lors du parsing HTML : %s", e)

    return items


def sauvegarder_csv(items: list[Item], chemin: Path) -> None:
    """Sauvegarde les données extraites au format CSV."""
    try:
        with chemin.open("w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=["titre", "lien"])
            writer.writeheader()
            for item in items:
                writer.writerow(asdict(item))
        logger.info("Données sauvegardées dans %s (%d lignes)", chemin, len(items))
    except OSError as e:
        logger.error("Impossible d'écrire le fichier CSV %s : %s", chemin, e)


def sauvegarder_json(items: list[Item], chemin: Path) -> None:
    """Sauvegarde les données extraites au format JSON."""
    try:
        with chemin.open("w", encoding="utf-8") as f:
            json.dump([asdict(item) for item in items], f, ensure_ascii=False, indent=2)
        logger.info("Données sauvegardées dans %s", chemin)
    except OSError as e:
        logger.error("Impossible d'écrire le fichier JSON %s : %s", chemin, e)


def scraper(url: str, dossier_sortie: str = ".") -> list[Item]:
    """
    Fonction principale : orchestre récupération, parsing et sauvegarde.
    """
    logger.info("Démarrage du scraping de %s", url)
    session = creer_session()

    debut = time.monotonic()
    html = recuperer_page(session, url)
    if html is None:
        logger.error("Échec de la récupération de la page. Arrêt.")
        return []

    items = parser_page(html, url)
    duree = time.monotonic() - debut
    logger.info("%d éléments extraits en %.2fs", len(items), duree)

    if not items:
        logger.warning("Aucune donnée extraite — vérifiez les sélecteurs de parsing.")
        return items

    dossier = Path(dossier_sortie)
    dossier.mkdir(parents=True, exist_ok=True)
    sauvegarder_csv(items, dossier / "resultats.csv")
    sauvegarder_json(items, dossier / "resultats.json")

    return items


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage : python scraper.py <URL> [dossier_de_sortie]")
        sys.exit(1)

    url_cible = sys.argv[1]
    dossier = sys.argv[2] if len(sys.argv) > 2 else "."

    resultats = scraper(url_cible, dossier)
    if not resultats:
        sys.exit(1)
```

## Analyse comparative ##

**Attention, comparaison biaisée** : GPT-5.6 a été interrogé via l'interface chat
(réponse conversationnelle, one-shot), Claude Sonnet 5 via Claude Code (agent orienté
code, avec contexte projet et consignes de style). L'écart tient donc autant au
**mode d'usage** qu'au modèle : un chat « basique » vs un outil orienté dev.

**Différences** : GPT donne un script court (~65 lignes), URL et sélecteurs codés
en dur, sortie JSON seule. Claude donne un outil (~180 lignes) : URL en argument CLI,
retries, sortie CSV + JSON, données typées, code de sortie d'erreur.

```python
# GPT : cible figée dans le code
URL = "https://example.com"
OUTPUT_FILE = Path("data.json")

# Claude : cible et dossier passés en argument
url_cible = sys.argv[1]
dossier = sys.argv[2] if len(sys.argv) > 2 else "."
```

```python
# GPT : pas de retry, un seul appel
response = requests.get(url, timeout=15, headers={"User-Agent": "Mozilla/5.0"})

# Claude : retry + backoff sur erreurs transitoires
retries = Retry(total=MAX_RETRIES, backoff_factor=BACKOFF_FACTOR,
                status_forcelist=[429, 500, 502, 503, 504], allowed_methods=["GET"])
session.mount("https://", HTTPAdapter(max_retries=retries))
```

**Problèmes / choix arbitraires** :

1. **GPT : cible et sélecteurs CSS codés en dur** → inutilisable sans modifier le code.

   ```python
   for item in soup.select(".item"):
       title = item.select_one(".title")
       description = item.select_one(".description")
   ```

2. **Les deux : `except Exception` sur le parsing** → un bug (typo, attribut manquant)
   est avalé et renvoie une liste vide au lieu de remonter.

   ```python
   # GPT
   except Exception as exc:
       logging.exception("Erreur lors de l'analyse HTML : %s", exc)
       return []

   # Claude
   except Exception as e:
       logger.error("Erreur lors du parsing HTML : %s", e)
   ```

3. **Les deux : schéma de sortie choisi arbitrairement** (le prompt ne précise rien) —
   GPT extrait titre + description, Claude titre + lien.

   ```python
   # GPT
   results.append({"title": ..., "description": ...})

   # Claude
   items.append(Item(titre=titre, lien=lien))
   ```
