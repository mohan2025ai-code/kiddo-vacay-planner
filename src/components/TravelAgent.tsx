import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Plane, Users, DollarSign, MessageCircle, Send, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import travelHero from '@/assets/travel-hero.jpg';

interface TravelMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

interface TravelPreferences {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: string;
  budget: string;
  comfort: string;
  interests: string[];
  agentTheme: string;
}

export const TravelAgent = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<TravelMessage[]>([
    {
      id: '1',
      type: 'agent',
      content: "Hello! I'm your personal travel assistant 🌍 I'll help you plan the perfect family vacation based on your children's school holidays, budget, and comfort preferences. Let's start by telling me about your dream destination!",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [preferences, setPreferences] = useState<TravelPreferences>({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: '',
    budget: '',
    comfort: '',
    interests: [],
    agentTheme: 'friendly'
  });
  const [showPreferences, setShowPreferences] = useState(true);

  const agentThemes = [
    { value: 'friendly', label: 'Friendly & Helpful', emoji: '😊' },
    { value: 'luxury', label: 'Luxury Concierge', emoji: '✨' },
    { value: 'adventure', label: 'Adventure Guide', emoji: '🏔️' },
    { value: 'family', label: 'Family Specialist', emoji: '👨‍👩‍👧‍👦' },
    { value: 'budget', label: 'Budget Expert', emoji: '💰' }
  ];

  const interestOptions = [
    'Beach & Relaxation', 'Adventure & Outdoor', 'Cultural Experiences', 
    'Theme Parks', 'Food & Dining', 'Museums & History', 'Nature & Wildlife',
    'Shopping', 'Sports & Activities', 'Local Festivals'
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: TravelMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate AI response
    setTimeout(() => {
      const agentMessage: TravelMessage = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: generateAgentResponse(newMessage, preferences),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  const generateAgentResponse = (userInput: string, prefs: TravelPreferences) => {
    const responses = [
      `That sounds amazing! Based on your preferences for ${prefs.destination || 'your destination'}, I'm thinking of some fantastic options. With a ${prefs.comfort} comfort level and ${prefs.budget} budget, I can suggest some perfect family-friendly accommodations.`,
      `Perfect! I love that you're considering the school holiday dates. Let me check the best travel deals for ${prefs.startDate} to ${prefs.endDate}. This timing actually works great for avoiding crowds!`,
      `Excellent choice! For a family of ${prefs.travelers || 'your size'}, I recommend booking early to get the best rates. I'm already seeing some amazing packages that include kid-friendly activities.`,
      `I'm excited to help plan this! Given your interests in ${prefs.interests.join(', ')}, I have some incredible experiences in mind that the whole family will love.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const toggleInterest = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const startPlanning = () => {
    if (!preferences.destination || !preferences.startDate || !preferences.endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in destination and travel dates to get started.",
        variant: "destructive"
      });
      return;
    }

    setShowPreferences(false);
    const planningMessage: TravelMessage = {
      id: Date.now().toString(),
      type: 'agent',
      content: `Perfect! I have all the details I need. Based on your preferences for ${preferences.destination}, traveling from ${preferences.startDate} to ${preferences.endDate} with a ${preferences.budget} budget and ${preferences.comfort} comfort level, I'm creating a personalized travel plan. Let me search for the best family-friendly options that match your interests in ${preferences.interests.slice(0, 3).join(', ')}${preferences.interests.length > 3 ? ' and more' : ''}! 🏖️✈️`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, planningMessage]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/10 to-accent-light/20">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={travelHero} 
          alt="Beautiful family vacation scene" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent">
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-4">Your Personal Travel AI Agent</h1>
              <p className="text-xl mb-6">Plan perfect family vacations around school holidays with personalized recommendations</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>School Holiday Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Budget Optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Personalization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Preferences Panel */}
          {showPreferences && (
            <div className="lg:col-span-1">
              <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="w-5 h-5 text-primary" />
                    Travel Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Agent Theme</Label>
                    <Select value={preferences.agentTheme} onValueChange={(value) => setPreferences(prev => ({ ...prev, agentTheme: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {agentThemes.map(theme => (
                          <SelectItem key={theme.value} value={theme.value}>
                            {theme.emoji} {theme.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <Input 
                      placeholder="Where would you like to go?"
                      value={preferences.destination}
                      onChange={(e) => setPreferences(prev => ({ ...prev, destination: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input 
                        type="date"
                        value={preferences.startDate}
                        onChange={(e) => setPreferences(prev => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input 
                        type="date"
                        value={preferences.endDate}
                        onChange={(e) => setPreferences(prev => ({ ...prev, endDate: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Number of Travelers</Label>
                    <Select value={preferences.travelers} onValueChange={(value) => setPreferences(prev => ({ ...prev, travelers: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select travelers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 people</SelectItem>
                        <SelectItem value="3-4">3-4 people</SelectItem>
                        <SelectItem value="5-6">5-6 people</SelectItem>
                        <SelectItem value="7+">7+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Budget Range</Label>
                    <Select value={preferences.budget} onValueChange={(value) => setPreferences(prev => ({ ...prev, budget: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Budget ($1,000-$3,000)</SelectItem>
                        <SelectItem value="mid-range">Mid-range ($3,000-$7,000)</SelectItem>
                        <SelectItem value="luxury">Luxury ($7,000+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Comfort Level</Label>
                    <Select value={preferences.comfort} onValueChange={(value) => setPreferences(prev => ({ ...prev, comfort: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select comfort level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="comfort">Comfort</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Interests & Activities</Label>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map(interest => (
                        <Badge
                          key={interest}
                          variant={preferences.interests.includes(interest) ? "default" : "outline"}
                          className="cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => toggleInterest(interest)}
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={startPlanning}
                    variant="hero"
                    size="lg"
                    className="w-full"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Planning My Trip
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Chat Interface */}
          <div className={showPreferences ? "lg:col-span-2" : "lg:col-span-3"}>
            <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-card h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    Travel Planning Assistant
                  </div>
                  {!showPreferences && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowPreferences(true)}
                    >
                      Edit Preferences
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs opacity-70 mt-2 block">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} variant="travel">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};