package com.three_stack.subtle_scheme;

import org.bson.Document;

public class Question extends Belief {
	private int id;
	private String question;
	private String answer;
	
	public Question(String question, String answer) {
		super();
		this.question = question;
		this.answer = answer;
	}

	public Question(Document document) {
        super();
        this.id = document.getInteger(Config.QUESTION_ID);
        this.question = document.getString(Config.QUESTION_PROMPT);
        this.answer = document.getString(Config.QUESTION_ANSWER);
    }

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
}
