const { Schema, model } = require('mongoose');

const questionsSchema = new Schema({
  category: {
    type: String,
  },
  type: {
    type: String,
  },
  difficulty: {
    type: String,
  },
  question: {
    type: String,
  },
  correct_answer: {
    type: String,
  },
  incorrect_answers: [
    {
      type: String,
    },
  ],
});

const Questions = model('Questions', questionsSchema);

module.exports = Questions;
