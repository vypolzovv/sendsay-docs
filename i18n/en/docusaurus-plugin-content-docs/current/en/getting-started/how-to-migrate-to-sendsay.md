---
id: en-how-to-migrate-to-sendsay
slug: /getting-started/how-to-migrate-to-sendsay
sidebar_position: 2
---

# How to migrate your contacts and templates from another platform to Sendsay

## 1. Redirect new subscribers to Sendsay

Start your transfer by checking where your subscribers come from and redirecting them to Sendsay. It is important to complete this step before importing the contact base in order not to miss new subscribers. Otherwise your mailing list in the old service will continue to grow after the transfer, and you can accidentally leave some of the newcomers behind.

There are two ways to add new subscribers:

### Signup forms

A signup form is shown to the site visitors so that they could leave contacts and subscribe to your campaigns. Create forms and add them to the pages of your website where you offer subscription.

[How to create a signup form](https://docs.sendsay.ru/en/forms/signup-forms)

### Integrations with other systems

You can connect our service with a CRM system (if you have any questions, please contact us via chat). When the integration is completed, new subscribers will be added to your CRM and Sendsay at the same time.

## 2. Import your subscribers

:::tip Note
The number of subscribers is limited by your billing plan. To know your limits, open your account menu and select **Payment**. If you want to transfer a larger base than your plan allows and pay later, please contact us via chat.
:::

Transfer is a good reason to clean your contacts. We recommend leaving blocked subscribers (hard bounces) and unsubscribes in your current email service. Import other contacts into lists. Transfer unconfirmed subscribers into a separate list as well so you could send them confirmation emails later.

[How to import subscribers](https://docs.sendsay.ru/en/subscribers/import-and-export/how-to-import-subscribers)

Role-based addresses (e. g. info@, list@, hello@, support@, sales@) should also be confirmed. If your B2B clients have role-based addresses, please contact us via chat, and we will help you activate them.

If you plan to import subscribers regularly, you can set up automatic import from a file on your server. Our service will upload new data at the specified time.

## 3. Add unsubscribes to stop list

You don’t need to import unsubscribed contacts, instead you can just add them to the **Unsubscribes** stop list. These contacts will be blocked for your campaigns, so you will not be able to send them anything unintentionally. Contacts cannot be deleted from this stop list manually or via the API. They will become available for your email campaigns only if their owners resubscribe to you.
How to add subscribers to the stop-list:

1. Go to **Subscribers → Stop lists** and open the **Unsubscribes** stop list.
2. Click **Add to stop list** and paste contacts into the form.

We recommend connecting your current service to Sendsay, so that new unsubscribes from your previous campaigns will be automatically added to the stop list. Also do not delete your account in the current service for a couple of weeks after the transfer to make sure you do not forget anything important.

## 4. Import email templates

If you already have an email layout with images:

1. Navigate to **Content** and click **Create Email**.
2. Open the template gallery and choose **Upload HTML**. Upload a ZIP archive with HTML file and images (images can be placed in a separate folder). The folders with images will be added to **Campaigns → Files**, and links to the images will be pasted automatically.

You can also copy templates and paste links manually:

1. Navigate to **Content** and click **Create Email**.
2. Click **HTML** and paste the code of your template.
3. In a new tab in the browser, open **Campaigns → Files** and upload the images.
4. To copy the image link, click the three-dot button near the file and select **Copy link**.
5. Insert the link into the code. In the HTML editor, you can click the area in the preview, where the missing image is supposed to be. The code will highlight the corresponding line.
6. Copy all the links one by one and paste them into the code.

## 5. Add and confirm email senders

The sender consists of the From name and From email address. If you have been using one sender name for a long time, leave it unchanged to make sure you do not confuse the subscribers.

:::tip Note
You cannot use free email addresses on [Mail.ru](https://mail.ru), [Gmail.com](https://gmail.com), or [Yandex.ru](https://yandex.ru), because it contradicts the DMARC policies of these domains and our anti-spam policy
:::

How to add the email sender:

1. In your account menu, select **Senders**. On the open page, click the **Add senders** button.
2. Enter the sender name and email address.
3. Confirm the sender address by clicking the link in the confirmation email.

## 6. Set up email authentication (optional)

Email authentication protects your emails from phishing (when someone sends malicious content from your name and email address). Before authentication, if you send campaigns from your domain using a marketing platform or other software, email services cannot detect if it is a legitimate email from you or not. In this case Gmail, Yandex and Outlook add the special mark to the sender (**"via mail.sendsay.ru"**).

Email authentication proves that the email is not forged. There are two ways to authenticate your emails:

- configure DKIM signature to hide the sender mark
- order full email authentication, which includes configuration of DKIM, SPF, DMARC and domain extra parameters. Full authentication hides the sender mark and also makes it nearly impossible for malignant emails to get into recipients’ inboxes

To start email authentication, open the account menu, navigate to **System settings → Domains** and click **Add domain**.

### How to configure DKIM signature

1. Go to **System settings → Domains**, open the domain page and copy the DKIM record.
2. Open your domain provider website and go to your domain’s records.
3. Create a TXT record and paste the DKIM key value into a "p" tag.
4. Test if the DKIM key is configured correctly. For this, go back to the domain page in Sendsay interface and click **Test authentication**. Testing may take several attempts, as DNS changes can take from a few hours to three days to update.

### How to order full email authentication

To order full email authentication, please contact us via chat. This option is performed by our specialists, so it is charged separately (contact your manager to find out pricing details).

**Read also:** [How to create a regular email campaign](https://docs.sendsay.ru/en/email-campaigns/create-your-campaign/how-to-send-email-campaign)
