import {
  describe,
  test,
  expect,
  Result
} from './tests.uts'

export class TInt16Array {
  test() {
    this.testConstructor();
    this.testSet();
    this.testCopyWith();
    this.testEvery();
    this.testFill();
    this.testFilter();
    this.find();
    this.findIndex();
    this.foreach();
    this.iterator();
    this.includes();
    this.indexOf();
    this.join();
    this.keys();
    this.map();
    this.reduce();
    this.reduceRight();
    this.reverse();
    this.slice();
    this.sort();
    this.subarray();
    this.values();
    this.arrayBufferSlice();
  }


  testConstructor() {
    let buffer = new ArrayBuffer(16);
    let float32 = new Int16Array(buffer);
    float32[5] = 42;
    expect(float32.toString()).toEqual("0,0,0,0,0,42,0,0");
  }

  testSet() {
    let float32 = new Int16Array(8);
    var array =[1, 2, 3]
    float32.set(array, 1);
    expect(float32.toString()).toEqual("0,1,2,3,0,0,0,0");
  }

  testCopyWith() {
    console.log("testCopyWith 1")
    let float32 = new Int16Array(8);
    float32.set([1, 2, 3], 1);
        console.log("testCopyWith 1")
    float32.copyWithin(3, 0, 3);
        console.log("testCopyWith 1")
    expect(float32.toString()).toEqual("0,1,2,0,1,2,0,0");
  }

  testEvery() {
    // const isBelowThreshold = (currentValue: number, index: number, array:Int16Array): boolean => currentValue < 40;    
    let result = new Int16Array([12, 5, 8, 130, 44]).every((value:number,index : number, array : Int16Array): boolean => value< 40); // 
    expect(result).toEqual(false);
  }

  testFill() {
    let float32 = new Int16Array([1, 2, 3]).fill(4);
    expect(float32.toString()).toEqual("4,4,4");

    float32 = new Int16Array([1, 2, 3]).fill(4, 1);
    expect(float32.toString()).toEqual("1,4,4");

    float32 = new Int16Array([1, 2, 3]).fill(4, 1, 2);
    expect(float32.toString()).toEqual("1,4,3");

    float32 = new Int16Array([1, 2, 3]).fill(4, 1, 1);
    expect(float32.toString()).toEqual("1,2,3");

    float32 = new Int16Array([1, 2, 3]).fill(4, -3, -2);
    expect(float32.toString()).toEqual("4,2,3");
  }

  testFilter() {
    // const isBelowThreshold = (currentValue: number, index: number, _): boolean => currentValue >= 10;
      
    let float32 = new Int16Array([12, 5, 8, 44]).filter((value : number, index : number, array : Int16Array): boolean => value>= 10);
    expect(float32.toString()).toEqual("12,44");
  }

  find() {
    let float32 = new Int16Array([4, 5, 8, 12]);
    let res = float32.find((value : number, index : number, obj : Int16Array): boolean => value > 5);
    expect(res).toEqual(8);
  }

  findIndex() {
    let float32 = new Int16Array([4, 6, 8, 12]);
    let res = float32.findIndex((value : number, index : number, obj : Int16Array): boolean => value > 100);
    expect(res).toEqual(-1);

    let ufloat32 = new Int16Array([4, 6, 7, 120]);
    res = ufloat32.findIndex((value : number, index : number, obj : Int16Array): boolean => value > 100);
    expect(res).toEqual(3);
  }

  foreach() {
    new Int16Array([0, 1, 2, 3]).forEach((value : number, index : number, array : Int16Array) => {
      console.log(`a[${index}] = ${value}`);
    });
  }

  iterator() {
    let arr = new Int16Array([10, 20, 30, 40, 50]);
    let entries = arr.entries();
    expect(entries.next().value[1]).toEqual(10);
  }

  includes() {
    let float32 = new Int16Array([1, 2, 3]);
    let res = float32.includes(2);
    expect(res).toEqual(true);

    res = float32.includes(4);
    expect(res).toEqual(false);

    res = float32.includes(3, 3);
    expect(res).toEqual(false);
  }

