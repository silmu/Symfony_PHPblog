<?php

namespace App\Controller;

use App\Entity\Posts;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
            ];
        }
        return $this->json($data);
    }
}
