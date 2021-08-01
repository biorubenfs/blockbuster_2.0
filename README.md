# Blockbuster 2.0

Videoclub API REST using **nodejs**, **express**, **mongoose** and **mongodb**. It has been built using **MVC** pattern. Basic CRUD operations are implemented. This project was developed during my fullstack bootcamp and improved after its ending.

## Table of contents

1. [Introduction](#1-introduction)
2. [Setup](#2-setup)
3. [Main Endpoints](#3-main-endpoints)
4. [Documentation](#4-documentation)
5. [Testing](#5-testing)
6. [Tools](#6-tools)

## 1. Introduction

This is a basic API REST project. Users can signup and rent movies placing an order. The catalogue is available for everybody without registration.
Several actions can be perfomed only by admins.

## 2. Setup

### 2.1 Dependencies

Download or clone de the repository. After that, run:

```bash
npm install
```

### 2.2 Database configuration

Database configuration is in `config/db_connection.js` file. Change as many parameters as necessary.

### 2.3 Seeders

After dependencies has been installed, run the seeds as follows:

```bash
npm run seed
```

## 3. Main Endpoints

<details>
    <summary>Authentication</summary>

### Authentication :key:

Some blockbuster endpoints can be used without registration or token.

#### How to register? POST /signup

`/signup` endpoint allows users to signup in tha pp. After this process, users will be able to get a token through signin endpoints (see below). To register, user should include in body request an `email`, an `username` and a `password`. Password will be stored hashed.

```json
{
  "username": "documentation",
  "email": "documentation@blockbuster.com",
  "password": "1234"
}
```

#### Getting a token. POST /signin

After registration, user will be able to login and obtain a token. This token is valid to make orders and update user profile.

```json
{
  "email": "documentation@blockbuster.com",
  "password": "1234"
}
```

This endpoints returns a token:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDZhYjY2NTQ4OWFkMWMxM2NmMzAyNCIsImVtYWlsIjoiZG9jdW1lbnRhdGlvbkBibG9ja2J1c3Rlci5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTYyNzgyOTkwNn0.YaKnKIm6Ux76CjXIY1JjyaCs_Doa2MEQeTxmZ0u600Y"
}
```

</details>

<details>
    <summary>Users</summary>

### Users

#### GET /users/me

It returns a JSON object with user details available in database. Token is mandatory. In Postman select Auth > Bearer Token and add the token you obtained in your login.

```json
{
  "role": "USER",
  "_id": "6106ab665489ad1c13cf3024",
  "username": "documentation",
  "email": "documentation@blockbuster.com"
}
```

#### DELETE /users/me

Users can delete their account. Only the token is necessary for this purpose.

#### PUT /users/me

Users can update their account details, including their profile picture. To do that in Postman, select form-data type in body. Users can update their profile picture, their username and password.

| key               | type | value       |
| ----------------- | ---- | ----------- |
| `profile_picture` | file | image.jpg   |
| `username`        | text | newUsername |
| `password`        | text | newPassowrd |

This endpoint returns something like this:

```json
{
  "role": "USER",
  "_id": "6106ab665489ad1c13cf3024",
  "username": "new username",
  "email": "documentation@blockbuster.com",
  "password": "$2b$10$UXbEvFkghb44mlinYSyoDe0EbROsezUnGpxR2QoyvX2dYJlDuhUF2",
  "profile_picture": "assets/profile_pictures/1627831302408image.jpeg"
}
```

and stores the profile picture in `./assets/profile_pictures`.

</details>

<details>
    <summary>Movies</summary>

### Movies

All these endpoints can be used without token.

#### GET /movies

It returns the complete list of movies available in database.

```json
[
    {
        "cast": [
            "Tim Robbins",
            "Morgan Freeman",
            "Bob Gunton",
            "William Sadler",
            "Clancy Brown",
            "Gil Bellows",
            "Mark Rolston",
            "James Whitmore",
            "Jeffrey DeMunn",
            "Larry Brandenburg"
        ],
        "genres_ids": [
            18,
            80
        ],
        "_id": "6105cb21ead58228b7e30a87",
        "title": "Cadena perpetua",
        "year": "1994",
        "poster_path": "https://image.tmdb.org/t/p/w500/dc1fX265fZIIY5Hab8I7CdETyJy.jpg",
        "overview": "Acusado del asesinato de su mujer, Andrew Dufresne, tras ser condenado a cadena perpetua, es enviado a la prisión de Shawshank. Con el paso de los años conseguirá ganarse la confianza del director del centro y el respeto de sus compañeros presidiarios, especialmente de Red, el jefe de la mafia de los sobornos."
    },
    {},
```

#### GET /movies/[id]

It returns details about a specific movie:

For example: `/movies/6105cb22ead58228b7e30a90`

```json
{
  "cast": [
    "Marlon Brando",
    "Al Pacino",
    "James Caan",
    "Robert Duvall",
    "Richard S. Castellano",
    "Diane Keaton",
    "Talia Shire",
    "Gianni Russo",
    "Sterling Hayden",
    "Al Lettieri"
  ],
  "genres_ids": [18, 80],
  "_id": "6105cb22ead58228b7e30a90",
  "title": "El padrino",
  "year": "1972",
  "poster_path": "https://image.tmdb.org/t/p/w500/wLXd1Cd0XW7DhXayfC0Ok5ago9r.jpg",
  "overview": "Don Vito Corleone, conocido dentro de los círculos del hampa como 'El Padrino', es el patriarca de una de las cinco familias que ejercen el mando de la Cosa Nostra en Nueva York en los años ccuarenta. Don Corleone tiene cuatro hijos: una chica, Connie, y tres varones; Sonny, Michael y Fredo. Cuando el Padrino reclina intervenir en el negocio de estupefacientes, empieza una cruenta lucha de violentos episodios entre las distintas familias del crimen organizado."
}
```

#### GET /movies/search/title

It allows the user to do a search by titles based on a query term.

For example: `/movies/search/title?title=padrino`

#### GET /movies/search/genre_id/[genreId]

It returns a list of a genre. Beware not to use the mongo objectId \_id. Instead of that use the `id`. This is because of movies and relative data were obtained from moviedb database. Check genre collection if you have doubts.

#### GET /movies/search/genre_name/[genreName]

Very similar to the previous one, but using the genre name instead of id.

</details>

<details>
    <summary>Orders</summary>

### Orders

#### POST /orders/

Users can do orders through this endpoints. Just a `movieId` is necessary.

```json
{
  "movieId": "60f85d56826def399ee61525"
}
```

It returns order information:

```json
{
  "status": "ACTIVE",
  "_id": "6106ca5a506e763441dc9ced",
  "movie_id": "60f85d56826def399ee61525",
  "user_id": "6106ab665489ad1c13cf3024",
  "start_date": "2021-08-01T16:22:50.029Z",
  "end_date": "2021-08-11T16:22:50.029Z"
}
```

#### GET /orders/

This endpoints returns all order from token user:

```json
[
  {
    "status": "ACTIVE",
    "user_id": "6105cb21666f5a28a70c7ea4",
    "movie_id": {
      "_id": "6105cb21ead58228b7e30a87",
      "title": "Cadena perpetua"
    },
    "start_date": "2021-07-31T22:13:55.149Z",
    "end_date": "2021-07-31T22:13:55.149Z"
  },
  {
    "status": "ACTIVE",
    "user_id": "6105cb21666f5a28a70c7ea4",
    "movie_id": {
      "_id": "6105cb22ead58228b7e30a92",
      "title": "La lista de Schindler"
    },
    "start_date": "2021-07-31T22:13:55.152Z",
    "end_date": "2021-07-31T22:13:55.152Z"
  }
]
```

#### GET /orders/:id

#### PUT /orders/:id

</details>

<details>
    <summary>Admin</summary>

### Title

Explanation text

</details>

## 4. Documentation

## 5. Testing

## 6. Tools
