<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    protected $fillable = [
        'nombre',
        'email',
        'telefono',
        'estado',
        'mp_preference_id',
        'mp_payment_id',
    ];

    protected function casts(): array
    {
        return [
            'estado' => 'string',
        ];
    }
}
