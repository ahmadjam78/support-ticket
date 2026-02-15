<h1>API v1</h1>

<p>Base URL: <code>http://localhost:8000/api/v1</code>. Sanctum session cookies are required for authenticated routes; if the SPA runs on a different origin, call <code>GET /sanctum/csrf-cookie</code> once before login. All requests should send cookies (<code>withCredentials</code>).</p>

<h2>Response Shape</h2>
<ul>
  <li>Most endpoints return a Laravel resource wrapper with a <code>data</code> object/collection.</li>
  <li>Validation errors: HTTP 422. Invalid credentials: HTTP 401.</li>
</ul>

<h2>Auth Endpoints</h2>
<table>
  <thead>
    <tr><th>Method</th><th>Path</th><th>Role</th><th>Purpose</th><th>Body (summary)</th></tr>
  </thead>
  <tbody>
    <tr><td>POST</td><td><code>/register</code></td><td>Public</td><td>Create customer user</td><td><code>{ name, email, password, password_confirmation }</code></td></tr>
    <tr><td>POST</td><td><code>/login</code></td><td>Public</td><td>Start session</td><td><code>{ email, password }</code></td></tr>
    <tr><td>POST</td><td><code>/logout</code></td><td>Authenticated</td><td>Destroy session</td><td>-</td></tr>
    <tr><td>GET</td><td><code>/user</code></td><td>Authenticated</td><td>Current user with role</td><td>-</td></tr>
  </tbody>
</table>

<h2>Customer Endpoints (<code>/customer</code>, role: customer)</h2>
<table>
  <thead>
    <tr><th>Method</th><th>Path</th><th>Purpose</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td>GET</td><td><code>/tickets</code></td><td>List own tickets</td><td>Filters: <code>?filter[priority]=low|medium|high</code>; sort: <code>?sort=created_at</code></td></tr>
    <tr><td>GET</td><td><code>/tickets/{id}</code></td><td>Ticket details + messages + attachments</td><td>Messages ordered newest first</td></tr>
    <tr><td>POST</td><td><code>/tickets</code></td><td>Create ticket (with first message)</td><td><code>multipart/form-data</code>; fields: <code>category_id</code> (leaf), <code>subject</code>, <code>description</code>, <code>priority</code>, optional <code>attachments[]</code></td></tr>
    <tr><td>POST</td><td><code>/tickets/{id}/reply</code></td><td>Reply on ticket</td><td><code>multipart/form-data</code>; fields: <code>message</code>, optional <code>attachments[]</code></td></tr>
    <tr><td>GET</td><td><code>/ticket-categories</code></td><td>Category tree</td><td>Includes children for dropdowns</td></tr>
  </tbody>
</table>

<h2>Admin Endpoints (<code>/admin</code>, role: admin)</h2>
<table>
  <thead>
    <tr><th>Method</th><th>Path</th><th>Purpose</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td>GET</td><td><code>/tickets</code></td><td>List all tickets</td><td>Filters: <code>?filter[priority]</code>, <code>?filter[state]</code>; sort: <code>?sort=created_at</code></td></tr>
    <tr><td>GET</td><td><code>/tickets/{id}</code></td><td>Ticket details</td><td>Includes messages and attachments</td></tr>
    <tr><td>POST</td><td><code>/tickets/{id}/open</code></td><td>Set status to open</td><td>-</td></tr>
    <tr><td>POST</td><td><code>/tickets/{id}/pending</code></td><td>Set status to pending</td><td>-</td></tr>
    <tr><td>POST</td><td><code>/tickets/{id}/closed</code></td><td>Set status to closed</td><td>-</td></tr>
    <tr><td>POST</td><td><code>/tickets/{id}/reply</code></td><td>Reply on ticket</td><td><code>multipart/form-data</code>; <code>message</code> + optional <code>attachments[]</code></td></tr>
    <tr><td>DELETE</td><td><code>/tickets/{id}</code></td><td>Delete ticket</td><td>-</td></tr>
    <tr><td>GET</td><td><code>/users</code></td><td>List users (paginated)</td><td>Page size 20</td></tr>
  </tbody>
</table>

<h2>Status & Attachment Rules</h2>
<ul>
  <li>Valid states: <code>open</code>, <code>pending</code>, <code>closed</code> (state machine enforced).</li>
  <li>Replies are blocked on closed tickets (policy + domain check); expect HTTP 403/DomainException.</li>
  <li>Attachments: max 2MB each; mime <code>jpeg</code>, <code>png</code>, <code>pdf</code>, <code>zip</code>. Download links returned under <code>attachments</code> in message resources.</li>
</ul>
