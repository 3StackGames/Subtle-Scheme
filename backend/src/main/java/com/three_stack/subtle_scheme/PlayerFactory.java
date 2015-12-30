package com.three_stack.subtle_scheme;

import com.three_stack.digital_compass.backend.BasicPlayer;
import com.three_stack.digital_compass.backend.BasicPlayerFactory;

import java.util.ArrayList;
import java.util.List;

public class PlayerFactory extends BasicPlayerFactory {
    @Override
    public List<BasicPlayer> initialize(List<BasicPlayer> players) {
        //convert from BasicPlayer to Player
        List<BasicPlayer> convertedPlayers = new ArrayList<>();
        for(BasicPlayer basicPlayer : players) {
            Player player = new Player(basicPlayer);
            //set account information
            if(basicPlayer.isAuthenticated()) {
                UserService userService = new UserService();
                player.setUser(userService.getUser(basicPlayer.getAccountName()));
            }
            convertedPlayers.add(player);
        }
        return convertedPlayers;
    }
}
