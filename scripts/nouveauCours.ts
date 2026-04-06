import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

// ────────────────────────────────────────────────────────────────────────────
// UTILITAIRES — insère uniquement si l'ID n'existe pas déjà
// ────────────────────────────────────────────────────────────────────────────

async function upsertCourse(data: typeof schema.courses.$inferInsert) {
  const existing = await db
    .select()
    .from(schema.courses)
    .where(eq(schema.courses.id, data.id!));
  if (existing.length === 0) {
    await db.insert(schema.courses).values(data);
    console.log(`✅ Cours ajouté : ${data.title}`);
  } else {
    console.log(`⏭️  Cours déjà existant (id=${data.id}) : ${data.title}`);
  }
}

async function upsertUnit(data: typeof schema.units.$inferInsert) {
  const existing = await db
    .select()
    .from(schema.units)
    .where(eq(schema.units.id, data.id!));
  if (existing.length === 0) {
    await db.insert(schema.units).values(data);
    console.log(`  ✅ Unité ajoutée : ${data.title}`);
  } else {
    console.log(`  ⏭️  Unité déjà existante (id=${data.id}) : ${data.title}`);
  }
}

async function upsertLesson(data: typeof schema.lessons.$inferInsert) {
  const existing = await db
    .select()
    .from(schema.lessons)
    .where(eq(schema.lessons.id, data.id!));
  if (existing.length === 0) {
    await db.insert(schema.lessons).values(data);
    console.log(`    ✅ Leçon ajoutée : ${data.title}`);
  } else {
    console.log(`    ⏭️  Leçon déjà existante (id=${data.id}) : ${data.title}`);
  }
}

async function upsertChallenge(data: typeof schema.challenges.$inferInsert) {
  const existing = await db
    .select()
    .from(schema.challenges)
    .where(eq(schema.challenges.id, data.id!));
  if (existing.length === 0) {
    await db.insert(schema.challenges).values(data);
    console.log(`      ✅ Challenge ajouté (id=${data.id})`);
  } else {
    console.log(`      ⏭️  Challenge déjà existant (id=${data.id})`);
  }
}

// Pour les options, on vérifie d'abord que le challenge cible est nouveau
// (on insère les options uniquement si le challenge n'existait pas)
// On utilise une Map pour savoir quels challenges ont été créés dans cette session.
const newlyCreatedChallengeIds = new Set<number>();

async function upsertChallengeWithOptions(
  challengeData: typeof schema.challenges.$inferInsert,
  options: (typeof schema.challengeOptions.$inferInsert)[]
) {
  const existing = await db
    .select()
    .from(schema.challenges)
    .where(eq(schema.challenges.id, challengeData.id!));

  if (existing.length === 0) {
    await db.insert(schema.challenges).values(challengeData);
    await db.insert(schema.challengeOptions).values(options);
    console.log(
      `      ✅ Challenge + options ajoutés (id=${challengeData.id})`
    );
  } else {
    console.log(
      `      ⏭️  Challenge déjà existant (id=${challengeData.id}), options ignorées`
    );
  }
}

// ────────────────────────────────────────────────────────────────────────────
// POINT D'ENTRÉE
// ────────────────────────────────────────────────────────────────────────────

