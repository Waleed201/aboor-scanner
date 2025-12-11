import React from 'react';
import './StepIndicator.css';

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Scan QR 1' },
    { number: 2, label: 'Wait' },
    { number: 3, label: 'Scan QR 2' }
  ];

  const getStepClass = (stepNumber) => {
    if (stepNumber < currentStep) return 'step completed';
    if (stepNumber === currentStep) return 'step active';
    return 'step';
  };

  return (
    <div className="step-indicator">
      {steps.map((step) => (
        <div key={step.number} className={getStepClass(step.number)}>
          <div className="step-number">{step.number}</div>
          <div className="step-label">{step.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
