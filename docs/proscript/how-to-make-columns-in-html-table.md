---
sidebar_position: 9
---

# Как сделать N колонок в HTML-таблице

```
[% array = ['q1','q2','q3','q4','q5','q6','q7'] %]

[% i=1 %]

[% count = 3 %]

<table border=1>

[% FOREACH ar IN array %]

	[% IF i == 1 %]

  		<tr>

    [% END %]

	<td>[% ar %]</td>

	[% IF i == count %]</tr>[% i=1 %]

	[% ELSIF i < count AND loop.last() %]

	[% x = i %]

	[% WHILE x < count %]

		<td></td>

		[% x=x+1 %]

	[% END %]

	</tr>

	[% ELSE %][% i=i+1 %]

	[% END %]

[% END %]

</table>
```
