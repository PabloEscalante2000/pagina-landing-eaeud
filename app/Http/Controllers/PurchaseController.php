<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;

class PurchaseController extends Controller
{
    public function create(): View
    {
        return view('compra.formulario');
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'telefono' => ['required', 'string', 'max:30'],
        ]);

        $purchase = Purchase::create([
            'nombre' => $validated['nombre'],
            'email' => $validated['email'],
            'telefono' => $validated['telefono'],
            'estado' => 'pendiente',
        ]);

        MercadoPagoConfig::setAccessToken(config('mercadopago.access_token'));

        $client = new PreferenceClient;

        $mpAppUrl = rtrim(config('mercadopago.app_url'), '/');

        $preference = $client->create([
            'items' => [
                [
                    'title' => 'El Amor es un Delirio — César Escalante',
                    'quantity' => 1,
                    'unit_price' => 200.00,
                    'currency_id' => 'PEN',
                ],
            ],
            'payer' => [
                'name' => $purchase->nombre,
                'email' => $purchase->email,
                'phone' => ['number' => $purchase->telefono],
            ],
            'back_urls' => [
                'success' => $mpAppUrl.'/verificar',
                'failure' => $mpAppUrl.'/compra/fallida',
                'pending' => $mpAppUrl.'/compra/pendiente',
            ],
            'external_reference' => (string) $purchase->id,
            'notification_url' => $mpAppUrl.'/webhook/mercadopago',
        ]);

        $purchase->update(['mp_preference_id' => $preference->id]);

        $checkoutUrl = app()->isProduction()
            ? $preference->init_point
            : $preference->sandbox_init_point;

        return response()->json([
            'checkout_url' => $checkoutUrl,
        ]);
    }

    public function verificar(Request $request): View|RedirectResponse
    {
        $externalReference = $request->query('external_reference');
        $paymentId = $request->query('payment_id');
        $status = $request->query('status');

        if ($externalReference) {
            $purchase = Purchase::find($externalReference);

            if ($purchase) {
                $estado = match ($status) {
                    'approved' => 'completado',
                    'rejected' => 'rechazado',
                    'pending', 'in_process' => 'pendiente',
                    default => $purchase->estado,
                };

                $purchase->update([
                    'estado' => $estado,
                    'mp_payment_id' => $paymentId ?? $purchase->mp_payment_id,
                ]);

                if ($estado === 'rechazado') {
                    return redirect('/compra/fallida');
                }

                if ($estado === 'pendiente') {
                    return redirect('/compra/pendiente');
                }
            }
        }

        return view('compra.exitosa');
    }

    public function fallida(): View
    {
        return view('compra.fallida');
    }

    public function pendiente(): View
    {
        return view('compra.pendiente');
    }
}
