import { OldPrinter } from "./oldPrinter";
import { PrinterAdapter } from "./printerAdapter";
import { ReportGenerator } from "./modernSystem";

// Old system (incompatible)
const legacyPrinter = new OldPrinter();
legacyPrinter.printText("Direct print"); // Works normally

// Adapted system
const adaptedPrinter = new PrinterAdapter(legacyPrinter);

// Modern system using the adapter
ReportGenerator.printReport(
  adaptedPrinter,
  "Quarterly Financial Report"
);