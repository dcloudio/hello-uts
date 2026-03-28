import "./mock";
import { runTests, Result } from './index'

type TestResultMap = Record<string, Result>;
type SuiteEntry = {
  name: string;
  suite: Result;
};

function printDivider(char: string = "-") {
  console.log(char.repeat(72));
}

function printFailureLines(failures: string[], indent: string = "  ") {
  for (const fail of failures) {
    const lines = fail.split("\n");
    for (const line of lines) {
      console.log(`${indent}${line}`);
    }
    console.log("");
  }
}

function printSuiteResult(name: string, suite: Result) {
  const passedCount = suite.passed.length;
  const failedCount = suite.failed.length;

  console.log(`${name} 测试结果`);
  console.log(`测试 api: ${suite.passed.join(", ") || "(无通过项)"}`);
  console.log(`总共: ${suite.total}`);
  console.log(`通过: ${passedCount}`);
  console.log(`失败: ${failedCount}`);

  if (failedCount > 0) {
    console.log("失败详情:");
    printFailureLines(suite.failed);
  }
}

function main() {
  const resultMap = runTests() as TestResultMap;
  const names = Object.keys(resultMap);
  const failedSuites: SuiteEntry[] = [];
  let total = 0;
  let passed = 0;
  let failed = 0;

  for (const name of names) {
    const suite = resultMap[name];
    total += suite.total;
    passed += suite.passed.length;
    failed += suite.failed.length;
    if (suite.failed.length > 0) {
      failedSuites.push({ name, suite });
    }
  }

  printDivider("=");
  console.log("UTS Web 测试结果汇总");
  console.log(`测试模块: ${names.length}`);
  console.log(`总用例数: ${total}`);
  console.log(`通过数: ${passed}`);
  console.log(`失败数: ${failed}`);
  console.log(`失败模块: ${failedSuites.length}`);
  printDivider("=");

  console.log("完整结果");
  printDivider("=");
  for (const name of names) {
    printSuiteResult(name, resultMap[name]);
    printDivider();
  }

  console.log("失败总结");
  printDivider("!");
  if (failedSuites.length > 0) {
    for (const { name, suite } of failedSuites) {
      console.log(`${name} 出现 ${suite.failed.length} 个失败示例`);
      console.log(`已通过: ${suite.passed.join(", ") || "(无)"}`);
      console.log("失败示例:");
      printFailureLines(suite.failed, "  > ");
      printDivider("!");
    }
  } else {
    console.log("没有失败示例，所有模块都已通过。");
    printDivider("!");
  }
}

main();
