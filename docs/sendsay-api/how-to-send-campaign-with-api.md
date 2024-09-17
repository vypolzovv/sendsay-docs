---
sidebar_position: 2
sidebar_label: 'Отправка рассылки через API'
---

import login from '/img/sendsay-api/how-to-send-campaign-with-api/login.png';
import SupportLink from '@site/src/components/SupportLink';

# Как отправить рассылку через Sendsay API

[Sendsay API](https://sendsay.ru/api/api.html) позволяет отправлять массовые и транзакционные рассылки, смотреть статистику и&nbsp;многое другое&nbsp;&mdash; с&nbsp;его помощью можно задать автоматизированные настройки ко&nbsp;всем функциям Sendsay.

## Транзакционные рассылки

### Отправка через API-консоль в Sendsay

Чтобы отправить транзакционную рассылку с помощью API в интерфейсе Sendsay:

1. В&nbsp;меню аккаунта перейдите в&nbsp;раздел [**Настройки системы &rarr; Отправители**](https://app.sendsay.ru/account/senders) и&nbsp;добавьте имя и&nbsp;адрес отправителя писем.

   [Как добавить и подтвердить отправителя писем](https://docs.sendsay.ru/getting-started/#8-добавьте-иподтвердите-отправителя-писем)

2. Если вы ещё не&nbsp;отправляли рассылки с&nbsp;текущего аккаунта, <SupportLink>напишите в чат поддержки</SupportLink>, чтобы вам открыли доступ на&nbsp;отправку транзакционных писем через API.

3. Перейдите в&nbsp;раздел **API &rarr; API-консоль**:

   ![API-console](/img/sendsay-api/how-to-send-campaign-with-api/api-console.png)

   Чтобы протестировать отправку писем, введите запрос:

   <!-- prettier-ignore -->
   ```js
   {
       "action": "issue.send",
       "letter": {
           "message": {
               "html" : "html-версия письма"
           },
           "subject": "Тема письма",
           "from.email": "EMAIL-АДРЕС ОТПРАВИТЕЛЯ"
       },
       "group": "personal",
       "email": "EMAIL-АДРЕС ПОЛУЧАТЕЛЯ",
       "sendwhen": "now"
   }
   ```

   где `EMAIL-АДРЕС ОТПРАВИТЕЛЯ` &mdash; email-адрес, который вы&nbsp;добавили в&nbsp;качестве отправителя, а `EMAIL-АДРЕС ПОЛУЧАТЕЛЯ` &mdash; ваш email-адрес, на&nbsp;который уйдёт тестовое письмо.

   Нажмите &laquo;Выполнить&raquo;. После этого на&nbsp;email-адрес получателя отправится письмо, а&nbsp;в&nbsp;разделе [**Статистика &rarr; Транзакционные рассылки**](https://app.sendsay.ru/reports/transactional) появятся данные об&nbsp;успешной отправке:

   ![Statistics](/img/sendsay-api/how-to-send-campaign-with-api/statistics.png)

### Отправка через Postman

Протестируйте отправку запроса извне&nbsp;&mdash; например, через [Postman](https://www.postman.com/). Для этого вам потребуется уникальный API-ключ.

[Как получить API-ключ](https://docs.sendsay.ru/sendsay-api/how-to-get-apikey)

1. Перейдите в&nbsp;[Postman](https://www.postman.com/) и&nbsp;авторизуйтесь, либо зарегистрируйте новый аккаунт. В&nbsp;разделе **My&nbsp;Workspace** нажмите &laquo;New&raquo; и&nbsp;выберите **HTTP**&nbsp;&mdash; чтобы создать новый HTTP-запрос:

   ![Postman](/img/sendsay-api/how-to-send-campaign-with-api/postman.gif)

2. В&nbsp;параметрах запроса выберите метод `POST`. Затем во вкладке **body** укажите `raw`, а в&nbsp;раскрывающемся меню выберите `JSON`:

   ![Postman](/img/sendsay-api/how-to-send-campaign-with-api/postman1.gif)

3. В&nbsp;поле URL вставьте `https://api.sendsay.ru/general/api/v100/json/Ваш_логин_Sendsay`. Вместо `Ваш_логин_Sendsay` необходимо добавить ваш логин, его можно скопировать в&nbsp;меню аккаунта:

<p align="center">
  <img width="50%" src={login} alt="Login" />
</p>

4. В&nbsp;поле ниже вставьте запрос:

   <!-- prettier-ignore -->
   ```js
   {
      "action": "issue.send",
      "letter": {
          "message": {
              "html" : "html-версия письма"
          },
          "subject": "Тема письма",
          "from.email": "EMAIL-АДРЕС ОТПРАВИТЕЛЯ"
      },
      "group": "personal",
      "email": "EMAIL-АДРЕС ПОЛУЧАТЕЛЯ",
      "sendwhen": "now",
      "apikey": "ВАШ API КЛЮЧ"
   }
   ```

   где `EMAIL-АДРЕС ОТПРАВИТЕЛЯ` &mdash; адрес отправителя, который вы&nbsp;добавили в&nbsp;п.1; `EMAIL-АДРЕС ПОЛУЧАТЕЛЯ` &mdash; ваш email-адрес, на&nbsp;который отправится тестовое письмо; `ВАШ API КЛЮЧ` &mdash; API-ключ, который был сгенерирован в&nbsp;п.4.

   Затем нажмите &laquo;Send&raquo;.

   После отправки запроса должен прийти похожий ответ:

   ![Postman](/img/sendsay-api/how-to-send-campaign-with-api/postman3.png)

   Это значит, что запрос выполнился успешно, и&nbsp;письмо отправлено. В&nbsp;разделе [**Статистика &rarr; Транзакционные выпуски**](https://app.sendsay.ru/reports/transactional) можно увидеть информацию об&nbsp;отправленном выпуске.

## Массовые рассылки через Sendsay API

Данные для выпуска можно передавать как в&nbsp;API-запросе, так и&nbsp;использовать заранее подготовленные шаблон выпуска и&nbsp;список или сегмент получателей. В&nbsp;первом случае используйте обычный массовый выпуск, во&nbsp;втором&nbsp;&mdash; экспресс-выпуск.

### Обычный массовый выпуск

Если с&nbsp;помощью API нужно отправить рассылку, для которой у&nbsp;вас в&nbsp;аккаунте уже созданы черновик и&nbsp;список будущих получателей, укажите их&nbsp;ID&nbsp;в API-запросе:

<!-- prettier-ignore -->
```js
{
    "action": "issue.send",
    "group": "GROUPID",
    "sendwhen": "now",
    "letter": {
        "draft.id": "DRAFTID"
    }
}
```

где `GROUPID` &mdash; ID&nbsp;списка или сегмента получателей, а `DRAFTID` &mdash; ID&nbsp;шаблона выпуска.

### Экспресс-выпуск

Если нужно передать список участников в&nbsp;запросе, используйте экспресс-выпуск.

Содержимое письма можно взять из&nbsp;шаблона выпуска, а&nbsp;вот список или сегмент получателей нужно подготовить в&nbsp;CSV или JSON в&nbsp;соответствии [с&nbsp;документацией](https://sendsay.ru/api/api.html#Форматы-данных-для-импортирования-и-Экспресс-выпуска).

:::tip Важно
Адреса, по которым вы хотите отправить рассылку, должны находиться в базе и быть доступными для рассылок.
:::

В&nbsp;API-консоли введите запрос:

```js
{
    "action": "issue.send",
    "group": "masssending",
    "sendwhen": "now",
    "letter": {
        "draft.id": "DRAFTID"
    },
    "users.list": "member.email;data.name\nask@sendsay.ru;Андрей"
}
```

где `DRAFTID` — ID шаблона выпуска, `member.email;data.name\nask@sendsay.ru;Андрей` — адреса и данные получателей, непосредственно в JSON или СSV.
