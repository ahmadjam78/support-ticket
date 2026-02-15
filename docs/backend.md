<h1>Backend (Laravel 12)</h1>

<p>Laravel 12 API with Sanctum session auth, Spatie permissions/states/media, and domain-driven structure under <code>app/Domains</code>. DI bindings live in <code>app/Providers/RepositoryServiceProvider.php</code>.</p>

<h2>Architecture & Patterns</h2>
<table>
  <thead>
    <tr><th>Pattern / Approach</th><th>Usage in Codebase</th><th>Benefit</th></tr>
  </thead>
  <tbody>
    <tr><td>Domain-Driven Structure</td><td><code>app/Domains/{User,Ticket}</code> with actions, DTOs, services, policies, resources</td><td>Clear separation of concerns and easier evolution per domain</td></tr>
    <tr><td>Repository Pattern</td><td>Interfaces + Eloquent implementations in <code>app/Domains/*/Repositories</code></td><td>Abstracts persistence and eases testing/swapping data sources</td></tr>
    <tr><td>Service Layer</td><td><code>AuthService</code>, <code>TicketService</code>, <code>TicketReplyService</code>, <code>TicketStateService</code></td><td>Encapsulates business rules/transactions outside controllers</td></tr>
    <tr><td>Action Classes</td><td><code>CreateTicketAction</code>, <code>ReplyTicketAction</code>, <code>LoginUserAction</code></td><td>Small, reusable units for single responsibilities</td></tr>
    <tr><td>DTOs</td><td><code>CreateTicketDTO</code>, <code>ReplyTicketDTO</code>, <code>RegisterUserDTO</code></td><td>Typed request data transfer; reduces coupling to HTTP layer</td></tr>
    <tr><td>Policy-Based Authorization</td><td><code>TicketPolicy</code></td><td>Centralized access control per model</td></tr>
    <tr><td>State Machine</td><td><code>TicketState</code> with <code>Open|Pending|Closed</code></td><td>Explicit allowed transitions and helpers per state</td></tr>
    <tr><td>Resource Transformers</td><td>Admin vs Customer resources for tickets/messages</td><td>Role-specific payload shaping and field exposure</td></tr>
  </tbody>
</table>

<h2>Key Dependencies</h2>
<table>
  <thead>
    <tr><th>Package</th><th>Purpose</th></tr>
  </thead>
  <tbody>
    <tr><td>laravel/sanctum</td><td>Session/XSRF auth for SPA</td></tr>
    <tr><td>spatie/laravel-permission</td><td>Roles (admin, customer)</td></tr>
    <tr><td>spatie/laravel-model-states</td><td>Ticket state machine</td></tr>
    <tr><td>spatie/laravel-medialibrary</td><td>Attachments on messages</td></tr>
    <tr><td>spatie/laravel-query-builder</td><td>Filter/sort pagination</td></tr>
    <tr><td>spatie/laravel-activitylog</td><td>Activity logging</td></tr>
  </tbody>
</table>

<h2>Stack & Libraries</h2>
<table>
  <thead>
    <tr><th>Layer</th><th>Library</th><th>Role</th><th>Benefit</th></tr>
  </thead>
  <tbody>
    <tr><td>Framework</td><td>Laravel 12</td><td>HTTP, routing, queues, Eloquent ORM</td><td>Mature ecosystem, batteries-included tooling</td></tr>
    <tr><td>Auth</td><td>Sanctum</td><td>Session/XSRF protection for SPA</td><td>Simple cookie-based auth without JWT complexity</td></tr>
    <tr><td>RBAC</td><td>Spatie Permission</td><td>Roles/permissions storage and checks</td><td>Declarative role checks, cached performance</td></tr>
    <tr><td>States</td><td>Spatie Model States</td><td>Ticket status management</td><td>Formalizes transitions and state-specific logic</td></tr>
    <tr><td>Media</td><td>Spatie Media Library</td><td>File uploads for ticket messages</td><td>Handles storage, URLs, mime validation hooks</td></tr>
    <tr><td>Query</td><td>Spatie Query Builder</td><td>Filtering/sorting/pagination</td><td>Consistent API query params with whitelist</td></tr>
    <tr><td>Logging</td><td>Spatie Activitylog</td><td>Activity auditing</td><td>Traceability of model changes</td></tr>
    <tr><td>Queues</td><td>Database queue</td><td>Async jobs (configured)</td><td>Simple deployment with DB-backed queue</td></tr>
  </tbody>
</table>


<h2>Middleware Configuration (Laravel 11/12 — <code>bootstrap/app.php</code>)</h2>
<table> 
<thead>
<tr>
<th>
Configuration</th>
<th>Use Case</th>
<th>When to Enable</th>
<th>When to Comment Out</th>
<th>Reason /
Effect</th>
</tr> 
</thead> 
<tbody>
<tr>
  <td><code>$middleware->statefulApi();</code></td>
  <td>SPA on <b>same domain</b></td>
  <td>
    Frontend and backend share the same origin<br>
    Example:<br>
    <code>http://localhost:8000</code><br>
    <code>http://127.0.0.1:8000</code>
  </td>
  <td>
    When frontend is hosted on a <b>different domain or port</b>
  </td>
  <td>
    Enables Laravel Sanctum “stateful” API behavior:<br>
    • Uses session cookies<br>
    • Enables CSRF protection<br>
    • Supports SPA authentication<br>
    • No manual session middleware needed
  </td>
</tr>

<tr>
  <td><code>$middleware->prepend(StartSession::class);</code></td>
  <td>SPA on <b>different domain</b></td>
  <td>
    Frontend and backend are on separate origins<br>
    Example:<br>
    <code>http://localhost:5173</code> → React/Vite<br>
    <code>http://localhost:8000</code> → Laravel
  </td>
  <td>
    When frontend and backend are on the <b>same domain</b>
  </td>
  <td>
    Manually starts session for API routes.<br>
    Required when cookies must cross origins<br>
    (with proper CORS + credentials settings).
  </td>
</tr>
</tbody>
</table>

<h2>Domain Modules</h2>
<table>
  <thead>
    <tr><th>Module</th><th>Responsibilities</th><th>Highlights</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>User</td>
      <td>Auth (register/login), role helpers, user listing</td>
      <td><code>AuthService</code> hashes passwords, assigns customer role; <code>UserResource</code> exposes role; repo <code>EloquentUserRepository</code></td>
    </tr>
    <tr>
      <td>Ticket</td>
      <td>Tickets, messages, categories, state transitions</td>
      <td>States <code>Open|Pending|Closed</code>; services for create/reply/state change; policies gate view/reply/close/delete; separate admin/customer resources</td>
    </tr>
    <tr>
      <td>Shared</td>
      <td>Enums and shared types</td>
      <td><code>Role</code>, <code>TicketPriority (low|medium|high)</code></td>
    </tr>
  </tbody>
</table>

<h2>Models & Rules</h2>
<ul>
  <li><strong>Ticket</strong>: fields <code>user_id, category_id, subject, status, priority</code>; status cast to <code>TicketState</code>, priority to enum. Relations: <code>user</code>, <code>category</code>, <code>messages</code>.</li>
  <li><strong>TicketMessage</strong>: message text plus attachments collection (<code>attachments</code> on disk <code>public</code>; mime jpeg/png/pdf/zip; max 2MB each).</li>
  <li><strong>TicketCategory</strong>: tree via <code>parent_id</code> with <code>childrenRecursive</code> for nested output.</li>
  <li><strong>Policies</strong> (<code>TicketPolicy</code>): view/reply allowed for admin or owner; create only customer; close/update/delete only admin; cannot reply when state is closed.</li>
</ul>

<h2>Services & Flows</h2>
<table>
  <thead>
    <tr><th>Service</th><th>Flow</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td>AuthService</td><td>Register (hash, assign customer, dispatch event) & login (Auth provider + session)</td><td>Uses <code>RegisterUserAction</code>, <code>LoginUserAction</code></td></tr>
    <tr><td>TicketService</td><td>Create ticket + first message + attachments, dispatch <code>TicketCreated</code>, auto-assign admin</td><td>Transactional; uses <code>CreateTicketAction</code> & <code>TicketAssignmentService</code></td></tr>
    <tr><td>TicketReplyService</td><td>Lock ticket row, forbid replying to closed tickets, add message + attachments, dispatch <code>TicketReplied</code> after commit</td><td>Reopens if status was <code>resolved</code> (legacy check)</td></tr>
    <tr><td>TicketStateService</td><td>Transitions between <code>Open</code>, <code>Pending</code>, <code>Closed</code></td><td>Transitions configured in <code>TicketState::config()</code></td></tr>
    <tr><td>Repositories</td><td>Ticket/category/message/user data access</td><td><code>EloquentTicketRepository</code> supports filters (priority/state) and sorts (created_at)</td></tr>
  </tbody>
</table>

<h2>API Routing (v1)</h2>
<table>
  <thead>
    <tr><th>Scope</th><th>Endpoints</th><th>Auth</th></tr>
  </thead>
  <tbody>
    <tr><td>Auth</td><td><code>POST /register</code>, <code>/login</code>, <code>/logout</code>, <code>GET /user</code></td><td>Unauthenticated for login/register; others require Sanctum session</td></tr>
    <tr><td>Customer</td><td><code>GET/POST /customer/tickets</code>, <code>GET /customer/tickets/{id}</code>, <code>POST /customer/tickets/{id}/reply</code>, <code>GET /customer/ticket-categories</code></td><td>Role: customer</td></tr>
    <tr><td>Admin</td><td><code>GET /admin/tickets</code>, <code>GET /admin/tickets/{id}</code>, <code>POST /admin/tickets/{id}/{open|pending|closed}</code>, <code>POST /admin/tickets/{id}/reply</code>, <code>DELETE /admin/tickets/{id}</code>, <code>GET /admin/users</code></td><td>Role: admin</td></tr>
  </tbody>
</table>

<h2>Request Validation</h2>
<table>
  <thead>
    <tr><th>Form</th><th>Required Fields</th><th>Constraints</th></tr>
  </thead>
  <tbody>
    <tr><td>CreateTicketRequest</td><td><code>category_id</code>, <code>subject</code>, <code>description</code>, <code>priority</code></td><td><code>category_id</code> exists; priority in <code>low|medium|high</code>; attachments max 2MB each</td></tr>
    <tr><td>ReplyTicketRequest</td><td><code>message</code></td><td>min length 2; attachments optional, 2MB each</td></tr>
    <tr><td>RegisterRequest</td><td><code>name</code>, <code>email</code>, <code>password</code>, <code>password_confirmation</code></td><td>Email unique; password min 6</td></tr>
    <tr><td>LoginRequest</td><td><code>email</code>, <code>password</code></td><td>Password min 6</td></tr>
  </tbody>
</table>

<h2>State Machine</h2>
<p><code>TicketState</code> default: <strong>Open</strong>. Allowed transitions: Open → Pending/Closed; Pending ↔ Open/Closed; Closed ↔ Open/Pending. Helpers: <code>isOpen()</code>, <code>isClosed()</code>, <code>color()</code>.</p>

<h2>Database & Seeds</h2>
<table>
  <thead>
    <tr><th>Table</th><th>Key Columns</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td>users</td><td>name, email (unique), password</td><td>Sessions stored in <code>sessions</code></td></tr>
    <tr><td>ticket_categories</td><td>name, parent_id</td><td>Supports nested categories</td></tr>
    <tr><td>tickets</td><td>user_id, category_id, subject, status, priority</td><td>Indexes on status/priority/created_at/user_id</td></tr>
    <tr><td>ticket_messages</td><td>ticket_id, user_id, message</td><td>Attachments via media library</td></tr>
    <tr><td>permission tables</td><td>Spatie roles/permissions</td><td>Seeded with admin/customer roles</td></tr>
    <tr><td>media, activity_log, jobs</td><td>-</td><td>For attachments, auditing, queues</td></tr>
  </tbody>
</table>

<p>Seed order (<code>php artisan migrate --seed</code>): roles, admin user, sample customers, ticket categories tree (Technical/Server/Bug; Billing/Invoice/Refund), sample tickets/messages per customer.</p>

<h2>File Storage & Static Assets</h2>
<ul>
  <li>Attachments saved to disk <code>public</code>; download route <code>/storage/{id}/{filename}</code> served via <code>routes/web.php</code>. Run <code>php artisan storage:link</code>.</li>
  <li>Current compiled frontend assets in <code>public/js/index.js</code> and <code>public/css/index.css</code>; you can replace with a fresh build from <code>frontend/dist/</code> if desired.</li>
</ul>
