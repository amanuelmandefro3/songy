import { z } from 'zod';

export const SongSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").max(100, "Title must be 100 characters or less"),
  artist: z.string().min(1, "Artist is required").max(50, "Artist must be 50 characters or less"),
  album: z.string().min(1, "Album is required").max(100, "Album must be 100 characters or less"),
  genre: z.enum(['Rock', 'Pop', 'Hip Hop', 'Jazz', 'Classical', 'Electronic', 'R&B', 'Country', 'Blues', 'Reggae'], {
    errorMap: () => ({ message: "Invalid genre" })
  }),
  releaseDate: z.coerce.date({
    errorMap: () => ({ message: "Invalid release date" })
  })
});

export type Song = z.infer<typeof SongSchema>;