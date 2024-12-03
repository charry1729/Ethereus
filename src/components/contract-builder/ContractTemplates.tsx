import React from 'react';
import { FileText, Building2, Film, Palette, Plus, Search, Globe2, Star, Clock, ArrowRight, Briefcase, Coins, Users, Shield, Code, Music, Book, Truck, Leaf, HeartPulse } from 'lucide-react';
import { Contract } from '../../stores/contractStore';

interface ContractTemplate {
  id: string;
  name: string;
  type: Contract['type'];
  description: string;
  icon: React.ReactNode;
  jurisdiction: string;
  industry: string;
  popularity?: 'high' | 'medium' | 'low';
  lastUpdated: string;
}

const TEMPLATES: ContractTemplate[] = [
  // Real Estate Templates
  {
    id: 'real-estate-purchase-us',
    name: 'Real Estate Purchase Agreement',
    type: 'real-estate',
    description: 'Standard purchase agreement for real estate properties with title transfer',
    icon: <Building2 className="w-6 h-6" />,
    jurisdiction: 'USA',
    industry: 'Real Estate',
    popularity: 'high',
    lastUpdated: '2024-03-01',
  },
  {
    id: 'real-estate-lease-commercial',
    name: 'Commercial Lease Agreement',
    type: 'real-estate',
    description: 'Commercial property lease with tenant improvements and CAM charges',
    icon: <Building2 className="w-6 h-6" />,
    jurisdiction: 'UK',
    industry: 'Real Estate',
    popularity: 'high',
    lastUpdated: '2024-02-28',
  },
  {
    id: 'real-estate-development',
    name: 'Property Development Agreement',
    type: 'real-estate',
    description: 'Joint venture agreement for real estate development projects',
    icon: <Building2 className="w-6 h-6" />,
    jurisdiction: 'USA',
    industry: 'Real Estate',
    popularity: 'medium',
    lastUpdated: '2024-02-25',
  },

  // Media Rights Templates
  {
    id: 'media-distribution-global',
    name: 'Global Distribution Rights',
    type: 'media-rights',
    description: 'Worldwide media distribution rights with territory exclusivity',
    icon: <Film className="w-6 h-6" />,
    jurisdiction: 'International',
    industry: 'Entertainment',
    popularity: 'high',
    lastUpdated: '2024-03-10',
  },
  {
    id: 'media-streaming-platform',
    name: 'Streaming Platform Agreement',
    type: 'media-rights',
    description: 'Digital streaming rights for OTT platforms with revenue sharing',
    icon: <Film className="w-6 h-6" />,
    jurisdiction: 'EU',
    industry: 'Entertainment',
    popularity: 'high',
    lastUpdated: '2024-03-05',
  },
  {
    id: 'media-licensing-music',
    name: 'Music Licensing Agreement',
    type: 'media-rights',
    description: 'Music synchronization and licensing for multimedia content',
    icon: <Music className="w-6 h-6" />,
    jurisdiction: 'USA',
    industry: 'Entertainment',
    popularity: 'medium',
    lastUpdated: '2024-02-20',
  },

  // Fine Art Templates
  {
    id: 'art-purchase-international',
    name: 'International Art Purchase',
    type: 'fine-art',
    description: 'Cross-border fine art acquisition with provenance verification',
    icon: <Palette className="w-6 h-6" />,
    jurisdiction: 'International',
    industry: 'Fine Art',
    popularity: 'high',
    lastUpdated: '2024-03-08',
  },
  {
    id: 'art-gallery-consignment',
    name: 'Gallery Consignment Agreement',
    type: 'fine-art',
    description: 'Art gallery consignment with commission structure',
    icon: <Palette className="w-6 h-6" />,
    jurisdiction: 'UK',
    industry: 'Fine Art',
    popularity: 'medium',
    lastUpdated: '2024-02-15',
  },
  {
    id: 'art-nft-minting',
    name: 'NFT Minting Agreement',
    type: 'fine-art',
    description: 'Digital art tokenization and NFT minting rights',
    icon: <Code className="w-6 h-6" />,
    jurisdiction: 'International',
    industry: 'Fine Art',
    popularity: 'high',
    lastUpdated: '2024-03-12',
  },

  // Investment Templates
  {
    id: 'investment-venture-capital',
    name: 'Venture Capital Investment',
    type: 'investment',
    description: 'VC investment terms with preference rights and anti-dilution',
    icon: <Coins className="w-6 h-6" />,
    jurisdiction: 'USA',
    industry: 'Finance',
    popularity: 'high',
    lastUpdated: '2024-03-15',
  },
  {
    id: 'investment-private-equity',
    name: 'Private Equity Agreement',
    type: 'investment',
    description: 'PE investment structure with management rights',
    icon: <Briefcase className="w-6 h-6" />,
    jurisdiction: 'UK',
    industry: 'Finance',
    popularity: 'medium',
    lastUpdated: '2024-03-01',
  },

  // IP & Technology
  {
    id: 'tech-software-license',
    name: 'Enterprise Software License',
    type: 'technology',
    description: 'Enterprise-wide software licensing with SLA terms',
    icon: <Code className="w-6 h-6" />,
    jurisdiction: 'International',
    industry: 'Technology',
    popularity: 'high',
    lastUpdated: '2024-03-10',
  },
  {
    id: 'tech-saas-agreement',
    name: 'SaaS Service Agreement',
    type: 'technology',
    description: 'Cloud software subscription with data processing terms',
    icon: <Code className="w-6 h-6" />,
    jurisdiction: 'EU',
    industry: 'Technology',
    popularity: 'high',
    lastUpdated: '2024-03-05',
  },

  // Healthcare & Life Sciences
  {
    id: 'healthcare-research',
    name: 'Clinical Research Agreement',
    type: 'healthcare',
    description: 'Clinical trial collaboration with data sharing terms',
    icon: <HeartPulse className="w-6 h-6" />,
    jurisdiction: 'USA',
    industry: 'Healthcare',
    popularity: 'medium',
    lastUpdated: '2024-02-28',
  },
  {
    id: 'healthcare-licensing',
    name: 'Medical Technology License',
    type: 'healthcare',
    description: 'Medical device and technology licensing agreement',
    icon: <HeartPulse className="w-6 h-6" />,
    jurisdiction: 'EU',
    industry: 'Healthcare',
    popularity: 'medium',
    lastUpdated: '2024-02-20',
  },

  // Supply Chain & Logistics
  {
    id: 'logistics-distribution',
    name: 'Distribution Agreement',
    type: 'logistics',
    description: 'Product distribution with territory rights and quotas',
    icon: <Truck className="w-6 h-6" />,
    jurisdiction: 'International',
    industry: 'Logistics',
    popularity: 'medium',
    lastUpdated: '2024-03-01',
  },
  {
    id: 'logistics-supply',
    name: 'Supply Chain Agreement',
    type: 'logistics',
    description: 'Supply chain management with KPI requirements',
    icon: <Truck className="w-6 h-6" />,
    jurisdiction: 'EU',
    industry: 'Logistics',
    popularity: 'medium',
    lastUpdated: '2024-02-25',
  },

  // Sustainability & ESG
  {
    id: 'esg-carbon-credits',
    name: 'Carbon Credits Trading',
    type: 'sustainability',
    description: 'Carbon credit trading and offset verification',
    icon: <Leaf className="w-6 h-6" />,
    jurisdiction: 'International',
    industry: 'Environmental',
    popularity: 'high',
    lastUpdated: '2024-03-15',
  },
  {
    id: 'esg-impact-investment',
    name: 'Impact Investment Agreement',
    type: 'sustainability',
    description: 'Social impact investment with ESG metrics',
    icon: <Leaf className="w-6 h-6" />,
    jurisdiction: 'EU',
    industry: 'Environmental',
    popularity: 'medium',
    lastUpdated: '2024-03-10',
  },
];

