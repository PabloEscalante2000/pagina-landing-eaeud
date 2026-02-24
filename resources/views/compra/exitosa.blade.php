<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Compra exitosa — El Amor es un Delirio</title>
        @vite(['resources/css/app.css'])
    </head>
    <body style="background:#000;color:#f5f0e8;font-family:sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;">
        <div style="max-width:560px;width:100%;text-align:center;padding:2rem;">
            <div style="font-size:4rem;margin-bottom:1rem;">✓</div>
            <h1 style="color:#DAA520;font-size:2rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:1rem;">
                ¡Pago recibido!
            </h1>
            <p style="color:#c8b89a;font-size:1.1rem;line-height:1.7;margin-bottom:2rem;">
                Tu compra de <strong style="color:#DAA520;">El Amor es un Delirio</strong> fue procesada exitosamente.<br>
                En breve recibirás más detalles en tu correo electrónico.
            </p>
            <p style="color:#a89060;font-size:0.9rem;margin-bottom:2rem;">
                Recuerda que tu compra incluye acceso a los dos eventos:<br>
                <span style="color:#DAA520;">Lanzamiento (27 de marzo)</span> y
                <span style="color:#ba4826;">Seminario-Taller (25 de abril)</span>.
            </p>
            <a
                href="{{ url('/') }}"
                style="display:inline-block;padding:0.9rem 2.5rem;background:linear-gradient(135deg,#DAA520,#b8891a);color:#000;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;text-decoration:none;border:2px solid #DAA520;"
            >
                Volver al inicio
            </a>
        </div>
    </body>
</html>
