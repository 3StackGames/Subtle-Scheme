package com.three_stack.subtle_scheme;

import org.bson.Document;

public class Pack {
    private int id;
    private String name;

    public Pack(Document document) {
        this.id = document.getInteger(Config.PACK_ID);
        this.name = document.getString(Config.PACK_NAME);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
