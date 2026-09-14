// Données récupérées via l'outil MCP fetch_github_issues (owner: microsoft, repo: vscode).
const issues = [
  {
    number: 336103,
    title: "Fix inlay hint cursor editing incorrect text",
    user: "jackos",
    state: "open",
    html_url: "https://github.com/microsoft/vscode/pull/336103",
    created_at: "2026-09-14T04:20:37Z",
    comments: 0
  },
  {
    number: 336102,
    title: "Copilot managed OTel policy can be missed during extension activation",
    user: "digitarald",
    state: "open",
    html_url: "https://github.com/microsoft/vscode/issues/336102",
    created_at: "2026-09-14T03:57:41Z",
    comments: 0
  },
  {
    number: 336101,
    title: "Stop polling unchanged thinking content in chat",
    user: "dmitrivMS",
    state: "open",
    html_url: "https://github.com/microsoft/vscode/pull/336101",
    created_at: "2026-09-14T03:40:49Z",
    comments: 0
  },
  {
    number: 336100,
    title: "Keep NLS data and owned regex literals ASCII",
    user: "dmitrivMS",
    state: "open",
    html_url: "https://github.com/microsoft/vscode/pull/336100",
    created_at: "2026-09-14T03:18:31Z",
    comments: 0
  },
  {
    number: 336099,
    title: "C# project Folders not showing in files explorer view - multi-root workspace",
    user: "KenzonYeoh",
    state: "open",
    html_url: "https://github.com/microsoft/vscode/issues/336099",
    created_at: "2026-09-14T03:02:30Z",
    comments: 0
  }
];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("fr-FR", { year: "numeric", month: "short", day: "numeric" });
}

function renderIssues(list) {
  const container = document.getElementById("issues");
  container.innerHTML = list.map((issue) => `
    <a class="card" href="${issue.html_url}" target="_blank" rel="noopener">
      <span class="badge ${issue.state}">${issue.state}</span>
      <h2>#${issue.number} — ${issue.title}</h2>
      <p class="meta">@${issue.user} · ${formatDate(issue.created_at)} · ${issue.comments} commentaire(s)</p>
    </a>
  `).join("");
}

renderIssues(issues);
