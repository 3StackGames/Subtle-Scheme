package com.three_stack.subtle_scheme;

import com.three_stack.digital_compass.backend.BasicPlayer;

public class Player extends BasicPlayer {
    private transient User user;

    public Player(BasicPlayer other) {
        super(other);
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
