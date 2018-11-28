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
    const CALENDARS = [
        'hisashi@sunvisor.net',
        'kiyoho@sunvisor.net',
        'kensuke@sunvisor.net',
        'sunvisor.net_mong9e5bn6vgq1n30v2sa7m038@group.calendar.google.com',
        'ja.japanese#holiday@group.v.calendar.google.com',
    ];

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
        foreach (self::CALENDARS as $key => $calendar) {
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
        foreach (self::CALENDARS as $key => $calendar) {
            $result = array_merge($result, $weather->getCalendar($calendar, $s, $e, $key));
        }
        usort($result, function ($a, $b) {
            $dateA = $a['startDate'] ?? $a['startTime'];
            $dateB = $b['startDate'] ?? $b['startTime'];
            return $dateA > $dateB;
        });

        return $this->json($result);

    }
}