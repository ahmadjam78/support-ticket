<h1>Key Workflows</h1>

<p>Operational flows across backend (Laravel) and frontend (React) with the main components, endpoints, and data paths involved.</p>

<h2>Auth & Session</h2>
<table>
  <thead>
    <tr><th>Flow</th><th>Steps</th><th>Backend</th><th>Frontend</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>Login</td>
      <td>
        1) <code>GET /sanctum/csrf-cookie</code> (only if cross-origin)<br>
        2) <code>POST /api/v1/login</code><br>
        3) <code>GET /api/v1/user</code> to hydrate session user
      </td>
      <td><code>AuthController@login</code> → <code>AuthService::login</code> → <code>LoginUserAction</code></td>
      <td><code>LoginPage</code> form → Axios instance (<code>withCredentials</code>) → set user in <code>AuthContext</code>, route by role</td>
    </tr>
    <tr>
      <td>Register</td>
      <td><code>POST /api/v1/register</code>, then redirect to login</td>
      <td><code>AuthController@register</code> → <code>AuthService::register</code> → <code>RegisterUserAction</code> + role assignment</td>
      <td><code>RegisterPage</code> form, success navigates to <code>/login</code></td>
    </tr>
    <tr>
      <td>Session bootstrap</td>
      <td><code>GET /api/v1/user</code> on app load</td>
      <td>Sanctum session + <code>AuthController@me</code></td>
      <td><code>AuthContext</code> <code>useEffect</code> fetch; controls loading/protection</td>
    </tr>
    <tr>
      <td>Logout</td>
      <td><code>POST /api/v1/logout</code></td>
      <td><code>AuthController@logout</code></td>
      <td>Logout buttons in layouts call mutation, then navigate to <code>/login</code></td>
    </tr>
  </tbody>
</table>

<h2>Tickets — Customer</h2>
<table>
  <thead>
    <tr><th>Flow</th><th>Steps</th><th>Backend</th><th>Frontend</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>List tickets</td>
      <td><code>GET /api/v1/customer/tickets</code></td>
      <td><code>Customer\TicketController@index</code> → <code>TicketRepository::paginateForUser</code></td>
      <td><code>TicketListPage</code> (React Query key <code>['tickets']</code>)</td>
    </tr>
    <tr>
      <td>View conversation</td>
      <td><code>GET /api/v1/customer/tickets/{id}</code></td>
      <td><code>Customer\TicketController@show</code> loads messages + media</td>
      <td><code>TicketModal</code> (query key <code>['ticket', id]</code>) displays messages & attachments</td>
    </tr>
    <tr>
      <td>Create ticket</td>
      <td><code>POST /api/v1/customer/tickets</code> (multipart)</td>
      <td><code>Customer\TicketController@store</code> → <code>CreateTicketDTO</code> → <code>TicketService::create</code> → state default Open</td>
      <td><code>NewTicketPage</code> form; selects category/subcategory from <code>/customer/ticket-categories</code>; sends <code>subject, description, priority, category_id, attachments[]</code></td>
    </tr>
    <tr>
      <td>Reply</td>
      <td><code>POST /api/v1/customer/tickets/{id}/reply</code> (multipart)</td>
      <td><code>Customer\TicketController@reply</code> → <code>ReplyTicketDTO</code> → <code>TicketService::reply</code> (locks ticket, blocks if closed)</td>
      <td><code>TicketModal</code> reply box; invalidates <code>['ticket', id]</code> on success</td>
    </tr>
  </tbody>
</table>

<h2>Tickets — Admin</h2>
<table>
  <thead>
    <tr><th>Flow</th><th>Steps</th><th>Backend</th><th>Frontend</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>List all tickets</td>
      <td><code>GET /api/v1/admin/tickets</code></td>
      <td><code>Admin\TicketController@index</code> → <code>TicketRepository::paginateForAdmin</code></td>
      <td><code>AdminTicketListPage</code> (query key <code>['adminTickets']</code>)</td>
    </tr>
    <tr>
      <td>View conversation</td>
      <td><code>GET /api/v1/admin/tickets/{id}</code></td>
      <td><code>Admin\TicketController@show</code> loads messages + media</td>
      <td><code>AdminTicketModal</code> (query key <code>['adminTicket', id]</code>)</td>
    </tr>
    <tr>
      <td>Reply</td>
      <td><code>POST /api/v1/admin/tickets/{id}/reply</code></td>
      <td><code>Admin\TicketController@reply</code> → <code>TicketService::reply</code></td>
      <td><code>AdminTicketModal</code>; invalidates <code>['adminTicket', id]</code></td>
    </tr>
    <tr>
      <td>Change status</td>
      <td><code>POST /api/v1/admin/tickets/{id}/{open|pending|closed}</code></td>
      <td><code>TicketStateService</code> transitions state; policy enforces admin</td>
      <td>Status select in <code>AdminTicketListPage</code> triggers mutation; invalidates <code>['adminTickets']</code></td>
    </tr>
    <tr>
      <td>Delete ticket</td>
      <td><code>DELETE /api/v1/admin/tickets/{id}</code></td>
      <td><code>Admin\TicketController@destroy</code></td>
      <td>Delete button in list; confirms then invalidates <code>['adminTickets']</code></td>
    </tr>
  </tbody>
</table>

<h2>Categories</h2>
<table>
  <thead>
    <tr><th>Flow</th><th>Steps</th><th>Backend</th><th>Frontend</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>Load categories</td>
      <td><code>GET /api/v1/customer/ticket-categories</code></td>
      <td><code>TicketCategoryController@index</code> → <code>EloquentTicketCategoryRepository::allWithChildren</code></td>
      <td><code>NewTicketPage</code> fetches on mount to populate category/subcategory dropdowns</td>
    </tr>
  </tbody>
</table>
