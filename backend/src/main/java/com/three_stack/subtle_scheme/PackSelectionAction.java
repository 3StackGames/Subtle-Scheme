package com.three_stack.subtle_scheme;

import com.three_stack.digital_compass.backend.BasicAction;

import java.util.ArrayList;
import java.util.List;

public class PackSelectionAction extends BasicAction{
    private List<Integer> packs;
    private boolean includeNsfwQuestions;
    private boolean includeUsedQuestions;

    public PackSelectionAction() {
        packs = null;
        includeNsfwQuestions = false;
        includeUsedQuestions = false;
    }

    public boolean isIncludeNsfwQuestions() {
        return includeNsfwQuestions;
    }

    public void setIncludeNsfwQuestions(boolean includeNsfwQuestions) {
        this.includeNsfwQuestions = includeNsfwQuestions;
    }

    public boolean isIncludeUsedQuestions() {
        return includeUsedQuestions;
    }

    public void setIncludeUsedQuestions(boolean includeUsedQuestions) {
        this.includeUsedQuestions = includeUsedQuestions;
    }

    public List<Integer> getPacks() {
        return packs;
    }

    public void setPacks(List<Integer> packs) {
        this.packs = packs;
    }
}
