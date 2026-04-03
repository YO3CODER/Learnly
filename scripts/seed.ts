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
        title: "Calculs de base",
        description: "Apprends à résoudre des équations simples",
        order: 1,
      },
    ]);

    // 3. Ajout des leçons
    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        order: 1,
        title: "Les nombres 1, 2 et 3",
      },
    ]);

    // 4. Ajout des challenges
    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "ASSIST",
        order: 1,
        question: "Combien font 1 + 1 ?",
      },
      {
        id: 2,
        lessonId: 1,
        type: "ASSIST",
        order: 2,
        question: "Combien font 2 + 1 ?",
      },
      {
        id: 3,
        lessonId: 1,
        type: "ASSIST",
        order: 3,
        question: "Résous : x + 1 = 3",
      },
    ]);

    // 5. Ajout des options avec audio (sans dossier)
    await db.insert(schema.challengeOptions).values([
      // Challenge 1 : 1 + 1 = 2
      { challengeId: 1, correct: false, text: "1", audioSrc: "/1.mp3" },
      { challengeId: 1, correct: true, text: "2", audioSrc: "/2.mp3" },
      { challengeId: 1, correct: false, text: "3", audioSrc: "/3.mp3" },
      
      // Challenge 2 : 2 + 1 = 3
      { challengeId: 2, correct: false, text: "1", audioSrc: "/1.mp3" },
      { challengeId: 2, correct: false, text: "2", audioSrc: "/2.mp3" },
      { challengeId: 2, correct: true, text: "3", audioSrc: "/3.mp3" },
      
      // Challenge 3 : x + 1 = 3 → x = 2
      { challengeId: 3, correct: false, text: "1", audioSrc: "/1.mp3" },
      { challengeId: 3, correct: true, text: "2", audioSrc: "/2.mp3" },
      { challengeId: 3, correct: false, text: "3", audioSrc: "/3.mp3" },
    ]);

    console.log("✅ Seeding terminé !");
    console.log("📁 Place tes fichiers audio dans public/ :");
    console.log("   - 1.mp3");
    console.log("   - 2.mp3");
    console.log("   - 3.mp3");
    
  } catch (error) {
    console.error("❌ Erreur:", error);
    throw new Error("Failed to seed the database");
  }
};

main();