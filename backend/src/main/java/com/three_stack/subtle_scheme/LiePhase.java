package com.three_stack.subtle_scheme;

import com.three_stack.digital_compass.backend.BasicAction;
import com.three_stack.digital_compass.backend.BasicGameState;
import com.three_stack.digital_compass.backend.BasicPhase;
import com.three_stack.digital_compass.backend.InvalidInputException;

public class LiePhase extends BasicPhase {
    private QuestionService questionService;

    @Override
    public Class getAction() {
        return LieAction.class;
    }

    @Override
    public void setup(BasicGameState state) {
        GameState gameState = (GameState) state;

        questionService = new QuestionService();
        int questionId = gameState.getPossibleQuestions().remove(0);
        Question question = questionService.getQuestion(questionId);
        gameState.setCurrentQuestion(question);
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