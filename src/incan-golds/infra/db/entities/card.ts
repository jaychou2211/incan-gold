export interface Card {
  id: string;
  remainingGems: number;
  remainingArtifact: boolean;
}

export const Card = (
  id: string,
  remainingGems?: number,
  remainingArtifact?: boolean
) => ({
  id,
  remainingGems: remainingGems ?? 0,
  remainingArtifact: remainingArtifact ?? (id.startsWith("A") ? true : false)
})