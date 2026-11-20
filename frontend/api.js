export const fetchLevelById = async(level_id) => {
    const data = await fetch(`https://game-project-cnxj.onrender.com/level/${level_id}`);
    const jsonData = await data.json();
    return jsonData;
}

export const fetchDialogueById = async(level_id) => {
    const data = await fetch(`https://game-project-cnxj.onrender.com/dialogue/${level_id}`);
    const jsonData = await data.json();
    return jsonData;
}

export const fetchCutsceneById = async(cutscene_id) => {
    const data = await fetch(`https://game-project-cnxj.onrender.com/cutscene/${cutscene_id}`)
    const jsonData = await data.json();
    return jsonData;
}
