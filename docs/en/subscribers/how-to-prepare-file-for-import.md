---
id: en-how-to-prepare-file-for-import
slug: /exclude-from-search/subscribers/en-how-to-prepare-file-for-import
sidebar_position: 2
---

import fieldCode from "/img/subscribers/import-and-export/how-to-prepare-file-for-import/field-code-en.png";
import fileForAutoimport from "/img/subscribers/import-and-export/how-to-prepare-file-for-import/file-for-autoimport-en.png";
import fileForManualImport from "/img/subscribers/import-and-export/how-to-prepare-file-for-import/file-for-manual-import-en.png";
import listType from "/img/subscribers/import-and-export/how-to-prepare-file-for-import/list-type-en.png";
import chooseListDuringImport from "/img/subscribers/import-and-export/how-to-prepare-file-for-import/how-to-choose-list-during-import-en.png";

# How to format the import file

## 1. File formats

Supported file formats are csv, txt, xlsx or zip.

## 2. File content

Make sure that each line only contains data for one subscriber. Different lines must contain subscriber data in the same order. First line specifications depend on whether you configure an autoimport or import the data manually.

If you create a file for an autoimport, the first line of each column must contain a field code as a directory for saving data. Field codes can be found in the data groups. Exclude the prefix anketa from the code and copy the rest. For example, if the column contains first names of your subscribers, the first line will be `base.firstName`:

<p align="center">
    <img src={fieldCode} alt="Field code" />
</p>

In an autoimport file subscribers can only have one contact. If you want to upload additional contacts, contact us via chat. Here is an example of an autoimport file:

<p align="center">
    <img src={fileForAutoimport} alt="File for autoimport" />
</p>

If you create a file for a manual import, field codes are unnecessary, as the fields for imported data are selected manually. The first line may contain column titles, you can skip it in the import settings.

<p align="center">
    <img src={fileForManualImport} alt="File for manual import" />
</p>

## 3. Data separator

In Excel, paste your data into the spreadsheet. In other file types, separate the data with commas, semicolons or tabs. Check that you use the same separator in each line.

```
pochta1@gmail.com, Иван, Иванов, Москва, 1970.01.21
```

If some subscriber data is missing, place two consecutive separators (spaces between symbols are optional).

```
pochta2@gmail.com, , Фёдоров, , 1980.02.14
```

## 4. Primary contact

Spreadsheet must have one column with a contact that is mandatory for every subscriber. It is called the primary contact, and it can be an email address, a phone number, CSID or Telegram user ID.

:::tip Note
To send campaigns in Telegram, you have to import user IDs (it is a combination of digits), not usernames or phone numbers
:::

Primary contact is used for data merge in case you import the data that already exists in the system. Subscribers without the primary contact will not be imported. If you import subscribers directly into the list, the primary contact type must coincide with the list type.

<p align="center">
    <img src={listType} alt="List type" />
</p>

If you import subscribers without the list, select the primary contact in the import settings.

<p align="center">
    <img src={chooseListDuringImport} alt="How to choose list during import" />
</p>

## 5. Date and phone number formatting

Dates are entered in YYYYY.MM.DD format. For example, for the date "July 1, 1993" the entry would be:

```
1993.07.01
```

Phone numbers can include parentheses and spaces or contain digits only. For Russian numbers, the country code is optional: it can be written as 7, +7 or 8, or it can be skipped. For non-Russian numbers, a country code is a must.

## 6. Import errors

If you do not want to import a particular subscriber, type # at the beginning of the line.

```
#pochta5@gmail.com, Пётр, Петров, Новгород, 1989.01.01
```

You can skip columns during the import. The subscriber will not be imported, if the contacts contain typos or the data does not correspond to the field format. If several subscribers share one contact, only the last of them will be uploaded.

:::tip Note
If you import subscribers’ countries, they must be written in Russian, otherwise they will not be imported
:::

**Read also:** [How to configure import settings](./how-to-import-subscribers.md#2-configure-import-settings)
