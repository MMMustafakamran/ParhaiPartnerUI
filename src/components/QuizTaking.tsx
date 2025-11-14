import { useState } from 'react';
import { ChevronLeft, ChevronRight, Flag, X } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface QuizTakingProps {
  quiz: any;
  onSubmit: (results: any) => void;
  onCancel: () => void;
}

export function QuizTaking({ quiz, onSubmit, onCancel }: QuizTakingProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const toggleFlag = () => {
    setFlaggedQuestions(prev =>
      prev.includes(currentQuestion.id)
        ? prev.filter(id => id !== currentQuestion.id)
        : [...prev, currentQuestion.id]
    );
  };

  const handleSubmit = () => {
    let correctCount = 0;
    const detailedResults = quiz.questions.map((q: any) => {
      const userAnswer = answers[q.id];
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) correctCount++;

      return {
        questionId: q.id,
        question: q.question,
        options: q.options,
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
        topic: q.topic,
      };
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    const results = {
      quizId: quiz.id,
      totalQuestions,
      correctCount,
      incorrectCount: totalQuestions - correctCount,
      unansweredCount: totalQuestions - answeredCount,
      score,
      passed: score >= 60,
      questions: detailedResults,
      difficulty: quiz.difficulty,
      mode: quiz.mode,
    };

    onSubmit(results);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-gray-900 mb-2">Quiz in Progress</h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{quiz.difficulty}</Badge>
              <Badge variant="outline">{quiz.mode === 'ai' ? 'AI Generated' : 'Past Papers'}</Badge>
            </div>
          </div>
          <Button variant="outline" onClick={() => setShowCancelDialog(true)}>
            <X className="w-4 h-4 mr-2" />
            Exit Quiz
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="text-purple-600">{answeredCount} of {totalQuestions} answered</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Question Area */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-8">
              {/* Question Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline" className="text-sm">
                      Question {currentQuestionIndex + 1} of {totalQuestions}
                    </Badge>
                    {currentQuestion.topic && (
                      <Badge variant="secondary">{currentQuestion.topic}</Badge>
                    )}
                  </div>
                  <h2 className="text-gray-900">{currentQuestion.question}</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFlag}
                  className={flaggedQuestions.includes(currentQuestion.id) ? 'text-orange-600' : 'text-gray-400'}
                >
                  <Flag className={`w-5 h-5 ${flaggedQuestions.includes(currentQuestion.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option: string, index: number) => {
                  const isSelected = answers[currentQuestion.id] === index;
                  const optionLabel = String.fromCharCode(65 + index); // A, B, C, D

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {optionLabel}
                        </div>
                        <span className="text-gray-900 flex-1">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <div className="text-sm text-gray-600">
                  {currentQuestionIndex + 1} / {totalQuestions}
                </div>

                {currentQuestionIndex < totalQuestions - 1 ? (
                  <Button onClick={handleNext}>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowSubmitDialog(true)}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  >
                    Submit Quiz
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question Navigation Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm text-gray-900 mb-4">Question Navigator</h3>
              <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                {quiz.questions.map((q: any, index: number) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isFlagged = flaggedQuestions.includes(q.id);
                  const isCurrent = index === currentQuestionIndex;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`aspect-square rounded-lg text-sm transition-all relative ${
                        isCurrent
                          ? 'bg-purple-600 text-white'
                          : isAnswered
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {index + 1}
                      {isFlagged && (
                        <Flag className="w-3 h-3 absolute top-0 right-0 text-orange-600 fill-current" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-100"></div>
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gray-100"></div>
                  <span className="text-gray-600">Not Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4 text-orange-600 fill-current" />
                  <span className="text-gray-600">Flagged</span>
                </div>
              </div>

              {flaggedQuestions.length > 0 && (
                <div className="mt-4 p-3 rounded-lg bg-orange-50 border border-orange-100">
                  <p className="text-sm text-orange-700">
                    {flaggedQuestions.length} question{flaggedQuestions.length !== 1 ? 's' : ''} flagged for review
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cancel Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to exit? Your progress will not be saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Quiz</AlertDialogCancel>
            <AlertDialogAction onClick={onCancel}>Exit Quiz</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Submit Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              You have answered {answeredCount} out of {totalQuestions} questions.
              {totalQuestions - answeredCount > 0 && (
                <span className="block mt-2 text-orange-600">
                  {totalQuestions - answeredCount} question{totalQuestions - answeredCount !== 1 ? 's' : ''} will be marked as incorrect.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Review Answers</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
              Submit Quiz
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
