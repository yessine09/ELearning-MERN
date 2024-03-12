import { quizAnswersModel, quizModel, questionModel } from '../index';
import mongoose, { Mongoose, Schema } from 'mongoose';

export default class DAOQuiz {

    static async createNewQuiz(quiz: quizModel.IQuiz): Promise<quizModel.IQuiz | null> {
        const newQuiz = await quizModel.Quiz.create(quiz)
        return newQuiz;
    }

    static async getQuizById(id: number): Promise<quizModel.IQuiz | null> {
        const quiz = await quizModel.Quiz.findById(id);
        return quiz;
    }

    static async getAllQuizzes(): Promise<Array<quizModel.IQuiz>> {
        const quizzes = await quizModel.Quiz.find();
        return quizzes;
    }

    static async getAllQuizzesByUserId(userId: number): Promise<Array<quizModel.IQuiz>> {
        const quizzes = await quizModel.Quiz.find({ client: new mongoose.Types.ObjectId(userId) });
        return quizzes;
    }

    static async getQuizByUserId(userId: number): Promise<quizModel.IQuiz | null> {
        const quiz = await quizModel.Quiz.findOne({ client: new mongoose.Types.ObjectId(userId) });
        return quiz;
    }

    static async updateQuiz(quiz: quizModel.IQuiz): Promise<quizModel.IQuiz | null> {
        const updatedQuiz = await quizModel.Quiz.findByIdAndUpdate(quiz._id, quiz, { new: true });
        return updatedQuiz;
    }

    static async deleteQuiz(id: number): Promise<void> {
        await quizModel.Quiz.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });
    }

    static async addQuestion(quiz: quizModel.IQuiz, question: questionModel.IQuestion): Promise<questionModel.IQuestion | null> {
        const newQuestion = await questionModel.Question.create(question);
        await quizModel.Quiz.findOneAndUpdate({ _id: quiz._id }, { $push: { questions: newQuestion._id } });
        return newQuestion;
    }

    static async getQuestionById(id: number): Promise<questionModel.IQuestion | null> {
        const question = await questionModel.Question.findById(id);
        return question;
    }

    static async getAllQuestions(quiz: quizModel.IQuiz): Promise<Array<questionModel.IQuestion>> {
        const questions = await questionModel.Question.find({ quiz: quiz._id });
        return questions;
    }

    static async getAllQuestionsByUserId(userId: number): Promise<Array<questionModel.IQuestion>> {
        const questions = await questionModel.Question.find({ client: new mongoose.Types.ObjectId(userId) });
        return questions;
    }

    static async updateQuestion(question: questionModel.IQuestion): Promise<questionModel.IQuestion | null> {
        const updatedQuestion = await questionModel.Question.findByIdAndUpdate(question._id, question, { new: true });
        return updatedQuestion;
    }

    static async deleteQuestion(id: number): Promise<void> {
        await questionModel.Question.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });
    }

    static async addAnswer(question: questionModel.IQuestion, answer: quizAnswersModel.IAnswers): Promise<quizAnswersModel.IAnswers | null> {
        const newAnswer = await quizAnswersModel.Answers.create(answer);
        await questionModel.Question.findOneAndUpdate({ _id: question._id }, { $push: { answers: newAnswer._id } });
        return newAnswer;
    }

    static async getAnswerById(id: number): Promise<quizAnswersModel.IAnswers | null> {
        const answer = await quizAnswersModel.Answers.findById(id);
        return answer;
    }

} 