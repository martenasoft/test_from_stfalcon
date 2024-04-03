## Встанвлюємо


Клонуємо репозиторий
```shell
# git clone https://github.com/martenasoft/test_from_stfalcon.git
```
Запускаем сборку (версія докеру неважлива)
```shell
# make build
```


Запускаем Docker
```shell
# make up
```

В браузері відкриває посилання
https://localhost

Запускаем черги
```shell
# make message
```

Повинні побачити сторінку Api platform
## Запускаємо

1. Тиснемо на посилання з написом "SEND MESSAGE (TASK 1)"
2. У prompt вікні пишемо слово error. Повинні побачити спливаючі повідомлення про стан виконання сповіщення у черги. Тут сформуєтьсф виключення та відправиться на обробку. Також можна ввести будь який інший текст. В такому разі виключення не сформуются.

## Workflow

Із pwa передается post запит на сутність App\Entity\Message
Сутність передає дані у чергу (використовуються RabbitMQ)
Дані обробляются у App\Handler\MessageHandler
Як що у pwa було введено слово error - формуєтся виключення.
Symfony messenger, у разі помилки у повідомлення, намагається зробити retry (кількисть повторі встановлюєтся в конфиг-файлі config/packages/messenger.yaml, параметр max_retries: 2), після чого черга буде збережена у таблиці messenger_messages PostgreSql

## Використовувались технології:
* Вебсервер Caddy
* База даних PostgreSql
* Брокери повідомлень RabbitMq, Mercure
* NextJs, ReactAdmin

