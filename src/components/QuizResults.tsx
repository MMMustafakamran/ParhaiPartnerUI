import { CheckCircle2, XCircle, AlertCircle, Trophy, Target, BarChart3, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface QuizResultsProps {
  results: any;
  onBackToPlan: () => void;
}

export function QuizResults({ results, onBackToPlan }: QuizResultsProps) {
  const scoreColor = results.score >= 80 ? 'green' : results.score >= 60 ? 'orange' : 'red';

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={onBackToPlan} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Study Plan
        </Button>
        <h1 className="text-gray-900 mb-2">Quiz Results</h1>
        <p className="text-gray-600">Review your performance and learn from mistakes</p>
      </div>

      {/* Score Overview */}
      <Card className="mb-6">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Score */}
            <div className="text-center">
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-${scoreColor}-400 to-${scoreColor}-600 flex items-center justify-center mx-auto mb-3`}>
                <div className="text-center">
                  <div className="text-white">{results.score}%</div>
                  <div className="text-xs text-white opacity-90">Score</div>
                </div>
              </div>
              <Badge
                variant={results.passed ? 'default' : 'destructive'}
                className={results.passed ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
              >
                {results.passed ? 'Passed' : 'Failed'}
              </Badge>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50 border border-green-100">
              <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-900">{results.correctCount}</p>
                <p className="text-sm text-gray-600">Correct</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg bg-red-50 border border-red-100">
              <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-900">{results.incorrectCount}</p>
                <p className="text-sm text-gray-600">Incorrect</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="w-12 h-12 rounded-lg bg-gray-600 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-900">{results.unansweredCount}</p>
                <p className="text-sm text-gray-600">Unanswered</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Accuracy</span>
              <span className="text-purple-600">
                {results.correctCount}/{results.totalQuestions} questions
              </span>
            </div>
            <Progress value={results.score} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Questions ({results.totalQuestions})</TabsTrigger>
          <TabsTrigger value="incorrect">Incorrect ({results.incorrectCount})</TabsTrigger>
          <TabsTrigger value="correct">Correct ({results.correctCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {results.questions.map((q: any, index: number) => (
              <QuestionReview key={q.questionId} question={q} index={index} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="incorrect">
          <div className="space-y-4">
            {results.questions
              .filter((q: any) => !q.isCorrect)
              .map((q: any, index: number) => (
                <QuestionReview key={q.questionId} question={q} index={index} />
              ))}
            {results.incorrectCount === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Trophy className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">Perfect Score!</h3>
                  <p className="text-gray-600">You answered all questions correctly.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="correct">
          <div className="space-y-4">
            {results.questions
              .filter((q: any) => q.isCorrect)
              .map((q: any, index: number) => (
                <QuestionReview key={q.questionId} question={q} index={index} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <Button
          onClick={onBackToPlan}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          Back to Study Plan
        </Button>
        <Button variant="outline">
          Retake Quiz
        </Button>
        <Button variant="outline">
          Download Report
        </Button>
      </div>
    </div>
  );
}

function QuestionReview({ question, index }: { question: any; index: number }) {
  const userAnswered = question.userAnswer !== undefined;

  return (
    <Card className={`border-l-4 ${
      question.isCorrect
        ? 'border-l-green-500'
        : userAnswered
        ? 'border-l-red-500'
        : 'border-l-gray-400'
    }`}>
      <CardContent className="p-6">
        {/* Question Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">Question {index + 1}</Badge>
              {question.topic && <Badge variant="secondary">{question.topic}</Badge>}
              {question.isCorrect ? (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Correct
                </Badge>
              ) : userAnswered ? (
                <Badge variant="destructive">
                  <XCircle className="w-3 h-3 mr-1" />
                  Incorrect
                </Badge>
              ) : (
                <Badge variant="secondary">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Not Answered
                </Badge>
              )}
            </div>
            <h4 className="text-gray-900">{question.question}</h4>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-2 mb-4">
          {question.options.map((option: string, optionIndex: number) => {
            const isCorrect = optionIndex === question.correctAnswer;
            const isUserAnswer = optionIndex === question.userAnswer;
            const optionLabel = String.fromCharCode(65 + optionIndex);

            let bgColor = 'bg-gray-50';
            let borderColor = 'border-gray-200';
            let textColor = 'text-gray-900';

            if (isCorrect) {
              bgColor = 'bg-green-50';
              borderColor = 'border-green-500';
              textColor = 'text-green-900';
            } else if (isUserAnswer && !isCorrect) {
              bgColor = 'bg-red-50';
              borderColor = 'border-red-500';
              textColor = 'text-red-900';
            }

            return (
              <div
                key={optionIndex}
                className={`p-3 rounded-lg border-2 ${bgColor} ${borderColor}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${
                    isCorrect
                      ? 'bg-green-600 text-white'
                      : isUserAnswer
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {optionLabel}
                  </div>
                  <span className={textColor}>{option}</span>
                  {isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" />
                  )}
                  {isUserAnswer && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Explanation */}
        {question.explanation && (
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-sm text-blue-900 mb-1">Explanation</h5>
                <p className="text-sm text-blue-800">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
