import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // All routes use Client-side rendering to avoid localStorage SSR issues
  { path: '**', renderMode: RenderMode.Client }
];
