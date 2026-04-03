import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("🌱 Seeding database...");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    // ─── Course ───────────────────────────────────────────────
    await db.insert(schema.courses).values([
      { id: 1, title: "Mathematics", imageSrc: "/math.svg" },
    ]);

    // ─── Units ────────────────────────────────────────────────
    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Équations",
        description: "Équations du 1er et 2ème degré",
        order: 1,
      },
      {
        id: 2,
        courseId: 1,
        title: "Fractions & Proportions",
        description: "Maîtrise les fractions et les proportions",
        order: 2,
      },
      {
        id: 3,
        courseId: 1,
        title: "Géométrie",
        description: "Aires, périmètres et théorèmes",
        order: 3,
      },
      {
        id: 4,
        courseId: 1,
        title: "Statistiques",
        description: "Moyenne, médiane et probabilités",
        order: 4,
      },
    ]);

    // ─── Lessons ──────────────────────────────────────────────
    await db.insert(schema.lessons).values([
      // Unit 1 - Équations
      { id: 1, unitId: 1, order: 1, title: "Équations du 1er degré" },
      { id: 2, unitId: 1, order: 2, title: "Équations du 2ème degré" },
      { id: 3, unitId: 1, order: 3, title: "Systèmes d'équations" },

      // Unit 2 - Fractions
      { id: 4, unitId: 2, order: 1, title: "Simplification de fractions" },
      { id: 5, unitId: 2, order: 2, title: "Opérations sur les fractions" },
      { id: 6, unitId: 2, order: 3, title: "Proportions & règle de trois" },

      // Unit 3 - Géométrie
      { id: 7, unitId: 3, order: 1, title: "Aires et périmètres" },
      { id: 8, unitId: 3, order: 2, title: "Théorème de Pythagore" },
      { id: 9, unitId: 3, order: 3, title: "Théorème de Thalès" },

      // Unit 4 - Statistiques
      { id: 10, unitId: 4, order: 1, title: "Moyenne et médiane" },
      { id: 11, unitId: 4, order: 2, title: "Probabilités de base" },
    ]);

    // ─── Challenges ───────────────────────────────────────────
    await db.insert(schema.challenges).values([

      // ── Leçon 1 : Équations 1er degré ──
      { id: 1,  lessonId: 1, type: "SELECT", order: 1, question: "Qui est la plus belle ?" },
      { id: 2,  lessonId: 1, type: "ASSIST", order: 2, question: "Résous : 3x + 7 = 2x + 15" },
      { id: 3,  lessonId: 1, type: "ASSIST", order: 3, question: "Résous : 5(x - 2) = 3(x + 4)" },
      { id: 4,  lessonId: 1, type: "ASSIST", order: 4, question: "Résous : 7x - 9 = 5x + 15" },
      { id: 5,  lessonId: 1, type: "ASSIST", order: 5, question: "Résous : 4(2x - 1) = 6x + 10" },

      // ── Leçon 2 : Équations 2ème degré ──
      { id: 6,  lessonId: 2, type: "ASSIST", order: 1, question: "Résous : x² - 9 = 0" },
      { id: 7,  lessonId: 2, type: "ASSIST", order: 2, question: "Résous : 2x² - 18 = 0" },
      { id: 8,  lessonId: 2, type: "ASSIST", order: 3, question: "Résous : (x - 4)(2x + 6) = 0" },
      { id: 9,  lessonId: 2, type: "ASSIST", order: 4, question: "Résous : (x + 2)² = 49" },
      { id: 10, lessonId: 2, type: "ASSIST", order: 5, question: "Résous : x² - 5x + 6 = 0" },

      // ── Leçon 3 : Systèmes d'équations ──
      { id: 11, lessonId: 3, type: "ASSIST", order: 1, question: "Résous : x + y = 10 et x - y = 4" },
      { id: 12, lessonId: 3, type: "ASSIST", order: 2, question: "Résous : 2x + y = 7 et x - y = 2" },
      { id: 13, lessonId: 3, type: "ASSIST", order: 3, question: "Résous : 3x + 2y = 12 et x + y = 5" },
      { id: 14, lessonId: 3, type: "ASSIST", order: 4, question: "Résous : x + 2y = 8 et 2x - y = 1" },

      // ── Leçon 4 : Simplification de fractions ──
      { id: 15, lessonId: 4, type: "SELECT", order: 1, question: "Simplifie : 12/18" },
      { id: 16, lessonId: 4, type: "SELECT", order: 2, question: "Simplifie : 24/36" },
      { id: 17, lessonId: 4, type: "SELECT", order: 3, question: "Simplifie : 15/45" },
      { id: 18, lessonId: 4, type: "SELECT", order: 4, question: "Simplifie : 28/42" },

      // ── Leçon 5 : Opérations sur les fractions ──
      { id: 19, lessonId: 5, type: "SELECT", order: 1, question: "Calcule : 1/2 + 1/3" },
      { id: 20, lessonId: 5, type: "SELECT", order: 2, question: "Calcule : 3/4 - 1/6" },
      { id: 21, lessonId: 5, type: "SELECT", order: 3, question: "Calcule : 2/3 × 3/4" },
      { id: 22, lessonId: 5, type: "SELECT", order: 4, question: "Calcule : 5/6 ÷ 5/3" },

      // ── Leçon 6 : Proportions ──
      { id: 23, lessonId: 6, type: "SELECT", order: 1, question: "Si 3 stylos coûtent 6€, combien coûtent 7 stylos ?" },
      { id: 24, lessonId: 6, type: "SELECT", order: 2, question: "Une voiture roule 150 km en 2h. Quelle distance en 5h ?" },
      { id: 25, lessonId: 6, type: "SELECT", order: 3, question: "4 ouvriers font un travail en 6 jours. Combien faut-il d'ouvriers pour 3 jours ?" },

      // ── Leçon 7 : Aires et périmètres ──
      { id: 26, lessonId: 7, type: "SELECT", order: 1, question: "Quelle est l'aire d'un rectangle de 6cm × 4cm ?" },
      { id: 27, lessonId: 7, type: "SELECT", order: 2, question: "Quel est le périmètre d'un carré de côté 5cm ?" },
      { id: 28, lessonId: 7, type: "SELECT", order: 3, question: "Quelle est l'aire d'un triangle de base 8cm et hauteur 5cm ?" },
      { id: 29, lessonId: 7, type: "SELECT", order: 4, question: "Quelle est l'aire d'un cercle de rayon 7cm ? (π ≈ 3.14)" },

      // ── Leçon 8 : Pythagore ──
      { id: 30, lessonId: 8, type: "SELECT", order: 1, question: "Triangle rectangle : a=3, b=4. Quelle est la valeur de c ?" },
      { id: 31, lessonId: 8, type: "SELECT", order: 2, question: "Triangle rectangle : a=5, b=12. Quelle est la valeur de c ?" },
      { id: 32, lessonId: 8, type: "SELECT", order: 3, question: "Triangle rectangle : c=10, a=6. Quelle est la valeur de b ?" },

      // ── Leçon 9 : Thalès ──
      { id: 33, lessonId: 9, type: "SELECT", order: 1, question: "Si AB=6, AC=9 et AD=4, quelle est la longueur AE ?" },
      { id: 34, lessonId: 9, type: "SELECT", order: 2, question: "Si AB=8, DE=4 et AD=3, quelle est la longueur BC ?" },

      // ── Leçon 10 : Moyenne et médiane ──
      { id: 35, lessonId: 10, type: "SELECT", order: 1, question: "Quelle est la moyenne de : 4, 8, 6, 10, 2 ?" },
      { id: 36, lessonId: 10, type: "SELECT", order: 2, question: "Quelle est la médiane de : 3, 7, 1, 9, 5 ?" },
      { id: 37, lessonId: 10, type: "SELECT", order: 3, question: "Quelle est la moyenne de : 12, 15, 18, 9, 6 ?" },

      // ── Leçon 11 : Probabilités ──
      { id: 38, lessonId: 11, type: "SELECT", order: 1, question: "On lance un dé. Quelle est la probabilité d'obtenir 6 ?" },
      { id: 39, lessonId: 11, type: "SELECT", order: 2, question: "On tire une carte dans un jeu de 52. Probabilité d'un as ?" },
      { id: 40, lessonId: 11, type: "SELECT", order: 3, question: "On lance une pièce 2 fois. Probabilité d'obtenir 2 faces ?" },
    ]);

    // ─── Challenge Options ─────────────────────────────────────
    await db.insert(schema.challengeOptions).values([

      // Leçon 1
      { challengeId: 1,  correct: false, text: "Sarah",           audioSrc: "/sarah.mp3" },
      { challengeId: 1,  correct: false, text: "Fatima",          audioSrc: "/fatima.mp3" },
      { challengeId: 1,  correct: true,  text: "Amirah",          audioSrc: "/amirah.mp3" },

      { challengeId: 2,  correct: false, text: "x = 6",           audioSrc: "/6.mp3" },
      { challengeId: 2,  correct: false, text: "x = 10",          audioSrc: "/10.mp3" },
      { challengeId: 2,  correct: true,  text: "x = 8",           audioSrc: "/8.mp3" },

      { challengeId: 3,  correct: false, text: "x = 9",           audioSrc: "/9.mp3" },
      { challengeId: 3,  correct: false, text: "x = 13",          audioSrc: "/13.mp3" },
      { challengeId: 3,  correct: true,  text: "x = 11",          audioSrc: "/11.mp3" },

      { challengeId: 4,  correct: false, text: "x = 8",           audioSrc: "/8.mp3" },
      { challengeId: 4,  correct: true,  text: "x = 12",          audioSrc: "/12.mp3" },
      { challengeId: 4,  correct: false, text: "x = 14",          audioSrc: "/14.mp3" },

      { challengeId: 5,  correct: false, text: "x = 5",           audioSrc: "/5.mp3" },
      { challengeId: 5,  correct: true,  text: "x = 7",           audioSrc: "/7.mp3" },
      { challengeId: 5,  correct: false, text: "x = 9",           audioSrc: "/9.mp3" },

      // Leçon 2
      { challengeId: 6,  correct: false, text: "x = 6 ou x = -6", audioSrc: "/6.mp3" },
      { challengeId: 6,  correct: true,  text: "x = 3 ou x = -3", audioSrc: "/3.mp3" },
      { challengeId: 6,  correct: false, text: "x = 9 ou x = -9", audioSrc: "/9.mp3" },

      { challengeId: 7,  correct: false, text: "x = 9 ou x = -9", audioSrc: "/9.mp3" },
      { challengeId: 7,  correct: true,  text: "x = 3 ou x = -3", audioSrc: "/3.mp3" },
      { challengeId: 7,  correct: false, text: "x = 6 ou x = -6", audioSrc: "/6.mp3" },

      { challengeId: 8,  correct: false, text: "x = -4 ou x = 3", audioSrc: "/4.mp3" },
      { challengeId: 8,  correct: true,  text: "x = 4 ou x = -3", audioSrc: "/4.mp3" },
      { challengeId: 8,  correct: false, text: "x = 2 ou x = -6", audioSrc: "/2.mp3" },

      { challengeId: 9,  correct: false, text: "x = 7 ou x = -11",audioSrc: "/7.mp3" },
      { challengeId: 9,  correct: true,  text: "x = 5 ou x = -9", audioSrc: "/5.mp3" },
      { challengeId: 9,  correct: false, text: "x = 3 ou x = -7", audioSrc: "/3.mp3" },

      { challengeId: 10, correct: false, text: "x = 1 ou x = 4",  audioSrc: "/1.mp3" },
      { challengeId: 10, correct: true,  text: "x = 2 ou x = 3",  audioSrc: "/2.mp3" },
      { challengeId: 10, correct: false, text: "x = 0 ou x = 5",  audioSrc: "/5.mp3" },

      // Leçon 3
      { challengeId: 11, correct: false, text: "x=8, y=2",        audioSrc: "/8.mp3" },
      { challengeId: 11, correct: true,  text: "x=7, y=3",        audioSrc: "/7.mp3" },
      { challengeId: 11, correct: false, text: "x=6, y=4",        audioSrc: "/6.mp3" },

      { challengeId: 12, correct: false, text: "x=2, y=4",        audioSrc: "/2.mp3" },
      { challengeId: 12, correct: true,  text: "x=3, y=1",        audioSrc: "/3.mp3" },
      { challengeId: 12, correct: false, text: "x=4, y=0",        audioSrc: "/4.mp3" },

      { challengeId: 13, correct: false, text: "x=1, y=4",        audioSrc: "/1.mp3" },
      { challengeId: 13, correct: true,  text: "x=2, y=3",        audioSrc: "/2.mp3" },
      { challengeId: 13, correct: false, text: "x=3, y=2",        audioSrc: "/3.mp3" },

      { challengeId: 14, correct: false, text: "x=3, y=2",        audioSrc: "/3.mp3" },
      { challengeId: 14, correct: true,  text: "x=2, y=3",        audioSrc: "/2.mp3" },
      { challengeId: 14, correct: false, text: "x=1, y=4",        audioSrc: "/1.mp3" },

      // Leçon 4
      { challengeId: 15, correct: false, text: "1/2",             audioSrc: "/1.mp3" },
      { challengeId: 15, correct: true,  text: "2/3",             audioSrc: "/2.mp3" },
      { challengeId: 15, correct: false, text: "3/4",             audioSrc: "/3.mp3" },

      { challengeId: 16, correct: false, text: "1/2",             audioSrc: "/1.mp3" },
      { challengeId: 16, correct: true,  text: "2/3",             audioSrc: "/2.mp3" },
      { challengeId: 16, correct: false, text: "3/5",             audioSrc: "/3.mp3" },

      { challengeId: 17, correct: true,  text: "1/3",             audioSrc: "/1.mp3" },
      { challengeId: 17, correct: false, text: "1/4",             audioSrc: "/1.mp3" },
      { challengeId: 17, correct: false, text: "2/5",             audioSrc: "/2.mp3" },

      { challengeId: 18, correct: false, text: "1/2",             audioSrc: "/1.mp3" },
      { challengeId: 18, correct: true,  text: "2/3",             audioSrc: "/2.mp3" },
      { challengeId: 18, correct: false, text: "3/7",             audioSrc: "/3.mp3" },

      // Leçon 5
      { challengeId: 19, correct: false, text: "2/5",             audioSrc: "/2.mp3" },
      { challengeId: 19, correct: true,  text: "5/6",             audioSrc: "/5.mp3" },
      { challengeId: 19, correct: false, text: "1/6",             audioSrc: "/1.mp3" },

      { challengeId: 20, correct: false, text: "1/4",             audioSrc: "/1.mp3" },
      { challengeId: 20, correct: true,  text: "7/12",            audioSrc: "/7.mp3" },
      { challengeId: 20, correct: false, text: "2/3",             audioSrc: "/2.mp3" },

      { challengeId: 21, correct: false, text: "5/12",            audioSrc: "/5.mp3" },
      { challengeId: 21, correct: true,  text: "1/2",             audioSrc: "/1.mp3" },
      { challengeId: 21, correct: false, text: "3/4",             audioSrc: "/3.mp3" },

      { challengeId: 22, correct: false, text: "25/18",           audioSrc: "/25.mp3" },
      { challengeId: 22, correct: true,  text: "1/2",             audioSrc: "/1.mp3" },
      { challengeId: 22, correct: false, text: "5/9",             audioSrc: "/5.mp3" },

      // Leçon 6
      { challengeId: 23, correct: false, text: "12€",             audioSrc: "/12.mp3" },
      { challengeId: 23, correct: true,  text: "14€",             audioSrc: "/14.mp3" },
      { challengeId: 23, correct: false, text: "16€",             audioSrc: "/16.mp3" },

      { challengeId: 24, correct: false, text: "300 km",          audioSrc: "/300.mp3" },
      { challengeId: 24, correct: true,  text: "375 km",          audioSrc: "/375.mp3" },
      { challengeId: 24, correct: false, text: "400 km",          audioSrc: "/400.mp3" },

      { challengeId: 25, correct: false, text: "6 ouvriers",      audioSrc: "/6.mp3" },
      { challengeId: 25, correct: true,  text: "8 ouvriers",      audioSrc: "/8.mp3" },
      { challengeId: 25, correct: false, text: "10 ouvriers",     audioSrc: "/10.mp3" },

      // Leçon 7
      { challengeId: 26, correct: false, text: "20 cm²",          audioSrc: "/20.mp3" },
      { challengeId: 26, correct: true,  text: "24 cm²",          audioSrc: "/24.mp3" },
      { challengeId: 26, correct: false, text: "28 cm²",          audioSrc: "/28.mp3" },

      { challengeId: 27, correct: false, text: "15 cm",           audioSrc: "/15.mp3" },
      { challengeId: 27, correct: true,  text: "20 cm",           audioSrc: "/20.mp3" },
      { challengeId: 27, correct: false, text: "25 cm",           audioSrc: "/25.mp3" },

      { challengeId: 28, correct: false, text: "16 cm²",          audioSrc: "/16.mp3" },
      { challengeId: 28, correct: true,  text: "20 cm²",          audioSrc: "/20.mp3" },
      { challengeId: 28, correct: false, text: "24 cm²",          audioSrc: "/24.mp3" },

      { challengeId: 29, correct: false, text: "143.07 cm²",      audioSrc: "/143.mp3" },
      { challengeId: 29, correct: true,  text: "153.86 cm²",      audioSrc: "/153.mp3" },
      { challengeId: 29, correct: false, text: "163.28 cm²",      audioSrc: "/163.mp3" },

      // Leçon 8
      { challengeId: 30, correct: false, text: "c = 6",           audioSrc: "/6.mp3" },
      { challengeId: 30, correct: true,  text: "c = 5",           audioSrc: "/5.mp3" },
      { challengeId: 30, correct: false, text: "c = 7",           audioSrc: "/7.mp3" },

      { challengeId: 31, correct: false, text: "c = 11",          audioSrc: "/11.mp3" },
      { challengeId: 31, correct: true,  text: "c = 13",          audioSrc: "/13.mp3" },
      { challengeId: 31, correct: false, text: "c = 15",          audioSrc: "/15.mp3" },

      { challengeId: 32, correct: false, text: "b = 6",           audioSrc: "/6.mp3" },
      { challengeId: 32, correct: true,  text: "b = 8",           audioSrc: "/8.mp3" },
      { challengeId: 32, correct: false, text: "b = 10",          audioSrc: "/10.mp3" },

      // Leçon 9
      { challengeId: 33, correct: false, text: "AE = 5",          audioSrc: "/5.mp3" },
      { challengeId: 33, correct: true,  text: "AE = 6",          audioSrc: "/6.mp3" },
      { challengeId: 33, correct: false, text: "AE = 7",          audioSrc: "/7.mp3" },

      { challengeId: 34, correct: false, text: "BC = 6",          audioSrc: "/6.mp3" },
      { challengeId: 34, correct: true,  text: "BC = 6",          audioSrc: "/6.mp3" },
      { challengeId: 34, correct: false, text: "BC = 8",          audioSrc: "/8.mp3" },

      // Leçon 10
      { challengeId: 35, correct: false, text: "5",               audioSrc: "/5.mp3" },
      { challengeId: 35, correct: true,  text: "6",               audioSrc: "/6.mp3" },
      { challengeId: 35, correct: false, text: "7",               audioSrc: "/7.mp3" },

      { challengeId: 36, correct: false, text: "3",               audioSrc: "/3.mp3" },
      { challengeId: 36, correct: true,  text: "5",               audioSrc: "/5.mp3" },
      { challengeId: 36, correct: false, text: "7",               audioSrc: "/7.mp3" },

      { challengeId: 37, correct: false, text: "10",              audioSrc: "/10.mp3" },
      { challengeId: 37, correct: true,  text: "12",              audioSrc: "/12.mp3" },
      { challengeId: 37, correct: false, text: "14",              audioSrc: "/14.mp3" },

      // Leçon 11
      { challengeId: 38, correct: false, text: "1/3",             audioSrc: "/1.mp3" },
      { challengeId: 38, correct: true,  text: "1/6",             audioSrc: "/1.mp3" },
      { challengeId: 38, correct: false, text: "1/12",            audioSrc: "/1.mp3" },

      { challengeId: 39, correct: false, text: "1/13",            audioSrc: "/1.mp3" },
      { challengeId: 39, correct: true,  text: "1/13",            audioSrc: "/1.mp3" },
      { challengeId: 39, correct: false, text: "4/52",            audioSrc: "/4.mp3" },

      { challengeId: 40, correct: false, text: "1/2",             audioSrc: "/1.mp3" },
      { challengeId: 40, correct: true,  text: "1/4",             audioSrc: "/1.mp3" },
      { challengeId: 40, correct: false, text: "1/3",             audioSrc: "/1.mp3" },
    ]);

    console.log("✅ Seeding terminé !");
    console.log("📚 4 unités | 11 leçons | 40 exercices");

  } catch (error) {
    console.error("❌ Erreur:", error);
    throw new Error("Failed to seed the database");
  }
};

main();