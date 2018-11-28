<?php
/**
 * User: sunvisor
 * Date: 2018-11-26
 * Time: 12:42
 * Copyright (C) Sunvisor Lab.
 */

namespace App\Service;


use Google_Client;
use Google_Service_Calendar;

class Calendar
{
    const CREDENTIALS_PATH = __DIR__ . '/../../secret/calendar.json';
    const CLIENT_SECRET_PATH = __DIR__ . '/../../secret/client_secret.json';
    /**
     * @var Google_Client
     */
    private $client;

    public function __construct()
    {
        $this->client = $this->getClient();
    }

    public function getCalendar($calendarId, \DateTimeImmutable $startDay, \DateTimeImmutable $endDay, $key)
    {
        $calendar = new Google_Service_Calendar($this->client);
        $optParams = [
            'maxResults' => 100,
            'singleEvents' => TRUE,
            'timeMin'    => $startDay->format('c'),
            'timeMax'    => $endDay->format('c')
        ];
        $results = $calendar->events->listEvents($calendarId, $optParams);

        $ret = [];
        foreach ($results->getItems() as $event) {
            $summary = $event->getSummary();
            //echo "<pre>\n";var_export($event);echo "</pre>";
            $ret[] = [
                'startDate'  => $event->start->date,
                'startTime'  => $event->start->dateTime,
                'endDate'    => $event->end->date,
                'endTime'    => $event->end->dateTime,
                'summary'    => $summary,
                'calendarId' => $key,
            ];
        }

        return $ret;
    }

    /**
     * Returns an authorized API client.
     * @return Google_Client the authorized client object
     * @throws \Google_Exception
     */
    private function getClient()
    {
        $client = new Google_Client();
        $client->setApplicationName('my calendar');
        $client->setScopes([Google_Service_Calendar::CALENDAR_READONLY]);
        $client->setAuthConfig(self::CLIENT_SECRET_PATH);
        $client->setAccessType('offline');

        // Load previously authorized credentials from a file.
        $credentialsPath = self::CREDENTIALS_PATH;
        if (file_exists($credentialsPath)) {
            $accessToken = json_decode(file_get_contents($credentialsPath), true);
        } else {
            // Request authorization from the user.
            $authUrl = $client->createAuthUrl();
            printf("Open the following link in your browser:\n%s\n", $authUrl);
            print 'Enter verification code: ';
            $authCode = trim(fgets(STDIN));

            // Exchange authorization code for an access token.
            $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);

            // Store the credentials to disk.
            if (!file_exists(dirname($credentialsPath))) {
                mkdir(dirname($credentialsPath), 0700, true);
            }
            file_put_contents($credentialsPath, json_encode($accessToken));
            printf("Credentials saved to %s\n", $credentialsPath);
        }
        $client->setAccessToken($accessToken);

        // Refresh the token if it's expired.
        if ($client->isAccessTokenExpired()) {
            $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
            file_put_contents($credentialsPath, json_encode($client->getAccessToken()));
        }

        return $client;
    }

}