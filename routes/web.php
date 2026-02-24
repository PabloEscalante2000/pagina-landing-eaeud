<?php

use App\Http\Controllers\MercadoPagoWebhookController;
use App\Http\Controllers\PurchaseController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/comprar', [PurchaseController::class, 'create'])->name('compra.formulario');
Route::post('/comprar', [PurchaseController::class, 'store'])->name('compra.store');

Route::get('/verificar', [PurchaseController::class, 'verificar'])->name('compra.verificar');
Route::get('/compra/fallida', [PurchaseController::class, 'fallida'])->name('compra.fallida');
Route::get('/compra/pendiente', [PurchaseController::class, 'pendiente'])->name('compra.pendiente');

Route::post('/webhook/mercadopago', [MercadoPagoWebhookController::class, 'handle'])
    ->name('webhook.mercadopago');
