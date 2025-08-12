import { OldPrinter } from "./oldPrinter";


export interface ModernPrinter {
  print(message: string): void;
}

// The adapter that makes OldPrinter work with ModernPrinter
export class PrinterAdapter implements ModernPrinter {
  private oldPrinter: OldPrinter;

  constructor(oldPrinter: OldPrinter) {
    this.oldPrinter = oldPrinter;
  }

  print(message: string): void {
    // Convert the modern interface call to the legacy method
    this.oldPrinter.printText(`Adapted: ${message}`);
  }
}
