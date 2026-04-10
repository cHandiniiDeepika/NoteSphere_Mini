const fs = require('fs');

try {
  const css = fs.readFileSync('src/pages/Profile.css', 'utf8');
  const lines = css.split('\n');
  let errors = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const lineNum = i + 1;
    
    // Check for orphaned properties (properties without selectors)
    if (line.match(/^[a-zA-Z-]+:\s*[^;{}]*$/) && 
        !line.includes('!important') && 
        !line.includes('linear-gradient(')) {
      errors.push(`Line ${lineNum}: Orphaned property: "${line}"`);
    }
    
    // Check for unclosed braces
    if (line.includes('{') && !line.includes('}')) {
      let openCount = (line.match(/\{/g) || []).length;
      let closeCount = (line.match(/\}/g) || []).length;
      let j = i + 1;
      let foundClose = false;
      
      while (j < lines.length && openCount > closeCount) {
        openCount += (lines[j].match(/\{/g) || []).length;
        closeCount += (lines[j].match(/\}/g) || []).length;
        if (closeCount >= openCount) {
          foundClose = true;
          break;
        }
        j++;
      }
      
      if (!foundClose && openCount > closeCount) {
        errors.push(`Line ${lineNum}: Unclosed brace`);
      }
    }
  }
  
  // Check overall brace balance
  const totalOpen = (css.match(/\{/g) || []).length;
  const totalClose = (css.match(/\}/g) || []).length;
  if (totalOpen !== totalClose) {
    errors.push(`Brace imbalance: ${totalOpen} opening, ${totalClose} closing`);
  }
  
  if (errors.length > 0) {
    console.log('CSS ERRORS FOUND:');
    errors.forEach(error => console.log('❌', error));
  } else {
    console.log('✅ Profile.css is now error-free!');
  }
  
} catch (error) {
  console.error('Error reading CSS file:', error.message);
}
