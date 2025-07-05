// 🧠 Initialize CodeMirror
const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  mode: "javascript",
  theme: "material-darker",
  lineNumbers: true,
  autoCloseBrackets: true,
  matchBrackets: true,
  tabSize: 2,
});

// 🌗 Theme Toggle Logic
let isDark = true;
function switchTheme() {
  isDark = !isDark;
  const newTheme = isDark ? "material-darker" : "default";
  editor.setOption("theme", newTheme);
}

// 🧩 Challenge Definitions with Tests
const challenges = {
  twoSum: {
    title: "Two Sum",
    description: "Return indices of two numbers that sum to a target.",
    starterCode: `function twoSum(nums, target) {
  // Your code here
}`,
    tests: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] }
    ]
  },
  longestSubstring: {
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeating characters.",
    starterCode: `function longestSubstring(s) {
  // Your code here
}`,
    tests: []
  },
  containerWater: {
    title: "Container With Most Water",
    description: "Find the max area of water the container can hold.",
    starterCode: `function containerWater(height) {
  // Your code here
}`,
    tests: []
  }
};

// 🚦 Challenge Switcher Function
function loadChallenge() {
  const select = document.getElementById("challengeSelector");
  const challengeKey = select.value;
  const challenge = challenges[challengeKey];

  document.querySelector("h1").textContent = `🧠 Challenge: ${challenge.title}`;
  document.querySelector("p").textContent = challenge.description;
  editor.setValue(challenge.starterCode);

  document.getElementById("testResults").innerHTML = "";
  document.getElementById("output").textContent = "";
}

// 🚀 Run Code Button
function runCode() {
  const code = editor.getValue();
  const output = document.getElementById("output");

  const originalLog = console.log;
  let logs = [];

  console.log = (...args) => {
    logs.push(args.join(" "));
  };

  try {
    eval(code);
    output.textContent = logs.length
      ? `✅ Output:\n${logs.join("\n")}`
      : "✅ Code ran successfully. No output.";
  } catch (error) {
    output.textContent = `❌ Error: ${error}`;
  } finally {
    console.log = originalLog;
  }
}

// 🧪 Run Tests Button
function runTests() {
  const select = document.getElementById("challengeSelector");
  const challengeKey = select.value;
  const challenge = challenges[challengeKey];
  const testResults = document.getElementById("testResults");
  testResults.innerHTML = "";

  let passed = 0;

  for (let i = 0; i < challenge.tests.length; i++) {
    const { input, expected } = challenge.tests[i];
    let result;
    try {
      result = eval(editor.getValue() + `\n${challengeKey}(...input)`);
    } catch (e) {
      testResults.innerHTML += `<div class="test-fail">❌ Test ${i + 1}: Error - ${e.message}</div>`;
      continue;
    }

    if (JSON.stringify(result) === JSON.stringify(expected)) {
      testResults.innerHTML += `<div class="test-pass">✅ Test ${i + 1} Passed</div>`;
      passed++;
    } else {
      testResults.innerHTML += `<div class="test-fail">❌ Test ${i + 1} Failed: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}</div>`;
    }
  }

  testResults.innerHTML += `<div style="margin-top: 10px;"><strong>🎯 ${passed}/${challenge.tests.length} tests passed</strong></div>`;
}
