<?php
/**
 * User: sunvisor
 * Date: 2018-11-26
 * Time: 08:49
 * Copyright (C) Sunvisor Lab.
 */

namespace App\Service;


use Cake\Chronos\Chronos;

class Weather
{
    const CONFIG_PATH = __DIR__ . '/../../secret/weather.json';
    const TIME_ZONE = 'Asia/Tokyo';

    /**
     * @var Guzzle
     */
    private $guzzle;

    /**
     * Weather constructor.
     * @param Guzzle $guzzle
     */
    public function __construct(Guzzle $guzzle)
    {
        $this->guzzle = $guzzle;
    }

    public function getWeather()
    {
        list ($appId, $lat, $long) = $this->getApiParameter();
        $uri = "https://api.darksky.net/forecast/{$appId}/{$lat},{$long}";

        $response = $this->guzzle->get($uri, [
            'query' => [
                'lang'  => 'ja',
                'units' => 'auto'
            ]
        ]);

        $result = $response->getBody()->getContents();
        $rawData = json_decode($result, true);

        return $this->convertWeather($rawData);
    }

    private function getApiParameter()
    {
        $json = file_get_contents(self::CONFIG_PATH);
        $data = json_decode($json, true);

        return [$data['appId'], $data['lat'], $data['long']];
    }

    private function convertWeather($rawData)
    {
        return [
            'currently' => $this->currentlyWeather($rawData['currently']),
            'hourly'    => $this->hourlyWeather($rawData['hourly']),
            'daily'     => $this->dailyWeather($rawData['daily']),
        ];
    }

    private function iconUrl($iconId)
    {
        return "https://darksky.net/images/weather-icons/{$iconId}.png";
    }

    private function currentlyWeather($data)
    {
        return [
            'time'              => Chronos::createFromTimestamp($data['time'], self::TIME_ZONE)->format('Y-m-d'),
            'summary'           => $data['summary'],
            'icon'              => $this->iconUrl($data['icon']),
            'temperature'       => round($data['temperature'], 1),
            'precipIntensity'   => round($data['precipIntensity'], 2),
            'precipProbability' => $this->percent($data['precipProbability']),
            'pressure'          => round($data['pressure']),
            'windSpeed'         => $data['windSpeed'],
        ];
    }

    private function hourlyWeather($data)
    {
        $hourlyData = array_map(function ($item) {
            return [
                'time'              => Chronos::createFromTimestamp($item['time'], self::TIME_ZONE)->format('Y-m-d H:i:s'),
                'summary'           => $item['summary'],
                'icon'              => $this->iconUrl($item['icon']),
                'temperature'       => round($item['temperature'], 1),
                'precipIntensity'   => round($item['precipIntensity'], 2),
                'precipProbability' => $this->percent($item['precipProbability']),
                'windSpeed'         => $item['windSpeed'],
            ];
        }, $data['data']);

        return [
            'summary' => $data['summary'],
            'icon'    => $this->iconUrl($data['icon']),
            'data'    => $hourlyData,
        ];
    }

    private function dailyWeather($data)
    {
        $dailyData = array_map(function ($item) {
            return [
                'time'                => Chronos::createFromTimestamp($item['time'], self::TIME_ZONE),
                'summary'             => $item['summary'],
                'icon'                => $this->iconUrl($item['icon']),
                'temperatureHigh'     => round($item['temperatureHigh'], 1),
                'temperatureHighTime' => Chronos::createFromTimestamp($item['temperatureHighTime'], self::TIME_ZONE)->format('Y-m-d H:i:s'),
                'temperatureLow'      => round($item['temperatureLow'], 1),
                'temperatureLowTime'  => Chronos::createFromTimestamp($item['temperatureLowTime'], self::TIME_ZONE)->format('Y-m-d H:i:s'),
                'precipIntensity'     => round($item['precipIntensity'], 2),
                'precipProbability'   => $this->percent($item['precipProbability']),
                'windSpeed'           => $item['windSpeed'],
            ];
        }, $data['data']);
        return [
            'summary' => $data['summary'],
            'icon'    => $this->iconUrl($data['icon']),
            'data'    => $dailyData,
        ];
    }

    private function percent($value)
    {
        return round($value * 100, 0);
    }
}
