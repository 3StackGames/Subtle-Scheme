package com.three_stack.subtle_scheme;

import com.three_stack.digital_compass.backend.BasicAction;
import com.three_stack.digital_compass.backend.BasicGameState;
import com.three_stack.digital_compass.backend.BasicPhase;
import com.three_stack.digital_compass.backend.InvalidInputException;

public class EndPhase extends BasicPhase {

	@Override
	public Class getAction() {
		return EndAction.class;
	}

	@Override
	public void setup(BasicGameState basicGameState) throws InvalidInputException {
		return;
	}

	@Override
	public BasicGameState processAction(BasicAction action, BasicGameState state) throws InvalidInputException {
		GameState gameState = (GameState) state;
		EndAction revealAction = (EndAction) action;

        if(revealAction.isRestart()){
            gameState.resetGame();
            gameState.transitionPhase(new LiePhase());
        }

		return gameState;
	}

}
