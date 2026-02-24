<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\MercadoPagoConfig;

class MercadoPagoWebhookController extends Controller
{
    public function handle(Request $request): Response
    {
        $type = $request->input('type') ?? $request->input('topic');

        if ($type !== 'payment') {
            return response('OK', 200);
        }

        $paymentId = $request->input('data.id');

        if (! $paymentId) {
            return response('OK', 200);
        }

        try {
            MercadoPagoConfig::setAccessToken(config('mercadopago.access_token'));

            $client = new PaymentClient;
            $payment = $client->get($paymentId);

            $externalReference = $payment->external_reference;
            $purchase = Purchase::find($externalReference);

            if (! $purchase) {
                return response('OK', 200);
            }

            $estado = match ($payment->status) {
                'approved' => 'completado',
                'rejected' => 'rechazado',
                'cancelled' => 'cancelado',
                default => 'pendiente',
            };

            $purchase->update([
                'estado' => $estado,
                'mp_payment_id' => $paymentId,
            ]);
        } catch (\Throwable $e) {
            Log::error('MercadoPago webhook error', [
                'message' => $e->getMessage(),
                'payment_id' => $paymentId ?? null,
            ]);
        }

        return response('OK', 200);
    }
}
