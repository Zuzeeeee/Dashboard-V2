<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchUserRequest;
use App\Models\Card;
use App\Http\Requests\StoreCardRequest;
use App\Http\Requests\UpdateCardRequest;
use App\Models\User;

class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCardRequest $request)
    {
        $data = $request->all();
        $user = Card::create($data);
        return response()->json(['data' => $user, 'message' => "User created successfully"], 202);
    }

    /**
     * Display the specified resource.
     */
    public function show(SearchUserRequest $id)
    {
        $card = User::find($id)->cards()->get();
        return response()->json(['data' => $card, 'message' => "Cards retrieved successfully"], 202);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Card $card)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCardRequest $request, Card $card)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Card::destroy($id);
        return response()->json(['data' => null, 'message' => "Card deleted successfully"], 202);
    }
}
