---
sidebar_position: 2
sidebar_label: 'Инструкция для разработчиков'
---

# Инструкция для разработчиков: как настроить передачу данных с сайта

Модуль **Продажи** предназначен для отправки коммуникаций (email, пуши, смс и т.д.), сопровождающих процессы выбора и покупки товаров и услуг — например, в интернет-магазинах, но не ограничиваясь ими.

В качестве исходных данных для настройки сценариев коммуникаций используется информация о параметрах продаваемых товаров и услуг и данные о действиях покупателя на сайте клиента (события).

Модуль работает на основе поступающих в Sendsay событий о действиях пользователя и генерации собственных событий на базе полученных данных.

## Настройка модуля

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
| 28  | REGISTRATION            | Регистрация на сайте                          |                       |
| 29  | AUTHORIZATION           | Авторизация на сайте                          |                       |

### Набор доступных полей

| Имя поля при внесении (JS & API) | Имя поля в stat.uni    | Тип значения                          | Доступность    | Аналог в YML |
| :------------------------------- | :--------------------- | :------------------------------------ | :------------- | :----------- |
| id                               | product.id             | String                                |                |              |
| name                             | product.name           | String                                |                |              |
| picture                          | product.picture        | Array(String)<br/>(абсолютная ссылка) |                |              |
| url                              | product.url            | String<br/>(абсолютная ссылка)        |                |              |
| available                        | product.available      | UInt8                                 |                |              |
| category_paths                   | product.category_paths | Array(String)                         |                |              |
| category_id                      | product.category_id    | Int64                                 |                |              |
| description                      | product.description    | String                                |                |              |
| vendor                           | product.vendor         | String                                |                |              |
| model                            | product.model          | String                                |                |              |
| type                             | product.type           | String                                |                |              |
| price                            | product.price          | Nullable(Decimal64(2))                |                |              |
| old_price                        | product.old_price      | Nullable(Decimal64(2))                |                |              |
| category                         | category               | String                                |                |              |
| transaction_id                   | transaction.id         | String                                | Заказ, корзина |              |
| delivery_dt                      | delivery.dt            | DateTime                              | Заказ          |              |
| delivery_price                   | delivery.price         | Nullable(Decimal64(2))                | Заказ          |              |
| payment_dt                       | payment.dt             | DateTime                              | Заказ          |              |
| transaction_dt                   | transaction.dt         | DateTime                              | Заказ, корзина |              |
| transaction_status               | transaction.status     | Int64 DEFAULT 0                       | Заказ, корзина |              |
| transaction_discount             | transaction.discount   | Nullable(Decimal64(2))                | Заказ, корзина |              |
| transaction_sum                  | transaction.sum        | Nullable(Decimal64(2))                | Заказ, корзина |              |
| cp1…cp20                         | cp1…cp20               | String                                |                |              |

#### Статусы заказа

| ID  | Статус                                              |
| :-- | :-------------------------------------------------- |
| 1   | Заказ Оформлен (создан,принят)                      |
| 2   | Заказ Оплачен                                       |
| 3   | Заказ Принят в работу (сборка, комплектация)        |
| 4   | Доставка                                            |
| 5   | Доставка: присвоен трек-номер                       |
| 6   | Доставка: передан в доставку                        |
| 7   | Доставка: отправлен                                 |
| 8   | Доставка: поступил в пункт-выдачи / передан курьеру |
| 9   | Доставка: получен                                   |
| 10  | Заказ Отменен: отмена заказа                        |
| 11  | Заказ Отменен: возврат заказа                       |
| 12  | Заказ Изменен: обновление заказа                    |

### Структура ssec-события

Ssec-события всегда передаются в Sendsay как массив объектов. Если вам надо передать одно событие, то это будет массив с одним объектом.

