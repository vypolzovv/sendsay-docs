---
sidebar_position: 11
sidebar_label: 'Ленты новостей'
---

# Ленты новостей

## Все новости ленты по порядку

```
<h1>Свежие новости ленты "[% lenta.name %]"</h1>

[% FOREACH news IN lenta.news %]

<p>
<a name="news_[% news.n %]"></a>
[% IF news.title == "" %]
[% IF news.link != "" %]
<a href="[% news.link %]"><b>[% news.link %]</b></a><br />
[% END %]
[% ELSE %]
[% IF news.link == "" %]
<b>[% news.title %]</b><br />
[% ELSE %]
<a href="[% news.link %]"><b>[% news.title %]</b></a><br />
[% END %]
[% END %]
<small>[% news.dt %]
[% IF news.author %] &ndash; [% news.author %][% END %]
[% SET srcid = news.source %]a
[% SET src = lenta.sources.$srcid %]
&ndash; [% src.title %]
</small><br />
[% IF news.content %]
[% news.content | raw %]
[% END %]
</p>
<div style="clear:both"></div>

[% END %]
```

## Все новости ленты c оглавлением и группировкой по источникам

```
<h1>Свежие новости ленты "[% lenta.name %]"</h1>

[% IF lenta.sources_order.size() > 1 %]
<ul>
[% FOREACH srcid IN lenta.sources_order %]
 [% SET src = lenta.sources.$srcid %]
 <li> [% src.news.size() %] - <a href="#src_[% srcid %]">[% src.title %]</a>
[% END %]
</ul>
[% END %]

[% FOREACH srcid IN lenta.sources_order %]

<a name="src_[% srcid %]"></a>
[% SET src = lenta.sources.$srcid %]
[% IF src.link == "" %]
<h2>[% src.title %] ([% src.news.size() %])</h2>
[% ELSE %]
<h2><a href="[% src.link %]"><b>[% src.title %]</b></a> ([% src.news.size() %])</h2>
[% END %]

[% FOREACH newsid IN src.news %]
[% SET news = lenta.news[$newsid] %]

<p>
<a name="news_[% news.n %]"></a>
[% IF news.title == "" %]
[% IF news.link != "" %]
<a href="[% news.link %]"><b>[% news.link %]</b></a><br />
[% END %]
[% ELSE %]
[% IF news.link == "" %]
<b>[% news.title %]</b><br />
[% ELSE %]
<a href="[% news.link %]"><b>[% news.title %]</b></a><br />
[% END %]
[% END %]
<small>[% news.dt %]
[% IF news.author %] &ndash; [% news.author %][% END %]
</small><br />
[% IF news.content %]
[% news.content | raw %]
[% END %]
</p>
<div style="clear:both"></div>

[% END %]
[% END %]
```
