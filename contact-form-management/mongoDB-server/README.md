# MongoDB Server

Extended my Node.js and Express backend by establishing a connection to MongoDB. Performed operations on a database by integrating MongoDB.

## Models

[Link to Models](https://github.com/batuhanbasturk/OBSS_FE23/tree/master/contact-form-management/mongoDB-server/models)

![MongoDB](https://github.com/batuhanbasturk/OBSS_FE23/assets/81568088/b2112abb-1649-4a7e-bf7e-fbebb82fa269)


## InitialDataInsertion

When MongoDB is initially started with no data, I transfer my JSON files located in the data folder to MongoDB.

## Utils

### readDataFromMongo

Reads data from the specified collection and optionally retrieves distinct values of a specific field. This function handles data retrieval from MongoDB.

### updateDataToMongo

Updates or inserts data into the specified collection. Data updates are processed for an array of data items, each matched with a specified "_id".

### deleteDataFromMongo

Deletes data from the specified collection. Data deletion uses a unique identifier (id) to match the data to be removed.

### writeDataToMongo

Writes data to or updates existing data in the specified collection. This function targets a specific data item with the specified "id" and either updates the data or adds new data.

### getNextUserId

Retrieves the next user ID. This function uses a "LastId" document stored in MongoDB to track user IDs and returns the next user ID.

### getNextMessageId

 Retrieves the next message ID. Similarly, this function tracks message IDs using the LastId document in MongoDB and returns the next message ID.
