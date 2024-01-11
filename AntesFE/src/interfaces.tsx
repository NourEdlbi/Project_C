export interface QuestionData {
    id?: number;
    quizID?: number;
    questionText: string;
    answer1: string;
    answer2: string;
    answer3: string;
    correctAnswer: string;
}

export interface QuizData {
    id: number;
    makerID?: number;
    name: string;
    description: string;
    questions: QuestionData[];
}
export interface AnswerData {
    answers: { questionID: number; value: string }[];
}
export interface QuizResultData {
    id: number;
    quizID: number;
    quizSubmitterID: number;
    answerID: number;
}
export interface userinfoInterface {
    id: number;
    name: string;
    email: string;
    admin: boolean;
}