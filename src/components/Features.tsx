import React from 'react';
import { FileText, Lock, Globe2, Package, Building2, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: <FileText className="w-8 h-8 text-blue-400" />,
    title: "Ricardian Contracts",
    description: "Create legally binding smart contracts with automated execution and compliance."
  },
  {
    icon: <Lock className="w-8 h-8 text-blue-400" />,
    title: "Zero-Knowledge Proofs",
    description: "Maintain privacy while ensuring transparent and secure transactions."
  },
  {
    icon: <Globe2 className="w-8 h-8 text-blue-400" />,
    title: "Global Compliance",
    description: "Meet regulatory requirements across multiple jurisdictions seamlessly."
  },
  {
    icon: <Package className="w-8 h-8 text-blue-400" />,
    title: "Asset Tokenization",
    description: "Convert real-world assets into secure digital tokens with ERC-3643."
  },
  {
    icon: <Building2 className="w-8 h-8 text-blue-400" />,
    title: "Institution Ready",
    description: "Enterprise-grade infrastructure built for institutional requirements."
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-blue-400" />,
    title: "Advanced Analytics",
    description: "Real-time insights and reporting for informed decision-making."
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-20 bg-slate-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">Enterprise Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-700 p-6 rounded-xl hover:bg-slate-600 transition-colors">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};