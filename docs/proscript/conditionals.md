---
sidebar_position: 4
---

# Условные выражения в PROScript

## IF / ELSIF / ELSE
```
[% IF anketa.base.name %]
   [% anketa.base.name %]
[% END %]

[% IF !anketa.base.name %]
   шаблонное значение #выводим если anketa.base.name не заполнено
[% END %]
```

Можно объединять несколько выражений с помощью ELSIF и/или ELSE:
```
[% IF anketa.base.age < 10 %]
   Привет [% anketa.base.name %], твоя мама знает, что ты играешь в интернете?
[% ELSIF anketa.base.age < 18 %]
   Извините, вы слишком малы для покупки алкоголя
[% ELSE %]
   Добро пожаловать[% anketa.base.name %]!
[% END %]
```

Для сравнения можно использовать следующие операторы:
```
== != < <= > >= && || ! and or not
```
Условия также могут быть составными:
```
[% IF (name == 'admin' || uid <= 0) && mode == 'debug' %]
   I'm confused.
[% ELSIF more > less %]
   That's more or less correct.
[% END %]
```
В зависимости от условия можно выводить разные ссылки:
```
[% IF условие %]
<a href="example.com" текст ссылки >
[% ELSE %]
<a href="example-2.com" другой текст ссылки >
[% END %]
```
А можно внутри одной ссылки подставлять разные адреса:
```
<a href="[% IF условие %] example.com [% ELSE %] example-2.com [% END %] " текст ссылки >
```

## SWITCH / CASE
В некоторых случаях может быть удобнее использовать конструкцию SWITCH/CASE:
```
[% SWITCH anketa.base.city %]
[%   CASE "Воронеж" %]
       ...
[%   CASE ["Москва", "Петербург"] %]
       ...
[%   CASE someobject.keys() %]
       ...
[%   CASE DEFAULT %]
       ...
[% END %]
```