<!-- prettier-ignore -->
```json
[
  {
    "id": "product1",  //обязательно
    "description": "description",
    "available": 1 | 0,
    "model": "model",
    "name": "name",
    "old_price": 5.99,
    "picture": [""],
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

<!-- prettier-ignore -->
```json
[
  {
    "transaction_id": "x1", //обязательно
    "transaction_dt": "2022-07-25 23:25:13", //обязательно для заказа
    "transaction_sum": 100.9, //желательно
    "payment_dt": "2022-07-25 23:25:13", //необязательно
    "delivery_dt": "2022-07-25 23:25:13", //необязательно
    "update": 1 | 0, //необязательно
    "items": [  //обязательно при update != 1
      {
        "id": "product1", //обязательно
        "qnt": 2, //обязательно
        "price": 5.88 //обязательно
      }
    ]
  }
]
```

### Персонализация первичного ключа товара для корзины и заказа

Если вам нужно передавать в корзину (заказ) разные товары с одним и тем же product.id (например, что-то с разным размером или объемом), то вам нужно передать дополнительный параметр для создания нового первичного ключа, отличного от product.id.

В принимаемых данных о товаре мы ожидаем поле `uniq`, в значении которого должно передаваться имя поля с дополнением для нового первичного ключа.

Поле `uniq`- необязательно, при его отсутствии в качестве первичного ключа используется значение product.id.

<!-- prettier-ignore -->
```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  sndsyApi.ssecEvent(
    'BASKET_ADD',
    [
      {
        "transaction_sum": 100.9, //желательно
        "items": [ //обязательно
          {
            "id": "3457", //обязательно
            "qnt": 2, //обязательно
            "price": 5.88, //обязательно
            "name": "iPhone",
            "uniq": "name"
          },
           {
            "id": "3457", //обязательно
            "qnt": 2, //обязательно
            "price": 5.88, //обязательно
            "name": "Pixel",
            "uniq": "name"
          },
           {
            "id": "3456", //обязательно
            "qnt": 2, //обязательно
            "price": 5.88, //обязательно
            "name": "iPhone"
          }
        ]
      }
    ],
    { email: 'АДРЕС КЛИЕНТА' } //необязательно, при отсутствии email будет распознаваться нашим скриптом
  );
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

Для для двух товаров с `"id" == 3457` & `"uniq" == "name"` значение первичных ключей будет `"3457/iPhone"` & `"3457/Pixel"`.
Для товара с `"id" == 3456` и без поля `uniq` значение певичного ключа будет `"3456"`

### Добавление событий через JS-cкрипт

Все события могут быть переданы в Sendsay с вашего сайта через вызов соответствующей JS-функции.

Идентификатор пользователя, которому должно добавиться событие вы можете передать самостоятельно в опциональном параметре, либо довериться нашему скрипту.

В случае если пользователя определяет наш скрипт, то вместе с идентификатором (email, web-push, umid) придет информация о выпуске, из которого пользователь перешел на сайт.

#### JavaScript-синтаксис

Размещение кода напрямую в HTML-странице:

<!-- prettier-ignore -->
```js
<script type="text/javascript">
  (window["sndsyApiOnReady"] = window["sndsyApiOnReady"] || []).push(function() {
    sndsyApi.ssecEvent(<event_type>, <[ items_array ]>, { email: 'name@domain.ru' });
  });typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
</script>
```

Также вы можете вызывать функцию `sndsyApi.ssecEvent()` в нужный вам момент из любого места вашего JS-кода.

#### Изменение анкетных данных контакта через JS-функции добавления событий

Одновременно с передачей любых событий можно добавлять, изменять, удалять анкетные данные контакта, для которого вы передаете событие.

<!-- prettier-ignore -->
```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  sndsyApi.ssecEvent(
    'REGISTRATION',
    {
      email: 'АДРЕС КЛИЕНТА',
      extra: { // любые данные которые будут включены в корень запроса
        dk: [["base.name","set","Andrey"]] // анкетные данные
      }
    }
  );
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

_Формат параметра dk:_

<!-- prettier-ignore -->
```js
[
  [ "base.name", "set", "Vladimir"],
  [ "client_data.pets", "push", [{"pet_type":"dog","age":1}]],
  [ "client_data", "merge", {"type":"GOLD","orders_count":55,"prefered_item":"shopping bag"}]
]
```

Полное описание возможностей работы с данными и режимов можно найти в [документации АПИ](https://sendsay.ru/api/api.html#C%D0%BE%D0%B7%D0%B4%D0%B0%D1%82%D1%8C-%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D1%87%D0%B8%D0%BA%D0%B0-%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%B8%D1%82%D1%8C-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5-%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D1%87%D0%B8%D0%BA%D0%B0-%D0%9A%D0%94).

### Добавление данных через Sendsay API

Все события можно добавлять, используя Sendsay API. Это будет полезно для добавления или обновления данных о совершенных заказах, а также при добавлении событий, которые не относятся к действиям ваших клиентов, например «появление товара в продаже» или «изменение стоимости товара».

Для отправки событий модуля "Продажи" используется отдельный эндпоинт:

```
https://ssec.sendsay.ru/general/ssec/v100/json/ACCOUNT_ID
```

ACCOUNT_ID надо заменить идентификатор (логин) вашего аккаунта Sendsay (не email).

Пример API-запроса:

```bash
curl --location --request POST 'https://ssec.sendsay.ru/general/ssec/v100/json/ACCOUNT_ID' \
--header 'Content-Type: application/json' \
--header 'Authorization: sendsay apikey=API_KEY' \
--data-raw '[
        {
          "email": "АДРЕС_ПОДПИСЧИКА",
          "addr_type": "email",
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
      ]'
