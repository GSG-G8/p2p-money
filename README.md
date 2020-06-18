# P2P Money

## Application Link :link:

[check it out from here](https://herokuapp.com/)

## Team :busts_in_silhouette:

### Team Lead

- Asmaa Thabet

### Team members

- Hassan Al-Najjar
- Ahmed Salah
- Mohammed Flaifel
- Ali Dahdouh

## Application description :information_source:

This is an app to help people exchange money online. without a middleman like a bank or exchange agency, we connect people through our app, this application is a good place for make profit from money exchange. we provide them with a wallet to save and exchange their money anytime.
currently, we are in the beta stage, we will provide virtual money for users to test our app, and review users feedback.

## Application Setup :mag:

- clone this repo
  `git clone https://github.com/GSG-G8/p2p-money.git`

- run `npm i && cd client npm i && npm run build` to install all dependencies & dev-dependencies for the app and also build react on the server.

- add config.env file that contains SECRET_KEY as Environmental Variable and Mongodb Url for your database.

#### Environment Variables

Environment variables are one of the ways that we use to keep our product safe. If you want to access our app locally you will need to add your own.

First create a **config.env** file and add the following variables:

```
SECRET_KEY
```

#### Database Setup

- Create MongoDB database account from [here](https://account.mongodb.com/account/register).
- Now you can set the **database url** in your ***config.env*** as follows (setting the values in square brackets to the values you defined in MongoDB website url above):


`mongodb+srv://[username:password]@host:port/[database]?options...`

- Add a these two variables in config.env and added database url that you created as shown above :

```
DEV_URI = mongodb url xxxxxxxx       // database for development
PRODUCT_URI = mongodb url xxxxxxxx // database for production

```

- Now in the Terminal run this command to build the fake data on your database on both development and production databases 

```
npm run build:database:dev
npm run build:database:pro

```

#### Run the Project

- In terminal access to project folder on your machine write: `npm start` to start the app in the browser or you can work with development, write `npm run dev`.

## Main Problems :heavy_exclamation_mark:

1- Currency difference between exchange shops.

2- waste the time and efforts when I search for the best price.

3- Torn and damaged money.

## Our Solutions :bulb:

1- Gain the best Price between different prices.

2- sea the different exchange prices for each bank and the money exchange agencies.

3- manage your cash flow by states and charts.

4- increase user profits.

5- exchange your money in a secured and trusted environment.

6- make changing money a simple process.

7- reduce time and efforts

8- flexible timing for exchange

9- provide history stats.

## stackholders:

- employees.
- money exchange practicers.
- money exchange agancies.
- banks

## user stories::bookmark_tabs:

### As user I can :

- see all prices information for each partners banks and the money exchange agencies and our price to one unit for each kind of currency we deal with.
- choose the two currencies to calculate the exchange price
- insert the amount you need to exchange
- see the amount after calculate the exchange value and add our tax.
- click on exchange button to know our exchange amount.
- sign up by my username, email, password.
- check if my email is valid after registration for the first time.
- report that view the status of your operation.
- edit my personal account data.
- see my Current Balance.
- exchange money.
- add money in my wallet with my Bank account.

### As admin I can :

- add new curent prices.
- see all Clients.
- see all Transactions and Activity.

## user Joruney: :train2:

### As user:

The user will open the app, then he will enter the amount and currencies that he want to know its exchange value by clicking on exchange button, then he will see the results page to see the converted prices in three different boxes: the app, the teller and bank prices, user should pick the best price which is the app price then he will sign up and fill out all his data in the signup form after that he will add his bank account details to complete the process and confirm the exchange process, user also expect to see his transactions and can edit his settings.

### As admin:

the admin has an authorized page when he login he will see a dashboard filled with statics about current clients and the completed transactions, there will be a chart that shows the transaction throughout the time.
and he will find another bar chart for week activity. there is a calendar to help the admin choose a specific time to show statics.there is a dedicated panel that shows the new users and their information.
the admin can add agent price manually through a pop up button that show him current prices from banks and he can manually adjust the agencey range prices and also our price that we provided from our app.

## Database Schema :file_cabinet:

![p2p-last](https://user-images.githubusercontent.com/29041512/85019682-dde1aa80-b177-11ea-8546-8ef9165006ff.png)
## Technologies :computer:

### Frontend

- React JS
- React Hooks
- ant design
- Javascript

### Backend

- Express JS
- Node js

### Database

- MongoDB
- mongoose
