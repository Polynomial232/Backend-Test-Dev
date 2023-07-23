<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Resources\ContactResource;
use App\Http\Resources\ContactDetailResource;

class ContactController extends Controller
{
    public function index(Request $request){
        // $contact = Contact::where('user_id', Auth::user()->id)->get();
        $contact = Contact::where('user_id', Auth::user()->id);

        if($request->email){
            $contact = $contact->where('email', 'LIKE', '%'.$request->email.'%');
        }

        if($request->nama){
            $contact = $contact->where('nama', 'LIKE', '%'.$request->nama.'%');
        }

        return ContactResource::collection($contact->get());
    }

    public function findById($id){
        $contact = Contact::findOrFail($id);
        return new ContactDetailResource($contact);
        
    }

    public function create(Request $request)
    {
        $request->validate([
            "nama" => "required",
            "email" => "required|email",
            "nomor" => "required"
        ]);

        $request['user_id'] = Auth::user()->id;
        $contact = Contact::create($request->all());
        return new ContactDetailResource($contact);
    }

    public function delete($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();
        
        return new ContactDetailResource($contact);
    }
    
    public function update(Request $request, $id)
    {
        $request->validate([
            "nama" => "required",
            "email" => "required|email",
            "nomor" => "required"
        ]);

        $contact = Contact::findOrFail($id);
        $contact->update($request->all());
        return new ContactDetailResource($contact);
    }
}
