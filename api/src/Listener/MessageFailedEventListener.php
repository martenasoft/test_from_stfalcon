<?php

namespace App\Listener;

use Psr\Log\LoggerInterface;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Messenger\Event\WorkerMessageFailedEvent;
use Symfony\Component\Messenger\Exception\HandlerFailedException;
use Symfony\Component\Messenger\Stamp\RedeliveryStamp;

#[AsEventListener(event: WorkerMessageFailedEvent::class, method: 'onFailedEvent')]
class MessageFailedEventListener
{
    public function __construct(
        private HubInterface    $hub,
        private LoggerInterface $logger
    )
    {

    }

    public function onFailedEvent(WorkerMessageFailedEvent $event)
    {

        $retryCount = 2 - RedeliveryStamp::getRetryCountFromEnvelope($event->getEnvelope());

        if ($retryCount > 0) {

            $update = new Update(
                'https://localhost/message/0',
                json_encode(['status' => "The Error message was caught. It will retry $retryCount times"])
            );

            $this->hub->publish($update);

        } else {
            $this->logger->error("Error Message!!", [
                "message" => $event->getEnvelope()->getMessage()->getText()
            ]);

            $update = new Update(
                'https://localhost/message/0',
                json_encode(['status' => "The Error message was caught and saved to log."])
            );

            $this->hub->publish($update);
        }
    }
}
