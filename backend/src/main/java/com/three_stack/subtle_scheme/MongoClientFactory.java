package com.three_stack.subtle_scheme;

import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;

import java.util.ArrayList;
import java.util.List;

/*
 * This factory simplifies client creation and can be later used to limit the number of active clients
 */
public class MongoClientFactory {

    public static MongoClient getClient() {
        String username = Config.getProperty("mongo.auth.username");
        String database = Config.getProperty("mongo.auth.database");
        char[] password = Config.getProperty("mongo.auth.password").toCharArray();

        int port = Integer.parseInt(Config.getProperty("mongo.port"));

        MongoCredential mongoCredential = MongoCredential.createCredential(username, database, password);
        List<MongoCredential> credentials = new ArrayList<>();
        credentials.add(mongoCredential);

        ServerAddress address = new ServerAddress(Config.getProperty("mongo.address"), port);
        return new MongoClient(address, credentials);
    }
}
