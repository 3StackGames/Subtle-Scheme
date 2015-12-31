package com.three_stack.subtle_scheme;

import com.three_stack.digital_compass.backend.BasicAction;
import com.three_stack.digital_compass.backend.BasicGameState;
import com.three_stack.digital_compass.backend.BasicPhase;
import com.three_stack.digital_compass.backend.InvalidInputException;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class LiePhase extends BasicPhase {
    private transient QuestionService questionService;

    @Override
    public Class getAction() {
        return LieAction.class;
    }

    @Override
    public void setup(BasicGameState state) {
        GameState gameState = (GameState) state;

        questionService = new QuestionService();
        List<Integer> possibleQuestionIds = gameState.getPossibleQuestions();

        //check if we're out of questions
        if(possibleQuestionIds.isEmpty()) {
            gameState.setOutOfQuestions(true);
            return;
        }
        Random random = new Random();
        int questionIndex = random.nextInt(possibleQuestionIds.size());
        int questionId = gameState.getPossibleQuestions().remove(questionIndex);
        Question question = questionService.getQuestion(questionId);
        gameState.setCurrentQuestion(question);
        gameState.incrementQuestionCount();
    }

	@Override
	public BasicGameState processAction(BasicAction action, BasicGameState state) throws InvalidInputException {
		GameState gameState = (GameState) state;
		LieAction lieAction = (LieAction) action;

        String lieText = lieAction.getLie().trim().toLowerCase();

        for (Lie lie : gameState.getLies()) {
            if(lie.getLie().equals(lieText)) {
                //found lie already in the game
                throw new InvalidInputException(InvalidInputException.Code.INPUT_REJECTED, "Lie already submitted");
            } else if (gameState.getCurrentQuestion().getAnswers().contains(lie.getLie())) {
                throw new InvalidInputException(InvalidInputException.Code.INPUT_REJECTED, "Lie is an answer");
            }

        }

		Lie lie = new Lie(lieText, lieAction.getPlayer());
		gameState.getLies().add(lie);
		if (gameState.getLies().size() == gameState.getPlayers().size()) {
			gameState.transitionPhase(new VotePhase());
		}
		return gameState;
	}
}