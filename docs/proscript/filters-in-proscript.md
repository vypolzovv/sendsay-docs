---
sidebar_position: 5
sidebar_label: 'Фильтры (модификаторы)'
---

# Фильтры (модификаторы) в PROScript

Фильтры служат для модификации значения строковых переменных или других строковых данных

## upper

Переводит значение в верхний регистр

```
[% "hello world" | upper %]
```

```
HELLO WORLD
```

## lower

Переводит значение в нижний регистр

```
[% "Hello World" | lower %]
```

```
hello world
```

## ucfirst

Переводит первый символ строки в верхний регистр

```
[% "hello" | ucfirst %]
```

```
Hello
```

## lcfirst

Переводит первый символ строки в нижний регистр

```
[% "HELLO" | lcfirst %]
```

Output:

```
hELLO
```

## trim

Удаляет пробелы с конца и начала строки

```
[% " hello " | trim %]
```

```
hello
```

## repeat

Повторяет значение переменной указанное число раз

```
[% "hello" | repeat(2) %]
```

```
hellohello
```

## replace

Находит все вхождения в строке в соответствии с регулярным выражением и заменяет их на указанное значение

```
[% "The  cat  sat  on  the  mat" | replace('\s+', '_') %]
```

```
The_cat_sat_on_the_mat
```

## remove

Находит все вхождения в строке в соответствии с регулярным выражением и удаляет их

```
[% "The  cat  sat  on  the  mat" FILTER remove('\s+') %]
```

```
Thecatsatonthemat
```

## mark_raw

Позволяет вывести в шаблон содержимое переменной, содержащую HTML-теги без конвертации в html-entites

```
[% "<b>hello</b>" | mark_raw %]
```

## uri

URI конвертирует все символы строки, которые находятся вне списка разрешенных URI-символов (в соответствии с RFC 3986). URI корректно кодирует все зарезервированные символы, включая &, @, /, ;, :, =, +, ? и $. Этот фильтр обычно нужен для модификации значений GET-параметров ссылки.

```
[% path  = 'http://tt2.org/example'
   back  = '/other?foo=bar&baz=bam'
   title = 'Earth: "Mostly Harmless"'
%]
<a href="[% path %]?back=[% back | uri %]&title=[% title | uri %]">
```

```
<a href="http://tt2.org/example?back=%2Fother%3Ffoo%3Dbar%26
baz%3Dbam&title=Earth%3A%20%22Mostly%20Harmless%22">link</a>
```

## url

Данный фильтр не такой агрессивный как URI и не трогает символы &, @, /, ;, :, =, +, ? and $.

## null

Данный фильтр не выводит ничего.

## truncate

```
[% FILTER truncate(21) %]
I have much to say on this matter that has previously
been said on more than one occasion.
[% END %]
```

```
I have much to sa...
```
