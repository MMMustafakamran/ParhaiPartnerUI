import { useState } from 'react';
import { Upload, FileText, File, Download, Trash2, Eye, CheckCircle2, XCircle, Plus, Search, Filter, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

export function DocumentCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showBuilder, setShowBuilder] = useState(false);
  const [builderType, setBuilderType] = useState<'sop' | 'lor' | 'essay'>('sop');

  const documents = [
    {
      id: '1',
      name: 'Statement of Purpose - NUST',
      type: 'sop',
      status: 'approved',
      uploadedAt: '2025-11-10',
      size: '2.4 MB',
      sharedWith: ['Counsellor 1'],
    },
    {
      id: '2',
      name: 'Letter of Recommendation - Physics',
      type: 'lor',
      status: 'pending',
      uploadedAt: '2025-11-08',
      size: '1.8 MB',
      sharedWith: [],
    },
    {
      id: '3',
      name: 'Academic Transcripts',
      type: 'transcript',
      status: 'approved',
      uploadedAt: '2025-11-05',
      size: '3.2 MB',
      sharedWith: ['Counsellor 1'],
    },
    {
      id: '4',
      name: 'Personal Essay - LUMS',
      type: 'essay',
      status: 'draft',
      uploadedAt: '2025-11-12',
      size: '1.5 MB',
      sharedWith: [],
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sop':
        return 'bg-purple-100 text-purple-700';
      case 'lor':
        return 'bg-blue-100 text-blue-700';
      case 'essay':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-600" />;
      case 'draft':
        return <XCircle className="w-4 h-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-semibold text-gray-900">Document Center</h1>
          <div className="flex gap-2">
            <Dialog open={showBuilder} onOpenChange={setShowBuilder}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Build Document
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Document Builder</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Document Type</Label>
                    <Select value={builderType} onValueChange={(v) => setBuilderType(v as any)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sop">Statement of Purpose (SOP)</SelectItem>
                        <SelectItem value="lor">Letter of Recommendation (LOR)</SelectItem>
                        <SelectItem value="essay">Personal Essay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Content</Label>
                    <Textarea
                      placeholder="Start writing or use AI to generate..."
                      rows={10}
                      className="resize-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">AI Generate</Button>
                    <Button variant="outline" className="flex-1">Check Plagiarism</Button>
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Save</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
        <p className="text-gray-600">Manage your application documents</p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="sop">SOP</SelectItem>
            <SelectItem value="lor">LOR</SelectItem>
            <SelectItem value="essay">Essay</SelectItem>
            <SelectItem value="transcript">Transcripts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <Card key={doc.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex items-center gap-1">
                  {getStatusIcon(doc.status)}
                </div>
              </div>

              <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">{doc.name}</h4>

              <div className="flex items-center gap-2 mb-3">
                <Badge className={getTypeColor(doc.type)}>
                  {doc.type.toUpperCase()}
                </Badge>
                <span className="text-xs text-gray-500">{doc.size}</span>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
              </div>

              {doc.sharedWith.length > 0 && (
                <div className="text-xs text-gray-600 mb-4">
                  Shared with: {doc.sharedWith.join(', ')}
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600 mb-6">Upload or create your first document</p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

