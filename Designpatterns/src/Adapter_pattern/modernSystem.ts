import { ModernPrinter } from "./printerAdapter"; 

export class ReportGenerator {
  static printReport(printer: ModernPrinter, content: string): void {
    console.log("Generating report...");
    printer.print(content);
  }
}