// Simulation très basique d'un connecteur de base de données
const db = {
    /**
     * Exécute une requête. Supporte désormais les requêtes paramétrées :
     * les valeurs sont passées via `params` et liées aux placeholders `?`,
     * puis échappées avant substitution (simulation d'un prepared statement).
     */
    query: (sql, params = []) => {
        let boundSql = sql;
        if (params.length > 0) {
            let index = 0;
            boundSql = sql.replace(/\?/g, () => {
                const value = String(params[index++]);
                // Échappement des quotes : neutralise toute tentative d'injection
                return `'${value.replace(/'/g, "''")}'`;
            });
        }

        console.log(`[DB ENGINE] Exécution de la requête : ${boundSql}`);

        // Simulation du comportement vulnérable face à une injection SQL classique
        if (boundSql.includes("' OR '1'='1")) {
            return [{ id: 999, role: 'admin', email: 'hacked@entreprise.com' }]; // Fuite de données
        }

        if (boundSql === "SELECT * FROM users WHERE email = 'dev@entreprise.com' AND password = 'password123'") {
            return [{ id: 1, role: 'admin', email: 'dev@entreprise.com' }];
        }
        return [];
    }
};

/**
 * Fonction d'authentification legacy (SÉCURISÉE)
 * Utilise une requête paramétrée : les entrées utilisateur ne sont plus
 * concaténées dans la chaîne SQL.
 */
function authenticateUser(email, password) {
    // Requête préparée : placeholders `?` + valeurs liées séparément
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

    const results = db.query(sql, [email, password]);

    if (results.length > 0) {
        return { success: true, user: results[0] };
    }
    return { success: false, message: "Identifiants invalides" };
}

module.exports = { authenticateUser };
