import { useState } from 'react';
import { Brain, FileText, Sparkles, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';

interface QuizGenerationModalProps {
  open: boolean;
  onClose: () => void;
  onStartQuiz: (quiz: any) => void;
  topics: any[];
}

export function QuizGenerationModal({ open, onClose, onStartQuiz, topics }: QuizGenerationModalProps) {
  const [mode, setMode] = useState<'ai' | 'pastpapers'>('ai');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [numQuestions, setNumQuestions] = useState([20]);
  const [difficulty, setDifficulty] = useState('medium');
  const [examType, setExamType] = useState('');
  const [subject, setSubject] = useState('');
  const [selectionMethod, setSelectionMethod] = useState('semantic');

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleGenerate = () => {
    const quiz = {
      id: Date.now().toString(),
      mode,
      numQuestions: numQuestions[0],
      difficulty,
      selectedTopics,
      examType: mode === 'pastpapers' ? examType : undefined,
      subject: mode === 'pastpapers' ? subject : undefined,
      questions: generateMockQuestions(numQuestions[0]),
    };
    onStartQuiz(quiz);
    onClose();
  };

  const generateMockQuestions = (count: number) => {
    const mockQuestions = [];
    for (let i = 0; i < count; i++) {
      mockQuestions.push({
        id: `q${i + 1}`,
        question: `Sample question ${i + 1}: Which of the following correctly describes Newton's First Law of Motion?`,
        options: [
          'An object at rest stays at rest unless acted upon by a force',
          'Force equals mass times acceleration',
          'Every action has an equal and opposite reaction',
          'Energy cannot be created or destroyed',
        ],
        correctAnswer: 0,
        explanation: 'Newton\'s First Law, also known as the law of inertia, states that an object at rest will remain at rest, and an object in motion will continue in motion with constant velocity, unless acted upon by an external force.',
        difficulty: difficulty,
        topic: 'Mechanics',
      });
    }
    return mockQuestions;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate Quiz</DialogTitle>
        </DialogHeader>

        <Tabs value={mode} onValueChange={(v) => setMode(v as 'ai' | 'pastpapers')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI Generated
            </TabsTrigger>
            <TabsTrigger value="pastpapers" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Past Papers (RAG)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="space-y-6 mt-6">
            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-gray-900 mb-1">AI-Generated Questions</h4>
                  <p className="text-sm text-gray-600">
                    Custom questions created by Google Gemini AI based on your selected topics and difficulty level.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Topic Selection */}
              <div>
                <Label className="mb-3 block">Select Topics *</Label>
                <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 space-y-3">
                  {topics.map((chapter) => (
                    <div key={chapter.id}>
                      <h4 className="text-sm text-gray-900 mb-2">{chapter.chapter}</h4>
                      <div className="space-y-2 ml-4">
                        {chapter.topics.map((topic: any) => (
                          <div key={topic.id} className="flex items-center gap-2">
                            <Checkbox
                              id={`ai-${topic.id}`}
                              checked={selectedTopics.includes(topic.id)}
                              onCheckedChange={() => handleTopicToggle(topic.id)}
                            />
                            <label
                              htmlFor={`ai-${topic.id}`}
                              className="text-sm text-gray-700 cursor-pointer"
                            >
                              {topic.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Number of Questions */}
              <div>
                <Label className="mb-3 block">Number of Questions: {numQuestions[0]}</Label>
                <Slider
                  value={numQuestions}
                  onValueChange={setNumQuestions}
                  min={20}
                  max={100}
                  step={5}
                  className="mb-2"
                />
                <p className="text-xs text-gray-500">Range: 20-100 questions</p>
              </div>

              {/* Difficulty */}
              <div>
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={handleGenerate}
                disabled={selectedTopics.length === 0}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate AI Quiz
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="pastpapers" className="space-y-6 mt-6">
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-gray-900 mb-1">Real Past Paper Questions</h4>
                  <p className="text-sm text-gray-600">
                    246 questions from FAST and NET past papers. Uses semantic search to find relevant questions.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Exam Type */}
              <div>
                <Label htmlFor="examType">Exam Type *</Label>
                <Select value={examType} onValueChange={setExamType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FAST">FAST-NU</SelectItem>
                    <SelectItem value="NET">NUST NET</SelectItem>
                    <SelectItem value="MDCAT">MDCAT</SelectItem>
                    <SelectItem value="ECAT">ECAT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Subject */}
              <div>
                <Label htmlFor="pp-subject">Subject *</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Selection Method */}
              <div>
                <Label htmlFor="selectionMethod">Selection Method</Label>
                <Select value={selectionMethod} onValueChange={setSelectionMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semantic">Semantic Search (AI-based)</SelectItem>
                    <SelectItem value="hybrid">Hybrid (Semantic + Random)</SelectItem>
                    <SelectItem value="random">Random Selection</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  Semantic search uses AI to find questions most relevant to your study topics
                </p>
              </div>

              {/* Topic Selection */}
              <div>
                <Label className="mb-3 block">Filter by Topics (Optional)</Label>
                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-4 space-y-3">
                  {topics.map((chapter) => (
                    <div key={chapter.id}>
                      <h4 className="text-sm text-gray-900 mb-2">{chapter.chapter}</h4>
                      <div className="space-y-2 ml-4">
                        {chapter.topics.map((topic: any) => (
                          <div key={topic.id} className="flex items-center gap-2">
                            <Checkbox
                              id={`pp-${topic.id}`}
                              checked={selectedTopics.includes(topic.id)}
                              onCheckedChange={() => handleTopicToggle(topic.id)}
                            />
                            <label
                              htmlFor={`pp-${topic.id}`}
                              className="text-sm text-gray-700 cursor-pointer"
                            >
                              {topic.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Number of Questions */}
              <div>
                <Label className="mb-3 block">Number of Questions: {Math.min(numQuestions[0], 50)}</Label>
                <Slider
                  value={[Math.min(numQuestions[0], 50)]}
                  onValueChange={(v) => setNumQuestions(v)}
                  min={1}
                  max={50}
                  step={1}
                  className="mb-2"
                />
                <p className="text-xs text-gray-500">Range: 1-50 questions</p>
              </div>

              {/* Difficulty */}
              <div>
                <Label htmlFor="pp-difficulty">Difficulty Level</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={handleGenerate}
                disabled={!examType || !subject}
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate from Past Papers
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
