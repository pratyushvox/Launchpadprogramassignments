interface Transport {
  deliver(): void;
}

class Truck implements Transport {
  deliver(): void {
    console.log(" Delivery by truck (land)");
  }
}

class Ship implements Transport {
  deliver(): void {
    console.log(" Delivery by ship (sea)");
  }
}

class Plane implements Transport {
  deliver(): void {
    console.log(" Delivery by plane (air)");
  }
}

class LogisticsFactory {
  public createTransport(type: string): Transport {
    switch (type.toLowerCase()) {
      case "land":
        return new Truck();
      case "sea":
        return new Ship();
      case "air":
        return new Plane();
      default:
        throw new Error("Invalid transport type");
    }
  }
}

export { LogisticsFactory, Transport };