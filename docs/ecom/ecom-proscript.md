---
sidebar_position: 4
sidebar_label: 'Шаблонизатор PROScript'
---

# Шаблонизатор PROScript

## Брошенная корзина

Данные о корзине можно получить следующей функцией:

```html
[% basket_list = ssecquery('basket') %]
```

Данные о корзине придут в шаблонизатор в объекте:

<!-- prettier-ignore -->
```js
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

Если вы передаете метаданные о товаре (название, ссылка и т.д.) в событии, то вам не нужно использовать данные о товарах из вашего YML-файла.

Чтобы вывести информацию о всех товарах в корзине можно использовать код:

```
[% basket_list = ssecquery('basket') %]
[% FOREACH item in basket_list[0].items %]
		<a href="[% item.product.url %]"><img src="[% item.product.picture[0] %]"></a><br>
		<a href="[% item.product.url %]">[% item.product.name %]</a><br>
		Цена: [% item.product.price %] руб.<br>
		Количество: [% item.product.qnt %] шт<br>
		Стоимость: [% item.product.price*item.product.qnt %] руб.<br>
		<a href="[% t.product.url %]">Купить</a><br>
[% END %]
```

## Брошенный просмотр

Для вывода содержимого в рассылках сценария «Брошенный просмотр» используем данные событий «просмотр карточки товара»:

```
[% product_view_list = ssecquery('product_view') %]
```

Данные о каждом товаре придут в виде объекта, содержащего все поля.
Если вы передаете метаданные о товаре (название, ссылка и т.д.) в событии, то вам не нужно использовать данные о товарах из вашего YML-файла.
В результате работы функции вы получите 100 последних событий. Вы можете задать временные рамки запрашиваемых событий:

```
[% ssecquery('product_view','dt','>','current - 2 hours') %]
```

Также вы можете ограничить число отображаемых событий (товаров) напрямую в шаблоне (в примере будет выведено 6 последних просмотренных товаров за 2 часа):

```
[% product_view_list = ssecquery('product_view','dt','>','current - 2 hours') %]
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

## Брошенная категория

Для вывода содержимого в рассылках сценария «Брошенный просмотр категории» используем список последних посещенных страниц категорий товаров:

```
[% category_view_list = ssecquery('category_view') %]
```

Данные о каждой категории придут в виде объекта, содержащего все поля, которые вы передавали в событии.
В результате работы функции вы получите 100 последних событий. Вы можете задать временные рамки запрашиваемых событий:

```
[% ssecquery('category_view','dt','>','current - 1 day') %]
```

Для вывода товаров из категории нужно использовать данные о товарах из вашего YML-файла. В примере будут показаны товары последней просмотренной категории. Если товаров для этой категории не будет, письмо не выйдет (завершится ошибкой).

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
