package com.three_stack.subtle_scheme;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.three_stack.digital_compass.backend.BasicPlayer;
import org.bson.Document;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class PackService extends MongoService {
    MongoCollection<Document> packCollection;
    MongoCollection<Document> userCollection;

    public PackService() {
        super();
        packCollection = database.getCollection(Config.MONGO_PACK_COLLECTION);
        userCollection = database.getCollection(Config.MONGO_USER_COLLECTION);
    }

    public List<Pack> getPossiblePacks(List<BasicPlayer> players) {
        List<Document> orList = new ArrayList<>();

        //get all free packs
        Document freePackClause = new Document(Config.PACK_FREE, true);
        orList.add(freePackClause);

        //get all packs owned by the users
        Set<Integer> packIds = new HashSet<>();
        for(BasicPlayer basicPlayer : players) {
            Player player = (Player) basicPlayer;
            if(basicPlayer.isAuthenticated()) {
                packIds.addAll(player.getUser().getPacks());
            }
        }
        //add pack ids to or list
        for(Integer packId : packIds) {
            Document packIdClause = new Document(Config.PACK_ID, packId);
            orList.add(packIdClause);
        }

        Document query = new Document("$or", orList);
        MongoCursor<Document> cursor = packCollection.find(query).iterator();

        List<Document> packDocuments = new ArrayList<>();

        while(cursor.hasNext()) {
            packDocuments.add(cursor.next());
        }

        List<Pack> packs = new ArrayList<>();

        for(Document packDocument : packDocuments) {
            packs.add(new Pack(packDocument));
        }

        return packs;
    }
}
