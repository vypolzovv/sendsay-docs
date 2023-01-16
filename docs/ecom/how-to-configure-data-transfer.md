---
sidebar_position: 1
sidebar_label: 'Инструкция для разработчиков'
---

# Инструкция для разработчиков: как настроить передачу данных с сайта

Модуль **Продажи** предназначен для отправки коммуникаций (email, пуши, смс и т.д.), сопровождающих процессы выбора и покупки товаров и услуг — например, в интернет-магазинах, но не ограничиваясь ими.

В качестве исходных данных для настройки сценариев коммуникаций используется информация о параметрах продаваемых товаров и услуг и данные о действиях покупателя на сайте клиента (события).

Модуль работает на основе поступающих в Sendsay событий о действиях пользователя и генерации собственных событий на базе полученных данных.

## Настройка модуля

### Общие настройки

- Сайт клиента должен быть HTTPS.
- Переходы на сайт должны идти через клиентский домен (сабдомен домена сайта), иначе будут проблемы с передачей куки в большинстве броузеров.
- Поддомен для кликов должен быть HTTPS.

### Список клиентских ssec-событий

| ID  | Константа события       | Событие                                       | Область в stat.uni    |
| :-- | :---------------------- | :-------------------------------------------- | :-------------------- |
| 0   | VIEW_PRODUCT            | Просмотр карточки товара                      | ssec_product_view     |
| 1   | ORDER                   | Заказ                                         | ssec_order            |
| 2   | VIEW_CATEGORY           | Просмотр категории товара                     | ssec_category_view    |
| 3   | BASKET_ADD              | Добавление товаров в корзину                  | ssec_basket           |
| 4   | BASKET_CLEAR            | Очистка корзины                               | ssec_basket_clear     |
| 5   | SEARCH_PRODUCT          | Поиск товара                                  | ssec_product_search   |
| 6   | SUBSCRIBE_PRODUCT_PRICE | Подписка на изменение стоимости товара        | ssec_product_price    |
| 7   | SUBSCRIBE_PRODUCT_ISA   | Подписка на пинг о появлении товара в продаже | ssec_product_isa      |
| 8   | FAVORITE                | Добавление товара в избранное                 | ssec_product_favorite |
| 12  | PREORDER                | Предварительный заказ                         | ssec_product_preorder |
| 13  | PRODUCT_ISA             | Товар появился                                |                       |
| 15  | PRODUCT_PRICE_CHANGED   | Стоимость товара изменилась                   |                       |

### Набор доступных полей

| Имя поля при внесении (JS & API) | Имя поля в stat.uni    | Тип значения           | Доступность    | Аналог в YML |
| :------------------------------- | :--------------------- | :--------------------- | :------------- | :----------- |
| id                               | product.id             | String                 |                |              |
| name                             | product.name           | String                 |                |              |
| picture_url                      | product.picture_url    | Array(String)          |                |              |
| url                              | product.url            | String                 |                |              |
| is_available                     | product.is_available   | UInt8                  |                |              |
| category_paths                   | product.category_paths | Array(String)          |                |              |
| category_id                      | product.category_id    | Int64                  |                |              |
| description                      | product.description    | String                 |                |              |
| vendor                           | product.vendor         | String                 |                |              |
| model                            | product.model          | String                 |                |              |
| type                             | product.type           | String                 |                |              |
| old_price                        | product.old_price      | Nullable(Decimal64(2)) |                |              |
| category                         | category               | String                 |                |              |
| transaction_id                   | transaction.id         | String                 | Заказ, корзина |              |
| delivery_dt                      | delivery.dt            | DateTime               | Заказ          |              |
| delivery_price                   | delivery.price         | Nullable(Decimal64(2)) | Заказ          |              |
| payment_dt                       | payment.dt             | DateTime               | Заказ          |              |
| transaction_dt                   | transaction.dt         | DateTime               | Заказ, корзина |              |
| transaction_status               | transaction.status     | Int64 DEFAULT 0        | Заказ, корзина |              |
| transaction_discount             | transaction.discount   | Nullable(Decimal64(2)) | Заказ, корзина |              |
| transaction_sum                  | transaction.sum        | Nullable(Decimal64(2)) | Заказ, корзина |              |
| cp1…cp20                         | cp1…cp20               | String                 |                |              |

