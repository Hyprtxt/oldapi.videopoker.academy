# Strapi application

A quick description of your strapi application

Poker!!!

```
curl --location --request POST 'http://localhost:1337/new-poker-game' \
--header 'Content-Type: application/json' \
--data-raw '{
    "Data": [1,2,3,4,5,6,7,8],
    "User": {
        "id": 2
    }
}'
```
