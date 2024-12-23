// src/interfaces/routes/songRoutes.ts
import { Router } from 'express';
import { SongController } from '../controllers/SongController';
import { validateSongInput } from '../middlewares/validationMiddleware';

/**
 * @swagger
 * tags:
 *   name: Songs
 *   description: Song management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Song:
 *       type: object
 *       required:
 *         - title
 *         - artist
 *         - album
 *         - genre
 *         - releaseDate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the song
 *           example: "60d0fe4f5311236168a109ca"
 *         title:
 *           type: string
 *           description: Title of the song
 *           example: "Imagine"
 *         artist:
 *           type: string
 *           description: Artist name
 *           example: "John Lennon"
 *         album:
 *           type: string
 *           description: Album name
 *           example: "Imagine"
 *         genre:
 *           type: string
 *           enum: ['Rock', 'Pop', 'Hip Hop', 'Jazz', 'Classical', 'Electronic', 'R&B', 'Country', 'Blues', 'Reggae']
 *           description: Genre of the song
 *           example: "Rock"
 *         releaseDate:
 *           type: string
 *           format: date
 *           description: Release date of the song
 *           example: "1971-10-11"
 */

/**
 * @swagger
 * /api/songs:
 *   post:
 *     summary: Create a new song
 *     tags: [Songs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Song'
 *           examples:
 *             example-1:
 *               summary: A sample song
 *               value:
 *                 title: "Imagine"
 *                 artist: "John Lennon"
 *                 album: "Imagine"
 *                 genre: "Rock"
 *                 releaseDate: "1971-10-11"
 *     responses:
 *       201:
 *         description: Song created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation failed"
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["title"]
 *                       message:
 *                         type: string
 *                         example: "Title is required"
 *       500:
 *         description: Failed to create song
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create song"
 */

/**
 * @swagger
 * /api/songs:
 *   get:
 *     summary: Get all songs
 *     tags: [Songs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter by genre
 *     responses:
 *       200:
 *         description: A list of songs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 songs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Song'
 *                 total:
 *                   type: integer
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *       500:
 *         description: Failed to get songs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to get songs"
 */

/**
 * @swagger
 * /api/songs/search:
 *   get:
 *     summary: Search songs by query
 *     tags: [Songs]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Bad request"
 *       500:
 *         description: Failed to search songs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to search songs"
 */

/**
 * @swagger
 * /api/songs/statistics:
 *   get:
 *     summary: Get song statistics
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: Song statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSongs:
 *                   type: integer
 *                   example: 100
 *                 totalArtists:
 *                   type: integer
 *                   example: 50
 *                 totalAlbums:
 *                   type: integer
 *                   example: 30
 *                 totalGenres:
 *                   type: integer
 *                   example: 10
 *                 songsByGenre:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "genre-id-1"
 *                       name:
 *                         type: string
 *                         example: "Rock"
 *                       count:
 *                         type: integer
 *                         example: 25
 *                 songsByArtist:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "artist-id-1"
 *                       name:
 *                         type: string
 *                         example: "John Lennon"
 *                       songs:
 *                         type: integer
 *                         example: 5
 *                       albums:
 *                         type: integer
 *                         example: 2
 *       500:
 *         description: Failed to get statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to get statistics"
 */

/**
 * @swagger
 * /api/songs/{id}:
 *   get:
 *     summary: Get a song by ID
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Song ID
 *     responses:
 *       200:
 *         description: Song details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       404:
 *         description: Song not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Song not found"
 *       500:
 *         description: Failed to get song
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to get song"
 */

/**
 * @swagger
 * /api/songs/{id}:
 *   put:
 *     summary: Update a song by ID
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Song ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Song'
 *           examples:
 *             example-1:
 *               summary: Updated song data
 *               value:
 *                 title: "Imagine (Remastered)"
 *                 artist: "John Lennon"
 *                 album: "Imagine"
 *                 genre: "Rock"
 *                 releaseDate: "1971-10-11"
 *     responses:
 *       200:
 *         description: Song updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation failed"
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["title"]
 *                       message:
 *                         type: string
 *                         example: "Title must be 100 characters or less"
 *       404:
 *         description: Song not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Song not found"
 *       500:
 *         description: Failed to update song
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to update song"
 */

/**
 * @swagger
 * /api/songs/{id}:
 *   delete:
 *     summary: Delete a song by ID
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Song ID
 *     responses:
 *       204:
 *         description: Song deleted successfully
 *       404:
 *         description: Song not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Song not found"
 *       500:
 *         description: Failed to delete song
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to delete song"
 */

export const songRouter = (songController: SongController): Router => {
  const router = Router();

  router.post('/', validateSongInput, songController.create.bind(songController));
  router.get('/', songController.getAll.bind(songController));
  router.get('/search', songController.search.bind(songController));
  router.get('/statistics', songController.getStats.bind(songController));
  router.get('/:id', songController.getById.bind(songController));
  router.put('/:id', validateSongInput, songController.update.bind(songController));
  router.delete('/:id', songController.delete.bind(songController));

  return router;
};