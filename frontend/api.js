export const fetchLevelById = async(level_id) => {
    try{
        const data = await fetch(`https://game-project-cnxj.onrender.com/level/${level_id}`);
        const jsonData = await data.json();

        if(data.status == 404){
            return {"error": "Level not found"}
        }

        return jsonData;
    }catch(err){
        return {"error": "Something went wrong"}
    }
}

export const fetchDialogueById = async(level_id) => {
    try{
        const data = await fetch(`https://game-project-cnxj.onrender.com/dialogue/${level_id}`);
        const jsonData = await data.json();

        if(data.status == 404){
            return {"error": "Dialogue not found"}
        }

        return jsonData;
    }catch(err){
        return {"error": "Something went wrong"}
    }
}

export const fetchCutsceneById = async(cutscene_id) => {
    try{
        const data = await fetch(`https://game-project-cnxj.onrender.com/cutscene/${cutscene_id}`)
        const jsonData = await data.json();

        if(data.status == 404){
            return {"error": "Cutscene not found"}
        }

        return jsonData;
    }catch(err){
        return {"error": "Something went wrong"}
    }
}
