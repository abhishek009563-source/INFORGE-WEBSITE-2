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

// 4. AI Voice Command Parser for Laptop
async function processLaptopAiCommand(command) {
  const cmd = command.toLowerCase().trim();

  if (cmd.includes('lock laptop') || cmd.includes('lock pc') || cmd.includes('lock screen') || cmd.includes('lock computer')) {
    return await lockLaptop();
  }

  if (cmd.includes('volume up') || cmd.includes('increase volume') || cmd.includes('sound up')) {
    return await systemAction('volup');
  }

  if (cmd.includes('volume down') || cmd.includes('decrease volume') || cmd.includes('sound down')) {
    return await systemAction('voldown');
  }

  if (cmd.includes('mute') || cmd.includes('silence')) {
    return await systemAction('mute');
  }

  if (cmd.includes('sleep') || cmd.includes('standby')) {
    return await systemAction('sleep');
  }

  // App opening checks
  const appMatch = Object.keys(LAPTOP_APPS).find(app => cmd.includes(app));
  if (appMatch) {
    return await openLaptopApp(appMatch);
  }

  // Custom "open <something>"
  const match = cmd.match(/open\s+([a-z0-9_\.-]+)/i);
  if (match && match[1]) {
    return await openLaptopApp(match[1]);
  }

  return {
    success: false,
    message: `Command recognized: "${command}". Try "open chrome", "open notepad", "lock laptop", or "volume up".`
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
