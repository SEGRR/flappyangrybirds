const url = "localhost:8181"


function getCookie(){
    if(document.cookie.length == 0) return null
      cookie = document.cookie.split(';');
      userId = cookie[0].split('=')[1];
      username = cookie[1].split('=')[1];
      highscore = cookie[2].split('=')[1];

      return {userId ,username , highscore}
}

function setCookie(username , highscore){
    document.cookie = "userId="+ username + ";username="+ username + ";highscore=" + highscore  + ";" + "expires=" + new Date(3333,1,1);
}


const Player = {
    create: async  (username)=>{
        res = await axios.post(`${url}+'/players/` , {username})
        if (! res.ok) // throw some error
        return res.data
    },
    find: async  (userId)=>{
        res = await axios.get(`${url}+'/players/:${id}`)
        if (! res.ok) // throw some error
        return res.data
    },
    updateScore: async  (id , score)=>{
        res = await axios.post(`${url}+'/players/:${id}` , {score})
        if (! res.ok) // throw some error
        return res.data
    },
    getLeaderboard: async  (id , score)=>{
        res = await axios.get(`${url}+'/leaderboard`)
        if (! res.ok) // throw some error
        return res.data
    },
}

