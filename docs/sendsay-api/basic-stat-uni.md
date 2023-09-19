---
sidebar_position: 3
sidebar_label: 'Как получить статистику'
---

import login from '/img/sendsay-api/basic-stat-uni/login.png';

# Как получить статистику через API

[Sendsay API](https://sendsay.ru/api/api.html) позволяет получить статистику о результатах доставки отправленных выпусков. Это реализуется через [возвращаемые значения](https://sendsay.ru/api/api.html#Возвращаемое-значение).

## Отправка через API-консоль в Sendsay

Для тестирования воспользуемся сервисом Webhook.site:

1. Перейдите на&nbsp;[Webhook.site](https://webhook.site/) и&nbsp;скопируйте URL для возвращаемых значений:

   ![Unique url](/img/sendsay-api/basic-stat-uni/unique-url.png)

2. В&nbsp;Sendsay перейдите в&nbsp;раздел [**API &rarr; API-консоль**](https://app.sendsay.ru/api/console) и&nbsp;вставьте запрос:
   <!-- prettier-ignore -->
    ```js
   {
       "action": "stat.uni",
       "select": [
           "issue.id",
           "issue.name"
       ],
       "result": [
           {
               "type": "url_file",
               "to": "ВАШ URL ДЛЯ ВОЗВРАЩАЕМЫХ ЗНАЧЕНИЙ (КОЛЛБЭКОВ)",
               "format": "json"
           }
       ]
   }
   ```

   где `ВАШ URL ДЛЯ ВОЗВРАЩАЕМЫХ ЗНАЧЕНИЙ (КОЛЛБЭКОВ)` &mdash; скопированный ранее URL для возвращаемых значений.

3. Нажмите &laquo;Выполнить&raquo; и&nbsp;посмотрите результат на&nbsp;Webhook.site. Примерный результат должен выглядеть так:

   ![Request details](/img/sendsay-api/basic-stat-uni/request-details.png)

   Нажмите на&nbsp;ссылку &laquo;Download&raquo;, чтобы скачать JSON-архив с&nbsp;данными статистики.

## Отправка через Postman

Протестируйте отправку запроса через [Postman](https://www.postman.com/). Для этого вам потребуется уникальный API-ключ.

[Как получить API-ключ](https://docs.sendsay.ru/sendsay-api/how-to-get-apikey)

1. Переходите в&nbsp;[Postman](https://www.postman.com/) и&nbsp;авторизуйтесь, либо зарегистрируйте новый аккаунт. Затем перейдите в&nbsp;раздел **My&nbsp;Workspace**, нажмите &laquo;New&raquo; и&nbsp;выберите **HTTP**&nbsp;&mdash; чтобы создать новый HTTP-запрос.

   ![Postman](/img/sendsay-api/basic-stat-uni/postman.gif)

2. В&nbsp;параметрах запроса выберите метод POST. Затем выберите вкладку **body** и&nbsp;укажите `raw`, в&nbsp;раскрывающемся меню выберите `JSON`.

   ![Postman](/img/sendsay-api/basic-stat-uni/postman1.gif)

3. В&nbsp;поле URL вставьте `https://api.sendsay.ru/general/api/v100/json/Ваш_логин_Sendsay`. Вместо `Ваш_логин_Sendsay` необходимо добавить ваш логин, его можно скопировать в&nbsp;меню аккаунта:

<p align="center">
  <img width="40%" src={login} alt="Login" />
</p>

4. В&nbsp;поле ниже вставьте запрос:
   <!-- prettier-ignore -->
    ```js
   {
       "apikey": "ВАШ API КЛЮЧ",
       "action": "stat.uni",
       "select": [
           "issue.id",
           "issue.name"
       ],
       "result": [
           {
               "type": "url_file",
               "to": "ВАШ URL ДЛЯ ВОЗВРАЩАЕМЫХ ЗНАЧЕНИЙ (КОЛЛБЭКОВ)",
               "format": "json"
           }
       ]
   }
   ```

   где `ВАШ API КЛЮЧ` &mdash; ваш API-ключ, сгенерированный в&nbsp;п.4; `ВАШ URL ДЛЯ ВОЗВРАЩАЕМЫХ ЗНАЧЕНИЙ (КОЛЛБЭКОВ)` &mdash; URL, скопированный в&nbsp;п.1.

   ![Postman](/img/sendsay-api/basic-stat-uni/postman2.png)

   Затем нажмите &laquo;Send&raquo;.

   После отправки запроса должен прийти похожий ответ:

   ![Postman](/img/sendsay-api/basic-stat-uni/postman3.png)

   А&nbsp;на&nbsp;[Webhook.site](https://webhook.site/) вы&nbsp;получите JSON-файл со&nbsp;статистикой:

   ![Webhook-site](/img/sendsay-api/basic-stat-uni/webhook-site1.png)

   Это значит, что запрос выполнился успешно&nbsp;&mdash; и&nbsp;теперь вы&nbsp;можете получать данные статистики.

## Базовые представления о получении статистики через stat.uni

[Универсальная статистика](https://sendsay.ru/api/api.html#Универсальная-статистика) позволяет получить информацию про переходы, открытия писем, тиражи выпусков и&nbsp;результаты доставки выпусков рассылок. Все представленные ниже примеры вы&nbsp;можете проверить самостоятельно в&nbsp;API-консоли, при необходимости изменив под ваши конкретные нужды.

### Статистика по выпуску

Статистика по&nbsp;выпуску, которую вы&nbsp;видите в&nbsp;веб-интерфейсе Sendsay, получена из&nbsp;кэшированных данных&nbsp;&mdash; поэтому вы&nbsp;получаете эти сведения моментально.

Рассмотрим получение данных со&nbsp;всей базовой информацией по&nbsp;отправленным email-выпускам&nbsp;&mdash; например, за&nbsp;декабрь 2022&nbsp;года:

<!-- prettier-ignore -->
```js
{
	"action": "stat.uni",
	"result": "response",
	"select": ["issue.id", "issue.name", "issue.subject", "issue.dt:Ys", "issue.group.gid", "issue.group.name", "issue.members", "issue.deliv_ok", "issue.deliv_bad", "issue.readed", "issue.u_readed", "issue.clicked", "issue.u_clicked", "issue.unsubed"],
	"filter": [{
		"a": "issue.dt:Ys",
		"op": ">=",
		"v": "2022-12-01 00:00:00"
	}, {
		"a": "issue.dt:Ys",
		"op": "<=",
		"v": "2022-04-31 23:59:59"
	}, {
		"a": "issue.format",
		"op": "==",
		"v": "e"
	}],
	"order": ["-issue.dt:Ys"]
}
```

Статистика по&nbsp;выпускам заранее посчитана&nbsp;&mdash; и&nbsp;при необходимости вы&nbsp;можете запросить данные по&nbsp;всем отправленным выпускам за&nbsp;весь срок жизни вашего аккаунта.

А&nbsp;чтобы, например, узнать количество отправленных писем с&nbsp;PDF-вложениями за&nbsp;конкретный период, можно получить количество отправленных писем с&nbsp;разбивкой по&nbsp;значению поля `issue.features`:

<!-- prettier-ignore -->
```js
{
    "action": "stat.uni",
    "select": [
        "issue.features",
        "sum(issue.members)"
    ],
    "filter": [
        {
            "a": "issue.dt:YM",
            "op": "==",
            "v": "2022-12"
        },
        {
            "a": "issue.format",
            "op": "==",
            "v": "e"
        }
    ]
}
```

С&nbsp;помощью этого запроса вы&nbsp;получите количество отправленных email-выпусков за&nbsp;декабрь 2022&nbsp;года. Полный набор и&nbsp;описание полей, описывающих выпуск рассылки `issue.*`, есть [в&nbsp;документации](https://sendsay.ru/api/api.html#Информация-o-выпуске).

### Статистика для конкретного получателя

В&nbsp;отличие от&nbsp;статистики по&nbsp;выпуску, данные по&nbsp;конкретному получателю рассылок собираются и&nbsp;отдаются &laquo;на&nbsp;лету&raquo;&nbsp;&mdash; в&nbsp;момент выполнения запроса.

Данные о каждом типе событий хранятся каждая в своей области:

- [доставка](https://sendsay.ru/api/api.html#Информация-о-доставке-и-прочих-свойствах-каждого-сообщения),
- [открытия](https://sendsay.ru/api/api.html#Информация-об-открытии-писем),
- [клики](https://sendsay.ru/api/api.html#%Информация-о-переходах),
- [отписки и жалобы](https://sendsay.ru/api/api.html#Информация-об-отписке).

Нельзя в&nbsp;одном запросе добавить в `select` параметры, описывающие разные события.

Далее приведём примеры.

#### Все выпуски, отправленные за сегодня для конкретного емейла

<!-- prettier-ignore -->
```js
{
    "action": "stat.uni",
    "result": "response",
    "select": [
        "deliv.member.email",
        "deliv.issue.id",
        "deliv.issue.name",
        "deliv.issue.dt",
        "deliv.status"
    ],
    "filter": [
        {
            "a": "deliv.member.email",
            "op": "==",
            "v": "my@secret.email"
        },
        {
            "a": "deliv.issue.dt:YD",
            "op": "==",
            "v": "CURRENT"
        }
    ]
}
```

#### Количество кликов по каждой ссылке за сегодня для конкретного емейла

<!-- prettier-ignore -->
```js
{
    "action": "stat.uni",
    "result": "response",
    "select": [
        "click.member.email",
        "click.issue.id",
        "click.link.url",
        "count(*)"
    ],
    "filter": [
        {
            "a": "click.member.email",
            "op": "==",
            "v": "my@secret.email"
        },
        {
            "a": "click.issue.dt:YD",
            "op": "==",
            "v": "CURRENT"
        }
    ]
}
```

Если убрать из массива `filter` запроса объект, ограничивающий результаты конкретным емейлом, то в результате будут выведены все адреса, попадающие под оставшиеся условия запроса.

:::tip Важно
Общее количество строк в&nbsp;результате выполнения запроса не&nbsp;лимитируется, однако отправляемые запросы должны соответствовать [базовым лимитам](https://sendsay.ru/api/api.html#Базовые-лимиты_вызовов).
:::

### Вывод результата запроса

Результат запроса к `stat.uni` вы&nbsp;можете получить синхронно&nbsp;&mdash; в&nbsp;ответе на&nbsp;сам запрос, а&nbsp;также ассинхронно,&nbsp;&mdash; сохранив результат в&nbsp;файле.

Выбранный способ вывода зависит от&nbsp;предполагаемого времени выполнения запроса и&nbsp;количества строк в&nbsp;результате. В&nbsp;целом, ничего не&nbsp;мешает вывести в&nbsp;браузере сотню тысяч строк результата, но&nbsp;жизнь брокера будет зависеть только от&nbsp;мощности вашего компьютера.

За&nbsp;результат выполнения запроса отвечает параметр `result`. В&nbsp;примерах выше ожидается синхронный ответ, и&nbsp;при выполнении запроса в&nbsp;API-консоли вы&nbsp;увидите результат на&nbsp;экране.

Если&nbsp;же вы&nbsp;трезво оцениваете сложность запроса и&nbsp;решили сохранить результат в&nbsp;файле, то&nbsp;вам стоит воспользоваться [возможностями настройки параметра result API-запроса](https://sendsay.ru/api/api.html#Возвращаемое-значение).

#### Сохранить в Файлы -> Отчеты -> stat.uni

<!-- prettier-ignore -->
```js
"result": "save"
```

#### Сохранить результат запроса на внешний FTP в utf8

<!-- prettier-ignore -->
```js
"result": [{
	"to": "ftp://login:password@ftp.yourserver/path/",
	"filename": "Clients",
	"format": "csv",
	"type": "url_file",
	"utf8": "1"
}]
```

### Последовательность работы запроса stat.uni

1. Сервер находит все строки, подходящие под условия, указанные в `filter`.
2. Если указан `order`, то найденные строки сортируются по указанному правилу. Если порядок не указан, то данные выведутся без сортировки, каждый раз по-разному.
3. Если указан `skip`, то из вывода исключается указанное количество найденных строк.
4. Если указан `first`, то выводится указанное количество строк; если не указан — выводятся все найденные строки.
