<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use App\Models\Show;
use App\Models\Section;
use App\Models\Template;
use App\Services\ProductService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function LoginProcessing(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            //'password' => 'required|string|min:8|regex:/[A-Z]/|regex:/[0-9]/',
            'password' => 'required',
        ]);

        $user1 = User::where('username', '1')->first();
        if (!$user1) {
            $user = new User();
            $user->username = '1';
            $user->password = bcrypt('123456');
            $user->save();
        }
        
        $user = User::where('username', 'test01')->first();
        if (!$user) {

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
            $user = new User();
            $user->username = 'test01';
            $user->password = bcrypt('123456');
            $user->save();


            $userRole = Role::where('name', 'admin')->first();
            if (!$userRole) {
                $userRole = new Role();
                $userRole->name = 'admin';
                $userRole->save();
            }
            $user->roles()->syncWithoutDetaching($userRole);

        } elseif (!Hash::check('123456', $user->password)) {
            $user->password = Hash::make('123456');
            $user->save();
            $userRole = Role::where('name', 'admin')->first();
            if (!$userRole) {
                $userRole = new Role();
                $userRole->name = 'admin';
                $userRole->save();
            }
            $user->roles()->syncWithoutDetaching($userRole);
        }

        if (auth::attempt(['username' => $request->username, 'password' => $request->password])) {
            $user = User::find(auth::id());
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
    public function AddTemplate(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'title' => 'required|string',
            'footer' => 'required|string',
            'logo' => 'required|max:3',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $template = new Template();
        $template->name = $request->name;
        $template->logo = $request->logo;
        $template->title = $request->title;
        $template->footer = $request->footer;
        $template->save();

        $section = new Section();
        $section->type = 1;
        $section->title = 'default-title';
        $section->content1 = "default content1";
        $section->content2 = "default content2";
        $section->template_id = $template->id;
        $section->save();
        return $template;
    }
    public function EditTemplate(Request $request, Template $template)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'title' => 'required|string',
            'footer' => 'required|string',
            'logo' => 'required|max:3',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $template->name = $request->name;
        $template->logo = $request->logo;
        $template->title = $request->title;
        $template->footer = $request->footer;
        $template->save();
        return $template;
    }
    public function DeleteTemplate(Template $template)
    {
        $temp = Template::where('id', Show::first()->template_id)->first();
        if ($template->id === $temp->id)
            return response()->json(['message' => 'Cannot delete the chosen template']);
        $template->delete();
        return response()->json(['message' => 'Template deleted successfully']);
    }
    public function Show()
    {
        $temp = Template::where('id', Show::first()->template_id)->first();
        $query = Section::where('template_id', $temp->id)->get()->map(function ($section) {
            if ($section->type == 1) {
                $section->content1 = $section->content1 . " " . $section->content2;
                return [
                    'title' => $section->title,
                    'content' => $section->content1,
                ];
            } else if ($section->type == 2) {
                return [
                    'title' => $section->title,
                    'content1' => $section->content1,
                    'content2' => $section->content2,
                ];
            }

        });
        return response()->json([
            'logo' => $temp->logo,
            'title' => $temp->title,
            'footer' => $temp->footer,
            'section' => $query,
        ]);
    }
    public function GetTemplate(Template $template)
    {
        $query = Section::where('template_id', $template->id)->get()->map(function ($section) {
            if ($section->type == 1) {
                $section->content1 = $section->content1 . " " . $section->content2;
                return [
                    'title' => $section->title,
                    'content' => $section->content1,
                ];
            } else if ($section->type == 2) {
                return [
                    'title' => $section->title,
                    'content1' => $section->content1,
                    'content2' => $section->content2,
                ];
            }

        });
        return response()->json([
            'logo' => $template->logo,
            'title' => $template->title,
            'footer' => $template->footer,
            'section' => $query,
        ]);
    }

    public function GetAllTemplate()
    {
        $user = Auth::user();
        return response()->json([
            'username' => $user->username,
            'templates' => Template::all(),
        ]);
    }
    public function ChangeTemplate(Template $template){
        $show = Show::first();
        $show->template_id = $template->id;
        $show->save();
        return response()->json(['message' => 'Template change successfully']);
    }
}
