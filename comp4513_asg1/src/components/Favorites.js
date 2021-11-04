import React from 'react';
import FavoriteItem from './FavoriteItem.js';

function Favorites(props) {

  // Replace these with the context provider versions once those are finished.
  let favorites = ['antony_and_cleopatra', 'as_you_like_it'];
  let plays = [
    {
      "id": "alls_well_that_ends_well", 
      "filename": "",
      "title": "All's Well That Ends Well",
      "likelyDate": "1600",
	  "genre" : "comedy",
      "wiki": "https://en.wikipedia.org/wiki/All%27s_Well_That_Ends_Well",
      "gutenberg": "https://gutenberg.org/ebooks/1529",
	  "shakespeareOrg" : "https://www.shakespeare.org.uk/explore-shakespeare/shakespedia/shakespeares-plays/alls-well-ends-well/",
	  "synopsis": "Helen saves the King's life, he gives her his son to marry, who runs away from her, and she tricks him into impregnating her. Everything ends happily.",
      "desc" : "Bertram is compelled to marry Helena. Bertram refuses to consummate their marriage. He goes to Italy. In Italy he courts Diana. Helena meets Diana. They perform the bed trick. The play is considered one of Shakespeare's problem plays, a play that poses complex ethical dilemmas that require more than typically simple solutions."
    },
    {
      "id": "antony_and_cleopatra", 
      "filename": "",
      "title": "Antony and Cleopatra",
      "likelyDate": "1607",
	  "genre" : "tragedy",
      "wiki": "https://en.wikipedia.org/wiki/Antony_and_Cleopatra",
      "gutenberg": "https://gutenberg.org/ebooks/1534",
	  "shakespeareOrg" : "https://www.shakespeare.org.uk/explore-shakespeare/shakespedia/shakespeares-plays/antony-and-cleopatra/",
	  "synopsis": "Antony loves Cleopatra, but marries Caesar's sister so that they can be friends, but then leaves and goes to Cleopatra again. Caesar gets mad and everyone dies.",
      "desc" : "The plot is based on Thomas North's 1579 English translation of Plutarch's Lives (in Ancient Greek) and follows the relationship between Cleopatra and Mark Antony from the time of the Sicilian revolt to Cleopatra's suicide during the Final War of the Roman Republic. The major antagonist is Octavius Caesar, one of Antony's fellow triumvirs of the Second Triumvirate and the first emperor of the Roman Empire. The tragedy is mainly set in the Roman Republic and Ptolemaic Egypt and is characterized by swift shifts in geographical location and linguistic register as it alternates between sensual, imaginative Alexandria and a more pragmatic, austere Rome."
    }, 
    {
      "id": "as_you_like_it", 
      "filename": "",
      "title": "As you Like it",
      "likelyDate": "1603",
	  "genre" : "comedy",
      "wiki": "https://en.wikipedia.org/wiki/As_You_Like_It",
      "gutenberg": "https://gutenberg.org/ebooks/1523",
	  "shakespeareOrg" : "https://www.shakespeare.org.uk/explore-shakespeare/shakespedia/shakespeares-plays/as-you-like-it/",
	  "synopsis": "All brothers hate each other for some reason. Rosalind dresses up as a boy and convinces her crush to hit on her while she's a boy. Everyone is married by a Greek god.",
      "desc" : "As You Like It follows its heroine Rosalind as she flees persecution in her uncle's court, accompanied by her cousin Celia to find safety and, eventually, love, in the Forest of Arden. In the forest, they encounter a variety of memorable characters, notably the melancholy traveller Jaques, who speaks many of Shakespeare's most famous speeches. Jaques provides a sharp contrast to the other characters in the play, always observing and disputing the hardships of life in the country."
    }
  ];
  
  function playByID(id) {
    for (let p=0; p<plays.length; p++) {
      if (plays[p].id === id) {
        return plays[p];
      }
    }

    return null;
  }

  function removeFavorite(e) {
    console.log("Would call the context provider removeFavorite(id)");
  }
  
  return (
    <section id="favorites">
      <h2>Favorites</h2>
      <div className="list">{
          favorites.map(f => {
            let play = playByID(f);
            
            return (
              <FavoriteItem key={play.id}
                            play={play} />
            );
          })
      }</div>
    </section>
  );
}

export default Favorites;
