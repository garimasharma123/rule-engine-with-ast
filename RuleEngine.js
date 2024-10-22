import React, { useState } from 'react';
import { createRule, combineRules, evaluateRule } from './ast';
import './App.css';

const RuleEngine = () => {
  const [ruleInput, setRuleInput] = useState('');
  const [rules, setRules] = useState([]);
  const [dataInput, setDataInput] = useState('');
  const [result, setResult] = useState(null);

  const handleAddRule = () => {
    const newRule = createRule(ruleInput);
    setRules([...rules, newRule]);
    setRuleInput('');
  };

  const handleCombineRules = () => {
    const combinedAST = combineRules(rules);
    console.log("Combined AST: ", combinedAST);
  };

  const handleEvaluate = () => {
    const data = JSON.parse(dataInput);
    const combinedAST = combineRules(rules);
    const evaluationResult = evaluateRule(combinedAST, data);
    setResult(evaluationResult);
  };

  return (
    <div className="rule-engine-container">
      <section className="rule-section">
        <h2>Create and Combine Rules</h2>
        <textarea
          className="rule-input"
          value={ruleInput}
          onChange={(e) => setRuleInput(e.target.value)}
          placeholder="Enter rule (e.g. age > 30 AND department = 'Sales')"
        />
        <button className="btn" onClick={handleAddRule}>Add Rule</button>

        <h3>Added Rules</h3>
        <ul className="rule-list">
          {rules.map((rule, index) => (
            <li key={index} className="rule-item">{JSON.stringify(rule)}</li>
          ))}
        </ul>

        <button className="btn" onClick={handleCombineRules}>Combine Rules</button>
      </section>

      <section className="evaluate-section">
        <h2>Evaluate Rules</h2>
        <textarea
          className="data-input"
          value={dataInput}
          onChange={(e) => setDataInput(e.target.value)}
          placeholder='Enter JSON data (e.g. {"age": 35, "department": "Sales", "salary": 60000, "experience": 3})'
        />
        <button className="btn" onClick={handleEvaluate}>Evaluate</button>

        {result !== null && <p className="result">Evaluation Result: {result.toString()}</p>}
      </section>
    </div>
  );
};

export default RuleEngine;