#### Статусы заказа

| ID  | Статус                                              | Status                                                                |
| :-- | :-------------------------------------------------- | :-------------------------------------------------------------------- |
| 1   | Заказ Оформлен (создан,принят)                      | Order Placed (created, accepted)                                      |
| 2   | Заказ Оплачен                                       | Order has been paid                                                   |
| 3   | Заказ Принят в работу (сборка, комплектация)        | Order Accepted for work (assembly, packaging)                         |
| 4   | Доставка                                            | Delivery                                                              |
| 5   | Доставка: присвоен трек-номер                       | Delivery: track number assigned                                       |
| 6   | Доставка: передан в доставку                        | Delivery: the order has been submitted for delivery                   |
| 7   | Доставка: отправлен                                 | Delivery: shipped                                                     |
| 8   | Доставка: поступил в пункт-выдачи / передан курьеру | Delivery: received at the point of issue / handed over to the courier |
| 9   | Доставка: получен                                   | Delivery: received                                                    |
| 10  | Заказ Отменен: отмена заказа                        | Order Canceled: order cancellation                                    |
| 11  | Заказ Отменен: возврат заказа                       | Order Canceled: return order                                          |
| 12  | Заказ Изменен: обновление заказа                    | Order Changed: order update                                           |

### Структура ssec-события

Ssec-события всегда передаются в Sendsay как массив объектов. Если вам надо передать одно событие, то это будет массив с одним объектом.

```json
[
  {
    "id": "product1",  //обязательно
    "description": "description",
    "is_available": 1 | 0,
    "model": "model",
    "name": "name",
    "old_price": 5.99,
    "picture_url": [""],
    "price":  7.88,
    "url": "url",
    "vendor": "vendor",
    "event_type": 1,
    "event_site": 1
    ...
  }
]
```

Так как в заказе или корзине может быть более одного товара, то структура передачи к нам таких событий отличается от стандартной. Это все так же массив объектов, но все сведения о товарах содержатся в массиве `items`:

```json
[
  {
    "transaction_id": "x1", // обязательно
    "transaction_dt": "2022-07-25 23:25:13", // необязательно
    "payment_dt": "2022-07-25 23:25:13", //необязательно
    "delivery_dt": "2022-07-25 23:25:13", //необязательно
    "update": 1 | 0, //необязательно
    "items": [  //необязательно
      {
        "id": "product1", //обязательно
        "qnt": 2, //обязательно
        "price": 5.88 //обязательно
      }
    ]
  }
]
```

### Добавление событий через JS-cкрипт

Все события могут быть переданы в Sendsay с вашего сайта через вызов соответствующей JS-функции.

Идентификатор пользователя, которому должно добавиться событие вы можете передать самостоятельно в опциональном параметре, либо довериться нашему скрипту.

В случае если пользователя определяет наш скрипт, то вместе с идентификатором (email, web-push, umid) придет информация о выпуске, из которого пользователь перешел на сайт.

#### Проверка наличия

#### JavaScript-синтаксис

Размещение кода напрямую в HTML-странице:

