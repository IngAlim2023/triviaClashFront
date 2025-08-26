export const loadScore = async () => {
    const data = await fetch('http://localhost:3333/score',{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    } )
    return await data.json()
};
