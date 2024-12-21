import { Model, model, Schema } from "mongoose";
import { Song, SongSchema } from "../../domain/entities/Song";
import { v4 as uuidv4 } from "uuid";
import { ISongRepository } from "../../domain/interfaces/ISongRepository";

const songSchema = new Schema<Song>({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: Date, required: true },
});

songSchema.pre("validate", function (next) {
  try {
    SongSchema.parse(this.toObject());
    next();
  } catch (error: any) {
    next(error);
  }
});

const SongModel: Model<Song> = model<Song>("Song", songSchema);

export class SongRepository implements ISongRepository {
  async create(song: Song): Promise<Song> {
    const newSong = new SongModel(song);
    return newSong.save();
  }

  async findById(id: string): Promise<Song | null> {
    return SongModel.findById(id);
  }

  async findAll(
    page: number,
    limit: number = 10,
    genre?: string
  ): Promise<{
    songs: Song[];
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  }> {
    const query = genre ? { genre } : {};
    const skip = (page - 1) * limit;
    const [songs, total] = await Promise.all([
      SongModel.find(query).skip(skip).limit(limit).lean(),
      SongModel.countDocuments(query),
    ]);
    const totalPages = Math.ceil(total / limit);

    return {
      songs,
      total,
      totalPages,
      currentPage: page,
      limit,
    };
  }

  async search(query: string): Promise<Song[]> {
    return SongModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { artist: { $regex: query, $options: "i" } },
        { album: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
      ],
    })
      .limit(10)
      .lean();
  }

  async update(id: string, song: Partial<Song>): Promise<Song | null> {
    const validatedUpdate = SongSchema.partial().parse(song);
    return SongModel.findByIdAndUpdate(id, validatedUpdate, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await SongModel.findByIdAndDelete(id);
    return !!result;
  }

  async getStatistics(): Promise<any> {
    const totalSongs = await SongModel.countDocuments();
    const totalArtists = (await SongModel.distinct("artist")).length;
    const totalAlbums = (await SongModel.distinct("album")).length;
    const totalGenres = (await SongModel.distinct("genre")).length;

    const songsByGenre = await SongModel.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
      { $project: { _id: uuidv4(), name: "$_id", count: 1 } },
    ]);

    const songsByArtist = await SongModel.aggregate([
      {
        $group: {
          _id: "$artist",
          songs: { $sum: 1 },
          albums: { $addToSet: "$album" },
        },
      },
      {
        $project: {
          _id: uuidv4(),
          name: "$_id",
          songs: 1,
          albums: { $size: "$albums" },
        },
      },
    ]);

    const songsByAlbum = await SongModel.aggregate([
      {
        $group: {
          _id: "$album",
          count: { $sum: 1 },
          artist: { $first: "$artist" },
        },
      },
      { $project: { _id: uuidv4(), name: "$_id", count: 1, artist: 1 } },
    ]);

    // Additional statistics
    const topArtists = await SongModel.aggregate([
      { $group: { _id: "$artist", songCount: { $sum: 1 } } },
      { $sort: { songCount: -1 } },
      { $limit: 5 },
      { $project: { _id: uuidv4(), name: "$_id", songCount: 1 } },
    ]);

    const latestSongs = await SongModel.find()
      .sort({ releaseDate: -1 })
      .limit(5)
      .select("title artist album releaseDate");

    return {
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      songsByGenre,
      songsByArtist,
      songsByAlbum,
      topArtists,
      latestSongs,
    };
  }
}
