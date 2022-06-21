---
id: en-signup-forms
slug: /exclude-from-search/forms/en-signup-forms
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import formTypes from "/img/forms/signup-forms/form-types-en.png";

# How to create a signup form

A signup form is shown to the site visitors so that they could leave an email address and subscribe to email campaigns. Every email address from the form appears in the subscriber base as an unconfirmed contact, and the confirmation email is sent right away. The recipient has to click the link in the email to confirm the subscription.

To create or edit a form, go to the **Forms** page. Then follow five steps to create a form:

## 1. Choose the form type
There are four types of forms:

**Pop-up** appears over the site content.

**Bar** appears above or below the site content and doesn’t interrupt the user experience. On mobile devices it transforms into a pop-up due to small screen width.

**Widget** appears as a minimized window in the corner of the page and doesn’t interrupt the user experience. It opens on click over the site content.

**Embedded form** is placed on the website as part of the content.

<p align="center">
    <img src={formTypes} alt="Form types" />
</p>

You can add content blocks to pop-ups and widgets only while the bars have a fixed size. Select the form type before editing the content. If you change the type afterwards, all the content will be lost. You can’t change the form type after saving it.

## 2. Design the form
For each form, you need to configure design and behavior (where and how the form is shown to the site visitors). In the form editor you can add, change or delete content blocks by dragging them across the screen. You can also use the preview mode to see how the form will be displayed on different devices.

All the form types have two mandatory elements that can’t be removed: the field for the email address and the **Sign up** button. You can add fields to the form from the left column of the editor. New fields can’t be created in the form editor.

## 3. Set additional emails and pages (optional)
Forms have additional emails and pages where you can use standard templates or configure custom design:
- success message appears when a person clicks the **Sign up** button in the form
- confirmation email is sent to the subscriber after filling a form
- thank you page opens when the subscriber clicks the link in the confirmation email
- thank you email is sent after the subscriber confirms the subscription (optional)

## 4. Choose a list for subscribers (optional)
For your convenience, we recommend adding subscribers directly into the list because it simplifies your work in the future.

## 5. Install the form on your website

On the form page open the **Install** tab. Following steps depend on the type of form you want to install.

<Tabs>
<TabItem value="key1" label="For embedded form" default>

1.	Embed the script to the root directory of your site after the `<head>` tag. You can skip this step if you have other Sendsay forms installed on your website.
2.	Insert the code of the form into the code of the page where you want to offer a subscription.
3. Click the **Activate** button at the top of the page to start showing the form on the site. All the changes in the forms after the installation will automatically appear on the website.

</TabItem>
<TabItem value="key2" label="For other forms">

1. Copy the code and insert it into the page where you want to show the form (after the `<head>` tag).
2. Click the **Activate** button at the top of the page to start showing the form on the site. All the changes in the forms after the installation will automatically appear on the website.

</TabItem>
</Tabs>