```js
(window["sndsyApiOnReady"] = window["sndsyApiOnReady"] || []).push(function() {
  sndsyApi.ssecEvent(<event_type>, <[ items_array ]>, { email: 'name@domain.ru' });
});typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

Также вы можете вызывать функцию `sndsyApi.ssecEvent()` в нужный вам момент из любого места вашего JS-кода.

### Добавление данных через Sendsay API

Все события можно добавлять, используя Sendsay API. Это будет полезно для добавления или обновления данных о совершенных заказах, а также при добавлении событий, которые не относятся к действиям ваших клиентов, например «появление товара в продаже» или «изменение стоимости товара».

Стоит понимать, что если данные добавляются через наш JS-трекер, то они сопровождаются информацией о том, к какой рассылке и письму мы аттрибуцируем данное событие. В случае добавления данных через API, события не будут относится ни к какому выпуску.

#### Добавление событий по одному (member.set)

```json
{
  "action": "member.set",
  "email": "АДРЕС_ПОДПИСЧИКА",
  "addr_type": "email",
  "datakey": [
    [
      "ssec",
      "set",
      [
        {...}
      ]
    ]
  ]
}
```

#### Добавление заказа через member.set

```json
{
  "action": "member.set",
  "email": "АДРЕС_ПОДПИСЧИКА",
  "addr_type": "email",
  "datakey": [
    [
      "ssec",
      "set",
      [
        {
          "transaction_id": "x1",
          "transaction_dt": "2022-07-25 23:25:13",
          "transaction_sum": 11.98,
          "transaction_discount": 1.59,
          "transaction_status": 1,
          "items": [
            {
              "id": 50,
              "name": "Artefact 1.9",
              "price": 5.99,
              "qnt": 2
            },
            {
              "id": 52,
              "name": "Renegat 12.1",
              "price": 7.65,
              "qnt": 2
            }
          ],
          "event_type": 1,
          "update": 1
        }
      ]
    ]
  ]
}
```

#### Добавление событий пачкой (member.import)

```json
{
  "action": "member.import",
  "users.list": {
    "caption": [
      {
        "datakey": "member.email",
        "mode": "set"
      },
      {
        "datakey": "ssec",
        "mode": "set"
      }
    ],
    "rows": [
      [ "адрес_подписчика", [{ ... }] ],
      [ "адрес_подписчика", [{ ... }] ]
    ]
  },
  "charset": "utf-8",
  "addr_type": "email"
}
```

### Добавление обезличенных событий

| ID  | Константа события     | Событие                     |
| :-- | :-------------------- | :-------------------------- |
| 13  | PRODUCT_ISA           | Товар появился              |
| 15  | PRODUCT_PRICE_CHANGED | Стоимость товара изменилась |

Для отправки обезличенных данных используется отдельный эндпоинт:

```
https://api.sendsay.ru/general/ssec/v100/json/ACCOUNT_ID
```

Пример API-запроса:

```bash
curl --location --request GET 'https://api.sendsay.ru/general/ssec/v100/json/ACCOUNT_ID' \
--header 'Content-Type: application/json' \
--header 'Authorization: sendsay apikey=API_KEY' \
--data-raw '[{
  "id": 1111,
  "description": "description",
  "is_available": 1,
  "model": "model",
  "name": "name",
  "old_price": 5.99,
  "picture_url": ["https://domain.com/image.jpg"],
  "price":  7.88,
  "url": "url",
  "vendor": "vendor",
  "event_type": 13,
  "event_site": 1
}]'
```

### Доступ к событиям через Sendsay API

### Использование данных из YML-файла

Мы предлагаем вам передавать все сведения о товаре в параметрах события, это в будущем гарантирует более удобное использование этих данных и при персонализации писем и при сегментации.

Ситуации, при которых вам могут понадобиться данные из YML-файла:

- вы передаете в событиях не полный набор параметров товара, например только ID;
- использование сценария «Брошенный просмотр категории»
- использование функций ProScript, в результате работы которых, вы получаете только ID товара, например, блоки рекомендаций типа «самое просматриваемое» или «самое покупаемое».

Подключение YML-файла к аккаунту осуществляется через личный кабинет при подключении сайта.
Подключить данные из YML-файла к письму можно следующей командой ProScript:

```
[% external_extra("rfs://upload/yandex.xml","method","get","ignore_error","1","format","yml") %]
```

## Клиентские события

### Просмотр карточки товара

Событие «Просмотр карточки товара» может возникать при посещении пользователем страницы с описанием товара (услуги) или при открытии окошка «быстрый просмотр товара».

Информация о данном событии используется в сценарии «Брошенный просмотр», в рекомендационной системе, а также при сегментации пользователей на основе их интересов.

#### Передача события в Sendsay

<!-- prettier-ignore -->
```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  sndsyApi.ssecEvent('VIEW_PRODUCT', [
    {
      "id": "product1", //обязательно
      "description": "description",
      "is_available": 1 | 0,
      "model": "model",
      "name": "name",
      "old_price": 5.99,
      "picture_url": [],
      "price": 7.88,
      "url": "url",
      "vendor": "vendor"
    }
  ]);
  // или с доп. параметрами
  sndsyApi.ssecEvent(
    'VIEW_PRODUCT',
    [
      {
        "id": "product1", //обязательно
        "description": "description",
        "is_available": 1 | 0,
        "model": "model",
        "name": "name",
        "old_price": 5.99,
        "picture_url": [],
        "price": 7.88,
        "url": "url",
        "vendor": "vendor"
      }
    ],
    { email: 'name@domain.ru' }
  );
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

