// ============================================================================
// PROJET 5 : SENTINEL - SERVEUR MCP GITHUB OPS
// ============================================================================
// Ce fichier est le "pont" entre l'Agent IA (Copilot) et le monde réel (API GitHub).
// Il utilise l'entrée/sortie standard (stdio) pour communiquer en JSON-RPC avec VS Code.
// ============================================================================

// 1. IMPORTATIONS DES MODULES MCP (Nécessite "type": "module" dans package.json)
// Server : La classe principale qui gère la logique du Model Context Protocol.
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
// StdioServerTransport : Le canal de communication invisible basé sur le terminal (Standard I/O).
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// Schémas : Les événements officiels émis par le client (Copilot) auxquels nous allons réagir.
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

// 2. INITIALISATION DU SERVEUR
// On instancie le serveur avec un nom et une version.
// On déclare "capabilities: { tools: {} }" pour annoncer formellement à l'IA 
// que ce serveur possède des outils exécutables (et non pas juste des ressources statiques).
const server = new Server(
  { name: "sentinel-github-ops", version: "1.0.0" }, 
  { capabilities: { tools: {} } }
);

// ⚠️ SÉCURITÉ : Le Personal Access Token GitHub.
// Dans un vrai projet d'entreprise, ceci serait chargé via un fichier .env (process.env.GITHUB_TOKEN)
// Tâche 3 : C'est cette chaîne qu'il faut volontairement fausser pour tester le Self-Healing.
const GITHUB_TOKEN = "ghp_VOTRE_VRAI_TOKEN_ICI"; 

// ============================================================================
// ÉTAPE A : DÉCLARATION DES OUTILS (Le "Menu" du restaurant)
// ============================================================================
// Quand l'IA se connecte, elle demande : "Que sais-tu faire ?". 
// Cette route (ListTools) renvoie la liste des outils avec leur mode d'emploi (JSON Schema).
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: "fetch_github_issues",
    description: "Récupère les 5 dernières issues d'un dépôt GitHub public. Utilise cet outil AVANT de coder.",
    // L'inputSchema est critique : il force l'IA à formater ses paramètres exactement comme on le souhaite.
    inputSchema: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Le propriétaire du dépôt (ex: facebook ou microsoft)" },
        repo: { type: "string", description: "Le nom du dépôt (ex: react ou vscode)" }
      },
      required: ["owner", "repo"] // L'IA ne pourra pas appeler l'outil si ces deux infos manquent.
    }
  }]
}));

// ============================================================================
// ÉTAPE B : EXÉCUTION DES OUTILS (Les "Cuisines" du restaurant)
// ============================================================================
// Quand l'IA décide d'utiliser un outil, elle déclenche cette route (CallTool).
server.setRequestHandler(CallToolRequestSchema, async (req) => {
  
  // On vérifie quel outil l'IA tente d'invoquer (sécurité).
  if (req.params.name === "fetch_github_issues") {
    
    // On extrait les arguments générés par l'IA de manière destructurée.
    const { owner, repo } = req.params.arguments;
    
    try {
      // Appel asynchrone à la vraie API REST de GitHub.
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
        headers: {
          "Authorization": `Bearer ${GITHUB_TOKEN}`, // Injection du token
          "Accept": "application/vnd.github.v3+json" // Format exigé par GitHub
        }
      });

      // TÂCHE 3 : GESTION DES ERREURS HTTP (SELF-HEALING)
      // Si l'API renvoie une erreur (401 Bad Credentials, 404 Not Found), on ne fait PAS planter Node.js !
      if (!response.ok) {
        return {
          // On explique le problème en clair à l'IA.
          content: [{ type: "text", text: `L'API GitHub a refusé la connexion. Code HTTP ${response.status}: ${response.statusText}. Vérifie le token ou le nom du repo.` }],
          // Ce flag "isError: true" est fondamental. Il indique au client MCP (Copilot) 
          // que l'action a échoué. L'IA va lire ce message et chercher une solution toute seule.
          isError: true, 
        };
      }

      // Si tout va bien, on parse la réponse brute en objet JavaScript.
      const issues = await response.json();
      
      // On renvoie un succès à l'IA. 
      // On utilise slice(0, 5) pour ne renvoyer que les 5 premières issues, 
      // afin de ne pas saturer la "Fenêtre de Contexte" (tokens) du LLM.
      return {
        content: [{ type: "text", text: JSON.stringify(issues.slice(0, 5), null, 2) }]
      };

    } catch (error) {
      // Gestion de la coupure réseau pure et dure (ex: pas de connexion internet).
      return {
        content: [{ type: "text", text: `Erreur réseau fatale lors de l'exécution: ${error.message}` }],
        isError: true,
      };
    }
  }
  
  // Barrière de sécurité finale : si l'IA tente d'appeler un outil non répertorié.
  throw new Error("Outil inconnu ou tentative d'accès non autorisée.");
});

// ============================================================================
// ÉTAPE C : DÉMARRAGE DU SERVEUR
// ============================================================================
// On instancie le transport stdio et on le connecte au serveur.
const transport = new StdioServerTransport();
await server.connect(transport);

// ⚠️ RÈGLE D'OR MCP : On utilise toujours console.error() pour debugger, JAMAIS console.log().
// console.log() écrirait dans la sortie standard (stdout) et corromprait le flux JSON-RPC lu par VS Code.
console.error("Sentinel MCP Server opérationnel et en écoute sur stdio.");