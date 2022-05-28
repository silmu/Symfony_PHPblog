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
    #[Route('/account', name: 'app_account', methods:['GET'])]
    public function index(EntityManagerInterface $em): Response
    {
        $posts = $em->getRepository(Posts::class)->findAll();
        $data = [];
        foreach($posts as $post){
            $data[] = [
                'id' => $post->getId(),
                'user_id' => $post->getUserId(),
                'title' => $post->getTitle(),
                'created_at' => $post->getCreatedAt(),
                'content' => $post->getContent(),
                'image' => $post->getImage(),
            ];
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
            } else {
                return $this->json('No username found', 404);
            }
        }
        
    }
}
