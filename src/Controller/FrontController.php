<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FrontController extends AbstractController
{
    #[Route('/{reactRoute}', name: 'app_home', requirements:['reactRoute'=>"^(?!api).+"], defaults:["reactRoute"=>null])]
    public function index(): Response
    {
        return $this->render('main/index.html.twig', ['title' => 'Blog Book']);
    }
}
