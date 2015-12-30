package com.three_stack.subtle_scheme;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.three_stack.digital_compass.backend.BasicPlayer;
import org.bson.Document;

import javax.print.Doc;
import java.util.ArrayList;
import java.util.List;

public class QuestionService extends MongoService {
    MongoCollection<Document> packCollection;
    MongoCollection<Document> questionCollection;

    public QuestionService() {
        packCollection = database.getCollection(Config.MONGO_PACK_COLLECTION);
        questionCollection = database.getCollection(Config.MONGO_QUESTION_COLLECTION);
    }

    /**
     * retrieves a question from MongoDB
     *
     * @param questionId
     * @return
     */
    public Question getQuestion(int questionId) {
        Document query = new Document(Config.QUESTION_ID, questionId);
        MongoCursor<Document> cursor = questionCollection.find(query).iterator();
        if(!cursor.hasNext()) {
            throw new IllegalArgumentException("No Question found with questionId: " + questionId);
        }

        Document questionDocument = cursor.next();

        Question question = new Question(questionDocument);

        return question;
    }

    /**
     * Determines what questions are possible and returns a list of their ID's
     * Based on packs selected, nsfw filter, and questions used by the players
     *
     * @param gameState
     * @return
     */
    public List<Integer> getPossibleQuestionIds(GameState gameState) {
        List<Pack> packs = gameState.getPacks();

        Document query = new Document();

        //filter nsfw
        if (!gameState.isIncludeNsfwQuestions()) {
            query.append(Config.QUESTION_NSFW, false);
        }

        //filter questions used
        if (!gameState.isIncludeUsedQuestions()) {
            List<Document> ninQuestionList = new ArrayList<>();
            for (BasicPlayer player : gameState.getPlayers()) {
                for (Integer questionId : ((Player) player).getUser().getQuestionsUsed()) {
                    ninQuestionList.add(new Document(Config.QUESTION_ID, questionId));
                }
            }
            query.append("$nin", ninQuestionList);
        }

        //filter packs
        List<Document> orPackList = new ArrayList<>();
        for (Pack pack : gameState.getPacks()) {
            orPackList.add(new Document(Config.QUESTION_PACK_ID, pack.getId()));
        }
        query.append("$or", orPackList);

        MongoCursor<Document> cursor = questionCollection.find(query).iterator();

        List<Integer> questionIds = new ArrayList<>();
        while (cursor.hasNext()) {
            questionIds.add(cursor.next().getInteger(Config.QUESTION_ID));
        }
        return questionIds;
    }
}
