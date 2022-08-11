---
sidebar_position: 6
---

# Виртуальные методы в PROScript

## Виртуальные методы для работы со строками

### list

Возвращает значение как массив из одного элемента

```
[% 'qwerty'.list().size() %]  # вернет 1
```

### hash

```
[% dump('aaaa'.hash()) %]
```

```
{ "value" : "aaaa" }
```

### length

Возвращает длину строки

```
[% 'aaaa'.length() %] #вернет 4
```

### size

Всегда возвращает 1 для строковых пеерменных

### defined

Возвращает true, если переменная определена

### match

Находит в строке вхождения, соответствующие регулярному выражению

```
[% name = 'Larry Wall' %]
[% matches = name.match('(\w+) (\w+)') %]
[% matches.1 %], [% matches.0 %]    # Wall, Larry
```

Если совпадений не найдено, то вернется **false**:

```
[% "We're not worthy!" IF name.match('Larry Wall') %]

[% IF (matches = name.match('(\w+) (\w+)')) %]
   pattern matches: [% matches.join(', ') %]
[% ELSE %]
   pattern does not match
[% END %]
```

### repeat

Повторяет строку указанное число раз

```
[% name = 'foo' %]
[% name.repeat(3) %]        # foofoofoo
```

### replace

Заменяет в строке все найденные по регулярному выражению подстроки на указанное значение

```
[% name = 'foo, bar & baz' %]
[% name.replace('\W+', '_') %]        # foo_bar_baz
```

### remove

Удаляет из строки все вхождения, соответствующие указанному регулярному выражению

```
[% name = 'foo, bar & baz' %]
[% name.remove('\W+') %]    # foobarbaz
```

### split

Конвертирует строку в массив из строк, разделяя по указанному символу

```
[% dump('2018-09-06'.split('-')) %]
```

```
[ "2018", "09", "06" ]
```

### chunk

Конвертирует строку в массив строк, разделяя на строки указанного размера

```
[% ccard_no = "1234567824683579";
   ccard_no.chunk(4).join()
%]
```

```
1234 5678 2468 3579
```

### substr

Возвращает подстроку указанной длины, начиная с указанной позиции

```
[% str 'foo bar baz wiz waz woz') %]
[% str.substr(4, 3) %]    # bar
```

## Виртуальные методы для работы с массивами

- item
- list
- hash
- push
- pop
- unshift
- shift
- max
- size
- defined
- first
- last
- reverse
- grep
- join
- sort
- nsort
- unique
- import
- merge
- slice
- splice

## Виртуальные методы для работы с объектами

- item
- hash
- size
- each
- keys
- values
- items
- pairs
- list
- exists
- defined
- delete
- import
- sort
- nsort
