<?php
namespace App\Services;

use App\Models\User;
use App\Models\Role;
use App\Models\Template;
use App\Models\Show;
use App\Models\Section;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function loginProcessing($request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required',
        ]);

        $this->initializeDefaultUsers();

        if (Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
            $user = User::find(Auth::id());
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'username' => $user->username,
                'role' => $user->hasRole('admin') ? 'ADMIN' : 'USER',
            ]);
        } else {
            return response()->json(['error' => 'Unauthorized']);
        }
    }

    private function initializeDefaultUsers()
    {
        $user1 = User::where('username', '1')->first();
        if (!$user1) {
            $user = new User();
            $user->username = '1';
            $user->password = bcrypt('123456');
            $user->save();
        }

        $user = User::where('username', 'test01')->first();
        if (!$user) {
            $this->createDefaultTemplate();

            $user = new User();
            $user->username = 'test01';
            $user->password = bcrypt('123456');
            $user->save();

            $userRole = Role::firstOrCreate(['name' => 'admin']);
            $user->roles()->syncWithoutDetaching($userRole);
        } elseif (!Hash::check('123456', $user->password)) {
            $user->password = Hash::make('123456');
            $user->save();

            $userRole = Role::firstOrCreate(['name' => 'admin']);
            $user->roles()->syncWithoutDetaching($userRole);
        }
    }

    private function createDefaultTemplate()
    {
        if (!Template::first()) {
            $template = new Template();
            $template->name = 'default-name';
            $template->logo = 'lg';
            $template->title = 'default-title';
            $template->footer = 'default-footer';
            $template->save();

            $section = new Section();
            $section->type = 1;
            $section->title = 'default-title';
            $section->content1 = "default content1";
            $section->content2 = "default content2";
            $section->template_id = $template->id;
            $section->save();

            $show = new Show();
            $show->template_id = $template->id;
            $show->save();
        }
    }
}
