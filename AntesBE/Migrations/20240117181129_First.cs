using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AntesBE.Migrations
{
    /// <inheritdoc />
    public partial class First : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    Admin = table.Column<bool>(type: "boolean", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Quizzes",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    QuizCreatorID = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quizzes", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Agendas",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AccountID = table.Column<int>(type: "integer", nullable: false),
                    Start_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    End_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Start_Time = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    End_Time = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Subject = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agendas", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Agendas_Accounts_AccountID",
                        column: x => x.AccountID,
                        principalTable: "Accounts",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Forums",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ForumPosterID = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Content = table.Column<string>(type: "text", nullable: true),
                    PostTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Forums", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Forums_Accounts_ForumPosterID",
                        column: x => x.ForumPosterID,
                        principalTable: "Accounts",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Profiles",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AccountID = table.Column<int>(type: "integer", nullable: false),
                    Contact = table.Column<string>(type: "text", nullable: true),
                    Bio = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profiles", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Profiles_Accounts_AccountID",
                        column: x => x.AccountID,
                        principalTable: "Accounts",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    QuizID = table.Column<int>(type: "integer", nullable: false),
                    QuestionText = table.Column<string>(type: "text", nullable: true),
                    Answer1 = table.Column<string>(type: "text", nullable: true),
                    Answer2 = table.Column<string>(type: "text", nullable: true),
                    Answer3 = table.Column<string>(type: "text", nullable: true),
                    CorrectAnswer = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Questions_Quizzes_QuizID",
                        column: x => x.QuizID,
                        principalTable: "Quizzes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuizResults",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    QuizID = table.Column<int>(type: "integer", nullable: false),
                    QuizSubmitterID = table.Column<int>(type: "integer", nullable: false),
                    AnswerID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizResults", x => x.ID);
                    table.ForeignKey(
                        name: "FK_QuizResults_Accounts_QuizSubmitterID",
                        column: x => x.QuizSubmitterID,
                        principalTable: "Accounts",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuizResults_Quizzes_QuizID",
                        column: x => x.QuizID,
                        principalTable: "Quizzes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ForumID = table.Column<int>(type: "integer", nullable: false),
                    CommenterID = table.Column<int>(type: "integer", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: true),
                    PostTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Comments_Accounts_CommenterID",
                        column: x => x.CommenterID,
                        principalTable: "Accounts",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comments_Forums_ForumID",
                        column: x => x.ForumID,
                        principalTable: "Forums",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    QuizResultID = table.Column<int>(type: "integer", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Answers_QuizResults_QuizResultID",
                        column: x => x.QuizResultID,
                        principalTable: "QuizResults",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Agendas_AccountID",
                table: "Agendas",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_Answers_QuizResultID",
                table: "Answers",
                column: "QuizResultID");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_CommenterID",
                table: "Comments",
                column: "CommenterID");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_ForumID",
                table: "Comments",
                column: "ForumID");

            migrationBuilder.CreateIndex(
                name: "IX_Forums_ForumPosterID",
                table: "Forums",
                column: "ForumPosterID");

            migrationBuilder.CreateIndex(
                name: "IX_Profiles_AccountID",
                table: "Profiles",
                column: "AccountID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Questions_QuizID",
                table: "Questions",
                column: "QuizID");

            migrationBuilder.CreateIndex(
                name: "IX_QuizResults_QuizID",
                table: "QuizResults",
                column: "QuizID");

            migrationBuilder.CreateIndex(
                name: "IX_QuizResults_QuizSubmitterID",
                table: "QuizResults",
                column: "QuizSubmitterID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Agendas");

            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "Profiles");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "QuizResults");

            migrationBuilder.DropTable(
                name: "Forums");

            migrationBuilder.DropTable(
                name: "Quizzes");

            migrationBuilder.DropTable(
                name: "Accounts");
        }
    }
}
