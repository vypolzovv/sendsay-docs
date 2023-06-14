---
sidebar_position: 8
sidebar_label: 'Обработка данных в YML-файле'
---

# Обработка и вывод данных из YML-файла

При реализации таких сценариев как "Брошенная корзина", "Брошенный просмотр" и т.д. сведения о товарах выводятся в письме на основе данных, содержащихся в подключенном к аккаунту YML-файле.

Для подключения к шаблонизатору данных из YML-файла используется вызов подключения внешних данных, в котором необходимо указать url с yml-файлом, который был подключен к вашему аккаунту.

```
[% external_extra("YOUR_YML_URL","format","yml") %]
```

Все содержимое YML-файла доступно в объекте yml:

```
[% yml %]
```

Пример описания товара из YML-файла:

<!-- prettier-ignore -->
```html
<offer id="123" type="vendor.model" available="true" bid="1" group_id="136010368">
  <url>http://www.xxxxxx.ru/xxxx</url>
  <price>1749.0000</price>
  <currencyId>RUR</currencyId>
  <caategoryId>490</categoryId>
  <market_category>Дом и дача/Дом и интерьер/Текстиль Шторы</market_category>
 <picture>http://media.xxxxx.xx/products/641by641/13/60/10/XXXXXXXXXXXXXX.jpg</picture>
  <delivery>true</delivery>
  <local_delivery_cost>0</local_delivery_cost>
  <typePrefix>Шторы, занавески</typePrefix>
  <vendor>La Interieurs</vendor>
  <vendorCode>136010368</vendorCode>
  <model>Занавеска с вышивкои по низу</model>
  <description>- Качество VALEUR SURE. Качественная отделка. Со сборкои 60 мм (3 варианта высоты). 91% полиэстера, 9% льна. Красивая вышивка по низу. Простои уход: стирка при 40°, не нужно гладить. Расстояние от отделки до низа 30 см (для размеров 240 и 260 см). Размер в см.</description>
  <sales_notes>Минимальный заказ 1500 руб</sales_notes>
  <manufacturer_warranty>true</manufacturer_warranty>
  <param name="country_of_origin">Франция</param>
  <param name="Пол">OTHER</param>
  <param name="Возраст">OTHER</param>
  <param name="Цвет">белый</param>
  <param name="Размер" unit="FR">240 x 175 см</param>
</offer>
```

Прямой доступ к элементам оcуществляется по значение параметра id из тега offer:

```
[% id = 123 %]
[% dump(yml.$id) %]
```

Параметры товара доступны как свойства основного объекта:

```
[% id = 123 %]

[% yml.$id.model %]

[% yml.$id.description %]

[% yml.$id.param.Razmer %]

[% yml.$id.param.Razmer_unit %]
```

Параметр picture в YML-файле может содержать как одно изображение, так и несколько и, следовательно, у нас это может быть строка или массив. Если вам надо вывести одно изображение из списка доступных, то можно использовать следующий код:

```
[% IF yml.$id.picture[0] %] [% yml.$id.picture[0] %] [% ELSE %] [% yml.$id.picture %] [% END %]
```

:::tip Важно
Код в примере отформатирован для удобства восприятия. Если вам надо вставить значение в параметр в HTML-теге (например src в теге img), то вам необходимо удалить все пробелы между командами и переносы строк.
:::

## Вывод данных, собранных для сценария «Брошенная корзина»

```
[% external_extra('YOUR_URL','format','yml') %]
[% counter = 0 %]
[% FOREACH item IN anketa.sendsay_basket.items.values() %]
   [% id = item.id %]
   [% IF yml.$id %]
      <a href="[% yml.$id.url %]">[% yml.$id.model %]</a><br>
      [% yml.$id.price %]
      [% counter = counter + 1 %]
   [% END %]
[% END %]
[% IF counter == 0 %]
   [% Cancel_Letter() %]
[% END %]
```

## Вывод данных, собранных для сценария «Брошенный просмотр»

Вывести три последних просмотренных товара:

```
[% external_extra('YOUR_URL','format','yml') %]
[% FOREACH ymldata IN anketa.sendsay_pageviews %]
   [% IF ymldata.ymlurl == 'YOUR_URL' %]
      [% FOREACH id IN ymldata.last10 %]
         <a href="[% yml.$id.url %]">[% yml.$id.model %]</a><br>
         [% yml.$id.price %]
         [% LAST IF loop.count() == 3 %]
      [% END %]
   [% END %]
[% END %]
```

## Найти и вывести товары из той же категории с похожей ценой

```
[% product_id = 123 %]

<!-- Поиск трех первых похожих товаров -->
[% external_extra('YOUR_URL','format','yml') %]
[% user_yml_prod = yml.$product_id %]
[% suggested = [] %]

<!-- Переносы строк и пробелы в данном FOREACH убраны т.к. они выдаются в результирующее письмо увеличивая его размер в разы -->
[% FOREACH item IN yml.values() %][% IF item.categoryId == user_yml_prod.categoryId AND item.available == 'true' AND item.price > user_yml_prod.price AND item.price < user_yml_prod.price*1.5 %][% suggested.push(item) %][% END %][% LAST IF suggested.size() == 3 %][% END %]
[% IF suggested.size() == 3 %]
	[% FOREACH item IN suggested %]
		<img src="[% IF item.picture[0] %][% item.picture[0] %][% ELSE %][% item.picture %][% END %]" />
		<a href="[% item.url %]">[% item.model %]</a><br>
		[% item.price %]
	[% END %]
[% END %]
```

## Найти и вывести товары из указанной категории

```
[% product_cat_id = 123 %]

<!-- Поиск трех первых товаров из указанной категории -->
[% external_extra('YOUR_URL','format','yml') %]
[% suggested = [] %]

<!-- Переносы строк и пробелы в данном FOREACH убраны т.к. они выдаются в результирующее письмо увеличивая его размер в разы -->
[% FOREACH item IN yml.values() %][% IF item.categoryId == product_cat_id AND item.available == 'true' %][% suggested.push(item) %][% END %][% LAST IF suggested.size() == 3 %][% END %]
[% IF suggested.size() == 3 %]
	[% FOREACH item IN suggested %]
		<img src="[% IF item.picture[0] %][% item.picture[0] %][% ELSE %][% item.picture %][% END %]" />
		<a href="[% item.url %]">[% item.model %]</a><br>
		[% item.price %]
	[% END %]
[% END %]
```
