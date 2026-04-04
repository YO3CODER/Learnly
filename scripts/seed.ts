import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    // Clean existing data
    await db.delete(schema.userProgress);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challenges);
    await db.delete(schema.lessons);
    await db.delete(schema.units);
    await db.delete(schema.courses);
    await db.delete(schema.userSubscription);

    // ────────────────────────────────────────────────
    // COURS
    // ────────────────────────────────────────────────
    await db.insert(schema.courses).values([
      { id: 1, title: "Mathematics", imageSrc: "/math.svg" },
      { id: 2, title: "Spanish", imageSrc: "/es.svg" },
      { id: 3, title: "Italian", imageSrc: "/it.svg" },
      { id: 4, title: "French", imageSrc: "/fr.svg" },
      { id: 5, title: "Croatian", imageSrc: "/hr.svg" },
    ]);

    // ================================================
    // 1. MATHÉMATIQUES (Course ID: 1)
    // ================================================

    await db.insert(schema.units).values([
      { id: 1, courseId: 1, title: "Équations", description: "Équations du 1er et 2ème degré", order: 1 },
      { id: 2, courseId: 1, title: "Fractions & Proportions", description: "Maîtrise les fractions et les proportions", order: 2 },
      { id: 3, courseId: 1, title: "Géométrie", description: "Aires, périmètres et théorèmes", order: 3 },
      { id: 4, courseId: 1, title: "Statistiques", description: "Moyenne, médiane et probabilités", order: 4 },
    ]);

    await db.insert(schema.lessons).values([
      { id: 1, unitId: 1, order: 1, title: "Équations du 1er degré" },
      { id: 2, unitId: 1, order: 2, title: "Équations du 2ème degré" },
      { id: 3, unitId: 1, order: 3, title: "Systèmes d'équations" },
      { id: 4, unitId: 2, order: 1, title: "Simplification de fractions" },
      { id: 5, unitId: 2, order: 2, title: "Opérations sur les fractions" },
      { id: 6, unitId: 2, order: 3, title: "Proportions & règle de trois" },
      { id: 7, unitId: 3, order: 1, title: "Aires et périmètres" },
      { id: 8, unitId: 3, order: 2, title: "Théorème de Pythagore" },
      { id: 9, unitId: 3, order: 3, title: "Théorème de Thalès" },
      { id: 10, unitId: 4, order: 1, title: "Moyenne et médiane" },
      { id: 11, unitId: 4, order: 2, title: "Probabilités de base" },
    ]);

    await db.insert(schema.challenges).values([
      { id: 1, lessonId: 1, type: "ASSIST", order: 1, question: "Résous : 3x + 7 = 2x + 15" },
      { id: 2, lessonId: 1, type: "ASSIST", order: 2, question: "Résous : 5(x - 2) = 3(x + 4)" },
      { id: 3, lessonId: 1, type: "ASSIST", order: 3, question: "Résous : 7x - 9 = 5x + 15" },
      { id: 4, lessonId: 1, type: "ASSIST", order: 4, question: "Résous : 4(2x - 1) = 6x + 10" },
      { id: 5, lessonId: 2, type: "ASSIST", order: 1, question: "Résous : x² - 9 = 0" },
      { id: 6, lessonId: 2, type: "ASSIST", order: 2, question: "Résous : 2x² - 18 = 0" },
      { id: 7, lessonId: 2, type: "ASSIST", order: 3, question: "Résous : (x - 4)(2x + 6) = 0" },
      { id: 8, lessonId: 2, type: "ASSIST", order: 4, question: "Résous : (x + 2)² = 49" },
      { id: 9, lessonId: 2, type: "ASSIST", order: 5, question: "Résous : x² - 5x + 6 = 0" },
      { id: 10, lessonId: 3, type: "ASSIST", order: 1, question: "Résous : x + y = 10 et x - y = 4" },
      { id: 11, lessonId: 3, type: "ASSIST", order: 2, question: "Résous : 2x + y = 7 et x - y = 2" },
      { id: 12, lessonId: 3, type: "ASSIST", order: 3, question: "Résous : 3x + 2y = 12 et x + y = 5" },
      { id: 13, lessonId: 3, type: "ASSIST", order: 4, question: "Résous : x + 2y = 8 et 2x - y = 1" },
      { id: 14, lessonId: 4, type: "SELECT", order: 1, question: "Simplifie : 12/18" },
      { id: 15, lessonId: 4, type: "SELECT", order: 2, question: "Simplifie : 24/36" },
      { id: 16, lessonId: 4, type: "SELECT", order: 3, question: "Simplifie : 15/45" },
      { id: 17, lessonId: 4, type: "SELECT", order: 4, question: "Simplifie : 28/42" },
      { id: 18, lessonId: 5, type: "SELECT", order: 1, question: "Calcule : 1/2 + 1/3" },
      { id: 19, lessonId: 5, type: "SELECT", order: 2, question: "Calcule : 3/4 - 1/6" },
      { id: 20, lessonId: 5, type: "SELECT", order: 3, question: "Calcule : 2/3 × 3/4" },
      { id: 21, lessonId: 5, type: "SELECT", order: 4, question: "Calcule : 5/6 ÷ 5/3" },
      { id: 22, lessonId: 6, type: "SELECT", order: 1, question: "Si 3 stylos coûtent 6€, combien coûtent 7 stylos ?" },
      { id: 23, lessonId: 6, type: "SELECT", order: 2, question: "Une voiture roule 150 km en 2h. Quelle distance en 5h ?" },
      { id: 24, lessonId: 6, type: "SELECT", order: 3, question: "4 ouvriers font un travail en 6 jours. Combien faut-il d'ouvriers pour 3 jours ?" },
      { id: 25, lessonId: 7, type: "SELECT", order: 1, question: "Quelle est l'aire d'un rectangle de 6cm × 4cm ?" },
      { id: 26, lessonId: 7, type: "SELECT", order: 2, question: "Quel est le périmètre d'un carré de côté 5cm ?" },
      { id: 27, lessonId: 7, type: "SELECT", order: 3, question: "Quelle est l'aire d'un triangle de base 8cm et hauteur 5cm ?" },
      { id: 28, lessonId: 7, type: "SELECT", order: 4, question: "Quelle est l'aire d'un cercle de rayon 7cm ? (π ≈ 3.14)" },
      { id: 29, lessonId: 8, type: "SELECT", order: 1, question: "Triangle rectangle : a=3, b=4. Quelle est la valeur de c ?" },
      { id: 30, lessonId: 8, type: "SELECT", order: 2, question: "Triangle rectangle : a=5, b=12. Quelle est la valeur de c ?" },
      { id: 31, lessonId: 8, type: "SELECT", order: 3, question: "Triangle rectangle : c=10, a=6. Quelle est la valeur de b ?" },
      { id: 32, lessonId: 9, type: "SELECT", order: 1, question: "Si AB=6, AC=9 et AD=4, quelle est la longueur AE ?" },
      { id: 33, lessonId: 9, type: "SELECT", order: 2, question: "Si AB=8, DE=4 et AD=3, quelle est la longueur BC ?" },
      { id: 34, lessonId: 10, type: "SELECT", order: 1, question: "Quelle est la moyenne de : 4, 8, 6, 10, 2 ?" },
      { id: 35, lessonId: 10, type: "SELECT", order: 2, question: "Quelle est la médiane de : 3, 7, 1, 9, 5 ?" },
      { id: 36, lessonId: 10, type: "SELECT", order: 3, question: "Quelle est la moyenne de : 12, 15, 18, 9, 6 ?" },
      { id: 37, lessonId: 11, type: "SELECT", order: 1, question: "On lance un dé. Quelle est la probabilité d'obtenir 6 ?" },
      { id: 38, lessonId: 11, type: "SELECT", order: 2, question: "On tire une carte dans un jeu de 52. Probabilité d'un as ?" },
      { id: 39, lessonId: 11, type: "SELECT", order: 3, question: "On lance une pièce 2 fois. Probabilité d'obtenir 2 faces ?" },
    ]);

    // Challenge Options - Mathématiques (bonnes réponses mélangées)
    await db.insert(schema.challengeOptions).values([
      // Leçon 1 - Challenge 1 (bonne réponse au milieu)
      { challengeId: 1, correct: false, text: "x = 6", audioSrc: "/6.mp3" },
      { challengeId: 1, correct: true, text: "x = 8", audioSrc: "/8.mp3" },
      { challengeId: 1, correct: false, text: "x = 10", audioSrc: "/10.mp3" },
      
      // Challenge 2 (bonne réponse à la fin)
      { challengeId: 2, correct: false, text: "x = 9", audioSrc: "/9.mp3" },
      { challengeId: 2, correct: false, text: "x = 13", audioSrc: "/13.mp3" },
      { challengeId: 2, correct: true, text: "x = 11", audioSrc: "/11.mp3" },
      
      // Challenge 3 (bonne réponse au début)
      { challengeId: 3, correct: true, text: "x = 12", audioSrc: "/12.mp3" },
      { challengeId: 3, correct: false, text: "x = 8", audioSrc: "/8.mp3" },
      { challengeId: 3, correct: false, text: "x = 14", audioSrc: "/14.mp3" },
      
      // Challenge 4 (bonne réponse au milieu)
      { challengeId: 4, correct: false, text: "x = 5", audioSrc: "/5.mp3" },
      { challengeId: 4, correct: true, text: "x = 7", audioSrc: "/7.mp3" },
      { challengeId: 4, correct: false, text: "x = 9", audioSrc: "/9.mp3" },
      
      // Leçon 2 - Challenge 5 (bonne réponse à la fin)
      { challengeId: 5, correct: false, text: "x = 6 ou x = -6", audioSrc: "/6.mp3" },
      { challengeId: 5, correct: false, text: "x = 9 ou x = -9", audioSrc: "/9.mp3" },
      { challengeId: 5, correct: true, text: "x = 3 ou x = -3", audioSrc: "/3.mp3" },
      
      // Challenge 6 (bonne réponse au début)
      { challengeId: 6, correct: true, text: "x = 3 ou x = -3", audioSrc: "/3.mp3" },
      { challengeId: 6, correct: false, text: "x = 9 ou x = -9", audioSrc: "/9.mp3" },
      
      // Challenge 7 (bonne réponse au milieu)
      { challengeId: 7, correct: false, text: "x = -4 ou x = 3", audioSrc: "/4.mp3" },
      { challengeId: 7, correct: true, text: "x = 4 ou x = -3", audioSrc: "/4.mp3" },
      
      // Challenge 8 (bonne réponse à la fin)
      { challengeId: 8, correct: false, text: "x = 7 ou x = -11", audioSrc: "/7.mp3" },
      { challengeId: 8, correct: true, text: "x = 5 ou x = -9", audioSrc: "/5.mp3" },
      
      // Challenge 9 (bonne réponse au début)
      { challengeId: 9, correct: true, text: "x = 2 ou x = 3", audioSrc: "/2.mp3" },
      { challengeId: 9, correct: false, text: "x = 1 ou x = 4", audioSrc: "/1.mp3" },
      
      // Leçon 3 - Challenge 10 (bonne réponse au milieu)
      { challengeId: 10, correct: false, text: "x = 8, y = 2", audioSrc: "/8.mp3" },
      { challengeId: 10, correct: true, text: "x = 7, y = 3", audioSrc: "/7.mp3" },
      
      // Challenge 11 (bonne réponse à la fin)
      { challengeId: 11, correct: false, text: "x = 2, y = 4", audioSrc: "/2.mp3" },
      { challengeId: 11, correct: true, text: "x = 3, y = 1", audioSrc: "/3.mp3" },
      
      // Challenge 12 (bonne réponse au début)
      { challengeId: 12, correct: true, text: "x = 2, y = 3", audioSrc: "/2.mp3" },
      { challengeId: 12, correct: false, text: "x = 1, y = 4", audioSrc: "/1.mp3" },
      
      // Challenge 13 (bonne réponse au milieu)
      { challengeId: 13, correct: false, text: "x = 3, y = 2", audioSrc: "/3.mp3" },
      { challengeId: 13, correct: true, text: "x = 2, y = 3", audioSrc: "/2.mp3" },
      
      // Leçon 4 - Fractions (bonnes réponses mélangées)
      { challengeId: 14, correct: false, text: "1/2" },
      { challengeId: 14, correct: true, text: "2/3" },
      { challengeId: 14, correct: false, text: "3/4" },
      
      { challengeId: 15, correct: false, text: "1/2" },
      { challengeId: 15, correct: false, text: "3/5" },
      { challengeId: 15, correct: true, text: "2/3" },
      
      { challengeId: 16, correct: false, text: "1/4" },
      { challengeId: 16, correct: true, text: "1/3" },
      { challengeId: 16, correct: false, text: "2/5" },
      
      { challengeId: 17, correct: false, text: "1/2" },
      { challengeId: 17, correct: false, text: "3/7" },
      { challengeId: 17, correct: true, text: "2/3" },
      
      // Leçon 5 - Opérations
      { challengeId: 18, correct: false, text: "2/5" },
      { challengeId: 18, correct: true, text: "5/6" },
      { challengeId: 18, correct: false, text: "1/6" },
      
      { challengeId: 19, correct: false, text: "1/4" },
      { challengeId: 19, correct: false, text: "2/3" },
      { challengeId: 19, correct: true, text: "7/12" },
      
      { challengeId: 20, correct: false, text: "5/12" },
      { challengeId: 20, correct: true, text: "1/2" },
      { challengeId: 20, correct: false, text: "3/4" },
      
      { challengeId: 21, correct: false, text: "25/18" },
      { challengeId: 21, correct: false, text: "5/9" },
      { challengeId: 21, correct: true, text: "1/2" },
      
      // Leçon 6 - Proportions
      { challengeId: 22, correct: false, text: "12€" },
      { challengeId: 22, correct: false, text: "16€" },
      { challengeId: 22, correct: true, text: "14€" },
      
      { challengeId: 23, correct: false, text: "300 km" },
      { challengeId: 23, correct: true, text: "375 km" },
      { challengeId: 23, correct: false, text: "400 km" },
      
      { challengeId: 24, correct: false, text: "6 ouvriers" },
      { challengeId: 24, correct: true, text: "8 ouvriers" },
      { challengeId: 24, correct: false, text: "10 ouvriers" },
      
      // Leçon 7 - Géométrie
      { challengeId: 25, correct: false, text: "20 cm²" },
      { challengeId: 25, correct: true, text: "24 cm²" },
      { challengeId: 25, correct: false, text: "28 cm²" },
      
      { challengeId: 26, correct: false, text: "15 cm" },
      { challengeId: 26, correct: true, text: "20 cm" },
      { challengeId: 26, correct: false, text: "25 cm" },
      
      { challengeId: 27, correct: false, text: "16 cm²" },
      { challengeId: 27, correct: true, text: "20 cm²" },
      { challengeId: 27, correct: false, text: "24 cm²" },
      
      { challengeId: 28, correct: false, text: "143.07 cm²" },
      { challengeId: 28, correct: true, text: "153.86 cm²" },
      { challengeId: 28, correct: false, text: "163.28 cm²" },
      
      // Leçon 8 - Pythagore
      { challengeId: 29, correct: false, text: "c = 6" },
      { challengeId: 29, correct: true, text: "c = 5" },
      { challengeId: 29, correct: false, text: "c = 7" },
      
      { challengeId: 30, correct: false, text: "c = 11" },
      { challengeId: 30, correct: true, text: "c = 13" },
      { challengeId: 30, correct: false, text: "c = 15" },
      
      { challengeId: 31, correct: false, text: "b = 6" },
      { challengeId: 31, correct: true, text: "b = 8" },
      { challengeId: 31, correct: false, text: "b = 10" },
      
      // Leçon 9 - Thalès
      { challengeId: 32, correct: false, text: "AE = 5" },
      { challengeId: 32, correct: true, text: "AE = 6" },
      { challengeId: 32, correct: false, text: "AE = 7" },
      
      { challengeId: 33, correct: true, text: "BC = 6" },
      { challengeId: 33, correct: false, text: "BC = 8" },
      
      // Leçon 10 - Statistiques
      { challengeId: 34, correct: false, text: "5" },
      { challengeId: 34, correct: true, text: "6" },
      { challengeId: 34, correct: false, text: "7" },
      
      { challengeId: 35, correct: false, text: "3" },
      { challengeId: 35, correct: true, text: "5" },
      { challengeId: 35, correct: false, text: "7" },
      
      { challengeId: 36, correct: false, text: "10" },
      { challengeId: 36, correct: true, text: "12" },
      { challengeId: 36, correct: false, text: "14" },
      
      // Leçon 11 - Probabilités
      { challengeId: 37, correct: false, text: "1/3" },
      { challengeId: 37, correct: true, text: "1/6" },
      { challengeId: 37, correct: false, text: "1/12" },
      
      { challengeId: 38, correct: true, text: "1/13" },
      { challengeId: 38, correct: false, text: "4/52" },
      
      { challengeId: 39, correct: false, text: "1/2" },
      { challengeId: 39, correct: true, text: "1/4" },
      { challengeId: 39, correct: false, text: "1/3" },
    ]);

    // ================================================
    // 2. ESPAGNOL (Course ID: 2)
    // ================================================

    await db.insert(schema.units).values([
      { id: 5, courseId: 2, title: "Introducción", description: "Learn the basics of Spanish", order: 1 },
      { id: 6, courseId: 2, title: "Familia y Amigos", description: "Talk about family and friends", order: 2 },
      { id: 7, courseId: 2, title: "Comida y Bebida", description: "Food and drinks vocabulary", order: 3 },
    ]);

    await db.insert(schema.lessons).values([
      { id: 12, unitId: 5, order: 1, title: "Nouns & Articles" },
      { id: 13, unitId: 5, order: 2, title: "Basic Verbs" },
      { id: 14, unitId: 5, order: 3, title: "Greetings" },
      { id: 15, unitId: 6, order: 1, title: "Family Members" },
      { id: 16, unitId: 6, order: 2, title: "Adjectives" },
      { id: 17, unitId: 7, order: 1, title: "Food" },
      { id: 18, unitId: 7, order: 2, title: "Drinks" },
    ]);

    await db.insert(schema.challenges).values([
      { id: 40, lessonId: 12, type: "SELECT", order: 1, question: 'Which one is "the man"?' },
      { id: 41, lessonId: 12, type: "ASSIST", order: 2, question: '"the man"' },
      { id: 42, lessonId: 12, type: "SELECT", order: 3, question: 'Which one is "the woman"?' },
      { id: 43, lessonId: 13, type: "ASSIST", order: 1, question: '"to speak"' },
      { id: 44, lessonId: 13, type: "ASSIST", order: 2, question: '"to eat"' },
      { id: 45, lessonId: 14, type: "SELECT", order: 1, question: 'How do you say "Hello"?' },
      { id: 46, lessonId: 15, type: "SELECT", order: 1, question: 'Which one is "mother"?' },
      { id: 47, lessonId: 16, type: "SELECT", order: 1, question: 'Which one means "big"?' },
      { id: 48, lessonId: 17, type: "SELECT", order: 1, question: 'Which one is "bread"?' },
      { id: 49, lessonId: 18, type: "SELECT", order: 1, question: 'Which one is "water"?' },
    ]);

    await db.insert(schema.challengeOptions).values([
      { challengeId: 40, correct: true, text: "el hombre", imageSrc: "/man.svg" },
      { challengeId: 40, correct: false, text: "la mujer", imageSrc: "/woman.svg" },
      { challengeId: 40, correct: false, text: "el niño", imageSrc: "/boy.svg" },
      { challengeId: 41, correct: true, text: "el hombre" },
      { challengeId: 41, correct: false, text: "la mujer" },
      { challengeId: 41, correct: false, text: "el niño" },
      { challengeId: 42, correct: true, text: "la mujer", imageSrc: "/woman.svg" },
      { challengeId: 42, correct: false, text: "el hombre", imageSrc: "/man.svg" },
      { challengeId: 42, correct: false, text: "la niña", imageSrc: "/girl.svg" },
      { challengeId: 43, correct: true, text: "hablar" },
      { challengeId: 43, correct: false, text: "comer" },
      { challengeId: 43, correct: false, text: "beber" },
      { challengeId: 44, correct: true, text: "comer" },
      { challengeId: 44, correct: false, text: "hablar" },
      { challengeId: 44, correct: false, text: "vivir" },
      { challengeId: 45, correct: true, text: "Hola" },
      { challengeId: 45, correct: false, text: "Adiós" },
      { challengeId: 45, correct: false, text: "Gracias" },
      { challengeId: 46, correct: true, text: "la madre", imageSrc: "/mother.svg" },
      { challengeId: 46, correct: false, text: "el padre", imageSrc: "/father.svg" },
      { challengeId: 46, correct: false, text: "el hermano", imageSrc: "/brother.svg" },
      { challengeId: 47, correct: true, text: "grande" },
      { challengeId: 47, correct: false, text: "pequeño" },
      { challengeId: 47, correct: false, text: "rápido" },
      { challengeId: 48, correct: true, text: "el pan", imageSrc: "/bread.svg" },
      { challengeId: 48, correct: false, text: "el queso", imageSrc: "/cheese.svg" },
      { challengeId: 48, correct: false, text: "la carne", imageSrc: "/meat.svg" },
      { challengeId: 49, correct: true, text: "el agua", imageSrc: "/water.svg" },
      { challengeId: 49, correct: false, text: "el vino", imageSrc: "/wine.svg" },
      { challengeId: 49, correct: false, text: "la cerveza", imageSrc: "/beer.svg" },
    ]);

    // ================================================
    // 3. ITALIEN (Course ID: 3)
    // ================================================

    await db.insert(schema.units).values([
      { id: 8, courseId: 3, title: "Introduzione", description: "Learn the basics of Italian", order: 1 },
    ]);

    await db.insert(schema.lessons).values([
      { id: 19, unitId: 8, order: 1, title: "Nouns" },
      { id: 20, unitId: 8, order: 2, title: "Greetings" },
    ]);

    await db.insert(schema.challenges).values([
      { id: 50, lessonId: 19, type: "SELECT", order: 1, question: 'Which one is "the man"?' },
      { id: 51, lessonId: 19, type: "ASSIST", order: 2, question: '"the woman"' },
      { id: 52, lessonId: 20, type: "SELECT", order: 1, question: 'How do you say "Hello"?' },
    ]);

    await db.insert(schema.challengeOptions).values([
      { challengeId: 50, correct: true, text: "l'uomo", imageSrc: "/man.svg" },
      { challengeId: 50, correct: false, text: "la donna", imageSrc: "/woman.svg" },
      { challengeId: 50, correct: false, text: "il ragazzo", imageSrc: "/boy.svg" },
      { challengeId: 51, correct: true, text: "la donna" },
      { challengeId: 51, correct: false, text: "l'uomo" },
      { challengeId: 51, correct: false, text: "la ragazza" },
      { challengeId: 52, correct: true, text: "Ciao" },
      { challengeId: 52, correct: false, text: "Arrivederci" },
      { challengeId: 52, correct: false, text: "Grazie" },
    ]);

    // ================================================
    // 4. FRANÇAIS (Course ID: 4)
    // ================================================

    await db.insert(schema.units).values([
      { id: 9, courseId: 4, title: "Introduction", description: "Learn the basics of French", order: 1 },
    ]);

    await db.insert(schema.lessons).values([
      { id: 21, unitId: 9, order: 1, title: "Nouns" },
      { id: 22, unitId: 9, order: 2, title: "Greetings" },
    ]);

    await db.insert(schema.challenges).values([
      { id: 53, lessonId: 21, type: "SELECT", order: 1, question: 'Which one is "the man"?' },
      { id: 54, lessonId: 21, type: "ASSIST", order: 2, question: '"the woman"' },
      { id: 55, lessonId: 22, type: "SELECT", order: 1, question: 'How do you say "Hello"?' },
    ]);

    await db.insert(schema.challengeOptions).values([
      { challengeId: 53, correct: true, text: "l'homme", imageSrc: "/man.svg" },
      { challengeId: 53, correct: false, text: "la femme", imageSrc: "/woman.svg" },
      { challengeId: 53, correct: false, text: "le garçon", imageSrc: "/boy.svg" },
      { challengeId: 54, correct: true, text: "la femme" },
      { challengeId: 54, correct: false, text: "l'homme" },
      { challengeId: 54, correct: false, text: "la fille" },
      { challengeId: 55, correct: true, text: "Bonjour" },
      { challengeId: 55, correct: false, text: "Au revoir" },
      { challengeId: 55, correct: false, text: "Merci" },
    ]);

    // ================================================
    // 5. CROATE (Course ID: 5)
    // ================================================

    await db.insert(schema.units).values([
      { id: 10, courseId: 5, title: "Uvod", description: "Learn the basics of Croatian", order: 1 },
    ]);

    await db.insert(schema.lessons).values([
      { id: 23, unitId: 10, order: 1, title: "Nouns" },
      { id: 24, unitId: 10, order: 2, title: "Greetings" },
    ]);

    await db.insert(schema.challenges).values([
      { id: 56, lessonId: 23, type: "SELECT", order: 1, question: 'Which one is "the man"?' },
      { id: 57, lessonId: 23, type: "ASSIST", order: 2, question: '"the woman"' },
      { id: 58, lessonId: 24, type: "SELECT", order: 1, question: 'How do you say "Hello"?' },
    ]);

    await db.insert(schema.challengeOptions).values([
      { challengeId: 56, correct: true, text: "čovjek", imageSrc: "/man.svg" },
      { challengeId: 56, correct: false, text: "žena", imageSrc: "/woman.svg" },
      { challengeId: 56, correct: false, text: "dječak", imageSrc: "/boy.svg" },
      { challengeId: 57, correct: true, text: "žena" },
      { challengeId: 57, correct: false, text: "čovjek" },
      { challengeId: 57, correct: false, text: "djevojčica" },
      { challengeId: 58, correct: true, text: "Bok" },
      { challengeId: 58, correct: false, text: "Doviđenja" },
      { challengeId: 58, correct: false, text: "Hvala" },
    ]);

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw new Error("Failed to seed the database");
  }
};

main();