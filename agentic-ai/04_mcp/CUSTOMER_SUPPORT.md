# CUSTOMER_SUPPORT — Exécution du Tool CRM (lecture)

## Prompt utilisé

> Un client se plaint que sa commande est bloquée. Son email est
> ceo@entreprise.com. Exécute explicitement l'outil MCP nommé
> get_customer_status pour trouver le statut de sa commande et rédige un
> brouillon d'email d'excuses techniques.

## Tool MCP exécuté

`get_customer_status` (serveur `crm-server` / `crm-mock-server`), argument
`email: "ceo@entreprise.com"`.

## Statut retourné par le CRM

```json
{
  "id": 102,
  "status": "VIP",
  "order_status": "Retardée - Rupture de stock"
}
```

## Brouillon d'e-mail généré

> Objet : Votre commande — mise à jour et excuses
>
> Bonjour,
>
> Je vous contacte au sujet de votre commande, actuellement retardée en
> raison d'une rupture de stock sur l'un des articles. Nous sommes
> conscients de la gêne occasionnée, en particulier pour un client de votre
> statut, et nous en sommes sincèrement désolés.
>
> Notre équipe logistique travaille activement au réapprovisionnement et je
> reviendrai vers vous dès qu'une date de livraison ferme sera confirmée.
>
> Merci de votre compréhension et toutes nos excuses pour ce contretemps.
>
> Cordialement,
> Le Support Client
