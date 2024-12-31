-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" TEXT NOT NULL,
    "serverName" TEXT NOT NULL,
    "serverData" JSONB NOT NULL,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "tmdb" JSONB,
    "name" TEXT,
    "slug" TEXT NOT NULL,
    "originName" TEXT,
    "content" TEXT NOT NULL,
    "type" TEXT,
    "status" TEXT,
    "thumbUrl" TEXT,
    "posterUrl" TEXT,
    "isCopyright" BOOLEAN NOT NULL DEFAULT false,
    "subDocquyen" BOOLEAN NOT NULL DEFAULT false,
    "chieurap" BOOLEAN NOT NULL DEFAULT false,
    "trailerUrl" TEXT,
    "time" TEXT,
    "episodeCurrent" TEXT,
    "episodeTotal" TEXT,
    "quality" TEXT,
    "lang" TEXT,
    "notify" TEXT,
    "showtimes" TEXT,
    "year" INTEGER,
    "view" INTEGER,
    "actor" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "director" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MovieCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MovieCountry" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MovieCountry_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "_MovieCategory_B_index" ON "_MovieCategory"("B");

-- CreateIndex
CREATE INDEX "_MovieCountry_B_index" ON "_MovieCountry"("B");

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieCategory" ADD CONSTRAINT "_MovieCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieCategory" ADD CONSTRAINT "_MovieCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieCountry" ADD CONSTRAINT "_MovieCountry_A_fkey" FOREIGN KEY ("A") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieCountry" ADD CONSTRAINT "_MovieCountry_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
