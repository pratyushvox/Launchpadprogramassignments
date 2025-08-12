# Adapter Pattern: Printer Compatibility

## Purpose
Allows the legacy `OldPrinter` (with `printText`) to work with systems expecting a `print` method.

## Key Components
- **Target**: `ModernPrinter` interface
- **Adaptee**: `OldPrinter` class
- **Adapter**: `PrinterAdapter` class



## Expected Output
![alt text](Output.png)