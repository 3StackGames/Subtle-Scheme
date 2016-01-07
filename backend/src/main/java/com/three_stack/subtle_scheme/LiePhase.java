package com.three_stack.subtle_scheme;

import com.three_stack.digital_compass.backend.BasicAction;
import com.three_stack.digital_compass.backend.BasicGameState;
import com.three_stack.digital_compass.backend.BasicPhase;
import com.three_stack.digital_compass.backend.BasicPlayer;
import com.three_stack.digital_compass.backend.InvalidInputException;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

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

        return addLiesToGameState(gameState, lieAction.getLie(), lieAction.getPlayer());
	}
	
	@Override
	public BasicGameState onDisplayActionComplete(BasicGameState state) {
    	if(state.isDisplayComplete()) {
    		GameState gameState = (GameState) state;   		
    		List<String> autoLies = questionService.getQuestion(gameState.getCurrentQuestion().getId()).getAutoLies();    		
    		List<Lie> lies = gameState.getLies();
    		
    		Set<BasicPlayer> players = new HashSet<BasicPlayer>(gameState.getPlayers());
    		for (Lie lie : lies) {
    			players.remove(state.getPlayerByName(lie.getLiar()));
    		}
    		
    		for (BasicPlayer player : players) {
    			Random r = new Random();
    			int i = r.nextInt(autoLies.size());
    			autoLies.remove(i);

                try {
                    state = addLiesToGameState(gameState, autoLies.get(i), player.getDisplayName());
                } catch (InvalidInputException e) {
                    System.out.println("We shouldn't be here.");
                    e.printStackTrace();
                }
            }
    	} else {
    		super.onDisplayActionComplete(state);
    	}
    	return state;
    }


    private GameState addLiesToGameState(GameState gameState, String newLie, String player) throws InvalidInputException {
        String lieText = newLie.trim().toLowerCase();

        for (Lie lie : gameState.getLies()) {
            if(lie.getLie().equals(lieText)) {
                //found lie already in the game
                throw new InvalidInputException(InvalidInputException.Code.INPUT_REJECTED, "Lie already submitted");
            } else if (gameState.getCurrentQuestion().getAnswers().contains(lie.getLie())) {
                throw new InvalidInputException(InvalidInputException.Code.INPUT_REJECTED, "Lie is an answer");
            }
        }

        Lie lie = new Lie(lieText, player);
        gameState.getLies().add(lie);
        if (gameState.getLies().size() == gameState.getPlayers().size()) {
            gameState.transitionPhase(new VotePhase());
        }
        return gameState;
    }
}