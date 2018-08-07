## API Documentation V1
[Reference](https://hackernoon.com/restful-api-designing-guidelines-the-best-practices-60e1d954e7c9)

http verbs used:
- GET
- POST
- PUT
- DELETE

### User
- GET /api/v1/user should get the list of all users
- GET /api/v1/user/34 should get the detail of user 34
- DELETE /api/v1/user/34 should delete user 34
- POST /api/v1/user should create a new user and return the details of the new user created
- PUT /api/v1/user should update an existing user and return details of the user updated
- PUT /api/v1/user/3/profile should update the profile of user 3 by replacing the previous profile with the new profile object
### UAS
- GET /api/v1/user/3/uas should get the list of all UASs belonging to user 3
- POST /api/v1/user/3/uas should create a new UAS belonging to user 3 and return the details of the UAS created
- GET /api/v1/uas/45 should get the details of UAS 45
- DELETE /api/v1/uas/45 should delete UAS 45
- PUT /api/v1/uas/45 should update UAS 45 and return details of the updated
