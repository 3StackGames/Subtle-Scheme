package com.three_stack.subtle_scheme;

import com.three_stack.digital_compass.backend.BasicAction;
import com.three_stack.digital_compass.backend.BasicGameState;
import com.three_stack.digital_compass.backend.BasicPhase;

import java.util.ArrayList;
import java.util.List;

public class PackSelectionPhase extends BasicPhase {

    @Override
    public Class getAction() {
        return PackSelectionAction.class;
    }

    @Override
    public void setup(BasicGameState state) {
        GameState gameState = (GameState) state;
        PackService packService = new PackService();
        gameState.setPossiblePacks(packService.getPossiblePacks(gameState.getPlayers()));
    }

    @Override
    public BasicGameState processAction(BasicAction action, BasicGameState state) {
        GameState gameState = (GameState) state;
        PackSelectionAction packSelectionAction = (PackSelectionAction) action;

        //only take input from the first player
        String firstPlayerName = gameState.getPlayers().get(0).getDisplayName();
        if(packSelectionAction.getPlayer().equals(firstPlayerName)) {
            //set nsfw filter
            gameState.setIncludeNsfwQuestions(packSelectionAction.isIncludeNsfwQuestions());
            //set used question filter
            gameState.setIncludeUsedQuestions(packSelectionAction.isIncludeUsedQuestions());
            //set packs
            gameState.setPacks(getPacksById(packSelectionAction.getPacks(), gameState));
            //set possible questions
            QuestionService questionService = new QuestionService();
            List<Integer> possibleQuestions = questionService.getPossibleQuestionIds(gameState);
            gameState.setPossibleQuestions(possibleQuestions);

            gameState.transitionPhase(new LiePhase());
        }
        return gameState;
    }

    private List<Pack> getPacksById(List<Integer> packIds, GameState gameState) {
        List<Pack> packs = new ArrayList<>();

        for(Pack pack : gameState.getPossiblePacks()) {
            if(packIds.contains(pack.getId())) {
                packs.add(pack);
            }
        }
        return packs;
    }
}
