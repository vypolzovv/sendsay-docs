---
sidebar_position: 5
---

# Обработка даты в PROScript

В шаблоне письма можно работать как с текущей датой, так и с датой переданной из анкетных данных получателя письма.

По умолчанию при отсутствующем шаблоне форматирования даты мы пытаемся нормализовать входную строку в необходимый для работы формат даты и времени.

Временная зона по умолчанию — Europe/Moscow

## datetime()
Получение из строки объекта типа датавремя:
```
[% dt = datetime('2008-05-30 00:00:00','pattern' => '....', 'time_zone' => ...., ......) %]
```
## datetime_now()
Получаем текущую дату:
```
[% dt = datetime_now('time_zone' => ...., ......) %]
```
## date.format()
Форматируем дату в нужный формат
```
[% d = date.format(datetime_now(),"%m%d","en_EN.UTF-8") %]
```
если надо взять дату из анкеты:
```
[% dt = datetime(anketa.foo.bar)%]
[% dt = date.format(dt,"%m%d","en_EN.UTF-8") %]
```

## Шаблоны форматирования даты
```
%%      PERCENT
%a      day of the week abbr
%A      day of the week
%b      month abbr
%B      month
%c      MM/DD/YY HH:MM:SS
%C      ctime format: Sat Nov 19 21:05:57 1994
%d      numeric day of the month, with leading zeros (eg 01..31)
%e      like %d, but a leading zero is replaced by a space (eg  1..32)
%D      MM/DD/YY
%G      GPS week number (weeks since January 6, 1980)
%h      month abbr
%H      hour, 24 hour clock, leading 0's)
%I      hour, 12 hour clock, leading 0's)
%j      day of the year
%k      hour
%l      hour, 12 hour clock
%L      month number, starting with 1
%m      month number, starting with 01
%M      minute, leading 0's
%n      NEWLINE
%o      ornate day of month -- "1st", "2nd", "25th", etc.
%p      AM or PM 
%P      am or pm (Yes %p and %P are backwards :)
%q      Quarter number, starting with 1
%r      time format: 09:05:57 PM
%R      time format: 21:05
%s      seconds since the Epoch, UCT
%S      seconds, leading 0's
%t      TAB
%T      time format: 21:05:57
%U      week number, Sunday as first day of week
%w      day of the week, numerically, Sunday == 0
%W      week number, Monday as first day of week
%x      date format: 11/19/94
%X      time format: 21:05:57
%y      year (2 digits)
%Y      year (4 digits)
%Z      timezone in ascii. eg: PST
%z      timezone in format -/+0000
```

%d, %e, %H, %I, %j, %k, %l, %m, %M, %q, %y и %Y могут быть выведены в виде римских цифр с помощью префикса O, например %OY выведет год римскими цифрами.

## Изменение даты перед использованием
Иногда нужно вывести не конкретную дату, а ее измененное значение. Для этого вы можете добавить к имеющейся дате необходимые периоды времени:
```
[% date.format(datetime_now().add("years","+7")) %]
[% date.format(datetime_now().add("months","+7")) %]
[% date.format(datetime_now().add("days","+7")) %]
[% date.format(datetime_now().add("hours","+7")) %]
[% date.format(datetime_now().add("minutes","+7")) %]
[% date.format(datetime_now().add("seconds","+7")) %]
```
Чтобы отнять период:
```
[% date.format(datetime_now().add("days","-7")) %]
```
Использовать дату выпуска, как базовую дату:
```
[% date.format(datetime(param.issue.dt).add("days","+7"),"%d.%m.%Y") %]
```
Использовать анкетные данные, как базовую дату:
```
[% date.format(datetime(anketa.a917.q904).add("days","+7"),"%d.%m.%Y") %]
```
## format_datetime_duration(dta,dtb)
Иногда требуется сравнить две даты и получить интервал. 
```
[% format_datetime_duration(dta,dtb) %]

[% format_datetime_duration(dta,dtb,"format":"FMT") %]
```
Перед вами могу стоять две задачи: просто посчитать интервал с нужной точностью или вывести полученный интервал с желаемым форматированием. 

