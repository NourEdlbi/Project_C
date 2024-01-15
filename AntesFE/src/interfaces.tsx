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
    questionID: number;
    value: string;
}
export interface QuizResultData {
    quizID: number;
    quizSubmitterID: number;
    answers: AnswerData[];
}
export interface userinfoInterface {
    id: number;
    name: string;
    email: string;
    admin: boolean;
}