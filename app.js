async function loadClientConfig() {
  try {
    const res = await fetch("config.json");
    if (!res.ok) throw new Error("Could not load config.json");
    const data = await res.json();

    document.getElementById("client-name").textContent = data.clientName;
    document.getElementById("welcome-text").textContent = data.welcomeText;
    document.getElementById("client-status").textContent = data.status;

    const worldList = document.getElementById("world-list");
    worldList.innerHTML = "";

    data.worlds.forEach((world) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${world.name}</span>
        <strong>${world.mode}</strong>
      `;
      worldList.appendChild(li);
    });

    const modList = document.getElementById("mod-list");
    modList.innerHTML = "";

    data.mods.forEach((mod) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${mod.name}</span>
        <strong>${mod.state}</strong>
      `;
      modList.appendChild(li);
    });

    const logOutput = document.getElementById("log-output");
    logOutput.innerHTML = "";
    data.logs.forEach((entry) => {
      const p = document.createElement("p");
      p.textContent = entry;
      logOutput.appendChild(p);
    });

  } catch (error) {
    console.error(error);

    document.getElementById("client-name").textContent = "Eaglercraft Remix";
    document.getElementById("welcome-text").textContent = "Fallback mode: config could not be loaded.";
    document.getElementById("client-status").textContent = "Offline";

    const fallbackWorlds = ["Desert Spawn", "Nether Rift", "Skybase", "Y0 Cave"];
    const fallbackMods = ["Mace", "Spear", "Custom Worlds", "Physics Patch"];
    const fallbackLogs = [
      "[info] Client booting in fallback mode",
      "[info] Custom theme loaded",
      "[warning] config.json missing; using defaults",
      "[info] Ready to build your remix"
    ];

    const worldList = document.getElementById("world-list");
    worldList.innerHTML = "";
    fallbackWorlds.forEach((name) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${name}</span><strong>Survival</strong>`;
      worldList.appendChild(li);
    });

    const modList = document.getElementById("mod-list");
    modList.innerHTML = "";
    fallbackMods.forEach((mod) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${mod}</span><strong>ON</strong>`;
      modList.appendChild(li);
    });

    const logOutput = document.getElementById("log-output");
    logOutput.innerHTML = "";
    fallbackLogs.forEach((entry) => {
      const p = document.createElement("p");
      p.textContent = entry;
      logOutput.appendChild(p);
    });
  }
}

loadClientConfig();