import { DocumentTemplate } from './documentTemplate';

// Create original template
const originalDoc = new DocumentTemplate(
  "Annual Report",
  "This document contains annual data ",
  "Confidential - Company Internal Use Only"
);


const clonedDoc = originalDoc.clone();
clonedDoc.title = "Annual Report 2023"; 


console.log("Original Document:");
originalDoc.display();

console.log("Cloned Document:");
clonedDoc.display();

console.log("Same instance?", originalDoc === clonedDoc); 