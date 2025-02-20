---
sidebar_position: 1
sidebar_label: 'Как отправить рассылку'
---

import additionalSettings from '/img/email-campaigns/create-your-campaign/how-to-send-email-campaign/additional-settings.png';

# Как отправить массовую email-рассылку

Выпуск рассылки — это письмо, отправленное группе подписчиков.

Чтобы создать выпуск, зайдите в раздел **Рассылки → Выпуски**, нажмите «Создать выпуск» и выберите тип «Email».

![How to create email campaign](/img/email-campaigns/create-your-campaign/how-to-send-email-campaign/how-to-create-campaign.gif) <br/>

Подготовка выпуска к отправке проходит в шесть шагов:

### 1. Выберите получателей рассылки

Чтобы отправить выпуск, определите, откуда брать контакты получателей:

- из [списка](https://docs.sendsay.ru/subscribers/lists-and-segments/what-is-list) или [сегмента](https://docs.sendsay.ru/subscribers/lists-and-segments/what-is-segment),
- из [файла](https://docs.sendsay.ru/subscribers/import-and-export/how-to-prepare-file-for-import).

Если вы хотите приложить ссылку на файл с контактами, выберите последний в выпадающем списке пункт «Адрес из файла (Экспресс-выпуск)». Все адреса в файле должны быть подтверждёнными.

![Express campaign](/img/email-campaigns/create-your-campaign/how-to-send-email-campaign/express-campaign.gif) <br/>

На этом шаге вы также можете ограничить получателей рассылки:

- не отправлять выпуск тем подписчикам, кто получает слишком много писем,
- исключить выбранный список контактов,
- указать количество или процент получателей от общей аудитории.

:::tip Важно
При отправке выпуска система автоматически исключит:

- контакты, отписавшиеся от всех рассылок,
- участников стоп-листа «Заблокированные вручную»,
- недоступные для рассылок (несуществующие) адреса.
  :::

### 2. Настройте содержимое

Письмо можно создать тремя способами:

- собрать из готовых элементов в блочном редакторе,
- написать код в HTML-редакторе,
- создать письмо на основе шаблона или загрузить HTML-код в галерею шаблонов.<br/><br/>
  ![HTML or gallery](/img/email-campaigns/create-your-campaign/how-to-send-email-campaign/html-or-gallery.png) <br/>

[Как создать письмо в блочном редакторе](https://docs.sendsay.ru/email-campaigns/create-your-campaign/drag-and-drop-editor) <br/>
[Как загрузить HTML-шаблон](https://docs.sendsay.ru/email-campaigns/create-your-campaign/how-to-upload-html-template) <br/>

К рассылке можно добавить текстовую и AMP-версии письма. Текстовая версия — это письмо без картинок, шрифтов и ссылок. Подписчик увидит такую версию рассылки, если из-за почтового клиента невозможно отобразить HTML-версию.

AMP-версия отличается от обычного выпуска интерактивными элементами, которые позволяют получателям взаимодействовать с контентом в рассылке без перехода на сайт.

[Что такое AMP-рассылка](https://docs.sendsay.ru/email-campaigns/create-your-campaign/amp-campaign) <br/>

К одному письму можно прикрепить до десяти файлов (каждый не более 5 Мб). Содержимое выпуска можно персонализировать — например, обратиться к подписчикам по имени или учесть в рассылке другие данные подписчика.

[Как персонализировать рассылку](https://docs.sendsay.ru/email-campaigns/personalization/how-to-personalize-campaign) <br/>

### 3. Выберите отправителя и тему

[Отправитель](https://docs.sendsay.ru/faq/checklist#-адрес-и-имя-отправителя) — это имя и электронный адрес, от которых подписчикам приходят рассылки. При создании аккаунта отправителем автоматически становится почта, на которую зарегистрирован аккаунт.

:::tip Важно
В качестве отправителей нельзя использовать бесплатные адреса на [Mail.ru](https://mail.ru/), [Gmail.com](https://gmail.com/) и [Yandex.ru](http://yandex.ru/), потому что это противоречит DMARC-политикам этих доменов и нашей антиспам-политике.
:::

### 4. Отправьте себе тестовую копию

Тестовая копия письма покажет, как письмо отображается в разных почтовых сервисах и клиентах, — каждый делает это немного по-своему.

Чтобы убедиться, что письмо выглядит именно так, как вы ожидаете, заведите ящики на основных доменах (Яндекс, Mail, Gmail) и отправьте себе несколько тестовых копий. На бесплатных аккаунтах можно отправить только одну тестовую копию — на почту, на которую зарегистрирован аккаунт.

![Test copy](/img/email-campaigns/create-your-campaign/how-to-send-email-campaign/test-copy.png) <br/>

### 5. Укажите дополнительные настройки (опционально)

<p align="center">
  <img width="50%" src={additionalSettings} alt="Additional settings" />
</p>

- **Отслеживать клики в Google Analytics и Яндекс Метрике**: UTM-метки нужны для анализа поведения подписчиков, карты кликов и эффективности рассылки в Google Analytics и Яндекс Метрике.

  [Как добавить UTM-метки в письмо](https://docs.sendsay.ru/email-campaigns/settings/how-to-add-utm) <br/>

- **Передавать дополнительные данные**: с помощью этого пункта можно настроить передачу дополнительных данных для персонализации веб-страниц для подписчика.

- **Прикреплять изображения из шаблона к письму при отправке**: таким образом получатели могут просматривать письма офлайн или в почтовых клиентах, где установлены настройки безопасности, которые запрещают показ контента из интернета.

### 6. Выберите способ отправки

Есть четыре способа:

- **Отправить сейчас** — выпуск отправится сразу после антиспам-проверки.
- **Запланировать отправку** — выпуск отправится в указанное время. При выборе этого пункта можно также **отправить выпуск по частям**, то есть небольшими пачками через одинаковые интервалы времени. До отправки отложенные выпуски хранятся в папке «Запланированные», где их можно редактировать.
- **Отправить по часовым поясам** — выпуск отправится каждому подписчику в его часовом поясе.

  [Как отправить письмо по часовым поясам](https://docs.sendsay.ru/email-campaigns/create-your-campaign/send-by-time-zone)

- **Оптимизация времени отправки** — выпуск отправится каждому подписчику в то время, когда он с наибольшей вероятностью откроет письмо (это определяет алгоритм). Способ эффективен после месяца активных рассылок: сначала нужно отправить несколько выпусков, чтобы накопить статистику по открытиям.

  Функция оптимизации времени подключается отдельно — чтобы активировать её в аккаунте, напишите нам в чат.

  [Как запустить оптимизацию времени рассылки](https://docs.sendsay.ru/email-campaigns/create-your-campaign/send-time-optimization)

:::tip Важно
В момент отправки рассылки автоматически проверяются и могут попасть на ручную модерацию. Первые несколько выпусков на аккаунте всегда проверяются вручную. Отследить статус отправки можно в разделе **Рассылки → Исходящие** или в **Журнале заданий**.

[Что такое модерация](https://docs.sendsay.ru/faq/moderation)
:::

## Как доотправить рассылку по неоткрывшим

Спустя время после отправки выпуска можно доотправить его по тем подписчикам, кто получил, но не открыл письмо. Для этого:

1. Перейдите в раздел **Рассылки → Отправленные** и выберите нужное письмо.
2. Нажмите «Отчёт» и выберите пункт **Отправить по неоткрывшим**:

   ![Send to unopened](/img/email-campaigns/create-your-campaign/how-to-send-email-campaign/send-to-unopened.png)

3. В появившемся окне введите название для выпуска и нажмите «Создать», затем синюю кнопку «Отправить».

Если подписчик не получил первое письмо, он получит выпуск по неоткрывшим в том случае, если на момент отправки он не отписался от рассылки и не был заблокирован из-за ошибок доставки.

В базе знаний также есть видеоурок [Как отправить массовую email-рассылку](https://docs.sendsay.ru/videolessons/email-campaigns/how-to-send-email-campaign)

**Читайте также:** <br/>
[Чек-лист перед отправкой рассылки](https://docs.sendsay.ru/faq/checklist)<br/>
[Как отменить или приостановить отправку выпуска](https://docs.sendsay.ru/email-campaigns/create-your-campaign/how-to-stop-emails)