```

### Добавление обезличенных событий

| ID  | Константа события     | Событие                     |
| :-- | :-------------------- | :-------------------------- |
| 13  | PRODUCT_ISA           | Товар появился              |
| 15  | PRODUCT_PRICE_CHANGED | Стоимость товара изменилась |

При отправке обезличенных данных не нужно указывать `email` & `addr_type`

Пример API-запроса:

```bash
curl --location --request GET 'https://ssec.sendsay.ru/general/ssec/v100/json/ACCOUNT_ID' \
--header 'Content-Type: application/json' \
--header 'Authorization: sendsay apikey=API_KEY' \
--data-raw '[{
  "id": 1111,
  "description": "description",
  "available": 1,
  "model": "model",
  "name": "name",
  "old_price": 5.99,
  "picture": ["https://domain.com/image.jpg"],
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

:::tip Важно
Выводить в письме данные из YML-файла возможно только в том случае, если ID товара в YML-файле будет совпадать с ID товара, передаваемого в событии.
:::

Подключение YML-файла к аккаунту осуществляется через личный кабинет при подключении сайта.
Подключить данные из YML-файла к письму можно следующей командой ProScript:

```
[% external_extra("https://mysite.ru/example.yml","method","get","ignore_error","1","format","yml") %]
```

## Клиентские события

### Регистрация

<!-- prettier-ignore -->
```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  sndsyApi.ssecEvent(
    'REGISTRATION',
    { email: 'АДРЕС КЛИЕНТА' } //обязательно
  );
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

### Авторизация

<!-- prettier-ignore -->
```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  sndsyApi.ssecEvent(
    'AUTHORIZATION',
    { email: 'АДРЕС КЛИЕНТА' } //обязательно
  );
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

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
      "available": 1 | 0,
      "model": "model",
      "name": "name",
      "old_price": 5.99,
      "picture": [], //абсолютные ссылки в массиве
      "price": 7.88,
      "url": "url", //абсолютная ссылка
      "vendor": "vendor",
      "category_id": 777,
      "category_paths": []
    }
  ]);
  //или с доп. параметрами
  sndsyApi.ssecEvent(
    'VIEW_PRODUCT',
    [
      {
        "id": "product1", //обязательно
        "description": "description",
        "available": 1 | 0,
        "model": "model",
        "name": "name",
        "old_price": 5.99,
        "picture": [], //абсолютные ссылки в массиве
        "price": 7.88,
        "url": "url", //абсолютная ссылка
        "vendor": "vendor",
        "category_id": 777,
        "category_paths": []
      }
    ],
    { email: 'АДРЕС КЛИЕНТА' } //необязательно, при отсутствии email будет распознаваться нашим скриптом
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
    { email: 'АДРЕС КЛИЕНТА' } //необязательно, при отсутствии email будет распознаваться нашим скриптом
  );
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

### Действия с корзиной

Для запуска сценария «Брошенная корзина» вы можете передавать Sendsay состояние корзины пользователя.

Настроить передачу событий корзины необходимо во всех точках сайта, где происходит взаимодействие клиента с корзиной. Для каждого сайта набор таких точек будет индивидуальный.

Чек-лист для проверки настройки корзины:

