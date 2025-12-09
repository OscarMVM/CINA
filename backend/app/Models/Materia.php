<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Materia extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'materias';

    protected $fillable = [
        'ingrediente',
        'nombre_cientifico',
        'categoriaId',
        'descripcion',

        'nutrientes',
        'minerales',
        'energia',
        'micotoxinas',
        'otros',
        'notas'
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'categoriaId');
    }
}
