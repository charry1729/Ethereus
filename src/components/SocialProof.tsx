import React from 'react';

const industries = ["Real Estate", "Private Equity", "Media Rights", "Fine Art"];

export const SocialProof: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
          <p className="text-gray-300">Join thousands of companies transforming their asset management</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {industries.map((industry, index) => (
            <div key={index} className="flex items-center justify-center p-6 bg-slate-800 rounded-xl">
              <span className="text-lg font-semibold text-gray-300">{industry}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};