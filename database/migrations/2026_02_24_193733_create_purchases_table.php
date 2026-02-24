<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('purchases', function (Blueprint $table): void {
            $table->id();
            $table->string('nombre');
            $table->string('email');
            $table->string('telefono');
            $table->enum('estado', ['pendiente', 'completado', 'rechazado', 'cancelado'])->default('pendiente');
            $table->string('mp_preference_id')->nullable();
            $table->string('mp_payment_id')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('purchases');
    }
};
