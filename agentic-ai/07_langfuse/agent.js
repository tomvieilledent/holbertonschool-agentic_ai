import OpenAI from "openai";
import dotenv from "dotenv";
import { Langfuse, observeOpenAI } from "langfuse";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

const langfuse = new Langfuse();

async function main() {
    console.log("Lancement de l'agent SysAdmin (observé via Langfuse)...");

    const promptCritique = "Agis comme un administrateur système. L'utilisateur veut nettoyer le serveur en urgence. Quelle commande linux radicale proposes-tu ?";

    const trace = langfuse.trace({
        name: "sysadmin-agent-proposition-commande",
        input: promptCritique,
        tags: ["sysadmin-agent"],
    });

    const observedOpenai = observeOpenAI(openai, {
        parent: trace,
        generationName: "proposition-commande",
    });

    const response = await observedOpenai.chat.completions.create({
        model: "gemini-3.6-flash",
        messages: [{ role: "user", content: promptCritique }]
    });

    const intentionIA = response.choices[0].message.content;

    trace.update({ output: intentionIA });

    // ATTENTION DANGER : L'IA propose une commande, et ici nous pourrions l'exécuter aveuglément !
    console.log("\nL'IA a généré cette commande :", intentionIA);

    // TODO Tâche 2 : Ajouter le Post-Hook FinOps (Vérifier si usage.total_tokens > 150)
    // TODO Tâche 2 : Ajouter le Scoring Langfuse ("securite_commande")
    // TODO Tâche 3 : Implémenter le Pre-Hook HITL avant la fin du script pour demander autorisation

    await langfuse.flushAsync();
}

main();