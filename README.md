# renu

This is a personal project for a mobile app. I use a credit card myself together with a spreadsheet to have control of my cash flow. The problem was the painful task of adding manually every single transaction I make. Automation to the rescue! I made a custom login form integrated with my credit card service (Nubank, a brazilian credit card operator) that allows me (plus dozens of users) to pull all transactions from the account, directly into the app. Now I have full control of my revenue and expenses, in one single user interface. And I can see a pie chart and a line chart with statistics of my transactions. Right on my pocket!

I this app, basically there are four routes: "statistics", "login", "edit" and "start". 

# Start
In the Start route, the user can see a list with his revenue/expenses, filtered by month/year.

# Statistcs
I the statistics route, the user can see two different charts, a pie chart and a line chart. They were made using a d3.js library and also the mongoDB aggregate functionality.

# Login
In this screen, I used the Accounts package to handle and authenticate users through the nubank API.

# Edit
User can create/edit a transaction in this screen.

I also used moment package with flow-router to provide a good UX with page transitions.


Designed and developed by Diogo Angelim.



