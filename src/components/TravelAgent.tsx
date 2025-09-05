import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Plane, Users, DollarSign, MessageCircle, Send, Sparkles, CheckCircle, MapIcon, Compass } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import travelHero from '@/assets/travel-hero.jpg';
import logo from '@/assets/logo-improved.png';

interface TravelMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

interface FlightOption {
  id: string;
  airline: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  stops: number;
  departureTime: string;
  arrivalTime: string;
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
  searchQuery?: string;
}

interface ItineraryDay {
  day: number;
  date: string;
  morning: string;
  afternoon: string;
  evening: string;
  dining: string;
  accommodation?: string;
}

interface TravelState {
  searchResults: FlightOption[];
  isSearching: boolean;
  itinerary: ItineraryDay[];
  isGeneratingItinerary: boolean;
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
  const [travelState, setTravelState] = useState<TravelState>({
    searchResults: [],
    isSearching: false,
    itinerary: [],
    isGeneratingItinerary: false
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
    const lowerInput = userInput.toLowerCase();
    
    // Check if user is asking about flights
    if (lowerInput.includes('flight') || lowerInput.includes('fly') || lowerInput.includes('airline')) {
      searchFlights(prefs);
      return "I'm searching for the best flight options for you! Let me find flights that match your preferences and budget...";
    }
    
    // Check if user is asking for itinerary
    if (lowerInput.includes('itinerary') || lowerInput.includes('plan') || lowerInput.includes('schedule') || lowerInput.includes('day by day')) {
      generateItinerary(prefs, userInput);
      return "Let me create a detailed itinerary for your trip! I'll include activities, dining recommendations, and perfect timing based on your preferences...";
    }
    
    const responses = [
      `That sounds amazing! Based on your preferences for ${prefs.destination || 'your destination'}, I'm thinking of some fantastic options. With a ${prefs.comfort} comfort level and ${prefs.budget} budget, I can suggest some perfect family-friendly accommodations.`,
      `Perfect! I love that you're considering the school holiday dates. Let me check the best travel deals for ${prefs.startDate} to ${prefs.endDate}. This timing actually works great for avoiding crowds!`,
      `Excellent choice! For a family of ${prefs.travelers || 'your size'}, I recommend booking early to get the best rates. I'm already seeing some amazing packages that include kid-friendly activities.`,
      `I'm excited to help plan this! Given your interests in ${prefs.interests.join(', ')}, I have some incredible experiences in mind that the whole family will love.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const searchFlights = (prefs: TravelPreferences) => {
    setTravelState(prev => ({ ...prev, isSearching: true }));
    
    // Simulate flight search API call
    setTimeout(() => {
      const mockFlights: FlightOption[] = [
        {
          id: '1',
          airline: 'SkyWings Airlines',
          departure: 'New York (JFK)',
          arrival: prefs.destination || 'Paris (CDG)',
          duration: '7h 30m',
          price: prefs.budget === 'budget' ? 650 : prefs.budget === 'mid-range' ? 850 : 1200,
          stops: 0,
          departureTime: '08:30',
          arrivalTime: '16:00'
        },
        {
          id: '2',
          airline: 'Global Express',
          departure: 'New York (LGA)',
          arrival: prefs.destination || 'Paris (ORY)',
          duration: '9h 15m',
          price: prefs.budget === 'budget' ? 580 : prefs.budget === 'mid-range' ? 720 : 980,
          stops: 1,
          departureTime: '14:20',
          arrivalTime: '23:35'
        },
        {
          id: '3',
          airline: 'Premium Air',
          departure: 'New York (JFK)',
          arrival: prefs.destination || 'Paris (CDG)',
          duration: '7h 45m',
          price: prefs.budget === 'budget' ? 720 : prefs.budget === 'mid-range' ? 950 : 1350,
          stops: 0,
          departureTime: '22:15',
          arrivalTime: '06:00+1'
        },
        {
          id: '4',
          airline: 'Budget Airways',
          departure: 'New York (EWR)',
          arrival: prefs.destination || 'Paris (BVA)',
          duration: '11h 20m',
          price: prefs.budget === 'budget' ? 420 : prefs.budget === 'mid-range' ? 580 : 750,
          stops: 2,
          departureTime: '06:45',
          arrivalTime: '18:05'
        }
      ];
      
      setTravelState(prev => ({ 
        ...prev, 
        searchResults: mockFlights,
        isSearching: false
      }));
      
      // Add flight results message
      const flightMessage: TravelMessage = {
        id: (Date.now() + 2).toString(),
        type: 'agent',
        content: `Great! I found ${mockFlights.length} flight options for your trip to ${prefs.destination}. The options range from budget-friendly to premium, with prices starting at $${Math.min(...mockFlights.map(f => f.price))}. Check the results below and let me know which one interests you!`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, flightMessage]);
    }, 2000);
  };

  const generateItinerary = (prefs: TravelPreferences, userInput: string) => {
    setTravelState(prev => ({ ...prev, isGeneratingItinerary: true }));
    
    // Simulate itinerary generation
    setTimeout(() => {
      const startDate = new Date(prefs.startDate || '2024-07-01');
      const endDate = new Date(prefs.endDate || '2024-07-07');
      const dayCount = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;
      
      const mockItinerary: ItineraryDay[] = Array.from({ length: Math.min(dayCount, 7) }, (_, index) => {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + index);
        
        const activities = getActivitiesByInterests(prefs.interests, prefs.destination);
        const dayActivities = activities[index % activities.length];
        
        return {
          day: index + 1,
          date: currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
          morning: dayActivities.morning,
          afternoon: dayActivities.afternoon,
          evening: dayActivities.evening,
          dining: dayActivities.dining,
          accommodation: index === 0 ? getAccommodationByBudget(prefs.budget, prefs.comfort) : undefined
        };
      });
      
      setTravelState(prev => ({ 
        ...prev, 
        itinerary: mockItinerary,
        isGeneratingItinerary: false
      }));
      
      // Add itinerary message
      const itineraryMessage: TravelMessage = {
        id: (Date.now() + 3).toString(),
        type: 'agent',
        content: `Perfect! I've created a ${dayCount}-day itinerary for your trip to ${prefs.destination}. This plan includes activities tailored to your interests in ${prefs.interests.slice(0, 2).join(' and ')}, restaurant recommendations, and accommodations that fit your ${prefs.budget} budget. Check out the detailed day-by-day plan below!`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, itineraryMessage]);
    }, 2500);
  };

