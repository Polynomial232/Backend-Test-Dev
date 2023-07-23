<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OwnerContact
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        $contact = Contact::findOrFail($request->id);

        if($contact->user_id != $user->id)
        {
            return response()->json([
                "message" => 'Data Not Found', 404
            ]);
        }

        return $next($request);
    }
}
