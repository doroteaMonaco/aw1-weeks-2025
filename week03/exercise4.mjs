'use strict';

import dayjs from "dayjs";
import sqlite from "sqlite3";

const db = new sqlite.Database("questions.sqlite", (err) => {if (err) throw err;});

function Answer(id, Response, email, respondentId, Score = 0, Date){
    this.id = id;
    this.Response = Response;
    this.email = email;
    this.respondentId = respondentId;
    this.Score = Score;
    this.Date = dayjs(Date);
}

function Question(id, Question, email, questionerId, Date){
    this.id = id;
    this.Question = Question;
    this.email = email;
    this.questionerId = questionerId;
    this.Date = dayjs(Date);
    this.answers = [];

    this.add = (answer) => {
        this.answers.push(answer);
    };

    this.find = (username) => {
        return this.answers.filter(answer => answer.Username === username);
    };

    this.afterDate = (date) => {
        return this.answers.filter(answer => answer.Date.isAfter(dayjs(date)));
    };

    this.listByDate = () => {
        return [...this.answers].sort((a,b) => (a.Date.isAfter(b.Date)) ? 1 : -1);
    };

    this.listByScores = () => {
        return [...this.answers].sort((a,b) => b.Score - a.Score);
    };

    this.getAnswers = () => {
        return new Promise((resolve, reject) => {
        const sql = "SELECT answer.*, user.email FROM answer JOIN user ON answer.authorId = user.id WHERE answer.questionId = ?";
        db.all(sql, [this.id], (err, rows) => {
            if(err){
                reject(err);
            }
            else{
                const answer = rows.map((ans) => new Answer(ans.id, ans.Response, ans.email, ans.respondentId, ans.Score, ans.Date)); 
                resolve(answer);
            }
        })
        });
    };

    this.addAnswer = (answer) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO answer(id, text, authorId, date, score, questionId) VALUES (?, ?, ?, ?, ?, ?)";
            db.run(sql, [answer.id, answer.Response, answer.respondentId, answer.Date.toISOString(), answer.Score, this.id], function (err) {
                if(err){
                    reject(err);
                }
                else{
                    resolve(this.lastID);
                }
            })
        })
    };

    this.voteAnswer = (id, value) => {
        return new Promise ((resolve, reject) => {
            let n;
            if(value === 'up'){
                n = 1;
            }
            else if(value === 'down'){
                n = -1;
            }
            const sql = "UPDATE answer SET Score = Score + ? WHERE id = ?";
            db.run(sql, [n, id], function (err) {
                if(err){
                    reject(err);
                }
                else{
                    resolve(this.changes);
                }
            })
        })
    };
}

function QuestionList (){
    this.getQuestion = (id) => {
        return new Promise ((resolve, reject) => {
            const sql = "SELECT question.*, user.email FROM question JOIN user ON question.authorId = user.id WHERE question.id = ?";
            db.get(sql, [id], (err, row) => {
                if(err){
                    reject(err);
                }
                else if (row!== undefined) {
                    resolve(new Question(row.id, row.text, row.email, row.questionerId, row.Date));
                } else {
                    resolve("Question not available, check the inserted id.");
                }
            });
        });
    };

    this.addQuestion = (question) => {
        return new Promise ((resolve, reject) => {
            const sql = "INSERT INTO question(id, text, authorId, date) VALUES (?, ?, ?, ?)";
            db.run(sql, [question.id, question.Question, question.questionerId, question.Date.toISOString()], function (err) {
                if(err){
                    reject(err);
                }
                else{
                    resolve(this.lastID);
                }
            })
        })
    };
}

// funzione per il test
async function main() {
  const ql = new QuestionList();

  const firstQuestion = await ql.getQuestion(1);
  console.log(firstQuestion);
  
  console.log(await firstQuestion.getAnswers());
  const newAnswerId = await firstQuestion.addAnswer(new Answer(undefined, "test", "luigi.derussis@polito.it", 1, dayjs()));
  console.log("ID OF THE NEW ANSWER: " + newAnswerId);
  console.log("# OF CHANGES DUE TO THE VOTE: " + await firstQuestion.voteAnswer(newAnswerId, "up"));
  console.log(await firstQuestion.getAnswers());

  const newQuestionId = await ql.addQuestion(new Question(undefined, "Is 1 bigger than 10?", "luigi.derussis@polito.it", 1, dayjs()));
  const newQuestion = await ql.getQuestion(newQuestionId);
  console.log("NEWLY ADDED QUESTION: " + newQuestion.Question);
  console.log(await newQuestion.getAnswers());

}

main();


