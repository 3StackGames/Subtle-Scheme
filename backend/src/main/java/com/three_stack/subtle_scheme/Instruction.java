package com.three_stack.subtle_scheme;

/**
 * Created by Hyunbin on 9/16/15.
 */
public class Instruction {

    private int questionLimit;
    private int trickBonusPointValue;
    private int correctAnswerPointValue;
    private String instructionText;
    private int timerDuration;

    public Instruction(int trickBonusPointValue, int correctAnswerPointValue, String instructionText, int questionLimit, int timerDuration){
        this.trickBonusPointValue = trickBonusPointValue;
        this.correctAnswerPointValue = correctAnswerPointValue;
        this.instructionText = instructionText;
        this.questionLimit = questionLimit;
        this.timerDuration = timerDuration;
    }

    public int getTrickBonusPointValue() {
        return trickBonusPointValue;
    }

    public void setTrickBonusPointValue(int trickBonusPointValue) {
        this.trickBonusPointValue = trickBonusPointValue;
    }

    public int getCorrectAnswerPointValue() {
        return correctAnswerPointValue;
    }

    public void setCorrectAnswerPointValue(int correctAnswerPointValue) {
        this.correctAnswerPointValue = correctAnswerPointValue;
    }

    public String getInstructionText() {
        return instructionText;
    }

    public void setInstructionText(String instructionText) {
        this.instructionText = instructionText;
    }

    public int getQuestionLimit() {
        return questionLimit;
    }

    public void setQuestionLimit(int questionLimit) {
        this.questionLimit = questionLimit;
    }

    public int getTimerDuration() {
        return timerDuration;
    }

    public void setTimerDuration(int timerDuration) {
        this.timerDuration = timerDuration;
    }
}
