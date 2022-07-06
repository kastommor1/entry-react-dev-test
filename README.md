# Entry React developer TEST

## Developer:
Serhii Shchur

## Description

### Three options

In the last commits you can find three working versions of the application:
#### 1.only HOC query, with locked attrib in Carts fix cs (branch main)
#### 2.only HOC query, select attrib in Carts fix cs (branch HOCUnlockAttributes)
#### 3.query, HOC query, select attrib in Carts fix cs (branch HOCAndQuery)

### Details
#### 1.only HOC query, with locked attributes in Carts
According to the task has a blocked selection of attributes in the carts.

#### 2.only HOC query, select attributes in Carts
When I was working on this task, it seemed to me as a user that the choice of attributes in the cart is quite convenient. Therefore, I added this version of the application for comparison.

#### 3.query, HOC query, select attributes in Carts
According to the task it is forbidden to use functional components. But the new versions of React Router and Apollo Client are focused on the use of Hooks. Therefore, to integrate Hooks into class components, I used a wrapper with HOC. This makes it possible to use the functionality of the new versions of React Router and Apollo Client.
Of course, we may not use HOC. Instead, use simple asynchronous queries built into the Apollo client.
In this commit, for example, I use simple asynchronous queries for the App and Categories components and componentt are wrapped in HOC in the Product component

### Reloading and multiple tabs
When reloading, the cart data and currency are saved, the necessary part of the data is downloaded from the server.
When using several tabs, the data between tabs is also synchronized.