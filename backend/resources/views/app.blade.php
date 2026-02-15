<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <title>{{ config('app.name') }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="{{ asset('css/main.css') }}">
</head>
<body>
<div id="root"></div>

<script src="{{ asset('js/main.js') }}"></script>
</body>
</html>
