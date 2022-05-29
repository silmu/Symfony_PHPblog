<?php

namespace App\Controller;

use App\Entity\Posts;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_main')]
class BackendController extends AbstractController
{
    #[Route('/account/{username}', name: 'app_account', methods:['GET'])]
    public function index(string $username, EntityManagerInterface $em): Response
    {
        $users = $em->getRepository(Users::class)->findAll();
        $id = '';
        foreach($users as $user){
            if($user->getUsername() == $username){
                $id = $user->getId();
            } 
        }
        $posts = $em->getRepository(Posts::class)->findAll();
        $data[] = ['user_id' => $id];
        foreach($posts as $post){
            if($post->getUserId() == $id){
                $data[] = [
                    'id' => $post->getId(),
                    'user_id' => $post->getUserId(),
                    'title' => $post->getTitle(),
                    'created_at' => $post->getCreatedAt(),
                    'content' => $post->getContent(),
                    'image' => $post->getImage(),
                ];
            }
            
        }
        return $this->json($data);
    }

    #[Route('/account', name: 'create_post', methods:['POST'])]
    public function new(Request $request, ManagerRegistry $doctrine): Response
    {
        $em = $doctrine->getManager();
        $newPost = new Posts();
        $newPost->setUserId(intval($request->request->get('user_id')));
        $newPost->setTitle($request->request->get('title'));
        $newPost->setContent($request->request->get('content'));
        $newPost->setCreatedAt($newPost->getCreatedAt());
        $newPost->setImage($request->request->get('image'));
        $em->persist($newPost);
        $em->flush();

        return $this->json('Created new post successfully with id ' .$newPost->getId());
    }

    #[Route('/account/{id}', name: 'update_post', methods:['PUT', 'PATCH'])]
    public function update(Request $request, int $id, ManagerRegistry $doctrine): Response
    {
        $em = $doctrine->getManager();
        $post = $em->getRepository(Posts::class)->find($id);
        if(!$post){
            return $this->json('No post found for id ' . $id , 404);
        }
        $content = json_decode($request->getContent());
        $post->setTitle($content->title);
        $post->setContent($content->content);
        $post->setCreatedAt($post->getCreatedAt());
        $em->flush();

        $data[] = [
            'id' => $post->getId(),
            'user_id' => $post->getUserId(),
            'title' => $post->getTitle(),
            'created_at' => $post->getCreatedAt(),
            'content' => $post->getContent(),
        ];

        return $this->json($data);
    }

    #[Route('/account/{id}', name: 'delete_post', methods:['DELETE'])]
    public function delete(Request $request, int $id, ManagerRegistry $doctrine): Response
    {
        $em = $doctrine->getManager();
        $postToDelete = $em->getRepository(Posts::class)->find($id);
        if(!$postToDelete){
            return $this->json('No project found for id ' . $id, 404);
        }
        $em->remove($postToDelete);
        $em->flush();

        return $this->json('Deleted a post successfully with id ' . $id);
    }

    #[Route('/login_check', name: 'login_check', methods:['POST'])]
    public function login(Request $request, ManagerRegistry $doctrine): Response
    {
        $em = $doctrine->getManager();
        //Get username and password input
        $username = ($request->request->get('username'));
        $password = ($request->request->get('password'));
        //Get all users from the database
        $users = $em->getRepository(Users::class)->findAll();
        foreach($users as $user){
            //Find matching username by username
            if($user->getUsername() == $username){
                //Get password of the matched username
                if($user->getPassword() == $password){
                    return $this->json('Logged in successfully');
                } else {
                    return $this->json('Password is incorrect', 403);
                }
            } 
            
        }
        return $this->json("No username found", 404);
        
    }

    #[Route('/register', name:'register', methods:['POST'])]
    public function register(Request $request, ManagerRegistry $doctrine): Response
    {
        $em = $doctrine->getManager();
        //Get username and password input
        $username = ($request->request->get('username'));
        $password = ($request->request->get('password'));
        //Get all users from the database
        $users = $em->getRepository(Users::class)->findAll();
        foreach($users as $user){
            //Find if username already exists
            if($user->getUsername() == $username){
                return $this->json('Username already exists', 403);
            }
        }
        //Create new user
        $newUser = new Users();
        $newUser->setUsername(trim($request->request->get('username')));
        //Password encryption
        $regpassword = (trim($request->request->get('password')));
        $regpassword = password_hash($regpassword, PASSWORD_BCRYPT);

        $newUser->setPassword($regpassword);
        $em->persist($newUser);
        $em->flush();

        return $this->json('Created new user successfully with id ' .$newUser->getId());
    }
}
