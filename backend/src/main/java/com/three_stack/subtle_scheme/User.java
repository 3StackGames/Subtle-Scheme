package com.three_stack.subtle_scheme;

import org.bson.Document;

import java.util.List;

public class User {
    private String username;
    private List<Integer> questionsUsed;
    private List<Integer> packs;
    private boolean active;

    public User(Document document) {
        this.username = document.getString(Config.USER_USERNAME);
        this.questionsUsed = (List<Integer>) document.get(Config.USER_QUESTIONS_USED);
        this.packs = (List<Integer>) document.get(Config.USER_PACKS);
        this.active = document.getBoolean(Config.USER_ACTIVE);
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Integer> getQuestionsUsed() {
        return questionsUsed;
    }

    public void setQuestionsUsed(List<Integer> questionsUsed) {
        this.questionsUsed = questionsUsed;
    }

    public List<Integer> getPacks() {
        return packs;
    }

    public void setPacks(List<Integer> packs) {
        this.packs = packs;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
