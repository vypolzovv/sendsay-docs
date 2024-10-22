---
sidebar_position: 4
sidebar_label: 'Шаблонизатор PROScript'
---

import SupportLink from '@site/src/components/SupportLink';

# Шаблонизатор PROScript

Данные о товарах выводятся с письмах с помощью [шаблонизатора PROScript](https://docs.sendsay.ru/proscript). Здесь вы найдёте готовые конструкции для вывода товаров в письмах сценариев.

## Брошенная корзина

Для отображения содержимого корзины в рассылках сценария **Брошенная корзина** используются данные события `BASKET_ADD` [_Обновление корзины_](https://docs.sendsay.ru/ecom/how-to-configure-data-transfer#обновление-корзины). Данные о товарах можно получить следующей функцией:

```
[% basket_list = ssecquery('basket') %]
```

Данные о корзине придут в шаблонизатор в объекте:

<!-- prettier-ignore -->
```
{
 "transaction_id" => "x1",
 "transaction_dt" => "2022-07-25 23:25:13",
 "items" => [
    { запись ssec },
    { запись ssec },
    { запись ssec }
 ]
}
```

Если вы передаёте метаданные о товаре (название, ссылку, картинку и т.д.) в событии, в письмо можно подставлять данные товара из самого события.

Чтобы вывести информацию обо всех товарах в корзине, используйте код:

<!-- prettier-ignore -->
```
[% basket_list = ssecquery('basket') %]
[% FOREACH item in basket_list[0].items %]
		<a href="[% item.product.url %]"><img src="[% item.product.picture[0] %]"></a><br>
		<a href="[% item.product.url %]">[% item.product.name %]</a><br>
		Цена: [% item.product.price %] руб.<br>
		Количество: [% item.product.qnt %] шт<br>
		Стоимость: [% item.product.price*item.product.qnt %] руб.<br>
		<a href="[% item.product.url %]">Купить</a><br>
[% END %]
```

Чтобы вывести какой-либо параметр из YML-файла (например, картинку), укажите ссылку на файл в начале блока с товарами и добавьте вывод нужного параметра в код товара:

<!-- prettier-ignore -->
```
[% basket_list = ssecquery('basket') %]
[% external_extra("ССЫЛКА_НА_ВАШ_YML","method","get","ignore_error","1","format","yml") %]
[% FOREACH item in basket_list[0].items %]
		<a href="[% item.product.url %]"><img src="[% IF yml.$id.picture[0] %][% yml.$id.picture[0] %][% ELSE %][% yml.$id.picture %][% END %]"></a><br>
		<a href="[% item.product.url %]">[% item.product.name %]</a><br>
		Цена: [% item.product.price %] руб.<br>
		Количество: [% item.product.qnt %] шт<br>
		Стоимость: [% item.product.price*item.product.qnt %] руб.<br>
		<a href="[% item.product.url %]">Купить</a><br>
[% END %]
```

## Брошенный просмотр

Для вывода товаров в рассылках сценария **Брошенный просмотр**, используются данные события `VIEW_PRODUCT` [_Просмотр карточки товара_](https://docs.sendsay.ru/ecom/how-to-configure-data-transfer#просмотр-карточки-товара):

```
[% product_view_list = ssecquery('product_view') %]
```

Данные о каждом товаре поступят в виде объекта, содержащего все поля. В результате работы функции вы получите 100 последних событий. Вы можете задать временные рамки запрашиваемых событий, — например за последние 24 часа:

```
[% ssecquery('product_view','dt','>','current - 24 hours') %]
```

Также вы можете ограничить число отображаемых товаров напрямую в шаблоне:

```
[% product_view_list = ssecquery('product_view','dt','>','current - 24 hours') %]
[% used_ids = []; showed_ids = 0 %]
[% FOREACH t in product_view_list %]
[% NEXT IF exists_val(used_ids,t.product.id) %]
[% used_ids.push(t.product.id) %]
		<a href="[% t.product.url %]"><img src="[% t.product.picture[0] %]"></a><br>
		<a href="[% t.product.url %]">[% t.product.name %]</a><br>
		[% t.product.price %] руб.<br>
		<a href="[% t.product.url %]">Купить</a><br>
[% showed_ids = showed_ids+1; LAST IF showed_ids >= 6 %]
[% END %]
```

_Пример вывода 6 последних просмотренных товаров за 24 часа, исключая повторные просмотры._

Если вы передаёте метаданные о товаре (название, ссылку и т.д.) в событии, их можно подставлять из данных событий. Необязательно использовать данные о товарах из YML-файла.

## Брошенная категория

Для вывода содержимого в рассылках сценария **Брошенная категория** используются данные события `VIEW_CATEGORY` [_Просмотр категории товара_](https://docs.sendsay.ru/ecom/how-to-configure-data-transfer/#просмотр-категории):

```
[% category_view_list = ssecquery('category_view') %]
```

Данные о каждой категории поступят в виде объекта, содержащего все поля, которые вы передавали в событии. В результате работы функции вы получите 100 последних событий. Вы можете задать временные рамки запрашиваемых событий:

```
[% ssecquery('category_view','dt','>','current - 1 day') %]
```

Для вывода товаров из категории нужно использовать данные о товарах из вашего YML-файла. Если товаров для этой категории не будет, выполнится команда `[% Cancel_Letter() %]` — письмо не отправится и завершится ошибкой.

```
[% category_view_list = ssecquery('category_view','dt','>','current - 1 day') %]
[% external_extra("ССЫЛКА_НА_ВАШ_YML","method","get","ignore_error","1","format","yml") %]
[% category_view_items = [] %]
[% FOREACH item IN yml.values() %][% IF item.categoryId == category_view_list[0].product.category_id AND item.available == 'true' %][% category_view_items.push(item) %][% END %][% LAST IF category_view_items.size() == 6 %][% END %]
[% IF category_view_items.size() < 1 %][% Cancel_Letter() %][% END %]
[% IF category_view_items.size() > 0 %]
[% FOREACH item IN category_view_items %]
		<a href="[% item.url %]"><img src="[% IF item.picture[0] %][% item.picture[0] %][% ELSE %][% item.picture %][% END %]"></a><br>
		<a href="[% item.url %]">[% item.name %]</a><br>
		[% item.price %] руб.<br>
		<a href="[% item.url %]">Купить</a><br>
[% LAST IF loop.count() == 6 %]
[% END %]
[% END %]
```

_Пример вывода товаров последней просмотренной категории._

## Товары в избранном

Для вывода всех товаров, добавленных клиентом в избранное, используются данные события `FAVORITE` [_Добавление в избранное_](https://docs.sendsay.ru/ecom/how-to-configure-data-transfer/#управление-избранным):

```
[% favorite_list = ssecquery('product_favorite') %]
```

Если вы передаёте метаданные о товаре (название, ссылку и т.д.) в событии, их можно подставлять из данных событий. Необязательно использовать данные о товарах из YML-файла.

```
[% favorite_list = ssecquery('product_favorite') %]
[% FOREACH item in favorite_list %]
		<a href="[% item.product.url %]"><img src="[% item.product.picture[0] %]"></a><br>
		<a href="[% item.product.url %]">[% item.product.name %]</a><br>
		Цена: [% item.product.price %] руб.<br>
		<a href="[% item.product.url %]">Купить</a><br>
[% END %]
```

Если нужно вывести только последний добавленный в избранное товар, используйте код:

```
[% item = ssecquery('product_favorite')[0] %]
<a href="[% item.product.url %]"><img src="[% item.product.picture[0] %]"></a><br>
<a href="[% item.product.url %]">[% item.product.name %]</a><br>
Цена: [% item.product.price %] руб.<br>
<a href="[% item.product.url %]">Купить</a>
```

## Товар появился в наличии

Для вывода содержимого в рассылках сценария **Товар появился в наличии** используются данные события `PRODUCT_ISA` [_Товар появился_](https://docs.sendsay.ru/ecom/how-to-configure-data-transfer/#добавление-обезличенных-событий).

Данные о товаре, для которого запускается триггер, передаются в специальный параметр сценария `sequence_data.event.ecom_product_isa`. Если вы передаёте метаданные о товаре (название, ссылку и т.д.) в событии, их можно подставлять из данных событий. Необязательно использовать данные о товарах из YML-файла.

Чтобы вывести товар в письмах сценария используйте код:

```
[% item = ssecquery('product_isa', 'product.id', sequence_data.event.ecom_product_isa.product_id)[0] %]
		<a href="[% item.product.url %]"><img src="[% item.product.picture[0] %]"></a><br>
		<a href="[% item.product.url %]">[% item.product.name %]</a><br>
		Цена: [% item.product.price %] руб.<br>
		<a href="[% item.product.url %]">Купить</a><br>
```

Чтобы вывести данные товара из YML-файла, используйте следующий код:

```
[% external_extra("ССЫЛКА_НА_ВАШ_YML","method","get","ignore_error","1","format","yml") %]
[% id = sequence_data.event.ecom_product_isa.product_id %]
[% IF !yml.$id %][% Cancel_Letter() %][% END %]

		<a href="[% yml.$id.url %]"><img src="[% IF yml.$id.picture[0] %][% yml.$id.picture[0] %][% ELSE %][% yml.$id.picture %][% END %]"></a><br>
		<a href="[% yml.$id.url %]">[% yml.$id.name %]</a><br>
		[% yml.$id.price %] руб.<br>
		<a href="[% yml.$id.url %]">Купить</a><br>
```

Если нужного id товара в файле не будет, выполнится команда `[% Cancel_Letter() %]`, письмо не отправится и завершится ошибкой.

Протестировать отображение данных в письме можно только через запуск триггера. <SupportLink>Напишите в чат поддержки</SupportLink>, — и мы включим режим тестирования для ваших адресов.

## Заказ оформлен

Для вывода данных о заказе в рассылках сценария **Заказ оформлен** используются данные события `ORDER` [_Заказ_](https://docs.sendsay.ru/ecom/how-to-configure-data-transfer/#действия-с-заказом).

Данные о последнем оформленном заказе передаются в специальный параметр сценария `sequence_data.event.ecom_order_placed`.

Чтобы вывести заказ в сценарии **Заказ оформлен**, используйте код:

```
[% order_list = ssecquery('order_item', 'transaction.id', sequence_data.event.ecom_order_placed.transaction_id) %]
Заказ № [% sequence_data.event.ecom_order_placed.transaction_id %] от [% date.format(order_list[0].transaction.dt,"%d.%m.%Y %T") %]<br>
[% FOREACH item in order_list %]
		<a href="[% item.product.url %]"><img src="[% item.product.picture[0] %]"></a><br>
		<a href="[% item.product.url %]">[% item.product.name %]</a><br>
		Цена: [% item.product.price %] руб.<br>
		Количество: [% item.product.qnt %] шт<br>
		Стоимость: [% item.product.price*item.product.qnt %] руб.<br>
[% END %]
```

Протестировать отображение данных в письме можно только через запуск триггера. <SupportLink>Напишите в чат поддержки</SupportLink>, — и мы включим режим тестирования для ваших адресов.

## Заказ изменен

Для вывода данных о заказе в рассылках сценария **Заказ изменен** используются данные события `ORDER` [_Заказ_](https://docs.sendsay.ru/ecom/how-to-configure-data-transfer/#действия-с-заказом) с параметром обновления `"update": 1`. _Обновление заказа_ передаётся через [Sendsay API](https://docs.sendsay.ru/ecom/how-to-configure-data-transfer/#добавление-данных-через-sendsay-api).

Данные о последнем изменённом заказе передаются в специальный параметр сценария `sequence_data.event.ecom_order_changed`.

Чтобы вывести заказ в сценарии **Заказ изменен**, используйте код:

```
[% statuses = ['Неизвестно','Оформлен','Оплачен','Принят в работу','Доставка','Присвоен трек-номер','Передан в доставку','Отправлен покупателю','Поступил в пункт-выдачи / передан курьеру','Получен','Отмена заказа','Возврат заказа','Обновление заказа'] %]

[% order_list = ssecquery('order_item', 'transaction.id', sequence_data.event.ecom_order_changed.transaction_id) %]

Заказ № [% sequence_data.event.ecom_order_changed.transaction_id %]<br>

Статус: [% statuses[$sequence_data.event.ecom_order_changed.transaction_status] %] <br>

Дата заказа [% order_list[0].transaction.dt %]<br>

Стоимость: [% order_list[0].transaction.sum %] руб.<br>

Стоимость доставки: [% order_list[0].order.delivery_price %] руб.<br>

Дата доставки: [% order_list[0].order.delivery_dt %] <br>

[% FOREACH item in order_list %]
		<a href="[% item.product.url %]"><img src="[% item.product.picture[0] %]"></a><br>
		<a href="[% item.product.url %]">[% item.product.name %]</a><br>
		Цена: [% item.product.price %] руб.<br>
		Количество: [% item.product.qnt %] шт<br>
		Стоимость: [% item.product.price*item.product.qnt %] руб.<br>
[% END %]
```

Протестировать отображение данных в письме можно только через запуск триггера. <SupportLink>Напишите в чат поддержки</SupportLink>, — и мы включим режим тестирования для ваших адресов.

## Товарные блоки

Идентификаторы товаров, полученные в результате работы нижеследующих функций, определяются автоматически на основе накопленных событий и продаж по всем пользователям. Данные о товаре (название, ссылка, стоимость и т.д.) для вывода в содержимом письма будут получены из вашего YML-файла, поэтому id товаров, передаваемых в событиях, должны совпадать с id товаров в YML-файле.

### Самые продаваемые товары (по количеству)

```
[% bestseller_count = ssecquery('bestseller_count') %]
```

Ответ приходит в виде массива объектов. Разбираем с помощью FOREACH:

```
[% bestseller_count_list = ssecquery('bestseller_count') %]
[% external_extra("ССЫЛКА_НА_ВАШ_YML","method","get","ignore_error","1","format","yml") %]
[% bestseller_count_items = [] %]
[% FOREACH item IN bestseller_count_list %][% IF yml.${item[0]} %][% bestseller_count_items.push(yml.${item[0]}) %][% END %][% END %]
[% IF bestseller_count_items.size() > 0 %]
[% FOREACH item IN bestseller_count_items %]
	<a href="[% item.url %]"><img src="[% IF item.picture[0] %][% item.picture[0] %][% ELSE %][% item.picture %][% END %]"></a><br>
	<a href="[% item.url %]">[% item.name %]</a><br>
	[% item.price %] руб.<br>
	<a href="[% item.url %]">Купить</a><br>
[% LAST IF loop.count() == 6 %]
[% END %]
[% END %]
```

Функция поддерживает фильтры по любым доступным полям в данных о товаре.
С фильтром по периоду расчета:

```
[% bestseller_count = ssecquery('bestseller_count','dt','>','current - 180 days') %]
```

### Самые продаваемые товары в категории (по количеству)

С фильтром по категории:

```
[% bestseller_count = ssecquery('bestseller_count',,'category','in',['photo','video']) %]
```

С выбором последней категории, которую просматривал подписчик:

```
[% product_category_view_list = ssecquery('category_view') %]
[% external_extra("ССЫЛКА_НА_ВАШ_YML","method","get","ignore_error","1","format","yml") %]
[% bestseller_count_product_category_list = ssecquery('bestseller_count','product.category_id',product_category_view_list[0].product.category_id) %]
[% bestseller_count_product_category_item = [] %]
[% FOREACH item IN bestseller_count_product_category_list %][% IF yml.${item[0]} %][% bestseller_count_product_category_item.push(yml.${item[0]}) %][% END %][% END %]
[% IF bestseller_count_product_category_item.size() > 0 %]
[% FOREACH item IN bestseller_count_product_category_item %]
	<a href="[% item.url %]"><img src="[% IF item.picture[0] %][% item.picture[0] %][% ELSE %][% item.picture %][% END %]"></a><br>
	<a href="[% item.url %]">[% item.name %]</a><br>
	[% item.price %] руб.<br>
	<a href="[% item.url %]">Купить</a><br>
[% LAST IF loop.count() == 6 %]
[% END %]
[% END %]
```

### Самые продаваемые товары (по выручке)

```
[% bestseller_money = ssecquery('bestseller_money') %]
```

Функция поддерживает фильтры по любым доступным полям в данных о товаре.

```
[% bestseller_money_list = ssecquery('bestseller_money') %]
[% external_extra("ССЫЛКА_НА_ВАШ_YML","method","get","ignore_error","1","format","yml") %]
[% bestseller_money_items = [] %]
[% FOREACH item IN bestseller_money_list %][% IF yml.${item[0]} %][% bestseller_money_items.push(yml.${item[0]}) %][% END %][% END %]
[% IF bestseller_money_items.size() > 0 %]
[% FOREACH item IN bestseller_money_items %]
	<a href="[% item.url %]"><img src="[% IF item.picture[0] %][% item.picture[0] %][% ELSE %][% item.picture %][% END %]"></a><br>
	<a href="[% item.url %]">[% item.name %]</a><br>
	[% item.price %] руб.<br>
	<a href="[% item.url %]">Купить</a><br>
[% LAST IF loop.count() == 6 %]
[% END %]
[% END %]
```

### Самые продаваемые товары в категории (по выручке)

С выбором последней категории, которую просматривал подписчик:

```
[% product_category_view_list = ssecquery('category_view') %]
[% external_extra("ССЫЛКА_НА_ВАШ_YML","method","get","ignore_error","1","format","yml") %]
[% bestseller_money_product_category_list = ssecquery('bestseller_money','product.category_id',product_category_view_list[0].product.category_id) %]
[% bestseller_money_product_category_item = [] %]
[% FOREACH item IN bestseller_money_product_category_list %][% IF yml.${item[0]} %][% bestseller_money_product_category_item.push(yml.${item[0]}) %][% END %][% END %]
[% IF bestseller_money_product_category_item.size() > 0 %]
[% FOREACH item IN bestseller_money_product_category_item %]
	<a href="[% item.url %]"><img src="[% IF item.picture[0] %][% item.picture[0] %][% ELSE %][% item.picture %][% END %]"></a><br>
	<a href="[% item.url %]">[% item.name %]</a><br>
	[% item.price %] руб.<br>
	<a href="[% item.url %]">Купить</a><br>
[% LAST IF loop.count() == 6 %]
[% END %]
[% END %]
```

### Самые просматриваемые товары

```
[% eyecatcher = ssecquery('eyecatcher') %]
```

Функция поддерживает фильтры по любым доступным полям в данных о товаре.

```
[% eyecatcher_list = ssecquery('eyecatcher') %]
[% external_extra("ССЫЛКА_НА_ВАШ_YML","method","get","ignore_error","1","format","yml") %]
[% eyecatcher_items = [] %]
[% FOREACH item IN eyecatcher_list %][% IF yml.${item[0]} %][% eyecatcher_items.push(yml.${item[0]}) %][% END %][% END %]
[% IF eyecatcher_items.size() > 0 %]
[% FOREACH item IN eyecatcher_items %]
	<a href="[% item.url %]"><img src="[% IF item.picture[0] %][% item.picture[0] %][% ELSE %][% item.picture %][% END %]"></a><br>
	<a href="[% item.url %]">[% item.name %]</a><br>
	[% item.price %] руб.<br>
	<a href="[% item.url %]">Купить</a><br>
[% LAST IF loop.count() == 6 %]
[% END %]
[% END %]
```

### Самые просматриваемые товары в категории

С выбором последней категории, которую просматривал подписчик:

```
[% product_category_view_list = ssecquery('category_view') %]
[% external_extra("ССЫЛКА_НА_ВАШ_YML","method","get","ignore_error","1","format","yml") %]
[% eyecatcher_category_view_list = ssecquery('eyecatcher','product.category_id',product_category_view_list[0].product.category_id) %]
[% eyecatcher_category_view_item = [] %]
[% FOREACH item IN eyecatcher_category_view_list %][% IF yml.${item[0]} %][% eyecatcher_category_view_item.push(yml.${item[0]}) %][% END %][% END %]
[% IF eyecatcher_category_view_item.size() > 0 %]
[% FOREACH item IN eyecatcher_category_view_item %]
	<a href="[% item.url %]"><img src="[% IF item.picture[0] %][% item.picture[0] %][% ELSE %][% item.picture %][% END %]"></a><br>
	<a href="[% item.url %]">[% item.name %]</a><br>
	[% item.price %] руб.<br>
	<a href="[% item.url %]">Купить</a><br>
[% LAST IF loop.count() == 6 %]
[% END %]
[% END %]
```

## Персонализация шаблона выпуска на основе данных из сегмента

Вам может понадобиться обратиться в шаблоне письма к данным событий, которые вызвали попадание пользователя в сегмент выпуска.

Для этого:

- первым элементом сегмента должен быть условие по событиям модуля **Продажи** (`stat.uni` по `ssec_*`). Именно его совпавшие строки используются для передачи в переменную `anketa.ssec_*`,
- в условиях сегмента могут быть другие условия `stat.uni`/`!stat.uni с ssec_*` - они дадут только дополнительную фильтрацию, но не данные для персонализации.

Для доступа к данным в шаблоне письма используем переменные:

```
[% anketa.ssec_order %]
[% anketa.ssec_category_view %]
[% anketa.ssec_basket %]
[% anketa.ssec_product_view  %]
[% anketa.ssec_product_search %]
[% anketa.ssec_product_price %]
[% anketa.ssec_product_isa %]
[% anketa.ssec_product_favorite %]
[% anketa.ssec_product_preorder %]
```