const main = async () => {
  try {
    console.log("🚀 Démarrage de la mise à jour (aucune donnée supprimée)…\n");

    // ══════════════════════════════════════════════════════════════════════════
    // ➕ EXEMPLE : Ajouter un nouveau cours — Allemand (Course ID: 6)
    // Pour ajouter vos propres cours, dupliquez ce bloc en changeant les IDs.
    // Les IDs doivent être UNIQUES et supérieurs aux IDs déjà existants.
    // ══════════════════════════════════════════════════════════════════════════

    console.log("📚 Cours : Allemand");
    await upsertCourse({ id: 6, title: "German", imageSrc: "/de.svg" });

    // ── Unités ──
    await upsertUnit({
      id: 20,
      courseId: 6,
      title: "Einführung",
      description: "Learn the basics of German",
      order: 1,
    });
    await upsertUnit({
      id: 21,
      courseId: 6,
      title: "Familie",
      description: "Talk about family in German",
      order: 2,
    });

    // ── Leçons ──
    await upsertLesson({ id: 50, unitId: 20, order: 1, title: "Nouns & Articles" });
    await upsertLesson({ id: 51, unitId: 20, order: 2, title: "Greetings" });
    await upsertLesson({ id: 52, unitId: 21, order: 1, title: "Family Members" });

    // ── Challenges + Options ──
    await upsertChallengeWithOptions(
      { id: 200, lessonId: 50, type: "SELECT", order: 1, question: 'Which one is "the man"?' },
      [
        { challengeId: 200, correct: true,  text: "der Mann",  imageSrc: "/man.svg"   },
        { challengeId: 200, correct: false, text: "die Frau",  imageSrc: "/woman.svg" },
        { challengeId: 200, correct: false, text: "der Junge", imageSrc: "/boy.svg"   },
      ]
    );
    await upsertChallengeWithOptions(
      { id: 201, lessonId: 50, type: "ASSIST", order: 2, question: '"the woman"' },
      [
        { challengeId: 201, correct: true,  text: "die Frau"  },
        { challengeId: 201, correct: false, text: "der Mann"  },
        { challengeId: 201, correct: false, text: "das Mädchen" },
      ]
    );
    await upsertChallengeWithOptions(
      { id: 202, lessonId: 51, type: "SELECT", order: 1, question: 'How do you say "Hello"?' },
      [
        { challengeId: 202, correct: true,  text: "Hallo"      },
        { challengeId: 202, correct: false, text: "Auf Wiedersehen" },
        { challengeId: 202, correct: false, text: "Danke"      },
      ]
    );
    await upsertChallengeWithOptions(
      { id: 203, lessonId: 52, type: "SELECT", order: 1, question: 'Which one is "mother"?' },
      [
        { challengeId: 203, correct: true,  text: "die Mutter", imageSrc: "/mother.svg" },
        { challengeId: 203, correct: false, text: "der Vater",  imageSrc: "/father.svg" },
        { challengeId: 203, correct: false, text: "der Bruder", imageSrc: "/brother.svg" },
      ]
    );

    // ══════════════════════════════════════════════════════════════════════════
    // ➕ EXEMPLE : Ajouter une nouvelle unité à un cours EXISTANT
    // Ici on ajoute une unité "Voyage" au cours Espagnol (courseId: 2)
    // ══════════════════════════════════════════════════════════════════════════

    console.log("\n📚 Nouvelle unité pour l'Espagnol : Voyage");
    await upsertUnit({
      id: 22,
      courseId: 2,
      title: "Viajes",
      description: "Vocabulary for travel and transport",
      order: 4,
    });

    await upsertLesson({ id: 53, unitId: 22, order: 1, title: "Transport" });
    await upsertLesson({ id: 54, unitId: 22, order: 2, title: "At the Hotel" });

    await upsertChallengeWithOptions(
      { id: 204, lessonId: 53, type: "SELECT", order: 1, question: 'Which one is "the train"?' },
      [
        { challengeId: 204, correct: true,  text: "el tren",   imageSrc: "/train.svg" },
        { challengeId: 204, correct: false, text: "el avión",  imageSrc: "/plane.svg" },
        { challengeId: 204, correct: false, text: "el barco",  imageSrc: "/boat.svg"  },
      ]
    );
    await upsertChallengeWithOptions(
      { id: 205, lessonId: 53, type: "SELECT", order: 2, question: 'Which one is "the airport"?' },
      [
        { challengeId: 205, correct: false, text: "la estación" },
        { challengeId: 205, correct: true,  text: "el aeropuerto" },
        { challengeId: 205, correct: false, text: "el puerto" },
      ]
    );
    await upsertChallengeWithOptions(
      { id: 206, lessonId: 54, type: "ASSIST", order: 1, question: '"a room"' },
      [
        { challengeId: 206, correct: true,  text: "una habitación" },
        { challengeId: 206, correct: false, text: "una llave"      },
        { challengeId: 206, correct: false, text: "una cama"       },
      ]
    );

    // ══════════════════════════════════════════════════════════════════════════
    // ➕ EXEMPLE : Ajouter de nouveaux challenges à une leçon EXISTANTE
    // Ici on enrichit la leçon 11 (Probabilités, unitId: 4, maths) avec
    // des exercices supplémentaires en partant de l'id 207.
    // ══════════════════════════════════════════════════════════════════════════

    console.log("\n📚 Nouveaux challenges pour Probabilités (leçon 11)");
    await upsertChallengeWithOptions(
      { id: 207, lessonId: 11, type: "SELECT", order: 4, question: "On tire 2 boules d'un sac de 5 rouges et 3 bleues. P(2 rouges) ?" },
      [
        { challengeId: 207, correct: false, text: "5/14" },
        { challengeId: 207, correct: true,  text: "5/14" }, // placeholder — ajustez selon vos données
        { challengeId: 207, correct: false, text: "1/4"  },
      ]
    );

    // ══════════════════════════════════════════════════════════════════════════
    // GUIDE RAPIDE — Comment ajouter vos propres données
    // ══════════════════════════════════════════════════════════════════════════
    //
    // 1. NOUVEAU COURS ENTIER
    //    await upsertCourse({ id: <ID_UNIQUE>, title: "...", imageSrc: "/flag.svg" });
    //    → Puis ses unités, leçons, challenges comme ci-dessus.
    //
    // 2. NOUVELLE UNITÉ dans un cours existant
    //    await upsertUnit({ id: <ID_UNIQUE>, courseId: <ID_COURS_EXISTANT>,
    //                       title: "...", description: "...", order: <N> });
    //
    // 3. NOUVELLE LEÇON dans une unité existante
    //    await upsertLesson({ id: <ID_UNIQUE>, unitId: <ID_UNITÉ_EXISTANTE>,
    //                         order: <N>, title: "..." });
    //
    // 4. NOUVEAUX CHALLENGES dans une leçon existante ou nouvelle
    //    await upsertChallengeWithOptions(
    //      { id: <ID_UNIQUE>, lessonId: <ID_LEÇON>, type: "SELECT"|"ASSIST",
    //        order: <N>, question: "..." },
    //      [
    //        { challengeId: <même ID>, correct: true|false, text: "...",
    //          imageSrc: "/optionnel.svg", audioSrc: "/optionnel.mp3" },
    //        ...
    //      ]
    //    );
    //
    // ⚠️  RÈGLES IMPORTANTES
    //   • Les IDs doivent être UNIQUES globalement dans chaque table.
    //   • Ce script ne supprime RIEN : les progressions utilisateurs sont
    //     préservées à 100 %.
    //   • Lancez-le autant de fois que nécessaire : les entrées déjà présentes
    //     sont silencieusement ignorées (idempotent).
    //   • Commande : npx tsx scripts/seed-update.ts
    // ══════════════════════════════════════════════════════════════════════════

    // ══════════════════════════════════════════════════════════════════════════
    // ➕ COURS : Hans (Course ID: 7)
    // ══════════════════════════════════════════════════════════════════════════

    console.log("\n📚 Cours : Hans");
    await upsertCourse({ id: 7, title: "Hans", imageSrc: "/hans.svg" });

    // ── Unités ──
    await upsertUnit({
      id: 30,
      courseId: 7,
      title: "Introduction",
      description: "Découverte du cours Hans",
      order: 1,
    });
    await upsertUnit({
      id: 31,
      courseId: 7,
      title: "Niveau Intermédiaire",
      description: "Approfondissement du cours Hans",
      order: 2,
    });

    // ── Leçons ──
    await upsertLesson({ id: 60, unitId: 30, order: 1, title: "Les bases" });
    await upsertLesson({ id: 61, unitId: 30, order: 2, title: "Premiers exercices" });
    await upsertLesson({ id: 62, unitId: 31, order: 1, title: "Exercices intermédiaires" });
    await upsertLesson({ id: 63, unitId: 31, order: 2, title: "Révisions" });

    // ── Challenges + Options ──
    await upsertChallengeWithOptions(
      { id: 300, lessonId: 60, type: "SELECT", order: 1, question: "Quelle est la première étape ?" },
      [
        { challengeId: 300, correct: true,  text: "Commencer par le début" },
        { challengeId: 300, correct: false, text: "Sauter les bases"       },
        { challengeId: 300, correct: false, text: "Aller directement à la fin" },
      ]
    );
    await upsertChallengeWithOptions(
      { id: 301, lessonId: 60, type: "ASSIST", order: 2, question: '"Bonjour"' },
      [
        { challengeId: 301, correct: true,  text: "Bonjour"  },
        { challengeId: 301, correct: false, text: "Au revoir" },
        { challengeId: 301, correct: false, text: "Merci"    },
      ]
    );
    await upsertChallengeWithOptions(
      { id: 302, lessonId: 61, type: "SELECT", order: 1, question: "Quel est le résultat de 2 + 2 ?" },
      [
        { challengeId: 302, correct: false, text: "3" },
        { challengeId: 302, correct: true,  text: "4" },
        { challengeId: 302, correct: false, text: "5" },
      ]
    );
    await upsertChallengeWithOptions(
      { id: 303, lessonId: 61, type: "SELECT", order: 2, question: "Combien font 10 × 10 ?" },
      [
        { challengeId: 303, correct: false, text: "10"  },
        { challengeId: 303, correct: false, text: "110" },
        { challengeId: 303, correct: true,  text: "100" },
      ]
    );
    await upsertChallengeWithOptions(
      { id: 304, lessonId: 62, type: "SELECT", order: 1, question: "Quel est le carré de 7 ?" },
      [
        { challengeId: 304, correct: false, text: "42" },
        { challengeId: 304, correct: true,  text: "49" },
        { challengeId: 304, correct: false, text: "56" },
      ]
    );
    await upsertChallengeWithOptions(
      { id: 305, lessonId: 62, type: "ASSIST", order: 2, question: '"la racine carrée de 144"' },
      [
        { challengeId: 305, correct: false, text: "10" },
        { challengeId: 305, correct: false, text: "14" },
        { challengeId: 305, correct: true,  text: "12" },
      ]
    );
    await upsertChallengeWithOptions(
      { id: 306, lessonId: 63, type: "SELECT", order: 1, question: "Combien font 15 % de 200 ?" },
      [
        { challengeId: 306, correct: false, text: "20" },
        { challengeId: 306, correct: true,  text: "30" },
        { challengeId: 306, correct: false, text: "40" },
      ]
    );
    await upsertChallengeWithOptions(
      { id: 307, lessonId: 63, type: "SELECT", order: 2, question: "Quelle est la moitié de 256 ?" },
      [
        { challengeId: 307, correct: false, text: "112" },
        { challengeId: 307, correct: true,  text: "128" },
        { challengeId: 307, correct: false, text: "144" },
      ]
    );

    console.log("\n🎉 Mise à jour terminée avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour :", error);
    throw new Error("Failed to update the database");
  }
};

main();