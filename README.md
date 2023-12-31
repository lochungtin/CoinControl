<img src="./img/icons/rounded.png" width="80">

# CoinControl

This project was led by [Timothy Lo](www.lotimothy.com), then joined by [Ken Huang](https://kenchihuang.co.uk/) and [Issac To](https://issacto.com/).

## About

CoinControl is a mobile money management application designed to track spendings and income statistics while also providing insightful analytics to users. The mobile app is fitted with an account system and cloud storage/backups. Record analytics are also available for users to very spending and income trends and other data. The app also has a built-in calculator as the input number pad for easy on-the-stop calculations and recordings of expenses and incomes.

## Features

### Records

Records are classified by category, which can have custom icons, colour, and names. Custom categories can be added by users, existing categories can also be customised to the user's liking.

### Analytics

Analytics provided include a proportion pie chart of both spendings and income entries, categories sums, total sums, spending goal progress tracking, and most frequent or most expensive categories.

### Account System

Accounts can be set up in the app, which can be used to store data on the cloud store. Though the app itself can be used without an account. Account authentication is managed by **Firebase Authentication**.

### Customisation

The app provides a wide range of customisability. Which includes customs themes, categories, and currency labels.

| Custom Colors                                                                                                                                                                    | Categories                                                                                                                                                                                              | Currency Labels                                                                                                         |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------- |
| With a custom colour picker, users can choose from **30 different flat design colours** and customise their app's accent. Light mode is also a togglable option in the settings. | Users can select from **various icons** to create their own custom categories to label their spendings and incomes. Each category is stylable with the 30 custom colours provided by the colour picker. | Users can select their currency label for their spending records, which include: **USD, GBP, EUR, HKD, NTD, JPY, KRW**. |

### Data Managements

Data is stored both locally and on the cloud via Firebase's **Realtime Database System**. Data syncing can be done with a press of a button. Syncing methods include

-   **Select latest (default)**
-   **Cloud overwrite**
-   **Local overwrite**

### Notifications

Notifications can be set to remind users to record and update their expenses **daily**. While the notification's default firing time is at 11:00PM local time, they can be customised to **fit the user's personal schedule**.

## Future Plans

Some next steps I have in mind are creating a web application for CoinControl, so data can be accessed and updated on the computer as well, which will improve accessibility and ease of use.
