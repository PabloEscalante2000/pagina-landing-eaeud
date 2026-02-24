<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Comprar — El Amor es un Delirio</title>
        <meta name="description" content="Adquiere el libro El Amor es un Delirio de César Escalante.">
        @vite(['resources/css/app.css', 'resources/js/purchase.jsx'])
    </head>
    <body>
        <div id="purchase-app" data-store-url="{{ route('compra.store') }}" data-landing-url="{{ url('/') }}"></div>
    </body>
</html>
