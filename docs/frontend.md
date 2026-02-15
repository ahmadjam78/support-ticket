<h1>Frontend (React + Vite)</h1>

<p>React 19 SPA built with Vite 7 and Tailwind v4. Uses React Router 7 for navigation, React Query 5 for server state, and React Hook Form 7 for forms. API client (<code>src/lib/axios.js</code>) points to <code>http://localhost:8000</code> with <code>withCredentials</code> and <code>withXSRFToken</code> enabled for Sanctum sessions.</p>

<h2>Architecture & Patterns</h2>
<table>
  <thead>
    <tr><th>Pattern / Approach</th><th>Usage in Codebase</th><th>Benefit</th></tr>
  </thead>
  <tbody>
    <tr><td>Component-Based SPA</td><td>React functional components with hooks</td><td>Predictable UI composition and reuse</td></tr>
    <tr><td>Layout Composition</td><td><code>CustomerLayout</code>, <code>AdminLayout</code></td><td>Shared chrome per role, DRY navigation</td></tr>
    <tr><td>Protected Routing</td><td><code>ProtectedRoute</code> wrapper</td><td>Centralized auth/role gating for routes</td></tr>
    <tr><td>Context for Auth</td><td><code>AuthContext</code></td><td>Global user state with lazy init and loading guard</td></tr>
    <tr><td>Query-Driven UI</td><td>React Query hooks per screen/modal</td><td>Cache, stale handling, and automatic refetches on mutations</td></tr>
    <tr><td>Form Handling</td><td>React Hook Form</td><td>Lightweight controlled inputs and validation</td></tr>
    <tr><td>Modal Composition</td><td><code>TicketModal</code>, <code>AdminTicketModal</code></td><td>Encapsulated conversation UI and reply logic</td></tr>
  </tbody>
</table>

<h2>Stack & Configuration</h2>
<table>
  <thead>
    <tr><th>Layer</th><th>Details</th></tr>
  </thead>
  <tbody>
    <tr><td>Tooling</td><td>Vite 7, Tailwind v4 via <code>@tailwindcss/vite</code></td></tr>
    <tr><td>Routing</td><td>React Router 7 (<code>BrowserRouter</code>, protected routes by role)</td></tr>
    <tr><td>Data fetching</td><td>React Query 5 (query keys per entity, minimal retries, no refetch on focus)</td></tr>
    <tr><td>Forms</td><td>React Hook Form 7 for login/register/ticket forms</td></tr>
    <tr><td>HTTP</td><td>Axios instance with cookies/XSRF; base URL <code>http://localhost:8000</code></td></tr>
  </tbody>
</table>

<h2>Stack & Libraries</h2>
<table>
  <thead>
    <tr><th>Layer</th><th>Library</th><th>Role</th><th>Benefit</th></tr>
  </thead>
  <tbody>
    <tr><td>Framework</td><td>React 19</td><td>UI rendering</td><td>Modern concurrent-ready API, hooks-first</td></tr>
    <tr><td>Bundler</td><td>Vite 7</td><td>Dev server & build</td><td>Fast HMR and optimized production builds</td></tr>
    <tr><td>Styling</td><td>Tailwind CSS v4</td><td>Utility-first styling</td><td>Rapid UI iteration with design consistency</td></tr>
    <tr><td>Routing</td><td>React Router 7</td><td>SPA navigation</td><td>Declarative routes, nested layouts, loader support</td></tr>
    <tr><td>Server State</td><td>React Query 5</td><td>Data fetching/caching</td><td>Cache invalidation, retries, and status management</td></tr>
    <tr><td>Forms</td><td>React Hook Form 7</td><td>Form state/validation</td><td>Minimal re-renders, easy integration with inputs</td></tr>
    <tr><td>HTTP Client</td><td>Axios</td><td>Requests with cookies/XSRF</td><td>Simplifies defaults and interceptors</td></tr>
    <tr><td>Icons</td><td>react-icons</td><td>UI icons</td><td>Lightweight icon imports</td></tr>
    <tr><td>Validation (optional)</td><td>@hookform/resolvers, zod</td><td>Schema validation</td><td>Declarative validation with good DX</td></tr>
  </tbody>
</table>

<h2>Folder Structure (src/)</h2>
<table>
  <thead>
    <tr><th>Path</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>App.jsx</code>, <code>routes/index.jsx</code></td><td>App wrapper and route definitions</td></tr>
    <tr><td><code>context/AuthContext.jsx</code></td><td>Fetches <code>GET /api/v1/user</code> on mount, stores <code>user</code>/<code>loading</code>, exposes setter</td></tr>
    <tr><td><code>components/ProtectedRoute.jsx</code></td><td>Guards routes based on auth and optional role</td></tr>
    <tr><td><code>components/layouts/{CustomerLayout,AdminLayout}.jsx</code></td><td>Shared chrome, logout action (<code>POST /api/v1/logout</code>)</td></tr>
    <tr><td><code>modules/auth/pages</code></td><td>Login (with <code>/sanctum/csrf-cookie</code> then <code>/api/v1/login</code>) and register forms</td></tr>
    <tr><td><code>modules/ticket/pages</code></td><td>Customer ticket list + modal, create ticket flow, admin ticket list with status controls</td></tr>
    <tr><td><code>modules/ticket/components</code></td><td>Conversation modals (<code>TicketModal</code>, <code>AdminTicketModal</code>)</td></tr>
    <tr><td><code>modules/user/pages/AdminUserListPage.jsx</code></td><td>Admin-facing user cards</td></tr>
    <tr><td><code>styles/index.css</code></td><td>Tailwind import only</td></tr>
  </tbody>
