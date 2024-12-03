import React from 'react';
import { Shield, FileText, Lock, Globe2, Package, Building2, BarChart3, Bot, Sparkles, ArrowRight } from 'lucide-react';

export const Documentation: React.FC = () => {
  const features = [
    {
      icon: <FileText className="w-8 h-8 text-blue-400" />,
      title: "Smart Contract Generation",
      description: "Create legally binding smart contracts with automated execution and compliance across multiple jurisdictions."
    },
    {
      icon: <Bot className="w-8 h-8 text-blue-400" />,
      title: "AI-Assisted Drafting",
      description: "Leverage AI to generate and validate contract terms based on jurisdiction and contract type."
    },
    {
      icon: <Lock className="w-8 h-8 text-blue-400" />,
      title: "Blockchain Security",
      description: "Immutable contract storage and verification using blockchain technology."
    },
    {
      icon: <Globe2 className="w-8 h-8 text-blue-400" />,
      title: "Multi-Jurisdiction Support",
      description: "Support for multiple legal jurisdictions with automated compliance checking."
    },
    {
      icon: <Package className="w-8 h-8 text-blue-400" />,
      title: "Asset Tokenization",
      description: "Convert real-world assets into secure digital tokens with full regulatory compliance."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-blue-400" />,
      title: "Dynamic Templates",
      description: "Industry-specific contract templates with customizable terms and conditions."
    }
  ];

  const workflows = [
    {
      title: "Contract Creation",
      steps: [
        "Select contract type and jurisdiction",
        "Choose from pre-built templates",
        "Add parties and their roles",
        "Generate terms using AI assistance",
        "Review and customize contract terms",
        "Deploy to blockchain"
      ]
    },
    {
      title: "Asset Management",
      steps: [
        "Register new assets",
        "Track asset value and status",
        "Manage ownership and rights",
        "Monitor compliance",
        "Generate reports"
      ]
    },
    {
      title: "Contract Execution",
      steps: [
        "Multi-party signatures",
        "Automated compliance checks",
        "Smart contract deployment",
        "Real-time status tracking",
        "Automated term execution"
      ]
    }
  ];

  const industries = [
    {
      name: "Real Estate",
      useCases: [
        "Property purchase agreements",
        "Lease contracts",
        "Property tokenization",
        "Title transfers"
      ]
    },
    {
      name: "Media Rights",
      useCases: [
        "Distribution agreements",
        "Licensing contracts",
        "Royalty management",
        "Rights tokenization"
      ]
    },
    {
      name: "Fine Art",
      useCases: [
        "Art purchase agreements",
        "Consignment contracts",
        "Authenticity verification",
        "Fractional ownership"
      ]
    }
  ];

  const advantages = [
    {
      title: "Time Efficiency",
      description: "Reduce contract creation and execution time by up to 80% with AI assistance and automated workflows."
    },
    {
      title: "Cost Reduction",
      description: "Lower legal and administrative costs through automated compliance and standardized templates."
    },
    {
      title: "Enhanced Security",
      description: "Blockchain-based verification and storage ensures immutable record-keeping and prevents fraud."
    },
    {
      title: "Global Compliance",
      description: "Automatic jurisdiction-specific compliance checks and updates across multiple regions."
    },
    {
      title: "Seamless Integration",
      description: "Easy integration with existing systems through our comprehensive API and SDK."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 py-16">
          <div className="flex items-center justify-center mb-8">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Ethereus Platform Documentation
          </h1>
          <p className="text-xl text-center text-gray-100 max-w-3xl mx-auto">
            Your comprehensive guide to smart contract management and asset tokenization
          </p>
        </div>
      </header>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-xl hover:bg-slate-700 transition-colors">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflows */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Platform Workflows</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {workflows.map((workflow, index) => (
              <div key={index} className="bg-slate-700 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-6">{workflow.title}</h3>
                <div className="space-y-4">
                  {workflow.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start space-x-3">
                      <ArrowRight className="w-5 h-5 text-blue-400 mt-1" />
                      <span className="text-gray-300">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Industry Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">{industry.name}</h3>
                <ul className="space-y-3">
                  {industry.useCases.map((useCase, caseIndex) => (
                    <li key={caseIndex} className="flex items-center space-x-2 text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Platform Advantages</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-slate-700 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
                <p className="text-gray-300">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already transforming their contract management and asset tokenization with Ethereus.
          </p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  );
};