  indexOf() {
    let float32 = new Int16Array([2, 5, 9]);
    let res = float32.indexOf(2);
    expect(res).toEqual(0);

    res = float32.indexOf(7);
    expect(res).toEqual(-1);

    res = float32.indexOf(9, 2);
    expect(res).toEqual(2);

    res = float32.indexOf(2, -1);
    expect(res).toEqual(-1);

    res = float32.indexOf(2, -3);
    expect(res).toEqual(0);
  }

  join() {
    let float32 = new Int16Array([1, 2, 3]);
    let res = float32.join();
    expect(res).toEqual("1,2,3");

    res = float32.join(" / ");
    expect(res).toEqual("1 / 2 / 3");

    res = float32.join("");
    expect(res).toEqual("123");
  }

  keys() {
    let arr = new Int16Array([10, 20, 30, 40, 50]);
    let keys = arr.keys();
    expect(keys.next().value).toEqual(0);
    expect(keys.next().value).toEqual(1);
    expect(keys.next().value).toEqual(2);
    expect(keys.next().value).toEqual(3);
    expect(keys.next().value).toEqual(4);
  }

  map() {
    let numbers = new Int16Array([1, 4, 9]);
    let doubles = numbers.map((value : number, index : number, array : Int16Array): number => value * 2);
    expect(numbers.toString()).toEqual("1,4,9");
    expect(doubles.toString()).toEqual("2,8,18");
  }

  reduce() {
    let total = new Int16Array([0, 1, 2, 3]);
    let res = total.reduce((accumulator : number, currentValue : number, currentIndex : number, array : Int16Array): number => accumulator + currentValue);
    expect(res).toEqual(6.0);

    total = new Int16Array([0, 1, 2, 3]);
    res = total.reduce((accumulator : number, currentValue : number, currentIndex : number, array : Int16Array): number => accumulator + currentValue, 8);
    expect(res).toEqual(14.0);
  }

  reduceRight() {
    let total = new Int16Array([0, 1, 2, 3]);
    let res = total.reduceRight((accumulator: number, currentValue : number, currentIndex : number, array : Int16Array): number => accumulator + currentValue);
    expect(res).toEqual(6.0);

    total = new Int16Array([0, 1, 2, 3]);
    res = total.reduceRight((accumulator: number, currentValue : number, currentIndex : number, array : Int16Array): number => accumulator + currentValue, 8);
    expect(res).toEqual(14.0);
  }

  reverse() {
    let float32 = new Int16Array([1, 2, 3]);
    float32.reverse();
    expect(float32.toString()).toEqual("3,2,1");
  }

  slice() {
    let float32 = new Int16Array([1, 2, 3]);
    let res = float32.slice(1);
    expect(res.toString()).toEqual("2,3");

    res = float32.slice(2);
    expect(res.toString()).toEqual("3");

    res = float32.slice(-2);
    expect(res.toString()).toEqual("2,3");

    res = float32.slice(0, 1);
    expect(res.toString()).toEqual("1");
  }

  sort() {
    let numbers = new Int16Array([40, 1, 5]);
    numbers.sort();
    expect(numbers.toString()).toEqual("1,5,40");

    numbers.sort((a, b):Number => a - b);
    expect(numbers.toString()).toEqual("1,5,40");
  }

  subarray() {
    let buffer = new ArrayBuffer(16);
    let float32 = new Int16Array(buffer);
    float32.set([1, 2, 3]);
    expect(float32.toString()).toEqual("1,2,3,0,0,0,0,0");

    let sub = float32.subarray(0, 4);
    expect(sub.toString()).toEqual("1,2,3,0");
  }

  values() {
    let arr = new Int16Array([1, 2, 3]);
    let values = arr.values();
    expect(values.next().value).toEqual(1);
  }

  arrayBufferSlice() {
    let buffer = new ArrayBuffer(16);
    let float32 = new Int16Array(buffer);
    float32[4] = 42;
    expect(float32.toString()).toEqual("0,0,0,0,42,0,0,0");

    let res = buffer.slice(8,12);
    let sliced = new Int16Array(res);
    expect(sliced[0]).toEqual(42);
  }
}