  const getActivitiesByInterests = (interests: string[], destination: string) => {
    const activitySets = [
      {
        morning: "Visit iconic landmarks and take photos",
        afternoon: "Explore local museums and cultural sites",
        evening: "Enjoy sunset views at scenic viewpoint",
        dining: "Traditional local cuisine at highly-rated restaurant"
      },
      {
        morning: "Adventure activity (hiking, water sports, etc.)",
        afternoon: "Visit local markets and shopping districts",
        evening: "Live entertainment or cultural show",
        dining: "Family-friendly restaurant with local specialties"
      },
      {
        morning: "Nature park or botanical garden visit",
        afternoon: "Interactive activities for the whole family",
        evening: "Relaxing beachside or park stroll",
        dining: "Casual dining with international options"
      },
      {
        morning: "Historical sites and guided tour",
        afternoon: "Local experiences and workshops",
        evening: "Night market or local festivities",
        dining: "Fine dining experience with regional cuisine"
      }
    ];
    return activitySets;
  };

  const getAccommodationByBudget = (budget: string, comfort: string) => {
    const accommodations = {
      budget: "Budget-friendly hotel with family amenities",
      "mid-range": "Mid-range hotel with pool and family facilities",
      luxury: "Luxury resort with premium family services"
    };
    return accommodations[budget as keyof typeof accommodations] || accommodations["mid-range"];
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
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={logo} 
                  alt="TravelMate AI Logo" 
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h1 className="text-5xl font-bold mb-2">TravelMate AI</h1>
                  <p className="text-xl opacity-90">Your Personal Travel AI Agent</p>
                </div>
              </div>
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

          {/* Tabbed Interface */}
          <div className={showPreferences ? "lg:col-span-2" : "lg:col-span-3"}>
            <Card className="bg-gradient-card backdrop-blur-sm border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-primary" />
                    TravelMate AI Assistant
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

              <CardContent>
                <Tabs defaultValue="planning" className="h-[600px] flex flex-col">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="planning" className="flex items-center gap-2">
                      <MapIcon className="w-4 h-4" />
                      Travel Planning Assistant
                    </TabsTrigger>
                    <TabsTrigger value="assistant" className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Travel Assistant
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="planning" className="flex-1 flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Plan Your Perfect Trip</h3>
                      <p className="text-muted-foreground text-sm">Get personalized recommendations based on school holidays, budget, and preferences</p>
                    </div>
                    
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4 bg-muted/20 rounded-lg p-4">
                      {messages.map(message => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-4 rounded-2xl ${
                              message.type === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-background text-foreground shadow-sm border'
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

                    {/* Flight Search Results */}
                    {travelState.searchResults.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Plane className="w-4 h-4 text-primary" />
                          Flight Options Found
                        </h4>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {travelState.searchResults.map(flight => (
                            <Card key={flight.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer border hover:border-primary/30">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="font-semibold text-sm">{flight.airline}</span>
                                    {flight.stops === 0 && (
                                      <Badge variant="secondary" className="text-xs">Direct</Badge>
                                    )}
                                    {flight.stops > 0 && (
                                      <Badge variant="outline" className="text-xs">{flight.stops} stop{flight.stops > 1 ? 's' : ''}</Badge>
                                    )}
                                  </div>
                                  <div className="text-sm text-muted-foreground mb-1">
                                    <span className="font-medium">{flight.departureTime}</span> {flight.departure} → 
                                    <span className="font-medium ml-1">{flight.arrivalTime}</span> {flight.arrival}
                                  </div>
                                  <div className="text-xs text-muted-foreground">Duration: {flight.duration}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-bold text-primary">${flight.price}</div>
                                  <div className="text-xs text-muted-foreground">per person</div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Itinerary Results */}
                    {travelState.itinerary.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <MapIcon className="w-4 h-4 text-primary" />
                          Your Personalized Itinerary
                        </h4>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {travelState.itinerary.map(day => (
                            <Card key={day.day} className="p-4 border hover:border-primary/30 transition-colors">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                                  {day.day}
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-semibold text-sm mb-1">{day.date}</h5>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Morning</span>
                                      <p className="text-foreground">{day.morning}</p>
                                    </div>
                                    <div>
                                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Afternoon</span>
                                      <p className="text-foreground">{day.afternoon}</p>
                                    </div>
                                    <div>
                                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Evening</span>
                                      <p className="text-foreground">{day.evening}</p>
                                    </div>
                                    <div>
                                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Dining</span>
                                      <p className="text-foreground">{day.dining}</p>
                                    </div>
                                    {day.accommodation && (
                                      <div>
                                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Accommodation</span>
                                        <p className="text-foreground">{day.accommodation}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {travelState.isSearching && (
                      <div className="mb-4 p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                          <span className="text-sm">Searching for flights...</span>
                        </div>
                      </div>
                    )}

                    {travelState.isGeneratingItinerary && (
                      <div className="mb-4 p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                          <span className="text-sm">Creating your personalized itinerary...</span>
                        </div>
                      </div>
                    )}

                    {/* Message Input */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask about destinations, flights, or request an itinerary..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} variant="travel">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="assistant" className="flex-1 flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">Travel Support & Management</h3>
                      <p className="text-muted-foreground text-sm">Get help with bookings, itinerary changes, and travel assistance</p>
                    </div>

                    <div className="flex-1 space-y-6">
                      {/* Quick Actions */}
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary/20">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Calendar className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">Modify Booking</h4>
                              <p className="text-xs text-muted-foreground">Change dates or details</p>
                            </div>
                          </div>
                        </Card>

                        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary/20">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-secondary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">Check Itinerary</h4>
                              <p className="text-xs text-muted-foreground">View your trip details</p>
                            </div>
                          </div>
                        </Card>

                        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary/20">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                              <Users className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">Travel Support</h4>
                              <p className="text-xs text-muted-foreground">24/7 assistance</p>
                            </div>
                          </div>
                        </Card>

                        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary/20">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <DollarSign className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm">Billing & Refunds</h4>
                              <p className="text-xs text-muted-foreground">Manage payments</p>
                            </div>
                          </div>
                        </Card>
                      </div>

                      {/* Support Chat */}
                      <div className="flex-1 bg-muted/20 rounded-lg p-4">
                        <h4 className="font-semibold mb-3">Need Help?</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Our travel specialists are here to help with any questions about your bookings, 
                          itinerary changes, or travel requirements.
                        </p>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Need help with your trip? Ask here..."
                            className="flex-1"
                          />
                          <Button variant="travel">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};