Вначале разберемся с форматированием результата сравнения.

В примерах использованы значения
```
[% dta = "2018-02-26T15:13:00" %]
[% dtb = "2018-02-05 12:11:58" %] <---- наличие T без разницы
```
Форматирование задается в в параметре **format** и может быть двух типов:

*строка* - один из предустановленых форматов описанных ниже

*массив* - от одного до четырёх элементов задающих, что приписать справа после компоненты времени

длительность в секундах
```
[ s ]
```
длительность в секундах и минутах
```
[ m, s ]
```
длительность в секундах, минутах и часах
```
[ h, m, s ]
```
длительность в секундах, минутах, часах и днях
```
[ D, h, m, s ]
```
Если элемент есть, но не определён, то соответствующий компонент не выводится:

длительность в минутах, часах и днях
```
[ D, h, m, undef ]
```
Первый выводимый компонент идёт без лидирующего нуля, остальные - с лидирующим нулём.

Если элемент не строка, а массив, то включается учёт множественного числа, а массив должен содержать формы слова для одного, двух и пяти штук это компонента времени.

С примерами будет гораздо проще понять как все работает.

## Формат отсутствует

На самом деле действует следующий формат:
```
 [' ',':',':','']
21 03:01:02
```
## Склоняем полученный результат             
```
'plural_Ds' => [[" день "," дня "," дней "],[" час "," часа "," часов "],[" минута "," минуты "," минут "],[" секунда "," секунды ","секунд"]]

'plural_Dm' => [[" день "," дня "," дней "],[" час "," часа "," часов "],[" минута "," минуты "," минут "],undef]

'plural_Dh' => [[" день "," дня "," дней "],[" час "," часа "," часов "],undef,undef]

'plural_hs' => [[" час "," часа "," часов "],[" минута "," минуты "," минут "],[" секунда "," секунды "," секунд"]]

'plural_hm' => [[" час "," часа "," часов "],[" минута "," минуты "," минут "],undef]
```

```
[% format_datetime_duration(dta,dtb,"format","plural_Ds") %]

21 день 03 часа 01 минута 02 секунды
```

```
[% format_datetime_duration(dta,dtb,"format","plural_hm") %]

507 часов 01 минута
```

## Выводим аббревиатуры вместо полных слов        
```
'abbr_Ds' => [ ' д ',' ч ',' м ',' c' ]
'abbr_Dm' => [ ' д ',' ч ',' м ',undef]
'abbr_Dh' => [ ' д ',' ч ',undef,undef]
'abbr_hs' => [       ' ч ',' м ',' c' ]
'abbr_hm' => [       ' ч ',' м ',undef]
```

```
[% format_datetime_duration(dta,dtb,"format","abbr_Dh") %]

21 д 03 ч
 ```

## Выводим аббревиатуры слитно с числами             
```
'abbr_tog_Ds' => [ 'д ','ч ','м ' ,'c'  ]
'abbr_tog_Dm' => [ 'д ','ч ','м ' ,undef]
'abbr_tog_Dh' => [ 'д ','ч ',undef,undef]
'abbr_tog_hs' => [      'ч ','м ' ,'c'  ]
'abbr_tog_hm' => [      'ч ','м ' ,undef]
```

```
[% format_datetime_duration(dta,dtb,"format","abbr_tog_Dh") %]

21д 03ч
```

А теперь переходим к задаче определить интервал с нужной точностью. Для этого нам надо привести в нужный формат исходные даты и вывести интервал с нужным форматированием.

## Определяем разницу в днях
```
[% today = date.format(datetime_now(),"%Y-%m-%d","en_EN.UTF-8") %]

[% period = format_datetime_duration(suspend_date,today,"format", ['',undef,undef,undef]) %] 

[% IF period == 3 %]срок три дня [% END %]
```