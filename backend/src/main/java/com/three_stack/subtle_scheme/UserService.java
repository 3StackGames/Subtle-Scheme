package com.three_stack.subtle_scheme;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.three_stack.digital_compass.backend.BasicPlayer;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class UserService extends MongoService {
    MongoCollection<Document> userCollection;

    public UserService() {
        super();
        userCollection = database.getCollection(Config.MONGO_USER_COLLECTION);
    }

    public User getUser(String username) {
        Document query = new Document(Config.USER_USERNAME, username.toLowerCase());

        MongoCursor<Document> cursor = userCollection.find(query).iterator();
        if(!cursor.hasNext()) {
            throw new IllegalArgumentException("Username " + username + " not found in user collection");
        }

        Document userDocument = cursor.next();

        return new User(userDocument);
    }

    /**
     * Marks the questions as used for players in MongoDB
     *
     * @param players
     * @param questionId
     */
    public void markQuestionsUsed(List<BasicPlayer> players, int questionId) {
        Document query = new Document();

        List<Document> orPlayerList = new ArrayList<>();
        for(BasicPlayer player : players) {
            orPlayerList.add(new Document(Config.USER_USERNAME, player.getAccountName()));
        }
        query.append("$or", orPlayerList);

        Document questionIdPush = new Document(Config.USER_QUESTIONS_USED, questionId);
        Document update = new Document("$push", questionIdPush);

        userCollection.updateMany(query, update);

        return;
    }
}
