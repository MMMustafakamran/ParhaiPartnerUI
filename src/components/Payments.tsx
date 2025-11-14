import { CreditCard, CheckCircle2, Clock, XCircle, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function Payments() {
  const plans = [
    {
      id: '1',
      name: 'Basic',
      price: 'Free',
      features: ['Basic study plans', 'Limited quizzes', 'Community support'],
      current: false,
    },
    {
      id: '2',
      name: 'Premium',
      price: 'Rs. 2,999/month',
      features: ['Unlimited study plans', 'AI-generated quizzes', 'Priority support', 'Advanced analytics'],
      current: true,
    },
    {
      id: '3',
      name: 'Pro',
      price: 'Rs. 4,999/month',
      features: [
        'Everything in Premium',
        '1-on-1 counselling',
        'Document review',
        'Exam predictions',
        'Dedicated support',
      ],
      current: false,
    },
  ];

  const transactions = [
    {
      id: '1',
      description: 'Premium Subscription',
      amount: 'Rs. 2,999',
      date: '2025-11-01',
      status: 'completed',
      invoice: true,
    },
    {
      id: '2',
      description: 'Counsellor Session',
      amount: 'Rs. 1,500',
      date: '2025-10-15',
      status: 'completed',
      invoice: true,
    },
    {
      id: '3',
      description: 'Premium Subscription',
      amount: 'Rs. 2,999',
      date: '2025-10-01',
      status: 'completed',
      invoice: true,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Payments</h1>
        <p className="text-gray-600">Manage your subscriptions and payments</p>
      </div>

      <Tabs defaultValue="plans" className="space-y-6">
        <TabsList>
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
        </TabsList>

        {/* Plans Tab */}
        <TabsContent value="plans" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`border-0 shadow-sm transition-all ${
                  plan.current ? 'ring-2 ring-purple-600 shadow-md' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    {plan.current && (
                      <Badge className="bg-purple-600 text-white">Current</Badge>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{plan.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.current
                        ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? 'Current Plan' : 'Subscribe'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{transaction.amount}</p>
                        <Badge className={getStatusColor(transaction.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(transaction.status)}
                            {transaction.status}
                          </span>
                        </Badge>
                      </div>
                      {transaction.invoice && (
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Invoice
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

