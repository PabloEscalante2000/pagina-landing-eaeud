<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Pago no completado — El Amor es un Delirio</title>
        @vite(['resources/css/app.css'])
    </head>
    <body style="background:#000;color:#f5f0e8;font-family:sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;">
        <div style="max-width:560px;width:100%;text-align:center;padding:2rem;">
            <div style="font-size:4rem;margin-bottom:1rem;">✕</div>
            <h1 style="color:#ba4826;font-size:2rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:1rem;">
                Pago no completado
            </h1>
            <p style="color:#c8b89a;font-size:1.1rem;line-height:1.7;margin-bottom:2rem;">
                Hubo un problema al procesar tu pago. Puedes intentarlo nuevamente.
            </p>
            <a
                href="{{ route('compra.formulario') }}"
                style="display:inline-block;padding:0.9rem 2.5rem;background:linear-gradient(135deg,#ba4826,#8a3318);color:#fff;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;text-decoration:none;border:2px solid #DAA520;margin-right:1rem;"
            >
                Intentar de nuevo
            </a>
            <a
                href="{{ url('/') }}"
                style="display:inline-block;padding:0.9rem 2.5rem;color:#DAA520;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;text-decoration:none;border:2px solid rgba(218,165,32,0.4);"
            >
                Volver al inicio
            </a>
        </div>
    </body>
</html>
