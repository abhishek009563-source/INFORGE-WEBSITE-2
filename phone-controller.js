const { exec, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

// Path to local adb executable or system adb
let adbPath = 'adb';
const binDir = path.join(__dirname, 'bin');
const localAdb = path.join(binDir, 'platform-tools', 'adb.exe');

if (fs.existsSync(localAdb)) {
  adbPath = localAdb;
}

// Package dictionary for common Android apps
const APP_PACKAGES = {
  whatsapp: 'com.whatsapp',
  youtube: 'com.google.android.youtube',
  chrome: 'com.android.chrome',
  instagram: 'com.instagram.android',
  spotify: 'com.spotify.music',
  facebook: 'com.facebook.katana',
  settings: 'com.android.settings',
  camera: 'com.android.camera',
  gallery: 'com.google.android.apps.photos',
  maps: 'com.google.android.apps.maps',
  gmail: 'com.google.android.gm',
  calculator: 'com.google.android.calculator',
  clock: 'com.google.android.deskclock'
};

function executeAdb(args) {
  return new Promise((resolve, reject) => {
    const cmd = `"${adbPath}" ${args}`;
    exec(cmd, { cwd: __dirname }, (error, stdout, stderr) => {
      if (error) {
        resolve({ success: false, error: stderr || error.message, stdout: stdout || '' });
      } else {
        resolve({ success: true, stdout: stdout.trim(), stderr: stderr.trim() });
      }
    });
  });
}

// 1. Check Connected Devices
async function checkDeviceStatus() {
  const result = await executeAdb('devices');
  if (!result.success) {
    return { connected: false, message: 'ADB not initialized or not found' };
  }
  const lines = result.stdout.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('List of'));
  const devices = lines.map(line => {
    const [id, state] = line.split(/\s+/);
    return { id, state };
  });

  const activeDevice = devices.find(d => d.state === 'device');
  return {
    connected: !!activeDevice,
    device: activeDevice || null,
    allDevices: devices,
    adbPathUsed: adbPath
  };
}

// 2. Unlock Phone (Wake screen, swipe up, enter PIN)
async function unlockPhone(pin = '') {
  // Wake screen (KEYEVENT_POWER / WAKEUP)
  await executeAdb('shell input keyevent 224'); // WAKEUP
  await new Promise(r => setTimeout(r, 400));
  
  // Swipe up to reveal lockscreen PIN input
  await executeAdb('shell input swipe 500 1500 500 500 300');
  await new Promise(r => setTimeout(r, 600));

  if (pin && pin.trim() !== '') {
    // Type PIN characters
    await executeAdb(`shell input text "${pin.trim()}"`);
    await new Promise(r => setTimeout(r, 300));
    // Press ENTER
    await executeAdb('shell input keyevent 66');
  }

  return { success: true, message: 'Unlock command executed' };
}

// 3. Launch App by name or package
async function openApp(appNameOrPackage) {
  let pkg = appNameOrPackage.toLowerCase().trim();
  if (APP_PACKAGES[pkg]) {
    pkg = APP_PACKAGES[pkg];
  }

  // Launch app using monkey tool (launches default main launcher activity)
  const result = await executeAdb(`shell monkey -p ${pkg} -c android.intent.category.LAUNCHER 1`);
  if (result.success && !result.stdout.includes('No activities found')) {
    return { success: true, app: appNameOrPackage, package: pkg };
  }

  // Fallback using am start
  const amResult = await executeAdb(`shell am start -a android.intent.action.MAIN -c android.intent.category.LAUNCHER -n ${pkg}`);
  return { success: amResult.success, app: appNameOrPackage, package: pkg };
}

// 4. Navigation & Hardware Key events
async function sendKeyEvent(eventKey) {
  const keyMap = {
    home: 3,
    back: 4,
    power: 26,
    volup: 24,
    voldown: 25,
    enter: 66,
    space: 62,
    tab: 61,
    lock: 276
  };
  const eventCode = keyMap[eventKey.toLowerCase()] || eventKey;
  const result = await executeAdb(`shell input keyevent ${eventCode}`);
  return { success: result.success, event: eventKey, code: eventCode };
}

// 5. Natural Language AI Intent Parser
async function processAiCommand(command, pinCode = '') {
  const cmd = command.toLowerCase().trim();

  if (cmd.includes('unlock') || cmd.includes('open lock') || cmd.includes('remove lock')) {
    const res = await unlockPhone(pinCode);
    return { action: 'unlock', message: 'Unlocking phone screen...', details: res };
  }

  if (cmd.includes('home') || cmd.includes('go home') || cmd.includes('main screen')) {
    const res = await sendKeyEvent('home');
    return { action: 'home', message: 'Returning to Home screen', details: res };
  }

  if (cmd.includes('back') || cmd.includes('go back')) {
    const res = await sendKeyEvent('back');
    return { action: 'back', message: 'Executing Back action', details: res };
  }

  if (cmd.includes('volume up') || cmd.includes('increase volume')) {
    await sendKeyEvent('volup');
    await sendKeyEvent('volup');
    return { action: 'volume', message: 'Increased volume' };
  }

  if (cmd.includes('volume down') || cmd.includes('decrease volume')) {
    await sendKeyEvent('voldown');
    await sendKeyEvent('voldown');
    return { action: 'volume', message: 'Decreased volume' };
  }

  if (cmd.includes('lock') || cmd.includes('turn off screen') || cmd.includes('sleep')) {
    await sendKeyEvent('power');
    return { action: 'lock', message: 'Turned off phone screen' };
  }

  // Check for app opening intent
  const appMatch = Object.keys(APP_PACKAGES).find(app => cmd.includes(app));
  if (appMatch) {
    const res = await openApp(appMatch);
    return { action: 'open_app', app: appMatch, message: `Opening ${appMatch.toUpperCase()} on phone`, details: res };
  }

  // Custom regex pattern for "open <app>"
  const match = cmd.match(/open\s+([a-z0-9_\.-]+)/i);
  if (match && match[1]) {
    const targetApp = match[1];
    const res = await openApp(targetApp);
    return { action: 'open_app', app: targetApp, message: `Attempting to launch ${targetApp}`, details: res };
  }

  return { action: 'unknown', message: `Command recognized: "${command}". Specify "open whatsapp", "unlock phone", "home", etc.` };
}

module.exports = {
  checkDeviceStatus,
  unlockPhone,
  openApp,
  sendKeyEvent,
  processAiCommand,
  APP_PACKAGES
};
