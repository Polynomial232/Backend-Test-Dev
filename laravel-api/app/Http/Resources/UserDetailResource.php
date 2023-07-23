<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserDetailResource extends JsonResource
{
    public function toArray($request)
    {
        // return [
        //     'id' => $this->id,
        //     'username' => $this->username,
        //     'email' => $this->email,
        //     'created_at' => date_format($this->created_at, "d-m-Y")
        // ];

        return parent::toArray($request);
    }
}
