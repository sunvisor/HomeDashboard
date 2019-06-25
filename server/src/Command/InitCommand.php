<?php

namespace App\Command;

use App\Service\Calendar;
use Google_Exception;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class InitCommand extends Command
{
    protected static $defaultName = 'app:init';
    /**
     * @var Calendar
     */
    private $calendar;

    /**
     * InitCommand constructor.
     * @param Calendar $calendar
     */
    public function __construct(Calendar $calendar)
    {
        parent::__construct();
        $this->calendar = $calendar;
    }


    protected function configure()
    {
        $this
            ->setDescription('Create calendar.json');
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $io = new SymfonyStyle($input, $output);
        try {
            $this->calendar->getClient();
        } catch (Google_Exception $e) {
            $io->error($e->getMessage());
        }

        $io->success('Done.');
    }
}
