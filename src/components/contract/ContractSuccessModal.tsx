import React from 'react';
import { Check, Download, FileText, UserCheck, ArrowRight, Scale, Shield } from 'lucide-react';
import { Contract } from '../../stores/contractStore';
import { Button } from '../shared/Button';
import { notificationService } from '../../services/notification';

interface ContractSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: Contract;
  onDownload: () => void;
}

export const ContractSuccessModal: React.FC<ContractSuccessModalProps> = ({
  isOpen,
  onClose,
  contract,
  onDownload,
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      icon: <Download className="w-6 h-6 text-blue-400" />,
      title: "Download Your Contract",
      description: "Get a PDF copy of your smart contract for physical signing and legal records.",
      action: onDownload,
      actionText: "Download PDF"
    },
    {
      icon: <Scale className="w-6 h-6 text-purple-400" />,
      title: "Legal Review",
      description: "Have your contract reviewed by a legal professional in your jurisdiction.",
      important: true
    },
    {
      icon: <UserCheck className="w-6 h-6 text-green-400" />,
      title: "Physical Signatures",
      description: "Obtain physical signatures from all parties alongside digital signatures.",
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      title: "Return to Platform",
      description: "Come back to manage your digital asset and track contract compliance.",
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
        <div className="fixed inset-0 transition-opacity bg-slate-900/75" onClick={onClose} />
        
        <div className="relative bg-slate-800 rounded-lg max-w-2xl w-full p-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-green-500/20 p-3 rounded-full">
                <Check className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Contract Created Successfully!</h2>
            <p className="text-gray-400">
              Your smart contract has been generated and secured on our platform.
              Here are the next steps to complete the process:
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-6 mb-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-slate-700 p-4 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-600 rounded-lg">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {step.title}
                      {step.important && (
                        <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                          Important
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-300 text-sm mb-2">{step.description}</p>
                    {step.action && (
                      <button
                        onClick={step.action}
                        className="flex items-center text-blue-400 hover:text-blue-300 text-sm"
                      >
                        {step.actionText}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reminder Box */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <h4 className="text-blue-400 font-medium mb-1">Remember</h4>
                <p className="text-sm text-gray-300">
                  Your contract is securely stored on our platform. You can always come back to:
                </p>
                <ul className="text-sm text-gray-300 list-disc list-inside mt-2">
                  <li>Track contract status and compliance</li>
                  <li>Manage digital signatures</li>
                  <li>Update asset information</li>
                  <li>Generate compliance reports</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onClose();
                notificationService.success('Welcome to your new smart contract journey!');
              }}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};