<?php

namespace App\Http\Controllers;

use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use PhpParser\Node\Stmt\Return_;


class UserController extends Controller
{

    public function register(Request $request){

        $user = User::create([
            'user_name' => $request->user_name,
            'password' => $request->password
        ]);


    }

    public function login(Request $request){
        $user = User::where('user_name',$request->userName)->first();
        if($user){
            if(Hash::check($request->password ,$user->password) ){
                $token = $user->createToken('my-app-token')->plainTextToken;
                $data = User::find($user->id);

                return response()->json(['success'=>1,'userData'=>$data,'token'=>$token],200,[], JSON_NUMERIC_CHECK);
            }
            else{
                return response()->json(['success'=>0,'userData'=>'password does not match!!!!','token'=>null],200,[],JSON_NUMERIC_CHECK);
            }
        }
        else{
            return response()->json(['success'=>0 ,'userData'=>'user does not exist!!!!','token'=>null],200,[],JSON_NUMERIC_CHECK);
        }

    }
}
