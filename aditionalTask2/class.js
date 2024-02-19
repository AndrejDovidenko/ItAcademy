class Vehicle {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }

  getYear() {
    return `Год выпуска: ${this.year}`;
  }

  getName() {
    return `Модель: ${this.name}`;
  }

  getInfo() {
    console.log(`${this.getName()} (${this.getYear()})`);
  }
}

const oldCar = new Vehicle("Ford T", 1908);
console.log(oldCar);

class Car extends Vehicle {
  constructor(name, year, parkingSensors = false) {
    super(name, year);
    this.parkingSensors = parkingSensors;
  }

  isHaveParkingSensors() {
    console.log(
      this.parkingSensors
        ? "В машине есть парктроники"
        : "Машина не имеет парктроников"
    );
  }

  getInfo() {
    const _maxSpeed = 120;
    const _wheels = 4;
    const _getMaxSpeed = () => `${_maxSpeed} km/h`;

    console.log(`${this.getName()} (${this.getYear()}).
Колес: ${_wheels}.
Макс. скорость: ${_getMaxSpeed()}`);
  }
}

class Moto extends Vehicle {
  constructor(name, year) {
    super(name, year);
    this.wheels = 2;
  }
}

const fordFusion = new Car("Ford Fusion", 2017, true);
const bmw = new Car("BMW X5", 2018);
const audi = new Car("Audi A5", 2019, true);
const yamaha = new Moto("Yamaha RX250", 2021);

class Driver {
  constructor(name, experience) {
    this.name = name;
    this.experience = experience;
  }

  displayInfo() {
    console.log(`Водитель: ${this.name}; опыт вождения: ${this.experience};`);
  }

  driveCar(vehicle) {
    console.log(
      `${this.name} работает на ${vehicle.name} ${vehicle.year} года выпуска`
    );
  }
}

const Vasily = new Driver("Вася", 22);
const Egor = new Driver("Егор", 5);

Vasily.displayInfo();
Egor.displayInfo();

Vasily.driveCar(audi);
Egor.driveCar(yamaha);
