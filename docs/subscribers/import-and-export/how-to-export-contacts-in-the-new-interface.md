---
sidebar_position: 4
sidebar_label: 'Экспорт данных и контактов'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import schedule from '/img/subscribers/import-and-export/how-to-export-contacts-in-the-new-interface/schedule.png';
import filePath from '/img/subscribers/import-and-export/how-to-export-contacts-in-the-new-interface/file-path.png';

# Как экспортировать контакты в новом интерфейсе

Экспорт позволяет выгрузить контакты и другие данные ваших подписчиков из Sendsay в файл формата CSV, XLSX, HTML или JSON. В интерфейсе это можно сделать 3 способами:

- экспортировать контакты одного типа из списка или сегмента (например, только email-адреса подписчиков),
- экспортировать контакты и другие данные подписчиков разово,
- настроить регулярную выгрузку контактов по шаблону.

:::tip Важно
При экспорте контактов и данных подписчиков в файл формата XLSX стоит учитывать, что такой файл поддерживает 1 048 576 строк на лист.
:::

## Как выгрузить контакты одного типа из списка или сегмента​

Вы можете выгрузить из списка или сегмента контакты подписчиков одного типа в формате XLSX или CSV. Например, из списка по [типу канала](https://docs.sendsay.ru/getting-started/glossary#т) **Email** система выгрузит только email-адреса подписчиков, состоящих в этом списке.

Чтобы это сделать:

1. Перейдите в раздел [**Подписчики → Список**](https://app.sendsay.ru/subscribers/lists) или [**Сегмент**](https://app.sendsay.ru/subscribers/segments) и выберите нужный список или сегмент:

   <Tabs>
   <TabItem value="key1" label="Экспорт из списка">

   При выборе списка нажмите «Импортировать» и выберите необходимый формат&nbsp;— **Экспортировать как XLSX** или **Экспортировать как CSV**.

   ![List export](/img/subscribers/import-and-export/how-to-export-contacts-in-the-new-interface/list-export.png)

   </TabItem>
   <TabItem value="key2" label="Экспорт из сегмента">

   При выборе сегмента нажмите «Настроить» и выберите необходимый пункт&nbsp;— **Экспортировать как XLSX** или **Экспортировать как CSV**.

   ![Segment export](/img/subscribers/import-and-export/how-to-export-contacts-in-the-new-interface/segment-export.png)

   </TabItem>
   </Tabs>

2. Следите за экспортом в [**Журнале заданий**](https://app.sendsay.ru/queue). После завершения откройте выпадающий список кнопки «Детали» и нажмите «Скачать».

## Как выгрузить контакты и другие данные подписчиков разово

Вы можете экспортировать контакты и данные:

- всех ваших подписчиков в базе контактов,
- подписчиков из конкретного списка или сегмента.

Для этого:

1. Перейдите в раздел [**Подписчики → Экспорт**](https://app.sendsay.ru/subscribers/export) и нажмите «Экспортировать разово»:

   ![One-time export](/img/subscribers/import-and-export/how-to-export-contacts-in-the-new-interface/one-time-export.png)

2. На шаге **Аудитория и данные** нажмите «Изменить». Если вы хотите выгрузить данные всех подписчиков из базы, в выпадающем поле **Список или сегмент** выберите **Все подписчики**:

   ![How to export all subscribers](/img/subscribers/import-and-export/how-to-export-contacts-in-the-new-interface/all-subscribers.png)

   В случае если необходимо выгрузить данные подписчиков конкретного списка или сегмента, укажите этот список или сегмент.

3. В полях ниже укажите [данные анкет](https://docs.sendsay.ru/subscribers/subscriber-data/data-groups), которые необходимо экспортировать:

   ![Subscriber data](/img/subscribers/import-and-export/how-to-export-contacts-in-the-new-interface/subscriber-data.png)

   Вы можете настроить порядок отображения данных в экспортируемом файле&nbsp;— для этого перетаскивайте поля и меняйте их местами:

   ![Data order](/img/subscribers/import-and-export/how-to-export-contacts-in-the-new-interface/data-order.gif)

   Затем нажмите «Сохранить».

4. На шаге **Куда** нажмите «Изменить» и выберите директорию для сохранения файла с данными, укажите имя и формат&nbsp;— CSV, XLSX, HTML или JSON:

   ![Result retention](/img/subscribers/import-and-export/how-to-export-contacts-in-the-new-interface/result-retention.gif)

   Имя файла должно быть уникальным, поэтому рекомендуем использовать дату и время экспорта в названии файла. В противном случае последующие экспорты будут сохраняться с этим же названием, перезаписывая предыдущий файл.

5. Когда оба шага заполнены, нажмите «Экспортировать»:

   ![How to export](/img/subscribers/import-and-export/how-to-export-contacts-in-the-new-interface/how-to-export.png)

6. Следите за экспортом в [**Журнале заданий**](https://app.sendsay.ru/queue). После завершения откройте выпадающий список кнопки «Детали» и нажмите «Скачать».

## Как настроить регулярный экспорт по шаблону

Чтобы автоматизировать экспорт подписчиков и других данных, необходимо настроить регулярную выгрузку контактов и других данных подпсичиков по расписанию. Для этого:

1. Перейдите в раздел [**Подписчики → Экспорт**](https://app.sendsay.ru/subscribers/export) и нажмите «Создать регулярный экспорт»:

   ![Regular export](/img/subscribers/import-and-export/how-to-export-contacts-in-the-new-interface/regular-export.png)

2. На шаге **Аудитория и данные** нажмите «Изменить»:

   - если вы хотите выгрузить данные всех подписчиков из базы, в выпадающем поле **Список или сегмент** выберите **Все подписчики**,
   - в случае если необходимо выгрузить данные подписчиков конкретного списка или сегмента, укажите этот список или сегмент.

3. В полях ниже укажите [данные анкет](https://docs.sendsay.ru/subscribers/subscriber-data/data-groups), которые необходимо экспортировать. При необходимости настройте порядок отображения данных в экспортируемом файле — для этого перетаскивайте поля и меняйте их местами:

   ![Export data](/img/subscribers/import-and-export/how-to-export-contacts-in-the-new-interface/export-data.gif)

   Затем нажмите «Сохранить».

4. На шаге **Расписание** выберите периодичность и время экспорта:

   - если контакты должны загружаться **ежедневно**, укажите время,
   - если контакты должны загружаться **еженедельно**, укажите дни недели и время,
   - если контакты должны загружаться **ежемесячно**, укажите число месяца и время экспорта.

   Вы можете выбрать несколько дней и несколько вариантов времени экспорта. Например:

   <p align="center">
   <img width="60%" src={schedule} alt="Schedule" />
   </p>

   Так контакты будут экспортироваться четыре раза в неделю — каждый вторник и четверг в 10:30 и в 18:30. При необходимости укажите ограничения в расписании.

5. На шаге **Куда** нажмите «Изменить». Выберите здесь директорию для сохранения файла с экспортом данных, укажите имя и формат — CSV, XLSX, HTML или JSON:

   <p align="center">
   <img width="60%" src={filePath} alt="File path" />
   </p>

   Имя файла должно быть уникальным, поэтому рекомендуем использовать дату и время экспорта в названии файла. В противном случае последующие экспорты будут сохраняться с этим же названием, перезаписывая предыдущий файл.

6. Когда все шаги заполнены, для запуска автоматизации нажмите «Активировать»:

   ![Export activation](/img/subscribers/import-and-export/how-to-export-contacts-in-the-new-interface/export-activation.png)

   После активации система начнёт автоматически выгружать контакты и данные в файл по указанному расписанию.

**Читайте также:**<br/>
[Как экспортировать контакты и данные подписчиков в старом интерфейсе
](https://docs.sendsay.ru/subscribers/import-and-export/how-to-export-data-in-the-legacy-interface)
