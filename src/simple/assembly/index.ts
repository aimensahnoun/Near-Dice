import {
  Context,
  u128,
  PersistentUnorderedMap,
  RNG,
  ContractPromiseBatch,
} from "near-sdk-as";

@nearBindgen
class Game {
  owner: string;
  player: string;
  startingBet: u128;
  betAmount: u128;
  winner: string;
  gameId: u32;
  state: string;
  constructor() {
    const random = new RNG<u32>(1, u32.MAX_VALUE);
    this.gameId = random.next();
    this.owner = Context.sender;
    this.player = "";
    this.startingBet = Context.attachedDeposit;
    this.betAmount = u128.Zero;
    this.winner = "";
    this.state = "CREATED";
  }
}

//Storing the game rooms in a persistent map
const gamesMap = new PersistentUnorderedMap<u32, Game>("gm");

//Creating a room
export function initGame(): u32 {
  assert(
    Context.attachedDeposit > u128.Zero,
    "You must deposit at least 0.1 NEAR to create a game"
  );
  const game = new Game();
  gamesMap.set(game.gameId, game);
  return game.gameId;
}

//Joining a room
export function joinGame(_gameId: u32): string {
  assert(
    Context.attachedDeposit > u128.Zero,
    "You must deposit at least 0.1 NEAR to join a game"
  );
  const game = gamesMap.getSome(_gameId);
  assert(game.state == "CREATED", "It is not possible to join this game");
  game.player = Context.sender;
  game.betAmount = Context.attachedDeposit;
  game.state = "JOINED";
  gamesMap.set(game.gameId, game);
  return `Player : ${game.player} joined game : ${game.gameId}`;
}

//Playing a game
export function playGame(_gameId: u32, _guess: u8): string {
  assert(_guess > 0 && _guess < 7, "Guess must be between 1 and 6");
  const random = new RNG<u8>(1, 7);
  const winningNumber = random.next();
  const game = gamesMap.getSome(_gameId);

  //Checking if the game is in the right state to play
  assert(game.player == Context.sender, "You are not the player of this game");
  assert(game.state == "JOINED", "It is not possible to play this game");

  game.winner = winningNumber === _guess ? game.player : game.owner;
  const benificiary = ContractPromiseBatch.create(game.winner);
  benificiary.transfer(u128.add(game.startingBet, game.betAmount));
  game.state = "FINISHED";
  game.betAmount = u128.Zero;
  game.startingBet = u128.Zero;
  gamesMap.set(game.gameId, game);  
  return `The Dice number is ${winningNumber} and the winner is : ${game.winner}`;
}

//Deleting a room
export function deleteGame(_gameId: u32): string {
  const game = gamesMap.getSome(_gameId);
  assert(game.owner == Context.sender, "Only the owner can delete a game");
  assert(game.state == "FINISHED", "It is not possible to delete this game");
  gamesMap.delete(_gameId);
  return "Game successfully deleted";
}

//Fetching a room details
export function viewGame(_gameId: u32): Game {
  return gamesMap.getSome(_gameId);
}

//Fetching all rooms
export function viewAllGames(): Array<Game> {
  return gamesMap.values();
}

//Reactivating a finished room
export function reactivateGame(_gameId: u32): string {
  const game = gamesMap.getSome(_gameId);
  assert(game.owner == Context.sender, "Only the owner can reactivate a game");
  assert(game.state == "FINISHED", "It is not possible to reactivate an active game");
  assert(
    Context.attachedDeposit > u128.Zero,
    "You must deposit at least 0.1 NEAR to reactivate a game"
  );
  game.state = "CREATED";
  game.startingBet = Context.attachedDeposit;
  gamesMap.set(game.gameId, game);
  return "Game successfully reactivated";
}
