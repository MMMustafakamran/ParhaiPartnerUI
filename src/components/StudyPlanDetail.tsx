import { useState } from 'react';
import { ArrowLeft, Plus, Brain, FileText, CheckCircle2, Circle, ChevronDown, ChevronRight, Sparkles, Clock, MessageSquare, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { QuizGenerationModal } from './QuizGenerationModal';
import { Checkbox } from './ui/checkbox';

interface StudyPlanDetailProps {
  planId: string;
  onStartQuiz: (quiz: any) => void;
  onBack: () => void;
}

export function StudyPlanDetail({ planId, onStartQuiz, onBack }: StudyPlanDetailProps) {
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState<string[]>(['1', '2']);

  // Mock data
  const plan = {
    id: planId,
    title: 'NUST NET Engineering Prep',
    subject: 'Physics',
    testType: 'NUST NET',
    progress: 65,
    startDate: '2025-10-15',
    endDate: '2025-12-15',
    goal: 'Master mechanics and thermodynamics for NET entrance exam',
  };

  const topics = [
    {
      id: '1',
      chapter: 'Mechanics',
      topics: [
        { id: '1-1', name: 'Motion in One Dimension', status: 'done' },
        { id: '1-2', name: 'Motion in Two Dimensions', status: 'done' },
        { id: '1-3', name: "Newton's Laws of Motion", status: 'done' },
        { id: '1-4', name: 'Work and Energy', status: 'todo' },
        { id: '1-5', name: 'Momentum and Collisions', status: 'todo' },
      ],
    },
    {
      id: '2',
      chapter: 'Thermodynamics',
      topics: [
        { id: '2-1', name: 'Temperature and Heat', status: 'done' },
        { id: '2-2', name: 'First Law of Thermodynamics', status: 'done' },
        { id: '2-3', name: 'Heat Engines', status: 'todo' },
        { id: '2-4', name: 'Entropy', status: 'todo' },
      ],
    },
    {
      id: '3',
      chapter: 'Electromagnetism',
      topics: [
        { id: '3-1', name: 'Electric Fields', status: 'todo' },
        { id: '3-2', name: 'Magnetic Fields', status: 'todo' },
        { id: '3-3', name: "Maxwell's Equations", status: 'todo' },
      ],
    },
  ];

  const quizHistory = [
    { id: '1', title: 'Mechanics Quiz 1', score: 85, questions: 20, date: '2025-11-10', difficulty: 'Medium' },
    { id: '2', title: 'Thermodynamics Practice', score: 78, questions: 15, date: '2025-11-08', difficulty: 'Hard' },
    { id: '3', title: 'Motion Quiz', score: 92, questions: 25, date: '2025-11-05', difficulty: 'Easy' },
  ];

  const notes = [
    { 
      id: '1', 
      title: 'Motion Formulas', 
      difficulty: 'Easy', 
      lastEdited: '2025-11-10',
      isAIGenerated: true,
      validationStatus: 'pending' as 'pending' | 'approved' | 'rejected',
      validatedBy: null as string | null,
    },
    { 
      id: '2', 
      title: 'Thermodynamics Key Concepts', 
      difficulty: 'Medium', 
      lastEdited: '2025-11-08',
      isAIGenerated: true,
      validationStatus: 'approved' as 'pending' | 'approved' | 'rejected',
      validatedBy: 'Dr. Ahmed',
    },
    {
      id: '3',
      title: 'Manual Study Notes',
      difficulty: 'Hard',
      lastEdited: '2025-11-09',
      isAIGenerated: false,
      validationStatus: null,
      validatedBy: null,
    },
  ];

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev =>
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const toggleTopicStatus = (topicId: string) => {
    console.log('Toggle topic:', topicId);
  };

  const totalTopics = topics.reduce((sum, chapter) => sum + chapter.topics.length, 0);
  const completedTopics = topics.reduce(
    (sum, chapter) => sum + chapter.topics.filter(t => t.status === 'done').length,
    0
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Plans
        </Button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-gray-900 mb-2">{plan.title}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{plan.testType}</Badge>
              <Badge variant="outline">{plan.subject}</Badge>
              <span className="text-sm text-gray-600">
                {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
              </span>
            </div>
            {plan.goal && (
              <p className="text-gray-600 mt-2">{plan.goal}</p>
            )}
          </div>
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={() => setShowQuizModal(true)}
          >
            <Brain className="w-4 h-4 mr-2" />
            Generate Quiz
          </Button>
        </div>
      </div>

      {/* Progress Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-gray-900 mb-1">Overall Progress</h3>
              <p className="text-sm text-gray-600">{completedTopics} of {totalTopics} topics completed</p>
            </div>
            <div className="text-right">
              <p className="text-purple-600">{plan.progress}%</p>
            </div>
          </div>
          <Progress value={plan.progress} className="h-3" />
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="topics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="quizzes">Quiz History</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="topics">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Study Topics</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Topic
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topics.map((chapter) => {
                  const isExpanded = expandedChapters.includes(chapter.id);
                  const chapterCompleted = chapter.topics.filter(t => t.status === 'done').length;
                  const chapterTotal = chapter.topics.length;
                  const chapterProgress = (chapterCompleted / chapterTotal) * 100;

                  return (
                    <div key={chapter.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      {/* Chapter Header */}
                      <button
                        onClick={() => toggleChapter(chapter.id)}
                        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                          <div className="text-left">
                            <h4 className="text-gray-900">{chapter.chapter}</h4>
                            <p className="text-sm text-gray-600">{chapterCompleted}/{chapterTotal} topics completed</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-32">
                            <Progress value={chapterProgress} className="h-2" />
                          </div>
                          <span className="text-sm text-purple-600 w-12 text-right">
                            {Math.round(chapterProgress)}%
                          </span>
                        </div>
                      </button>

                      {/* Topics List */}
                      {isExpanded && (
                        <div className="border-t border-gray-200 bg-gray-50">
                          {chapter.topics.map((topic) => (
                            <div
                              key={topic.id}
                              className="px-4 py-3 flex items-center gap-3 hover:bg-white transition-colors border-b border-gray-100 last:border-0"
                            >
                              <Checkbox
                                checked={topic.status === 'done'}
                                onCheckedChange={() => toggleTopicStatus(topic.id)}
                                id={topic.id}
                              />
                              <label
                                htmlFor={topic.id}
                                className={`flex-1 cursor-pointer text-sm ${
                                  topic.status === 'done' ? 'text-gray-500 line-through' : 'text-gray-900'
                                }`}
                              >
                                {topic.name}
                              </label>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Open doubt solver for this topic
                                    console.log('Open doubt solver for:', topic.name);
                                  }}
                                  className="p-1.5 rounded-md hover:bg-purple-50 text-gray-500 hover:text-purple-600 transition-colors"
                                  aria-label={`Ask doubt about ${topic.name}`}
                                  title="Ask a doubt"
                                >
                                  <MessageSquare className="w-4 h-4" />
                                </button>
                                {topic.status === 'done' && (
                                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quizzes">
          <Card>
            <CardHeader>
              <CardTitle>Quiz History</CardTitle>
            </CardHeader>
            <CardContent>
              {quizHistory.length > 0 ? (
                <div className="space-y-3">
                  {quizHistory.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-gray-900">{quiz.title}</h4>
                          <p className="text-sm text-gray-600">{quiz.questions} questions • {quiz.difficulty}</p>
                        </div>
                        <Badge
                          variant={quiz.score >= 80 ? 'default' : quiz.score >= 60 ? 'secondary' : 'destructive'}
                          className={
                            quiz.score >= 80 ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                            quiz.score >= 60 ? 'bg-orange-100 text-orange-700 hover:bg-orange-100' :
                            'bg-red-100 text-red-700 hover:bg-red-100'
                          }
                        >
                          {quiz.score}%
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{new Date(quiz.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <Button variant="link" size="sm" className="h-auto p-0">
                          Review Answers
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">No quizzes yet</h3>
                  <p className="text-gray-600 mb-6">Generate your first quiz to start practicing</p>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() => setShowQuizModal(true)}
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Generate Quiz
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Study Notes</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Generate
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {notes.length > 0 ? (
                <div className="space-y-3">
                  {notes.map((note) => {
                    const getValidationBadge = () => {
                      if (!note.isAIGenerated) return null;
                      
                      switch (note.validationStatus) {
                        case 'pending':
                          return (
                            <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                              <Clock className="w-3 h-3 mr-1" />
                              Pending Validation
                            </Badge>
                          );
                        case 'approved':
                          return (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Approved {note.validatedBy && `by ${note.validatedBy}`}
                            </Badge>
                          );
                        case 'rejected':
                          return (
                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                              <X className="w-3 h-3 mr-1" />
                              Rejected
                            </Badge>
                          );
                        default:
                          return null;
                      }
                    };

                    return (
                      <div
                        key={note.id}
                        className="p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2 flex-1">
                            <FileText className="w-5 h-5 text-purple-600 flex-shrink-0" />
                            <h4 className="text-gray-900">{note.title}</h4>
                            {note.isAIGenerated && (
                              <Badge variant="secondary" className="text-xs">
                                <Sparkles className="w-3 h-3 mr-1" />
                                AI Generated
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{note.difficulty}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-sm text-gray-600">
                            Last edited: {new Date(note.lastEdited).toLocaleDateString()}
                          </p>
                          <div className="flex items-center gap-2">
                            {getValidationBadge()}
                            <button
                              onClick={() => {
                                // Open doubt solver for this note
                                console.log('Open doubt solver for note:', note.title);
                              }}
                              className="p-1.5 rounded-md hover:bg-purple-50 text-gray-500 hover:text-purple-600 transition-colors"
                              aria-label={`Ask doubt about ${note.title}`}
                              title="Ask a doubt"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">No notes yet</h3>
                  <p className="text-gray-600 mb-6">Add notes to organize your study materials</p>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <QuizGenerationModal
        open={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        onStartQuiz={onStartQuiz}
        topics={topics}
      />
    </div>
  );
}
