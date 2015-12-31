package com.three_stack.subtle_scheme;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class Config {
    public static final String CONFIG_FILE = "development.properties";

    public static final String MONGO_ID_ATTRIBUTE = "_id";

    public static final String MONGO_QUESTION_COLLECTION = "Questions";
    public static final String MONGO_PACK_COLLECTION = "Packs";
    public static final String MONGO_USER_COLLECTION = "Users";

    public static final String MONGO_DATABASE = "SubtleScheme";

    public static final String QUESTION_ID = "id";
    public static final String QUESTION_PROMPT = "prompt";
    public static final String QUESTION_ANSWER = "answer";
    public static final String QUESTION_PACK_ID = "packId";
    public static final String QUESTION_NSFW = "nsfw";
    public static final String QUESTION_TOTAL_LIE_COUNT = "totalLieCount";
    public static final String QUESTION_TOTAL_CORRECT_COUNT = "totalCorrectCount";
    public static final String QUESTION_ANSWERS = "answers";
    public static final String QUESTION_AUTO_LIES = "autoLies";

    public static final String PACK_ID = "id";
    public static final String PACK_NAME = "name";
    public static final String PACK_FREE = "free";

    public static final String USER_USERNAME = "username";
    public static final String USER_QUESTIONS_USED = "questionsUsed";
    public static final String USER_PACKS = "packs";
    public static final String USER_ACTIVE = "active";

    private static Properties properties = new Properties();

    static {
        InputStream input = null;
        try {
            input = Config.class.getClass().getResourceAsStream("/" + CONFIG_FILE);
            properties.load(input);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            System.out.println("[Exception] File not found: " + CONFIG_FILE);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("[Exception] IO Exception while reading " + CONFIG_FILE);
        }
    }

    public static String getProperty(String property) {
        return properties.getProperty(property);
    }
}
