package com.three_stack.subtle_scheme;

import com.three_stack.digital_compass.backend.BasicAction;
import com.three_stack.digital_compass.backend.BasicGameState;
import com.three_stack.digital_compass.backend.BasicPhase;

public class RevealPhase extends BasicPhase {
	@Override
	public Class getAction() {
		return RevealAction.class;
	}


    @Override
    public BasicGameState onDisplayActionComplete(BasicGameState state) {
        GameState gameState = (GameState) super.onDisplayActionComplete(state);
        //move on as soon as display action is done


        //mark questions as used for authenticated users
        UserService userService = new UserService();
        userService.markQuestionsUsed(gameState.getPlayers(), gameState.getCurrentQuestion().getId());
        //prepare for new question
        Instruction instruction = gameState.getCurrentInstruction();
        gameState.prepareForNewQuestion();
        if(gameState.getQuestionCount() < instruction.getQuestionLimit()) {
            //new round
            gameState.transitionPhase(new LiePhase());
        } else {
            //game over
            gameState.transitionPhase(new EndPhase());
        }

        return gameState;
    }


	@Override
	public BasicGameState processAction(BasicAction action, BasicGameState state) {
		//no gamepad input expected
		return state;
	}
}
