package com.three_stack.subtle_scheme;

import org.bson.Document;

import java.util.List;

public class Question extends Belief {
	private int id;
	private String question;
	private String answer;
	private List<String> answers;
	private List<String> autoLies;
	private boolean nsfw;

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
		this.answers = (List<String>) document.get(Config.QUESTION_ANSWERS);
		this.autoLies = (List<String>) document.get(Config.QUESTION_AUTO_LIES);
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

	public List<String> getAnswers() {
		return answers;
	}

	public void setAnswers(List<String> answers) {
		this.answers = answers;
	}

	public List<String> getAutoLies() {
		return autoLies;
	}

	public void setAutoLies(List<String> autoLies) {
		this.autoLies = autoLies;
	}

	public boolean isNsfw() {
		return nsfw;
	}

	public void setNsfw(boolean nsfw) {
		this.nsfw = nsfw;
	}
}
