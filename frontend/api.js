const LOCAL_HOSTNAMES = ["localhost", "127.0.0.1", ""]

// Use the local backend while developing, the deployed API everywhere else.
const API_BASE_URL = window.GAME_API_URL ?? (
    LOCAL_HOSTNAMES.includes(window.location.hostname)
        ? "http://localhost:8080"
        : "https://game-project-cnxj.onrender.com"
)

export const fetchLevelById = async(level_id) => {
    try{
        const data = await fetch(`${API_BASE_URL}/level/${level_id}`);
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
        const data = await fetch(`${API_BASE_URL}/dialogue/${level_id}`);
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
        const data = await fetch(`${API_BASE_URL}/cutscene/${cutscene_id}`)
        const jsonData = await data.json();

        if(data.status == 404){
            return {"error": "Cutscene not found"}
        }

        return jsonData;
    }catch(err){
        return {"error": "Something went wrong"}
    }
}
