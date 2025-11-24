// Generate suggested questions based on knowledge base categories
export const getSuggestedQuestions = (conversationHistory = []) => {
  const baseSuggestions = [
    "What school did Terrell go to?",
    "What projects has Terrell worked on?",
    "Where has Terrell worked?",
    "What are Terrell's skills?",
    "Tell me about Terrell's education",
    "What is Terrell's background?",
    "What research has Terrell done?",
    "Tell me about MicrokARts",
    "Tell me about ShARed IoT",
    "Tell me about IoT Maker",
    "What awards has Terrell received?",
    "What is Terrell's experience at Microsoft?",
  ];

  // If there's conversation history, generate contextual follow-ups
  if (conversationHistory.length > 0) {
    const lastMessage = conversationHistory[conversationHistory.length - 1];
    const lastText = lastMessage.text.toLowerCase();
    
    // Contextual follow-ups based on last message
    const contextualSuggestions = [];
    
    if (lastText.includes('education') || lastText.includes('school') || lastText.includes('purdue') || lastText.includes('morehouse')) {
      contextualSuggestions.push(
        "What did Terrell study?",
        "Tell me about Terrell's research at Purdue",
        "What is Terrell's PhD about?"
      );
    } else if (lastText.includes('project') || lastText.includes('microkart') || lastText.includes('iot') || lastText.includes('ar')) {
      contextualSuggestions.push(
        "What technologies did Terrell use?",
        "Tell me about another project",
        "What was the impact of this project?"
      );
    } else if (lastText.includes('microsoft') || lastText.includes('work') || lastText.includes('experience')) {
      contextualSuggestions.push(
        "What did Terrell do at Microsoft?",
        "What other companies has Terrell worked for?",
        "What are Terrell's achievements?"
      );
    } else if (lastText.includes('skill') || lastText.includes('technology')) {
      contextualSuggestions.push(
        "What programming languages does Terrell know?",
        "What design tools does Terrell use?",
        "Tell me about Terrell's research skills"
      );
    }
    
    // Return contextual suggestions if available, otherwise return base suggestions
    return contextualSuggestions.length > 0 
      ? contextualSuggestions.slice(0, 4)
      : baseSuggestions.slice(0, 4);
  }
  
  // Return base suggestions for initial state
  return baseSuggestions.slice(0, 4);
};

// Quick action buttons
export const quickActions = [
  {
    label: "Education",
    question: "What school did Terrell go to?",
    icon: "🎓"
  },
  {
    label: "Projects",
    question: "What projects has Terrell worked on?",
    icon: "🚀"
  },
  {
    label: "Experience",
    question: "Where has Terrell worked?",
    icon: "💼"
  },
  {
    label: "Skills",
    question: "What are Terrell's skills?",
    icon: "⚡"
  }
];

