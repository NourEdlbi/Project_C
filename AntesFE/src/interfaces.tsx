export interface QuestionData {
    id?: number;
    quizID?: number;
    text: string;
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
