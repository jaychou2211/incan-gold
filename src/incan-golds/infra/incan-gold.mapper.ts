import { Injectable } from "@nestjs/common/decorators";
import { IncanGold as IncanGoldData } from "./db/entities/incan-gold.entity";
import { Explorer as ExplorerData } from "./db/entities/explorer.entity";
import { Card as CardData } from "./db/entities/card";
import {
  IncanGold,
  Explorer,
  Artifact,
  Card, TrashDeck,
  TreasureCard, ArtifactCard, HazardCard, CardInfo,
  Tent, Bag,
} from "../domain"

@Injectable()
export class IncanGoldMapper {

  public toDomain = (
    incanGold: IncanGoldData,
    explorerList: ExplorerData[]
  ): IncanGold => {
    const { id, round, turn } = incanGold;
    const { deck: deckData, tunnel: tunnelData, trashDeck: trashDeckData } = incanGold;
    const explorers = explorerList.map(this.toExplorer);
    const deck = deckData.map(this.toCard);
    const tunnel = tunnelData.map(this.toCard);
    const trashDeck = this.toTrashDeck(trashDeckData);
    return new IncanGold(id, round, turn, explorers, tunnel, deck, trashDeck);
  }

  public toData = (
    game: IncanGold
  ): (IncanGoldData & { explorers: ExplorerData[] }) => {
    const { gameId: id, round, turn, explorers, tunnel, deck, trashDeck } = game;
    return {
      id, round, turn,
      tunnel: tunnel.cards.map(this.toCardData),
      deck: deck.cards.map(this.toCardData),
      trashDeck: this.toTrashDeckData(trashDeck),
      explorers: explorers.map(this.toExplorerData)
    };
  }

  private setupTent = (
    totalPoints: number,
    gemsInTent: number,
    artifactIds: string[]
  ) => {
    console.log(39)
    const artifacts = artifactIds.map(id => {
      const { name, points } = CardInfo.artifactCards[id];
      return new Artifact(id, name, points);
    });
    console.log(44)
    return new Tent(totalPoints, gemsInTent, artifacts);
  }

  private toExplorer = (explorer: ExplorerData) => {
    const { id, choice, inTent, gemsInBag, gemsInTent, totalPoints, artifacts } = explorer;
    console.log(50)
    const tent = this.setupTent(totalPoints, gemsInTent, artifacts);
    console.log(52)
    return new Explorer(id, choice, inTent, new Bag(gemsInBag), tent);
  }

  private toExplorerData = (explorer: Explorer): ExplorerData => {
    const { id, choice, inTent, bag, tent } = explorer
    const gemsInBag = bag.numOfGems;
    const gemsInTent = tent.numOfGems;
    const totalPoints = tent.points;
    const artifacts = tent.artifactsIds;
    return { id, choice, inTent, gemsInBag, gemsInTent, totalPoints, artifacts } as ExplorerData;
  }

  private toTrashDeck = (trashDeckData: Record<number, CardData[]>) => {
    const trashDeck = new Map<number, Card[]>();
    [...Object.entries(trashDeckData)].forEach(([key, cards]) => {
      trashDeck.set(Number(key), cards.map(this.toCard));
    });
    return trashDeck;
  }

  private toTrashDeckData = (trashDeck: TrashDeck) => {
    const trashDeckData: Record<number, CardData[]> = {};
    [...trashDeck.cards.entries()].forEach(element => {
      const [round, cards] = [element[0], element[1]];
      trashDeckData[round] = cards.map(this.toCardData);
    })
    return trashDeckData;
  }


  private toCard = (cardData: CardData): Card => {
    const { id } = cardData;
    switch (id[0]) {
      case 'T':
        const { remainingGems } = cardData;
        return new TreasureCard(id, remainingGems);
      case "A":
        const { remainingArtifact } = cardData;
        return new ArtifactCard(id, remainingArtifact);
      case "H":
        return new HazardCard(id);
    }
  }

  private toCardData = (card: Card): CardData => {
    const { id } = card;
    switch (id[0]) {
      case 'T':
        const { numOfGems } = (<TreasureCard>card);
        return CardData(id, numOfGems);
      case "A":
        const { isArtifactPresent } = (<ArtifactCard>card);
        return CardData(id, 0, isArtifactPresent);
      case "H":
        return CardData(id);
    }
  }
}

