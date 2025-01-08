import { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'

export type RowState =
  | { type: 'idle' }
  | { type: 'preview'; container: HTMLElement }
  | { type: 'is-dragging' }
  | { type: 'is-dragging-over'; closestEdge: Edge | null }
