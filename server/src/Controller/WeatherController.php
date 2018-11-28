<?php
namespace App\Controller;

use App\Service\Weather;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

class WeatherController extends Controller
{
    /**
     * @Route("/weather", name="weather")
     */
    public function index()
    {
        $weather = $this->get(Weather::class);
        $result = $weather->getWeather();

        return $this->json($result);
    }
}