interface ContractTemplatesProps {
  onSelect: (template: ContractTemplate) => void;
  onCreateNew: () => void;
}

export const ContractTemplates: React.FC<ContractTemplatesProps> = ({ onSelect, onCreateNew }) => {
  const [selectedIndustry, setSelectedIndustry] = React.useState<string>('all');
  const [selectedJurisdiction, setSelectedJurisdiction] = React.useState<string>('all');
  const [searchTerm, setSearchTerm] = React.useState('');

  const industries = Array.from(new Set(TEMPLATES.map(t => t.industry)));
  const jurisdictions = Array.from(new Set(TEMPLATES.map(t => t.jurisdiction)));

  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesIndustry = selectedIndustry === 'all' || template.industry === selectedIndustry;
    const matchesJurisdiction = selectedJurisdiction === 'all' || template.jurisdiction === selectedJurisdiction;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesIndustry && matchesJurisdiction && matchesSearch;
  });

  const popularTemplates = filteredTemplates.filter(t => t.popularity === 'high');

  const getPopularityBadge = (popularity: ContractTemplate['popularity']) => {
    switch (popularity) {
      case 'high':
        return <span className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded-full">Popular</span>;
      case 'medium':
        return <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full">Trending</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="bg-slate-700 p-4 rounded-lg space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="bg-slate-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">All Industries</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>

            <select
              value={selectedJurisdiction}
              onChange={(e) => setSelectedJurisdiction(e.target.value)}
              className="bg-slate-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">All Jurisdictions</option>
              {jurisdictions.map((jurisdiction) => (
                <option key={jurisdiction} value={jurisdiction}>{jurisdiction}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Create New Template Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          onClick={onCreateNew}
          className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 rounded-lg border-2 border-dashed border-blue-500/30 hover:border-blue-400 transition-colors cursor-pointer group"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
              <Plus className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Create Custom Template</h3>
              <p className="text-sm text-gray-400">Start from scratch with AI assistance</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
            <span className="text-sm">Get started</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </div>

        {/* Template Cards */}
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelect(template)}
            className="bg-slate-700 p-6 rounded-lg hover:bg-slate-600 transition-all cursor-pointer group transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-slate-600 rounded-lg group-hover:bg-slate-500 transition-colors">
                {template.icon}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                  {getPopularityBadge(template.popularity)}
                </div>
                <p className="text-sm text-gray-400">{template.industry} | {template.jurisdiction}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">{template.description}</p>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                <span>Updated {new Date(template.lastUpdated).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-blue-400 group-hover:text-blue-300">
                <span>Use template</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};