import React from 'react';


function PlaysContextProvider() {


  const [plays, setPlays] = useState([]);
  let url = "https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/list.php";

  useEffect(() => {
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setPlays(data);
        console.log("Retrieved data");
        console.log(data);
      })
  });

}
