import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!); 
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("🌱 Seeding database with difficult equations...");

    // Reset des tables
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    // 1. Ajout du cours Maths
    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Mathematics",
        imageSrc: "/math.svg",
      },
    ]);

    // 2. Ajout de l'unité
    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Équations Complexes",
        description: "Résous des équations du 1er degré difficiles",
        order: 1,
      },
    ]);

    // 3. Ajout de la leçon
    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        order: 1,
        title: "Équations difficiles - Niveau Expert",
      },
    ]);

    // 4. Ajout des 10 challenges (exercices)
    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "ASSIST",
        order: 1,
        question: "Résous : 3x + 7 = 2x + 15",
      },
      {
        id: 2,
        lessonId: 1,
        type: "ASSIST",
        order: 2,
        question: "Résous : 5(x - 2) = 3(x + 4)",
      },
      {
        id: 3,
        lessonId: 1,
        type: "ASSIST",
        order: 3,
        question: "Résous : (2x - 5)/3 = (x + 1)/2",
      },
      {
        id: 4,
        lessonId: 1,
        type: "ASSIST",
        order: 4,
        question: "Résous : 7x - 9 = 5x + 15",
      },
      {
        id: 5,
        lessonId: 1,
        type: "ASSIST",
        order: 5,
        question: "Résous : 4(2x - 1) = 6x + 10",
      },
      {
        id: 6,
        lessonId: 1,
        type: "ASSIST",
        order: 6,
        question: "Résous : (x + 3)/2 - (x - 1)/3 = 5",
      },
      {
        id: 7,
        lessonId: 1,
        type: "ASSIST",
        order: 7,
        question: "Résous : 2x² - 18 = 0",
      },
      {
        id: 8,
        lessonId: 1,
        type: "ASSIST",
        order: 8,
        question: "Résous : (x - 4)(2x + 6) = 0",
      },
      {
        id: 9,
        lessonId: 1,
        type: "ASSIST",
        order: 9,
        question: "Résous : 3x + 8 = 5x - 12",
      },
      {
        id: 10,
        lessonId: 1,
        type: "ASSIST",
        order: 10,
        question: "Résous : (x + 2)² = 49",
      },
    ]);

    // 5. Ajout des options de réponses avec audio
    await db.insert(schema.challengeOptions).values([
      // Exercice 1 : x = 8
      { challengeId: 1, correct: false, text: "x = 6", audioSrc: "/6.mp3" },
      { challengeId: 1, correct: false, text: "x = 10", audioSrc: "/10.mp3" },
      { challengeId: 1, correct: true, text: "x = 8", audioSrc: "/8.mp3" },
      
      // Exercice 2 : x = 11
      { challengeId: 2, correct: false, text: "x = 9", audioSrc: "/9.mp3" },
      { challengeId: 2, correct: false, text: "x = 13", audioSrc: "/13.mp3" },
      { challengeId: 2, correct: true, text: "x = 11", audioSrc: "/11.mp3" },
      
      // Exercice 3 : x = 13
      { challengeId: 3, correct: false, text: "x = 10", audioSrc: "/10.mp3" },
      { challengeId: 3, correct: false, text: "x = 15", audioSrc: "/15.mp3" },
      { challengeId: 3, correct: true, text: "x = 13", audioSrc: "/13.mp3" },
      
      // Exercice 4 : x = 12
      { challengeId: 4, correct: false, text: "x = 8", audioSrc: "/8.mp3" },
      { challengeId: 4, correct: true, text: "x = 12", audioSrc: "/12.mp3" },
      { challengeId: 4, correct: false, text: "x = 14", audioSrc: "/14.mp3" },
      
      // Exercice 5 : x = 7
      { challengeId: 5, correct: false, text: "x = 5", audioSrc: "/5.mp3" },
      { challengeId: 5, correct: true, text: "x = 7", audioSrc: "/7.mp3" },
      { challengeId: 5, correct: false, text: "x = 9", audioSrc: "/9.mp3" },
      
      // Exercice 6 : x = 25
      { challengeId: 6, correct: false, text: "x = 15", audioSrc: "/15.mp3" },
      { challengeId: 6, correct: false, text: "x = 20", audioSrc: "/20.mp3" },
      { challengeId: 6, correct: true, text: "x = 25", audioSrc: "/25.mp3" },
      
      // Exercice 7 : x = 3 ou x = -3
      { challengeId: 7, correct: false, text: "x = 9 ou x = -9", audioSrc: "/9.mp3" },
      { challengeId: 7, correct: true, text: "x = 3 ou x = -3", audioSrc: "/3.mp3" },
      { challengeId: 7, correct: false, text: "x = 6 ou x = -6", audioSrc: "/6.mp3" },
      
      // Exercice 8 : x = 4 ou x = -3
      { challengeId: 8, correct: false, text: "x = -4 ou x = 3", audioSrc: "/4.mp3" },
      { challengeId: 8, correct: true, text: "x = 4 ou x = -3", audioSrc: "/4.mp3" },
      { challengeId: 8, correct: false, text: "x = 2 ou x = -6", audioSrc: "/2.mp3" },
      
      // Exercice 9 : x = 10
      { challengeId: 9, correct: false, text: "x = 8", audioSrc: "/8.mp3" },
      { challengeId: 9, correct: false, text: "x = 12", audioSrc: "/12.mp3" },
      { challengeId: 9, correct: true, text: "x = 10", audioSrc: "/10.mp3" },
      
      // Exercice 10 : x = 5 ou x = -9
      { challengeId: 10, correct: false, text: "x = 7 ou x = -11", audioSrc: "/7.mp3" },
      { challengeId: 10, correct: true, text: "x = 5 ou x = -9", audioSrc: "/5.mp3" },
      { challengeId: 10, correct: false, text: "x = 3 ou x = -7", audioSrc: "/3.mp3" },
    ]);

    console.log("✅ Seeding terminé avec succès !");
    console.log("📊 10 exercices d'équations difficiles ajoutés");
    console.log("");
    console.log("📁 Fichiers audio nécessaires dans public/ :");
    console.log("   - 2.mp3, 3.mp3, 4.mp3, 5.mp3, 6.mp3, 7.mp3, 8.mp3, 9.mp3");
    console.log("   - 10.mp3, 11.mp3, 12.mp3, 13.mp3, 14.mp3, 15.mp3, 20.mp3, 25.mp3");
    
  } catch (error) {
    console.error("❌ Erreur:", error);
    throw new Error("Failed to seed the database");
  }
};

main();