- добавление товара в корзину из галереи каталога,
- изменение количества товаров (+/- шт) из галереи каталога,
- добавление товаров в корзину из карточки товаров,
- изменение количества товаров (+/- шт) из карточки товаров,
- добавление товаров в корзину из окна быстрого просмотра,
- изменение количества товаров (+/- шт) из окна быстрого просмотра,
- изменение количества товаров (+/- шт) из корзины,
- удаление товаров из корзины,
- очистка корзины при удалении последнего товара,
- очистка корзины при оформлении заказа (если не передаются заказы с сайта).

При тестировании корзины рекомендуем проверять, совпадают ли товары в режиме предпросмотра шаблона сценария «Брошенная корзина» с адресом, для которого вы изменяете корзину на своем сайте (см. [Тестирование модуля](https://docs.sendsay.ru/ecom/how-to-configure-data-transfer/how-to-configure-data-transfer#тестирование-модуля)).

:::tip Важно
Если в Sendsay не будут передаваться все обновления корзины, то данные у клиента в Sendsay и в письмах сценария могут быть неактуальными.
:::

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
        "transaction_sum": 100.9, //желательно
        "update_per_item": 1|0 //необязательно (по умолчанию 0)
        "items": [ //обязательно
          {
            "id": "product1", //обязательно
            "qnt": 2, //обязательно
            "price": 5.88, //обязательно
            "description": "description",
            "model": "model",
            "name": "name",
            "old_price": 5.99,
            "picture": [], //абсолютные ссылки в массиве
            "url": "url", //абсолютная ссылка
            "vendor": "vendor",
            "category_id": 777,
            "category_paths": []
            //вы можете использовать любые доступные поля описания товара
          }
        ]
      }
    ],
    { email: 'АДРЕС КЛИЕНТА' } //необязательно, при отсутствии email будет распознаваться нашим скриптом
  );
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

#### Обновление корзины по одному элементу

Для обновления содержимого корзины по одному элементу необходимо указать в запросе параметр `"update_per_item":1`

Значение парамера qnt передается как строка. Правила указания значения qnt:

<!-- prettier-ignore -->
```js
"+X" - добавляем к имеющемуся числу в qnt X
"-X" - уменьшаем имеющееся число qnt на X
"0" - удаляем строчку с товаром
"X" - меняем qnt на X
```

- Если переданной в запросе позиции (product.id) нет в текущей корзине, то создаем новую запись с указанными значениеми, стартовое значение qnt считаем как 0.
- Позиции корзины, для которых в запросе не заданы изменения, остаются в корзине без изменений.
- Если в результате уменьшения qnt продукта, qnt становится меньше 0, то устанавливается минусовое значение.
- Если в результате уменьшения qnt продукта, qnt становится равно 0, то позиция удаляется.

#### Очистка корзины

