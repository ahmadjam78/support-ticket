<h1>Support Ticket Documentation Index</h1>

<p>This repository contains a Laravel 12 API backend and a React single-page frontend with session/Sanctum auth and two roles: <strong>admin</strong> and <strong>customer</strong>. Use the table below to jump to each detailed document.</p>

<table>
  <thead>
    <tr><th>Doc</th><th>What it covers</th></tr>
  </thead>
  <tbody>
    <tr><td><a href="./backend.md">Backend</a></td><td>Architecture, domains, policies, database, seeds, key flows</td></tr>
    <tr><td><a href="./frontend.md">Frontend</a></td><td>Stack, structure, routing, data flow, build notes</td></tr>
    <tr><td><a href="./api.md">API</a></td><td>v1 endpoints, auth rules, payloads, status rules</td></tr>
  </tbody>
</table>

<h2>Quickstart (Development)</h2>
<table>
  <thead>
    <tr><th>Step</th><th>Command / Note</th></tr>
  </thead>
  <tbody>
    <tr><td>1) Prereqs</td><td>PHP 8.2+, Composer, Node 20+, npm</td></tr>
    <tr><td>2) Backend deps</td><td><code>cd backend && composer install</code></td></tr>
    <tr><td>3) Env</td><td><code>cp .env.example .env</code>, set DB (default SQLite) and <code>APP_URL=http://localhost:8000</code></td></tr>
    <tr><td>4) App key</td><td><code>php artisan key:generate</code></td></tr>
    <tr><td>5) DB + seed</td><td><code>php artisan migrate --seed</code></td></tr>
    <tr><td>6) Storage link</td><td><code>php artisan storage:link</code> (for media downloads)</td></tr>
    <tr><td>7) Run API</td><td><code>php artisan serve</code> (optionally <code>php artisan queue:listen</code>)</td></tr>
    <tr><td>8) Frontend deps</td><td><code>cd ../frontend && npm install</code></td></tr>
    <tr><td>9) Run SPA</td><td><code>npm run dev -- --host</code> (API base is <code>http://localhost:8000</code> in <code>src/lib/axios.js</code>)</td></tr>
  </tbody>
</table>

<h2>Default Accounts</h2>
<table>
  <thead>
    <tr><th>Role</th><th>Email</th><th>Password</th></tr>
  </thead>
  <tbody>
    <tr><td>Admin</td><td>admin@example.com</td><td>password</td></tr>
    <tr><td>Customer</td><td>alice@example.com</td><td>password</td></tr>
    <tr><td>Customer</td><td>bob@example.com</td><td>password</td></tr>
  </tbody>
</table>

<h2>Repository Layout</h2>
<pre>
backend/  Laravel API, domains (app/Domains/{Ticket,User}), routes, migrations, seeds
frontend/ React SPA (Vite + Tailwind), auth/ticket/user modules, layouts, routes
docs/     Documentation (index, backend, frontend, API)
</pre>

<h2>Build & Deploy</h2>
<ul>
  <li><strong>Frontend build</strong>: <code>cd frontend && npm run build</code> (output in <code>frontend/dist/</code>). Serve via any static host or copy into <code>backend/public</code> if desired.</li>
  <li><strong>Backend runtime</strong>: <code>composer install</code>, configure <code>.env</code>, run migrations/seeds, serve with <code>php artisan serve</code> or PHP-FPM behind a web server.</li>
  <li>Ensure API and SPA share origin or allow cookies (Sanctum uses session cookies).</li>
</ul>
