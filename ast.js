// Define a Node class for AST representation
class Node {
    constructor(type, left = null, right = null, value = null) {
      this.type = type;
      this.left = left;
      this.right = right;
      this.value = value;
    }
  }
  
  // Parse a rule string and create a corresponding AST
  export const createRule = (ruleString) => {
    const parts = ruleString.split(' ');
    // For simplicity, we'll assume basic parsing logic. A more comprehensive solution can involve using a parser.
    const left = new Node('operand', null, null, { key: parts[0], operator: parts[1], value: parts[2] });
    const right = new Node('operand', null, null, { key: parts[4], operator: parts[5], value: parts[6] });
    return new Node('operator', left, right, parts[3]);
  };
  
  // Combine multiple rules into a single AST
  export const combineRules = (rules) => {
    if (rules.length === 0) return null;
    let combined = rules[0];
    for (let i = 1; i < rules.length; i++) {
      combined = new Node('operator', combined, rules[i], 'AND');
    }
    return combined;
  };
  
  // Evaluate the rule against the provided data
  export const evaluateRule = (node, data) => {
    if (!node) return false;
  
    if (node.type === 'operand') {
      const { key, operator, value } = node.value;
      switch (operator) {
        case '>': return data[key] > parseFloat(value);
        case '<': return data[key] < parseFloat(value);
        case '=': return data[key] === value.replace(/'/g, ''); // Handle strings with quotes
        default: return false;
      }
    }
  
    const leftResult = evaluateRule(node.left, data);
    const rightResult = evaluateRule(node.right, data);
  
    switch (node.value) {
      case 'AND': return leftResult && rightResult;
      case 'OR': return leftResult || rightResult;
      default: return false;
    }
  };
  