export { DistributeGemsAndArtifactsToExplorersEvent } from "./events/DistributeGemsAndArtifactsToExplorersEvent"
export { Event } from "./events/Event"
export { GameOverEvent } from "./events/GameOverEvent"
export { ExplorerMadeChoiceEvent, AllExplorersMadeChoiceEvent } from "./events/MadeChoiceEvent"
export { NewTurnArtifactCardTriggeredEvent, NewTurnHazardCardTriggeredEvent, NewTurnTreasureCardTriggeredEvent } from "./events/NewTurnCardTriggeredEvent"
export { RoundEndEvent } from "./events/RoundEndEvent"

export { default as Card } from "./entities/Card/Card"
export { default as ArtifactCard } from "./entities/Card/ArtifactCard"
export { default as HazardCard } from "./entities/Card/HazardCard"
export { default as TreasureCard } from "./entities/Card/TreasureCard"

export { default as Artifact } from "./entities/Artifact"
export { default as Bag } from "./entities/Bag"
export { default as Deck, TrashDeck } from "./entities/Deck"
export { default as Gem } from "./entities/Gem"
export { default as IncanGold } from "./entities/IncanGold"
export { default as Explorer } from "./entities/Explorer"
export { default as Tent } from "./entities/Tent"
export { default as Tunnel } from "./entities/Tunnel"

export * as CardInfo from "./constant/CardInfo"
export { Choice } from "./constant/Choice"
export { EventName } from "./constant/EventName"

// export interface Events {
//   Event: typeof Event;
//   DistributeGemsAndArtifactsToExplorersEvent: typeof DistributeGemsAndArtifactsToExplorersEvent;
//   GameOverEvent: typeof GameOverEvent;
//   ExplorerMadeChoiceEvent: typeof ExplorerMadeChoiceEvent;
//   AllExplorersMadeChoiceEvent: typeof AllExplorersMadeChoiceEvent;
//   NewTurnArtifactCardTriggeredEvent: typeof NewTurnArtifactCardTriggeredEvent;
//   NewTurnHazardCardTriggeredEvent: typeof NewTurnHazardCardTriggeredEvent;
//   NewTurnTreasureCardTriggeredEvent: typeof NewTurnTreasureCardTriggeredEvent;
//   RoundEndEvent: typeof RoundEndEvent;
// }

// export const events: Events = {
//   Event,
//   DistributeGemsAndArtifactsToExplorersEvent, GameOverEvent,
//   ExplorerMadeChoiceEvent, AllExplorersMadeChoiceEvent,
//   NewTurnArtifactCardTriggeredEvent, NewTurnHazardCardTriggeredEvent, NewTurnTreasureCardTriggeredEvent,
//   RoundEndEvent
// }

// export interface Cards {
//   Card: typeof Card;
//   ArtifactCard: typeof ArtifactCard;
//   HazardCard: typeof HazardCard;
//   TreasureCard: typeof TreasureCard;
// }

// export const cards: Cards = {
//   Card, ArtifactCard, HazardCard, TreasureCard
// }

// export interface Entities {
//   cards: typeof cards
//   Bag: typeof Bag
//   Deck: typeof Deck
//   IncanGold: typeof IncanGold
//   Gem: typeof Gem
//   Artifact: typeof Artifact
//   Explorer: typeof Explorer
//   Tent: typeof Tent
//   Tunnel: typeof Tunnel
// }

// export const entities: Entities = {
//   cards, Bag, Deck, IncanGold, Gem, Artifact, Explorer, Tent, Tunnel
// }

// export interface Constant {
//   CardInfo: typeof CardInfo
//   Choice: typeof Choice
//   EventName: typeof EventName
// }

// export const constant:Constant = {
//   CardInfo, Choice, EventName
// }