### Просмотр категории

Событие «Просмотр категории» может возникать при посещении страниц со списком товаров в каталоге на сайте.

Информация о данном событии используется в сценарии «Брошенный просмотр категории», в рекомендационной системе, а также при сегментации пользователей на основе их интересов.

<!-- prettier-ignore -->
```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  sndsyApi.ssecEvent(
    'VIEW_CATEGORY',
    [
      {
        "category": "", //Cтрока - путь до товарных категорий для события просмотр категории
        "category_id": INT, //Число идентификатор из YML
      }
    ],
    { email: 'name@domain.ru' }
  );
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

### Действия с корзиной

Для запуска сценария «Брошенная корзина» вы можете передавать Sendsay состояние корзины пользователя.

#### Обновление корзины

В данных должно прийти полное состояние корзины на момент вызова запроса.

<!-- prettier-ignore -->
```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  sndsyApi.ssecEvent(
    'BASKET_ADD',
    [
      {
        "transaction_id": "x1", //необязательно
        "transaction_dt": "2022-07-25 23:25:13", //необязательно
        "items": [
          {
            //обязательно
            "id": "product1", //обязательно
            "qnt": 2, //обязательно
            "price": 5.88 //обязательно
          }
        ]
      }
    ],
    { email: 'name@domain.ru' }
  );
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

#### Очистка корзины

```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  sndsyApi.ssecEvent('BASKET_CLEAR', { email: 'some@domain.com' });
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

В случае поступления информации о заказе при наличии неочищенной корзины, корзина очищается автоматически.

### Действия с заказом

<!-- prettier-ignore -->
```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  // Call methods with params
  sndsyApi.ssecEvent(
    'ORDER',
    [
      {
        "transaction_id": "x1", // обязательно
        "transaction_status": 1, // обязательно
        "transaction_dt": "2022-07-25 23:25:13", // необязательно
        "payment_dt": "2022-07-25 23:25:13", //необязательно
        "delivery_dt": "2022-07-25 23:25:13", //необязательно
        "update": 1 | 0, //необязательно
        "items": [
          {
            //необязательно
            "id": "product1", //обязательно
            "qnt": 2, //обязательно
            "price": 5.88 //обязательно
          }
        ]
      }
    ],
    { email: 'name@domain.ru' }
  );
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

При создании заказа указание значения параметра `transaction_status = 1` обязательно. В случае отсуствия или передачи других значений не будет создано триггерное событие "новый заказ".

Ключ `"update": 1` действует только для существующего заказа с номером `transaction_id`. Если такого заказа нет, запрос вернёт сообщение об ошибке.

Если с `update == 1` не передан массив `items`, то данные о товарах заказа берутся из последней записи о заказе c указанным в запросе `transaction_id`.

### Использование поиска по сайту

