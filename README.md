# Near Dice

A small game where a user can create a room by putting Near tokens into it. A second user can then join the game and guess the dice result (1-6), if the guess is correct the total amount of tokens is transfered to the player, otherwise it is transfered to the creator.


# Functions
## initGame 

 - Does not take any parameters.
 - Creator must attach a deposit > 0 in order to create a room
 - returns a **game id**
## joinGame

 - Takes ***_gameId*** as a parameter
 - Player must attach a deposit > 0 in order to create a room
 - Returns a string confirming that the player has successfully joined the room
 - 
## playGame 

 - Takes ***_gameId*** and ***_guess*** as parameters
 - Guess must be between 1-6
 - The game's player and the person calling the function must be the same
 - A game has to be in the **JOINED** state in order to be played
 - returns the dice number as well as the winner's name
 
## playGame 

 - Takes ***_gameId*** as  a parameters
 - The person calling this function must be the owner 
 - The game must be in the **FINISHED** in order to be deleted
 - returns a string confirming game deletion
 
## viewGame 
 - Takes ***_gameId*** as  a parameters
 - returns the game's details
 
## viewAllGames 
 - Does not take anything as a parameter
 - returns an array of all games
 - 
## reactivateGame 
 - Takes ***_gameId*** as  a parameters
 - The person calling this function must be the owner 
 - The game must be in the **FINISHED** in order to be reactivated
 - The creator must attach some tokens into the function
 - Returns a string confirming game reactivation


