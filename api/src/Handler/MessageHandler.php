<?php

namespace App\Handler;

use App\Entity\Message;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
class MessageHandler
{
    public function __construct(private HubInterface $hub)
    {

    }
    public function __invoke(Message $message)
    {

        if ($message->getText() == 'error') {

            $update = new Update(
                'https://localhost/message/0',
                json_encode(['status' => "Throw ERROR!!!"])
            );

            $this->hub->publish($update);

            throw new \Exception('Error');
        }

        $update = new Update(
            'https://localhost/message/0',
            json_encode(['status' => "Message [ {$message->getText()} ] was pushed in the queue"])
        );

        $this->hub->publish($update);

        return $message;
    }
}
