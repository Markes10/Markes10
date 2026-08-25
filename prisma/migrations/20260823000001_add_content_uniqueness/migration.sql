-- CreateIndex
CREATE UNIQUE INDEX "Post_authorId_title_key" ON "Post"("authorId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Project_title_key" ON "Project"("title");
