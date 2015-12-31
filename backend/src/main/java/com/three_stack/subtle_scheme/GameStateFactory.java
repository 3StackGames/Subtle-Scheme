package com.three_stack.subtle_scheme;

import com.three_stack.digital_compass.backend.BasicGameState;
import com.three_stack.digital_compass.backend.BasicGameStateFactory;

public class GameStateFactory extends BasicGameStateFactory {
    @Override
    public BasicGameState createState() {
    	GameState gs = new GameState(new Instruction(100, 200, "Here is a new instruction", 5, 35));
        gs.transitionPhase(new PackSelectionPhase());
        return gs;
    }
}
