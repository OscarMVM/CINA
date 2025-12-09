<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class Categoria extends Model
{
    protected $connection = 'mongodb';       // nombre de la conexión en config/database.php
    protected $collection = 'categorias';    // nombre de la colección

    protected $fillable = [
        'slug',
        'nombre',
    ];

    public function materias()
    {
        return $this->hasMany(MateriaPrima::class, 'categoriaId');
    }
}
