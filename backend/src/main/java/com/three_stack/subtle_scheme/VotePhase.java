package com.three_stack.subtle_scheme;

import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import com.three_stack.digital_compass.backend.BasicAction;
import com.three_stack.digital_compass.backend.BasicGameState;
import com.three_stack.digital_compass.backend.BasicPhase;
import com.three_stack.digital_compass.backend.BasicPlayer;

/**
 * Created by Hyunbin on 9/16/15.
 */
public class VotePhase extends BasicPhase {
	private transient QuestionService questionService;

	@Override
	public Class getAction() {
		return VoteAction.class;
	}

	@Override
	public void setup(BasicGameState state) {
		super.setup(state);
		questionService = new QuestionService();
	}

	public BasicGameState processAction(BasicAction action, BasicGameState state) {
		GameState gameState = (GameState) state;
		VoteAction voteAction = (VoteAction) action;

		// add vote
		String votedAnswer = voteAction.getAnswer();
		String believer = voteAction.getPlayer();

		Question currentQuestion = gameState.getCurrentQuestion();
		String answer = currentQuestion.getAnswer();

		if (votedAnswer.equals(answer)) {
			currentQuestion.getBelievers().add(believer);
			gameState.incrementVoteCount();
		} else {
			//loop through all lies to find the match
			for (Lie lie : gameState.getLies()) {
				if (lie.getLie().equals(votedAnswer)) {
					lie.getBelievers().add(believer);
					gameState.incrementVoteCount();
					// stop looking for a match
					break;
				}
			}
		}
		// check if done
		if (gameState.getVoteCount() == gameState.getPlayers().size()) {
			tallyScores(gameState);
			gameState.transitionPhase(new RevealPhase());
		}
		return state;
	}

	private void tallyScores(GameState gameState) {
		final int pointsForCorrect = gameState.getCurrentInstruction().getCorrectAnswerPointValue();
		final int pointsForTrick = gameState.getCurrentInstruction().getTrickBonusPointValue();


		//give correct points
		int correctCount = 0;
		for(String player : gameState.getCurrentQuestion().getBelievers()) {
			givePlayerPoint(gameState, player, pointsForCorrect);
			correctCount++;
		}
		//give lie points
		for(Lie lie : gameState.getLies()) {
			int points = lie.getBelievers().size() * pointsForTrick;
			givePlayerPoint(gameState, lie.getLiar(), points);
		}

		//update metadata
		questionService.updateQuestionMetadata(gameState.getCurrentQuestion().getId(), gameState.getLies().size(), correctCount);
	}
	
	private void givePlayerPoint(GameState gameState, String displayName, int value) {
		for(BasicPlayer player : gameState.getPlayers()) {
			if(player.getDisplayName().equals(displayName)) {
				int newScore = player.getScore() + value;
				player.setScore(newScore);
				//found so we can return
				return;
			}
		}
	}
	
	@Override
	public BasicGameState onDisplayActionComplete(BasicGameState state) {
    	if(state.isDisplayComplete()) {
    		GameState gameState = (GameState) state;
    		Question cq = gameState.getCurrentQuestion();
    		List<Lie> lies = gameState.getLies();
    		
    		Set<BasicPlayer> players = new HashSet<BasicPlayer>(gameState.getPlayers());
    		players.remove(cq.getBelievers());
    		for (Lie lie : lies) {
    			players.remove(lie.getBelievers());
    		}
    		
    		for (BasicPlayer player : players) {
    			Random r = new Random();
    			int i = r.nextInt(lies.size()+1);
    			VoteAction voteAction = new VoteAction();
    			voteAction.setPlayer(player.getDisplayName());
    			if (i == 0) {
    				voteAction.setAnswer(cq.getAnswer());
    			}
    			else {
    				voteAction.setAnswer(lies.get(i-1).getLie());  				
    			}
    			
				state = processAction(voteAction, state);
    		}
    	} else {
    		super.onDisplayActionComplete(state);
    	}
    	return state;
    }

}
