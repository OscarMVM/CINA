<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MateriaController;

// API Routes
Route::apiResource('/materias', MateriaController::class);