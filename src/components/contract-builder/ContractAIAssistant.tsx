import React from 'react';
import { Bot, Sparkles, AlertCircle } from 'lucide-react';
import { useContractStore } from '../../stores/contractStore';

interface ContractAIAssistantProps {
  type: string;
  jurisdiction: string;
  onTermsGenerated: (terms: any[]) => void;
}

export const ContractAIAssistant: React.FC<ContractAIAssistantProps> = ({
  type,
  jurisdiction,
  onTermsGenerated,
}) => {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { generateAITerms } = useContractStore();

  const handleGenerateTerms = async () => {
    if (!type || !jurisdiction) {
      setError('Please select both contract type and jurisdiction first');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const terms = await generateAITerms(type as any, jurisdiction);
      onTermsGenerated(terms);
    } catch (err) {
      setError('Failed to generate terms. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 mb-8">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-blue-500/20 rounded-lg">
          <Bot className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">AI Contract Assistant</h3>
          <p className="text-gray-400 mb-4">
            Generate jurisdiction-specific contract terms using AI. The assistant will analyze your contract type and jurisdiction to suggest relevant terms and clauses.
          </p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleGenerateTerms}
            disabled={isGenerating || !type || !jurisdiction}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-5 h-5" />
            <span>{isGenerating ? 'Generating...' : 'Generate Smart Terms'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};