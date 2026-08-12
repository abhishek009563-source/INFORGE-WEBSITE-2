const { exec } = require('child_process');
const path = require('path');
const os = require('os');

// Common Windows Applications Dictionary
const LAPTOP_APPS = {
  chrome: 'start chrome',
  browser: 'start chrome',
  code: 'code',
  vscode: 'code',
  notepad: 'notepad.exe',
  calculator: 'calc.exe',
  calc: 'calc.exe',
  explorer: 'explorer.exe',
  files: 'explorer.exe',
  settings: 'start ms-settings:',
  taskmanager: 'taskmgr.exe',
  taskmgr: 'taskmgr.exe',
  cmd: 'start cmd.exe',
  powershell: 'start powershell.exe',
  paint: 'mspaint.exe',
  edge: 'start msedge'
};

function executeCommand(cmd) {
  return new Promise((resolve) => {
    exec(cmd, { cwd: __dirname }, (error, stdout, stderr) => {
      if (error) {
        resolve({ success: false, error: stderr || error.message });
      } else {
        resolve({ success: true, stdout: stdout.trim() });
      }
    });
  });
}

// 1. Lock Windows Laptop Screen
async function lockLaptop() {
  const result = await executeCommand('rundll32.exe user32.dll,LockWorkStation');
  return { success: result.success, message: 'Laptop screen locked successfully' };
}

// 2. Open Windows App
async function openLaptopApp(appNameOrCmd) {
  const target = appNameOrCmd.toLowerCase().trim();
  let cmdToRun = LAPTOP_APPS[target] || `start ${target}`;

  const result = await executeCommand(cmdToRun);
  return {
    success: result.success,
    app: appNameOrCmd,
    command: cmdToRun,
    message: result.success ? `Opened ${appNameOrCmd} on your Laptop!` : `Failed to launch ${appNameOrCmd}: ${result.error}`
  };
}

// 3. System Controls (Volume, Sleep, Media)
async function systemAction(action) {
  const act = action.toLowerCase().trim();

  if (act === 'lock') {
    return await lockLaptop();
  }

  if (act === 'volup') {
    // PowerShell script to increase volume
    const psCmd = `powershell -Command "(New-Object -ComObject WScript.Shell).SendKeys([char]175)"`;
    await executeCommand(psCmd);
    await executeCommand(psCmd);
    return { success: true, message: 'Laptop Volume Increased' };
  }

  if (act === 'voldown') {
    const psCmd = `powershell -Command "(New-Object -ComObject WScript.Shell).SendKeys([char]174)"`;
    await executeCommand(psCmd);
    await executeCommand(psCmd);
    return { success: true, message: 'Laptop Volume Decreased' };
  }

  if (act === 'mute') {
    const psCmd = `powershell -Command "(New-Object -ComObject WScript.Shell).SendKeys([char]173)"`;
    await executeCommand(psCmd);
    return { success: true, message: 'Laptop Volume Muted/Unmuted' };
  }

  if (act === 'sleep') {
    await executeCommand('rundll32.exe powrprof.dll,SetSuspendState 0,1,0');
    return { success: true, message: 'Laptop sent to Sleep mode' };
  }

  return { success: false, message: `Unknown system action: ${action}` };
}

// 4. AI Voice Command Parser for Laptop (Advanced Fuzzy NLP)
async function processLaptopAiCommand(command) {
  if (!command || typeof command !== 'string') {
    return { success: false, message: 'No command provided' };
  }

  // Clean and normalize text
  const clean = command.toLowerCase()
    .replace(/[^\w\s]/gi, '') // remove punctuation
    .trim();

  // 1. LOCK COMPUTER INTENTS
  if (
    clean.includes('lock') ||
    clean.includes('screenlock') ||
    clean.includes('log off') ||
    clean.includes('sign out') ||
    clean.includes('protect')
  ) {
    return await lockLaptop();
  }

  // 2. VOLUME UP INTENTS
  if (
    clean.includes('volume up') ||
    clean.includes('increase volume') ||
    clean.includes('louder') ||
    clean.includes('sound up') ||
    clean.includes('audio up') ||
    clean.includes('turn up')
  ) {
    return await systemAction('volup');
  }

  // 3. VOLUME DOWN INTENTS
  if (
    clean.includes('volume down') ||
    clean.includes('decrease volume') ||
    clean.includes('quiet') ||
    clean.includes('lower') ||
    clean.includes('sound down') ||
    clean.includes('audio down') ||
    clean.includes('turn down')
  ) {
    return await systemAction('voldown');
  }

  // 4. MUTE INTENTS
  if (
    clean.includes('mute') ||
    clean.includes('silence') ||
    clean.includes('unmute') ||
    clean.includes('silent')
  ) {
    return await systemAction('mute');
  }

  // 5. SLEEP INTENTS
  if (
    clean.includes('sleep') ||
    clean.includes('standby') ||
    clean.includes('hibernate')
  ) {
    return await systemAction('sleep');
  }

  // 6. APPLICATION INTENT MAPPINGS (Synonyms & Aliases)
  const APP_ALIASES = {
    chrome: ['chrome', 'google chrome', 'browser', 'internet', 'web'],
    code: ['code', 'vscode', 'vs code', 'visual studio code', 'editor'],
    notepad: ['notepad', 'text editor', 'notes', 'note'],
    calculator: ['calculator', 'calc', 'math'],
    explorer: ['explorer', 'file explorer', 'files', 'folders', 'my computer', 'this pc'],
    settings: ['settings', 'system settings', 'control panel', 'config'],
    taskmanager: ['task manager', 'taskmgr', 'processes', 'activity monitor'],
    paint: ['paint', 'mspaint', 'drawing', 'draw'],
    edge: ['edge', 'microsoft edge']
  };

  for (const [appKey, aliases] of Object.entries(APP_ALIASES)) {
    if (aliases.some(alias => clean.includes(alias))) {
      return await openLaptopApp(appKey);
    }
  }

  // 7. REGEX PATTERNS: "open <X>", "launch <X>", "run <X>", "start <X>"
  const actionMatch = clean.match(/(?:open|launch|start|run)\s+([a-z0-9\s]+)/i);
  if (actionMatch && actionMatch[1]) {
    const appName = actionMatch[1].trim();
    return await openLaptopApp(appName);
  }

  // Fallback: If user just said the name of an app (e.g. "Chrome")
  const words = clean.split(/\s+/);
  for (const word of words) {
    if (LAPTOP_APPS[word]) {
      return await openLaptopApp(word);
    }
  }

  return {
    success: false,
    message: `Command recognized: "${command}". Try "Open Chrome", "Lock Screen", "Volume Up", "Open Calculator", etc.`
  };
}

// 5. System Diagnostics Info
function getLaptopInfo() {
  return {
    platform: os.platform(),
    arch: os.arch(),
    hostname: os.hostname(),
    totalMemoryGB: Math.round(os.totalmem() / 1024 / 1024 / 1024),
    freeMemoryGB: Math.round(os.freemem() / 1024 / 1024 / 1024),
    uptimeHours: Math.round(os.uptime() / 3600)
  };
}

module.exports = {
  lockLaptop,
  openLaptopApp,
  systemAction,
  processLaptopAiCommand,
  getLaptopInfo,
  LAPTOP_APPS
};

