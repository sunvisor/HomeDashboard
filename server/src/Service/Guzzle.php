<?php
/**
 * User: sunvisor
 * Date: 2018-11-26
 * Time: 08:55
 * Copyright (C) Sunvisor Lab.
 */

namespace App\Service;


use GuzzleHttp\Client;

/**
 * Class Guzzle
 *
 * Guzzle のラッパーサービス
 *
 * @package App\Service
 */
class Guzzle
{
    /**
     * @var Client
     */
    private $client;

    /**
     * Guzzle constructor.
     */
    public function __construct()
    {
        $this->client = new Client();
    }

    public function get($uri, $params)
    {
        return $this->client->get($uri, $params);
    }
}