<!-- prettier-ignore -->
```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  sndsyApi.ssecEvent(
    'SEARCH_PRODUCT',
    [
      {
        "description": "поисковая строка",
      }
    ],
    { email: 'name@domain.ru' }
  );
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

### Подписка на изменение стоимости

<!-- prettier-ignore -->
```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  var productData = [
      {
        "description": "description",
        "id": "product1", //обязательно
        "is_available": 1 | 0,
        "model": "model",
        "name": "name",
        "old_price": 5.99,
        "picture": [],
        "price": 7.88,
        "url": "url",
        "vendor": "vendor"
      }
    ],
    extraData = {
      email: 'some@domain.com',
    };

  sndsyApi.ssecEvent(
    'SUBSCRIBE_PRODUCT_PRICE',
    {
      add: productData,
    },
    extraData
  );
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

Удаление подписок на изменение стоимости товара:

```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  sndsyApi.ssecEvent('SUBSCRIBE_PRODUCT_PRICE', {
    delete: '41', // или ['41','54','71']
  });
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

Очистка всех подписок на изменение стоимости товара:

```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  sndsyApi.ssecEvent('SUBSCRIBE_PRODUCT_PRICE', {
    clear: 1,
  });
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

### Подписка на информирование о появлении товара в продаже

<!-- prettier-ignore -->
```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  var productData = [
      {
        "description": "description",
        "id": "product1", //обязательно
        "is_available": 1 | 0,
        "model": "model",
        "name": "name",
        "old_price": 5.99,
        "picture": [],
        "price": 7.88,
        "url": "url",
        "vendor": "vendor"
      }
    ],
    extraData = {
      email: 'some@domain.com',
    };

  sndsyApi.ssecEvent(
    'SUBSCRIBE_PRODUCT_ISA',
    {
      add: productData,
    },
    extraData
  );
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

Удаление подписок о появлении товара в продаже:

```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  sndsyApi.ssecEvent('SUBSCRIBE_PRODUCT_ISA', {
    delete: '41', // или ['41','54','71']
  });
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

Очистка всех подписок о появлении товара в продаже:

```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  sndsyApi.ssecEvent('SUBSCRIBE_PRODUCT_ISA', {
    clear: 1,
  });
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

### Управление избранным

<!-- prettier-ignore -->
```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  var productData = [
      {
        "description": "description",
        "id": "product1", //обязательно
        "is_available": 1 | 0,
        "model": "model",
        "name": "name",
        "old_price": 5.99,
        "picture": [],
        "price": 7.88,
        "ur"l: "url",
        "vendor": "vendor"
      }
    ],
    extraData = {
      email: 'some@domain.com',
    };

  sndsyApi.ssecEvent(
    'FAVORITE',
    {
      add: productData,
    },
    extraData
  );
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

Удаление «Избранного»:

```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  sndsyApi.ssecEvent('FAVORITE', {
    delete: '41', // или ['41','54','71']
  });
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

Очистка всего содержимого в «Избранном»:

```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  sndsyApi.ssecEvent('FAVORITE', {
    clear: 1,
  });
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

### Оформление предварительного заказа

<!-- prettier-ignore -->
```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  var productData = [
      {
        "description": "description",
        "id": "product1", //обязательно
        "is_available": 1 | 0,
        "model": "model",
        "name": "name",
        "old_price": 5.99,
        "picture": [],
        "price": 7.88,
        "url": "url",
        "vendor": "vendor"
      }
    ],
    extraData = {
      email: 'some@domain.com',
    };

  sndsyApi.ssecEvent(
    'PREORDER',
    {
      add: productData,
    },
    extraData
  );
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

Удаление предзаказа:

```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  sndsyApi.ssecEvent('PREORDER', {
    delete: '41', // или ['41','54','71']
  });
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

Очистка всех предзаказов:

```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  sndsyApi.ssecEvent('PREORDER', {
    clear: 1,
  });
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```
