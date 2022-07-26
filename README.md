# Achievement 3 Project:  React App (myFlix) - myFlix-client

## Table of Contents

-   [Objective](#Objective)
-   [Design Criteria](#Design-criteria)
-   [Technical Requirements](#Technical-Requirements)
-   [Setup](#setup)

## Objective

Using React, build the client-side for an application called myFlix based on  its existing server-side code (REST API and database).

## Design Criteria

### User Stories

-   As a user, I want to be able to access information on movies, directors, and genres so that I  can learn more about movies I’ve watched or am interested in.
-   As a user, I want to be able to create a profile so I can save data about my favorite movies.

### What the app can do

-   New Users can register, and existing users can log-in and log-out
-   Users can view details about movies, directors and genres
-   Users can add or remove movies from their list of favorite movies
-   Users are able to update or delete their profile

## Technical Requirements

-   The application must be a single-page application (SPA)
-   The application must use state routing to navigate between views and share URLs
-   The application must give users the option to filter movies
-   The application must give users the option to sort movies
-   The application must initially use Parcel as its build tool
-   The application must be written using the React library and in ES2015+
-   The application must be written with React Redux (hence respecting the Flux pattern)
-   The application must use Bootstrap as a UI library for styling and responsiveness
-   The application must contain a mix of class components and function components
-   The application may be hosted online

## Setup

-   Download project @ `https://github.com/JuMe87/myFlix-client.`
-   Go to package.json file and download all mentioned dependencies (make sure you install parcel v2)
-   open terminal and got to your project diretory
-   Run the following command:

```bash
parcel src/index.html
```
