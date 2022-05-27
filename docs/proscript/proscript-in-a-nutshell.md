---
sidebar_position: 1
---

# Что такое PROScript

PROScript — язык шаблонизатора. Для указания команд языка используются тэги `[% ... %]`.

## Доступ к переменным
Доступ к скалярным переменным: 
```
[% var %] 
[% $var %]
```

Доступ к полям: 
```
[% var.0 %] 
[% var.field %] 
[% var.$field %]
```
Значения переменных могут быть хэшем, ссылками на массивы или объектами. 

Если $var - экземпляр объекта, можно вызывать методы:
```
[% $var.method() %] 
[% $var.method(1, 2, 3) %] 
[% $var.method(foo => [1, 2, 3]) %] 
[% $var.method({ foo => 'bar' }) %]
```

## Выражения 

### Циклы
``` 
[% FOREACH item IN arrayref %] 
   [% item %] 
[% END %]
```

```
 [% FOREACH item IN arrayref %] 
        [%- IF loop.is_first -%] 
            <first> 
        [%- END -%] 
        * [% loop.index %]  # 0 origin 
        * [% loop.count     #loop.index + 1 %] 
        * [% loop.body      # alias toarrayref %] 
        * [% loop.size      #loop.body.size %] 
        * [% loop.max_index # loop.size- 1 %] 
        * [% loop.peek_next #loop.body[ loop.index + 1 ] 
        * [% loop.peek_prev #loop.body[ loop.index - 1 ] 
        [%- IF loop.is_last -%] 
            <last> 
        [%- END -%] 
[% END %] 
```
FOREACH не принимает объекты, поэтому их следует преобразовать в массив (объект класса Array)  при помощи методов keys(), values() или kv(). Также поддерживаются директивы для управления циклом NEXT и LAST.

### Условные выражения
```
[% IF logical_expression %] 
        Case 1 
[% ELSIF logical_expression %] 
        Case 2 
[% ELSE %] 
        Case 3 
[% END %]
```

```
[% UNLESS logical_expression %] 
        Case 1 
[% ELSE %] 
        Case 2 
[% END %]
```

```
[% SWITCH expression %] 
    [% CASE case1 %] 
        Case 1 
    [% CASE case2 %] 
        Case 2 
    [% CASE DEFAULT %] 
        Case 3 
[% END %]
```

Условные выражения в PROScript (ссылка)

### Функции и фильтры
```
    [% var | f %] 
    [% f(var)  %]
```

### Виртуальные методы
```
[% a.size() %]
[% a.join(", ") %]
[% a.reverse() %]
[% h.size() %]
[% h.keys() %]
[% h.values() %]
[% h.kv() %]
```
   