```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  sndsyApi.ssecEvent('BASKET_CLEAR', { email: 'some@domain.com' });
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

Корзина также очищается в случае поступления запроса с пустым массивом items.

В случае поступления информации о заказе при наличии неочищенной корзины, корзина очищается автоматически.

### Действия с заказом

<!-- prettier-ignore -->
```js
(window['sndsyApiOnReady'] = window['sndsyApiOnReady'] || []).push(function () {
  //Call methods with params
  sndsyApi.ssecEvent(
    'ORDER',
    [
      {
        "transaction_id": "x1", //обязательно
        "transaction_status": 1, //обязательно
        "transaction_dt": "2022-07-25 23:25:13", //обязательно YYYY-MM-DD hh:mm:ss
        "transaction_sum": 100.9, //обязательно
        "payment_dt": "2022-07-25 23:25:13", //необязательно
        "delivery_dt": "2022-07-25 23:25:13", //необязательно
        "update": 1 | 0, //необязательно
        "items": [  //обязательно при update != 1
          {
            "id": "product1", //обязательно
            "qnt": 2, //обязательно
            "price": 5.88, //обязательно
            "description": "description",
            "model": "model",
            "name": "name",
            "old_price": 5.99,
            "picture": [], //абсолютные ссылки в массиве
            "url": "url", //абсолютная ссылка
            "vendor": "vendor",
            "category_id": 777,
            "category_paths": []
            //вы можете использовать любые доступные поля описания товара
          }
        ]
      }
    ],
    { email: 'АДРЕС КЛИЕНТА' } //необязательно, при отсутствии email будет распознаваться нашим скриптом
  );
});
typeof sndsyApi != 'undefined' && sndsyApi.runQueue();
```

При создании заказа указание значения параметра `"transaction_status":1` обязательно. В случае отсуствия или передачи других значений не будет создано триггерное событие "новый заказ".

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
    { email: 'АДРЕС КЛИЕНТА' } //необязательно, при отсутствии email будет распознаваться нашим скриптом
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
        "available": 1 | 0,
        "model": "model",
        "name": "name",
        "old_price": 5.99,
        "picture": [], //абсолютные ссылки в массиве
        "price": 7.88,
        "url": "url", //абсолютная ссылка
        "vendor": "vendor"
      }
    ],
    extraData = {
      email: 'АДРЕС КЛИЕНТА',
    }; //необязательно, при отсутствии email будет распознаваться нашим скриптом

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
        "available": 1 | 0,
        "model": "model",
        "name": "name",
        "old_price": 5.99,
        "picture": [], //абсолютные ссылки в массиве
        "price": 7.88,
        "url": "url", //абсолютная ссылка
        "vendor": "vendor"
      }
    ],
    extraData = {
      email: 'АДРЕС КЛИЕНТА',
    }; //необязательно, при отсутствии email будет распознаваться нашим скриптом

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
        "available": 1 | 0,
        "model": "model",
        "name": "name",
        "old_price": 5.99,
        "picture": [], //абсолютные ссылки в массиве
        "price": 7.88,
        "url": "url", //абсолютная ссылка
        "vendor": "vendor"
      }
    ],
    extraData = {
      email: 'АДРЕС КЛИЕНТА',
    }; //необязательно, при отсутствии email будет распознаваться нашим скриптом

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
        "available": 1 | 0,
        "model": "model",
        "name": "name",
        "old_price": 5.99,
        "picture": [], //абсолютные ссылки в массиве
        "price": 7.88,
        "url": "url", //абсолютная ссылка
        "vendor": "vendor"
      }
    ],
    extraData = {
      email: 'АДРЕС КЛИЕНТА',
    }; //необязательно, при отсутствии email будет распознаваться нашим скриптом

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

## Тестирование модуля

Чтобы проверить, правильно ли настроена передача данных в Sendsay, рекомендуем выполнить следующие действия:

1. Перейдите на сайт из любой рассылки, отправленной на свой адрес из аккаунта Sendsay (тестовая копия в данном случае не подойдет). Это необходимо, чтобы установились cookie для вашего адреса, иначе события будут записываться за анонимным контактом.
2. Перейдите на страницу товара, если у вас настроена передача события **Просмотр товара**.
3. Откройте любую категорию, если у вас настроена передача события **Просмотр категории**.
4. Проверьте поступление событий в разделе **Просмотр событий**. Если вы не видите событий, отфильтруйте таблицу по Анонимным контактам и выполните п.1.
   ![Event view](/img/ecom/how-to-configure-data-transfer/event-view.png)

   В этой же таблице **Просмотр событий** проверьте, все ли нужные вам данные передаются в Sendsay — например, ссылки на товары. Для этого настройте нужные поля в таблице и посмотрите, все ли данные отображаются.

5. Добавьте товар в корзину из галереи и из карточки товара, измените количество, удалите товар из корзины (см. [Действие с корзиной](https://docs.sendsay.ru/ecom/how-to-configure-data-transfer#действия-с-корзиной)).
6. Проверьте совпадение товаров в корзине на сайте с теми, которые выводятся в карточке подписчика в разделе Продажи/Корзина или в предпросмотре шаблона сценария «Брошенная корзина» для вашего адреса:
   ![How to view email](/img/ecom/ecom-triggers/how-to-view-email1.gif)
7. Удалите все товары из корзины на сайте и убедитесь, что корзина очищена и в Sendsay — в карточке подписчика в корзине должно быть пусто.
8. При оформлении заказа также проверьте, очищается ли корзина. Если вы передаете данные о заказах с сайта, корзина будет очищаться при поступлении заказа автоматически. В остальных случаях необходимо передавать событие Очистка корзины.
9. Для тестирования других событий выполните действия на сайте и проверьте отображение событий в разделе **События сайта**.
