import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "sentinel-github-ops", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Token chargé depuis l'environnement (jamais en dur dans le code).
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "fetch_github_issues",
      description: "Récupère les 5 dernières issues d'un dépôt GitHub public.",
      inputSchema: {
        type: "object",
        properties: {
          owner: { type: "string", description: "Le propriétaire du dépôt (ex: facebook)" },
          repo: { type: "string", description: "Le nom du dépôt (ex: react)" }
        },
        required: ["owner", "repo"]
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "fetch_github_issues") {
    const { owner, repo } = request.params.arguments;

    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues?per_page=5`,
        {
          headers: {
            "Authorization": `Bearer ${GITHUB_TOKEN}`,
            "Accept": "application/vnd.github.v3+json"
          }
        }
      );

      if (!response.ok) {
        return {
          content: [{
            type: "text",
            text: `Erreur API GitHub (HTTP ${response.status} ${response.statusText}) pour ${owner}/${repo}. Vérifie le token ou le nom du dépôt.`
          }],
          isError: true,
        };
      }

      const issues = await response.json();

      return {
        content: [{ type: "text", text: JSON.stringify(issues, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Erreur réseau: ${error.message}` }],
        isError: true,
      };
    }
  }

  throw new Error("Outil inconnu");
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Sentinel MCP Server démarré et en écoute sur stdio");
}

main().catch((error) => {
  console.error("Erreur fatale:", error);
  process.exit(1);
});
