---
sidebar_position: 3
---

# Обработка циклов в PROScript

## FOREACH

Для обработки массивов предназначен FOREACH.
Для того, чтобы с помощью FOREACH проитерировать объект, вам надо с помощью методов keys() или values() создать массивы ключей или значений вашего объекта.

```
[% FOREACH i IN items %]
   [% i %]
[% END %]
```

Директива NEXT стартует новую итерацию, пропуская все команды после себя:

```
[% FOREACH user IN userlist %]
   [% NEXT IF user.isguest %]
   Name: [% user.name %]    Email: [% user.email %]
[% END %]
```

LAST может использоваться для выхода из цикла. Есть синоним — BREAK.

```
[% FOREACH match IN results.nsort('score').reverse %]
   [% LAST IF match.score < 50 %]
   [% match.score %] : [% match.url %]
[% END %]
```

Для упрощения работы внутри оператора FOREACH доступна переменная loop со следующими методами:

```
size()      количество элементов в массиве
max()       индекс последнего элемента (size - 1)
index()     индекс текущей итерации от 0 до max()
count()     счетчик итераций от 1 до size() (т.е. index() + 1)
first()     true если текущая итерация первая
last()      true если текущая итерация последняя
prev()      возвращает предыдущий элемент в массиве
next()      возвращает следующий элемент в массиве
```

Пример:

```
[% FOREACH item IN [ 'foo', 'bar', 'baz' ] %]
   [%- "<ul>\n" IF loop.first %]
   <li>[% loop.count %]/[% loop.size %]: [% item %]
   [%- "</ul>\n" IF loop.last %]
[% END %]
```

Вывод:

```
<ul>
<li>1/3: foo
<li>2/3: bar
<li>3/3: baz
</ul>
```

## WHILE

WHILE используется для повторяющегося выполнения списка команд до тех пор пока условное выражение отдает true.

```
[% WHILE total < 100 %]
   ...
   [% total = calculate_new_total %]
[% END %]
```
