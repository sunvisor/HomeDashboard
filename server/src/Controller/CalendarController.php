<?php
/**
 * User: sunvisor
 * Date: 2018-11-26
 * Time: 12:41
 * Copyright (C) Sunvisor Lab.
 */

namespace App\Controller;


use App\Service\Calendar;
use Cake\Chronos\Chronos;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

class CalendarController extends Controller
{
    const CONFIG_PATH = __DIR__ . '/../../secret/my_calendar.json';

    /**
     * @Route("/calendar", name="calendar")
     */
    public function index()
    {
        $weather = $this->get(Calendar::class);
        $now = Chronos::now();
        $s = $now->setTime(0, 0);
        $e = $s->addDay();
        $result = [];
        $calendars = $this->getCaledars();
        foreach ($calendars as $key => $calendar) {
            $result = array_merge($result, $weather->getCalendar($calendar, $s, $e, $key));
        }
        usort($result, function ($a, $b) {
            $dateA = $a['startDate'] ?? $a['startTime'];
            $dateB = $b['startDate'] ?? $b['startTime'];
            return $dateA > $dateB;
        });

        return $this->json($result);
    }

    /**
     * @Route("/calendar/{year}/{month}/{day}", name="calendar_with_date")
     * @param $year
     * @param $month
     * @param $day
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function withDate($year, $month, $day)
    {
        $weather = $this->get(Calendar::class);
        $now = Chronos::createFromDate($year, $month, $day);
        $s = $now->setTime(0, 0);
        $e = $s->addDay();
        $result = [];
        $calendars = $this->getCaledars();
        foreach ($calendars as $key => $calendar) {
            $result = array_merge($result, $weather->getCalendar($calendar, $s, $e, $key));
        }
        usort($result, function ($a, $b) {
            $dateA = $a['startDate'] ?? $a['startTime'];
            $dateB = $b['startDate'] ?? $b['startTime'];
            return $dateA > $dateB;
        });

        return $this->json($result);

    }

    /**
     * @return false|mixed|string
     */
    protected function getCaledars()
    {
        $calendars = file_get_contents(self::CONFIG_PATH);
        $calendars = json_decode($calendars, true);
        return $calendars;
    }
}