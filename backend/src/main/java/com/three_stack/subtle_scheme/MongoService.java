package com.three_stack.subtle_scheme;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;

public abstract class MongoService {
    protected final MongoClient client;
    protected final MongoDatabase database;

    public MongoService() {
        client = MongoClientFactory.getClient();
        database = client.getDatabase(Config.MONGO_DATABASE);
    }

    @Override
    protected void finalize() {
        client.close();
    }
}
