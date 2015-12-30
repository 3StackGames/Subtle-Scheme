package com.three_stack.subtle_scheme;

import com.three_stack.digital_compass.backend.BasicGameState;

import java.util.ArrayList;
import java.util.List;

public class GameState extends BasicGameState {

    private Question currentQuestion;

    private List<Pack> packs;

    private List<Pack> possiblePacks;

    private boolean includeNsfwQuestions = false;

    private boolean includeUsedQuestions = false;

    private boolean outOfQuestions = false;

    private transient List<Integer> possibleQuestions;

    private List<Lie> lies;

    private final Instruction currentInstruction;

    private int voteCount;
    private int questionCount;

    public GameState(Instruction instruction) {
        this.currentInstruction = instruction;
        this.packs = new ArrayList<>();
        prepareForNewQuestion();
    }

    public void prepareForNewQuestion() {
        lies = new ArrayList<>();
        currentQuestion = null;
        voteCount = 0;
    }

    @Override
    public void resetGame() {
        super.resetGame();
        prepareForNewQuestion();
        questionCount = 0;
    }

    public void incrementVoteCount() {
        voteCount++;
    }

    public void incrementQuestionCount() {
        questionCount++;
    }

    public Instruction getCurrentInstruction() {
        return currentInstruction;
    }

    public List<Lie> getLies() {
        return lies;
    }

    public boolean isIncludeNsfwQuestions() {
        return includeNsfwQuestions;
    }

    public void setIncludeNsfwQuestions(boolean includeNsfwQuestions) {
        this.includeNsfwQuestions = includeNsfwQuestions;
    }

    public boolean isIncludeUsedQuestions() {
        return includeUsedQuestions;
    }

    public void setIncludeUsedQuestions(boolean includeUsedQuestions) {
        this.includeUsedQuestions = includeUsedQuestions;
    }

    public int getVoteCount() {
        return voteCount;
    }

    public int getQuestionCount() {
        return questionCount;
    }

    public Question getCurrentQuestion() {
        return currentQuestion;
    }

    public void setCurrentQuestion(Question question) {
        this.currentQuestion = question;
    }

    public List<Pack> getPacks() {
        return packs;
    }

    public void setPacks(List<Pack> packs) {
        this.packs = packs;
    }

    public List<Pack> getPossiblePacks() {
        return possiblePacks;
    }

    public void setPossiblePacks(List<Pack> possiblePacks) {
        this.possiblePacks = possiblePacks;
    }

    public List<Integer> getPossibleQuestions() {
        return possibleQuestions;
    }

    public void setPossibleQuestions(List<Integer> possibleQuestions) {
        this.possibleQuestions = possibleQuestions;
    }

    public boolean isOutOfQuestions() {
        return outOfQuestions;
    }

    public void setOutOfQuestions(boolean outOfQuestions) {
        this.outOfQuestions = outOfQuestions;
    }
}