</table>

<h2>Axios baseURL Configuration</h2>
<table>
<thead>
<tr>
<th>Setting</th>
<th>Environment</th>
<th>Use When</th>
<th>Comment Out When</th>
<th>Example Scenario</th>
</tr> 
</thead>
<tbody>
<tr>
  <td><code>baseURL: '/'</code><br><small>// For Production</small></td>
  <td>Production</td>
  <td>
    Frontend and Backend run on the <b>same domain</b>
  </td>
  <td>
    When developing with separate hosts/ports
  </td>
  <td>
    Frontend: <code>https://example.com</code><br>
    API: <code>https://example.com/api</code>
  </td>
</tr>

<tr>
  <td><code>baseURL: 'http://localhost:8000'</code><br><small>// For Dev</small></td>
  <td>Development</td>
  <td>
    Frontend and Backend run on <b>different hosts or ports</b>
  </td>
  <td>
    When deployed to production on a single domain
  </td>
  <td>
    Frontend: <code>http://localhost:5173</code><br>
    Backend: <code>http://localhost:8000</code>
  </td>
</tr>
</tbody>
</table>

<h2>Routing & Screens</h2>
<table>
  <thead>
    <tr><th>Path</th><th>Role</th><th>Purpose</th></tr>
  </thead>
  <tbody>
    <tr><td><code>/login</code></td><td>Public</td><td>Authenticate and set session</td></tr>
    <tr><td><code>/register</code></td><td>Public</td><td>Create customer account</td></tr>
    <tr><td><code>/tickets</code></td><td>Customer</td><td>List own tickets, open conversation modal</td></tr>
    <tr><td><code>/tickets/new</code></td><td>Customer</td><td>Create new ticket (select category/subcategory, upload optional attachment)</td></tr>
    <tr><td><code>/admin/tickets</code></td><td>Admin</td><td>All tickets, change status, delete, open conversation modal</td></tr>
    <tr><td><code>/admin/users</code></td><td>Admin</td><td>View users and roles</td></tr>
  </tbody>
</table>

<h2>Data & Queries</h2>
<table>
  <thead>
    <tr><th>Query Key</th><th>Endpoint</th><th>Usage</th></tr>
  </thead>
  <tbody>
    <tr><td><code>['tickets']</code></td><td><code>GET /api/v1/customer/tickets</code></td><td>Customer ticket list</td></tr>
    <tr><td><code>['ticket', id]</code></td><td><code>GET /api/v1/customer/tickets/{id}</code></td><td>Conversation in ticket modal (customer)</td></tr>
    <tr><td><code>['adminTickets']</code></td><td><code>GET /api/v1/admin/tickets</code></td><td>Admin ticket list</td></tr>
    <tr><td><code>['adminTicket', id]</code></td><td><code>GET /api/v1/admin/tickets/{id}</code></td><td>Conversation in admin modal</td></tr>
    <tr><td><code>['users']</code></td><td><code>GET /api/v1/admin/users</code></td><td>Admin user grid</td></tr>
  </tbody>
</table>

<h2>Forms & Mutations</h2>
<ul>
  <li><strong>Login</strong>: <code>GET /sanctum/csrf-cookie</code> → <code>POST /api/v1/login</code> → fetch <code>/api/v1/user</code> and route by role.</li>
  <li><strong>Register</strong>: <code>POST /api/v1/register</code> then navigate to login.</li>
  <li><strong>Create ticket</strong>: <code>POST /api/v1/customer/tickets</code> with <code>multipart/form-data</code> (fields: <code>subject</code>, <code>description</code>, <code>priority</code>, <code>category_id</code> as chosen subcategory, optional <code>attachments[]</code> single file).</li>
  <li><strong>Reply</strong>: Customer → <code>POST /api/v1/customer/tickets/{id}/reply</code>; Admin → <code>POST /api/v1/admin/tickets/{id}/reply</code>. Uses <code>FormData</code> with <code>message</code> and optional <code>attachments[]</code>.</li>
  <li><strong>Status changes</strong> (admin list): <code>POST /api/v1/admin/tickets/{id}/{open|pending|closed}</code>; invalidates <code>['adminTickets']</code>.</li>
  <li><strong>Delete ticket</strong> (admin): <code>DELETE /api/v1/admin/tickets/{id}</code>; invalidates <code>['adminTickets']</code>.</li>
  <li>React Query invalidations refresh modal/list data after replies or status changes.</li>
  <li>Attachments are displayed with download links from <code>original_url</code> (served by backend storage route).</li>
</ul>

<h2>Build & Run</h2>
<table>
  <thead>
    <tr><th>Task</th><th>Command</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td>Install</td><td><code>npm install</code></td><td>Run inside <code>frontend/</code></td></tr>
    <tr><td>Dev server</td><td><code>npm run dev -- --host</code></td><td>Needs backend on <code>http://localhost:8000</code> for cookies</td></tr>
    <tr><td>Build</td><td><code>npm run build</code></td><td>Outputs to <code>dist/</code>; serve statically or copy to <code>backend/public</code></td></tr>
  </tbody>
</table>
